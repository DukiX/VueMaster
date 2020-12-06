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
                    <v-img id="image" :aspect-ratio="16/9" min-width="550px" width="30vw" :src="realOrDefaultImage" />
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
                            Kontakt telefon: {{seller.phoneNumber}}
                        </v-col>
                    </v-row>
                    <v-row >
                        <v-col cols="1">
                            <v-text-field  hide-details single-line v-model="inBasket" type="number"/>
                        </v-col>
                        <v-col>
                            <v-btn style="margin-top:12px">Dodaj u korpu</v-btn>
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
    props:[
        'name',
        'price',
        'description',
        'wayOfUse',
        'seller',
        'image'
    ],
    data(){
        return {
            inBasket:0,
            defaultImage: require("@/assets/defaultHoneyImage.jpg")
        }
    },
    computed:{
        realOrDefaultImage() {
            if(typeof(this.image) !== 'undefined' && this.image != null){
                return this.image;
            }else{
                return this.defaultImage;
            }
        }
    }
}
</script>

<style scoped>
#cont{
    width: 80vw;
}
/* #image{
    margin-left: 50px;
    margin-right: 20px;
} */
</style>