<template>
  <div >
    <v-app-bar color="primary" fixed>
      <v-btn @click="$router.push('/').catch(err => {$router.go()})" icon x-large>
        <v-icon x-large>
          mdi-home
        </v-icon>
      </v-btn>

      <v-spacer></v-spacer>

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
          <v-list >
            <v-list-item-group color="primary">
              <v-list-item v-if="loggedIn">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn" @click="$router.push('/account').catch(err => {$router.go()})">Moj Profil</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="loggedIn">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn" v-on:click="$router.push('/change-password').catch(err => {$router.go()})">Promeni lozinku</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item v-if="loggedIn">
                <v-list-item-content>
                  <v-list-item-title v-if="loggedIn" v-on:click="signOut">Izloguj se</v-list-item-title>
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
            defaultImage: require("@/assets/defaultAccountIcon.png")
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

        console.log(image);

        if(typeof(image) !== 'undefined' && image != null){
            return image;
        }else{
            return this.defaultImage;
        }
      },
      loggedIn: function () {
        return store.getters['auth/isLoggedIn'];
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