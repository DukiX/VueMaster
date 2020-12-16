<template>
    <v-container fill-height style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <ChangePassword id="chg"/>
        </v-row>
    </v-container>
</template>

<script>
import ChangePassword from '../components/ChangePassword.vue'

export default {
  name: 'ChangePasswordView',
  components: {
    ChangePassword
  }
}
</script>

<style>
#chg{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>