; (function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window) {
	/**
     * 生成ajax不依赖其他组件
     * @param {*} option 
     */
    function Ajax(option) {
        var xhr = null;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return (function (option) {
            var config = Object.assign({
                "type": "post",
                "url": "",
                "data": [],
                "success": undefined,
                "beforeSend": undefined,
                "error": undefined,
                "dataFilter": function (xhr) {
                    return xhr.responseText
                },
                "complete": undefined
            }, option);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        var data = config.dataFilter && config.dataFilter(xhr);
                        config.success && config.success(data, xhr.status);
                    } else {
                        config.error && config.error(xhr, xhr.status);
                    }
                    config.complete && config.complete(xhr.xhr.status);
                } else if (xhr.readyState == 1) {
                    config.beforeSend && config.beforeSend(xhr.xhr.status);
                }
            }
            return {
                do: function (callback) {
                    xhr.open(config.type, config.url, true);
                    if (config.type == 'post') {
                        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    }
                    callback && (config.success = callback);
                    try {
                        xhr.send(config.type == 'post' ? config.data : null);
                    } catch (err) {

                    }
                }
            }
        })(option);
    }
       window.ejun.Ajax = Ajax;
});