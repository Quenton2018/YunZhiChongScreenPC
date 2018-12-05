var apiHost = 'http://192.168.1.106:8081';



var API_URL = {};

API_URL.getChargingAmount = apiHost + "/api/chart/getChargingAmount"; //获取全国充电桩数量

API_URL.address = apiHost + "/largeScreen/parner/address"; //获取代理商地区分布

API_URL.chargAddress = apiHost + "/api/map/map/chargAddress";  //获取全国Map中充电桩数据

API_URL.chringAddressUseRank = apiHost + "/largeScreen/charingAddress/chringUseRank"; //充电桩按照地区使用率统计

API_URL.chringUseRank = apiHost + "/largeScreen/charging/chringUseRank"; //充电桩按照区域使用率统计

API_URL.chargingWay = apiHost + "/largeScreen/chargingWay"; //充电方式统计





/**
 * 发送跨域请求
 * @param {Object} url 接口地址
 * @param {Object} data 参数连接的方式
 * @param {Object} callback 回调函数
 */
var AjaxJSON = {
    get: function(url, data ,callback) {
        $.ajax({
            url:url,
            type:'GET',
            dataType:'json',
            data:data,
            success:function(res){
                if(res.data){
                    callback.call(this, res);
                }else{
                    toast(res.msg);
                }              
            },
            error:function(err){      
                //失败后执行的代码
                console.log(err)
            }
        });
    },
    post: function (url, data, callback) {
        $.ajax({
            url:url,
            type:'POST',
            dataType:'json',
            data:data,
            success:function(res){
                callback.call(this, res);
            },
            error:function(err){
                //失败后执行的代码
                console.log(err)
            }
        });
    }
}

function toast(msg){
    setTimeout(function(){
        document.getElementsByClassName('toast-wrap')[0].getElementsByClassName('toast-msg')[0].innerHTML=msg;
        var toastTag = document.getElementsByClassName('toast-wrap')[0];
        toastTag.className = toastTag.className.replace('toastAnimate','');
        setTimeout(function(){
            toastTag.className = toastTag.className + ' toastAnimate';
        }, 100);
    },500);
}
