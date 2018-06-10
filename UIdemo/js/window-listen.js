/**
 * Created by rsq0113 on 2018/5/3.
 */
$(function () {
    var mainH = $("#main-panel").height();
    var headH = $("#main-panel > .panel-heading").height();
    $("#main-panel > .panel-body").height(mainH - headH + 1);
   $(window).resize(function () {
       mainH = $("#main-panel").height();
       headH = $("#main-panel > .panel-heading").height();
       $("#main-panel > .panel-body").height(mainH - headH + 1);
       var tabhH = $("#tabs .nav-tabs").height();
       $("#tabs .tab-content").height($("#tabs").height()-tabhH);
       for (var key in window.chartsMap){
           window.chartsMap[key].resize();
       }
   }) ;
});
