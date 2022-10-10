const defaultFormatOpt = 'yyyy-MM-dd hh:mm:ss'
/**
 * 日期格式化
 * 
 * date: 需要格式化的日期时间
 * formatOpt: 格式化后输出的形式
 */
export function dateFormat(date, formatOpt = defaultFormatOpt) {
    let format = formatOpt;
    if (date != 'Invalid Date') {
        date = new Date(date);
        let o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    }
    return '';
}

/**
 * 获取当前日期的前后n个月日期
 * 
 * n: 前后n个月 number类型 可为0 当前月日期  负数 上n个月日期  正数 下n个月日期
 * date: 当前日期
 * formatOpt: 格式化后输出的形式
 */
export function getMonthBeforeOrAfterDate(n, date,formatOpt = defaultFormatOpt) {
    let dt = date ? new Date(date) : new Date();
    dt.setMonth(dt.getMonth() + Number(n));
    return dateFormat(dt,formatOpt);
}

/**
 * 获取某月的第一天和最后一天
 * 
 * date: 当前日期
 * time: 是否显示时间 
 * formatOpt: 格式化后输出的形式
 */
export function getMonthFistAndLastDate(date,time,formatOpt = 'yyyy-MM-dd') {
    let curDate = date ? new Date(date) : new Date();
    let y = curDate.getFullYear();
    let m = curDate.getMonth() + 1;
    if (m > 12) {
        m = 1;
        y++;
    }
    let monthLastDay = new Date(y, m, 0).getDate();
    let firstDay = y + "-" + (m < 10 ? "0" + m : m) + "-" + "01";
    let lastDay =
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (monthLastDay < 10 ? "0" + monthLastDay : monthLastDay);
    if (time) {
        firstDay = startAndEndTime(firstDay).sartTime;
        lastDay = startAndEndTime(lastDay).endTime;
        // firstDay = firstDay + ' 00:00:00'
        // lastDay = lastDay + ' 23:59:59'
        if(formatOpt.indexOf('hh') == -1){
            formatOpt = formatOpt + ' hh:mm:ss';
        }
    }
    return { firstDay:dateFormat(firstDay,formatOpt), lastDay: dateFormat(lastDay,formatOpt)};
}
/**
 * 获取当前日期开始时间和结束时间
 * 
 * date: 当前日期
 * formatOpt: 格式化后输出的形式
 */
export function getStartAndEndTime(date,formatOpt= defaultFormatOpt) {
    let data = date ? new Date(date).toLocaleDateString() : new Date().toLocaleDateString();
    let sartTime = new Date(data).getTime();
    let endTime = new Date(data).getTime() + 24 * 60 * 60 * 1000 - 1;
    return { sartTime, endTime, startDate: dateFormat(sartTime,formatOpt),endDate: dateFormat(endTime,formatOpt)};
}
/**
 * 计算日期时间差 年月日  时分秒
 * 
 * date1: 小日期 顺序变动
 * date2: 大日期 顺序变动
 * isYear: 是否计算年月日
 */
 export const calcDateTimeDiff = (date1, date2, isYear) => {
    let start = new Date(date1)
    let end = new Date(date2)
    let date3 = Math.abs(end.getTime() - start.getTime());
  
    let totalDays = Math.floor(date3 / (24 * 3600 * 1000)) // 相差总天数
    let totalHours = Math.floor(totalDays * 24 ) // 相差总小时数
    let totalMinutes = Math.floor(totalHours * 60 ) // 相差总分钟数
    let totalSeconds = Math.floor(totalMinutes * 60 ) // 相差总秒数
    let totalMilliSeconds = Math.floor(totalSeconds * 1000 ) // 相差总毫秒数
  
    let leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000))   // 相差小时数
  
    let leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60 * 1000))  // 相差分钟数
  
    let leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
    let seconds = Math.round(leave3 / 1000)   //相差秒数
    const result = {
        totalDays,
        totalHours,
        totalSeconds,
        totalMinutes,
        totalMilliSeconds,
        leave1,
        leave2,
        leave3,
        hours,
        minutes,
        seconds
      }
    if(isYear) {
        return {...result,...monthDayDiff(date1, date2)}
    }else{
        return result
    }
  }
  /**
 * 计算日期差 年月日
 * 
 * startTime: 小日期 顺序变动
 * endTime: 大日期 顺序变动
 */
 export function caleDateDiff(startTime,endTime) {
    let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
    let start = new Date(startTime);
    let end = new Date(endTime);
    let year = Math.abs(end.getFullYear() - start.getFullYear());
    let month = Math.abs(end.getMonth() - start.getMonth());
    let day = Math.abs(end.getDate() - start.getDate());
    if (month < 0) {
      year--;
      month = end.getMonth() + (12 - start.getMonth());
    }
    if (day < 0) {
      month--;
      let index = flag.findIndex((temp) => {
        return temp === start.getMonth() + 1
      });
      let monthLength;
      if (index <= 6) {
        monthLength = 31;
      } else if (index > 6 && index <= 10) {
        monthLength = 30;
      } else {
        monthLength = 28;
      }
      day = end.getDate() + (monthLength - start.getDate());
    }
    let totalMonths = year * 12 + month;
    return {
        year,
        month,
        day,
        totalMonths
    }
  }
  /**
 * 根据日期 计算星期
 * 
 * date: 当前日期
 */
 export function getWeekDay(date) {
    const newDate = new Date(date);
    const week =  ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return week[newDate.getDay()]
  }

export default {
    getMonthFistAndLastDate,
    calcDateTimeDiff,
    caleDateDiff,
    getStartAndEndTime,
    getMonthBeforeOrAfterDate,
    dateFormat,
    getWeekDay,
    getCalendarPlugin
}