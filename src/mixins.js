export default {
  data() {
    return {
      
    }
  },
  methods: {
    getStringDate(year, month, day) {
      let dt = String(year) + String(month).padStart(2, '0');
      if(day != null) dt += String(day).padStart(2, '0');
      return dt;
    },
    getNumberDate(date) {
       date = String(date);
       return { year: date.substr(0, 4), month: date.substr(4, 6), day: date.substr(6) };
    } 
  }
}