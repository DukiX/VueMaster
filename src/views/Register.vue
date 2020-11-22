<template>
    <v-container fill-height style="height: 100vh; max-height: 100%;">
        <v-row justify="center" align="center">
                <Register id="regCmp"/>
        </v-row>
    </v-container>
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
#regCmp{
  padding-top: 70px;
  padding-bottom: 50px;
}
</style>
