<template>
    <v-container fill-height style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <Login id = "login"/>
        </v-row>
    </v-container>
</template>

<script>
import Login from '../components/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>

<style>
#login{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>
