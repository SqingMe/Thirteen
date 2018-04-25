 Nasoft.Topo.transferFns.SystemInfo=function(node){
	 var file=node.getStep().fields;
	 var systemInfo = [];
	 if(!!file){		 
		 if(file.field.constructor==Array){//数组		
			 $.each(file.field,function(i,o){
				 var field={};
				 field.name= o.name;
				 systemInfo.push(field)
			 });		
		 }else{//对象
			 var oldFile ={} 
			 oldFile.name=file.field.name;
			 systemInfo.push(oldFile);
		 }
		 
	 }
     return systemInfo;
	 
  };
Nasoft.Window.fns.SystemInfo=function(node){
				Nasoft.Ui_extend.browser_even('#SystemInfo');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose;
		    	onBeforeOpen=function(){
		    		try {
		    			console.log(node)
		    			$('#systemInfo_step_name').textbox('setValue',node.text);//设置步骤名称
		    			var systemInfo_table_value;	
		    			//设置弹出列表的值
		    			var typeVal=[{"value":'system date (variable)',"text":"系统日期(可变)"},{"value":'system date (fixed)',"text":"系统日期(固定)"},
		    			             {"value":'start date range',"text":"开始日期范围(转换)"},{"value":'end date range',"text":"结束日期范围(转换)"},
		    			             {"value":"job start date range","text":"开始日期范围(作业)"}, {"value":"job end date range","text":"结束日期范围(作业)"},
		    			             {"value":'yesterday start',"text":"昨天 00:00:00"},{"value":"yesterday end","text":"昨天 23:59:59"},
		    			             {"value":"today start","text":"今天 00:00:00"},{"value":"today end","text":"今天23:59:59"},
		    			             {"value":"tomorrow start","text":"明天 00:00:00"},{"value":"tomorrow end","text":"明天23:59:59"},
		    			             {"value":"last month start","text":"上月第一天的  00:00:00"},{"value":"last month end","text":"上月最后一天的  23:59:59"},
		    			             {"value":"this month start","text":"本月第一天的  00:00:00"},{"value":"this month end","text":"本月最后一天的  23:59:59"},
		    			             {"value":"next month start","text":"下个月第一天的  00:00:00"},{"value":"next month end","text":"下个月最后一天的  23:59:59"},
		    			             {"value":"copy of step","text":"步骤复制"},{"value":"transformation name","text":"转换名称"},
		    			             {"value":"transformation file name","text":"转换的文件名"},{"value":"User modified","text":"最后修改转换的用户"},			    			             
		    			             {"value":'Date modified',"text":"转换的最后修改日期"},{"value":'batch ID',"text":"转换 ID"},
		    			             {"value":'job batch ID',"text":"父作业 ID"},{"value":'Hostname',"text":"Hostname (Network setup)"},
		    			             {"value":'Hostname real',"text":"主机名"},{"value":'IP address',"text":"IP地址"},
		    			             {"value":'command line argument 1',"text":"命令行参数1"},{"value":'command line argument 2',"text":"命令行参数2"},
		    			             {"value":'command line argument 3',"text":"命令行参数3"},{"value":'command line argument 4',"text":"命令行参数4"},	    			             
		    			             {"value":'command line argument 5',"text":"命令行参数5"},{"value":'command line argument 6',"text":"命令行参数6"},
		    			             {"value":'command line argument 7',"text":"命令行参数7"},{"value":'command line argument 8',"text":"命令行参数8"},
		    			             {"value":'command line argument 9',"text":"命令行参数9"},{"value":'command line argument 10',"text":"命令行参数10"},		             
		    			             {"value":'Current PID',"text":"Current process identifier (PID)"},
		    			             {"value":'jvm max memory',"text":"JVM max memory"},{"value":'jvm total memory',"text":"JVM total memory"},
		    			             {"value":'jvm free memory',"text":"JVM free memory"},{"value":'jvm available memory',"text":"JVM available memory"},		    			             
		    			             {"value":'available processors',"text":"Available processors"},{"value":'jvm cpu time',"text":"JVM cpu time (milliseconds)"},
		    			             {"value":'total physical memory size',"text":"Total physical memory size (bytes)"},{"value":'total swap space size',"text":"Total swap space size (bytes)"},
		    			             {"value":'committed virtual memory size',"text":"Committed virtual size (bytes)"},{"value":'free physical memory size',"text":"Free physical memory size (bytes)"},
		    			             {"value":'free swap space size',"text":"Free swap space size (bytes)"},{"value":'last week start',"text":"First day of last week 00:00:00"},
		    			             {"value":'last week end',"text":"Last day of last week 23:59:59"},{"value":'last week open end',"text":"Last working day of last week 23:59:59"},
		    			             {"value":'last week start us',"text":"First day of last week 00:00:00 (US)"},{"value":'last week end us',"text":"Last day of last week 23:59:59 (US)"},
		    			             {"value":'this week start',"text":"First day of this week 00:00:00"},{"value":'this week end',"text":"Last day of this week 23:59:59"},
		    			             {"value":'this week open end',"text":"Last working day of this week 23:59:59"},{"value":'this week start us',"text":"First day of this week 00:00:00 (US)"},
		    			             {"value":'this week end us',"text":"Last day of this week 23:59:59"},{"value":'next week start',"text":"First day of next week 00:00:00"},
		    			             {"value":'next week end',"text":"Last day of next week 23:59:59"},{"value":'next week open end',"text":"Last working day of next week 23:59:59"},
		    			             {"value":'next week start us',"text":"First day of next week 00:00:00 (US)"},{"value":'next week end us',"text":"Last day of next week 23:59:59 (US)"},
		    			             {"value":'prev quarter start',"text":"First day of last quarter 00:00:00"},{"value":'prev quarter end',"text":"Last day of last quarter 23:59:59"},
		    			             {"value":'this quarter start',"text":"First day of this quarter 00:00:00"},{"value":'this quarter end',"text":"Last day of this quarter 23:59:59"},
		    			             {"value":'next quarter start',"text":"First day of next quarter 00:00:00"},{"value":'next quarter end',"text":"Last day of next quarter 23:59:59"},
		    			             {"value":'prev year start',"text":"First day of last year 00:00:00"},{"value":'prev year end',"text":"Last day of last year 23:59:59"},
		    			             {"value":'this year start',"text":"First day of this year 00:00:00"},{"value":'this year end',"text":"Last day of this year 23:59:59"},
		    			             {"value":'next year start',"text":"First day of next year 00:00:00"},{"value":'next year end',"text":"Last day of next year 23:59:59"},
		    			             {"value":'previous result result',"text":"Previous job entry result"},{"value":'previous result exist status',"text":"Previous job entry exit status"},
		    			             {"value":'previous result entry nr',"text":"Previous job entry nr"},{"value":'previous result nr errors',"text":"Previous job entry nr errors"},
		    			             {"value":'previous result nr lines input',"text":"Previous job entry nr lines input"},{"value":'previous result nr lines output',"text":"Previous job entry nr lines output"},
		    			             {"value":'previous result nr lines read',"text":"Previous job entry nr lines read"},{"value":'previous result nr lines updated',"text":"Previous job entry nr lines updated"},
		    			             {"value":'previous result nr lines written',"text":"Previous job entry nr lines written"},{"value":'previous result nr lines deleted',"text":"Previous job entry nr lines deleted"},
		    			             {"value":'previous result nr lines rejeted',"text":"Previous job entry nr lines rejected"},{"value":'previous result nr rows',"text":"Previous job entry nr rows"},
		    			             {"value":'previous result is stopped',"text":"Previous job entry stopped"},{"value":'previous result nr files',"text":"Previous job entry nr files"},
		    			             {"value":'previous result nr files retrieved',"text":"Previous job entry nr files retrieved"},{"value":'previous result log text',"text":"Previous job entry log text"},]	    			
		    			function selectType(){//自定义更新选定行信息方法
		    				var systemInfo_table_datalist_value=$('#systemInfo_table_datalist').datalist('getSelected')
							$('#systemInfo_table_type').window('close');
							if(systemInfo_table_datalist_value){
								$('#systemInfo_table').datagrid('updateRow', 
										{
									index:systemInfo_table_value,
									row: {
										 
										type: systemInfo_table_datalist_value.text,
										value: systemInfo_table_datalist_value.value
									}
										});
							}
		    			}	
		    			$('#systemInfo_table_type').window(// 设置弹出框
		    							{
		    								width : 340,
		    								height : 600,
		    								modal : true,
		    								minimizable : false,
		    								maximizable : false,
		    								collapsible : false,
		    								closable : true,
		    								title : '选择信息类型',
		    								content : '<br><center><span style="color:#balick">过滤:</span><input class="easyui-textbox" name="systemInfo_search" id="systemInfo_search" style="width:200px;"/>&nbsp;&nbsp;<a class="easyui-linkbutton"  id="systemInfo_inquiries" style="width:50px;">查询</a><br><br><ul class="easyui-datalist" title="选择要获取的信息类型" style="width:300px;height:450px" id="systemInfo_table_datalist"></ul><br><a class="easyui-linkbutton" name="systemInfo_shut_ok" id="systemInfo_shut_ok" style="width:50px;">确定</a>&nbsp;&nbsp;<a class="easyui-linkbutton" name="systemInfo_shut_cancel" id="systemInfo_shut_cancel" style="width:50px;">取消</a></center>'

		    							});		    			
		    			$('#systemInfo_table_type').window('close');//关闭选择信息类型弹出框
		    			$('#systemInfo_table_datalist').datalist(//设置弹出框表格属性	    								
		    					{
		    						data :typeVal, valueField: "value", textField: "text",
		    							onDblClickCell: function(index,field,value){				    								
                                        	selectType();
		    							}
		    					});
		    			var field_type=node.getStep().fields;//获取表格属性
	         			if(!!field_type && $.isArray(field_type.field)){//如果是数组
	         				$.each(field_type.field,function(i,o){
	         					$.each(typeVal,function(j,k){
           					   if(o.type===k.value){
           						  o.type=k.text;
           						  o.value=k.value;
           					   }
           					
           				});		
	         				});
	         			}else if(!!field_type &&!$.isArray(field_type.field)){//如果是字段
	         				$.each(typeVal,function(j,k){
	           					   if(field_type.field.type===k.value){
	           						field_type.field.type=k.text;
	           						field_type.field.value=k.value;
	           					   }	
	           				});
    					   }
		    			$('#systemInfo_table').datagrid({//设置表格属性
		    				data:node.getStep().fields?{total:1, rows:$.isArray(field_type.field)?
		    						field_type.field:[field_type.field]}:{total:0,rows:[]},
		    						columns : [ [ {
		    							field : 'name',
		    							title : '名称',
		    							width : 40,
		    							editor : {
		    								type : 'text'
		    							}
		    						}, {
		    							field : 'type',
		    							title : '类型',
		    							width : 60
		    						},{
		    							field : 'value',
		    							width : 0,
		    							hidden:true
		    						}, ] ],
    						rownumbers:true,
    						fitColumns:true,
    						singleSelect:false,
    						frozenColumns : [ [ {
    							field : 'ck',
    							checkbox : true,
    						} ] ],
    						fit:true,
		    				toolbar: [{
		    					iconCls: 'icon-add',
		    					text : "新增",
		    					handler: function(){
		    						$('#systemInfo_table').datagrid(
		    							'appendRow',//新增空行
		    							{
		    								name:'',
		    								type:'',
		    								value:'',
		    							}
		    						);
		    					}
		    				},{
		    					text : "删除",
		    					iconCls : 'icon-remove',
		    					handler : function() {
		    						var del_row = $('#systemInfo_table').datagrid('getSelections');
		    						var len = del_row.length;
		    						for (var int = 0; int < len; int++) {
		    							$('#systemInfo_table').datagrid('deleteRow',
		    									$('#systemInfo_table').datagrid('getRowIndex',del_row[int]));
									}
		    						var del_rowIndex = $('#systemInfo_table').datagrid('getRowIndex',del_row);
		    						$('#systemInfo_table').datagrid('deleteRow',del_rowIndex);
		    					}
		    				}],
		    				onClickCell:function(index,field,value){
		    					var rows=$(this).datagrid('getRows');
		    					$.each(rows,function(j,o){
		    						j===index || $('#systemInfo_table').datagrid('endEdit',j);
		    					});
		    				},
                         onDblClickCell: function(index,field,value){
		    					
		    					var rows=$(this).datagrid('getRows');
		    					$.each(rows,function(j,o){
		    						j===index || $('#systemInfo_table').datagrid('endEdit',j);
		    					});
		    					if(field=="type"){
		    						$('#systemInfo_table').datagrid('endEdit',index);
		    						$('#systemInfo_table_datalist').datalist(		    								
		    		    					{
		    		    						data :typeVal, valueField: "value", textField: "text",
		    		    						
		    		    					});
		    						
		    						$('#systemInfo_table_type').window('open');
		    						
		    						systemInfo_table_value=index;
		    						

		    					}else if(field=="name"){
		    						$(this).datagrid('beginEdit', index);//编辑点击的行
		    						
		    					}
		    					 var ed = $(this).datagrid('getEditor', {index:index,field:field});
		    				},
							onSelect:function(i,r){
								var that = this;
								$(document).unbind('keydown');
								$(document).keydown(function(event){
									console.log(event);
									  switch(event.keyCode) {
									  case 38:
										  event.ctrlKey && $(that).datagrid("selectmoveUp",r);
									  case 40:
										  event.ctrlKey && $(that).datagrid("selectmoveDown",r);
									  }
									});
							}
		    			});
		    			$('#systemInfo_inquiries').unbind('click').click(function() {//点击查询
		    					var sFind = $('#systemInfo_search').textbox('getValue');
		    					var vData = typeVal;
		    						if (sFind != "") {
		    							var vResult = [];
		    							$.each(vData, function(i, o) {
		    								var nPos = -1;

		    								for ( var key in o) {
		    									if (key === 'text') {
		    										nPos = o[key].indexOf(sFind)
		    									}
		    								}
		    								if (nPos >= 0) {
		    									vResult[vResult.length] = o;
		    								}
		    							});
		    							$('#systemInfo_table_datalist').datalist({

		    								data : vResult,
		    							
		    							});
		    						}

		    					});
		    			$('#SystemInfo_window_preview').window(//设置预览弹出框属性
		    					{
		    						width : 260,
		    						height : 120,
		    						modal : true,
		    						minimizable : false,
		    						maximizable : false,
		    						collapsible : false,
		    						closable : true,
		    						title : 'Enter preview size',
		    						content : '<span style="color:#balick">Enter the number of rows you would like to preview:</span><br><input class="easyui-textbox"  id="SystemInfo_notes" style="width:200px;"/><br><center><a class="easyui-linkbutton" id="SystemInfo_preview_ok" style="width:60px;">确定</a><a class="easyui-linkbutton" id="SystemInfo_preview_cancel" style="width:60px;">取消</a></center>',
		    					});
		    	        $('#SystemInfo_window_preview').window('close');	
		    	        
		    			$('#SystemInfo_window_fileProperty').window(// 设置内容显示弹出框属性
		    					{
		    						width : 1100,
		    						height : 400,
		    						modal : true,
		    						minimizable : true,
		    						maximizable : true,
		    						collapsible : false,
		    						closable : true,
		    						title : '预览记录',
		    						content:'<span id="span_SystemInfo_window_fileProperty" style="color:#balick; width: 50px;padding: 10px;"></span><br><div style="width: 1050px;height:280px;padding: 10px;"><table id="SystemInfo_table_fileProperty"></table></div><div><center><a class="easyui-linkbutton" id="SystemInfo_window_fileProperty_cancel" style="width: 60px;">关闭</a></center></div>'
		                  });
		    	        $('#SystemInfo_window_fileProperty').window('close');	
		    			$('#SystemInfo_preview_ok').unbind('click').click(function(e) {//点击文件内容弹出框的确定按钮
		    				var rows = $("#systemInfo_table").datagrid('getRows');//获取配置列表的所有行
		    				param=[],
		    			    columns=[],//数据表格的列属性
		    			    col=[],
		    			    columns.push(col);
		    			    $.each(rows,function(i,o){
		    			    	var field={field:o.name,
		    			    			title:o.name,
		    			    			formatter: function(value,row,index){
		    			    				return "<span style='white-space:pre;'>"+value+"</span>";//加载数据中的空格
		    			    			}
		    			    	} 
		    			    	col.push(field);//定义数据表格列属性
		    			    	param.push({name:o.name,value:o.value});
		    			    });
		    			// 请求数据表格的数据
		    			$.ajax({
		    			    url:$.getRootPath()+'/SystemInfoCtrl/GetSystemInfo.do',
		    				async:false,
		    				data:{param:JSON.stringify(param)},
		    				dataType:'json',
		    				type:'POST',
		    				success:function(data){
		    					console.log(data);
		    					var textname=$('#systemInfo_step_name').textbox('getValue');
		    					$('#span_SystemInfo_window_fileProperty').text("步骤    "+textname+"的数据  (1 rows)"); 
		    					$('#SystemInfo_table_fileProperty').datagrid({
		    						rownumbers : true,
		    						fit : true,
		    						fitColumns : true,
		    						data:data,
		    						onBeforeSelect : function() {
		    							return false;
		    						},
		    						columns :columns 
		    					});
		    					
		    					$('#SystemInfo_notes').textbox('setValue',"");
	    						$('#SystemInfo_window_preview').window('close');
	    						$('#SystemInfo_window_fileProperty').window('open');
		    				}
		    			});
		    		})
		    			$('#SystemInfo_window_fileProperty_cancel').unbind('click').click(function(e) {//内容显示弹出框的关闭按钮
		    				$('#SystemInfo_window_fileProperty').window('close');
		    			});	
		    	    	$('#SystemInfo_preview_cancel').unbind('click').click(function(e) {//文件内容弹出框的取消按钮
		    				$('#SystemInfo_window_preview').window('close');
		    			});
                        $('#systemInfo_shut_ok').unbind('click').click(function(e){//弹出框确定
		    				selectType();
		    			});
		    			
		    			$('#systemInfo_shut_cancel').unbind('click').click(function(e){//弹出框取消
		    				$('#systemInfo_table_type').window('close');
		    			});
		    			
		    			$('#SystemInfo_cancel').unbind('click').click(function(e){//取消按钮
		    				$('#SystemInfo').window('close');
		    			});
		    			$('#SystemInfo_preview').unbind('click').click(function(e){//点击预览按钮
		    				$('#SystemInfo_window_preview').window('open');
		    			});
		    			$('#SystemInfo_ok').unbind('click').click(function(e){//确认按钮
		    	          	 var SystemInfo = {};// 定义一个表输出对象	
		          			node.text = $('#systemInfo_step_name').textbox('getValue');
		          			var rows = $('#systemInfo_table').datagrid('getRows');// 获取当前页面中所有的行
		         			$.each(rows, function(i, o) {
		         				$('#systemInfo_table').datagrid('endEdit', i);// 结束编辑所有行
		         			});
		          			var fields=Nasoft.GetProjectData.getFields('#systemInfo_table');
		          			console.log(fields)
		          			if(!!fields&&fields.field.constructor==Array){
		          				$.each(fields.field,function(i,o){
		          					o.type=o.value;
		          					delete o.value;
		          				})
		          			}else if(!!fields){
		          				var type=fields.field.value;
		          				fields.field.type=type;
		          				delete fields.field.value;
		          			}
		          			SystemInfo.fields=fields;
		          			console.log(fields)
		          	    	 node.setStep(SystemInfo);//将步骤的配置属性放入节点中
		          			console.log(node)
		          			node.setTransfer();//存储要传递的字段
		    				$('#SystemInfo').window('close');//关闭窗口
		    			});
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}		    		
		    	};
		    	onBeforeClose=function(){
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}