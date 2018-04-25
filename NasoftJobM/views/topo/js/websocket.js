		var cookie = $.cookie();
		var path = $.getRootPath().substring(6);
		var uid=cookie.userId;
		var from=uid;
		var fromName=cookie.username;
		var to=uid;
		
		var websocket;
		if ('WebSocket' in window) {
			websocket = new WebSocket("ws://" + path + "/execution.do?uid="+uid);
		} else if ('MozWebSocket' in window) {
			websocket = new MozWebSocket("ws://" + path + "/execution"+uid);
		} else {
			websocket = new SockJS("http://" + path + "/execution/sockjs"+uid);
		}
		websocket.onopen = function(event) {
			console.log("WebSocket:已连接");
			console.log(event);
		};
		websocket.onmessage = function(event) {
			var data=JSON.parse(event.data);
			console.log("WebSocket:收到一条消息",data);
			console.log(event);
			var tab = Nasoft.Topo.getSelectedTab();
			var run_project = tab.run_project;
			run_project.transInfo = JSON.parse($.parseHTML(data.text)[0].textContent);
			run_project.showTransLog(tab);
			run_project.showTransStat(tab);
			run_project.showTransStatus(tab);
			run_project.transInfo = null;
		};
		websocket.onerror = function(event) {
			console.log("WebSocket:发生错误 ");
			console.log(event);
		};
		websocket.onclose = function(event) {
			console.log("WebSocket:已关闭");
			console.log(event);
		}
			function sendMsg(){
				var path = Nasoft.Topo.getSelectedTab().project().file_path;
					var data={};
					data["from"]=$.cookie().userId;
					data["fromName"]="a";
					data["to"]=$.cookie().userId;
					data["text"]="method:exeTran,path:"+path+",level:ERROR";
					websocket.send(JSON.stringify(data));
			}
			
			Date.prototype.Format = function (fmt) { //author: meizz 
			    var o = {
			        "M+": this.getMonth() + 1, //月份 
			        "d+": this.getDate(), //日 
			        "h+": this.getHours(), //小时 
			        "m+": this.getMinutes(), //分 
			        "s+": this.getSeconds(), //秒 
			        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			        "S": this.getMilliseconds() //毫秒 
			    };
			    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			    for (var k in o)
			    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			    return fmt;
			}