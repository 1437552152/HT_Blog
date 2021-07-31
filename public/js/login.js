/*
 * @Description:
 * @Author: yfye
 * @Date: 2021-06-27 13:15:19
 * @LastEditTime: 2021-07-29 00:08:32
 * @LastEditors: sueRimn
 */
function checkEmail(email) {
    var isemail = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
    );
    if (email == "") {
        $("body").toast({
            position: "fixed",
            content: "请输入您的邮箱",
            duration: 3000,
        });
        return false;
    } else if (email.length > 25) {
        $("body").toast({
            position: "fixed",
            content: "您的邮箱长度太长",
            duration: 3000,
        });
        return false;
    } else if (!isemail.test(email)) {
        $("body").toast({
            position: "fixed",
            content: "您的邮箱格式不正确",
            duration: 3000,
        });
        return false;
    } else {
        return true;
    }
}

function registerUser() {
    var nickName = $('input[name="nickname"]').val();
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    if (!checkEmail(email)) {
        return false;
    }
    var that = this;
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(authCode);
    var encrypted = encrypt.encrypt(password);
    jrequest
        .post("/api/user/register", {
            nickName,
            email,
            password: encrypted,
        })
        .then((res) => {
            if (res.data.code == 0) {
                jrequest
                    .post("/api/user/login", {
                        username: email,
                        password: encrypted,
                    })
                    .then((respon) => {
                        if (respon.data.code == 0) {
                            localStorage.setItem(
                                "userInfo",
                                JSON.stringify(respon.data.body)
                            );
                            location.reload();
                        } else {
                            $("body").toast({
                                position: "fixed",
                                content: respon.data.msg,
                                duration: 3000,
                            });
                        }
                    });
            } else {
                $("body").toast({
                    position: "fixed",
                    content: res.data.msg,
                    duration: 3000,
                });
            }
        });
}

function loginUser() {
    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();

    if (!username) {
        $("body").toast({
            position: "fixed",
            content: "请输入账号",
            duration: 3000,
        });
        return;
    }
    if (!password) {
        $("body").toast({
            position: "fixed",
            content: "请输入密码",
            duration: 3000,
        });
        return;
    }

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(authCode);
    var encrypted = encrypt.encrypt(password);
    var that = this;
    jrequest
        .post("/api/user/login", {
            username,
            password: encrypted,
        })
        .then((res) => {
            if (res.data.code == 0) {
                $("body").toast({
                    position: "fixed",
                    content: "登录成功",
                    duration: 3000,
                });
                localStorage.setItem("userInfo", JSON.stringify(res.data.body));
                location.reload();
            } else {
                $("body").toast({
                    position: "fixed",
                    content: res.data.msg,
                    duration: 3000,
                    /* 			isCenter:false,
                                                                                                                                                                                                                            			background:'#4EA44E' */
                });
            }
        });
}