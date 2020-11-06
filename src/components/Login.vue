<template>
    <div id="loginCmp">
        <!-- <v-snackbar v-model="snackbar">
            <span>Please enter a correct username and password.</span>
            <v-btn color="red" text @click="error = false" >
                Close
            </v-btn>
        </v-snackbar> -->
        <v-alert id="alert" min-width="300" max-width="300" type="error" v-if="error">
            Please enter a correct username and password.
        </v-alert>
        <v-card id="card" elevation="12" min-width="300" max-width="300" > 
            <v-toolbar color = "#1976d2"> 
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
                this.$router.go('/account');
                this.signIn({token:response.data.accessToken,refreshToken:response.data.refreshToken});
                this.error=false;
                this.loading = false;
            }).catch(()=>{
                this.error=true;
                this.loading = false;
            });
        }
    }
}
</script>

<style scoped>
#loginCmp{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#alert{
    position: absolute;
    top:-100px;
}

#card{
    position: relative;
}
</style>