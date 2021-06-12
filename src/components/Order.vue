<template>
    <div>
        <v-snackbar v-model="error">
            <span>"Došlo je do greške pri ažuriranju narudžbine."</span>
            <v-btn color="red" text @click="error = false" >
                Zatvori
            </v-btn>
        </v-snackbar>
        <h2 class="display-2 mb-4">Detalji narudžbine</h2>
        <br>
        <div>
            <div style="width:70vw">
                <h2>Artikli:</h2>
                <br>
                <v-divider></v-divider>
                <v-list v-if="order.listaElemenata.length!=0" two-line>
                    <template v-for="(product, index) in order.listaElemenata">
                        <v-list-item :key="product.proizvod.id" avatar> 

                            <v-list-item-content>
                            <v-list-item-title v-html="product.proizvod.naziv"></v-list-item-title>
                            </v-list-item-content>

                            <v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer><v-spacer></v-spacer>
                        
                            <v-list-item-content style="margin-right:-30px">
                                <span >{{product.proizvod.cena}} RSD</span>
                            </v-list-item-content>

                            <v-list-item-content style="padding-left:30px;">
                                Količina: {{product.kolicina}}
                            </v-list-item-content>

                            <v-list-item-content>
                            {{product.proizvod.cena * product.kolicina}} RSD
                            </v-list-item-content>
                        </v-list-item >

                        <v-divider v-if="index + 1 < order.listaElemenata.length" :key="index" style="margin-bottom:15px"></v-divider>
                    </template>
                </v-list>
            </div>
            <div>
                <v-divider ></v-divider>
                <v-container  style="display: flex; justify-content: flex-end">
                    <span style="font-size:18px">Ukupno: {{total}} RSD</span>
                </v-container>
            </div>
        </div>
        <div v-if="isBuyer" style="width:70vw; display: block; margin-left: auto; margin-right: auto;">
            <h2>Detalji o kupcu:</h2>
            <br>
            <v-divider></v-divider>
            <br>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Ime i prezime:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px"> {{order.kupac.firstName}} {{order.kupac.lastName}}</p>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Broj telefona:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px">{{order.kupac.phoneNumber}}</p>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Email:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px">{{order.kupac.email}}</p>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Adresa:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px">{{order.kupac.address}}</p>
                </v-col>
            </v-row>
        </div>
        <div v-if="!isBuyer" style="width:70vw; display: block; margin-left: auto; margin-right: auto;">
            <h2>Detalji o prodavcu:</h2>
            <br>
            <v-divider></v-divider>
            <br>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Ime i prezime:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px"> {{order.prodavac.firstName}} {{order.prodavac.lastName}}</p>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Broj telefona:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px">{{order.prodavac.phoneNumber}}</p>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Email:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px">{{order.prodavac.email}}</p>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col>
                    <p style="font-size:16px">Adresa:</p>
                </v-col>
                <v-col>
                    <p style="font-size:16px">{{order.prodavac.address}}</p>
                </v-col>
            </v-row>
        </div>
        <v-divider></v-divider>
        <br>
        <div style="width:70vw; ">
            <h2>Status narudžbine: {{(order.statusNarudzbine == 0)? "Nova":(order.statusNarudzbine == 1)?"Odbijena":"Odobrena"}}</h2>
            <h2>Datum narudžbine: {{formatDate(order.datumNarudzbine)}}</h2>
            <h2 v-if="order.statusNarudzbine == 2">Vreme isporuke narudžbine: {{order.vremeIsporukeUDanima}} dana</h2>
            <h2 v-if="order.statusNarudzbine == 2">Datum odobrenja narudžbine: {{formatDate(order.datumOdobrenjaNarudzbine)}}</h2>
            <br>
            <v-divider v-if="isBuyer"></v-divider>
            <br>
            <div v-if="isBuyer">
                <div style="position:relative;">
                    <div style="position:absolute; left:0px;">
                        <v-dialog v-model="dialog2" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn :disabled="rejected" v-bind="attrs" v-on="on" elevation="5" type="button" style="float: right;">Odbij narudžbinu</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        Odbij narudžbinu
                                    </v-card-title>
                                    <v-divider></v-divider>

                                    <v-card-text>
                                        <br>
                                        Da li ste sigurni da želite da odbijete narudžbinu?
                                    </v-card-text>
                                    
                                    <v-card-actions>
                                        <v-btn
                                        color="white"
                                        elevation="5"
                                        @click="dialog2=false"
                                    >
                                        Odustani
                                    </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        color="primary"
                                        elevation="5"
                                        @click="reject"
                                    >
                                        Odbij
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                    </div>
                    <div style="position:absolute; right:0px;">
                        <div style="position:relative;">
                            <v-dialog v-model="dialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn :disabled="approved" v-bind="attrs" v-on="on" color="primary" elevation="5" type="button" style="float: right;">Odobri narudžbinu</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        Odobri narudžbinu
                                    </v-card-title>
                                    <v-divider></v-divider>

                                    <v-card-text>
                                        <v-row>
                                        <v-col cols="10" style="padding-top:35px; font-size:16px">
                                            Unesite Vreme u danima za koliko će stići narudžbina:
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field min="1" max="100" hide-details single-line v-model="numberOfDays" type="number"/>
                                        </v-col>
                                        </v-row>
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
                                        @click="approve"
                                    >
                                        Odobri
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import store from '../store/index';
import moment from 'moment';

export default {
  name: 'Order',
  data(){
        return {
            order : null,
            error : false,
            dialog:false,
            dialog2:false,
            numberOfDays:1
        }
    },
    computed: {
        approved(){
            return this.order.statusNarudzbine == 2;
        },
        rejected(){
            return this.order.statusNarudzbine == 1;
        },
        isBuyer: function () {
            return store.getters['auth/getUserRole']=="PRODAVAC";
        },
      total(){
        let tot = 0;
        this.order.listaElemenata.forEach(el=>tot+=el.kolicina*el.proizvod.cena);
        return tot;
      }
    },
  mounted(){
      var id = this.$route.params.id;
      axios.get(Vue.prototype.$orders+"/"+id).then((response)=>{
          this.order = response.data;
          this.error = false;
          console.log(this.order);
      }).catch(()=>{
          this.error = true;
      });
  },
  methods: {
      formatDate(value) {
            return moment(value).format("DD-MM-YYYY")
        },
      approve(){
        var id = this.$route.params.id;
        axios.put(Vue.prototype.$orders+"/"+id,{
                StatusNarudzbine:2,
                VremeIsporukeUDanima:this.numberOfDays
            }).then((response)=>{
            this.order = response.data;
            this.error = false;
        }).catch(()=>{
            this.error = true;
        }).finally(()=>{
            this.dialog = false;
        });
      },
      reject(){
        var id = this.$route.params.id;
        axios.put(Vue.prototype.$orders+"/"+id,{
                StatusNarudzbine:1
            }).then((response)=>{
            this.order = response.data;
            this.error = false;
        }).catch(()=>{
            this.error = true;
        }).finally(()=>{
            this.dialog2 = false;
        });
      }
  }
}
</script>