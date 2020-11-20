<template>
  <div id="home">
  </div>
</template>

<script>
import store from '../store/index'

export default { 
    name : "Home",
    methods: {
      
    },
    mounted(){
      if(!this.loggedIn){
        console.log("dasdad");
        this.$router.push('/login');
      }
    },
    computed: {
      loggedIn: function () {
        return store.getters['auth/isLoggedIn'];
      }
    }
}
</script>

<style>
.btn{
  display: inline-block;
  border:none; 
  background: #555;
  color:#fff;
  padding:7px 20px;
  cursor:pointer
}

#home{
  display: flex;
    align-items: center;
    justify-content: center;
}
</style>
