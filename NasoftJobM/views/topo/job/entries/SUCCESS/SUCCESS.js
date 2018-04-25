Nasoft.Window.fns.SUCCESS=function(node){
				Nasoft.Ui_extend.browser_even('#SUCCESS');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			$('#SUCCESS_task_name').textbox('setValue',node.text);
		    			//确定
		    			$('#SUCCESS_ok').unbind('click').click(function(e){
		    				node.text= $('#SUCCESS_task_name').textbox('getValue');//步骤名称
		    				node.setEntry();
		    				$('#SUCCESS').window('close');	
		    			});
		    			//取消
		    			$('#SUCCESS_cancel').unbind('click').click(function(e){
		    				 $('#SUCCESS').window('close');	
		    			});
		    			
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
		    	};
		    	onBeforeClose=function(){
                 try {
						
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}