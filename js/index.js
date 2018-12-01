var myChart1 = echarts.init(document.getElementById('Echarts1'));
var myChart2 = echarts.init(document.getElementById('Echarts2'));
var myChart3 = echarts.init(document.getElementById('Echarts3'));
var myChart4 = echarts.init(document.getElementById('Echarts4'));
var myChart5 = echarts.init(document.getElementById('Echarts5'));
var myChart6 = echarts.init(document.getElementById('Echarts6'));
var myChartMap = echarts.init(document.getElementById('Echartsmap'));
$(function () {
    loadoOption1();
    loadoOption2();
    loadoOption3();
    loadoOption4();
    loadoOptionMap();
});
//加载饼状图1数据
function  loadoOption1(){
    myChart1.clear(); 
    var data = [
        {value:10, name:'南丰'},
        {value:5, name:'赣州'},
        {value:15, name:'九江'},
        {value:25, name:'吉安'},
        {value:20, name:'抚州'},
        {value:35, name:'宜春'},
        {value:30, name:'上饶'},
        {value:40, name:'景德镇'}
    ];
    var legendData = data.map(function(item){
        return item.name;
    });
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#8378ea','#2397f0','#32c5e9','#14d1b0','#ff8562','#fb7293','#e7bcf3','#ffc637'],
        legend: {
            orient: 'horizontal',
            top: '12%',
            left: 'center',
            data: legendData,
            textStyle:{
                fontSize: 12,
                padding :[0,6,0,0],
                color: ['#8378ea','#2397f0','#32c5e9','#14d1b0','#ff8562','#fb7293','#e7bcf3','#ffc637']
            }
        },
        calculable : true,
        series : [
            {
                name:'地区分布',
                type:'pie',
                radius: ['15%', '60%'],
                center : ['50%', '60%'],
                roseType : 'area',
                data: data
            }
        ]
    };
    myChart1.setOption(option);

}
function loadoOption2(){
    var data = [
        {value:100, name:'景德镇恒大名郡',ratio:'60%'},
        {value:60, name:'伟梦清水湾',ratio:'50%'},
        {value:80, name:'慧谷创意产业园',ratio:'30%'},
        {value:70, name:'九里象湖',ratio:'40%'},
        {value:60, name:'景德镇恒大名郡',ratio:'20%'},
        {value:50, name:'景德镇恒大名郡',ratio:'50%'},
        {value:90, name:'景德镇恒大名郡',ratio:'60%'}
    ];
    var xAxisData = data.map(function(item){
        return item.value;
    });
    var ratioData = data.map(function(item){
        return item.ratio;
    });
    var yAxisData = data.map(function(item){
        return item.name;
    });
    var xMax = 100;
    var dataShadow = [];

    for (var i = 0; i < xAxisData.length; i++) {
        dataShadow.push(xMax);
    }
    var option = {
        title: [{
            text: '小区名称',
            top:'12%',
            textStyle:{
                color:'#fff'
            }       
        },{
            text: '台数',
            top:'12%',
            right:'18%',
            textStyle:{
                fontSize:12,
                color:'#fcff00'
            }       
        },{
            text: '使用率',
            top:'12%',
            right:'3%',
            textStyle:{
                fontSize:12,
                color:'#fcff00'
            }       
        }],
        tooltip : {
            trigger: 'item',
        },
        grid: {
            show : false,
            left: 10,
            right:100,
            bottom: 30,
            top: '20%',
            containLabel: true
        },
        xAxis: {
            type:'value',           
            show:false
        },
        yAxis: {
            type: 'category',
            inverse: true,
            axisTick:{
               show:false
            },
            axisLine:{
                show:false, 
                lineStyle:{
                    color:'#fff'
                }
            },
            data: yAxisData,
        },
        series: [
            { // For shadow
                name: '充电桩使用台数',
                type: 'bar',
                barWidth: 12,
                silent: true,
                label: {
                    normal: {
                        formatter: function(data) {
                            var result = "";
                                result += xAxisData[data.dataIndex] + "     " + ratioData[data.dataIndex];
                            return result;
                        },
                        show: true,
                        position: 'right',
                        distance:10,
                        textStyle: {
                            fontSize : 12,
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        barBorderRadius:12,
                        color: '#153963'
                    }
                },
                barGap:'-100%',
                data: dataShadow
            },
            {
                name: '充电桩使用台数',
                type: 'bar',
                z: 3,
                barWidth:12,
                itemStyle: {
                    normal: {
                        barBorderRadius:12,
                        shadowColor: 'rgba(255, 255, 255, 0.5)',
                        shadowBlur: 12,
                        // 随机显示
                        //color:function(d){return "#"+Math.floor(Math.random()*(256*256*256-1)).toString(16);}
                  
                        // 定制显示（按顺序）
                        color: function(params) { 
                            var colorList = ['#ef6c77','#a7fa91','#34baff','#ff903f','#f482fe', '#fe846c','#6cefb0',
                                             '#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1',
                                             '#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                            return colorList[params.dataIndex] 
                        }
                    },
                },
                data: data
            }
        ]
    };
    myChart2.setOption(option);
}
function loadoOption3(){
    var dataAxis = ['小区', '车棚', '停车场', '学校', '架空城', '超市', '学校', '学校'];
    var data = ['97', '10', '86', '90', '80', '70', '60', '50'];
    var option = {
        grid: {
            show : false,
            left:50,
            bottom:30,
        },
        tooltip : {
            trigger: 'item',
            formatter: '{a0}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#2ce1e6"></span>{b}：{c0}%'
        },
        xAxis: {
            data: dataAxis,
            z: 10,
            splitLine:{show: false},
            axisTick:{show:false},
            axisLine: {
                show: true,
                lineStyle:{
                    color:'#6a7a85'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#fff'
                }
            }
        },
        yAxis: {
            splitLine:{show: false},
            axisTick:{show:false},
            axisLine: {
                show: true,
                lineStyle:{
                    color:'#6a7a85'
                }
            },
            axisLabel: {
                formatter: function (value, index) {
                    if (index === 0) {
                        return '0';
                    }
                    return value+"%";
                },
                textStyle: {
                    color: '#fff'
                }
            }
        },
        series: [
            {
                name:"安装点充电桩使用率",
                type: 'bar',
                barWidth:20,
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2ce1e6'},
                                {offset: 0.5, color: '#16a7c0'},
                                {offset: 1, color: '#02729e'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#2378f7'}
                            ]
                        )
                    }
                },
                data: data
            }
        ]
    };
    myChart3.setOption(option);
}
function loadoOption4(){
    PercentPie(myChart4,'充电时长',30.71);
    PercentPie(myChart5,'充满自停',49.24);
    PercentPie(myChart6,'充满自停+充电时长',20.05);
}
function PercentPie(myChart,title,value){
    var option = {
        color:[new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [
                {offset: 0, color: '#ffa475'},
                {offset: 0.7, color: '#ff728c'},
                {offset: 1, color: '#ff728c'}
            ]
        ),'rgba(255,144,140,0.4)'],
        title: {
            text: title,
            top:'18%',
            x:'center',
            textStyle:{
                color: '#fff',
                fontSize: 14,
            }
        },
        tooltip : {
            trigger: 'item',
            formatter: '{a0}<br /><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#ffa475"></span>'+ title +'：{c0}%'
        },
        series: [{
            name:"充电方式",
            type: 'pie',
            radius: ['60%', '85%'],
            center:['50%', '60%'],
            avoidLabelOverlap: false,
            hoverAnimation:false,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    textStyle: {
                        color:'#00fbfe',
                        fontSize: 18
                    },
                    formatter:'{b}\n{c}%'
                }
            },
            data: [{
                    value: value,              
                    label:{
                        show: true,
                        verticalAlign: 'middle'
                    }
                },
                {
                    value: 100-value,
                    tooltip:{
                        show: false
                    },
                }
            ]
        }]
    };
    myChart.setOption(option);
}
function loadoOptionMap(){
    // function randomData() {  
    //      return Math.round(Math.random()*500);  
    // } 
    // var mydata = [  
    //       {name:"南海诸岛",value:0,itemStyle:{  normal:{opacity:0,label:{show:false}}}},  
    //       {name: '北京',value: randomData() },  
    //       {name: '天津',value: randomData() },  
    //       {name: '上海',value: randomData() },  
    //       {name: '重庆',value: randomData() },  
    //       {name: '河北',value: randomData() },  
    //       {name: '河南',value: randomData() },  
    //       {name: '云南',value: randomData() },  
    //       {name: '辽宁',value: randomData() },  
    //       {name: '黑龙江',value: randomData() },  
    //       {name: '湖南',value: randomData() },  
    //       {name: '安徽',value: randomData() },  
    //       {name: '山东',value: randomData() },  
    //       {name: '新疆',value: randomData() },  
    //       {name: '江苏',value: randomData() },  
    //       {name: '浙江',value: randomData() },  
    //       {name: '江西',value: randomData() },  
    //       {name: '湖北',value: randomData() },  
    //       {name: '广西',value: randomData() },  
    //       {name: '甘肃',value: randomData() },  
    //       {name: '山西',value: randomData() },  
    //       {name: '内蒙古',value: randomData() },  
    //       {name: '陕西',value: randomData() },  
    //       {name: '吉林',value: randomData() },  
    //       {name: '福建',value: randomData() },  
    //       {name: '贵州',value: randomData() },  
    //       {name: '广东',value: randomData() },  
    //       {name: '青海',value: randomData() },  
    //       {name: '西藏',value: randomData() },  
    //       {name: '四川',value: randomData() },  
    //       {name: '宁夏',value: randomData() },  
    //       {name: '海南',value: randomData() },  
    //       {name: '台湾',value: randomData() },  
    //       {name: '香港',value: randomData() },  
    //       {name: '澳门',value: randomData() }  
    // ];        
    // var option = {

    //     title : {
    //         // text: '微博签到数据点亮中国',
    //         // subtext: 'From ThinkGIS',
    //         // sublink: 'http://www.thinkgis.cn/public/sina',
    //         left: 'center',
    //         top: 'top',
    //         textStyle: {
    //             color: '#fff'
    //         }
    //     },
    //     // legend: {
    //     //     left: 'left',
    //     //     data: ['强', '中', '弱'],
    //     //     textStyle: {
    //     //         color: '#ccc'
    //     //     }
    //     // },
    //     // geo: {
    //     //     map: 'china',
    //     //     roam: true,
    //     //     label: {
    //     //         emphasis: {
    //     //             show: false
    //     //         }
    //     //     },
    //     //     itemStyle: {
    //     //         normal: {
    //     //             areaColor: '#323c48',
    //     //             borderColor: '#111'
    //     //         },
    //     //         emphasis: {
    //     //             areaColor: '#2a333d'
    //     //         }
    //     //     }
    //     // },
    //     series: [{
    //         type: 'map',
    //         // coordinateSystem: 'geo',
    //         mapType: 'china',
    //         roam: false, 
    //         itemStyle: {  
    //             normal: {  
    //                 color: function (params) {  
    //                     var colorList = [  
    //                     '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',  
    //                     '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',  
    //                     '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'  
    //                    ];  
    //                     return colorList[params.dataIndex]  
    //                 }                 
    //             }  
    //         },
    //         label: {  
    //             normal: {  
    //                 show: false  //省份名称  
    //             },  
    //             emphasis: {  
    //                 show: false  
    //             }  
    //         },
    //         // data:mydata  //数据 
    //         itemStyle: {
    //             shadowBlur: 2,
    //             shadowColor: 'rgba(14, 241, 242, 0.8)',
    //             color: 'rgba(14, 241, 242, 0.8)',
    //             normal:{                           //默认状态
    //                 areaColor:new echarts.graphic.LinearGradient(
    //                     0, 0, 0, 1,
    //                     [
    //                         {offset: 0, color: '#0e328d'},
    //                         {offset: 0.5, color: '#1758ce'},
    //                         {offset: 1, color: '#0c2e6d'}
    //                     ]
    //                 ),        //地图本身的颜色
    //                 // borderColor:'rgb(60,180,207)',     //省份的边框颜色
    //                 borderWidth:0,                     //省份的边框宽度
    //                 opacity:0.8,                       //图形透明度
    //             },
    //             emphasis: {                          //高亮状态
    //                 areaColor: '#0a3690',  //高亮时候地图显示的颜色
    //                 borderWidth: 0                  //高亮时候的边框宽度
    //             },

    //         },
    //         // data: weiboData[1]
    //     }]
    // };
    // myChartMap.setOption(option);
// http://echarts.baidu.com/option.html#series-map.geoIndex
    // http://gallery.echartsjs.com/editor.html?c=xrJU-aE-LG
    var mapName = 'china'
    var data = [
        {name:"南海诸岛",value:0,itemStyle:{  normal:{opacity:0,label:{show:false}}}},
        {name:"北京",value:5},
        {name:"天津",value:42},
        {name:"河北",value:102},
        {name:"山西",value:81},
        {name:"内蒙古",value:47},
        {name:"辽宁",value:67},
        {name:"吉林",value:82},
        {name:"黑龙江",value:66},
        {name:"上海",value:24},
        {name:"江苏",value:92},
        {name:"浙江",value:114},
        {name:"安徽",value:109},
        {name:"福建",value:116},
        {name:"江西",value:91},
        {name:"山东",value:119},
        {name:"河南",value:137},
        {name:"湖北",value:116},
        {name:"湖南",value:114},
        {name:"重庆",value:91},
        {name:"四川",value:125},
        {name:"贵州",value:62},
        {name:"云南",value:83},
        {name:"西藏",value:9},
        {name:"陕西",value:80},
        {name:"甘肃",value:56},
        {name:"青海",value:10},
        {name:"宁夏",value:18},
        {name:"新疆",value:111},
        {name:"广东",value:123},
        {name:"广西",value:59},
        {name:"海南",value:14},
    ];
    
    var geoCoordMap = {};
    
    /*获取地图数据*/
    myChartMap.showLoading();
    var mapFeatures = echarts.getMap(mapName).geoJson.features;
    myChartMap.hideLoading();
    mapFeatures.forEach(function(v) {

        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;

    });

    // console.log("============geoCoordMap===================")
    // console.log(geoCoordMap)
    // console.log("================data======================")
    
    var max = 480,
        min = 9; // todo 
    var maxSize4Pin = 100,
        minSize4Pin = 20;

    var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value),
                });
            }
        }
        return res;
    };
    console.log(data)
    console.log(convertData(data))
    option = {
        visualMap: {
            show: false,
            min: 0,
            max: 300,
            left: 'left',
            top: 'bottom',
            calculable: true,
            seriesIndex: [1],
            inRange: {
                // color: ['#3B5077', '#031525'] // 蓝黑
                // color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                // color: ['#23074d', '#cc5333'] // 紫红
                // color: ['#00467F'] // 蓝绿
                // color: ['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
                // color: ['#1488CC', '#2B32B2'] // 浅蓝
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#00467F', '#A5CC82'] // 蓝绿

            }
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            top:'2%',
            roam: false,
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    // areaColor: new echarts.graphic.LinearGradient(
                    //     0, 0, 0, 1,
                    //     [
                    //         {offset: 0, color: '#0a4f88'},
                    //         {offset: 0.2, color: '#123290'},
                    //         {offset: 0.4, color: '#0a3b8c'},
                    //         {offset: 0.6, color: '#1164e9'},
                    //         {offset: 0.8, color: '#1164e9'},
                    //         {offset: 1, color: '#1164e9'}
                    //     ]
                    // ),
                    areaColor: '#00467F',
                    borderColor: '#0dc9d7'
                },
                emphasis: {
                    
                    areaColor: '#00467F',
                }
            }
        },
        series: [
            {
                name: '白点',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data),
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: false,
                // itemStyle: {
                //     normal: {
                //         color: '#05C3F9'
                //     }
                // },
                itemStyle: {
                    normal: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(255, 255, 255, 0.5)',
                        shadowOffsetY: 5,
                        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                            offset: 0,
                            color: 'rgb(255, 255, 200)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 255, 255)'
                        }])
                    }
                }
            },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '气泡',
                type: 'scatter',
                coordinateSystem: 'geo',
                // symbol: 'image://./images/cdz_icon2.png', //气泡
                // symbolSize: [12, 20],
                symbol:'pin',
                symbolSize: function(val) {
                    var a = (maxSize4Pin - minSize4Pin) / (max - min);
                    var b = minSize4Pin - a * min;
                    b = maxSize4Pin - a * max;
                    return a * val[2] + b;
                },
                symbolKeepAspect: false,
                hoverAnimation: false,
                // symbolOffset:[0, '-100%'], 
                label: {
                    // position: "insideTop",
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F62157', //标志颜色
                    }
                },
                zlevel: 6,
                data: convertData(data),
            },
            // {
            //     name: "图标",
            //     type: 'custom',//配置显示方式为用户自定义
            //     zlevel: 6,
            //     coordinateSystem: 'geo',
            //     itemStyle: {
            //         normal: {
            //             color: '#46bee9'
            //         }
            //     },
            //     renderItem: function (params, api) {//具体实现自定义图标的方法
            //         return {
            //             type: 'image',
            //             style: {
            //                 image: "image://./images/cdz_icon.png",
            //                 x: api.coord([
            //                     convertData(data)[params.dataIndex].value[0], convertData(data)[params.dataIndex]
            //                         .value[1]
            //                 ])[0],
            //                 y: api.coord([
            //                     convertData(data)[params.dataIndex].value[0], convertData(data)[params.dataIndex]
            //                         .value[1]
            //                 ])[1]
            //             }
            //         }
            //     },
            //     data: convertData(data)
            // },
            // {
            //     name: '黄点',
            //     type: 'effectScatter',
            //     coordinateSystem: 'geo',
            //     data: convertData(data.sort(function(a, b) {
            //         return b.value - a.value;
            //     }).slice(0, 5)),
            //     symbolSize: function(val) {
            //         return val[2] / 20;
            //     },
            //     rippleEffect: {
            //         brushType: 'stroke'
            //     },
            //     hoverAnimation: true,
            //     label: {
            //         normal: {
            //             formatter: '{b}',
            //             position: 'right',
            //             show: false
            //         }
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: 'yellow',
            //             shadowBlur: 10,
            //             shadowColor: 'yellow'
            //         }
            //     },
            //     zlevel: 1
            // },
            // {
            //     name: '红点',
            //     type: 'effectScatter',
            //     coordinateSystem: 'geo',
            //     data: convertData(data.sort(function(a, b) {
            //         return b.value - a.value;
            //     }).slice(5, 10)),
            //     symbolSize: function(val) {
            //         return val[2] / 10;
            //     },
            //     showEffectOn: 'render',
            //     rippleEffect: {
            //         brushType: 'stroke'
            //     },
            //     hoverAnimation: true,
            //     label: {
            //         normal: {
            //             formatter: '{b}',
            //             position: 'right',
            //             show: false
            //         }
            //     },
            //     itemStyle: {
            //         normal: {
            //             color: 'red',
            //             shadowBlur: 10,
            //             shadowColor: 'red'
            //         }
            //     },
            //     zlevel: 1
            // }
        ]
    };
    myChartMap.setOption(option);
}
startmarquee();
function startmarquee() {   
    var $this = $("#marquee");
    var scrollTimer;
    $this.hover(function () {
        clearInterval(scrollTimer);
    }, function () {
        scrollTimer = setInterval(function () {
            scrollNews($this);
        }, 1000);
    }).trigger("mouseleave");

    function scrollNews(obj) {
        var $self = obj;
        var lineHeight = $self.find(".list-item:first").height();
        $self.animate({
            "marginTop": -lineHeight + "px"
        }, 600, function () {
            $self.css({
                marginTop: 0
            }).find(".list-item:first").appendTo($self);
        })
    }
};
function show_num(n){
    var nums = toThousands(n);
    console.log(nums)
    var it = $(".cdz-sums i");
    var len = String(nums).length;
    for(var i=0;i<len;i++){
        var num=String(nums).charAt(i);
        if(it.length<=i){
            if(num !== ','){
               $(".cdz-sums").append("<i class='sumsi_"+i+"'></i>");

            }else{
                $(".cdz-sums").append("<em>，</em>"); 
            }            
        }
        if(num !== ','){
            var y = -parseInt(num)*90;
            var obj = $(".sumsi_"+i);
            obj.animate({
                    backgroundPosition :'(0 '+String(y)+'px)' 
                }, 1500,'swing',function(){}
            );
        }
        // console.log(num)
    }
    // $("#cur_num").val(n);
}
//数字千分位
function toThousands(num) {
    var result = [ ], counter = 0;
    num = (num || 0).toString().split('');
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result.unshift(num[i]);
        if (!(counter % 3) && i != 0) { result.unshift(','); }
    }
    return result.join('');
}
show_num(987654321)