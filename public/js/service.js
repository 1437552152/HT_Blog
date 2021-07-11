var jrequest = (function() {
    return {
        _request(url, method, contentType, params) {
            return new Promise((resolve, reject) => {
                $.ajax({
                    contentType: contentType,
                    dataType: "json",
                    data: method == "post" ? JSON.stringify(params) : params,
                    url: `http://39.97.160.96:8787${url}`,
                    withCredentials: true,
                    type: method,
                    success: function(res, textStatus, request) {
                        let data = {
                            data: res,
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
                    "application/json;charset=UTF-8",
                    params
                ).then((res) => {
                    if (res) {
                        resolve(res);
                    }
                });
            });
        },
        PATCH(url, params) {
            return new Promise((resolve, reject) => {
                this._request(
                    url,
                    "PATCH",
                    "application/json;charset=UTF-8",
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