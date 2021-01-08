<template>
    <v-container style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <Orders :forBuyer = "!isSeller" id = "acc"/>
        </v-row>
    </v-container>
</template>

<script>
import Orders from '../components/Orders.vue'
import store from '../store/index'

export default {
  name: 'OrdersView',
  components: {
    Orders
  },
  computed:{
      isSeller() {
        return store.getters['auth/getUserRole']=="PRODAVAC";
      }
  }
}
</script>

<style>
#acc{
  padding-top: 100px;
  padding-bottom: 50px;
}
</style>