Nasoft.Window.fns.WRITE_TO_LOG=function(node){
				Nasoft.Ui_extend.browser_even('#WRITE_TO_LOG');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose;
		    	onBeforeOpen=function(){
		    		
		    		try {
						$('#entry_name_WRITE_TO_LOG').textbox('setValue',node.text);
		    			var entry=node.getEntry();//获取步骤对象		

		 				$('#entry_connect_WRITE_TO_LOG').combobox({
		 					data:[{'value':'Nothing','name':'没有日志'},{'value':'Error','name':'错误日志'},{'value':'Minimal','name':'最小日志'},{'value':'Basic','name':'基本日志'},{'value':'Detailed','name':'详细日志'},{'value':'Debug','name':'调试'},{'value':'Rowlevel','name':'行级日志(非常详细)'}],
		 					editable:false,
		 					valueField:'value',   //将connections的id字段绑定在下拉表单的value上 
		 					textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
		 				});
		 				if (entry.loglevel == undefined) {
							$('#entry_connect_WRITE_TO_LOG').combobox('setValue','');
						} else {
							$('#entry_connect_WRITE_TO_LOG').combobox('setValue', entry.loglevel);
						}
		 				if (entry.logsubject == undefined) {
		 					$('#entry_Logtopic_WRITE_TO_LOG').textbox('setValue', '');
		 				} else {
		 					$('#entry_Logtopic_WRITE_TO_LOG').textbox('setValue', entry.logsubject);
		 				}
						if(entry.logmessage==undefined){
							$("#WRITE_TO_LOG_entry_textarea").val('');				
						}else{
							$("#WRITE_TO_LOG_entry_textarea").val(entry.logmessage);			
						}
						//取消
		    			$('#entry_WRITE_TO_LOG_cancel').unbind('click').click(function(e){
		    				$('#WRITE_TO_LOG').window('close');	
		    			});
		    			//确定
                        $('#entry_WRITE_TO_LOG_ok').unbind('click').click(function(e){
                        	 var WRITE_TO_LOG={};
		                	 node.text= $('#entry_name_WRITE_TO_LOG').textbox('getValue');//步骤名称
		                	 if($('#entry_connect_WRITE_TO_LOG').combobox('getValue')!=''&&$('#entry_connect_WRITE_TO_LOG').combobox('getValue')!=null){
		                		 WRITE_TO_LOG.loglevel=$('#entry_connect_WRITE_TO_LOG').combobox('getValue');
		                	 }
		                	 if($('#entry_Logtopic_WRITE_TO_LOG').textbox('getValue')!=''&&$('#entry_Logtopic_WRITE_TO_LOG').textbox('getValue')!=null){
		                		 WRITE_TO_LOG.logsubject=$('#entry_Logtopic_WRITE_TO_LOG').textbox('getValue');
		                	 }
		                	 var text = $("#WRITE_TO_LOG_entry_textarea").val();
		                	 if(text!=''&&text!=null){
		                		 WRITE_TO_LOG.logmessage=text;
		                	 }
		                	 node.setEntry(WRITE_TO_LOG);
		    				$('#WRITE_TO_LOG').window('close');	
		    			});
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
		    	};
		    	onBeforeClose=function(){
                 try {
                
//                	 console.log(node.getEntry())
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}