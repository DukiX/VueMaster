<template>
  <div id="user">
    <Account id="acc"/>
  </div>
</template>

<script>
import Account from '../components/Account.vue'

export default {
  name: 'User',
  components: {
    Account
  }
}
</script>

<style>
#user{
  text-align: center;
}

#acc{
  display: inline-block;
  padding-top: 70px;
  padding-bottom: 40px;
}
</style>