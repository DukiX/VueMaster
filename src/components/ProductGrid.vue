<template>
    <div>
        <v-container id="cont" >
            <v-row  v-if="!loading" style="margin-left:6vw; margin-right:1vw;">
                <v-col v-for="product in productList" :key="product.id" xl = "3" lg="4">
                    <v-hover v-slot="{ hover }">
                        <ProductCard :id="product.id" :name = "product.naziv" :price = "product.cena" :wayOfUse = "wayOfUse(product.nacinKoriscenja)" 
                        :image = "product.slika" :hover="hover" :forUser="forUser"/>
                    </v-hover>
                </v-col>
            </v-row>
            
            <v-row style="margin-left:6vw; margin-right:1vw;">
                <v-col v-for="i in 12" :key="i" lg="4" md="6" sm="12">
                    <v-skeleton-loader type="card" loading v-if="loading">
                    </v-skeleton-loader>
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
    props:{
        forUser:Boolean
    },
    components: {
        ProductCard
    },
    data(){
        return {
            error : false,
            productList:null,
            loading:false
        }
    },
    mounted() {
        this.loading = true;
        let path = '';
        if(this.forUser){
            path = Vue.prototype.$products+"/user";
        }else{
            path = Vue.prototype.$products;
        }
        axios.get(path).then((response)=>{
            this.productList=response.data;
            this.loading = false;
        }).catch(()=>{
            this.error=true;
            this.loading = false;
        });
    },
    methods:{
        wayOfUse(number){
            return Vue.prototype.$wayOfUse.find(x => x.number == number).desc;
        }
    }
}
</script>

<style scoped>
#cont{
    width: 80vw;
}
</style>