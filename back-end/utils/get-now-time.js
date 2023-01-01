function getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var hours = myDate.getHours(); //获取当前小时
    var now = year + "-" + mon + "-" + date + " " + hours;
    return now;
}
module.exports = {
    getNowDate
}