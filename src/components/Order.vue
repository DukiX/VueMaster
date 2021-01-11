<template>
    <div>
            <br>
            <br>
            <br>
            <br>
                AAAAAAAAAAAA
    </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';

export default {
  name: 'Order',
  computed:{
  },
  data(){
        return {
            order : null,
            error : false
        }
    },
  mounted(){
      var id = this.$route.params.id;
      axios.get(Vue.prototype.$orders+"/"+id).then((response)=>{
          this.order = response.data;
          this.error = false;
      }).catch(()=>{
          this.error = true;
      });
  }
}
</script>