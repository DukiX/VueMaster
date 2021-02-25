<template>
    <v-container style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
            <Order id="order"/>
        </v-row>
    </v-container>
</template>

<script>
import Order from '../components/Order.vue'

export default {
  name: 'OrderView',
  components: {
    Order
  },
  computed:{
  }
}
</script>

<style>
#order{
  padding-top: 100px;
  padding-bottom: 70px;
}
</style>