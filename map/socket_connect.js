WEB_SOCKET_SWF_LOCATION = './js/web_socket/WebSocketMain.swf';
WEB_SOCKET_DEBUG = true;
var browser_ua = navigator.userAgent.toLowerCase();
if (browser_ua.indexOf('360se') != -1) {
	WEB_SOCKET_SWF_LOCATION += '?v=' + new Date().getTime().toString();
}
function webSocketConnectInit(pars) {
	
    this.requestUrl = pars.reqUrl || ['ws://ws.okooo.com:7070/websocket', ['LiveScore']]; //默认连接地址
	this.noTry = true;
	this.socketStore = ''; // web_socket对象存储
	this.sendflag = 0; // 累计Socket的连接数
	this.clearHtmlTime = new Date().getTime(); // 记录当前客户端时间，清除弹出层中内容用，10分钟清理一次
	this.tryinittime = 2000; // 初始重试时间
	this.keeplivetime = 5; // 心跳时间
	this.trytimes = 1; // 重试次数
}

webSocketConnectInit.prototype = {
	// 连接初始化
	init : function() {
		this.socketStore = '';
		this.sendflag = 0;
		var self = this, url = this.requestUrl[0];
		if (!$('#checkJoinSucc').length) {
			$('body').append('<input id="checkJoinSucc" type="hidden" value="0" />');
		}
		console.info(url);
		this.socketStore = new WebSocket(url);
		this.socketStore.onopen = function() {
			self.webSendMessage();
			self.trytimes = 1;
		};
		this.socketStore.onmessage = function(e) {
			if (e.data) {
				var res = eval('(' + e.data + ')');
				if (res.raw && res.raw == 'join_ok') {
					$('#checkJoinSucc').val('1');
					setTimeout(function() {
						$('#checkJoinSucc').val('0');
					}, 6000);
				} else {
					console.info(e.data);
					refreshPageData(e.data,self.requestUrl[1][0]);  //渲染HTML表格
				}
			}
			if (!$.browser.msie) {
				// console.log(e.data);
			}
			$('#serverPushDataList').append(e.data + '<br/>');
			if ((new Date().getTime() - self.clearHtmlTime) / 1000 > 600) {
				$('#serverPushDataList').html('');
				self.clearHtmlTime = new Date().getTime();
			}
		};
		this.socketStore.onclose = function() {
			if (!$.browser.msie) {
				console.log("onclose");
			}
			$('#serverPushDataList').append('onclose<br/>');
			$('#checkJoinSucc').val('0');
			clearTimeout(window.tryCloseTO);
			clearTimeout(window.tryErrorTO);
			if (self.noTry) {
				window.tryCloseTO = setTimeout(function() {
					self.sendflag = 0;
					self.init();
					self.trytimes += 1;
				}, self.tryinittime * Math.pow(self.trytimes, 2));
			}
		};
		this.socketStore.onerror = function() {
			if (!$.browser.msie) {
				console.log("onerror");
			}
			$('#serverPushDataList').append('onerror<br/>');
			$('#checkJoinSucc').val('0');
			clearTimeout(window.tryErrorTO);
			clearTimeout(window.tryCloseTO);
			if (self.noTry) {
				window.tryErrorTO = setTimeout(function() {
					self.sendflag = 0;
					self.init();
					self.trytimes += 1;
				}, self.tryinittime * Math.pow(self.trytimes, 2));
			}
		};
		this.keepWebSocketLive();
		this.windowCloseCheck();
	},
	webSendMessage : function() {
		var isReqData = false;
		for (var i = 0; i < this.requestUrl[1].length; i++) {
			this.socketStore.send('join ' + this.requestUrl[1][i]);
			if (this.requestUrl[1][i].indexOf('LiveScore') != -1) {
				isReqData = true;
			}
			if (!$.browser.msie) {
				console.log("onopen " + i);
			}
		}
		if (isReqData) {
			this.historyDataRefresh();
		}
	},
	closeWebSocket : function() {
		var self = this;
		self.noTry = false;
		$('#serverPushDataList').append('手动关闭WebSocket连接<br/>');
		self.socketStore.close();
	},
	keepWebSocketLive : function() {
		var self = this;
		clearInterval(window.sockeyTryAgain);
		clearTimeout(window.socketJoinSucc);
		clearTimeout(window.resetCheckFlag);
		window.sockeyTryAgain = setInterval(function() {
			if (!$.browser.msie) {
				console.log('Check IsLive');
			}
			if (self.socketStore.readyState == 0
					|| self.socketStore.readyState == 2
					|| self.socketStore.readyState == 3
					|| self.socketStore.bufferedAmount > 0) {
				self.closeWebSocket();
			} else {
				self.socketStore.send('join ' + self.requestUrl[1][0]);
				window.socketJoinSucc = setTimeout(function() {
					self.checkJoinIsSucc();
				}, 3000);
				window.resetCheckFlag = setTimeout(function() {
					$('#checkJoinSucc').val('0');
				}, 6000);
			}
		}, 1000 * 60 * self.keeplivetime);
	},
	checkJoinIsSucc : function() {
		var isSucc = $('#checkJoinSucc').val();
		$('#serverPushDataList').append(
				'心跳验证后Join状态(0, 1): ' + isSucc + '<br/>');
		if (isSucc == '0') {
			this.closeWebSocket();
		}
	},
	historyDataRefresh : function() {
		$
				.get(
						'/ajax/?method=data.livescore.compensate',
						null,
						function(res) {
							if (res && res.livescore_compensate_response.length) {
								for (var i = 0; i < res.livescore_compensate_response.length; i++) {
									refreshPageData(res.livescore_compensate_response[i]
											.toSource(),self.requestUrl[1][0])
								}
							}
						}, 'json');
	},
	windowCloseCheck : function() {
		var self = this;
		if ($.browser.msie) {
			window.onbeforeunload = onbeforeunload_handler;
			function onbeforeunload_handler() {
				self.closeWebSocket();
			}
		}
	}
}

$(function() {
	creatPushListDialog();
});

// 创建服务推送数据列表
function creatPushListDialog() {
	$('<div>')
			.attr('id', 'serverPushDataDialog')
			.css({
				width : '500px',
				height : '300px',
				lineHeight : '20px',
				border : '1px solid #000',
				backgroundColor : '#fff',
				display : 'none'
			})
			.html(
					'<span style="font-size: 14px; font-weight: bold;">服务推送数据列表</span>&nbsp;&nbsp;<span id="clearPushDialog" style="cursor: pointer;">全清</span>&nbsp;&nbsp;<span id="closePushDialog" style="cursor: pointer;">关闭</span><div id="serverPushDataList" style="height: 270px; padding: 0 4px; overflow-y: auto;"></div>')
			.appendTo('body');
	$('#closePushDialog').click(function() {
		$('#serverPushDataDialog').loadDialog('close');
	});
	$('#clearPushDialog').click(function() {
		$('#serverPushDataList').html('');
	});
	$('body').append('<input id="checkJoinSucc" type="hidden" value="0"/>');
}