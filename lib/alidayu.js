/**
 * Alidayu sdk for JavaScript 阿里大鱼短信服务JavaScript SDK
 * @author Nickbing Lao <giscafer@outlook.com>
 */
/*global define*/
!(function (name, definition) {
    // Check define
    var hasDefine = typeof define === 'function',
        // Check exports
        hasExports = typeof module !== 'undefined' && module.exports;

    if (hasDefine) {
        // CMD Module or AMD Module
        if(!md5){
            throw new Error('md5 is the dependent Module')
        }
        define(['md5'], definition);
    } else if (hasExports) {
        // Node.js Module
        module.exports = definition(require('blueimp-md5'), require('request'));
    } else {
        // Assign to common namespaces or simply the global object (window)
        this[name] = definition(md5);
    }
})('AliDaYu', function (md5, request) {
    var hasExports = typeof module !== 'undefined' && module.exports;
    md5 = md5 || function () { };
    request = request || function () { };
    if (!hasExports) {
        
    }
    /**
     * get timestamp
     */
    function getTimeStamp() {
        var time = new Date();
        var timestamp = time.getFullYear() + "-" +
            ("0" + (time.getMonth() + 1)).slice(-2) + "-" +
            ("0" + time.getDate()).slice(-2) + ' ' +
            ("0" + time.getHours()).slice(-2) + ":" +
            ("0" + time.getMinutes()).slice(-2) + ":" +
            ("0" + time.getSeconds()).slice(-2);
        return timestamp;
    }
    /**
     * @constructor
     */
    function AliDaYu(opt) {
        opt = opt || {};
        if (!(this instanceof AliDaYu)) {
            return new AliDaYu(opt);
        }
        this._restUrl = 'http://gw.api.taobao.com/router/rest';
        this._opt = {};
        this._opt.v = '2.0';
        this._opt.format = 'json';
        this._opt.sign_method = 'md5';
        for (var key in opt) {
            this._opt[key] = opt[key];
        }
    }
    /**
     * Merges the function metadata of `source` into `object`.
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     */
    AliDaYu.prototype._merge = function (object, source) {
        if (object === source) {
            return;
        }
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                object[p] = source[p];
            }
        }
        return object;
    };
    /**
    * create sign.
    * @param {Object} args The params.
    * @returns {String} Returns sign.
    */
    AliDaYu.prototype._sign = function (args) {
        args = this._merge(this._opt, args);
        args.timestamp = getTimeStamp();
        var arr = Object.keys(args).sort();
        var signStr = arr.map(function (key) {
            if (typeof args[key] === 'object') {
                args[key] = JSON.stringify(args[key]);
            }
            return key + args[key];
        }).join('');
        var str = this._opt.secret + signStr + this._opt.secret;
        if (hasExports) {
            return md5(str).toUpperCase();
            // var Buffer = require('buffer').Buffer;
            // str = new Buffer(str).toString('binary');
            // return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
        } else {
            return md5(str).toUpperCase();
        }

    };
    /**
    * request.
    * @param {Object} args The params.
    * @returns {Function} callback Callback.
    */
    AliDaYu.prototype._request = function (args, callback) {
        this._opt.sign = this._sign(args);
        if (hasExports) {
            request.post({ url: this._restUrl, form: this._opt }, function (err, httpResponse, body) {
                if (err) {
                    return callback && callback.call(err);
                }
                callback && callback.call(err, body);
            });
        } else {
            $.post(this._restUrl, this._opt,function (data) {
                callback && callback(null,data);
            }).error(function(err) { callback && callback(err,null)});
        }

    };
    /**
     * sms send
     * @param {Object} args The params.
     * @returns {Function} callback Callback.
     */
    AliDaYu.prototype.sms = function (args, callback) {
        args = args || {};
        args.method = 'alibaba.aliqin.fc.sms.num.send';
        args.sms_type = 'normal';
        this._request(args, callback);
    };
    // Backwards compatibility
    AliDaYu.AliDaYu = AliDaYu;

    return AliDaYu;
});