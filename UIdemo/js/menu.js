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
            clearTimeout(that.wholeMenu.parentContainer.timerShow);
            that.wholeMenu.target.siblings(".menu-handler").hide();
            that.childMenu.target.slideDown().siblings().slideUp();
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
    /*将总菜单的dom放入一级菜单中*/
    $(myConstant.FLV).append(this.target);
    /*为效果的启动方法绑定this指向*/
    this.effect.init.bind(this);
    /*为一级菜单绑定鼠标悬停事件*/
    this.parentContainer.hover(this.onHover.bind(this.parentContainer), this.onHoverOut.bind(this.parentContainer));
    /*为二级菜单绑定鼠标悬停事件*/
    this.childContainer.hover(this.onHover.bind(this.childContainer), this.onHoverOut.bind(this.childContainer));
    /*为一级菜单的菜单控制绑定点击事件，同时事件方法的this指向当前对象*/
    this.parentContainer.find(".menu-handler").on("click", function () {
        this.parentContainer.find(".menu-handler").css("display", "none");
        this.smallMain();
        this.showParent();
        this.showChild();

    }.bind(this));
    /*为二级菜单的菜单控制绑定点击事件，同时事件方法的this指向当前对象*/
    this.childContainer.find(".menu-handler").on("click", function () {
        this.childContainer.find(".menu-handler").css("display", "none");
        this.hideChild();
        this.hideParent();
        this.bigMain();
    }.bind(this));
}
/*为总菜单类原型定义一个选中方法，参数为string类型时传入菜单名称，为number类型时传入菜单索引*/
WholeMenu.prototype.select = function (name) {
    if (typeof name === "string"){
        for (var i = 0; i < this.menuContarner.nodes.length; i++) {
            var n = this.menuContarner.nodes[i];
            if (name === n.text.text()) {
                n.handler.click();
                return;
            }
        }
    }else if (typeof name === "number"){
        this.menuContarner.nodes[name].handler.click();
    }

}
/*总菜单的效果，disable控制是否启用效果，设置为false后，需要手动调用init方法来启动效果，传入一个总菜单实例*/
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
    /*主页面模块放大*/
    bigMain : function () {
        this.welcomePanel.css({width: "95%"});
        this.tabs.css({width: "95%"});
    },
    /*主页面模块缩小*/
    smallMain : function () {
        this.welcomePanel.css({width: "76.8%"});
        this.tabs.css({width: "76.8%"});
    },
    /*二级菜单隐藏*/
    hideChild : function () {
        this.childContainer.css({ width: '0', border: "none"});
        this.childContainer.find("li").css({opacity: 0});
    },
    /*二级菜单显示*/
    showChild : function () {
        this.childContainer.css({width: "15.9%", border: "1px solid transparent"});
        this.childContainer.find("li").css({opacity: 1});
    },
    /*一级菜单隐藏*/
    hideParent : function () {
        this.parentContainer.css({ width: "5%"});
        this.parentContainer.find("li > a :last-child").css({"font-size": "0"});
    },
    /*一级菜单显示*/
    showParent : function () {
        this.parentContainer.css({ width: "7.3%"});
        this.parentContainer.find("li > a :last-child").css({"font-size": "12px"});
    }
}
/*定义总菜单调用效果的方法start*/
WholeMenu.prototype.bigMain = function () {
    this.effect.bigMain.call(this);
    var tm = setTimeout(function () {
        for (var key in window.chartsMap){
            window.chartsMap[key].resize();
        }
        clearTimeout(tm);
    }, 1000);
}
WholeMenu.prototype.smallMain = function () {
    this.effect.smallMain.call(this);
    var tm = setTimeout(function () {
        for (var key in window.chartsMap){
            window.chartsMap[key].resize();
        }
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
/*定义总菜单调用效果的方法END*/

/*定义总菜单鼠标悬停事件方法*/
WholeMenu.prototype.onHover = function () {
    if (this.attr("id") === "left-menu" && this.next().css("width") !== "0px") {
        return;
    }
    /*启动一个延时器*/
    this.timerShow = setTimeout(function () {
        this.find(".menu-handler").css({"display": "block", left: this[0].offsetLeft + this[0].offsetWidth-1 + "px"});
        /*延时器执行完成，关闭延时器*/
        clearTimeout(this.timerShow);
    }.bind(this), 500);
}
/*定义总菜单鼠标离开事件方法*/
WholeMenu.prototype.onHoverOut = function () {
    /*清除悬停效果的延时器*/
    clearTimeout(this.timerShow);
    this.find(".menu-handler").hide();
}


/*子菜单类*/
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

/*为菜单节点类原型定义配置项*/
MenuNode.prototype.configuration = {
    events: {
        select: function () {
            $("#tabs").show();
            $("#welcome-panel").hide();
            var tabHeight = $("#tabs").height();
            var tabHeadheigth = $("#tabs > .nav-tabs").height();
            $("#tabs > .tab-content").height(tabHeight - tabHeadheigth);
            myTabs.add(this.data);
        }
    }
}

