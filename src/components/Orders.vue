<template>
    <v-container>
    <h2 class="display-2 mb-4">Moje narudzbine</h2>

    <v-list v-if="orders.length!=0" two-line>
        <v-list-item-group color="primary">
            <template v-for="(order, index) in orders">
                <v-list-item :key="order.id"> 

                    <v-list-item-content>
                        <v-list-item-title> {{forBuyer ? ('Narudzbina za: '+order.prodavac.firstName + order.prodavac.lastName) : 
                            ('Narudzbina od: '+order.kupac.firstName + order.kupac.lastName)}} </v-list-item-title>
                    </v-list-item-content>

                    <v-spacer></v-spacer>
                
                    <v-list-item-content style="margin-right:-30px">
                        <span > Status narudzbine: {{order.statusNarudzbine == 0 ? 'Nova' : (order.statusNarudzbine == 1) ? 'Odbijena':'Odobrena'}}</span>
                    </v-list-item-content>

                    <v-list-item-content>
                        Vreme isporuke u danima: {{order.vremeIsporukeUDanima==null ? '/' : order.vremeIsporukeUDanima}}
                    </v-list-item-content>

                    <v-list-item-content>
                        Datum narudzbine: {{getPrettyDate(order.datumNarudzbine)}}
                    </v-list-item-content>
                </v-list-item >

                <v-divider v-if="index + 1 < order.length" :key="index" style="margin-bottom:15px"></v-divider>
            </template>
        </v-list-item-group>
    </v-list>
    <v-container v-if="orders.length==0">
      <h3 style=" text-align: center;">Nema narudzbina</h3>
    </v-container>

  </v-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

export default {
    props:{
        forBuyer:Boolean
    },
    data(){
        return {
            orders:[],
            error : false
        }
    },
    computed: {
    },
    methods:{
        getPrettyDate(d){
            var date = new Date(d);
            return date.getUTCDate()+'.'+date.getUTCMonth()+1+'.'+date.getUTCFullYear();
        }
    },
    beforeMount() {
        axios.get(this.forBuyer ? Vue.prototype.$ordersForBuyer : Vue.prototype.$ordersForSeller).then((response)=>{
            this.orders = response.data;
            this.error = false;
            console.log(response.data);
        }).catch(()=>{
            this.error=true;
        });
    }
}
</script>