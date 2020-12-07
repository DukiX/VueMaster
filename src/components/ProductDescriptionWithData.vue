<template>
    <div>
        <ProductDescription :name = "name" :price = "price" :description = "description" :wayOfUse = "wayOfUse" :seller = "seller" :image = "image" :preview = "false"/>
    </div>
</template>

<script>
import ProductDescription from '@/components/ProductDescription.vue';
import axios from 'axios';
import Vue from 'vue'

export default {
    name: 'ProductDescriptionWithData',
    components: {
        ProductDescription
    },
    data(){
        return {
            name : '',
            price: '',
            description: '',
            wayOfUse : '',
            seller: null,
            image:'',
            error : false
        }
    },
    created() {
        var id = this.$route.params.id;
        axios.get(Vue.prototype.$products+"/"+id).then((response)=>{
            this.name = response.data.naziv;
            this.price = response.data.cena;
            this.description = response.data.opis;
            this.wayOfUse = response.data.nacinKoriscenja;
            this.seller = response.data.prodavac;
            this.image = 'data:image/jpeg;base64,'+response.data.slika;
        }).catch(()=>{
            this.error=true;
        });
    }
}
</script>