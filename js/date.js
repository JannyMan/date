//一天的秒数
const oneday = 86400
let calendarObj
let calendarVal = new Object()
//初始化时间
calendarVal.time = []
//现在的时间
let nowTime = {}
//前一月
let preTime = {}
//后一个月
let nextTime = {}
//后两个月
let nextTowTime = {}

//今天的时间戳
let nowDayStamp = (Date.parse((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()))/1000
console.log((new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate())
console.log(nowDayStamp)


function calendar(){
    calendarObj = this
}
calendar.prototype = {
    Init: function(dom){
        let timeObj = getTime(getNowYear(), getNowMon())
        $(dom).append(
            '<div class="header">'+
                '<span class="preYear">上一年</span>'+
                '<span class="preMon"><span class="iconfont icon-zuo"></span></span>'+
                '<span class="nextYear">下一年</span>'+
                '<span class="nextMon"><span class="iconfont icon-you"></span></span>'+
                '<div class="predate"><ul><li class="mon"></li><li class="year"></li></ul></div>'+
                '<div class="leftdate"><ul><li class="mon"></li><li class="year"></li></ul></div>'+
                '<div class="rightdate"><ul><li class="mon"></li><li class="year"></li></ul></div>'+
                '<div class="nextTowdate"><ul><li class="mon"></li><li class="year"></li></ul></div>'+
            '</div>' +
            '<div class="week">'+
            '<ul class="leftdiv">'+
                '<li>一</li>'+
                '<li>二</li>'+
                '<li>三</li>'+
                '<li>四</li>'+
                '<li>五</li>'+
                '<li>六</li>'+
                '<li>日</li>'+
            '</ul>'+
            '<ul class="rightdiv">'+
                '<li>一</li>'+
                '<li>二</li>'+
                '<li>三</li>'+
                '<li>四</li>'+
                '<li>五</li>'+
                '<li>六</li>'+
                '<li>日</li>'+
            '</ul>'+
            '</div>' +
            '<div class="con">'+
                '<ul class="preul">'+

                '</ul>'+
                '<ul class="leftul">'+

                '</ul>'+
                '<ul class="rightul">'+

                '</ul>'+
                '<ul class="nextTowul">'+

                '</ul>'+
            '</div>' +
            '<div class="footer"> 预定时长: 至少1晚</div>'
        )

        //第左边日历显示时间
        let nowTimeout = Date.parse((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + '01')
        let weekDay = (new Date(nowTimeout)).getDay()

        //添加当月年份
        $(dom).find('>.header').find('>.leftdate').find('.year').html((timeObj['time'][1]).nowYear)
        $(dom).find('>.header').find('>.leftdate').find('.mon').html(getCapitalMon((timeObj['time'][1]).nowMon))
        //添加下月年份
        $(dom).find('>.header').find('>.rightdate').find('.year').html((timeObj['time'][2]).nextYear)
        $(dom).find('>.header').find('>.rightdate').find('.mon').html(getCapitalMon((timeObj['time'][2]).nextMon))
        //添加上月年份
        $(dom).find('>.header').find('>.predate').find('.year').html((timeObj['time'][0]).preYear)
        $(dom).find('>.header').find('>.predate').find('.mon').html(getCapitalMon((timeObj['time'][0]).preMon))
        //添加下两个月年份
        $(dom).find('>.header').find('>.nextTowdate').find('.year').html((timeObj['time'][3]).nextTowYear)
        $(dom).find('>.header').find('>.nextTowdate').find('.mon').html(getCapitalMon((timeObj['time'][3]).nextTowMon))


        //添加日期
        for(let i = 0; i < getcurrentWeek()-1; i++){
            $(dom).find('>.con>.leftul').append('<li></li>').find('li').css('border', '1px solid #fff')
        }
        //给每一天添加时间戳
        let days = (getnextStamp() - getcurrentStamp())/oneday
        for(let i = 0; i < days; i++){
            //计算这天时间戳
            let liTimout = Date.parse((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + (i + 1))/1000
            $(dom).find('>.con>.leftul').append('<li class="cur" data-stamp="'+ liTimout +'">'+ parseInt(i + 1 ) +'</li>')
        }

        //添加下月日期
        for(let i = 0; i < getnextWeek()-1; i++){
            $(dom).find('>.con>.rightul').append('<li></li>').find('li').css('border', '1px solid #fff')
        }
        let nextdays = ( getnextTwoStamp() - getnextStamp())/oneday
        for(let i = 0; i < nextdays; i++){
            let liTimout = Date.parse((timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + (i + 1))/1000
            $(dom).find('>.con>.rightul').append('<li class="cur" data-stamp="'+ liTimout +'">'+ parseInt(i + 1 ) +'</li>')
        }

        //定位今天
        let leftLi = $(dom).find('>.con>.leftul>.cur')
        $(leftLi).each(function (index, val) {
            let timeout = $(val).attr('data-stamp')
            if(nowDayStamp > timeout){
               $(val).addClass('pastCss')
            }else if( nowDayStamp == timeout ){
                $(val).addClass('nowCss')
            }
        })
        let rightLi = $(dom).find('>.con>.rightul>.cur')
        $(rightLi).each(function (index, val) {
            let timeout = $(val).attr('data-stamp')
            if(nowDayStamp > timeout){
                $(val).addClass('pastCss')
             }else if( nowDayStamp == timeout ){
                 $(val).addClass('nowCss')
             }
        })


        //点击切换
        //上一月
        $(dom).find('>.header').find('>.preMon').mouseup(function(){
            let backYear, backMon
            if((timeObj['time'][0]).preMon - 1 >= 1){
                backYear = (timeObj['time'][0]).preYear
                backMon = (timeObj['time'][0]).preMon - 1
            }else if((timeObj['time'][0]).preMon - 1 == 0){
                backYear = (timeObj['time'][0]).preYear - 1
                backMon = 12
            }

            let obj1 = {}
            let obj2 = {}
            let obj3 = {}
            let obj4 = {}
            obj1.preMon = backMon
            obj1.preYear = backYear

            obj2.nowMon = (timeObj['time'][0]).preMon
            obj2.nowYear = (timeObj['time'][0]).preYear
            obj3.nextMon = (timeObj['time'][1]).nowMon
            obj3.nextYear = (timeObj['time'][1]).nowYear
            obj4.nextTowMon = (timeObj['time'][2]).nextMon
            obj4.nextTowYear = (timeObj['time'][2]).nextYear

            calendarVal.time.splice(0,calendarVal.time.length);
            calendarVal.time.push(obj1)
            calendarVal.time.push(obj2)
            calendarVal.time.push(obj3)
            calendarVal.time.push(obj4)

            //添加当月年份
            $(dom).find('>.header').find('>.leftdate').find('.year').html((timeObj['time'][1]).nowYear)
            $(dom).find('>.header').find('>.leftdate').find('.mon').html(getCapitalMon((timeObj['time'][1]).nowMon))
            //添加下月年份
            $(dom).find('>.header').find('>.rightdate').find('.year').html((timeObj['time'][2]).nextYear)
            $(dom).find('>.header').find('>.rightdate').find('.mon').html(getCapitalMon((timeObj['time'][2]).nextMon))
            //添加上月年份
            $(dom).find('>.header').find('>.predate').find('.year').html((timeObj['time'][0]).preYear)
            $(dom).find('>.header').find('>.predate').find('.mon').html(getCapitalMon((timeObj['time'][0]).preMon))
            //添加下两个月年份
            $(dom).find('>.header').find('>.nextTowdate').find('.year').html((timeObj['time'][3]).nextTowYear)
            $(dom).find('>.header').find('>.nextTowdate').find('.mon').html(getCapitalMon((timeObj['time'][3]).nextTowMon))

            //添加日期
            $(dom).find('>.con>.leftul').html('')
            if( getSelfWeek((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + '01') == 0){
                for(let i = 0; i < 6; i++){
                    $(dom).find('>.con>.leftul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }else{
                for(let i = 0; i < getSelfWeek((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + '01')-1; i++){
                    $(dom).find('>.con>.leftul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }

            let time1 = (timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + '01'
            let time2 = (timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01'
            let days = parseInt((getStamp(time2, time1)) / oneday)
            for(let i = 0; i < days; i++){
                //计算这天时间戳
                let liTimout = Date.parse((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + (i + 1))/1000
                $(dom).find('>.con>.leftul').append('<li class="cur" data-stamp="'+ liTimout +'">'+ parseInt(i + 1 ) +'</li>')
            }

            //添加下月日期
            $(dom).find('>.con>.rightul').html('')
            if(getSelfWeek((timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01') == 0){
                for(let i = 0; i < 6; i++){
                    $(dom).find('>.con>.rightul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }else{
                for(let i = 0; i < getSelfWeek((timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01') - 1; i++){
                    $(dom).find('>.con>.rightul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }
            let time21 = (timeObj['time'][3]).nextTowYear + '-' + (timeObj['time'][3]).nextTowMon + '-' + '01'
            let time11 = (timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01'
            let nextdays = parseInt(getStamp(time21, time11) / oneday)
            for(let i = 0; i < nextdays; i++){
                let liTimout = Date.parse((timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + (i + 1))/1000
                $(dom).find('>.con>.rightul').append('<li class="cur" data-stamp="'+ liTimout +'">'+ parseInt(i + 1 ) +'</li>').find('li')
            }

            //定位今天
            //灰掉过去时间
            let leftLi = $(dom).find('>.con>.leftul>.cur')
            $(leftLi).each(function (index, val) {
                let timeout = $(val).attr('data-stamp')
                if(nowDayStamp > timeout){
                    $(val).addClass('pastCss')
                 }else if( nowDayStamp == timeout ){
                    $(val).addClass('nowCss')
                }
            })
            let rightLi = $(dom).find('>.con>.rightul>.cur')
            $(rightLi).each(function (index, val) {
                let timeout = $(val).attr('data-stamp')
                if(nowDayStamp > timeout){
                    $(val).addClass('pastCss')
                }else if( nowDayStamp == timeout ){
                    $(val).addClass('nowCss')
                }
            })
        })

        //下一月
        $(dom).find('>.header').find('>.nextMon').mouseup(function(){
            let toNextYear, toNextkMon
            if((timeObj['time'][3]).nextTowMon + 1 <= 12){
                toNextYear = (timeObj['time'][3]).nextTowYear
                toNextkMon = (timeObj['time'][3]).nextTowMon + 1
            }else if((timeObj['time'][3]).nextTowMon + 1 == 13){
                toNextYear = (timeObj['time'][3]).nextTowYear + 1
                toNextkMon = 1
            }

            let obj1 = {}
            let obj2 = {}
            let obj3 = {}
            let obj4 = {}
            obj4.nextTowMon = toNextkMon
            obj4.nextTowYear = toNextYear

            obj1.preMon = (timeObj['time'][1]).nowMon
            obj1.preYear = (timeObj['time'][1]).nowYear
            obj2.nowMon = (timeObj['time'][2]).nextMon
            obj2.nowYear = (timeObj['time'][2]).nextYear
            obj3.nextMon = (timeObj['time'][3]).nextTowMon
            obj3.nextYear = (timeObj['time'][3]).nextTowYear

            calendarVal.time.splice(0,calendarVal.time.length);
            calendarVal.time.push(obj1)
            calendarVal.time.push(obj2)
            calendarVal.time.push(obj3)
            calendarVal.time.push(obj4)

            //添加当月年份
            $(dom).find('>.header').find('>.leftdate').find('.year').html((timeObj['time'][1]).nowYear)
            $(dom).find('>.header').find('>.leftdate').find('.mon').html(getCapitalMon((timeObj['time'][1]).nowMon))
            //添加下月年份
            $(dom).find('>.header').find('>.rightdate').find('.year').html((timeObj['time'][2]).nextYear)
            $(dom).find('>.header').find('>.rightdate').find('.mon').html(getCapitalMon((timeObj['time'][2]).nextMon))
            //添加上月年份
            $(dom).find('>.header').find('>.predate').find('.year').html((timeObj['time'][0]).preYear)
            $(dom).find('>.header').find('>.predate').find('.mon').html(getCapitalMon((timeObj['time'][0]).preMon))
            //添加下两个月年份
            $(dom).find('>.header').find('>.nextTowdate').find('.year').html((timeObj['time'][3]).nextTowYear)
            $(dom).find('>.header').find('>.nextTowdate').find('.mon').html(getCapitalMon((timeObj['time'][3]).nextTowMon))

            //添加日期
            $(dom).find('>.con>.leftul').html('')
            if( getSelfWeek((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + '01') == 0){
                for(let i = 0; i < 6; i++){
                    $(dom).find('>.con>.leftul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }else{
                for(let i = 0; i < getSelfWeek((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + '01')-1; i++){
                    $(dom).find('>.con>.leftul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }

            let time1 = (timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + '01'
            let time2 = (timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01'
            let days = parseInt((getStamp(time2, time1)) / oneday)
            console.log(days)
            for(let i = 0; i < days; i++){
                let liTimout = Date.parse((timeObj['time'][1]).nowYear + '-' + (timeObj['time'][1]).nowMon + '-' + (i + 1))/1000
                $(dom).find('>.con>.leftul').append('<li class="cur" data-stamp="'+ liTimout +'">'+ parseInt(i + 1 ) +'</li>').find('li')
            }

            //添加下月日期
            $(dom).find('>.con>.rightul').html('')
            if(getSelfWeek((timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01') == 0){
                for(let i = 0; i < 6; i++){
                    $(dom).find('>.con>.rightul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }else{
                for(let i = 0; i < getSelfWeek((timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01') - 1; i++){
                    $(dom).find('>.con>.rightul').append('<li></li>').find('li').css('border', '1px solid #fff')
                }
            }
            let time21 = (timeObj['time'][3]).nextTowYear + '-' + (timeObj['time'][3]).nextTowMon + '-' + '01'
            let time11 = (timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + '01'
            let nextdays = parseInt(getStamp(time21, time11) / oneday)
            for(let i = 0; i < nextdays; i++){
                let liTimout = Date.parse((timeObj['time'][2]).nextYear + '-' + (timeObj['time'][2]).nextMon + '-' + (i + 1))/1000
                $(dom).find('>.con>.rightul').append('<li class="cur" data-stamp="'+ liTimout +'">'+ parseInt(i + 1 ) +'</li>').find('li')
            }

            //定位今天
            let leftLi = $(dom).find('>.con>.leftul>.cur')
            $(leftLi).each(function (index, val) {
                let timeout = $(val).attr('data-stamp')
                if(nowDayStamp > timeout){
                    $(val).addClass('pastCss')
                }else if( nowDayStamp == timeout ){
                    $(val).addClass('nowCss')
                }
            })
            let rightLi = $(dom).find('>.con>.rightul>.cur')
            $(rightLi).each(function (index, val) {
                let timeout = $(val).attr('data-stamp')
                if(nowDayStamp > timeout){
                    $(val).addClass('pastCss')
                }else if( nowDayStamp == timeout ){
                    $(val).addClass('nowCss')
                }
            })
        })
    }
}
//添加点击事件
function liClick(){
    
}
//获取时间差  后一个时间 - 前一个时间
function getStamp(time2, time1){
    return Date.parse(time2)/1000 - Date.parse(time1)/1000
}
//获取时间
//getTime(getNowYear(), getNowMon())
function getTime(nowYear, nowMon){
    let preMon
    let preYear
    if(nowMon - 1 >= 1){
        preMon = nowMon -1
        preYear = nowYear
    }else if(nowMon - 1 == 0){
        preMon = 12
        preYear = nowYear - 1
    }
    preTime.preMon = preMon
    preTime.preYear = preYear

    let nextMon
    let nextYear
    if(nowMon + 1 <= 12){
        nextMon = nowMon + 1
        nextYear = nowYear
    }else if(nowMon + 1 == 13){
        nextMon = 1
        nextYear = nowYear + 1
    }
    nextTime.nextMon = nextMon
    nextTime.nextYear = nextYear

    let nextTowMon
    let nextTowYear
    if(nowMon + 2 <= 12){
        nextTowMon = nowMon + 2
        nextTowYear = nowYear
    }else if(nowMon + 2 >= 13){
        nextTowMon = nowMon + 2 -12
        nextTowYear = nowYear + 1
    }
    preTime.preMon = preMon
    preTime.preYear = preYear
    nowTime.nowMon = nowMon
    nowTime.nowYear = nowYear
    nextTime.nextMon = nextMon
    nextTime.nextYear = nextYear
    nextTowTime.nextTowMon = nextTowMon
    nextTowTime.nextTowYear = nextTowYear
    calendarVal.time.push(preTime)
    calendarVal.time.push(nowTime)
    calendarVal.time.push(nextTime)
    calendarVal.time.push(nextTowTime)
    return calendarVal
}
//获取当前月份
function getNowMon(){
    let date = new Date()
    return date.getMonth() + 1
}
//获取当前年份
function getNowYear(){
    let date = new Date()
    return date.getFullYear()
}
//获取当前星期
function getNowDay(){
    let date = new Date()
    return date.getDate()
}
//获取现在的年月日
function getNowDate(){
    let date = new Date()
    return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
}
//获取当月一号的时间戳
function getcurrentStamp(){
    let date = new Date()
    return (Date.parse(date.getFullYear() + '-' + date.getMonth() + 1 + '-' + '0'+'1'))/1000
}
//获取当月一号星期
function getcurrentWeek(){
    let date = new Date()
    return (new Date(date.getFullYear() + '-' + date.getMonth() + 1 + '-' + '0'+'1')).getDay()
}

//传入值获取当月一号星期
function getSelfWeek(obj){
    return (new Date(obj)).getDay()
}

//获取下月一号的时间戳
function getnextStamp(){
    let date = new Date()
    if(date.getMonth() + 1 < 12){
        return (Date.parse(date.getFullYear() + '-' + date.getMonth() + 2 + '-' + '0'+'1'))/1000
    }if(date.getMonth() + 1 == 12){
        return (Date.parse(date.getFullYear() + 1 + '-' + date.getMonth() + 1 + '-' + '0'+'1'))/1000
    }
}
//获取下两个月一号的时间戳
function getnextTwoStamp(){
    let date = new Date()
    if(date.getMonth() + 3 <= 12){
        return (Date.parse(date.getFullYear() + '-' + date.getMonth() + 3 + '-' + '0'+'1'))/1000
    }if(date.getMonth() + 3 == 13){
        return (Date.parse(date.getFullYear() + 1 + '-' + date.getMonth() + 2 + '-' + '0'+'1'))/1000
    }if(date.getMonth() + 3 == 14){
        return (Date.parse(date.getFullYear() + 1 + '-' + date.getMonth() + 3 + '-' + '0'+'1'))/1000
    }
}
//获取下月一号星期
function getnextWeek(){
    let date = new Date()
    if(date.getMonth() + 1 < 12){
        return (new Date(date.getFullYear() + '-' + date.getMonth() + 2 + '-' + '0'+'1')).getDay()
    }if(date.getMonth() + 1 == 12){
        return (new Date(date.getFullYear() + 1 + '-' + date.getMonth() + 1 + '-' + '0'+'1')).getDay()
    }

}
//月份转换
function getCapitalMon(ags){
    if(ags == 1){
        return '一月'
    }else if(ags == 2){
        return '二月'
    }else if(ags == 3){
        return '三月'
    }else if(ags == 4){
        return '四月'
    }else if(ags == 5){
        return '五月'
    }else if(ags == 6){
        return '六月'
    }else if(ags == 7){
        return '七月'
    }else if(ags == 8){
        return '八月'
    }else if(ags == 9){
        return '九月'
    }else if(ags == 10){
        return '十月'
    }else if(ags == 11){
        return '十一月'
    }else if(ags == 12){
        return '十二月'
    }
}



//通过传入值计算计算当月星期号



