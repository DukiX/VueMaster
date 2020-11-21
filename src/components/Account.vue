<template>
    <v-div id = "user">
        <v-card id="card" elevation="12" min-width="400" max-width="400"> 
            <v-toolbar height="100" color = "primary">
                        <!-- <v-toolbar-title style="color:white"> Account
                        </v-toolbar-title> -->
                        <v-avatar
                            tile
                            color="grey"
                            size="80" 
                            >
                            <img :src="image"/>
                        </v-avatar>
                        <v-toolbar-title id="toolbarTitle"> 
                            {{firstName}} {{lastName}}
                        </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <form method="post" @submit="updateUser">
                    <v-text-field disabled v-model="email" type="email" label="Email address" name="email"/>

                    <v-text-field disabled v-model="username" label="Username" name="username"/>

                    <v-text-field v-model="inputFirstName" label="First Name" name="firstName"/>

                    <v-text-field v-model="inputLastName" label="Last Name" name="lastName"/>

                    <v-text-field v-model="inputPhoneNumber" label="Phone Number" name="phoneNumber"/>

                    <v-text-field v-model="inputAddress" label="Address" name="address"/>

                    <v-file-input
                        label="Choose an avatar"
                        accept="image/png, image/jpeg, image/bmp"
                        prepend-icon="mdi-camera"
                        @change="selectImg"
                    ></v-file-input>

                    <hr/>
                    <v-row justify='end'>
                         <v-col class="text-left">
                             <v-btn :loading="loading" elevation="5" v-on:click="deleteUser" color="white" type="button">Delete account</v-btn>
                        </v-col>
                        <v-col class="text-right">
                            <v-btn :loading="loading" elevation="5" color="primary" type="submit">Save changes</v-btn>
                        </v-col>
                    </v-row>
                </form>
            </v-card-text>
        </v-card>
    </v-div>
    
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
            uploadImage:undefined,
            loading : false,
            error:false
        }
    },
    created() {
        this.onCreate();
    },

    methods: {
        ...mapActions({
            saveUserData:'auth/saveUserData',
            saveUserImage:'auth/saveUserImage'
        }),

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
            }).catch(()=>{
                this.error=true;
                this.loading = false;
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
                this.$router.push('/login');
            }).catch(()=>{
                this.error=true;
                this.loading = false;
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
                    this.saveUserImage(imageResponse.data);

                    this.image = 'data:image/jpeg;base64,'+imageResponse.data;
                });
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
                    this.saveUserImage(imageResponse.data);

                    this.image = 'data:image/jpeg;base64,'+imageResponse.data;
                });
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
</style>