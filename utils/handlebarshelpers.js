module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return date.toLocaleDateString();
  },
  format_datetime: (date) => {
    return date.toLocaleTimeString() + ' on ' + date.toLocaleDateString();
  },
  format_date_input: (date) => {
    const thisDate = new Date(date);
    return thisDate.toISOString().substring(0,10);
  },
};
