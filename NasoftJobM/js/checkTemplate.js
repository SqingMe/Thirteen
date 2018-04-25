/**
 * Created by rsq0113 on 2018/4/25.
 */
function CheckTemplate(html,data){
    var template = $(html);
    this.target = template;
    this.data = data;
    /*面板对应的对账渠道*/
    this.id = data.checkChannel;
    this.target.find(".check-panel .panel-heading .check-describe").text(this.data.checkDescribe);
    ( function () {
        updateProgress.call(this);
        updateButtons.call(this);
        updateState.call(this);
    }).call(this)
    this.resetData = function(data){
        this.data = data;
        updateProgress.call(this);
        updateButtons.call(this);
        updateState.call(this);
    }
    function updateProgress(){
        var progressDom = this.target.find(".check-panel .panel-body .progress-bar");
        progressDom.css({width:this.data.progressNum+"%"});
    }
    /*修改按钮状态*/
    function updateButtons(){
        console.log("修改按钮状态");
    }
     /*修改状态*/
     function updateState(){
        var stateText = this.target.find(".check-panel .panel-body .check-foot .check-state mark");
        stateText.text(this.data.stateCn);
        stateText.addClass(this.defaults.stateClasses[this.data.checkState])
    }
}
function BootRow(){
    var row = $("<div class='row'></div>");
    this.target = row;
    this.children = [];
    this.childrenLength = function(){
       return this.children.length;
    }
    this.append = function(child){
        /*每行只能有两个对账面板*/
            this.children.push(child)
            this.target.append(child.target);
            return this;
    }
    this.appendTo = function(dom){
        this.target.appendTo(dom);
    }
}
function CheckLayout(data){
    /*获取到面板容器对象*/
    var container = $(".check-container");
    this.target = container;
    this.data = data;
    /*容器行的列表*/
    this.rows = [];
    this.checkTemplate = $.ajax({
        url:"/NasoftJobM/demo/checkTemplate.html",
        dataType:'HTML',
        async:false
    }).responseText;
    var that = this;
    this.init = function(){
        /*创建一行*/
      var row = new BootRow();

      /*遍历接口数据*/
      $.each(data,function(i,o){
          /*o的数据就是每个面板的初始化数据*/
          var template =  new CheckTemplate(that.checkTemplate,o);
          row = row.append(template);
        /*如果此行的成员以满，则将此行加入文档中，同时再创建一行替换变量*/
         if (row.childrenLength()===2){
             row.appendTo(that.target);
             /*将此行加入行列表*/
             that.rows.push(row);
             row = new BootRow();
         }
      });
    }
}
/*根据渠道号查找对应的面板对象，没有查到返回null*/
CheckLayout.prototype.find = function(id){
    var rl = this.rows.length;
    for(var i = 0;i < this.rows.length;i++){
        var row =this. rows[i];
        var cl = row.children.length;
        for(var j = 0;j < cl;j++){
            if(row.children[j].id === id){
                return row.children[j];
            }
        }
    }
    return null;
}
CheckTemplate.prototype.defaults = {
    stateClasses : ["un-check","checking","check-success","check-failure","check-reset"]

}

