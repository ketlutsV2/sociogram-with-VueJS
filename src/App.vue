<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view/>

  
<FooterBloc/>
</template>

<script>
// @ is an alias to /src
import FooterBloc from '@/components/FooterBloc.vue'

export default {
  name: 'App',
  components: {
    FooterBloc
  },
  mounted(){

      }
}
</script>

<style lang="scss">
 @import './styles/scss/_app.scss';

</style>
