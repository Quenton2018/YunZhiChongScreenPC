var apiHost = 'http://192.168.1.156:8081';



var API_URL = {};
API_URL.chargAddress = apiHost + "/api/map/map/chargAddress";  //获取全国Map中充电桩数据



/**
 * 发送跨域请求
 * @param {Object} url 接口地址
 * @param {Object} data 参数连接的方式
 * @param {Object} callback 回调函数
 */
var AjaxJSON = {
    get: function(url, data ,fn) {
        $.ajax({
            url:url,
            type:'GET',
            dataType:'jsonp',
            data:data,
            success:function(response){
                console.log(response);
                fn(response);
            },
            error:function(err){
                console.log(err)
                //失败后执行的代码
            }
        });
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        $.ajax({
            url:url,
            type:'POST',
            dataType:'json',
            data:data,
            success:function(response){
                // fn.call(this, response);
            },
            error:function(err){
                //失败后执行的代码
            }
        });
    }
}