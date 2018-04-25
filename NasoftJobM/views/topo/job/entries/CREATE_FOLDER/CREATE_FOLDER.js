Nasoft.Window.fns.CREATE_FOLDER=function(node){
				Nasoft.Ui_extend.browser_even('#CREATE_FOLDER');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			$('#CREATE_FOLDER_task_name').textbox('setValue',node.text);
		    			var aa=node.getEntry().foldername;
		    		    $('#CREATE_FOLDER_task_filename').textbox('setValue',aa);
		    			 $('#CREATE_FOLDER_transition').unbind('click').click(function(e) { // 点击浏览							
	                        	Nasoft.Static.handleFilePostfix('#CREATE_FOLDER_task_filename','#CREATE_FOLDER_task_filename_h',{},'3','');
							});
		    			 
		    			 if (node.getEntry().fail_of_folder_exists && node.getEntry().fail_of_folder_exists === "N") {
			 					$('#CREATE_FOLDER_task_failurefile').get(0).checked=false;
			 				} else if (node.getEntry().fail_of_folder_exists && node.getEntry().fail_of_folder_exists === "Y") {
			 					$('#CREATE_FOLDER_task_failurefile').get(0).checked=true;
			 				}
		    			 
		    			//确定
		    			$('#CREATE_FOLDER_ok').unbind('click').click(function(e){
		    				var FILE_EXISTS={}
		    				node.text= $('#CREATE_FOLDER_task_name').textbox('getValue');//步骤名称
		    				FILE_EXISTS.foldername=$('#CREATE_FOLDER_task_filename').textbox('getValue');
		    				FILE_EXISTS.fail_of_folder_exists=$("#CREATE_FOLDER_task_failurefile").get(0).checked ? 'Y' : 'N'; //从文件中得到的 SQL
		    				node.setEntry(FILE_EXISTS);
		    				$('#CREATE_FOLDER').window('close');	
		    			});
		    			//取消
		    			$('#CREATE_FOLDER_cancel').unbind('click').click(function(e){
		    				 $('#CREATE_FOLDER').window('close');	
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