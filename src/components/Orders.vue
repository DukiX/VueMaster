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
            :custom-sort="customSort"
            >
            <template v-slot:item.datumNarudzbine="{ item }">
                {{ formatDate(item.datumNarudzbine) }}
            </template>
        </v-data-table>

        <v-container v-if="orders.length==0">
            <h3 style=" text-align: center;">Nema narudzbina</h3>
        </v-container>

    </v-container>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import moment from 'moment';

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
          { text: 'Datum narudzbine:', value: 'datumNarudzbine' }
        ]
      }
    },
    methods:{
        customSort(items, index, isDescending) {
          items.sort((a, b) => {
              if (index == 'datumNarudzbine') {
                    var date1 = moment(a.datumNarudzbine);
                    var date2 = moment(b.datumNarudzbine);

                    if (isDescending[0]) {
                        return (date1 <= date2) ? -1 : 1;
                    } else {
                        return (date1 > date2) ? -1 : 1;
                    }
                }
                // else if (!(isNaN(a[index[0]]))) {
                //     console.log("aaa");
                //     if (isDescending[0]) {
                //         return (a[index] - b[index]);
                //     } else {
                //         return (b[index] - a[index]);
                //     }

                // }
                else {
                    //index je kompleksan pa ne radi ima . npr prodavac.lastName
                    if (isDescending[0]) {
                        return a[index] < b[index] ? -1 : 1;
                    } else {
                        return b[index] < a[index] ? -1 : 1;
                    }
                }
          });

          return items;
        },
        formatDate(value) {
            return moment(value).format("MMMM DD YYYY")
        },
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