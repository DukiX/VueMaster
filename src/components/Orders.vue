<template>
    <v-container>
        <h2 class="display-2 mb-4">Moje narudzbine</h2>

        <v-data-table
        style="cursor: pointer"
        :headers="headers"
        :items="orders"
        item-key="name"
        class="elevation-1"
        @click:row="clickRow"
        >
        </v-data-table>

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
        headers () {
        return [
          {
            text: this.forBuyer ? 'Ime prodavca:': 
                            'Ime kupca:',
            align: 'start',
            sortable: true,
            value: this.forBuyer ? 'prodavac.firstName':'kupac.firstName',
          },
          {
            text: this.forBuyer ? 'Prezime prodavca:': 
                            'Prezime kupca:',
            align: 'start',
            sortable: true,
            value: this.forBuyer ? 'prodavac.lastName':'kupac.lastName',
          },
          {
            text: 'Status narudzbine',
            value: 'stausNarudzbineString',
          },
          { text: 'Vreme isporuke u danima:', value: 'vremeIsporukeUDanima' },
          { text: 'Datum narudzbine:', value: 'datumNarudzbinePretty' }
        ]
      }
    },
    methods:{
        getPrettyDate(d){
            var date = new Date(d);
            return date.getUTCDate()+'.'+date.getUTCMonth()+1+'.'+date.getUTCFullYear();
        },
        clickRow(item){
            this.$router.push('/orders/'+item.id);
        }
    },
    beforeMount() {
        axios.get(this.forBuyer ? Vue.prototype.$ordersForBuyer : Vue.prototype.$ordersForSeller).then((response)=>{
            this.orders = response.data;
            this.orders.forEach(e=>{
                e.datumNarudzbinePretty = this.getPrettyDate(e.datumNarudzbine);
                e.stausNarudzbineString = e.statusNarudzbine == 0 ? 'Nova' : (e.statusNarudzbine == 1) ? 'Odbijena':'Odobrena';
                if(e.vremeIsporukeUDanima == null) e.vremeIsporukeUDanima = "/";
            });
            this.error = false;
        }).catch(()=>{
            this.error=true;
        });
    }
}
</script>