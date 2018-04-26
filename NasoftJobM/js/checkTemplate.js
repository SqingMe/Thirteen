/**
 * Created by rsq0113 on 2018/4/25.
 */
function CheckTemplate(html, data) {
    var template = $(html);
    var that = this;
    /*面板对象*/
    this.target = template;
    /*面板关联树*/
    this.data = data;
    /*面板对应的对账渠道*/
    this.id = data.checkChannel;
    /*时间控件*/
    this.datetimepicker = this.target.find(".check-panel .panel-heading .clear-date .date");
    /*进度条*/
    this.progressBar = this.target.find(".check-panel .panel-body .progress-bar");
    /*对账按钮*/
    this.startBtn = this.target.find(".check-panel .panel-body .check-foot button").eq(0);
    /*撤销对账按钮*/
    this.cancelBtn = this.target.find(".check-panel .panel-body .check-foot button").eq(1);
    /*渲染面板标题*/
    this.target.find(".check-panel .panel-heading .check-describe").text(this.data.checkDescribe);
    this.target.find(".check-panel .panel-heading .icon").addClass("icon-"+this.id+"-brand");
    /*初始化面板数据*/
    (function () {
        var that = this;
       this.datetimepicker.datetimepicker({
           minDate:"20180101",
           defaultDate:this.data.stlDate
       });
        console.log(this.datetimepicker.data("DateTimePicker").defaultDate(this.data.stlDate));
        $.ajax({
            url: this.configuration.initUrl + this.id + ".json",
            type: "get",
            dataType: "json",
            /*  data: {
             checkChannel: that.attr("id").toUpperCase()
             },*/
            success: function (data) {
                that.resetData(data);
            }
        });
    }).call(this);
    /*重置数据*/
    this.resetData = function (data) {
        this.data = data;
        this.configuration.controller[this.data.checkState]["work"].call(this);
        updateProgress.call(this);
        updateButtons.call(this);
        updateState.call(this);
    }

    /*对账按钮点击事件*/
    this.startBtn.on("click", function () {
        that.configuration.clickCheck.call(that);
    });
    this.cancelBtn.on("click", function () {
        that.configuration.clickCancel.call(that);
    });
    /*更新进度条*/
    function updateProgress() {
        this.progressBar.css({width: this.data.progressNum + "%"});
    }
    /*修改按钮状态*/
    function updateButtons() {
        var buttonState = this.configuration.controller[this.data.checkState]["buttonState"].split(',');
        for (var i = 0; i < buttonState.length; i++) {
            this.target.find(".check-panel .panel-body .check-foot button").eq(i).attr("disabled", buttonState[i] === "true" ? true : false);
        }
    }

    /*修改状态*/
    function updateState() {
        var stateText = this.target.find(".check-panel .panel-body .check-foot .check-state mark");
        stateText.text(this.data.stateCn);
        stateText.addClass(this.configuration.controller[this.data.checkState]["stateClass"])
    }
}
function BootRow() {
    var row = $("<div class='row'></div>");
    this.target = row;
    this.children = [];
    this.childrenLength = function () {
        return this.children.length;
    }
    this.append = function (child) {
        /*每行只能有两个对账面板*/
        this.children.push(child)
        this.target.append(child.target);
        return this;
    }
    this.appendTo = function (dom) {
        this.target.appendTo(dom);
    }
}
function CheckLayout(data) {
    /*获取到面板容器对象*/
    var container = $(".check-container");
    this.target = container;
    this.data = data;
    /*容器行的列表*/
    this.rows = [];
    this.checkTemplate = $.ajax({
        url: "/NasoftJobM/demo/checkTemplate.html",
        dataType: 'HTML',
        async: false
    }).responseText;
    var that = this;
    this.init = function () {
        /*创建一行*/
        var row = new BootRow();

        /*遍历接口数据*/
        $.each(data, function (i, o) {
            /*o的数据就是每个面板的初始化数据*/
            var template = new CheckTemplate(that.checkTemplate, o);
            row = row.append(template);
            /*如果此行的成员以满，则将此行加入文档中，同时再创建一行替换变量*/
            if (row.childrenLength() === 2) {
                row.appendTo(that.target);
                /*将此行加入行列表*/
                that.rows.push(row);
                row = new BootRow();
            }
        });
    }
}
/*根据渠道号查找对应的面板对象，没有查到返回null*/
CheckLayout.prototype.find = function (id) {
    var rl = this.rows.length;
    for (var i = 0; i < this.rows.length; i++) {
        var row = this.rows[i];
        var cl = row.children.length;
        for (var j = 0; j < cl; j++) {
            if (row.children[j].id === id) {
                return row.children[j];
            }
        }
    }
    return null;
}

function Interval(fun, time, panel) {
    /*添加动画效果*/
    panel.progressBar.addClass("active");
    this.interval = window.setInterval(fun, time);
    /*关闭定时器*/
    this.close = function () {
        window.clearInterval(this.interval);
        /*消除动画效果*/
        panel.progressBar.removeClass("active");
        /*销毁定时器绑定*/
        panel.interval = null;
        console.log("定时器关闭",this.interval,panel.interval)
    }
}
CheckTemplate.prototype.interval = null;


