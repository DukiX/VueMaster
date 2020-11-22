<template>
    <v-container fill-height style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <Account id="acc"/>
        </v-row>
    </v-container>
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
#acc{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>