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
          <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on" :disabled="loading" color="success" elevation="5" type="button" style="float: right;">Naruči</v-btn>
              </template>
              <v-card>
                  <v-card-title>
                      Potvrdi narudžbinu
                  </v-card-title>
                  <v-divider></v-divider>

                  <v-card-text>
                      <br>
                      Klikom na pošalji izvršićete narudžbinu.
                  </v-card-text>
                  
                  <v-card-actions>
                      <v-btn
                      color="white"
                      elevation="5"
                      @click="dialog=false"
                  >
                      Odustani
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="primary"
                      elevation="5"
                      @click="order"
                  >
                      Pošalji
                  </v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
          <!-- <v-btn color="success" @click="order" larger style="float: right;">Naruči</v-btn> -->
        </v-container>
    </div>
    <v-container v-if="basket.length==0 && !orderSent">
      <h3 style=" text-align: center;">Korpa je prazna.</h3>
    </v-container>
    <v-container v-if="basket.length==0 && orderSent">
      <h3 style=" text-align: center;">Narudžbina je uspešno poslata.</h3>
    </v-container>

  </v-container>
</template>

<script>
import store from '../store/index'
import {mapActions} from 'vuex'
import axios from 'axios';
import Vue from 'vue';

export default {
    data(){
        return {
          newOrderResponse : null,
          error:false,
          loading:false,
          dialog:false,
          orderSent:false
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
            removeItemFromBasket:'basket/removeFromBasket',
            emptyBasket:'basket/emptyBasket'
        }),
        deleteItem(id){
            this.removeItemFromBasket(id);
        },
        order(){
          var body = {
            ListaElemenata:this.getListaElemenata()
          };
          axios.post(Vue.prototype.$orders,body).then((response)=>{
            this.newOrderResponse = response.data;
            this.error = false;
            this.emptyBasket();
            this.orderSent =true;
          }).catch(()=>{
              this.error=true;
          }).finally(()=>{
              this.dialog =false;
          });
        },
        getListaElemenata(){
          var lista = [];
          this.basket.forEach(element => {
            lista.push({
              Id:element.itemId,
              Kolicina:element.quantity
            });
          });
          return lista;
        }
    }
}
</script>