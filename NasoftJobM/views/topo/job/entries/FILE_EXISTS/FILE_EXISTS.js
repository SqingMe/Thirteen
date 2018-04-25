Nasoft.Window.fns.FILE_EXISTS=function(node){
				Nasoft.Ui_extend.browser_even('#FILE_EXISTS');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			$('#FILE_EXISTS_task_name').textbox('setValue',node.text);
		    			var aa=node.getEntry().filename;
		    		    $('#FILE_EXISTS_task_filename').textbox('setValue',aa);
		    			 $('#FILE_EXISTS_transition').unbind('click').click(function(e) { // 点击浏览							
	                        	Nasoft.Static.handleFilePostfix('#FILE_EXISTS_task_filename','#FILE_EXISTS_task_filename_h',{},'3','');
							});
		    			
		    			//确定
		    			$('#FILE_EXISTS_ok').unbind('click').click(function(e){
		    				var FILE_EXISTS={}
		    				node.text= $('#FILE_EXISTS_task_name').textbox('getValue');//步骤名称
		    				FILE_EXISTS.filename=$('#FILE_EXISTS_task_filename').textbox('getValue');
		    				node.setEntry(FILE_EXISTS);
		    				$('#FILE_EXISTS').window('close');	
		    			});
		    			//取消
		    			$('#FILE_EXISTS_cancel').unbind('click').click(function(e){
		    				 $('#FILE_EXISTS').window('close');	
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