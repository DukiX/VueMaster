<template>
    <div >
        <v-container id="cont" v-if="!previewProduct">
            <v-card>
                <v-toolbar color = "primary">
                    <v-toolbar-title id="toolbarTitle" style="color:white"> 
                        Dodavanje novog proizvoda
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <form method="post" @submit="addProduct">
                        <v-row>
                            <v-col>
                               <v-text-field v-model="name" label="Naziv proizvoda" :rules="[rules.required]"/>
                            </v-col>
                            <v-col>
                               <v-text-field hide-details single-line v-model="price" type="number" label="Cena proizvoda"  :rules="[rules.required]" />
                                RSD
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-file-input
                                    label="Izaberi sliku proizvoda"
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    @change="selectImg"
                                    :rules="[rules.required]"
                                ></v-file-input> 
                            </v-col>
                             <v-col>
                                <v-text-field v-model="wayOfUse" label="Način korišćenja" :rules="[rules.required]"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea v-model="description" label="Opis proizvoda" :rules="[rules.required]"/>
                            </v-col>
                        </v-row>
                        <v-row>
                             <v-btn :disabled="loading" color="white" elevation="5" style = "margin-left:20px; width:200px">Odustani</v-btn>
                                    <v-spacer></v-spacer>
                            <v-btn :disabled="loading" v-on:click="prevProduct" color="primary" style = "margin-right:20px; width:200px">Prikaži</v-btn>
                        </v-row>
                    </form>
                </v-card-text>
            </v-card>
        </v-container>
        <ProductDescription v-if="previewProduct" :name = "name" :price = "price" :description = "description" :wayOfUse = "wayOfUse"
         :seller = "seller" :image = "stringImage" :preview = "true"/>
         <v-row v-if="previewProduct">
            <v-btn v-if="previewProduct" v-on:click="back" color="white" elevation="5" style = "margin-left:20px; width:200px">Nazad</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="previewProduct"  v-on:click="addProduct" :disabled="loading" type="submit" color="primary" style = "margin-right:20px; width:200px">Sačuvaj</v-btn>
         </v-row>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import ProductDescription from '@/components/ProductDescription.vue';
import store from '../store/index'

export default {
    name : "AddProduct",
    components: {
        ProductDescription
    },
    created() {
        this.seller = store.getters['auth/getUser'];
    },
    data(){
        return {
            seller: null,
            name : '',
            price : '',
            description: '',
            wayOfUse:'',
            image:undefined,
            stringImage:'',
            error:false,
            loading:false,
            errorMessage:'Error',
            previewProduct:false,
            id : '',
            rules: {
                required: value => {
                    if(!value){
                        return "Required";
                    }

                    return true;
                }
            }
        }
    },
    methods:{
        selectImg(file){
            this.image=file;
            if(file!=null)
                this.encodeImageFileAsURL(file);
        },
        encodeImageFileAsURL(image) {
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = () =>{
                if(typeof(reader.result) !== 'undefined' && reader.result != null){
                    this.stringImage = reader.result;
                }
            }
        },
        back(e){
            e.preventDefault();
            this.previewProduct=false;
        },
        prevProduct(e){
            e.preventDefault();
            this.previewProduct=true;
        },
        addProduct(e){
            e.preventDefault();
            const cfg = {
                headers: { 
                    'Content-Type': 'application/json' 
                }
            };
            axios.post(Vue.prototype.$products, {
                Naziv:this.name,
                Cena:this.price,
                Opis:this.description,
                NacinKoriscenja:this.wayOfUse
            },cfg).then((res)=>{
                this.error=false;
                this.loading = false;
                this.id = res.data.id;
                if(typeof(this.image) !== 'undefined' && this.image != null){
                    let fd= new FormData();

                    fd.append('file', this.image);

                    const config = {
                        headers: { 
                            'Content-Type': 'multipart/form-data' 
                        }
                    };
                    axios.put(Vue.prototype.$productsUploadImage+"/"+this.id, fd, config).then(()=>{
                        axios.get(Vue.prototype.$products+"/"+this.id).then((imageResponse)=>{
                            this.stringImage = 'data:image/jpeg;base64,'+imageResponse.data.slika;
                        }).catch(()=>{
                            this.stringImage=null;
                        });
                    }).catch((error)=>{
                        this.error=true;
                        this.loading = false;
                        this.errorMessage = error.response.data.Message;
                    });
                }
            }).catch((error)=>{
                this.error=true;
                this.loading = false;
                this.errorMessage = error.response.data.Message;
            });
        }
    }
}
</script>

<style scoped>
#cont{
    width: 60vw;
}
</style>