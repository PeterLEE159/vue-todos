import elemBus from '@/elem.bus';

export default {
  
  methods: {
    getStringDate(year, month, day = 0) {

      return String(year) + String(month).padStart(2, '0') + String(day).padStart(2, '0');
    },
    getNumberDate(date) {
       date = String(date);
       return { year: date.substr(0, 4), month: date.substr(4, 6), day: date.substr(6) };
    },
    shallowCopy(target, origin) {
      for(let key in origin) {
        target[key] = origin[key];
      }
      
      return target;
    },
    deleteObj(arr, item) {
      let idx = -1;
      for(let i =0; i < arr.length; i ++) {
        if(item != arr[i]) continue;
        idx = i;
      }
      
      if(idx > -1) arr.splice(idx, 1);

      return idx;
    },

    toggleLoading(isLoading) {
      elemBus.toggleLoading(isLoading);
    },
    toast(toastMsg = '', isToastSuccess = false) {
      elemBus.toast(toastMsg, isToastSuccess);
    }
  }
}