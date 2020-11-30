<template>
    <v-container fill-height style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <ChangePassword />
        </v-row>
    </v-container>
</template>

<script>
import ChangePassword from '../components/ChangePassword.vue'

export default {
  name: 'ChngPassword',
  components: {
    ChangePassword
  }
}
</script>

<style>
#acc{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>