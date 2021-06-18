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
var httpRequest = require('../util/http');
var list= [{
  title: '测试标题',
  date: '2020-01-15 10:15',
  descc: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测",
  tag: ['标签1', '标签2', '标签3', '标签4'],
  viewNum: 203,
  id: 1,
  zanNum: 10,
  commentNum: 10
},
{
  title: '测试标题',
  date: '2020-01-15 10:15',
  descc: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测",
  tag: ['标签1', '标签2', '标签3', '标签4'],
  viewNum: 203,
  zanNum: 10,
  id: 2,
  commentNum: 10
},
{
  title: '测试标题',
  date: '2020-01-15 10:15',
  descc: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测",
  tag: ['标签1', '标签2', '标签3', '标签4'],
  viewNum: 203,
  zanNum: 10,
  id: 3,
  commentNum: 10
}
]



// 首页
router.get('/', (req, res) => {
  res.render('index', {
    list
  })
});
router.get('/index.html', (req, res) => {
  res.render('index', {
    list
  })
});
// 意见反馈
router.get('/feedback.html', (req, res) => {
  res.render('feedback', {
    list
  })
});

// 服务宗旨
router.get('/purpose.html', (req, res) => {
  res.render('purpose', {
    list
  })
});

// 详情页
router.get('/detail.html', (req, res) => {
  res.render('detail', {
    data: {}
  })
});


router.get('/1/:menu', (req, res) => {
  res.render('two', {
    data: {}
  })
});

router.get('/a/:menu', (req, res) => {
  res.render('three', {
    data: {}
  })
});


module.exports = router;