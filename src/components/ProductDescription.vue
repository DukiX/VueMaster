<template>
    <div >
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
                            <v-btn :disabled = "isPreview" color="primary" style="margin-top:12px">Dodaj u korpu</v-btn>
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
    data(){
        return {
            inBasket:1,
            defaultImage: require("@/assets/defaultImage.jpg"),
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