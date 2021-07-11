function getlocal(key) {
    var obj = localStorage.getItem(key) ?
        JSON.parse(localStorage.getItem(key)) :
        {};
    return obj;
}

//判断个人中心文章审核是否显示
if (!getlocal("userInfo").adminFlag) {
    setTimeout(() => {
        $(".isManager").css("display", "none");
    }, 200);
} else {
    setTimeout(() => {
        $(".isManager").css("display", "block");
    }, 200);
}