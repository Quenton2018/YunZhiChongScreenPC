'use strict';
var myChart1 = echarts.init(document.getElementById('Echarts1'));

$(function () {
    var params = {};
    //获取代理商地区分布
    AjaxJSON.get(API_URL.getTotalPower,params,function(res){
        $("#useTotal").text(res.data.useTotal);
        $("#totalPower").text(res.data.totalPower);
        //数字动画  
        $('.counter').countUp({
            delay: 10,
            time: 800
        });
    });
    AjaxJSON.get(API_URL.getCharingByELECar,params,function(res){
        if(!res.data) return false;
        loadCharts1(res.data);
    });
    AjaxJSON.get(API_URL.groupByPower,params,function(res){
        var htmlStr = '';
        if(!res.data) return false;
        res.data.forEach(function(item,index){
            var totalPower = parseFloat(item.totalPower).toFixed(2);
            var address = item.address;
            var index = index + 1;
            if(item.name){
                var phone = plusXing(item.name); 
            }else{
                var phone = '';
            }        
            htmlStr += '<div class="list-item">'+
                '<span class="mz"><i class="jt_icon up"></i>'+index+'</span>'+
                '<span class="area-power"><em class="counter iconfont">'+totalPower+'</em><sub>度</sub></span>'+
                '<span class="area-name">'+address+'</span>'+
                '<span class="area-dls">'+phone+'</span>'+
           '</div>';
        });
        $("#rankList").html(htmlStr);       
    });
    
    
});

//手机号码脱敏
function plusXing(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}
function loadCharts1 (resData) {

    var xAxisData = resData.map(function(item){
        return item.name;
    });
    
    var seriesData1 = resData.map(function(item){
        return parseInt(item.carValue);
    });

    var seriesData2 = resData.map(function(item){
        return parseInt(item.charingValue);
    });

    var option = {
        color: ['#19c1cc', '#97e087'],
        legend: {
            orient: 'horizontal',
            right: 100,
            data: ['电动车', '充电桩'],
            selectedMode:false,
            textStyle:{
                fontSize: 12,
                padding :[0,15,0,0],
                color: '#aaaeb0'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            top: '10%',
            bottom:'10%',
            containLabel: true
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //         mark: {show: true},
        //         dataView: {show: true, readOnly: false},
        //         magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                splitLine:{show: false},
                axisTick:{show:false},
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'#fff'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                data: xAxisData
            }
        ],
        yAxis: [
            {
                type: 'value',
                name:'单位/万',
                splitLine:{
                    show: true,
                    lineStyle:{
                        color:'#707070'
                    }
                },
                axisTick:{
                    show:false
                },
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#fff'
                    }
                },
            }
        ],
        series: [
            {
                name: '电动车',
                type: 'bar',
                barGap: 0,
                barWidth:12,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#fff',
                                fontSize: 12
                            }
                        }
                    }
                },
                data: seriesData1
            },
            {
                name: '充电桩',
                type: 'bar',
                barWidth:12,
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#fff',
                                fontSize: 12
                            }
                        }
                    }
                },
                data: seriesData2
            }
        ]
    };
    myChart1.setOption(option);
}