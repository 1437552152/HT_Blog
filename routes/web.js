/*
 * @Description: 
 * @version: 
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-06-05 17:46:28
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const app = express();
const router = express.Router();
var httpRequest =require('../util/http')
// 字段说明
//  isShow：0 表示展示      1 表示物理删除即隐藏

/****小程序的登录与注册***/
router.get('/',(req,res)=>{
  res.render('index', {
    data: {}
  })
});

router.get('/index.html',(req,res)=>{
  res.render('index', {
    data: {}
  })
});



router.get('/1/:menu',(req,res)=>{
  res.render('two', {
    data: {}
  })
});

router.get('/a/:menu',(req,res)=>{
  res.render('three', {
    data: {}
  })
});


module.exports = router;