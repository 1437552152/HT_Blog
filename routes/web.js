/*
 * @Description:
 * @version:
 * @Date: 2019-08-20 00:29:24
 * @LastEditors: yfye
 * @LastEditTime: 2021-06-21 23:36:11
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
const express = require("express");
const app = express();
const router = express.Router();
var httpRequest = require("../util/http");
var list = [{
        title: "测试标题",
        date: "2020-01-15 10:15",
        descc: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测",
        tag: ["标签1", "标签2", "标签3", "标签4"],
        viewNum: 203,
        id: 1,
        zanNum: 10,
        commentNum: 10,
    },
    {
        title: "测试标题",
        date: "2020-01-15 10:15",
        descc: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测",
        tag: ["标签1", "标签2", "标签3", "标签4"],
        viewNum: 203,
        zanNum: 10,
        id: 2,
        commentNum: 10,
    }
];

// 首页
router.get("/", (req, res) => {
    res.render("index", {
        list,
    });
});
router.get("/index.html", (req, res) => {
    res.render("index", {
        list,
    });
});
// 意见反馈
router.get("/feedback.html", (req, res) => {
    res.render("feedback", {
        list,
    });
});

// 服务宗旨
router.get("/purpose.html", (req, res) => {
    res.render("purpose", {
        list,
    });
});

//列表
router.get("/newsList.html", (req, res) => {
    res.render("newsList", {
        data: {},
    });
});


// 详情页
router.get("/detail.html", (req, res) => {
    res.render("detail", {
        data: {},
    });
});
// 我的文章
router.get("/myArticle.html", (req, res) => {
    res.render("myArticle", {
        data: {},
    });
});
// 文章编辑
router.get("/articleEdit.html", (req, res) => {
    res.render("articleEdit", {
        data: {},
    });
});
// 变更记录
router.get("/changeRecord.html", (req, res) => {
    res.render("changeRecord", {
        data: {},
    });
});
// 文章版本
router.get("/articleVersion.html", (req, res) => {
    res.render("articleVersion", {
        data: {},
    });
});
//我的消息
router.get("/myNews.html", (req, res) => {
    res.render("myNews", {
        data: {},
    });
});
// 我的关注
router.get("/myAttention.html", (req, res) => {
    res.render("myAttention", {
        data: {},
    });
});
// 个人资料
router.get("/personalData.html", (req, res) => {
    res.render("personalData", {
        data: {},
    });
});
// 密码修改
router.get("/passwordModification.html", (req, res) => {
    res.render("passwordModification", {
        data: {},
    });
});

// 我的反馈
router.get("/myFeedback.html", (req, res) => {
    res.render("myFeedback", {
        data: {},
    });
});
// 我的贡献点
router.get("/myContribution.html", (req, res) => {
    res.render("myContribution", {
        data: {},
    });
});
// 文章管理
router.get("/articleManagement.html", (req, res) => {
    res.render("articleManagement", {
        data: {},
    });
});
// 差评管理
router.get("/badManagement.html", (req, res) => {
    res.render("badManagement", {
        data: {},
    });
});
//建议管理
router.get("/adviseManagement.html", (req, res) => {
    res.render("adviseManagement", {
        data: {},
    });
});
module.exports = router;