<template>
    <div>
        <v-snackbar v-model="error">
            <span>{{errorMessage}}</span>
            <v-btn color="red" text @click="error = false" >
                Zatvori
            </v-btn>
        </v-snackbar>
        <v-snackbar v-model="success">
            <span>Uspešno ste promenili lozinku!</span>
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
                <v-toolbar-title style="color:white"> Promeni Lozinku
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text>
                <form method="post" @submit="changePassword">
                    <v-text-field v-model="oldPassword" :rules="[rules.required]" :append-icon="showOldPassword ? 'mdi-eye': 'mdi-eye-off'" 
                    :type= "showOldPassword ? 'text': 'password'" label="Stara lozinka" name ="oldPassword"
                    @click:append="showOldPassword=!showOldPassword"/>
                    
                    <v-text-field v-model="newPassword" :rules="[rules.required]" :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'" 
                    :type= "showPassword ? 'text': 'password'" label="Nova lozinka" name ="newPassword"
                    @click:append="showPassword=!showPassword"/>

                     <v-text-field v-model="confirmPassword" :rules="[rules.required, rules.passwordMatch]" :append-icon="showConfirmPassword ? 'mdi-eye': 'mdi-eye-off'" 
                    :type= "showConfirmPassword ? 'text': 'password'" label="Ponovi novu lozinku" name ="confirmPassword"
                    @click:append="showConfirmPassword=!showConfirmPassword"/>

                    <div class="text-center">
                        <v-btn :disabled="loading || !filled" color="primary" block type="submit">Promeni lozinku</v-btn>
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
    name : "ChangePassword",
    data(){ 
        return {
            oldPassword: '',
            newPassword:'',
            confirmPassword:'',
            error:false,
            loading:false,
            showOldPassword:false,
            showPassword:false,
            showConfirmPassword:false,
            success:false,
            errorMessage:'',
            rules: {
                required: value => {
                    if(!value)
                        return "Required";
                    return true;
                },
                passwordMatch: () => {
                    if(this.newPassword===this.confirmPassword){
                        this.validPassword = true;
                        return true;
                    }
                    this.validPassword = false;
                    return `The Confirm password does not match the password.`;
                }
            }
        } 
    },
    computed:{
        filled(){
            return this.oldPassword != null && this.newPassword != null && this.confirmPassword != null 
            && this.oldPassword != '' && this.newPassword != '' && this.confirmPassword != ''
            && this.newPassword===this.confirmPassword;
        }
    },
    methods: {
        ...mapActions({ 
            signIn:'auth/signIn' 
        }),
         changePassword(e){
            e.preventDefault();
            this.loading = true;
            axios.post(Vue.prototype.$changePassword,{
                oldPassword:this.oldPassword,
                newPassword:this.newPassword,
                confirmPassword:this.confirmPassword
            }).then((response)=>{
                this.signIn(response.data);
                this.error=false;
                this.loading = false;
                this.success = true;
                setTimeout(() => { this.$router.push('/account'); }, 2000);
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