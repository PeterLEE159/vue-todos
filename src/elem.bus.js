import Vue from 'vue';

export default new Vue({
  methods: {
    toggleLoading(isLoading) {
      this.$emit('page-toggle-loading', isLoading);
    },
    toast(toastMsg = '', isToastSuccess = false) {
      this.$emit('page-toast', { toastMsg, isToastSuccess });
    }
  }
})