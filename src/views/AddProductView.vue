<template>
    <v-container fill-height style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <ProductForm id="prod" naslov="Dodavanje novog proizvoda"/>
        </v-row>
    </v-container>
</template>

<script>
import ProductForm from '../components/ProductForm.vue'

export default {
  name: 'AddProductVue',
  components: {
    ProductForm
  }
}
</script>

<style>
#prod{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>