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
            price: 0,
            description: '',
            wayOfUse : '',
            seller: null,
            image:'',
            error : false
        }
    },
    mounted() {
        var id = this.$route.params.id;
        axios.get(Vue.prototype.$products+"/"+id).then((response)=>{
            this.name = response.data.naziv;
            this.price = response.data.cena;
            this.description = response.data.opis;
            this.wayOfUse = Vue.prototype.$wayOfUse.find(x => x.number == response.data.nacinKoriscenja).desc;
            this.seller = response.data.prodavac;
            if(response.data.slika!=null){
                this.image = 'data:image/jpeg;base64,'+response.data.slika;
            }
        }).catch(()=>{
            this.error=true;
        });
    }
}
</script>