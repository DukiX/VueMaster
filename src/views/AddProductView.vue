<template>
    <v-container fill-height style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <AddProduct id="prod"/>
        </v-row>
    </v-container>
</template>

<script>
import AddProduct from '../components/AddProduct.vue'

export default {
  name: 'AddProductVue',
  components: {
    AddProduct
  }
}
</script>

<style>
#prod{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>