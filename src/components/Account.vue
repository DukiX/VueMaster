<template>
    <div>
        <v-snackbar v-model="error">
            <span>{{errorMessage}}</span>
            <v-btn color="red" text @click="error = false" >
                Zatvori
            </v-btn>
        </v-snackbar>
        <v-card elevation="12" min-width="400" max-width="400" :loading="loading"> 
            <template slot="progress">
                <v-progress-linear
                    color="primary"
                    height="8"
                    indeterminate
                ></v-progress-linear>
            </template>
            <v-toolbar height="100" color = "primary">
                <div id = "userImage">
                    <v-menu offset-y min-width="300">
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-avatar color="primary" size="80" >
                                <img :src="realOrDefaultImage" />
                            </v-avatar>
                        </v-btn>
                        </template>
                        <v-card tile>
                            <v-list >
                                <v-list-item-group color="primary">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-file-input
                                                label="Izaberi novu profilnu sliku"
                                                accept="image/png, image/jpeg, image/bmp"
                                                prepend-icon="mdi-camera"
                                                @change="selectImg"
                                            ></v-file-input> 
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item>
                                    <v-list-item-content>
                                    <v-list-item-title v-on:click="deleteImg">Izbriši profilnu sliku</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                </v-list-item-group>
                            </v-list>
                            </v-card>
                    </v-menu>
                </div>
                <v-toolbar-title id="toolbarTitle"> 
                    {{firstName}} {{lastName}}
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <form method="post" @submit="updateUser">
                    <v-text-field disabled v-model="email" type="email" label="Email adresa" name="email"/>

                    <v-text-field disabled v-model="username" label="Korisničko ime" name="username"/>

                    <v-text-field v-model="inputFirstName" label="Ime" name="firstName"/>

                    <v-text-field v-model="inputLastName" label="Prezime" name="lastName"/>

                    <v-text-field v-model="inputPhoneNumber" label="Broj telefona" name="phoneNumber"/>

                    <v-text-field v-model="inputAddress" label="Adresa" name="address"/>

                    <!-- <v-file-input
                        label="Izaberi profilnu sliku"
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        @change="selectImg"
                    ></v-file-input> -->

                    <hr/>
                    <v-row justify='end'>
                         <v-col class="text-left">
                            <v-dialog v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" :disabled="loading" elevation="5" color="white" type="button">Izbriši nalog</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        Brisanje naloga
                                    </v-card-title>
                                    <v-divider></v-divider>

                                    <v-card-text>
                                        <br>
                                        Da li ste sigurni da želite da obrišete nalog?
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
                                        @click="deleteUser"
                                    >
                                        Izbriši
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn :disabled="loading" elevation="5" color="primary" type="submit">Sačuvaj</v-btn>
                        </v-col>
                    </v-row>
                </form>
            </v-card-text>
        </v-card>
    </div>
    
</template>

<script>
import axios from 'axios';
import {mapActions} from 'vuex'
import Vue from 'vue'

export default {
    name : "Account",
    data(){
        return {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber:'',
            address:'',
            inputFirstName: '',
            inputLastName: '',
            inputPhoneNumber:'',
            inputAddress:'',
            image:'',
            errorMessage:'',
            uploadImage:undefined,
            loading : true,
            error:false,
            dialog:false,
            defaultImage: require("@/assets/defaultAccountIcon.png")
        }
    },
    created() {
        this.onCreate();
    },
    computed:{
        realOrDefaultImage() {
            if(typeof(this.image) !== 'undefined' && this.image != null  && this.image != ""){
                return this.image;
            }else{
                return this.defaultImage;
            }
        }
    },
    methods: {
        ...mapActions({
            saveUserData:'auth/saveUserData',
            saveUserImage:'auth/saveUserImage',
            signOutAuth:'auth/signOut'
        }),
        signOut(){
            this.signOutAuth();
            this.$router.push('/');
        },
        updateUser(e){
            e.preventDefault();
            this.loading = true;

            axios.put(Vue.prototype.$user, {
                firstName:this.inputFirstName,
                lastName:this.inputLastName,
                phoneNumber:this.inputPhoneNumber,
                address:this.inputAddress
            }).then((res)=>{
                this.error=false;
                this.loading = false;
                this.firstName = res.data.firstName;
                this.lastName = res.data.lastName;
                this.phoneNumber=res.data.phoneNumber;
                this.address = res.data.address;
            }).catch((error)=>{
                this.error=true;
                this.loading = false;
                this.errorMessage = error.response.data.Message;
            });

            if(typeof this.uploadImage !== "undefined")
                this.uploadImg();
        },

        deleteUser(e){
            e.preventDefault();
            this.loading = true;

            axios.delete(Vue.prototype.$user).then(()=>{
                this.error=false;
                this.loading = false;
                this.dialog=false;
                this.signOut();
            }).catch((error)=>{
                this.error=true;
                this.loading = false;
                this.errorMessage = error.response.data.Message;
            });
        },

        selectImg(file){
            this.uploadImage=file;
        },

        uploadImg(){
            let fd= new FormData();

            fd.append('file', this.uploadImage);

            const config = {
                headers: { 
                    'Content-Type': 'multipart/form-data' 
                }
            };
            axios.put(Vue.prototype.$image, fd, config).then(()=>{
                axios.get(Vue.prototype.$image).then((imageResponse)=>{
                    this.image = 'data:image/jpeg;base64,'+imageResponse.data;

                    this.saveUserImage(this.image);
                }).catch(()=>{
                    this.image=null;
                });
            }).catch((error)=>{
                this.error=true;
                this.loading = false;
                this.errorMessage = error.response.data.Message;
            });
        },

        deleteImg(e){
            e.preventDefault();
            this.loading = true;
            this.saveUserImage(null);
            axios.delete(Vue.prototype.$image).then(()=>{
                this.error=false;
                this.loading = false;
                this.image = null;
                this.uploadImage=null;
            }).catch((error)=>{
                this.error=true;
                this.loading = false;
                this.errorMessage = error.response.data.Message;
            });
        },

        onCreate(){

            axios.get(Vue.prototype.$user).then((response)=>{
                this.saveUserData(response.data);

                this.username = response.data.username;
                this.email = response.data.email;
                this.firstName = response.data.firstName;
                this.lastName = response.data.lastName;
                this.phoneNumber = response.data.phoneNumber;
                this.address = response.data.address;

                this.inputFirstName = response.data.firstName;
                this.inputLastName = response.data.lastName;
                this.inputPhoneNumber = response.data.phoneNumber;
                this.inputAddress = response.data.address;

                axios.get(Vue.prototype.$image).then((imageResponse)=>{
                    this.image = 'data:image/jpeg;base64,'+imageResponse.data;

                    this.saveUserImage(this.image);
                }).catch(()=>{
                    this.image=null;
                });
                this.loading = false;
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
#toolbarTitle{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color:white
}
#userImage{
    padding-left: 10px;
}
</style>