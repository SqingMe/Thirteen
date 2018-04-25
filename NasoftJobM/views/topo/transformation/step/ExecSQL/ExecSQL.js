Nasoft.Topo.transferFns.ExecSQL=function(node){
	var ExecSQL = [];
	var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
	ExecSQL=transferArry;
	return ExecSQL;
};
Nasoft.Window.fns.ExecSQL=function(node){
	Nasoft.Ui_extend.browser_even('#ExecSQL');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			console.log("node="+node);
			$('#step_name_ExecSQL').textbox('setValue',node.text);//设置步骤名称
			var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(transferArry.length>0){
				var transfer=Nasoft.Util.transferArray_copy(transferArry);
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			//参数表格属性设置
			$('#execSql_table').datagrid({
				data:!!node.getStep().arguments?{total:1, rows:$.isArray(node.getStep().arguments.argument)?
				    		node.getStep().arguments.argument:[node.getStep().arguments.argument]}:{total:0,rows:[]},	
				rownumbers:true,
				fitColumns:true,
				fit:true,
				toolbar: [{
					iconCls: 'icon-add',
					text : "新增字段",
					handler: function(){
						$('#execSql_table').datagrid(//新增加一行
								'appendRow',
								{ 
									name:'',
								}
						);
					}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						var del_row = $('#execSql_table').datagrid('getSelected');
						var del_rowIndex = $('#execSql_table').datagrid('getRowIndex',del_row);
						$('#execSql_table').datagrid('deleteRow',del_rowIndex);
					}
				}],
				columns:[[    
				          {field:'name',title:'字段名称',width:100,editor:{
				        	  type:'combobox',
					            options:{
					            	valueField :"value",
									textField : "text",
									data :Nasoft.Util.file_name_combobox(transfer)
					            }
					        }}
				]],
				 onClickRow:function(i,r){
					 if($('#Execute_one_line_execSql').get(0).checked){
		        	 var rows=$(this).datagrid('getRows');
					  $.each(rows,function(j,o){
						j===i || $('#execSql_table').datagrid('endEdit',j);
					  });
		        	  $(this).datagrid('beginEdit',i);//编辑点击的行
					 }
		         },
					onSelect : function(i,r){
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
			if (node.getStep().execute_each_row && node.getStep().execute_each_row === "N") {
				$('#Execute_one_line_execSql').get(0).checked = false;
				$('#Bind_parameters_execSql').prop('disabled', true);
				$('#Quote_Strings_execSql').prop('disabled', true);
			} else if (node.getStep().execute_each_row &&node.getStep().execute_each_row === "Y") {
				$('#Execute_one_line_execSql').get(0).checked = true;
				$('#Bind_parameters_execSql').prop('disabled', false);
				$('#Quote_Strings_execSql').prop('disabled', false);
			}
			if (node.getStep().single_statement && node.getStep().single_statement === "N") {
				$('#Execute_single_statement_execSql').get(0).checked = false;
			} else if (node.getStep().single_statement && node.getStep().single_statement === "Y") {
				$('#Execute_single_statement_execSql').get(0).checked = true;
			}
			if (node.getStep().replace_variables && node.getStep().replace_variables === "N") {
				$('#Variable_substitution_execSql').get(0).checked = false;
			} else if (node.getStep().replace_variables && node.getStep().replace_variables === "Y") {
				$('#Variable_substitution_execSql').get(0).checked = true;
			}
			if (node.getStep().set_params && node.getStep().set_params === "N") {
				$('#Bind_parameters_execSql').get(0).checked = false;
				$('#Quote_Strings_execSql').prop('disabled', false);
			} else if (node.getStep().set_params && node.getStep().set_params === "Y") {
				$('#Bind_parameters_execSql').get(0).checked = true;
				$('#Quote_Strings_execSql').prop('disabled', true);
			}
			if (node.getStep().quoteString && node.getStep().quoteString === "N") {
				$('#Quote_Strings_execSql').get(0).checked = false;
			} else if (node.getStep().quoteString && node.getStep().quoteString === "Y") {
				$('#Quote_Strings_execSql').get(0).checked = true;
			}
			if (node.getStep().insert_field == undefined) {
				$('#Insert_state_execSql').textbox('setValue', '');
			} else {
				$('#Insert_state_execSql').textbox('setValue', node.getStep().insert_field);
			}
			if (node.getStep().update_field == undefined) {
				$('#update_state_execSql').textbox('setValue', '');
			} else {
				$('#update_state_execSql').textbox('setValue', node.getStep().update_field);
			}
			if (node.getStep().delete_field == undefined) {
				$('#delete_state_execSql').textbox('setValue', '');
			} else {
				$('#delete_state_execSql').textbox('setValue', node.getStep().delete_field);
			}
			if (node.getStep().read_field == undefined) {
				$('#read_state_execSql').textbox('setValue', '');
			} else {
				$('#read_state_execSql').textbox('setValue', node.getStep().read_field);
			}
			   var	connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
				$('#step_connect_ExecSQL').combobox({
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
						connectionName=node.getStep().connection!=''?node.getStep().connection:node.getConnectionName();
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
				var step=node.getStep();//获取步骤对象		
				var editor= null;
    			editor = Nasoft.Util.createEditor({
	    			mode:"sql",
					ele:"execSql_textarea"
				});
				editor.setValue(step.sql?step.sql:'');//改成input的多行
				
				if (node.getStep().connection == undefined) {
					$('#step_connect_ExecSQL').combobox('setValue','');
				} else {
					$('#step_connect_ExecSQL').combobox('setValue', node.getStep().connection);
				}
			$('#Execute_one_line_execSql').unbind('click').click(function(e){//点击执行每一行按钮
				if($('#Execute_one_line_execSql').get(0).checked){
					$('#Bind_parameters_execSql').prop('disabled', false);
					$('#Quote_Strings_execSql').prop('disabled', false);
				}else{
					$('#Bind_parameters_execSql').prop('disabled', true);
					$('#Quote_Strings_execSql').prop('disabled', true);
					$('#Bind_parameters_execSql').get(0).checked=false;
					$('#Quote_Strings_execSql').get(0).checked=false;
					var rowss = $('#getFileNames_file_table').datagrid('getRows');//获取当前页面中所有的行
					$.each(rowss, function(i, o) {
						$('#execSql_table').datagrid('endEdit', i);//结束编辑所有行
					});
				}
			});
			$('#Bind_parameters_execSql').unbind('click').click(function(e){//点击执行每一行
				if($('#Bind_parameters_execSql').get(0).checked){
					$('#Quote_Strings_execSql').prop('disabled', true);
					$('#Quote_Strings_execSql').get(0).checked=false;
				}else{
					$('#Quote_Strings_execSql').prop('disabled', false);
				}
			});
			$('#execSql_for_field').unbind('click').click(function(e){//点击获取字段按钮
				var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArry){
					var transfer=Nasoft.Util.transferArray_copy(transferArry)
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					var opts_a=$('#execSql_table').datagrid('options');
					opts_a.data={rows:remove_selectValues_transfer(transfer)};
					$('#execSql_table').datagrid(opts_a);					
				}
			});
			function remove_selectValues_transfer(transfer){
				var data=[]
				for (var i = 0; i < transfer.length; i++) {			
					var data_a={}
					data_a.name=transfer[i].name;
					data.push(data_a)
				}
				return data;
			}
			$('#execSql_cancel').unbind('click').click(function(e){//取消按钮
				$('#ExecSQL').window('close');
			});
			$('#execSql_ok').unbind('click').click(function(e){//确认按钮
	          	 var ExecSQL = {};// 定义一个表输出对象	
      			node.text = $('#step_name_ExecSQL').textbox('getValue');
				ExecSQL.execute_each_row = $('#Execute_one_line_execSql').get(0).checked ? 'Y': 'N';
      			ExecSQL.single_statement = $('#Execute_single_statement_execSql').get(0).checked ? 'Y': 'N';
      			ExecSQL.replace_variables = $('#Variable_substitution_execSql').get(0).checked ? 'Y': 'N';
      			ExecSQL.set_params = $('#Bind_parameters_execSql').get(0).checked ? 'Y': 'N';
      			ExecSQL.quoteString = $('#Quote_Strings_execSql').get(0).checked ? 'Y': 'N';
      			if($('#Insert_state_execSql').textbox('getValue')!=""){
      				ExecSQL.insert_field=$('#Insert_state_execSql').textbox('getValue');
      			}
                if($('#update_state_execSql').textbox('getValue')!=""){
                	ExecSQL.update_field=$('#update_state_execSql').textbox('getValue');
      			}
                if($('#delete_state_execSql').textbox('getValue')!=""){
                	ExecSQL.delete_field=$('#delete_state_execSql').textbox('getValue');
	            }
                if($('#read_state_execSql').textbox('getValue')!=""){
                	ExecSQL.read_field=$('#read_state_execSql').textbox('getValue');
	            }
                if($('#step_connect_ExecSQL').combobox('getValue')!=''&&$('#step_connect_ExecSQL').combobox('getValue')!=null){
                	ExecSQL.connection=$('#step_connect_ExecSQL').combobox('getValue');
	            }
                var text = editor.getValue();
                if(text!=null&&text!=''){
                	ExecSQL.sql=text;
                }
                var rows = $('#execSql_table').datagrid('getRows');// 获取当前页面中所有的行
     			$.each(rows, function(i, o) {
     				$('#execSql_table').datagrid('endEdit', i);// 结束编辑所有行
     			});
    			var file=Nasoft.GetProjectData.getFields('#execSql_table');//将对应数据字段加入表输出	
				if(!!file&&file.field.constructor==Array){//数组
					var arguments = {};
					var fileName = [];
					$.each(file.field,function(i,o){
						var argument={
								name:{}
						}
			                argument.name=o.name;
						fileName[i]=argument;	
					});
					
					arguments.argument= fileName;
					if(file.field!=0){
						ExecSQL.arguments=arguments;		
					}
				    }else if(!!file){//对象
				    	var arguments={
				    			argument:{
				    			}
						}
				    	arguments.argument = file.field;
					    ExecSQL.arguments=arguments;
				}else{
					ExecSQL.arguments=file;
				}
      	    	node.setStep(ExecSQL);//将步骤的配置属性放入节点中
      			console.log(node)
      			node.setTransfer();//存储要传递的字段
				$('#ExecSQL').window('close');//关闭窗口
			});
		}catch(e){
			console.log(e)
		}
	},
    onBeforeClose=function(){}

    return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}