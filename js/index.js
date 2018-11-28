var myChart1 = echarts.init(document.getElementById('Echarts1'));
var myChart2 = echarts.init(document.getElementById('Echarts2'));
var myChart3 = echarts.init(document.getElementById('Echarts3'));
var myChart4 = echarts.init(document.getElementById('Echarts4'));
var myChart5 = echarts.init(document.getElementById('Echarts5'));
var myChart6 = echarts.init(document.getElementById('Echarts6'));
$(function () {
    loadoOption1();
    loadoOption2();
    loadoOption3();
    loadoOption4();
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
            data: ['南丰','赣州','九江','吉安','抚州','宜春','上饶','景德镇'],
            textStyle:{
                fontSize: 12,
                padding :[0,6,0,0],
                color: '#6cbbe6'
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
    var yAxisData = [100, 90, 80, 70, 60, 50, 30];
    var yAxisbz = ['40%','30%', '20%', '10%', '10%', '5%', '5%'];
    var yMax = 100;
    var dataShadow = [];

    for (var i = 0; i < yAxisData.length; i++) {
        dataShadow.push(yMax);
    }
    var option = {
        title: {
            text: '小区名称',
            // subtext:'台数',
            top:'12%',
            subtextStyle:{
                align:'right'
            },
            textStyle:{
                color:'#fff'
            }       
        },
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
            type: 'value',           
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
            data: ['景德镇恒大名郡', '伟梦清水湾', '慧谷创意产业园','九里象湖', '景德镇恒大名郡', '景德镇恒大名郡', '景德镇恒大名郡'],
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
                                result += yAxisData[data.dataIndex] + "     " + yAxisbz[data.dataIndex];
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
                data: yAxisData
            }
        ]
    };
    myChart2.setOption(option);
}
function loadoOption3(){
    var dataAxis = ['小区', '车棚', '停车场', '学校', '架空城', '超市', '学校', '学校'];
    var data = ['97', '90', '86', '90', '80', '70', '60', '50'];
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
                fontSize: 15,
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