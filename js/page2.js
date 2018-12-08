
	// 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('main'));
        var myChart2 = echarts.init(document.getElementById('find'));
        var myChart3 = echarts.init(document.getElementById('mawn'));
        var myChart4 = echarts.init(document.getElementById('area'));
        var myChart5 = echarts.init(document.getElementById('question'));
		
		$(function () {
		    loadOption1();
		    loadOption3();    
		    
		    AjaxJSON.get(API_URL.getAllNum,{},function(res){
		    	loadOption4(res.data);
		    });
		    // var load = setInterval(function(){
		    // 	AjaxJSON.get(API_URL.getAllNum,{},function(res){
			   //  	loadOption4(res.data);
			   //  })
		    // },3000);
		    
		    AjaxJSON.get(API_URL.ChargingCdz,{},function(res){
//			    console.log(res.data)
			    $("#Num").text(res.data+'台')
			});
			
			AjaxJSON.get(API_URL.chringPlace,{},function(res){
		    	loadOption2(res.data);
//		    	console.log(res.data['上网查询'])
		    });
		    // var find = setInterval(function(){
		    // 	AjaxJSON.get(API_URL.chringPlace,{},function(res){
			   //  	loadOption2(res.data);
			   //  });
		    // },3000);
		    
		    AjaxJSON.get(API_URL.ChargingProblem,{},function(res){
		    	loadOption5(res.data);
		    	// console.log(res.data)
		    });
			
		});
		
	function  loadOption1(){
			myChart1.clear();
			var cdzstate = [
			                {value:4000, name:'在线充电桩'},
			                {value:2500, name:'空闲充电桩'},
			                {value:2000, name:'返修充电桩'}
			            ];
			option = {
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    series : [
			        {
			            name: '云智充',
			            type: 'pie',        
			            radius : ['24%', '65%'],
			            center: ['50%', '43%'],
			            selectedMode: 'single',
			            label: {
			                normal: {
			                    position: 'inner',
			                    formatter: '{d}%',
			                    textStyle:{
			                    	fontSize:12
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:cdzstate,
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            },
			            color: ['#3fc3d0','#f77900','#dd614a']
			        }
			    ]
			};
        myChart1.setOption(option);
	}
	function  loadOption2(resData){
		myChart2.clear();
//		var way = ['手机app','上网查询','电子地图','求助询问'];
//		var city = ['江西','上海','深圳','天津','广西'];
//		var num1 = [320, 302, 301, 334, 390];
//		var num2 = [120, 132, 101, 134, 90];
//		var num3 = [220, 182, 191, 234, 290];
//		var num4 = [150, 212, 201, 154, 50];
		var way = ['上网查询','电子地图','求助询问','手机App'];
		var city = ['江西','上海','深圳','天津','广西'];
		var num1 = resData['上网查询'];
		var num2 = resData['电子地图'];
		var num3 = resData['求助询问'];
		var num4 = resData['手机APP'];
		option = {
		    tooltip : {						
		        trigger: 'axis',			
		        axisPointer : {            
		            type : 'shadow'       
		        }
		    },		    
		    legend: {			
			        data: way,
			        orient: 'horizontal',
			        textStyle: {
			            fontSize: 18,
			            color: ['#fff'],
			            padding:[0,35,0,0],
			        },
			        top:'10%',
			        left:'13%',
			        align: 'left',
			        selectedMode:false
            },
		    grid: {
		    	top:'22%',
		        left: '18%',		
		        right: '15%',
		        bottom: '3%',
		        containLabel: true		
		    },
		    xAxis:  {					
		        type: 'value',			
		        splitLine:{
                    show: false,
                    lineStyle:{
                        color:'#707070'
                    }
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                	show:false
                },
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#fff'
                    }
                },
		    },
		    yAxis: {
		        type: 'category',		
		        data: city.reverse(),		
		        splitLine:{
                    show: false,
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
                axisLabel: {
		            textStyle: {
		                color: '#fff',
		                fontSize:16
		            }
		        },
		    },
		    series: [				
		        {
		            name: '上网查询',		
		            type: 'bar',		
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight',
		                }
		            },
		            data: num1,
		            itemStyle:{
		            	color:'#0035f9',
		            	barBorderRadius: [25,0,0,25],
					},
		            barWidth:22
		        },
		        {
		            name: '电子地图',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: num2,
		            itemStyle:{
		            	color:'#ff4e4e'
		            },
		            barWidth:22
		        },
		        {
		            name: '求助询问',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: num3,
		            itemStyle:{
		            	color:'#efe39b'
		            },
		            barWidth:22
		        },
		        {
		            name: '手机App',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: false,
		                    position: 'insideRight'
		                }
		            },
		            data: num4,
		            itemStyle:{
		            	color:'#25f3e6',
				        barBorderRadius: [0,25,25,0],            
		            },
		            barWidth:22
		        }
		    ]
		};
        myChart2.setOption(option);
	}

	function  loadOption3(){
		myChart3.clear();		
		var percent = [0.5333,0.2667,0.20];
		var grayBar = [1, 1, 1];
		var platform = [0, 0, 0];
		var cdz = [ '在线充电桩', '空闲充电桩','返修充电桩'];
		option = {
			grid: {
		    	top:'5%',
		        left: '15%',	
		        right: '20%',
		        bottom: '15%',
		        containLabel: false
			},
		    xAxis: [{
		            show: false,
		       	},
		        {
		            show: false,
		        }
		    ],
		    yAxis: {
		        type: 'category',
		        axisTick: {
		            show: true, //隐藏Y轴刻度
		        },
		        axisLine: {
		            show: false, //隐藏Y轴线段
		        }
		    },
		    series: [
		        {	
		            show: true,
		            type: 'bar',
		            barGap: '-100%',
		            barWidth: '25%', //统计条宽度 
		            itemStyle: {
		                color: 'rgba(99,99,99,0.3)'
		            },
		            z: 1,
					data:[1,1,1]
		        },
		        {
		            show: true,
		            type: 'bar',
		            itemStyle: {
		                color: function (params){
	                        var colorList = ['#3fc3d0','#f77900','#dd614a'];
	                        var color = colorList.reverse();
	                        return color[params.dataIndex];
	                    }
		            },
		            z: 2,
		            data: percent.reverse()
		        },
		        {
		            show: true,
		            type: 'bar',
		            xAxisIndex: 1, 
		            barGap: '-100%',
		            barWidth: '30%', 
		            label: {
		                normal: {
		                    show: true,
		                    position: [0, '-100%'],
		                    color: '#eee',
		                    fontSize: 16,
		                    formatter: function(data) {
		                    	var cdzList = cdz.reverse();
		                        return cdzList[data.dataIndex];
		                    },
		                }
		            },
		            data: platform
		        }
		    ]
		};
        myChart3.setOption(option);
	}
	
	function  loadOption4(resData){
		myChart4.clear();
		var city = ['江西省', '江苏省', '安徽省', '河北省', '湖南省', '浙江省','四川省'];
//		var num = [3310, 5100, 4029, 5000, 6050, 7030];
		var num = resData;
		option = {
			tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    grid: {
		    	top:'20%',
		        bottom: '5%',
		        containLabel: true
			},
		    xAxis: {
		        type: 'category',
		        inverse:true,
		        axisLabel: {
		            textStyle: {
		                color: '#fff',
		                fontSize:16
		            }
		        },
		        splitLine:{
		        	show:false
		        },
		        data: city.reverse()
		    },
		    yAxis: {
		        type: 'value',
		        axisLabel: {
		            textStyle: {
		                color: '#fff',
		                fontSize:16
		            }
		        },
		        splitLine:{
		        	show:false
		        },
		        name : '单位:/台',
		        nameTextStyle:{
		        	color:'#fff'
		        }
		    },
		    series: [{
		        type: 'bar',
	           	barWidth:32,
	            itemStyle: {
	                normal: {
	                    color: new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                        	{offset: 0, color: '#05f4ff'},
	                            {offset: 0.7, color: '#bffdff'},
	                            {offset: 1, color: '#fff'}
	                        ]
	                    ),
	                    label: {
		            		show:true,
			                position: 'top',
			                textStyle:{
			                	color:'#fff',
			                	fontSize:14
			                }
			            },
	                },
	                emphasis: {
	                    color: new echarts.graphic.LinearGradient(
	                        0, 0, 0, 1,
	                        [
	                            {offset: 0, color: '#00f4ff'},
	                            {offset: 0.5, color: '#05f4ff'},	
	                            {offset: 1, color: '#05f4ff'}
	                        ]
	                    )
	                }  
	            },
	            data: num.reverse()
		    }]
		};
        myChart4.setOption(option);
	}	
	
	function  loadOption5(resData){
		myChart5.clear();
		var cdzList = [];
		var bgcolor = ['#ff4e4e','#ffff43', '#25f3e6', '#0035f9', '#efe39b','#97dd42','#f19f4e'];
		
        var cdzNum = [];
	    for (var i in resData) {
	        if(resData.hasOwnProperty(i)){		
	        	cdzNum.push({
	        		value:resData[i],
	        		name:i
	        	});
	        	cdzList.push(i);
	        }; 
	    }
		option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:cdzList,
		        left:'60%',
		        top:'12%',
		        bottom:'10%',
		        right:'10%',
//		        itemHeight:'20',
		        textStyle:{
		        	color:'#fff',
		        	fontSize:18,
		        	padding:[5,0,8,10]
		        }
		    },
		    series: [
		        {
		        	center: ['30%', '53%'],
		            name:'云智充',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '28',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            color:bgcolor,
		            data:cdzNum
		        }
		    ]
		};
        myChart5.setOption(option);
	}
 