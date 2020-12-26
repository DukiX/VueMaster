<template>
    <div >
        <v-snackbar v-model="dodato">
            <span>Uspešno dodato u korpu! </span>
            <template v-slot:action="{ attrs }">
                <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="dodato = false"
                >
                Zatvori
                </v-btn>
            </template>
        </v-snackbar>
        <v-container id="cont">
            <v-row>
                <v-col>
                    <h1> {{name}} </h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-img id="image" :aspect-ratio="16/9" min-width="550px" width="32vw" :src="realOrDefaultImage" />
                </v-col>
                <v-col >
                    <v-row>
                        <v-col>
                            <h2>Cena:</h2>
                            {{price}} RSD
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <h3>Način korišćenja: </h3>
                            {{wayOfUse}}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <h3>Prodavac: </h3>
                            {{seller.firstName}} {{seller.lastName}} <br> 
                            Kontakt telefon: {{seller.phoneNumber}} <br> 
                            Email adresa: {{seller.email}}
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="2">
                            <v-text-field :disabled = "isPreview" min="1" max="10" hide-details single-line v-model="inBasket" type="number"/>
                        </v-col>
                        <v-col>
                            <v-btn v-on:click="addToBasket" :disabled = "isPreview" color="primary" style="margin-top:12px">Dodaj u korpu</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h2>Opis proizvoda:</h2><br>
                    {{description}}
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import store from '../store/index';
import {mapActions} from 'vuex'
import {v4} from 'uuid';

export default {
    name : "ProductDescription",
    props:{
        name:String,
        price:Number,
        description : String,
        wayOfUse : String,
        seller:Object,
        image:String,
        preview:Boolean
    },
    methods:{
        ...mapActions({ 
            addItemToBasket:'basket/addToBasket'
        }),
        addToBasket(e){
            e.preventDefault();
            this.addItemToBasket({
                id : v4(),
                itemId : this.$route.params.id,
                quantity : this.inBasket
            });
            this.dodato = true;
        }
    },
    data(){
        return {
            inBasket:1,
            defaultImage: require("@/assets/defaultImage.jpg"),
            dodato:false
        }
    },
    computed:{
        realOrDefaultImage() {
            if(typeof(this.image) !== 'undefined' && this.image != null && this.image != ""){
                return this.image;
            }else{
                return this.defaultImage;
            }
        },
        isPreview(){
            if(!this.preview){
                var role = store.getters['auth/getUserRole'];
                console.log(role);
                if(role == 'PRODAVAC')
                    return true;
                return false;
            }
            else{
                return true;
            }
        }
    }
}
</script>

<style scoped>
#cont{
    width: 80vw;
}
#image{
    margin-top: 15px;
    margin-right: 30px;
}
</style>