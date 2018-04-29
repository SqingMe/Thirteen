/**
 * 全屏方法对象构造方法
 */
function Fullscreen(element){
	this.fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
	this.fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
	this.isfullscreen = document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width;
	this.launchFullscreen = function(){
		if(element.requestFullscreen) {
			  element.requestFullscreen();
			 } else if(element.mozRequestFullScreen) {//FF
			  element.mozRequestFullScreen();
			 } else if(element.webkitRequestFullscreen) {
			  element.webkitRequestFullscreen();
			 } else if(element.msRequestFullscreen) {
			  element.msRequestFullscreen();
			 } else if(element.oRequestFullscreen){
			        element.oRequestFullscreen();
			    }
	}
	this.exitFullscreen = function(){
	     if (document.exitFullscreen) {
	         document.exitFullscreen();
	       } else if (document.msExitFullscreen) {
	         document.msExitFullscreen();
	       } else if (document.mozCancelFullScreen) {
	         document.mozCancelFullScreen();
	       } else if(document.oRequestFullscreen){
	            document.oCancelFullScreen();
	        }else if (document.webkitExitFullscreen){
	         document.webkitExitFullscreen();
	       }
	}
	this.fullscreenchange = null;
	element.fullscreenchange = this.fullscreenchange;

}