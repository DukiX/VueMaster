<template>
    <div>
        <v-snackbar v-model="error">
            <span>{{errorMessage}}</span>
            <v-btn color="red" text @click="error = false" >
                Zatvori
            </v-btn>
        </v-snackbar>
        <v-card v-on:click="goToProduct" :elevation="hover ? 12 : 4" min-width="165px" max-width="165px"> 
            <v-img id="image" :aspect-ratio="16/9" min-width="165px" max-width="165px" :src="realOrDefaultImage" />

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
        'image',
        'hover'
    ],
    data(){
        return {
            error : false,
            errorMessage:'',
            defaultImage: require("@/assets/defaultImage.jpg"),
        }
    },
    computed:{
        realOrDefaultImage() {
            if(typeof(this.image) !== 'undefined' && this.image != null && this.image != ""){
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