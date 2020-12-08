<template>
    <div>
        <v-container id="cont">
            <v-row>
                <v-col v-for="product in productList" :key="product.id" lg="2" md="3" sm="4">
                    <v-hover v-slot="{ hover }">
                        <ProductCard :id="product.id" :name = "product.naziv" :price = "product.cena" :wayOfUse = "product.nacinKoriscenja" :image = "product.slika" :hover="hover"/>
                    </v-hover>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue';
import axios from 'axios';
import Vue from 'vue'

export default {
    name: 'ProductGrid',
    components: {
        ProductCard
    },
    data(){
        return {
            error : false,
            productList:null
        }
    },
    mounted() {
        axios.get(Vue.prototype.$products).then((response)=>{
            this.productList=response.data;
        }).catch(()=>{
            this.error=true;
        });
    }
}
</script>

<style scoped>
#cont{
    width: 80vw;
}
</style>