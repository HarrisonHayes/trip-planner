const moment=require('moment')

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    let thisDate = new Date(date);
    thisDate.setMinutes(thisDate.getMinutes()+thisDate.getTimezoneOffset())
    return moment(thisDate).format("M/D/yyyy");
  },
  format_datetime: (date) => {
    return date.toLocaleTimeString() + ' on ' + date.toLocaleDateString();
  },
  format_date_input: (date) => {
    const thisDate = new Date(date);
    return thisDate.toISOString().substring(0,10);
  },
};
