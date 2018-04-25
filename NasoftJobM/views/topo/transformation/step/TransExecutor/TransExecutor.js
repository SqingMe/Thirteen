Nasoft.Topo.transferFns.TransExecutor=function(node){
	var TransExecutor = [];
	TransExecutor=[{name:node.getStep().execution_time_field,type:'Integer',format:'#;-#',length:'15',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_result_field,type:'Boolean',format:'',length:'',precision:'',trim_type:"none"},
	               {name:node.getStep().execution_errors_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_lines_read_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_lines_written_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_lines_input_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_lines_output_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_lines_rejected_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_lines_updated_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"},
	               {name:node.getStep().execution_lines_deleted_field,type:'Integer',format:'#;-#',length:'9',precision:'0',trim_type:"none"}
	               ];
	node.blocked=true;
	return TransExecutor;
};
Nasoft.Window.fns.TransExecutor=function(node){
	Nasoft.Ui_extend.browser_even('#TransExecutor');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			console.log("node="+node);
			$('#step_name_TransExecutor').textbox('setValue',node.text);//设置步骤名称
			var  file_path= Nasoft.Topo.getSelectedTab().project().file_path;
			$('#TransExecutor_job').unbind('click').click(function(){//点击浏览
				Nasoft.Static.handleFilePostfix('#filename_TransExecutor','#filename_TransExecutor_h',{},'1',file_path);
			});
			$('#TransExecutor_job_open').unbind('click').click(function(e){//编辑按钮
				var filename=$('#filename_TransExecutor_h').val();
				if(filename){
					Nasoft.Project.openProject(filename);
				}
				$('#TransExecutor').window('close');
			});
			var transferArry = Nasoft.Topo.transferFns.getTransfer(node);// 获取当前节点可用的字段
			if (transferArry.length > 0) {
				var transfer = Nasoft.Util.transferArray_copy(transferArry);
				transfer = Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			if(node.getStep().parameters.inherit_all_vars==='Y'){
				$('#TransExecutor_check').get(0).checked=true;
			}else if(node.getStep().parameters.inherit_all_vars==='N'){
				$('#TransExecutor_check').get(0).checked=false;
			}else{
				$('#TransExecutor_check').get(0).checked=true;
			}
			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			$('#TransExecutor_table')
			.datagrid(
					{// 字段的界面
						fit:true,
						rownumbers:true,
						singleSelect:false,
						frozenColumns : [ [ {
							field : 'ck',
							checkbox : true,
						} ] ],
						ctrlSelect:true,
						checkOnSelect:false,
						data : !!node.getStep().parameters.variablemapping ? {
							total : 1,
							rows : $.isArray(node.getStep().parameters.variablemapping) ? node.getStep().parameters.variablemapping: [ node.getStep().parameters.variablemapping ]
						}
								: {
									total : 0,
									rows : []
								},
						toolbar : [
								{
									iconCls : 'icon-add',
									text : "增加",
									fitColumns : true,
									handler : function() {// 添加一行
										$('#TransExecutor_table')
												.datagrid(
														// 新增加一行
														'appendRow',
														{
															variable : '',
															field : '',
															input : ''
														});
									}
								},
								{
									text : "删除",
									iconCls : 'icon-remove',
									handler : function() {
										$('#TransExecutor_table').datagrid('deleteSelections');
									}
								} ],

						columns : [ [
								{
									field : 'variable',
									title : '变量/参数名',
									width : 100,
									editor : {
										type : 'text'
									}
								},
								{
									field : 'field',
									title : '使用的字段',
									width : 100,
									editor : {
										type : 'combobox',
										options : {
											valueField : "value",
											textField : "text",
											data : caltacomval
										}
									}
								},
								 {
									field : 'input',
									title : '静态输入值',
									width : 100,
									editor : {
										type : 'text'
									}
								} ] ],
						onClickCell : function(index, field, value) {
								$(this).datagrid('beginEdit', index);
								var ed = $(this).datagrid('getEditor',
										{
											index : index,
											field : field
										});
								$(ed.target).focus();
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
			
			function stepnames_combobox_TransExecutor(){
				var names=[]
				var value = Nasoft.Topo.getSelectedTab().scene.getNames();
				for(var i=0;i<value.length;i++){
					var namevalue={};
					namevalue.name=value[i]
					namevalue.name=value[i]
					names.push(namevalue);
				}
				return names;
				
			}
			$('#TransExecutor_result_check').combobox({
				data:stepnames_combobox_TransExecutor(),
				valueField:'name',   
				textField:'name', 
			});
			node.getStep().result_rows_target_step!=''&&node.getStep().result_rows_target_step!=null?$('#TransExecutor_result_check').textbox('setValue', node.getStep().result_rows_target_step):$('#TransExecutor_result_check').textbox('setValue', '');
			node.getStep().filename!=''&&node.getStep().filename!=null?$('#filename_TransExecutor').textbox('setValue', node.getStep().filename):$('#filename_TransExecutor').textbox('setValue', '');
			node.getStep().filename_h!=''&&node.getStep().filename_h!=null?$('#filename_TransExecutor_h').val( node.getStep().filename_h):$('#filename_TransExecutor_h').val('');
			
			
			$('#TransExecutor_step_comname').combobox({
				data:stepnames_combobox_TransExecutor(),
				valueField:'name',   
				textField:'name', 
			});
			node.getStep().execution_result_target_step!=''&&node.getStep().execution_result_target_step!=null?$('#TransExecutor_step_comname').textbox('setValue', node.getStep().execution_result_target_step):$('#TransExecutor_step_comname').textbox('setValue', '');
			node.getStep().execution_time_field!=''&&node.getStep().execution_time_field!=null?$('#TransExecutor_step_ExecutionTime').textbox('setValue', node.getStep().execution_time_field):$('#TransExecutor_step_ExecutionTime').textbox('setValue', '');
			node.getStep().execution_result_field!=''&&node.getStep().execution_result_field!=null?$('#TransExecutor_step_ExecutionResult').textbox('setValue',node.getStep().execution_result_field):$('#TransExecutor_step_ExecutionResult').textbox('setValue', '');
			node.getStep().execution_errors_field!=''&&node.getStep().execution_errors_field!=null?$('#TransExecutor_step_ExecutionNrErrors').textbox('setValue', node.getStep().execution_errors_field):$('#TransExecutor_step_ExecutionNrErrors').textbox('setValue', '');
			node.getStep().execution_lines_read_field!=''&&node.getStep().execution_lines_read_field!=null?$('#TransExecutor_step_ExecutionLinesRead').textbox('setValue',node.getStep().execution_lines_read_field):$('#TransExecutor_step_ExecutionLinesRead').textbox('setValue', '');
			node.getStep().execution_lines_written_field!=''&&node.getStep().execution_lines_written_field!=null?$('#TransExecutor_step_ExecutionLinesWritten').textbox('setValue', node.getStep().execution_lines_written_field):$('#TransExecutor_step_ExecutionLinesWritten').textbox('setValue', '');
			node.getStep().execution_lines_input_field!=''&&node.getStep().execution_lines_input_field!=null?$('#TransExecutor_step_ExecutionLinesInput').textbox('setValue',node.getStep().execution_lines_input_field):$('#TransExecutor_step_ExecutionLinesInput').textbox('setValue', '');
			node.getStep().execution_lines_output_field!=''&&node.getStep().execution_lines_output_field!=null?$('#TransExecutor_step_ExecutionLinesOutput').textbox('setValue', node.getStep().execution_lines_output_field):$('#TransExecutor_step_ExecutionLinesOutput').textbox('setValue', '');
			node.getStep().execution_lines_rejected_field!=''&&node.getStep().execution_lines_rejected_field!=null?$('#TransExecutor_step_ExecutionLinesRejected').textbox('setValue',node.getStep().execution_lines_rejected_field):$('#TransExecutor_step_ExecutionLinesRejected').textbox('setValue', '');
			node.getStep().execution_lines_updated_field!=''&&node.getStep().execution_lines_updated_field!=null?$('#TransExecutor_step_ExecutionLinesUpdated').textbox('setValue', node.getStep().execution_lines_updated_field):$('#TransExecutor_step_ExecutionLinesUpdated').textbox('setValue', '');
			node.getStep().execution_lines_deleted_field!=''&&node.getStep().execution_lines_deleted_field!=null?$('#TransExecutor_step_ExecutionLinesDeleted').textbox('setValue',node.getStep().execution_lines_deleted_field):$('#TransExecutor_step_ExecutionLinesDeleted').textbox('setValue', '');
			
			
			
			
			$('#TransExecutor_result_table').datagrid({// 字段的界面
				fit:true,
				rownumbers:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				ctrlSelect:true,
				checkOnSelect:false,
				data : !!node.getStep().result_rows_field ? {
					total : 1,
					rows : $.isArray(node.getStep().result_rows_field) ? node.getStep().result_rows_field: [ node.getStep().result_rows_field ]
				}
						: {
							total : 0,
							rows : []
						},
				toolbar : [
						{
							iconCls : 'icon-add',
							text : "增加",
							fitColumns : true,
							handler : function() {// 添加一行
								$('#TransExecutor_result_table')
										.datagrid(
												// 新增加一行
												'appendRow',
												{
													name : '',
													type : '',
													length : '',
													precision : ''
												});
							}
						},
						{
							text : "删除",
							iconCls : 'icon-remove',
							handler : function() {
								$('#TransExecutor_result_table').datagrid('deleteSelections');
							}
						} ],

				columns : [ [
						{
							field : 'name',
							title : '字段名',
							width : 100,
							editor : {
								type : 'text'
							}
						},
				        {field:'type', title:'类型',width:150,editor:{
				            type:'combobox',
			            	options:{
			            		valueField: 'label',	 
			            		textField: 'value',
			            		editable:false,
		                    	data: [{
		                			label: 'String',
		                			value: 'String'
		                		},{
		                			label: 'Date',
		                			value: 'Date'
		                		},{
		                			label: 'Number',
		                			value: 'Number'
		                		},{
		                			label: 'InternetAddress',
		                			value: 'InternetAddress'
		                		},{
		                			label: 'BigNumber',
		                			value: 'BigNumber'
		                		},{
		                			label: 'Integer',
		                			value: 'Integer'
		                		},{
		                			label: 'Boolean',
		                			value: 'Boolean'
		                		},{
		                			label: 'Timestamp',
		                			value: 'Timestamp'
		                		},{
		                			label: 'Binary',
		                			value: 'Binary'
		                		}]      		
			            	}
				        }
				        },
						 {
							field : 'length',
							title : '长度',
							width : 100,
							editor : {
								type : 'text'
							},
						    formatter: function(value, rowData, rowIndex) {
								if (value == '-1') {
									return value='';
								}else{
									return value;
								}
							
							}
						},
						 {
							field : 'precision',
							title : '精度',
							width : 100,
							editor : {
								type : 'text'
							},
							formatter: function(value, rowData, rowIndex) {
								if (value == '-1') {
									return value='';
								}else{
									return value;
								}
							
							}
						} ] ],
				onClickCell : function(index, field, value) {
						$(this).datagrid('beginEdit', index);
						var ed = $(this).datagrid('getEditor',
								{
									index : index,
									field : field
								});
						$(ed.target).focus();
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
			$('#TransExecutor_result_file_check').combobox({
				data:stepnames_combobox_TransExecutor(),
				valueField:'name',   
				textField:'name', 
			});
			node.getStep().result_files_target_step!=''&&node.getStep().result_files_target_step!=null?$('#TransExecutor_result_file_check').textbox('setValue', node.getStep().result_files_target_step):$('#TransExecutor_result_file_check').textbox('setValue', '');
			node.getStep().result_files_file_name_field!=''&&node.getStep().result_files_file_name_field!=null?$('#TransExecutor_result_filename_check').textbox('setValue', node.getStep().result_files_file_name_field):$('#TransExecutor_result_filename_check').textbox('setValue', '');
			$('#TransExecutor_cancel').unbind('click').click(function(e){//取消按钮
				$('#TransExecutor').window('close');
			});
			$('#TransExecutor_ok').unbind('click').click(function(e){//确认按钮
	          	 var TransExecutor = {};// 定义一个表输出对象	
      			node.text = $('#step_name_TransExecutor').textbox('getValue');
      			var rows = $('#TransExecutor_table').datagrid('getRows');
		        $.each(rows, function(i, o) {
			    $('#TransExecutor_table').datagrid('endEdit',i);// 结束编辑所有行
		       });
		       var fields = Nasoft.GetProjectData.getFields('#TransExecutor_table');
		       if (!!fields&& fields.field.constructor == Array) {// 数组
		    	   var parameters={};
		    	   var variablemapping_value=[]
		    	   $.each(fields.field,function(i, o) {
		    		   var variablemapping={}
		    		   variablemapping.variable=o.variable;
		    		   variablemapping.field=o.field;
		    		   variablemapping.input=o.input;
		    		   variablemapping_value.push(variablemapping);
							});
		    	   parameters.variablemapping=variablemapping_value;
		    	   parameters.inherit_all_vars = $('#TransExecutor_check').get(0).checked ? 'Y': 'N';
		    	   TransExecutor.parameters = parameters;
				} else if (!!fields) {// 对象
					 var parameters={};
			    	   var variablemapping=[]
			    	   variablemapping.push(fields.field);
			    	   parameters.variablemapping=variablemapping;
			    	   parameters.inherit_all_vars = $('#TransExecutor_check').get(0).checked ? 'Y': 'N';
			    	   TransExecutor.parameters = parameters;
				}else{
					var variablemapping=[];
					   var parameters={};
			    	   parameters.inherit_all_vars = $('#TransExecutor_check').get(0).checked ? 'Y': 'N';
					TransExecutor.parameters = parameters;
				}
		       
		       TransExecutor.result_rows_target_step=($('#TransExecutor_result_check').textbox('getValue')==null||$('#TransExecutor_result_check').textbox('getValue')=='')?'':$('#TransExecutor_result_check').textbox('getValue');
			   
			   	var rowss = $('#TransExecutor_result_table').datagrid('getRows');
		        $.each(rowss, function(i, o) {
			    $('#TransExecutor_result_table').datagrid('endEdit',i);// 结束编辑所有行
		       });
		       var fieldss = Nasoft.GetProjectData.getFields('#TransExecutor_result_table');
		       if (!!fieldss&& fieldss.field.constructor == Array) {// 数组
		    	   var variablemapping_value=[]
		    	   $.each(fieldss.field,function(i, o) {
		    		   if(o.type==null || o.type==''){
		    			   o.type='None';
		    		   }
		    		   if(o.length==null || o.length==''){
		    			   o.length='-1';
		    		   }
		    		   if(o.precision==null || o.precision==''){
		    			   o.precision='-1';
		    		   }
		    		   variablemapping_value.push(o);
							});
		    	   TransExecutor.result_rows_field = variablemapping_value;
				} else if (!!fieldss) {// 对象
			    	   var variablemapping=[]
			    	   if(fieldss.field.type==null || fieldss.field.type==''){
			    		   fieldss.field.type='None';
			    	   }
			    	   if(fieldss.field.length==null || fieldss.field.length==''){
			    		   fieldss.field.length='-1';
		    		   }
		    		   if(fieldss.field.precision==null || fieldss.field.precision==''){
		    			   fieldss.field.precision='-1';
		    		   }
			    	   variablemapping.push(fieldss.field);
			    	   TransExecutor.result_rows_field = variablemapping;
				}
		       TransExecutor.result_files_target_step=($('#TransExecutor_result_file_check').textbox('getValue')==null||$('#TransExecutor_result_file_check').textbox('getValue')=='')?'':$('#TransExecutor_result_file_check').textbox('getValue');
		       TransExecutor.result_files_file_name_field=($('#TransExecutor_result_filename_check').textbox('getValue')==null||$('#TransExecutor_result_filename_check').textbox('getValue')=='')?'':$('#TransExecutor_result_filename_check').textbox('getValue');
		       TransExecutor.filename=($('#filename_TransExecutor').textbox('getValue')==null||$('#filename_TransExecutor').textbox('getValue')=='')?'':$('#filename_TransExecutor').textbox('getValue');
		       TransExecutor.filename_h=($('#filename_TransExecutor_h').val()==null||$('#filename_TransExecutor_h').val()=='')?'':$('#filename_TransExecutor_h').val();

		        TransExecutor.execution_result_target_step=$('#TransExecutor_step_comname').textbox('getValue');
		        TransExecutor.execution_time_field=$('#TransExecutor_step_ExecutionTime').textbox('getValue');
			    TransExecutor.execution_result_field=$('#TransExecutor_step_ExecutionResult').textbox('getValue');
			    TransExecutor.execution_errors_field=$('#TransExecutor_step_ExecutionNrErrors').textbox('getValue');
			    TransExecutor.execution_lines_read_field=$('#TransExecutor_step_ExecutionLinesRead').textbox('getValue');
			    TransExecutor.execution_lines_written_field=$('#TransExecutor_step_ExecutionLinesWritten').textbox('getValue');
			    TransExecutor.execution_lines_input_field=$('#TransExecutor_step_ExecutionLinesInput').textbox('getValue');
			    TransExecutor.execution_lines_output_field=$('#TransExecutor_step_ExecutionLinesOutput').textbox('getValue');
			    TransExecutor.execution_lines_rejected_field=$('#TransExecutor_step_ExecutionLinesRejected').textbox('getValue');
			    TransExecutor.execution_lines_updated_field=$('#TransExecutor_step_ExecutionLinesUpdated').textbox('getValue');
			    TransExecutor.execution_lines_deleted_field=$('#TransExecutor_step_ExecutionLinesDeleted').textbox('getValue');
				
		       
      	    	node.setStep(TransExecutor);//将步骤的配置属性放入节点中
      			console.log(node)
      			node.setTransfer();//存储要传递的字段
				$('#TransExecutor').window('close');//关闭窗口
			});
		}catch(e){
			console.log(e)
		}
	},
    onBeforeClose=function(){}

    return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}