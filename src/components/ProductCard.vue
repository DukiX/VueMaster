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
            <v-card-actions v-if="forUser">
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small v-bind="attrs" v-on="on" :disabled="loading" elevation="5" color="white" type="button">Izbriši</v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            Brisanje proizvoda
                        </v-card-title>
                        <v-divider></v-divider>

                        <v-card-text>
                            <br>
                            Da li ste sigurni da želite da obrišete proizvod?
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-btn
                            color="white"
                            elevation="5"
                            @click="dialog=false"
                        >
                            Odustani
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            elevation="5"
                            @click="deleteProduct"
                        >
                            Izbriši
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-spacer></v-spacer>
                <v-btn  small color = "primary">Izmeni</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

export default {
    name: 'ProductCard',
    props:{
        id : String,
        name : String,
        price : Number,
        wayOfUse : String,
        image : String,
        hover : Boolean,
        forUser : Boolean
    },
    data(){
        return {
            error : false,
            errorMessage:'',
            defaultImage: require("@/assets/defaultImage.jpg"),
            dialog : false,
            loading :false
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
        },
        deleteProduct(e){
            e.preventDefault();
            this.loading = true;

            axios.delete(Vue.prototype.$products+"/"+this.id).then(()=>{
                this.error=false;
                this.loading = false;
                this.dialog=false;
                location.reload();
            }).catch((error)=>{
                this.error=true;
                this.loading = false;
                this.errorMessage = error.response.data.Message;
            });
        }
    }
}
</script>