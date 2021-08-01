/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2021-06-20 23:20:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-08-01 10:43:33
 */
//服务器地址

const urlPrefix = "http://39.97.160.96:8787";
const languageId = 1;
const listPageSize = 12;
var menuList;

function initTopMenu(doAfterSuccess) {
  //加载导航栏
  $.ajax({
    async: true,
    url: urlPrefix + "/api/articleOutline/tree/" + languageId,
    dataType: "json",
    success: function (data) {
      if (data.code !== 0) return;
      menuList = data.body;
      var navigationStr = appendTopMenu(data.body, 1);
      $("#topNav").html(navigationStr);
      bindTopMenuEvent();
      if (doAfterSuccess) {
        doAfterSuccess(data.result);
      }
    },
  });
}

/**
 *  绑定顶部导航事件
 */
function bindTopMenuEvent() {
  // 当鼠标悬停显示元素
  $("#topNav").on("mouseenter", "ul.top-nav > li", function () {
    $(this).children("div").show();
  });
  // 当鼠标移出隐藏元素
  $("#topNav").on("mouseleave", "ul.top-nav > li", function () {
    $(this).children("div").hide();
  });
}

/**
 * 拼接导航栏
 * @param dataList    导航参数
 * @param level        导航级别
 * @returns {string}    导航字符串标签
 */
function appendTopMenu(dataList, level) {
  if (!dataList || dataList.length <= 0) {
    return "";
  }
  let navigationStr = "";
  if (level === 1) {
    navigationStr += `<ul class="top-nav clearfix">`;
  } else if (level === 2) {
    navigationStr += `<div class="nav-box clearfix"><ul class="nav-aside clearfix">`;
  } else {
    navigationStr += `<ul class="nav-right clearfix" id="nav-right">`;
  }
  for (let i = 0; i < dataList.length; i++) {
    let id = dataList[i].id;
    let name = dataList[i].name;
    let isEmpty = false;

    if (level === 2 && dataList[i].childList.length === 0) {
      isEmpty = true;
    }
    navigationStr += `<li ${isEmpty ? "class= 'empty'" : ""
      }><a class="menu" href="${menuUrl(id,dataList[i].childList&&dataList[i].childList.length?1:0)}" data-id="${id}">${name}${level === 1 && dataList[i].childList.length > 0
        ?''
        : ""
      }</a>`;
    navigationStr += appendTopMenu(dataList[i].childList, level + 1);
  }
  if (level === 1) {
    navigationStr += `</li></ul>`;
  } else if (level === 2) {
    navigationStr += `</li></ul></div>`;
  } else {
    navigationStr += `</li></ul>`;
  }
  return navigationStr;
}

function menuUrl(menuId,type) {
  return "/newsList.html?menuId=" + menuId+"&type="+type
}

function articleUrl(menuId, articleId, version) {
  if (!version) version = 0;
  return "/a/" + menuId + "_" + articleId + "_" + version + ".html";
}

function promote() {
  let result = `<p>当前分类暂无数据.</p>`;
  $("#content").html(result);
}
