<template>
  <div >
    <v-app-bar color="primary" fixed>
      <a style="margin-left:10px;" @click="$router.push('/').catch(err => {$router.go()})">
        <div>
          <v-img :src="logo" max-width="50px" style="float:left;"/>
          <span style="margin-left:20px; margin-top:7px; color: white; display: inline-block; font-size: 25px; ">Medenjaci</span>
        </div>
      </a>

      <v-spacer></v-spacer>
      <v-icon v-if="loggedIn && !isSeller" style="padding-right:25px" v-on:click="$router.push('/basket').catch(err => {$router.go()})" x-large>shopping_cart</v-icon>
      <v-menu offset-y v-if="loggedIn">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar color="primary" size="50" >
              <img :src="realOrDefaultImage" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card
          class="mx-auto"
          min-width="300"
          tile
        >
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item v-if="loggedIn" @click="$router.push('/account').catch(err => {$router.go()})">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn">Moj Profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="loggedIn" v-on:click="$router.push('/change-password').catch(err => {$router.go()})">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn">Promeni lozinku</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="loggedIn && isSeller" v-on:click="$router.push('/add-product').catch(err => {$router.go()})">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn && isSeller">Dodaj novi proizvod</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
               <v-list-item v-if="loggedIn && isSeller" v-on:click="$router.push('/my-products').catch(err => {$router.go()})">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn && isSeller">Moji proizvodi</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="loggedIn" v-on:click="$router.push('/orders').catch(err => {$router.go()})">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn">Moje narudžbine</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item v-if="loggedIn" v-on:click="signOut">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn">Izloguj se</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <v-row justify = "end" v-show="!loggedIn">
        <v-btn id="bttn" tile v-show="!loggedIn" @click="$router.push('/login').catch(err => {$router.go()})">Uloguj se</v-btn>
        <v-btn id="bttn" tile v-show="!loggedIn" @click="$router.push('/register').catch(err => {$router.go()})">Registruj se</v-btn>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import store from '../store/index'

export default {
    name : "Header",
    data(){
        return {
            defaultImage: require("@/assets/defaultAccountIcon.png"),
            logo: require("@/assets/honeyLogo.png")
        }
    },
    methods:{
        ...mapActions({
            signOutAuth:'auth/signOut'
        }),

        signOut(){
            this.signOutAuth();
            this.$router.push('/');
        }
    },
    computed: {
      realOrDefaultImage() {
        var image = store.getters['auth/getUserAvatar'];

        if(typeof(image) !== 'undefined' && image != null  && this.image != ""){
            return image;
        }else{
            return this.defaultImage;
        }
      },
      loggedIn: function () {
        return store.getters['auth/isLoggedIn'];
      },
      isSeller() {
        return store.getters['auth/getUserRole']=="PRODAVAC";
      }
  }
}
</script>

<style scoped>
#bttn{
  width: 130px;
  margin: 10px;
}
</style>