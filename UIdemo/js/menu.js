/**
 * Created by rsq0113 on 2018/4/20.
 */
var myConstant = new MyConstant({
    FLV: "#left-menu",
    SLV: "#left-child-menu",
    WLC: "#welcome-panel",
    WLT: "#tabs"
});
function MyConstant(obj) {
    for (var key in obj) {
        this[key] = obj[key];
        a.call(this, this, key);
    }
    function a(obj, key) {
        //对象已有的属性添加特性描述
        Object.defineProperty(this, key, {
            configurable: false,
            enumerable: true,
            writable: false
        });
    }
}
/**/
function MenuNode(data, wholeMenu) {
    this.wholeMenu = wholeMenu;
    /*创建一个li作为一个菜单项*/
    this.target = $('<li></li>');
    /*创建一个a标签作为handler*/
    this.handler = $('<a href="#"></a>');
    /*创建bootstrap文字图标*/
    this.icon = $('<span class="icon b-' + data.icon + '"></span>');
    /*定义一个文字容器*/
    this.text = $('<span>' + (data.menusname || data.menuname) + '</span>');
    /*拼装菜单start*/
    this.target.append(this.handler);
    this.handler.append(this.icon);
    this.handler.append(this.text);
    /*拼装菜单end*/
    this.childMenu = null;
    this.data = data;
    var that = this;
    /*定义点击事件*/
    this.handler.click(function (ev) {
        var ev = window.event || ev;
        ev.stopPropagation();
        $(this).parent().addClass("active").siblings().removeClass("active");
        if (that.childMenu) {
            that.childMenu.target.show().siblings().hide();
            that.wholeMenu.smallMain();
            that.wholeMenu.showParent();
            that.wholeMenu.showChild();
        } else {
            that.configuration.events.select.call(that);
        }
    });
}
function MenuContarner() {
    this.target = $("<ul></ul>");
    this.nodes = [];
}
/**/
function WholeMenu(data) {
    /*创建一个菜单容器*/
    var menuContarner = new MenuContarner();
    /*遍历菜单数据，创建菜单项组*/
    $.each(data, function (i, n) {
        /*新建一个菜单节点*/
        var menuNode = new MenuNode(n, this);
        menuContarner.target.append(menuNode.target);
        menuContarner.nodes.push(menuNode);
        if (n.menu && n.menu.length >= 0) {
            menuNode.childMenu = new ChildMenu(n.menu, this);
        }
    }.bind(this));
    this.parentContainer = $(myConstant.FLV);
    this.childContainer = $(myConstant.SLV);
    this.welcomePanel = $(myConstant.WLC);
    this.tabs = $(myConstant.WLT);
    console.log("构造parent");
    this.target = menuContarner.target;
    this.data = data;
    this.menuContarner = menuContarner;
    $(myConstant.FLV).append(this.target);
    this.effect.init.bind(this);
    this.parentContainer.hover(this.onHover.bind(this.parentContainer), this.onHoverOut.bind(this.parentContainer));
    this.childContainer.hover(this.onHover.bind(this.childContainer), this.onHoverOut.bind(this.childContainer));
    this.parentContainer.find(".menu-handler").on("click", function () {
        this.parentContainer.find(".menu-handler").css("display", "none");
        this.smallMain();
        this.showParent();
        this.showChild();

    }.bind(this));
    this.childContainer.find(".menu-handler").on("click", function () {
        this.childContainer.find(".menu-handler").css("display", "none");
        this.hideChild();
        this.hideParent();
        this.bigMain();


    }.bind(this));
}
WholeMenu.prototype.selectFirst = function (name) {
    for (var i = 0; i < this.menuContarner.nodes.length; i++) {
        var n = this.menuContarner.nodes[i];
        if (name === n.text.text()) {
            n.handler.click();
            return;
        }
    }
}
WholeMenu.prototype.effect = {
    disable : true,
    init : function(menu){
        if(!menu.effect.disable){
            menu.welcomePanel.css({transition: "width 1s"});
            menu.tabs.css({ transition: "width 1s"});
            menu.childContainer.css({transition: "width 1s"});
            menu.childContainer.find("li").css({transition: "opacity 1s"});
            menu.parentContainer.css({transition: "width 1s"});
            menu.parentContainer.find("li > a :last-child").css({transition: "font-size 1s"});
        }
    },
    bigMain : function () {
        this.welcomePanel.css({width: "95%"});
        this.tabs.css({width: "95%"});
    },
    smallMain : function () {
        this.welcomePanel.css({width: "76.8%"});
        this.tabs.css({width: "76.8%"});
    },
    hideChild : function () {
        this.childContainer.css({ width: '0', border: "none"});
        this.childContainer.find("li").css({opacity: 0});
    },
    showChild : function () {
        this.childContainer.css({width: "15.9%", border: "1px solid transparent"});
        this.childContainer.find("li").css({opacity: 1});
    },
    hideParent : function () {
        this.parentContainer.css({ width: "5%"});
        this.parentContainer.find("li > a :last-child").css({"font-size": "0"});
    },
    showParent : function () {
        this.parentContainer.css({ width: "7.3%"});
        this.parentContainer.find("li > a :last-child").css({"font-size": "12px"});
    }
}
WholeMenu.prototype.bigMain = function () {
        this.effect.bigMain.call(this);
    var tm = setTimeout(function () {
        chartsMap.myChart_5.resize();
        clearTimeout(tm);
    }, 1000);
}
WholeMenu.prototype.smallMain = function () {
        this.effect.smallMain.call(this);
    var tm = setTimeout(function () {
        chartsMap.myChart_5.resize();
        clearTimeout(tm);
    }, 1000);
}
WholeMenu.prototype.hideChild = function () {
        this.effect.hideChild.call(this);
}
WholeMenu.prototype.showChild = function () {
        this.effect.showChild.call(this);
}
WholeMenu.prototype.hideParent = function () {
        this.effect.hideParent.call(this);
}
WholeMenu.prototype.showParent = function () {
        this.effect.showParent.call(this);
}
WholeMenu.prototype.onHover = function () {
    console.log(this.next().css("width"))
    if (this.attr("id") === "left-menu" && this.next().css("width") !== "0px") {
        return;
    }
    this.timerShow = setTimeout(function () {
        this.find(".menu-handler").css({"display": "block", left: this.offset().left + this.width() + "px"});
        clearTimeout(this.timerShow);
        console.log("onHover移除timerS：" + this.timerShow);
    }.bind(this), 500);
    console.log("生成timerS：" + this.timerShow);
}
WholeMenu.prototype.onHoverOut = function () {
    clearTimeout(this.timerShow);
    console.log("onHoverOut移除timerS：" + this.timerShow);
    this.find(".menu-handler").css({"display": "none"});
}


/**/
function ChildMenu(data) {
    console.log("构造Child");
    /*创建一个ul作为菜单容器*/
    var menuContarner = new MenuContarner();
    /*遍历菜单数据创建菜单项组*/
    $.each(data, function (i, n) {
        /*新建一个菜单节点*/
        var menuNode = new MenuNode(n, "child");
        menuContarner.target.append(menuNode.target);
        menuContarner.nodes.push(menuNode);
    });
    this.name = "child";
    this.target = menuContarner.target;
    this.data = data;
    this.menuContarner = menuContarner;
    $(myConstant.SLV).append(this.target);
}


MenuNode.prototype.configuration = {
    events: {
        select: function () {
            $("#tabs").show();
            $("#welcome-panel").hide();
           var tabHeight = $("#tabs").height();
           var tabHeadheigth = $("#tabs > .nav-tabs").height();
            $("#tabs > .tab-content").height(tabHeight - tabHeadheigth);
            addTab(this.data);
        }
    }
}

