<template>
  <div id="register">
    <Register id="regCmp"/>
  </div>
</template>

<script>
import Register from '../components/Register.vue'

export default {
  name: 'Rgstr',
  components: {
    Register
  }
}
</script>

<style>
#register{
  text-align: center;
}

#regCmp{
  display: inline-block;
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>
