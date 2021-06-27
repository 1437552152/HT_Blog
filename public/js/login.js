/*
 * @Description:
 * @Author: yfye
 * @Date: 2021-06-27 13:15:19
 * @LastEditTime: 2021-06-27 22:43:38
 * @LastEditors: yfye
 */
function registerUser() {
  var nickName = $('input[name="nickname"]').val();
  var email = $('input[name="email"]').val();
  var password = $('input[name="password"]').val();
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
            password: encrypted
          })
          .then((respon) => {
            if (respon.data.code == 0) {
              localStorage.setItem("userInfo", JSON.stringify(respon.data.body));
              location.reload();
            } else {
              that.$message({
                message: respon.data.msg,
                type: 'warning'
              });
            }
          })
      } else {
        that.$message({
          message: res.data.msg,
          type: 'warning'
        });
      }
    });
}

function loginUser() {
  var username = $('input[name="username"]').val();
  var password = $('input[name="password"]').val();

  if (!username || !password) {
    $('body').toast({
      position: 'fixed',
      content: '请输入账号或密码',
      duration: 3000
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
      password: encrypted
    })
    .then((res) => {
      if (res.data.code == 0) {
        $('body').toast({
          position: 'fixed',
          content: '登陆成功',
          duration: 3000
        });
        localStorage.setItem("userInfo", JSON.stringify(res.data.body));
        location.reload();
      } else {
        $('body').toast({
          position: 'fixed',
          content: res.data.msg,
          duration: 3000,
          /* 			isCenter:false,
          			background:'#4EA44E' */
        });
      }
    });
}
