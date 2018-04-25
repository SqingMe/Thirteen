/**
 * @author rsq0113
 * easyui 插件的重写
 */
Nasoft.Ui_extend=
{
		win_onBeforeOpen:function(id,func){	    
			var opts = $(id).window('options');//获取window属性列表
			console.log(opts)
			$.extend(opts,{onBeforeOpen:func});
			$(id).window(opts);
		},
		
		win_onBeforeClose:function(id,func){
			var opts = $(id).window('options');//获取window属性列表
			console.log(func)
			$.extend(opts,{onBeforeClose:func});
			$(id).window(opts);
		},
		/**
		 * 
		 * @param id (需要初始化的easyui-window的id)
		 * @param funs (函数集 easyui-window的一些事件回调函数,根据easyui-window的api对函数进行命名)
		 */
		win_event:function(id,funs){
			console.log(funs)
			var fns={},opts;
			try{
			opts=$(id).window('options');
			  for ( var key in opts) {
		        	 if(typeof opts[key] ==='function'){
		        		 if(funs[key])fns[key]=funs[key];
		        	 }
				} 
				$.extend(opts,fns);	
				console.log(opts)
				$(id).window(opts);
			}catch (e) {
				console.log(e);
			}
		},
		/**
		 * 
		 * @param id(在显示时需要初始化的menu 的id)
		 * @param funs (函数集 easyui-menu 的事件函数,根据easyui-menu 的事件进行命名)
		 */
		menu_showAndHandle:function(id,funs){
			console.log(funs)
			$(id).menu();
			var fns={},opts;
			try{
			opts=$(id).menu('options');
			  for ( var key in opts) {
		        	 if(typeof opts[key] ==='function'){
		        		 if(funs[key])fns[key]=funs[key];
		        	 }
				} 
				$.extend(opts,fns);	
				$(id).menu('show',funs.XY);
			}catch (e) {
				console.log(e);
			}
		},
		/**]
		 * 
		 * @param id(需要重新加载的tabs的id)
		 * @param funs(函数集 easyui-tabs 的事件函数,根据easyui-tabs的事件进行命名)
		 */
		tabs_event:function(id,funs){
			var fns={},opts;
			try{
			opts=$(id).tabs('options');
			  for ( var key in opts) {
				  if(typeof opts[key] ==='function'){
		        		 if(funs[key])fns[key]=funs[key];
		        	 }
				} 
				$.extend(opts,fns);	
			}catch (e) {
				console.log(e);
			}
		},
		/**
		 * 限制window窗口在浏览器上移动范围
		 * @param id(需要重新加载的tabs的id)
		 */
		browser_even:function(id){
			var parentWidth = $("body").width();  
            var parentHeight = $("body").height();  
			$(id).window({
		         onMove: function (left,top) {
	                /*if (left <= 0) {  
	                    $(this).window('move', {  
	                        left: 1  
	                    });  
	                } */ 
	                if (top <= 0) {//只限制上面  
	                    $(this).window('move', {  
	                        top: 1  
	                    });  
	                }  
				 }
			});
		}
}