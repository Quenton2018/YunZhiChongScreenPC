'use strict';
var myChart1 = echarts.init(document.getElementById('Echarts1'));
var myChart2 = echarts.init(document.getElementById('Echarts2'));

$(function () {
    //数字动画  
    $('.counter').countUp({
        delay: 10,
        time: 800
    });
    loadCharts1();
    loadCharts2();
    Slider();
});

function loadCharts1 () {
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        yAxis: {
            type: 'value',        
            min:0,
            max:1200,
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
                data: [40, 90, 190, 280, 300, 280, 390, 510, 640, 780, 820, 1000]
            }
        ]
    };
    myChart1.setOption(option);
}
function loadCharts2 () {
    var option = {
        tooltip : {
            trigger: 'item',
            position:'top',
            padding:[8,16],
            backgroundColor:'#00cccd',
            formatter: function (params) {
                console.log(params)
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
            data : ['','2月','4月','6月','8月','10月','12月']
        },
        yAxis: {
            type : 'value',
            min:0,
            max:1200,
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
            data:[0, 200, 400, 700, 700, 820, 1000]
        }
    };
    myChart2.setOption(option);
}
function Slider(){
    $('.roundabout_box ul').roundabout({
        duration: 1000,
        minScale: 0.3,
        autoplay: true,
        autoplayDuration: 3000,
        minOpacity: 0,
        maxOpacity: 1,
        reflect: true,
        startingChild: 1,
        autoplayInitialDelay: 1000,
        autoplayPauseOnHover: true,
        enableDrag: true
    });
}