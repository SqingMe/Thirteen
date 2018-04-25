Nasoft.Topo.transferFns.SetVariable=function(node){
	 var fds = [];
		if(!!node.getStep().fields){
//			var type = judgeType(node.getStep().fields.field);
//			console.log("type : "+type);
			var rows = node.getStep().fields.field;
			if(!!rows&&(node.getStep().fields.field.constructor) == Object){
				var field={};
				field.name = rows.variable_name;
				fds.push(field);
			}else if(!!rows&&(node.getStep().fields.field.constructor) == Array){
				$.each(rows,function(i,o){
					var field={};
					field.name = o.variable_name;
					fds.push(field);
				});
			}else{
				return fds;
			}
			
		}
		return fds;
};
Nasoft.Window.fns.SetVariable=function(node){
				Nasoft.Ui_extend.browser_even('#SetVariable');//限制组件不能超出浏览器上边缘
				
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			
		    			//获取当前节点可用字段
		    		    var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
						if(!!transferArry){
							var  transfer=Nasoft.Util.transferArray_copy(transferArry)
							transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
						}
						var step=node.getStep(),SetVariable_table=$('#SetVariable_table'),table_options;
						console.log(step);
						$("#SetVariable_step_name").textbox('setValue',node.text);
						//初始化格式化复选框
						if(step.use_formatting==='Y'){
							$('#SetVariable_use_formatting').get(0).checked=true;
						}else if(step.use_formatting==='N'){
							$('#SetVariable_use_formatting').get(0).checked=false;
						}else{
							$('#SetVariable_use_formatting').get(0).checked=true;
						}
						/************************************** table start*****************************************************/

			        	var	variableTypeCombobox=[{'value':'JVM','text':'Java Virtual Machine'},{'value':'PARENT_JOB','text':'parent job'},
						                      {'value':'GP_JOB','text':'grand-parent job'},{'value':'ROOT_JOB','text':'root job'}];
						//if(setp.)
						function fieldnameFormatter(value, rowData, rowIndex) {
							if (value == 0) {
								return;
							}
							for (var i = 0; i < transfer.length; i++) {
								if (transfer[i].name == value) {
									return transfer[i].name;
								}
							}
						}
						function variableTypeFormatter(value, rowData, rowIndex){
							if (value == 0) {
								return;
							}
							for (var i = 0; i < variableTypeCombobox.length; i++) {
								if (variableTypeCombobox[i].value == value) {
									return variableTypeCombobox[i].text;
								}
							}
						}
						table_options=SetVariable_table.datagrid('options');
						table_options.data=step.fields?{total:1,rows:$.isArray(step.fields.field)?step.fields.field:[step.fields.field]}:{total:0,rows:[]};
						table_options.toolbar=[{//定义工具栏
							iconCls: 'icon-add',
							text : "新增",
							handler: function(){
								SetVariable_table.datagrid(
									'appendRow',//新增空行
									{field_name:'',variable_name:'',variable_type:'',default_value:''}
								);
							}
						},{
							text : "删除",
							iconCls : 'icon-remove',
							handler : function() {
								var del_row = $('#SetVariable_table').datagrid('getSelected');
								var del_rowIndex = $('#SetVariable_table').datagrid('getRowIndex',del_row);
								$('#SetVariable_table').datagrid('deleteRow',del_rowIndex);
							}
						}];
						$.each(table_options.columns[0],function(i,o){
						
							switch (i) {
							case 0:
							    o.formatter=fieldnameFormatter;
								break;	
							case 2:
							    o.formatter=variableTypeFormatter;
								break;
							}
						});
						table_options.rownumbers=true;
						table_options.onDblClickCell=function(index, field, value){
							 $.each(SetVariable_table.datagrid('getRows'),function(j,o){
								 SetVariable_table.datagrid('endEdit',j);
			    			 });
							 $.each(table_options.columns[0],function(i,o){
									if(o.field===field){
										switch (field) {
										case 'field_name':
											o.editor={};
											o.editor.type='combobox';
										    o.editor.options={data:transfer,valueField: "name", textField: "name",editable : false,}
										    $.each(table_options.columns[0],function(k,b){
										    	if(b!==o && b.editor) delete b.editor;
										    });
											break;
										
										case 'variable_type':
											o.editor={};
											o.editor.type='combobox';
										    o.editor.options={data:variableTypeCombobox,valueField: "value", textField: "text"}
										    $.each(table_options.columns[0],function(k,b){
										    	if(b!==o && b.editor) delete b.editor;
										    });
											break;

										default:
											o.editor={};
										    o.editor.type='text';
										    $.each(table_options.columns[0],function(k,b){
										    	if(b!==o && b.editor) delete b.editor;
										    });
											break;
										}	
									}
									
								});
							 SetVariable_table.datagrid('beginEdit',index);
			    		var	eg=SetVariable_table.datagrid('getEditor',{index:index,field:field});
			    		$(eg.target).focus().focusout(function(){//失去
			    			SetVariable_table.datagrid('endEdit',index);
			    		});
					}
						table_options.onSelect=function(i,r){
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
						SetVariable_table.datagrid(table_options);//重新加载表格;
						//确定
						$('#SetVariable_ok').unbind('click').click(function(){
							//获取node的名称
							node.text=$("#SetVariable_step_name").textbox('getValue');
							//保存'格式化'复选框的状态
							if($('#SetVariable_use_formatting').get(0).checked){
								step.use_formatting='Y';
							}else{
								step.use_formatting='N';
							}
							//获取表格数据
							step.fields=Nasoft.GetProjectData.getFields('#SetVariable_table');
							node.setStep();
							
							node.setTransfer();
							$('#SetVariable').window('close');
						});
						//取消
						$('#SetVariable_cancel').unbind('click').click(function(){
							$('#SetVariable').window('close');
						});
						//获取字段
						$('#SetVariable_obtain').unbind('click').click(function(){
//							var fields=Nasoft.GetProjectData.getFields(node);//获取上一个节点的fields
//							console.log(fields.field);
							//处理数据key值
							var temp = [];
							$.each(transfer,function(i,o){
								var field={};
								field.field_name = o.name;
								field.variable_name=o.name.toUpperCase( );
								field.variable_type='ROOT_JOB';//默认
								field.default_value='';
								temp.push(field);
							});
							var opts=$('#SetVariable_table').datagrid('options');
							opts.data={rows:temp};
							$('#SetVariable_table').datagrid(opts);
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