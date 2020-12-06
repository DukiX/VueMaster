<template>
    <v-container style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <ProductDescriptionWithData id="prod"/>
        </v-row>
    </v-container>
</template>

<script>
import ProductDescriptionWithData from '../components/ProductDescriptionWithData.vue'

export default {
  name: 'Product',
  components: {
    ProductDescriptionWithData
  }
}
</script>

<style>
#prod{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>