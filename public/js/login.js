function registerUser() {
    var nickname = $('input[name="nickname"]').val();
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    jrequest
        .post("/api/user/register", {
            nickname: nickname,
            email: email,
            password: password,
        })
        .then((res) => {
            console.log("接口数据");
        });
}