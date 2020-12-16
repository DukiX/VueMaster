<template>
  <v-app>
    <v-main>
      <div>
        <Header class="header"/>
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';
import axios from 'axios';
import {mapActions} from 'vuex'
import Vue from 'vue'
import store from './store' 

export default {
  name: 'App',

  components: {
    Header,
  },

  data: () => ({
    //
  }), 
  methods:{
    ...mapActions({ 
            signIn:'auth/signIn' 
        }),
  },
  
  created(){
    axios.defaults.baseURL = Vue.prototype.$apiUri;

    axios.interceptors.request.use(
      async config => {
        config.headers = { 
          'Authorization':`Bearer ${store.getters['auth/getToken']}`
        }
        return config;
      },
      error => {
        Promise.reject(error)
    });

    axios.interceptors.response.use( (response) => {
      // Return a successful response back to the calling service
      return response;
    }, (error) => {
      let originalRequest = error.config;
      // Return any error which is not due to authentication back to the calling service
      if (error.response.status !== 401 ) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      return axios.post(Vue.prototype.$apiUri+Vue.prototype.$refresh,
            {
              "token": store.getters['auth/getRefreshToken']
            })
            .then(res => {
                if (res.status === 200) {
                  this.signIn(res.data);
                  axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
                  return axios(originalRequest);
                }
            });
    });
  }
}; 
</script>