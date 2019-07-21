<template>
  <div id="app-page">
    
  </div>
</template>
<script>
import elemBus from './../elem.bus';
  export default {
       mounted() {
        elemBus.toggleLoading(false);
        elemBus.toast('로딩에 실패했습니다');
      }
  }
</script>

<style lang="scss" scoped>

</style>

