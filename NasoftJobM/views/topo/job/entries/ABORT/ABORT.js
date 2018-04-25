Nasoft.Window.fns.ABORT=function(node){
				Nasoft.Ui_extend.browser_even('#ABORT');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			$('#ABORT_task_name').textbox('setValue',node.text);
		    			
		    			$('#ABORT_task_message').textbox('setValue',node.getEntry().message);
		    			//确定
		    			$('#ABORT_ok').unbind('click').click(function(e){
		    				var ABORT={}
		    				node.text= $('#ABORT_task_name').textbox('getValue');//步骤名称
		    				ABORT.message=$('#ABORT_task_message').textbox('getValue');
		    				node.setEntry(ABORT);
		    				$('#ABORT').window('close');	
		    			});
		    			//取消
		    			$('#ABORT_cancel').unbind('click').click(function(e){
		    				 $('#ABORT').window('close');	
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