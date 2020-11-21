<template>
  <div id="login">
    <Login id="lgnCmp"/>
  </div>
</template>

<script>
import Login from '../components/Login.vue'

export default {
  name: 'Lgn',
  components: {
    Login
  }
}
</script>

<style>
#login{
  text-align: center;
}

#lgnCmp{
  display: inline-block;
  padding-top: 70px;
  padding-bottom: 40px;
}
</style>
