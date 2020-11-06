<template>
  <div id="user">
    <Account />
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>