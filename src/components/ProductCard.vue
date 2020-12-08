<template>
    <div>
        <v-snackbar v-model="error">
            <span>{{errorMessage}}</span>
            <v-btn color="red" text @click="error = false" >
                Zatvori
            </v-btn>
        </v-snackbar>
        <v-card v-on:click="goToProduct" elevation="12" min-width="165px" max-width="165px"> 
            <v-img id="image" :aspect-ratio="16/9" min-width="150px" max-width="150" :src="realOrDefaultImage" />

            <v-card-title>{{name}}</v-card-title>

            <v-card-subtitle>
                Cena : <span style = "font-weight: bold;">{{price}}</span> RSD   <br>
                <span> Način korišćenja : {{wayOfUse}}</span> 
            </v-card-subtitle>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props:[
        'id',
        'name',
        'price',
        'wayOfUse',
        'image'
    ],
    data(){
        return {
            error : false,
            errorMessage:'',
            defaultImage: require("@/assets/defaultHoneyImage.jpg"),
        }
    },
    computed:{
        realOrDefaultImage() {
            if(typeof(this.image) !== 'undefined' && this.image != null){
                return 'data:image/jpeg;base64,'+this.image;
            }else{
                return this.defaultImage;
            }
        }
    },
    methods:{
        goToProduct(){
            this.$router.push('/product/'+this.id).catch(() => {this.$router.go()});
        }
    }
}
</script>