<template>
    <v-container>
    <h2 class="display-2 mb-4">Korpa</h2>

    <v-list v-if="basket.length!=0" two-line>
      <template v-for="(product, index) in basket">
        <v-list-item :key="product.id" avatar> 

            <v-list-item-content>
            <v-list-item-title v-html="product.name"></v-list-item-title>
            </v-list-item-content>

            <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
        
            <v-list-item-content style="margin-right:-30px">
                <span >{{product.price}} RSD</span>
            </v-list-item-content>

            <!-- <v-list-item-action>
            <v-text-field style="padding-right:30px; padding-left:20px; width:120px" label="Quantity" reverse :value="product.quantity"></v-text-field>
            </v-list-item-action> -->

            <v-list-item-content style="padding-left:30px;">
                Količina: {{product.quantity}}
            </v-list-item-content>

            <v-list-item-content>
            {{product.price * product.quantity}} RSD
            </v-list-item-content>

            <v-list-item-action>
            <v-btn icon ripple style="margin-left:-20px">
                <v-icon @click="deleteItem(product.id)" color="red lighten-1">delete</v-icon>
            </v-btn>
            </v-list-item-action>
        </v-list-item >

        <v-divider v-if="index + 1 < basket.length" :key="index" style="margin-bottom:15px"></v-divider>
      </template>
    </v-list>
    <div v-if="basket.length!=0">
        <v-divider ></v-divider>
        <v-container  style="display: flex; justify-content: flex-end">
            <span style="font-size:18px">Ukupno: {{total}} RSD</span>
        </v-container>

        <v-container >
        <v-btn color="success" larger style="float: right;">Naruči</v-btn>
        </v-container>
    </div>
    <v-container v-if="basket.length==0">
      <h3 style=" text-align: center;">Korpa je prazna.</h3>
    </v-container>

  </v-container>
</template>

<script>
import store from '../store/index'
import {mapActions} from 'vuex'

export default {
    data(){
        return {
        }
    },
    computed: {
      basket() {
        return store.getters['basket/getBasket'];
      },
      total(){
        let tot = 0;
        this.basket.forEach(el=>tot+=el.quantity*el.price);
        return tot;
      }
    },
    methods:{
        ...mapActions({ 
            removeItemFromBasket:'basket/removeFromBasket'
        }),
        deleteItem(id){
            this.removeItemFromBasket(id);
        }
    }
}
</script>