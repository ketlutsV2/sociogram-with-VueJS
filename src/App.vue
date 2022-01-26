<template>
  <router-view />

  <FooterBloc />
</template>

<script>
// @ is an alias to /src
import FooterBloc from "@/components/FooterBloc.vue";

export default {
  name: "App",
  components: {
    FooterBloc,
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "./styles/sociogram.scss";
</style>
