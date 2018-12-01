'use strict';
var myChart1 = echarts.init(document.getElementById('Echarts1'));

$(function () {
    //数字动画  
    $('.counter').countUp({
        delay: 10,
        time: 800
    });
    loadCharts1();
});

function loadCharts1 () {
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
                data: ['南昌', '九江', '宜春', '赣州', '抚州', '上饶', '吉安']
            }
        ],
        yAxis: [
            {
                type: 'value',
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
                data: [72, 56, 66, 84, 108, 70, 82]
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
                data: [62, 38, 45, 100, 60, 84, 80]
            }
        ]
    };
    myChart1.setOption(option);
}