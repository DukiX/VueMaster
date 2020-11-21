<template>
    <div id="loginCmp">
        <v-snackbar v-model="error">
            <span>Please enter a correct username and password.</span>
            <v-btn color="red" text @click="error = false" >
                Close
            </v-btn>
        </v-snackbar>
        <v-card id="card" elevation="12" min-width="330" max-width="330" > 
            <v-toolbar color = "primary"> 
                <v-toolbar-title style="color:white"> Sign in 
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <form method="post" @submit="sendLogin">
                    <v-text-field v-model="username" :rules="[rules.requiredUsername]" label="Username" name="username"/>

                    <v-text-field v-model="password" :rules="[rules.requiredPassword]" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" 
                    :type= "showPassword ? 'text': 'password'" label="Password" name ="password"
                    @click:append="showPassword=!showPassword"/>
                    <hr/>
                    <div class="text-center">
                        <v-btn :loading="loading" color="primary" block type="submit">Login</v-btn>
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
            signIn:'auth/signIn' 
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
                this.$router.push('/account');
            }).catch(()=>{
                this.error=true;
                this.loading = false;
            });
        }
    }
}
</script>

<style scoped>
</style>