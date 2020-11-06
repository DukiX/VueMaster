<template>
    <div id = "registerCmp">
        <v-alert id="alert" type="error"  min-width="400" max-width="400" v-if="error">
            Registration failed. Username is already taken.
        </v-alert>
        <v-card id="card" elevation="12" min-width="400" max-width="400" > 
            <v-toolbar color = "#1976d2"> 
                <v-toolbar-title style="color:white"> Register
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <form method="post" @submit="sendRegister">
                    <v-text-field v-model="email" :rules="[rules.required]"  type="email" label="Email address" name="email"/>

                    <v-text-field v-model="username" :rules="[rules.required]"  label="Username" name="username"/>

                    <v-text-field v-model="firstName" :rules="[rules.required]" label="First Name" name="firstName"/>

                    <v-text-field v-model="lastName" :rules="[rules.required]" label="LastName" name="lastName"/>

                    <v-text-field v-model="password" :rules="[rules.required]" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" 
                        :type= "showPassword ? 'text': 'password'" label="Password" name ="password"
                        @click:append="showPassword=!showPassword"/>

                        <v-text-field v-model="confirmPassword" :rules="[rules.required, rules.passwordMatch]" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" 
                        :type= "showPassword ? 'text': 'password'" label="Confirm Password" name ="confirmPassword"
                        @click:append="showPassword=!showPassword"/>

                    <hr/>

                    <div class="text-center">
                        <v-btn :loading="loading" color="primary" block type="submit">Register</v-btn>
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
    name : "Register",
    data(){ 
        return {
            email:'',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            token: '',
            error:false,
            loading:false,
            showPassword:false,
            validForm:false,
            validPassword:false,
            rules: {
                required: value => {
                    if(!value)
                        return "Required";
                    return true;
                },
                passwordMatch: () => {
                    if(this.password===this.confirmPassword){
                        this.validPassword = true;
                        return true;
                    }
                    this.validPassword = false;
                    return `The Confirm password does not match the password.`;
                }
            }
        }
    },
    methods: {
        ...mapActions({ 
            signIn:'auth/signIn' 
        }),
         sendRegister(e){
             e.preventDefault();
             this.loading = true;
            axios.post(Vue.prototype.$register,{
                email:this.email,
                username:this.username,
                password:this.password,
                firstName:this.firstName,
                lastName:this.lastName,
                confirmPassword:this.confirmPassword
            }).then((response)=>{
                this.$router.go('/login');
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
#registerCmp{
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