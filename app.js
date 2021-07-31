/*
 * @Description:
 * @Author: yfye
 * @Date: 2021-06-05 16:55:51
 * @LastEditTime: 2021-06-05 17:02:57
 * @LastEditors: yfye
 */
const express = require("express");
const swig = require("swig");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
swig.setDefaults({
    cache: false,
});

app.set("view cache", false);
app.set("views", "./views/pages/");
app.set("view engine", "html");
app.engine("html", swig.renderFile);
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//设置跨域访问
//设置允许跨域访问该服务.
app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    if (req.method.toLowerCase() == "options") res.send(200);
    //让options尝试请求快速结束
    else next();
});
app.use("/", require("./routes/web"));
var server = app.listen(80);