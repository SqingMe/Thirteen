Nasoft.Window.fns.SQL=function(node){
				Nasoft.Ui_extend.browser_even('#SQL');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose;
		    	onBeforeOpen=function(){
		    		
		    		try {
		    			console.log(node)
						$('#entry_name_SQL').textbox('setValue',node.text);
		    			var editor= null;
		    			editor = Nasoft.Util.createEditor({
			    			mode:"sql",
							ele:"Sql_entry_textarea"
						});
		    			console.log(editor)
		    			 var connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
		 				$('#entry_connect_SQL').combobox({
		 					data:connections,
		 					valueField:'name',   //将connections的id字段绑定在下拉表单的value上 
		 					textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
		 					onLoadSuccess:function(data){
		 						var connectionName;
		 						/**
		 						 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
		 						 * 否则去直接获取connection的Name选中对应项,
		 						 * 若没有则不选中任何
		 						 */
		 						connectionName=node.getEntry().connection!=''?node.getEntry().connection:node.getConnectionName();
		 						console.log("dbconnection : "+connectionName)
		 						connectionName!='' && $(this).combobox('select',connectionName);
		 					},
		 					onChange:function(newValue,oldValue){
		 						$.each(connections,function(i,o){//遍历下拉表单的所有数据项
		 							if(newValue==o.name){//筛选出当前点击的下拉表单项的connection
		 								//当选项发生改变时将当前被选项的name赋值个node的connectionName
		 								node.setConnectionName(o.name);
		 								databaseName = o;
		 							}
		 						});
		 					}
		 				});
		 				if (node.getEntry().connection == undefined) {
							$('#entry_connect_SQL').combobox('setValue','');
						} else {
							$('#entry_connect_SQL').combobox('setValue', node.getEntry().connection);
						}
		 				if (node.getEntry().sqlfromfile && node.getEntry().sqlfromfile === "F") {
		 					$('#entry_fileGetSql_Sql').get(0).checked=false;
		 					$('#Sql_browse_entry').linkbutton('disable');
	    					$('#fileSql_entry_Sql').textbox('disable');
	    					editor.setReadOnly(false);
		 				} else if (node.getEntry().sqlfromfile && node.getEntry().sqlfromfile === "T") {
		 					$('#entry_fileGetSql_Sql').get(0).checked=true;
		 					editor.setReadOnly(true);
	    					$('#Sql_browse_entry').linkbutton('enable');
	    					$('#fileSql_entry_Sql').textbox('enable');
		 				}
		 				if (node.getEntry().useVariableSubstitution && node.getEntry().useVariableSubstitution === "F") {
		 					$('#entry_replace_Sql').get(0).checked=false;
		 				} else if (node.getEntry().useVariableSubstitution && node.getEntry().useVariableSubstitution === "T") {
		 					$('#entry_replace_Sql').get(0).checked=true;
		 				}
		 				if (node.getEntry().sendOneStatement && node.getEntry().sendOneStatement === "F") {
		 					$('#entry_send_Sql').get(0).checked=false;
		 				} else if (node.getEntry().sendOneStatement && node.getEntry().sendOneStatement === "T") {
		 					$('#entry_send_Sql').get(0).checked=true;
		 				}
		 				if (node.getEntry().sqlfilename == undefined) {
		 					$('#fileSql_entry_Sql').textbox('setValue', '');
		 				} else {
		 					$('#fileSql_entry_Sql').textbox('setValue', node.getEntry().sqlfilename);
		 				}
		 				if (node.getEntry().sqlfilename_h == undefined) {
		 					$('#fileSql_entry_Sql_h').val('');
		 				} else {
		 					$('#fileSql_entry_Sql_h').val(node.getEntry().sqlfilename_h);
		 				}
		 				//点击从文件中得到的 SQL
		    			$('#entry_fileGetSql_Sql').unbind('click').click(function(e){
		    				if($('#entry_fileGetSql_Sql').get(0).checked){
		    					editor.setReadOnly(true);
		    					$('#Sql_browse_entry').linkbutton('enable');
		    					$('#fileSql_entry_Sql').textbox('enable');
		    				}else{
		    					$('#Sql_browse_entry').linkbutton('disable');
		    					$('#fileSql_entry_Sql').textbox('disable');
		    					editor.setReadOnly(false);
		    				}
		    			});
		    			
			    		editor.setValue(node.getEntry().sql?node.getEntry().sql:'');//改成input的多行
		    			
						//点击浏览
		    			$('#Sql_browse_entry').unbind('click').click(function(e){
		    				if($('#entry_fileGetSql_Sql').get(0).checked){
					        	Nasoft.Static.handleFilePostfix('#fileSql_entry_Sql','#fileSql_entry_Sql_h',{},'3','');
					        }
		    			});
		    			
						//取消
		    			$('#entry_SQL_cancel').unbind('click').click(function(e){
		    				$('#SQL').window('close');	
		    			});
		    			//确定
                        $('#entry_SQL_ok').unbind('click').click(function(e){
                        	 var SQL={};
		                	 node.text= $('#entry_name_SQL').textbox('getValue');//步骤名称
		                	 SQL.sqlfromfile=$("#entry_fileGetSql_Sql").prop("checked")==true ? 'T' : 'F'; //从文件中得到的 SQL
		                	 SQL.sendOneStatement= $("#entry_send_Sql").prop("checked")==true ? 'T' : 'F';//将SQL脚本作为一条语句发送
		                	 SQL.useVariableSubstitution= $('#entry_replace_Sql').get(0).checked ? 'T' : 'F';//使用变量替换
		                	 if($('#entry_connect_SQL').combobox('getValue')!=''&&$('#entry_connect_SQL').combobox('getValue')!=null){
		                		 SQL.connection=$('#entry_connect_SQL').combobox('getValue');
		         	            }
		                	 SQL.sql = editor.getValue();
		                     if($('#fileSql_entry_Sql').textbox('getValue')!=""){
		                    	 SQL.sqlfilename=$('#fileSql_entry_Sql').textbox('getValue');
		                     }
		                     if($('#fileSql_entry_Sql_h').val()!=""){
		                    	 SQL.sqlfilename_h=$('#fileSql_entry_Sql_h').val();
		                     }
		                	 node.setEntry(SQL);
		    				$('#SQL').window('close');	
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