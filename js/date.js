//一天的秒数
const oneday = 86400
function calendar(){

}
calendar.prototype = {
    Init: function(dom){
        $(dom).append(
            '<div class="header">'+ 
                '<span class="preYear">上一年</span>'+
                '<span class="preMon">上一月</span>'+
                '<span class="nextYear">下一年</span>'+
                '<span class="nextMon">下一月</span>'+
                '<div class="leftdate"><ul><li class="year"></li><li class="mon"></li></ul></div>'+
                '<div class="rightdate"><ul><li class="year"></li><li class="mon"></li></ul></div>'+
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
                '<ul class="leftul">'+
                    
                '</ul>'+
                '<ul class="rightul">'+
                   
                '</ul>'+

            '</div>' +
            '<div class="footer"></div>'
        )

        //添加当月年份

        //添加下月年份


        //添加日期
        console.log(getcurrentWeek())
        for(let i = 0; i < getcurrentWeek()-1; i++){
            $(dom).find('>.con>.leftul').append('<li></li>').find('li').css('border', '1px solid #fff')
        }
        let days = (getnextStamp() - getcurrentStamp())/oneday
        for(let i = 0; i < days; i++){
            $(dom).find('>.con>.leftul').append('<li class="cur">'+ parseInt(i + 1 ) +'</li>').find('li')
        }

        //添加下月日期
        for(let i = 0; i < getnextWeek()-1; i++){
            $(dom).find('>.con>.rightul').append('<li></li>').find('li').css('border', '1px solid #fff')
        }
        let nextdays = ( getnextTwoStamp() - getnextStamp())/oneday
        for(let i = 0; i < nextdays; i++){
            $(dom).find('>.con>.rightul').append('<li class="cur">'+ parseInt(i + 1 ) +'</li>').find('li')
        }


    }
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
getNowDay()
//获取当前星期
function getNowDay(){
    let date = new Date()
    // console.log(date.getDate())
    return date.getDate()
}
//获取现在的年月日
getNowDate()
function getNowDate(){
    let date = new Date()
    // console.log((Date.parse(date.getFullYear() + '-' + date.getMonth() + 1 + '-' + '0'+'1'))/1000)
    return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate()
}
//获取当月一号的时间戳
function getcurrentStamp(){
    let date = new Date()
    return (Date.parse(date.getFullYear() + '-' + date.getMonth() + 1 + '-' + '0'+'1'))/1000
}
//获取当月一号星期
console.log(getcurrentWeek())
function getcurrentWeek(){
    let date = new Date()
    return (new Date(date.getFullYear() + '-' + date.getMonth() + 1 + '-' + '0'+'1')).getDay()
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
console.log(getnextWeek())
function getnextWeek(){
    let date = new Date()
    if(date.getMonth() + 1 < 12){
        return (new Date(date.getFullYear() + '-' + date.getMonth() + 2 + '-' + '0'+'1')).getDay()
    }if(date.getMonth() + 1 == 12){
        return (new Date(date.getFullYear() + 1 + '-' + date.getMonth() + 1 + '-' + '0'+'1')).getDay()
    }
    
}
//通过传入值计算计算当月星期号


console.log((getnextStamp() - getcurrentStamp())/oneday)

