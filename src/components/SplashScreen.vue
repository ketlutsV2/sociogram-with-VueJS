<template>
  <div id="splash-screen" class="template flex-1 box text-center">
   
    <div class="d-flex justify-content-center">
      <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name: 'SplashScreen',
    components: {
    }
  }
</script>

<style lang="scss" scoped>
  #splash-screen{
    display: flex;
    align-items: center;
    justify-content: center;

  }
</style>
