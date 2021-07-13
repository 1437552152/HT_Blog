var authCode;
$(function() {
    $(".theme-login").click(function() {
        $(".theme-popover-mask").fadeIn(100);
        $(".theme-popover").slideDown(200);
    });
    $(".theme-poptit .close").click(function() {
        $(".theme-popover-mask").fadeOut(100);
        $(".theme-popover").slideUp(200);
    });

    // $(".backTop").on("click", function() {
    //     $("html,body").animate({
    //             scrollTop: 0,
    //         },
    //         "slow"
    //     );
    // });

    // function back_Top() {
    //     if ($(document).scrollTop() <= 100) {
    //         $(".backTop").fadeOut();
    //     } else {
    //         $(".backTop").fadeIn();
    //     }
    // }
    // $(window).scroll(function() {
    //     back_Top();
    // });
    // back_Top();
});
$(window).load(
    initTopMenu(function() {
        /* 获得验证code */
        jrequest.get("/api/user/loadAuthInfo").then((res) => {
            if (res.data.code == 0) {
                authCode = res.data.body.publicKey;
            }
        });
    })
);

var userInfo = localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo")) :
    "";
if (userInfo) {
    $(".site1").css({
        display: "block",
    });
    $(".site2").css({
        display: "none",
    });
    $(".userName").text(userInfo.nickName);
} else {
    $(".site1").css({
        display: "none",
    });
    $(".site2").css({
        display: "block",
    });
}

function goLogin() {
    $(".ipt").val("");
    $(".theme-popover1").css("display", "block");
    $(".theme-popover-mask").css("display", "block");
}

function goRegister() {
    $(".ipt").val("");
    $(".theme-popover2").css("display", "block");
    $(".theme-popover-mask").css("display", "block");
}

function closeDoor() {
    $(".theme-popover1").css("display", "none");
    $(".theme-popover2").css("display", "none");
    $(".theme-popover3").css("display", "none");
    $(".theme-popover-mask").css("display", "none");
    $(".ipt").val("");
}

function forgetPassword() {
    $(".ipt").val("");
    $(".theme-popover3").css("display", "block");
    $(".theme-popover-mask").css("display", "block");
}

function getCode() {
    var fpEmail = $('input[name="fpEmail"]').val();
    if (fpEmail) {
        var that = this;
        jrequest.post(`/api/user/sendResetPasswordEmail/${fpEmail}`).then((res) => {
            if (res.data.code == 0) {
                $("body").toast({
                    position: "fixed",
                    content: "验证码已发送至邮箱",
                    duration: 3000,
                });
                var count = 60;
                var countdown = setInterval(CountDown, 1000);

                function CountDown() {
                    $("#btn").attr("disabled", true);
                    $("#btn").val("倒计时" + count + "秒!");
                    if (count == 0) {
                        $("#btn").val("获取验证码").removeAttr("disabled");
                        clearInterval(countdown);
                    }
                    count--;
                }
            }
        });
    }
}

function findPassword() {
    var fpEmail = $('input[name="fpEmail"]').val();
    var fpCode = $('input[name="fpCode"]').val();
    var fpPassword = $('input[name="fpPassword"]').val();
    var fpRepeactPassword = $('input[name="fpRepeactPassword"]').val();
    if (fpPassword != fpRepeactPassword) {
        $("body").toast({
            position: "fixed",
            content: "您两次输入的密码不一致",
            duration: 3000,
        });
        return;
    }
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(authCode);
    var encrypted = encrypt.encrypt(fpPassword);
    jrequest
        .post(`/api/user/resetPassword`, {
            code: fpCode,
            password: encrypted,
            email: fpEmail,
        })
        .then((res) => {
            if (res.data.code == 0) {
                $("body").toast({
                    position: "fixed",
                    content: "成功找回密码",
                    duration: 3000,
                });
                jrequest
                    .post("/api/user/login", {
                        username: fpEmail,
                        password: encrypted,
                    })
                    .then((respon) => {
                        if (respon.data.code == 0) {
                            $("body").toast({
                                position: "fixed",
                                content: "登陆成功",
                                duration: 3000,
                            });
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
            }
        });
}
