/**
 * Created by rsq0113 on 2018/4/26.
 */
$.extend($.fn.datetimepicker.defaults ,{
    format : "YYYYMMDD",
    locale: 'zh-CN',
    maxDate:new Date(),
    useCurrent:false
});

CheckTemplate.prototype.configuration = {
    initUrl : "/NasoftJobM/json/",
    controller: [
        {
            flag:"未对账",
            stateClass:"un-check",
            buttonState: "false,true",
            work: function () {
            }
        }, {
            flag:"对账中",
            stateClass:"checking",
            buttonState: "true,true",
            work: function () {
                var that = this;
                /*没有定时器就创建一个定时器任务*/
                if(this.interval === null){
                    this.interval = new Interval(function () {
                        $.ajax({
                            url: "/NasoftJobM/json/"+that.id + ".json",
                            data: that.data,
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                that.resetData(data);
                            }
                        });
                    },10000,this);
                }
            }
        }, {
            flag:"完成",
            stateClass:"check-success",
            buttonState: "true,false",
            work: function () {
                if(this.interval !== null){
                    this.interval.close();
                }
                this.progressBar.removeClass("progress-bar-danger").addClass(" progress-bar-success");
            }
        }, {
            flag:"失败",
            stateClass:"check-failure",
            buttonState: "true,false",
            work: function () {
                if(this.interval !== null){
                    this.interval.close();
                }
                this.progressBar.removeClass("progress-bar-success").addClass(" progress-bar-danger");
            }
        },{
            flag:"已撤销",
            stateClass:"check-reset",
            buttonState: "false,false",
            work: function () {
            }
        }

    ],
    clickCheck: function () {
        var that = this;
        $.ajax({
            url: "/NasoftJobM/json/message.json",
            dataType: "json",
            data: this.data,
            success: function (data) {
                if ("success" === data.message) {
                    that.configuration.controller[1].work.call(that);
                } else if ("error" === data.message) {
                    return;
                } else {
                    return;
                }
            }
        });
    },
    clickCancel: function () {
        console.log("撤销对账", this.data);
    },
    dateChange : function (date) {
       var defaultDate = this.datetimepicker.data("DateTimePicker").defaultDate();
        console.log("选中日期与默认日期相同："+defaultDate.isSame(date.date));
        console.log("初始选中默认日期："+ (date.oldDate===null&&defaultDate.isSame(date.date)));
        console.log("再次选中默认日期："+ (date.oldDate!==null&&defaultDate.isSame(date.date)));
        console.log(date.date.format(date.date._f));
       /*不是初始化选中日期*/
       if(date.oldDate!==null){
           var that = this;
           this.date.stlDate = date.date.format(date.date._f);
           $.ajax({
               // 将对账信息结果保存
               url: $.getRootPath() + "/CheckInfoCtrl/selectStlDate",
               type: "POST",
               dataType: "json",
               data: this.data,
               success: function(data) {
                   if (data.message) {
                       if (data.message.indexOf("没有对账记录") > -1) {
                           // 前一天的对账已完成
                           if (confirm(data.message)) {
                               that.configuration.createCheckResult.call(that);
                           } else {
                               that.datetimepicker.data("DateTimePicker").defaultDate(date.oldDate);
                           }
                       } else {
                           alert(data.message);
                       }
                   } else {
                      that.resetData(data);
                   }
               }
           })
       };
    },
    createCheckResult:function() {
        var that = this;
        $.ajax({
            url: $.getRootPath() + "/CheckInfoCtrl/createCheckResult",
            type: "POST",
            dataType: "json",
            data: that.data("checkInfo"),
            success: function(data) {
                if (data.message) {
                    alert(data.message ? data.message : "对账记录生成 失败！");
                    return;
                } else {
                    that.resetData(data);
                }
            }
        });
    }


}
