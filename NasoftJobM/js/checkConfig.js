/**
 * Created by rsq0113 on 2018/4/26.
 */
$.extend($.fn.datetimepicker.defaults ,{
    format : "YYYYMMDD",
    locale: 'zh-CN',
    maxDate:new Date()
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
    }

}
