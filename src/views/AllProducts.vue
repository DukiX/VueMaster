<template>
  <v-app>
    <v-main>
      <div>
        <v-container style="height: 100vh; max-height: 100%;">
          <v-row justify="center" align="center">
            <ProductGrid id="grid"/>
          </v-row>
        </v-container>
        <router-view/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import ProductGrid from '../components/ProductGrid.vue';

export default {
  name: 'App',

  components: {
    ProductGrid
  },
}
</script>

<style scoped>
#grid{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>