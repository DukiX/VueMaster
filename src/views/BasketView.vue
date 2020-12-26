<template>
    <v-container style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <Basket id="acc"/>
        </v-row>
    </v-container>
</template>

<script>
import Basket from '../components/Basket.vue'

export default {
  name: 'BasketView',
  components: {
    Basket
  }
}
</script>

<style>
#acc{
  padding-top: 100px;
  padding-bottom: 50px;
}
</style>