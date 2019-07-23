<template>
  <div id="app-page">
    
    <div class="todo-page-header">
      <span class="logo">VUE 스터디</span>
    </div>

    <router-view></router-view>

    <div class="page-loading" v-if="isLoadingShow">
      <img src="@/assets/implant.gif">
      <div></div>
    </div>

    <div class="page-alert alert" :class="{ 'alert-success': isToastSuccess, 'alert-danger': !isToastSuccess }" v-if="isToastShow">
      <span>{{ toastMsg }}</span>
    </div>

    <div class="base-bg"></div>

  </div>
  
</template>
<script>
  import elemBus from '@/elem.bus';
  import AppTodoPageComponent from './TodoPage'
  export default {
    components: { 
      AppTodoPageComponent
    },
    data() {
      return {
        isLoadingShow: true,
        isToastShow: false,
        isToastSuccess: true,
        toastMsg: ''
      }
    },
    created() {
      elemBus.$on('page-toggle-loading', (isLoadingShow) => {
        this.isLoadingShow = isLoadingShow;
      });
      elemBus.$on('page-toast', ({ toastMsg, isToastSuccess }) => {
        this.toastMsg = toastMsg;
        this.isToastSuccess = isToastSuccess;
        this.isToastShow = true;
        setTimeout(() => {
          this.isToastShow = false;
        }, 3000)
      });
      
    },
  }
</script>

<style lang="scss" scoped>

  @import '@/assets/variable.scss';
  
  .page-loading {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    div {
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 50%;
      transform: translate(-50%, -50%);
      width: 72px;
      height: 72px;
      z-index: 1;
    }
    
  }
  .page-alert {
      position: fixed;
      right: 24px;
      top: 24px;
      width: 300px;

      min-height: 60px;
      max-height: 120px;
      padding: 12px;
      margin: 0;
      display: flex;
      border: 12px;
      span {
        margin: auto;
        font-size: 14px;
      }
    }
    .alert-danger {
      background: #f55;
      color: white;
    }
    .alert-success {
      background: #3f3;
      color: black;
    }

  .todo-page-header {
    box-shadow: 0px 3px 3px $shadow;
    height: 80px;
    padding: 0 42px;
    display: flex;
    z-index: 100;
    background: white;
    align-items: center;
    justify-content: flex-end;

    padding-left: 300px;
    .logo {
        font-size: 32px;
        color: #666;
        font-family: 'deco';
        font-weight: bold;
      }
  }

  .base-bg {
    background: #f9f9f9;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -99999;
  }
</style>

