<template>
    <div id = "registerCmp">
        <v-snackbar v-model="error">
            <span>{{errorMessage}}</span>
            <v-btn color="red" text @click="error = false" >
                Zatvori
            </v-btn>
        </v-snackbar>
        <v-card id="card" elevation="12" min-width="400" max-width="400" :loading="loading"> 
            <template slot="progress">
                <v-progress-linear
                    color="primary"
                    height="8"
                    indeterminate
                ></v-progress-linear>
            </template>
            <v-toolbar color = "primary"> 
                <v-toolbar-title style="color:white"> Registruj se
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <form method="post" @submit="sendRegister">
                    <v-text-field v-model="email" :rules="[rules.required]"  type="email" label="Email adresa" name="email"/>

                    <v-text-field v-model="username" :rules="[rules.required]"  label="Korisničko ime" name="username"/>

                    <v-text-field v-model="firstName" :rules="[rules.required]" label="Ime" name="firstName"/>

                    <v-text-field v-model="lastName" :rules="[rules.required]" label="Prezime" name="lastName"/>

                    <v-text-field v-model="phoneNumber" label="Broj telefona" name="phoneNumber"/>

                    <v-text-field v-model="address" label="Adresa" name="address"/>

                    <v-text-field v-model="password" :rules="[rules.required]" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" 
                        :type= "showPassword ? 'text': 'password'" label="Lozinka" name ="password"
                        @click:append="showPassword=!showPassword"/>

                    <v-text-field v-model="confirmPassword" :rules="[rules.required, rules.passwordMatch]" :append-icon="showConfirmPassword ? 'mdi-eye': 'mdi-eye-off'" 
                    :type= "showConfirmPassword ? 'text': 'password'" label="Ponovi lozinku" name ="confirmPassword"
                    @click:append="showConfirmPassword=!showConfirmPassword"/>

                    <hr/>

                    <div class="text-center">
                        <v-btn :disabled="loading || !filled" color="primary" block type="submit">Registruj se</v-btn>
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
            phoneNumber:'',
            address:'',
            confirmPassword: '',
            token: '',
            error:false,
            loading:false,
            showPassword:false,
            showConfirmPassword:false,
            errorMessage:'',
            validForm:false,
            validPassword:false,
            rules: {
                required: value => {
                    if(!value)
                        return "Zahtevano polje.";
                    return true;
                },
                passwordMatch: () => {
                    if(this.password===this.confirmPassword){
                        this.validPassword = true;
                        return true;
                    }
                    this.validPassword = false;
                    return `Ponovljena lozinka se ne poklapa sa lozinkom.`;
                }
            }
        }
    },
    computed:{
        filled(){
            return this.email != null && this.username != null && this.password != null &&
            this.confirmPassword != null &&this.firstName !=null && this.lastName != null
            && this.email != '' && this.username != '' && this.password != '' &&
            this.confirmPassword != '' &&this.firstName !='' && this.lastName != '' 
            && this.password===this.confirmPassword;
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
                confirmPassword:this.confirmPassword,
                phoneNumber:this.phoneNumber,
                address:this.address
            }).then((response)=>{
                this.$router.go('/login');
                this.signIn(response.data);
                this.error=false;
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
</style>