$(function () {
    $(".theme-login").click(function () {
        $(".theme-popover-mask").fadeIn(100);
        $(".theme-popover").slideDown(200);
    });
    $(".theme-poptit .close").click(function () {
        $(".theme-popover-mask").fadeOut(100);
        $(".theme-popover").slideUp(200);
    });

    $(".backTop").on("click", function () {
        $("html,body").animate({ scrollTop: 0 }, "slow");
    });

    function back_Top() {
        if ($(document).scrollTop() <= 100) {
            $(".backTop").fadeOut();
        } else {
            $(".backTop").fadeIn();
        }
    }
    $(window).scroll(function () {
        back_Top();
    });
    back_Top();
});
$(window).load(
    initTopMenu(function () {
        // /a/menuId_articleId_versionId.html var pathname = window.location.pathname; var articleIndex = pathname.lastIndexOf("\/"); var articleInfo = pathname.substring(articleIndex + 1, pathname.length - 5); var articleInfoArray
        var pathname = window.location.pathname;
        var articleIndex = pathname.lastIndexOf("/");
        var articleInfo = pathname.substring(articleIndex + 1, pathname.length - 5);
        var articleInfoArray = articleInfo.split("_");
        var menuId = articleInfoArray[0];
        var articleId = articleInfoArray[1];
        var versionId = articleInfoArray[2]; //加载左侧导航栏 initLeftPoint(menuId, articleId); //加载文章 $.ajax({ url: urlPrefix + '/articles/' + articleId + "/" + versionId,
        return;
        //加载左侧导航栏
        initLeftPoint(menuId, articleId);
        //加载文章
        $.ajax({
            url: urlPrefix + "/articles/" + articleId + "/" + versionId,
            dataType: "json",
            success: function (data) {
                if (data.code !== 0) {
                    $("#content").html(data.msg);
                    return;
                }
                let result = data.result;
                /**
                 * 使用showdown.js 将接受到的md内容 转换为html 输出到htmlcontent
                 * */
                let htmlContent = result.content;
                // let htmlContent = marked(content);
                let templateStr = `<div class="contentHeader"><h1>${result.name}</h1></div><div class="contentArticle">${htmlContent}</div>`;
                $("#content").html(templateStr);
                addBreadcrumb(menuId, result.name, versionId);
            },
        });
    })
);


var userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : '';
if (userInfo) {
    $(".site1").css({ "display": 'block' });
    $(".site2").css({ "display": 'none' });
} else {
    $(".site1").css({ "display": 'none' });
    $(".site2").css({ "display": 'block' });
}

function goLogin() {
    $(".theme-popover1").css("display", 'block');
    $(".theme-popover-mask").css("display", 'block');
}

function goRegister() {
    $(".theme-popover2").css("display", 'block');
    $(".theme-popover-mask").css("display", 'block');
}


function closeDoor() {
    $(".theme-popover1").css("display", 'none');
    $(".theme-popover2").css("display", 'none');
    $(".theme-popover3").css("display", 'none');
    $(".theme-popover-mask").css("display", 'none');
}
function forgetPassword() {
    $(".theme-popover3").css("display", 'block');
    $(".theme-popover-mask").css("display", 'block');
}
function getCode() {
    var count = 60;
    var countdown = setInterval(CountDown,1000);
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