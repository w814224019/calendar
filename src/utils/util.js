const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ',' + [hour, minute, second].map(formatNumber).join(':')
}


const formatfirst = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = 1
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}

function getBeforeDate(n) {
  var n = n;
  var d = new Date();
  var year = d.getFullYear();
  var mon = d.getMonth() + 1;
  var day = d.getDate();
  if (day <= n) {
    if (mon > 1) {
      mon = mon - 1;
    }
    else {
      year = year - 1;
      mon = 12;
    }
  }
  d.setDate(d.getDate() - n);
  year = d.getFullYear();
  mon = d.getMonth() + 1;
  day = d.getDate();
  var s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
  return s;
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const showToastWithNone = str => {
  wx.showToast({
    title: str,
    icon: 'none',
    duration: 1500
  })
}
const showToastWithLoading = str => {
  wx.showToast({
    title: str,
    icon: 'loading',
  })
}
const showToastWithSuccess = str => {
  wx.showToast({
    title: str,
    icon: 'success',
    duration: 1500
  })
}
module.exports = {
  formatTime: formatTime,
  formatfirst: formatfirst,
  
  showToastWithNone: showToastWithNone,
  showToastWithSuccess: showToastWithSuccess,
  showToastWithLoading: showToastWithLoading,
  getBeforeDate: getBeforeDate,
  
}
