var jrequest = (function() {
    return {
        _request(url, method, contentType, params) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    headers: {
                        authorization: "",
                    },
                    contentType: contentType,
                    dataType: "json",
                    data: params,
                    url: `http://39.97.160.96:8787${url}`,
                    type: method,
                    success: function(res, textStatus, request) {
                        // console.log(request.getResponseHeader("X-Total-Count"))
                        let data = {
                            // 对请求回来的数据进行操作，修改数据格式
                            data: res,
                            total: request.getResponseHeader("X-Total-Count"),
                        };
                        resolve(data);
                    },
                });
            });
        },
        get(url, params) {
            return new Promise((resolve, reject) => {
                this._request(url, "get", "application/json", params).then((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
            });
        },
        post(url, params) {
            return new Promise((resolve, reject) => {
                this._request(
                    url,
                    "post",
                    "application/x-www-form-urlencoded",
                    params
                ).then((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
            });
        },
        put(url, params) {
            return new Promise((resolve, reject) => {
                this._request(
                    url,
                    "put",
                    "application/x-www-form-urlencoded",
                    params
                ).then((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
            });
        },
        delete(url, params) {
            return new Promise((resolve, reject) => {
                this._request(url, "delete", "application/json", params).then((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
            });
        },
    };
})();