/**
 * Created by rsq0113 on 2018/4/18.
 */
/**
* 增加标签页
*/
function addTab(options) {
    //option:
    //id:当前tab的名称
    //title:当前tab的标题
    //url:当前tab所指向的URL地址
    var exists = tabIsExists(options.menuid);
    if(exists){
        $("#tab_li_"+options.menuid).click();
    } else {
        $(myConstant.WLT + " > .nav-tabs").append('<li id="tab_li_'+options.menuid+'">' +
            '<a href="#tab_content_'+options.menuid+'"><button class="close" type="button">×</button>'+options.menuname+'</a>' +
            '</li>');
        //固定TAB中IFRAME高度
        var content = '';
        if(options.content){
            content = options.content;
        } else {
            content = '<iframe src="' + options.url + '" width="100%" height="100%"></iframe>';
        }
        $(myConstant.WLT + " > .tab-content").append('<div id="tab_content_'+options.menuid+'" role="tabpanel" class="tab-pane">'+content+'</div>');
        $("#tab_li_"+options.menuid + " > a").on("click",function (e) {
            e.preventDefault();
            console.log("click",this);
            $(this).tab('show');
        });
        $("#tab_li_"+options.menuid + " > a > button.close").on("click",closeTab);
        $("#tab_li_"+options.menuid + " > a").click();
    }
}


/**
 * 关闭标签页
 * @param button
 */
function closeTab () {
     console.log("closeTab",this);
    //先判断当前要关闭的tab选项卡有没有active类，再判断当前选项卡是否最后一个，如果是则给前一个选项卡以及内容添加active，否则给下一个添加active类
    var parent=$(this).parent(),gParent=parent.parent();
    if(gParent.hasClass('active')){
        console.log(gParent.index(),gParent.siblings().length)
        if(gParent.index()==gParent.siblings().length){
            gParent.prev().find("a").click()
        }else{
            gParent.next().find("a").click()
        }
    }
    if($(parent.attr('href')).hasClass('fade')){
        var st = window.setTimeout(function(){
            gParent.remove();
            $(parent.attr('href')).remove();
            window.clearTimeout(st);
        },150)
    }else {
        gParent.remove();
        $(parent.attr('href')).remove();
    }
};

/**
 * 判断是否存在指定的标签页
 * @param tabMainName
 * @param tabName
 * @returns {Boolean}
 */
function tabIsExists(tabName){
    var tab = $(myConstant.WLT +" > #tab_li_"+tabName);
    return tab.length > 0;
}

function loadTask1(id){
    // 指定图表的配置项和数据
    var option_1 = {
        title : {
            x : 'center',
            textStyle:{fontWeight:'bold',fontheight:'bold', color:'green',fontsize:'30'},
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{c}"
        },
        series: [
            {
                type:'pie',
                radius: ['50%', '70%'],
                title:'待办任务',
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        borderColor: '#f60',
                        textStyle: {
                            fontSize: '30',
                            color:'black'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:1, name:1}

                ]
            }
        ]
    };
    theme = {
        // 默认色板
        color: ['#b8860b','#87cefa','#da70d6','#32cd32','#6495ed',
            '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
            '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
            '#6699FF','#ff7f50','#3cb371','#ff6666','#30e0e0']
    };
    var charts_1=$("#"+id);
    var r = "100%"
    charts_1.css({width:r,height:"100%"});

    // 基于准备好的dom，初始化echarts实例
    var myChart_1 = echarts.init(charts_1[0],theme);

    window.onresize = function () {
        myChart_1. resize()
    }

  /*  /!**
     * 为饼状图添加点击事件
     *!/
    myChart_1.on('click',function(param){
        addTab("待办任务",'/Corc-0/views/account/errorresults/list.jsp','icon icon-sys');
    });*/

    // 使用刚指定的配置项和数据显示图表。
    myChart_1.setOption(option_1);
}
/**
 * @param vl
 * 加载欢迎页面底部统计图
 */
function loadSouth(vl){
    var option = {
        title : {
            text: new Date().getFullYear() + '年月度任务完成量',
            //subtext: '完成数据',
            x: 'center',
        },
        tooltip : {
            trigger: 'axis',//item  axis
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle : {          // 直线指示器样式设置
                    color: '#48b',
                    width: 2,
                    type: 'solid'
                },
                shadowStyle : {                       // 阴影指示器样式设置
                    width: 'auto',                   // 阴影大小
                    color: 'rgba(150,150,150,0.3)'  // 阴影颜色
                }
            }
        },
        //网格
        grid: {
            x: 80,
            y: 60,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 1,
            borderColor: '#ccc'
        },
        legend: {
            data:['最高任务']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        /*legend: {
         data:['任务量']
         },*/
        xAxis : [
            {
                type : 'category',
                name:"月份",
                boundaryGap : false,
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name:"完成量",
                axisLabel : {
                    formatter: '{value}'
                },
                splitNumber:10
            }
        ],
        series : [
            {
                name:'任务量',
                type:'line',
                data:[],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    theme = {
        // 默认色板
        color: ['#ff6666','#87cefa','#da70d6','#32cd32','#6495ed',
            '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0',
            '#1e90ff','#ff6347','#7b68ee','#00fa9a','#ffd700',
            '#6699FF','#ff7f50','#3cb371','#b8860b','#30e0e0']
    };
    var myChart = $("#charts_4")
    var r = "100%"
    myChart.css({width:r,height:"100%"});
    var myChart_5 = echarts.init(myChart[0],theme);
    myChart_5.setOption(option);
    window.chartsMap.myChart_5 = myChart_5;

    window.onresize = function () {
        myChart_5. resize()
    }

}
window.chartsMap = {};
