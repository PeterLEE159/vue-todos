<template>

  <div id="app-date-selector">
    
    <div class="centered">

      
      <div>
        <i class="fa fa-caret-left" @click.stop="onDateChanged(Number(year) - 1, Number(month))"></i>
        <input type="number" v-model="year" @change.stop="onDateChanged(Number(year), Number(month))">
        <i class="fa fa-caret-right" @click.stop="onDateChanged(Number(year) + 1, Number(month))"></i>
      </div>


      <div class="month-group">
        <i class="fa fa-caret-left" @click.stop="onDateChanged(Number(year), Number(month) - 1)"></i>
        <input type="number" v-model="month" @change.stop="onDateChanged(Number(year), Number(month))">
        <i class="fa fa-caret-right" @click.stop="onDateChanged(Number(year), Number(month) + 1)"></i>
      </div>
      
      

    </div>
    
    
  </div>


</template>

<script>
import mixin from '@/mixins';

export default {
  name: 'app-date-selector',

  mixins: [mixin],

  data() {
    return {
      oriYear: this.$route.params.year,
      oriMonth: this.$route.params.month,
      year: this.$route.params.year,
      month: this.$route.params.month,
      currYear: new Date().getFullYear(),
      currMonth: new Date().getMonth() + 1,
      dateTimeout: undefined
    }
  },
  
  created() {

  },

  methods: {
    onDateChanged(year, month) {
      
      // if(month > this.currMonth && year == this.currYear) {
      //   this.toast('선택된 달이 현재보다 높게 선택되었습니다.');
      //   this.month = String(this.currMonth).padStart(2, '0');
      //   return;
      // }

      if(month <= 0) {
        month = 12;
        year -= 1;
      }

      // if(year > this.currYear) {
      //   this.toast('년도가 현재보다 높게 선택되었습니다.');
      //   this.year = this.currYear;
      //   return;
      // }

      if(year < 1990) {
        this.toast('1990년도 이하로는 갈수 없습니다.');
        this.year = this.currYear;
        return;
      }

      

      this.year = year;
      this.month = String(month).padStart(2, '0');

      if(this.dateTimeout != null) clearTimeout(this.dateTimeout);
      
      this.dateTimeout = setTimeout(() => {
        this.$router.push({ path: `/todos/${this.year}/${this.month}`, hash: '1' });
      }, 1000)
      
    }

  }
}
  

</script>


<style scoped lang="scss">
  @import '@/assets/variable.scss';

  #app-date-selector {
    width: 100%;
    height: 100%;
    
    background: white;
    box-shadow: 3px 5px 6px $shadow;
    display: flex;
    justify-content: center;
    align-items: center;
    * {
      color: #333;
    }
    .centered {
      margin: 0;
      
      div {
        display: flex;
        flex-direction: row;
        i {
          font-size: 36px;
          color: #999;
          margin: 8px 12px;
          cursor: pointer;
        }
        input {
          width: 120px;
          border: 0;
          text-align: center;
          outline: 0;
          border-bottom: 1px solid #cdcdcd;
          font-size: 24px;
          background: transparent;
        }
      }
      .month-group {
        margin-top: 72px;
      }
      
    }
  }
</style>
