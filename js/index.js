var myChart1 = echarts.init(document.getElementById('Echarts1'));
var myChart2 = echarts.init(document.getElementById('Echarts2'));
var myChart3 = echarts.init(document.getElementById('Echarts3'));
var myChart4 = echarts.init(document.getElementById('Echarts4'));
var myChart5 = echarts.init(document.getElementById('Echarts5'));
var myChart6 = echarts.init(document.getElementById('Echarts6'));
var myChartMap = echarts.init(document.getElementById('Echartsmap'));
$(function () {
    var params = {};
    AjaxJSON.get(API_URL.getChargingAmount,params,function(res){
        // console.log(res)
        var showNums = res.data;
    if (showNums) {
        // showNums = showNums * 11 * 12;
    } else {
        showNums = parseInt(localStorage.getItem('cdzNums'));
    }
        ScrollNums(showNums);

        // var scrollNum = setInterval(function () {
        //     showNums += randomData();
        //     ScrollNums(showNums);
        // }, 60000);
    });
    AjaxJSON.get(API_URL.findLastLogs,params,function(res){
        var html = '';
        $.each(res.data,function(k,v){
            html +='<li class="list-item"><span>'+v.mobile+'</span><span>'+v.desc+'</span></li>';
        });
        $('.logList').html(html);
        startMarquee();      
    });
    
    var scrollNumber = setInterval(function () {
        ajaxStatistics();
    }, 15000);
    ajaxStatistics();
    function ajaxStatistics(){
        AjaxJSON.get(API_URL.getDailyStatistics,params,function(res){
            if(res.data){
                $("#userNumber").text(res.data.userNumber);
                $("#chargeTimes").text(res.data.chargeTimes);
                $("#chargeAmount").text(parseFloat(res.data.chargeAmount).toFixed(2));
                $("#chargeElectric").text(parseFloat(res.data.chargeElectric).toFixed(2));
                $("#dayOnLineCharing").text(parseInt(res.data.dayOnLineCharing));
            }      
        });
    }
    var scrollRank = setInterval(function () {
        ajaxUseRank();
    }, 1000);
    
    //获取代理商地区分布
    AjaxJSON.get(API_URL.address,params,function(res){
        loadOption1(res.data);
    });
    function ajaxUseRank(){
        //充电桩使用排名
        AjaxJSON.get(API_URL.chringAddressUseRank,params,function(res){
            loadOption2(res.data);
        });
    }

    //安装点充电桩使用率
    AjaxJSON.get(API_URL.chringUseRank,params,function(res){
        loadOption3(res.data);
    });
    //充电方式配置
    AjaxJSON.get(API_URL.chargingWay,params,function(res){
        loadOption4(res.data);
    });
    // var mapStorage = JSON.parse(localStorage.getItem('mapJSON'));
    // if(mapStorage){
    //     loadOptionMap(mapStorage);
    // }else{
    //     //地图数据
        AjaxJSON.get(API_URL.chargAddress,params,function(res){
            if(res.data){
                var mapData = res.data;
                // localStorage.setItem('mapJSON',JSON.stringify(mapData));
                // var mapJSON
                loadOptionMap(res.data);
            }
        });
    // }
    // loadOptionMap(mapData.data);

    
});

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
//随机数
function randomData() {  
    return Math.round(Math.random()*2);  
};
//实时进度
function startMarquee() {   
    var scroll=setInterval('ScrollText()',1200);
    $("#marquee").hover(function(){
        clearInterval(scroll);
    },function(){
        scroll=setInterval('ScrollText()',1200);
    });
};
//滚动文字
function ScrollText(){
    var $obj = $("#marquee");
    var lineHeight = $obj.find(".list-item:first").outerHeight(); 
    $obj.find("ul").stop().animate({  
        marginTop : -lineHeight + "px"  
    },1000,function(){  
        $(this).css({marginTop : "0px"}).find("li:first").appendTo(this);  
    })  
}
//滚动充电桩数字
function ScrollNums(cdzNums){
    var nums = toThousands(cdzNums);
    var it = $(".cdz-sums").children();
    var len = String(nums).length;
    for(var i=0;i<len;i++){
        var num=String(nums).charAt(i);
        if(it.length<=i){
            if(num !== ','){
               $(".cdz-sums").append("<i class='sumsi_"+i+"'></i>");
            }else{
                $(".cdz-sums").append("<em class='dh'>，</em>"); 
            }            
        }
        if(num !== ','){
            var y = -parseInt(num)*90;
            var obj = $(".sumsi_"+i);
            // obj.stop().animate({
            //         backgroundPosition :'(0 '+String(y)+'px)' 
            //     }, 1400,'swing',function(){}
            // );
            obj.css({
                'backgroundPosition' :'0 '+String(y)+'px' 
            });                    
        }
        // console.log(num)
    }
    localStorage.setItem('cdzNums',cdzNums);
    //$("#cur_num").val(n);
};
//加载饼状图1数据
function loadOption1(resData){
    myChart1.clear();
    var data = [];
    resData.forEach(function(item){
        data.push({
            value:item.num,
            name:item.shi
        });
    });
    var legendData = data.map(function(item){
        return item.name;
    });
    var option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['#8378ea','#2397f0','#32c5e9','#14d1b0','#ff8562','#fb7293','#e7bcf3','#ffc637','#3498DB','#00fffc'],
        calculable : false,
        series : [
            {
                name:'代理商地区分布',
                type:'pie',
                radius: ['10%','55%'],
                center : ['50%', '55%'],
                roseType : 'area',
                data: data
            }
        ]
    };
    myChart1.setOption(option);
};
//加载柱状图1数据
function loadOption2(resData){
    // var resData = [
    //     {value:100, name:'景德镇恒大名郡',useRate:'60%'},
    //     {value:60, name:'伟梦清水湾',useRate:'50%'},
    //     {value:80, name:'慧谷创意产业园',useRate:'30%'},
    //     {value:70, name:'九里象湖',useRate:'40%'},
    //     {value:60, name:'景德镇恒大名郡',useRate:'20%'},
    //     {value:50, name:'景德镇恒大名郡',useRate:'50%'},
    //     {value:90, name:'景德镇恒大名郡',useRate:'60%'}
    // ];
    var data = [];
    resData.forEach(function(item){
        data.push({
            taishu:item.value,
            value:item.useRate,
            name:item.name
        });
    });
    var xAxisData = data.map(function(item){
        return item.taishu;
    });
    var ratioData = data.map(function(item){
        return parseInt(item.value);
    });
    var yAxisData = data.map(function(item){
        if (item.name && item.name.length > 8) {
          return item.name.substring(0, 8) + "...";
        } else {
          return item.name;
        }
    });
    data.forEach(function(item){
        if(item.value>100){
            item.value = 100;
        }
    })
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
            left: 15,
            right:95,
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
            axisLabel:{
                align: 'left',
            }, 
            axisLine:{
                show:false, 
                lineStyle:{
                    color:'#fff'
                }
            },
            offset:110,
            data: yAxisData,
        },
        series: [
            { // For shadow
                name: '充电桩使用排名',
                type: 'bar',
                barWidth: 12,
                silent: true,
                label: {
                    normal: {
                        formatter: function(data) {
                            var result = "";
                                result += xAxisData[data.dataIndex] + "       " + ratioData[data.dataIndex]+'%';
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
                name: '充电桩使用率',
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
                                             '#E89589','#16A085','#00fffc','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1',
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
};
//加载柱状图2数据
function loadOption3(resData){
    var dataAxis = ['小区', '车棚', '停车场', '学校', '商城'];
    var data = [resData.village, resData.bikeShed, resData.depot, resData.school, resData.superMaket];
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
};
//加载饼状图2数据
function loadOption4(resData){

    PercentPie(myChart4,resData[0].name,resData[0].value);
    PercentPie(myChart5,resData[1].name,resData[1].value);
    PercentPie(myChart6,resData[2].name,resData[2].value);
};
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
                fontSize: 12,
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
};
//加载地图数据
function loadOptionMap(mapJSON){

    // http://echarts.baidu.com/option.html#series-map.geoIndex
    // http://gallery.echartsjs.com/editor.html?c=xrJU-aE-LG
    var mapName = 'china';
    var max = 400,
        min = 9; // todo 
    var maxSize4Pin = 100,
        minSize4Pin = 20;
    var option = {
        tooltip: {
            trigger: 'item',
            position:'top',
            padding:[8,16],
            backgroundColor:'#00cccd',
            formatter: function (params) {
                return  '片区：' + params.data.groupName + '<br/> 设备：' + params.name;
            }
        },
        geo: {
            show: true,
            map: mapName,
            aspectScale: 0.75,
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
            silent:true,
            layoutCenter: ['30%', '30%'],
            itemStyle: {
                normal: {
                    areaColor: 'rgba(20,247,250,0.1)',
                    borderWidth: 0.1,
                    borderColor:'#0cb7cc',
                    shadowColor: 'rgba(0,255,252, 1)',
                    shadowBlur: 10
                },
                emphasis: {
                    show: false,
                    areaColor: '#00467F',
                }
            }
        },
        series: getSeries(mapJSON)
    };
    myChartMap.setOption(option);
};
function getSeries(mapJSON){
    var mapArr = [];
    var mapName = 'china';
    var seriesPointData = [];
    var seriesData = [{
        type: 'map',
        map: 'china',
        geoIndex: 0,
        showLegendSymbol: false, // 存在legend时显示
        roam: false
    }];
    
    var len = 10;
    seriesPointData[len] = [];
    mapJSON.point.forEach(function(item,index) {
        var itemArr = item.split(",");
        if (parseInt(itemArr[2]) == 10) {
            return true;
        }
        var seriesPoint = {
            name:itemArr[3],
            groupName:mapJSON.group[itemArr[4]],
            value:[parseFloat(itemArr[0]),parseFloat(itemArr[1]),parseFloat(itemArr[2])]
        };
        if (index < 20) {
            seriesPointData[len].push(seriesPoint);
            return true;
        }
        if(seriesPointData[index % len] == undefined){
            seriesPointData[index % len] = [];
        }
        seriesPointData[index % len].push(seriesPoint);
    });
    var colorList = ['#fff','#fff','#00fffc','#00fffc','#00fffc', '#00fffc','#6cefb0','#fff','yellow','#fff','yellow'];

    seriesPointData.forEach(function(item,index){
        var typeList = index == len ? 'effectScatter' : 'scatter';
        var size = index == len ? 10 : 5;
        seriesData.push({
            name: '小点',
            type: typeList,
            large:true,
            largeThreshold: 5000,
            coordinateSystem: 'geo',
            data: item,
            // symbolSize:3,
            // symbol: 'image://./images/cdz_icon2.png', //气泡
            // symbolSize: [12, 20],
            symbolSize: function(val) {
                // console.log(val)
                // return val[2] / 5;
                if(val[2] == 10){
                    return 1;
                }else if(val[2] >= 50){
                    return size;
                }else{
                    return 2;
                }
            },
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    color: colorList[index],
                    shadowBlur: 2,
                    shadowColor: '#2bfaff'
                }
            }
        });
    });
    return seriesData;
}
