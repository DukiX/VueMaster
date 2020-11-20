<template>
  <div >
    <v-toolbar color="primary" height="50px">
      <v-row justify = "end">
        <v-btn tile @click="$router.push('/').catch(err => {$router.go()})">Home</v-btn>
        <v-btn tile @click="$router.push('/about').catch(err => {$router.go()})">About</v-btn>
        <v-btn tile v-show="!loggedIn" @click="$router.push('/login').catch(err => {$router.go()})">Login</v-btn>
        <v-btn tile v-show="!loggedIn" @click="$router.push('/register').catch(err => {$router.go()})">Register</v-btn>
        <v-btn tile v-show="loggedIn" v-on:click="signOut">Logout</v-btn>
        <v-btn tile v-show="loggedIn" @click="$router.push('/account').catch(err => {$router.go()})">Account</v-btn>
      </v-row>
    </v-toolbar>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import store from '../store/index'

export default {
    name : "Header",
    methods:{
        ...mapActions({
            signOutAuth:'auth/signOut'
        }),

        signOut(){
            this.$router.go('/login');
            this.signOutAuth()
        }
    },
    computed: {
    loggedIn: function () {
      return store.getters['auth/isLoggedIn']
    }
  }
}
</script>

<style scoped>
</style>