<template>
    <div id="loginCmp">
        <v-snackbar v-model="error">
            <span>{{errorMessage}}</span>
            <v-btn color="red" text @click="error = false" >
                Zatvori
            </v-btn>
        </v-snackbar>
        <v-card id="card" elevation="12" min-width="330" max-width="330" :loading="loading"> 
            <template slot="progress">
                <v-progress-linear
                    color="primary"
                    height="8"
                    indeterminate
                ></v-progress-linear>
            </template>

            <v-toolbar color = "primary"> 
                <v-toolbar-title style="color:white"> Uloguj se
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <form method="post" @submit="sendLogin">
                    <v-text-field v-model="username" :rules="[rules.requiredUsername]" label="Korisničko ime" name="username"/>

                    <v-text-field v-model="password" :rules="[rules.requiredPassword]" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" 
                    :type= "showPassword ? 'text': 'password'" label="Lozinka" name ="password"
                    @click:append="showPassword=!showPassword"/>
                    <hr/>
                    <div class="text-center">
                        <v-btn :disabled="loading" color="primary" block type="submit">Uloguj se</v-btn>
                    </div>
                </form>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import {mapActions} from 'vuex'
import axios from 'axios';
import Vue from 'vue'

export default { 
    name : "Login",
    data(){ 
        return {
            username: '',
            password: '',
            token: '',
            error:false,
            loading:false,
            showPassword:false,
            snackbar:true,
            validForm:()=>false && !!this.validPassword,
            validUsername:false,
            validPassword:false,
            errorMessage:'',
            rules: {
                requiredUsername: value => {
                    if(!value){
                        this.validUsername=false;
                        return "Required";
                    }

                    this.validUsername=true;
                    return true;
                },
                requiredPassword: value => {
                    if(!value){
                        this.validPassword=false;
                        return "Required";
                    }

                    this.validPassword=true;
                    return true;
                }
            }
        } 
    },
    methods: {
        ...mapActions({ 
            signIn:'auth/signIn',
            saveUserImage:'auth/saveUserImage'
        }),
         sendLogin(e){
            e.preventDefault();
            this.loading = true;
            axios.post(Vue.prototype.$login,{
                username:this.username,
                password:this.password
            }).then((response)=>{
                this.signIn({token:response.data.accessToken,refreshToken:response.data.refreshToken});
                this.error=false;
                this.loading = false;

                axios.get(Vue.prototype.$image).then((imageResponse)=>{
                    this.saveUserImage(imageResponse.data);
                });

                this.$router.push('/account');
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
</style>