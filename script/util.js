function ajaxPost(url, params, callback) {
    api.ajax({
        url: hostIp + url,
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'token': $api.getStorage('token')
        },
        data: {
            body: params
        }
    }, function(ret, err) {
        if (ret.returnCode == '-99') {// token超时，重新登录
            api.openWin({
                name: 'phone_login1',
                url: '../html/user/phone_login1.html',
                slidBackEnabled: false
            });
        }
        callback(ret, err);
    });
}

function goBack() {
    api.closeWin();
}

function getTimeStr() {
    var myDate =  new  Date(); 
    var y = myDate.getFullYear();
    var m = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : '' + (myDate.getMonth() + 1);
    var d = myDate.getDate() < 10 ? '0' + myDate.getDate() : '' + myDate.getDate();
    var h = myDate.getHours() < 10 ? '0' + myDate.getHours() : '' + myDate.getHours();
    var mm = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : '' + myDate.getMinutes();
    var s = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : '' + myDate.getSeconds();
    return y + m + d + h + mm + s;
}

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkPhone(data) {
    return (/^\d{11}$/.test(data));
}

function secondToMin(result) {
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = m + ":" + s;
}

function secondToDate(result) {
    var h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return result = h + ":" + m + ":" + s;
}

//格式化时间
function timeFormat(now, type) {
    var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
    var year = now.getFullYear().toString();
    var month = (now.getMonth() + 1).toString();
    var day = (now.getDate()).toString();
    var tian = now.getDay().toString();
    var hour = (now.getHours()).toString();
    var minute = (now.getMinutes()).toString();
    var second = (now.getSeconds()).toString();
    if (hour.length == 1) {
        hour = "0" + hour;
    }
    if (minute.length == 1) {
        minute = "0" + minute;
    }
    if (second.length == 1) {
        second = "0" + second;
    }
    if (type == 1) {
        var dateTime = hour + ":" + minute;
    } else if (type == 2) {
        var dateTime = show_day[tian] + " " + hour + ":" + minute
    } else if (type == 3) {
        var dateTime = year + "-" + month + "-" + day
    } else if (type == 4) {
        var dateTime = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
    } else if (type == 5) {
        var dateTime = show_day[tian];
    }
    return dateTime;
}

//时间差计算
function timeDiff(sj) {
    var nowt = new Date().getTime();
    var a = new Date(parseInt(sj));
    var b = new Date(parseInt(nowt));
    var date1 = Date.parse(timeFormat(a, 4));
    var date2 = Date.parse(timeFormat(b, 4));
    var xxsj = Math.ceil((date2 - date1) / (60 * 1000))
    if (xxsj <= 1 && xxsj >= 0) {
        return "就刚才";
    } else if (xxsj <= 10 && xxsj > 1) {
        return xxsj + "分钟前";
    } else if (xxsj <= 60 && xxsj > 10) {
        return timeFormat(a, 1);
    } else if (xxsj <= 1440 && xxsj > 60) {
        return timeFormat(a, 1);
    } else if (xxsj <= 10080 && xxsj > 1440) {
        return timeFormat(a, 2);
    } else if (xxsj > 10080) {
        return timeFormat(a, 3);
    } else {
        return timeFormat(a, 3);
    }
}

function dateDiff(hisTime, nowTime) {
    var now = nowTime ? nowTime : new Date().getTime(),
        diffValue = now - hisTime,
        result = '',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,
        _year = diffValue / year,
        _month = diffValue / month,
        _week = diffValue / (7 * day),
        _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute;

    var changeTime = new Date();
    changeTime.setTime(hisTime)

    //console.log(changeTime+"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    //console.log(convertDate(changeTime))
    var changeday = changeTime.getDate();
    var changemonth = changeTime.getMonth() + 1;
    var changeyear = changeTime.getFullYear();
    var changeHours = changeTime.getHours();
    //console.log("11" + hisTime + " "   + changeHours)
    var changeMinutes = changeTime.getMinutes();

    if (changeHours < 10) {
        changeHours = "0" + changeHours;
    }
    if (changeMinutes < 10) {
        changeMinutes = "0" + changeMinutes;
    }

    //console.log(_day+"***************************");

    //	if (_year >= 1)
    //		result = parseInt(_year) + "年前";
    //	else if (_month >= 1)
    //		result = parseInt(_month) + "个月前";
    //	else if (_week >= 1)
    //		result = parseInt(_week) + "周前";
    //	 alert(changeHours)
    if (_year >= 1)
        result = changeyear + "-" + changemonth + "-" + changeday;
    else if (_day >= 2)
        result = changemonth + "-" + changeday;
    else if (_day >= 1)
        result = "昨天" + changeHours + ":" + changeMinutes;
    else if (_hour >= 1)
        result = parseInt(_hour) + "个小时前";
    else if (_min >= 1)
        result = parseInt(_min) + "分钟前";
    else
        result = "刚刚";
    return result;
}
