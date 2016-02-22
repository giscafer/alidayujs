# alidayujs

[![npm](https://nodei.co/npm/alidayujs.png?downloadRank=true)](https://www.npmjs.com/package/alidayujs)

JavaScript Alidayu SDK 兼容服务器端环境node.js，模块加载器如RequireJS和所有浏览器
 
 
## Demo
 
 [alidayujs-demo](https://github.com/giscafer/alidayujs-demo)
 
## Usage
 
### Client-side
 
 Web浏览器JavaScript直接调用alidayujs SDK需要两个的依赖文件：jQuery.js和md5.js，其中md5.js网上版本很多，这里使用[JavaScript-MD5](https://github.com/blueimp/JavaScript-MD5)
 
 **1、HTML脚本标签引入文件如**
 
    <script src="http://cdn.bootcss.com/jquery/2.2.0/jquery.js"></script>
    <script src="http://cdn.bootcss.com/blueimp-md5/2.1.0/js/md5.js"></script>
    <script src="lib/alidayu.js"></script>
    
**2、示例脚本代码**

```javascript
    //应用密匙 见：http://www.alidayu.com/help?spm=a3142.7802526.1.24.iEB4Yc&_t=1#create
    var config = {
        app_key: '23300111',
        secret: '3403636b338e1003999dd946111111' 
    };
    //创建实例
    var dayu = new AliDaYu(config);
    //参数 见：http://open.taobao.com/doc2/apiDetail.htm?apiId=25450
    var params = {
        sms_free_sign_name: '身份验证',
        sms_param: {
            code: '52031',
            product: 'alidayujs ajax post test',
        },
        rec_num: '15110111111',
        sms_template_code: 'SMS_4725038',
    };
    //短信发送
    dayu.sms(params,function(err,result){
        if(err){
            return console.log(err);
        }
        console.log(result);
    });

```
 
### Server-side

    以下介绍如何在 Node.js环境下使用alidayujs
    
**1、安装**
    
        npm install alidayujs --save
        
 
 说明：内部需要两个模块`require`,`blueimp-md5`
    
**2、使用方法**
 
```javascript

    var Alidayu=require('./lib/alidayu');
    //应用密匙 见：http://www.alidayu.com/help?spm=a3142.7802526.1.24.iEB4Yc&_t=1#create
    var config = {
        app_key: '23300111',
        secret: '3403636b338e1003999dd946111111' 
    };
    var alidayu = new Alidayu(config);
    //参数 见：http://open.taobao.com/doc2/apiDetail.htm?apiId=25450
    var options = {
        sms_free_sign_name: '身份验证',
        sms_param: {
        code: '1234',
        product: 'alidayujs测试',
        },
        rec_num: '15110111111', 
        sms_template_code: 'SMS_4725038',
    };
    //发送短信
    alidayu.sms(options,function(err,result){
        if(err){
            console.log('ERROR'+err);
        }
        console.log(result);
    });


```
 
 
## License
 
MIT ©[giscafer](https://github.com/giscafer)