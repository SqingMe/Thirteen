/**
 * Created by rsq0113 on 2018/4/20.
 */

var myConstant = new MyConstant({
    FLV: "#left-menu",
    SLV: "#left-child-menu"
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
function MenuNode(data, type) {
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
            console.log(that.data)
        } else {
            console.log(that.data);
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
        var menuNode = new MenuNode(n);
        menuContarner.target.append(menuNode.target);
        menuContarner.nodes.push(menuNode);
        if (n.menu && n.menu.length >=0) {
            menuNode.childMenu = new ChildMenu(n.menu);
        }
    });
    console.log("构造parent");
    this.target = menuContarner.target;
    this.data = data;
    this.menuContarner = menuContarner;
    $(myConstant.FLV).append(this.target);
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




