<template>
    <div >
        <v-container id="cont">
            <v-card>
                <v-toolbar color = "primary">
                    <v-toolbar-title id="toolbarTitle" style="color:white"> 
                        {{naslov}}
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <form method="post" @submit="addProduct">
                        <v-row>
                            <v-col>
                               <v-text-field v-model="name" label="Naziv proizvoda" :rules="[rules.required]"/>
                            </v-col>
                            <v-col>
                               <v-text-field min="0" max = "100000" single-line v-model="price" type="number" label="Cena proizvoda (RSD)" :rules="[rules.required]" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-file-input
                                    label="Izaberi sliku proizvoda"
                                    accept="image/png, image/jpeg, image/bmp, image/jpg,"
                                    prepend-icon="mdi-camera"
                                    @change="selectImg"
                                    :rules="[rules.required]"
                                    v-model="image"
                                ></v-file-input> 
                            </v-col>
                             <v-col>
                                <v-text-field v-model="wayOfUse" label="Način korišćenja" :rules="[rules.required]"/>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea outlined v-model="description" label="Opis proizvoda" :rules="[rules.required]"/>
                            </v-col>
                        </v-row>
                        <v-row>
                             <v-btn :disabled="loading" v-on:click="$router.go(-1).catch(err => {$router.go()})" color="white" elevation="5" style = "margin-left:20px; width:200px">Nazad</v-btn>
                                    <v-spacer></v-spacer>
                            <v-btn :disabled="loading" v-on:click="prevProduct" color="primary" style = "margin-right:20px; width:200px">Prikaži</v-btn>
                        </v-row>
                    </form>
                </v-card-text>
            </v-card>
        </v-container>
        <v-dialog v-model="previewProduct" width="90%">
            <v-card>
                <ProductDescription :name = "name" :price = "price" :description = "description" :wayOfUse = "wayOfUse"
                :seller = "seller" :image = "stringImage" :preview = "true"/>
                <v-card-actions>
                    <v-btn v-on:click="back" color="white" elevation="5" style = "margin-left:20px; width:200px">Nazad</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn v-on:click="addOrUpdate" :disabled="loading" type="submit" color="primary" style = "margin-right:20px; width:200px">Sačuvaj</v-btn>
                    <br><br>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import ProductDescription from '@/components/ProductDescription.vue';
import store from '../store/index'

export default {
    name : "ProductForm",
    components: {
        ProductDescription
    },
    created() {
        this.seller = store.getters['auth/getUser'];
    },
    props:{
        naslov: String,
        isUpdate:Boolean
    },
    mounted() {
        if(this.isUpdate){        
            this.id = this.$route.params.id;
            axios.get(Vue.prototype.$products+"/"+this.id).then((response)=>{
                this.name = response.data.naziv;
                this.price = response.data.cena;
                this.description = response.data.opis;
                this.wayOfUse = response.data.nacinKoriscenja;
                this.seller = response.data.prodavac;
                if(response.data.slika!=null){
                    this.stringImage = 'data:image/jpeg;base64,'+response.data.slika;
                }
            }).catch(()=>{
                this.error=true;
            });
        }
    },
    data(){
        return {
            seller: null,
            name : '',
            price : 0,
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
                if(typeof(reader.result) !== 'undefined' && reader.result != null  && this.image != ""){
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
        addOrUpdate(e){
            if(this.isUpdate)
                this.updateProduct(e);
            else
                this.addProduct(e);
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
                if(typeof(this.image) !== 'undefined' && this.image != null  && this.image != ""){
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
                        this.$router.push('/product/'+res.data.id);
                    }).catch((error)=>{
                        this.error=true;
                        this.loading = false;
                        this.errorMessage = error.response.data.Message;
                        this.$router.push('/product/'+res.data.id);
                    });
                }
                else{
                    this.$router.push('/product/'+res.data.id);
                }
            }).catch((error)=>{
                this.error=true;
                this.loading = false;
                this.errorMessage = error.response.data.Message;
            });
        },
        updateProduct(e){
            e.preventDefault();
            const cfg = {
                headers: { 
                    'Content-Type': 'application/json' 
                }
            };
            axios.put(Vue.prototype.$products+"/"+this.id, {
                Naziv:this.name,
                Cena:this.price,
                Opis:this.description,
                NacinKoriscenja:this.wayOfUse
            },cfg).then((res)=>{
                this.error=false;
                this.loading = false;
                this.id = res.data.id;
                if(typeof(this.image) !== 'undefined' && this.image != null  && this.image != ""){
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
                        this.$router.push('/product/'+res.data.id);
                    }).catch((error)=>{
                        this.error=true;
                        this.loading = false;
                        this.errorMessage = error.response.data.Message;
                        this.$router.push('/product/'+res.data.id);
                    });
                }else{
                    this.$router.push('/product/'+res.data.id);
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