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
      }><a class="menu" href="${menuUrl(id)}" data-id="${id}">${name}${level === 1 && dataList[i].childList.length > 0
        ? "<span class='caret'></span>"
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

/**
 * 初始化左侧焦点菜单列表
 * @param menuId    选中菜单id
 */
function initLeftMenu(menuId) {
  let numMenuId = Number(menuId);
  let list = findSameLevelList(menuList, numMenuId);
  if (!list) return;
  let leftMenuList = list.array;
  let leftMenuContext = appendLeftMenu(leftMenuList, list.index);
  $("#leftMenu").html(leftMenuContext);
  let childList = leftMenuList[list.index].childList;
  return childList.length > 0;
}

/**
 * 查询当前菜单节点的同级节点
 * @param array        所有菜单节点
 * @param id        寻找的节点id
 * @returns {*}    同级节点对象和当前节点下标
 */
function findSameLevelList(array, id) {
  if (!array || array.length === 0) return null;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return {
        array: array,
        index: i
      };
    }
    let result = findSameLevelList(array[i].childList, id);
    if (result !== null) {
      return result;
    }
  }
  return null;
}

/**
 * 拼接左侧菜单栏
 * @param dataList        菜单列表
 * @param index            选中下标
 * @returns {string}    菜单字符串标签
 */
function appendLeftMenu(dataList, index) {
  let leftMenu = "";
  for (let i = 0; i < dataList.length; i++) {
    let id = dataList[i].id;
    let name = dataList[i].name;
    leftMenu += `<li ${i === index ? 'class="active"' : ""} ><a href="${menuUrl(
      id
    )}" class="left-menu-a">${name}</a></li>`;
  }
  return leftMenu;
}

/**
 *  初始化右侧分页数据
 * @param id            左侧菜单栏
 * @param menuFlag        是否是菜单列表
 * @pageNum number       当前页数 如果不传默认为1
 */
function initContentPage(id, menuFlag, pageNum, pageSize) {
  $("#example").show();
  let params = {
    menuId: id,
    pageNum: pageNum || 1,
    pageSize: pageSize || 12,
    totalNum: 0,
  };
  let url;
  if (menuFlag) {
    url = urlPrefix + "/menus/childPage";
  } else {
    url = urlPrefix + "/articlePoints/childPage";
  }
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(params),
    dataType: "json",
    success: function (data) {
      if (data.code !== 0) {
        $("#content").html(data.msg);
        return;
      }

      //TODO 处理分页
      $("#pageLimit").bootstrapPaginator({
        currentPage: data.result.pageNum,
        totalPages: Math.ceil(data.result.totalNum / data.result.pageSize) || null,
        size: "normal",
        bootstrapMajorVersion: 3,
        alignment: "content",
        numberOfPages: data.result.pageSize,
        itemTexts: function (type, page, current) {
          switch (type) {
            case "first":
              return "首页";
            case "prev":
              return "上一页";
            case "next":
              return "下一页";
            case "last":
              return "末页";
            case "page":
              return page;
          }
        },
        onPageClicked: function (e, originalEvent, type, page) {
          window.top.location.href = menuUrl(id, page);
        },
      });

      let dataArr = data.result.data;

      if (!dataArr || dataArr.length === 0) {
        promote();
        return;
      }

      let result = `<ul class="clearfix">`;
      for (let i = 0; i < dataArr.length; i++) {
        var imgUrl = "/assets/images/list_03.jpg";
        result += `
                            <li>
                                <img src="${imgUrl}" alt="">
                                <div class="list-box">
                                    <a href="${menuFlag
            ? menuUrl(dataArr[i].id)
            : "javascript:goArticlePage(" +
            id +
            ", " +
            dataArr[i].id +
            ")"
          }" class="rightContent">${!dataArr[i].name ? dataArr[i].focusPoint : dataArr[i].name
          }</a>
                                    <p>${dataArr[i].overview}</p>
                                </div>
                            </li>
                          `;
      }
      result += `</ul>`;
      $("#content").html(result);
      bindRightMenuEvent();
    },
  });
}

/**
 * 绑定右侧列表事件
 */
function bindRightMenuEvent() {
  $(".content").on("click", "li", function () {
    let dataId = $(this).find("a").data("id");
    let parentId = $(this).find("a").data("parent-id");
    let isPoint = $(this).find("a").data("point");

    if (isPoint) {
      initLeftPoint(parentId, dataId);
      initContentArticle(dataId);
      addBreadcrumb(parentId, $(this).find("a").html());
      return;
    }
    let object = findSameLevelList(menuList, dataId);

    if (!object) return;

    let leftMenuList = object.array;
    let leftMenuContext = appendLeftMenu(leftMenuList, object.index);
    // console.log(leftMenuContext);
    // debugger
    $("#leftMenu").html(leftMenuContext);
    let childList = leftMenuList[object.index].childList;
    initContentPage(dataId, childList.length > 0);
    addBreadcrumb(dataId);
    bindLeftMenuEvent();
  });
  // $('.rightContent').on('click', function () {
  //     let dataId = $(this).data('id')
  //     let parentId = $(this).data('parent-id')
  //     let isPoint = $(this).data('point')
  //     if (isPoint) {
  //         initLeftPoint(parentId, dataId)
  //         initContentArticle(dataId)
  //         addBreadcrumb(parentId, $(this).html());
  //         return;
  //     }
  //     let object = findSameLevelList(menuList, dataId);
  //
  //     if (!object) return;
  //
  //     let leftMenuList = object.array;
  //     let leftMenuContext = appendLeftMenu(leftMenuList, object.index);
  //     $('#leftMenu').html(leftMenuContext)
  //     let childList = leftMenuList[object.index].childList;
  //     initContentPage(dataId, childList.length > 0)
  //     addBreadcrumb(dataId);
  //     bindLeftMenuEvent();
  // })
}

/**
 * 初始化左侧焦点菜单列表
 * @param menuId    父菜单id
 * @param dataId    当前选择id
 */
function initLeftPoint(menuId, dataId) {
  $.ajax({
    url: urlPrefix + "/articlePoints/left/" + menuId,
    dataType: "json",
    success: function (data) {
      if (data.code !== 0) return;
      var dataArr = data.result;
      if (!dataArr || dataArr.length === 0) return;
      var leftMenuContext = appendLeftPoint(dataArr, dataId, menuId);
      $("#leftMenu").html(leftMenuContext);
    },
  });
}

/**
 * 跳转文章页面
 */
function goArticlePage(menuId, dataId) {
  $.ajax({
    url: urlPrefix + "/articles/getMostPopularByArticlePoint/" + dataId,
    dataType: "json",
    success: function (data) {
      if (data.code !== 0) {
        $("#content").html(data.msg);
        return;
      }
      window.top.location.href = articleUrl(
        menuId,
        data.result.id,
        data.result.versionId
      );
    },
  });
}

/**
 * 拼接左侧焦点列表
 * @param dataList        焦点列表
 * @param dataId        选中焦点id
 * @returns {string}    菜单字符串标签
 */
function appendLeftPoint(dataList, dataId, menuId) {
  let leftMenu = "";
  for (let i = 0; i < dataList.length; i++) {
    let id = dataList[i].id;
    let name = dataList[i].focusPoint;
    leftMenu += `<li ${id === dataId ? 'class="active"' : ""
      }><a href="javascript:goArticlePage(${menuId}, ${id})" class="left-menu-a">${name}</a></li>`;
  }
  return leftMenu;
}

/**
 *    添加面包屑
 *
 * @param id            当前菜单id
 * @param pointName        焦点名
 */
function addBreadcrumb(id, pointName, versionId) {
  let parentArray = [];
  let numMenuId = Number(id);
  parentArray = findParentArray(menuList, parentArray, numMenuId);
  if (pointName) {
    let obj = {
      name: pointName
    };
    if (versionId && versionId > 0) {
      obj.name.appendContent("(v" + versionId + ")");
    }
    parentArray.push(obj);
  }
  let breadcrumb = appendBreadcrumb(parentArray);
  $(".breadcrumb").html(breadcrumb);
}

/**
 * 查询当前菜单节点的所有父节点
 * @param array        所有菜单节点
 * @param parentArray  父节点数组
 * @param id        寻找的节点id
 * @returns {*}    所有父节点数组
 */
function findParentArray(array, parentArray, id) {
  if (!array || array.length === 0) return [];

  for (let i = 0; i < array.length; i++) {
    parentArray.push(array[i]);
    if (array[i].id === id) {
      return parentArray;
    }
    let result = findParentArray(array[i].childList, parentArray, id);
    if (result.length !== 0) {
      return result;
    }
    parentArray.pop();
  }
  return [];
}

/**
 * 拼接面包屑
 * @param parentArray    菜单数组
 * @returns {string}    菜单字符串标签
 */
function appendBreadcrumb(parentArray) {
  let result = "<li></li>";
  for (let i = 0; i < parentArray.length; i++) {
    let id = parentArray[i].id;
    let name = parentArray[i].name;

    let isLast = i + 1 === parentArray.length;

    result += `<li ${isLast ? 'class="active"' : ""}>`;
    if (!isLast) {
      result += `<a href="${menuUrl(id)}">${name}</a>`;
    } else {
      result += `${name}`;
    }
    result += `</li>`;
  }
  return result;
}

function menuUrl(menuId, pageNum) {
  if (!pageNum) pageNum = 1;
  return "/l/" + menuId + "/" + pageNum + "/" + listPageSize + "/newsList.html";
}

function articleUrl(menuId, articleId, version) {
  if (!version) version = 0;
  return "/a/" + menuId + "_" + articleId + "_" + version + ".html";
}

function promote() {
  let result = `<p>当前分类暂无数据.</p>`;
  $("#content").html(result);
}
