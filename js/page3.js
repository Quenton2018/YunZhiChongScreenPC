'use strict';
var myChart1 = echarts.init(document.getElementById('Echarts1'));
var myChart2 = echarts.init(document.getElementById('Echarts2'));

$(function () {
    var params = {};
    Slider();
    AjaxJSON.get(API_URL.getChargeDate,params,function(res){
        if(!res.data) return false;
        $("#chargingDateTime").text(parseInt(res.data.chargingDateTime));
        $("#signIn").text(parseInt(res.data.signIn));
        $("#chargeElectric").text(parseFloat(res.data.chargeElectric).toFixed(2));
        //数字动画  
        $('.counter').countUp({
            delay: 10,
            time: 800
        });
    });
    AjaxJSON.get(API_URL.userCountByYear,params,function(res){
        if(!res.data) return false;
        loadCharts1(res.data);
    });
    AjaxJSON.get(API_URL.parnerMoneyCount,params,function(res){
        if(!res.data) return false;
        loadCharts2(res.data);
    });
    AjaxJSON.get(API_URL.parnerMoney,params,function(res){
        var htmlStr = '';
        if(!res.data) return false;
        res.data.slice(0,5).forEach(function(item,index){
            var name = item.name;
            var address = item.address;
            var index = index + 1;
            var money = item.money;
            var charingNum = item.charingNum;
            htmlStr += '<tr>'+
                '<td>'+index+'</td>'+
                '<td>'+name+'</td>'+
                '<td>'+address+'</td>'+
                '<td>'+money+'元</td>'+
                '<td class="progress"><span class="progress-bar"><i style="width:100%;"></i><em>'+charingNum+'</em></span></td>'+
            '</tr>';       
        });
        $("#dlsList").html(htmlStr);       
    });
});

function loadCharts1 (resData) {
    var xAxisData = resData.map(function(item){
        return parseInt(item.time) + '月';
    });
    var seriesData = resData.map(function(item){
        return item.memberNum;
    });
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}人'
        },
        grid: {
            left: '3%',
            right: '6%',
            top: '24%',
            bottom:'8%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine:{
                show: true,
                lineStyle:{
                    color:'#acacac'
                }
            },
            axisTick:{show:false},
            axisLine: {
                show: true,
                lineStyle:{
                    color:'#acacac'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            data: xAxisData
        },
        yAxis: {
            type: 'value',        
            min:0,
            // max:21000,
            name: '单位：人',
            nameTextStyle:{
                color:'#00fbfe'
            },
            splitLine:{
                show: true,
                lineStyle:{
                    color:'#fff'
                }
            },
            axisTick:{show:false},
            axisLine: {
                show: true,
                lineStyle:{
                    color:'#acacac'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name: '年度用户活跃度趋势',
                type: 'line',        
                smooth: true,
                symbol:'circle',
                symbolSize:8,
                hoverAnimation:false,
                itemStyle: {
                    normal: {
                        color: "#00b7ee",
                        lineStyle: {
                            color: "#00b7ee"
                        }
                    }
                }, 
                data: seriesData
            }
        ]
    };
    myChart1.setOption(option);
}
function loadCharts2 (resData) {
    var xAxisData = resData.map(function(item){
        return parseInt(item.time) + '月';
    });
    var seriesData = resData.map(function(item){
        return item.money;
    });

    var maxIndex = seriesData.indexOf(Math.max.apply(null,seriesData));

    var option = {
        tooltip : {
            trigger: 'item',
            position:'top',
            padding:[8,16],
            backgroundColor:'#00cccd',
            formatter: function (params) {
                if(params.value){
                   return '月份 : '+params.name+'<br/>收益 : '+params.value+'元'; 
                }            
            },
            textStyle:{
                align:'left'
            }
        },
        grid: {
            left: '3%',
            right: '6%',
            top: '24%',
            bottom:'8%',
            containLabel: true
        },
        xAxis: {
            type : 'category',
            boundaryGap : false,
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            },
            data : xAxisData
        },
        yAxis: {
            type : 'value',
            min:0,
            // max:1200,
            name: '单位：元',
            nameTextStyle:{
                color:'#00fbfe'
            },
            splitLine:{
                show: true,
                lineStyle:{
                    color:'rgba(101,198,231,0.2)'
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        series : {
            name:'代理商收益',
            type:'line',
            color: "#2bfaff",          
            lineStyle: {
                color: "transparent"
            },
            symbol:'circle',
            symbolSize:8,
            areaStyle: {               
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: '#00cccd' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#407fff' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
            data:seriesData
        }
    };
    myChart2.setOption(option);
    setTimeout(function () {
        myChart2.dispatchAction({
          type: 'showTip',
          seriesIndex:0 ,//第几条series
          dataIndex: maxIndex,//第几个tooltip
      });
    },500);
}
function Slider(){
    $('.roundabout_box ul').roundabout({
        duration: 1000,
        minScale: 0.3,
        autoplay: true,
        autoplayDuration: 3000,
        minOpacity: 0,
        maxOpacity: 1,
        // reflect: true,
        startingChild: 0,
        autoplayInitialDelay: 1000,
        autoplayPauseOnHover: true,
        enableDrag: true
    });
}