Nasoft.Window.fns.CREATE_FILE=function(node){
				Nasoft.Ui_extend.browser_even('#CREATE_FILE');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			$('#CREATE_FILE_task_name').textbox('setValue',node.text);
		    			var aa=node.getEntry().filename;
		    		    $('#CREATE_FILE_task_filename').textbox('setValue',aa);
		    			 $('#CREATE_FILE_transition').unbind('click').click(function(e) { // 点击浏览							
	                        	Nasoft.Static.handleFilePostfix('#CREATE_FILE_task_filename','#CREATE_FILE_task_filename_h',{},'3','');
							});
		    			 
		    			 if (node.getEntry().fail_if_file_exists && node.getEntry().fail_if_file_exists === "N") {
			 					$('#CREATE_FILE_task_failurefile').get(0).checked=false;
			 				} else if (node.getEntry().fail_if_file_exists && node.getEntry().fail_if_file_exists === "Y") {
			 					$('#CREATE_FILE_task_failurefile').get(0).checked=true;
			 				}
		    			 
		    			//确定
		    			$('#CREATE_FILE_ok').unbind('click').click(function(e){
		    				var FILE_EXISTS={}
		    				node.text= $('#CREATE_FILE_task_name').textbox('getValue');//步骤名称
		    				FILE_EXISTS.filename=$('#CREATE_FILE_task_filename').textbox('getValue');
		    				FILE_EXISTS.fail_if_file_exists=$("#CREATE_FILE_task_failurefile").get(0).checked ? 'Y' : 'N'; //从文件中得到的 SQL
		    				node.setEntry(FILE_EXISTS);
		    				$('#CREATE_FILE').window('close');	
		    			});
		    			//取消
		    			$('#CREATE_FILE_cancel').unbind('click').click(function(e){
		    				 $('#CREATE_FILE').window('close');	
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