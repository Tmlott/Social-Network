function validateEmail(string) {
    var re = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return re.test(email);
  }
  
  function formatDateTime(DateTime) {
    let months = {
      0: "Jan",
      1: "Feb",
      2: "Mar",
      3: "Apr",
      4: "May",
      5: "Jun",
      6: "Jul",
      7: "Aug",
      8: "Sep",
      9: "Oct",
      10: "Nov",
      11: "Dec",
    };
  
    const dateObj = new Date(DateTime);
    const formattedMonth = '';
    return true;
  }
  
  module.exports = { validateEmail, formatDateTime };