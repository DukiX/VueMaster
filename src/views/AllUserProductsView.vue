<template>
      <div>
        <v-container style="height: 100vh; max-height: 100%;">
          <v-row justify="center" align="center">
            <v-col>
            <v-row>
              <h2 id = "naslov">Moji Proizvodi</h2>
            </v-row>
            <v-row>
              <ProductGrid id="grid" forUser/>
            </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
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
#naslov{
  margin-left:130px; 
  margin-top:80px; 
  margin-bottom:-50px;
  font-size: 35px;
}
</style>