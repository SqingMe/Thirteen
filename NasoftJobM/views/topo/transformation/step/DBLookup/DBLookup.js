Nasoft.Topo.transferFns.DBLookup=function(node){
	var DBLookup = [];
	if(!!node.getStep().lookup.value){
//		var type = judgeType(node.getStep().fields.field);
		var rows = node.getStep().lookup.value;
		if(!!rows&&(node.getStep().lookup.value) == Array){
			$.each(rows,function(i,o){
				var field={};
				if(o.rename!=null&&o.rename!=''){
					field.name=o.rename;
					field.type=o.type;
					DBLookup.push(field);
				}else{
					field.name=o.name;
					field.type=o.type;
					DBLookup.push(field);
				}
			});
		}
	}
	return DBLookup;
};
Nasoft.Window.fns.DBLookup=function(node){
	Nasoft.Ui_extend.browser_even('#DBLookup');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			console.log("node="+node);
			$('#step_name_DBLookup').textbox('setValue',node.text);//设置步骤名称
			var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(transferArry.length>0){
				var transfer=Nasoft.Util.transferArray_copy(transferArry);
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			if (node.getStep().cache && node.getStep().cache === "N") {
				$('#cache_DBLookup').get(0).checked = false;
				$('#cache_size_DBLookup').textbox('disable');
				$('#cache_table_DBLookup').prop('disabled', true);
				$('#cache_result_DBLookup').prop('disabled', false);

			} else if (node.getStep().cache &&node.getStep().cache === "Y") {
				$('#cache_DBLookup').get(0).checked = true;
				$('#cache_size_DBLookup').textbox('enable');
				$('#cache_result_DBLookup').prop('disabled', true);
				$('#cache_table_DBLookup').prop('disabled', false);
			}
			
			if (node.getStep().cache_load_all && node.getStep().cache_load_all === "N") {
				$('#cache_table_DBLookup').get(0).checked = false;
			} else if (node.getStep().cache_load_all && node.getStep().cache_load_all === "Y") {
				$('#cache_table_DBLookup').get(0).checked = true;
			}
			if (node.getStep().lookup.eat_row_on_failure && node.getStep().lookup.eat_row_on_failure === "N") {
				$('#cache_ignore_DBLookup').get(0).checked = false;
			} else if (node.getStep().lookup.eat_row_on_failure && node.getStep().lookup.eat_row_on_failure === "Y") {
				$('#cache_ignore_DBLookup').get(0).checked = true;
			}
			if (node.getStep().lookup.fail_on_multiple && node.getStep().lookup.fail_on_multiple === "N") {
				$('#cache_result_DBLookup').get(0).checked = false;
			} else if (node.getStep().lookup.fail_on_multiple && node.getStep().lookup.fail_on_multiple === "Y") {
				$('#cache_result_DBLookup').get(0).checked = true;
			}
			if (node.getStep().cache_size == undefined) {
				$('#cache_size_DBLookup').textbox('setValue', '');
			} else {
				$('#cache_size_DBLookup').textbox('setValue', node.getStep().cache_size);
			}
			if (node.getStep().lookup.schema == undefined) {
				$('#goal_model_DBLookup').textbox('setValue', '');
			} else {
				$('#goal_model_DBLookup').textbox('setValue', node.getStep().lookup.schema);
			}
			if (node.getStep().lookup.table == undefined) {
				$('#goal_surface_DBLookup').textbox('setValue', '');
			} else {
				$('#goal_surface_DBLookup').textbox('setValue', node.getStep().lookup.table);
			}
			   var	connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
				$('#server_conner_DBLookup').combobox({
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
			$('#cache_DBLookup').unbind('click').click(function(e){//使用缓存
				if($('#cache_DBLookup').get(0).checked){
					$('#cache_size_DBLookup').textbox('enable');
					$('#cache_result_DBLookup').prop('disabled', true);
					$('#cache_table_DBLookup').prop('disabled', false);
				}else{
					$('#cache_size_DBLookup').textbox('disable');
					$('#cache_table_DBLookup').prop('disabled', true);
					$('#cache_result_DBLookup').prop('disabled', false);
				}
			});
			
			var step = node.getStep();//获取步骤对象		
			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			$('#DBLookup_condition_table').datagrid({ 
				fit:true,
				rownumbers:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				ctrlSelect:true,
				checkOnSelect:false,
			    data: !!step.lookup.key ? {total:1, rows:$.isArray(step.lookup.key)?
			    		step.lookup.key:[step.lookup.key]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					handler: function(){
						$('#DBLookup_condition_table').datagrid(//新增加一行
								'appendRow',
								{
									'field':'', 
									condition:'',
									name:'',
									name2:''
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						$('#DBLookup_condition_table').datagrid('deleteSelections');
					}
				}],
				
			    columns:[[
			        {field:'field',title:'表字段',width:150,editor:{
			        	 type:'text'
				        }}, 
			        {field:'condition', title:'类型',width:150,editor:{
			            type:'combobox',
		            	options:{
		            		valueField: 'label',	 
		            		textField: 'value',
		            		editable:false,
	                    	data: [{
	                			label: '=',
	                			value: '='
	                		},{
	                			label: '<>',
	                			value: '<>'
	                		},{
	                			label: '<',
	                			value: '<'
	                		},{
	                			label: '<=',
	                			value: '<='
	                		},{
	                			label: '>',
	                			value: '>'
	                		},{
	                			label: '>=',
	                			value: '>='
	                		},{
	                			label: 'LIKE',
	                			value: 'LIKE'
	                		},{
	                			label: 'BETWEEN',
	                			value: 'BETWEEN'
	                		},{
	                			label: 'IS NULL',
	                			value: 'IS NULL'
	                		},{
	                			label: 'IS NOT NULL',
	                			value: 'IS NOT NULL'
	                		}]      		
		            	}
			        }},
					{
						field : 'name',
						title : '字段1',
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
						field : 'name2',
						title : '字段2',
						width : 100,
						editor : {
							type : 'combobox',
							options : {
								valueField : "value",
								textField : "text",
								data : caltacomval
							}
						}
					}
			    ]],
			    onClickRow:function(i,r){
				    	var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===i || $('#DBLookup_condition_table').datagrid('endEdit',j);
						});
		
			        	$(this).datagrid('beginEdit',i);//编辑点击的行
			        	$(this).datagrid('unselectRow',i);

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
			
			
			$('#DBLookup_output_table').datagrid({ 
				fit:true,
				rownumbers:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				ctrlSelect:true,
				checkOnSelect:false,
			    data: !!step.lookup.value ? {total:1, rows:$.isArray(step.lookup.value)?
			    		step.lookup.value:[step.lookup.value]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					handler: function(){
						$('#DBLookup_output_table').datagrid(//新增加一行
								'appendRow',
								{
									name:'', 
									rename:'',
								    'default':'',
								    type:''
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						$('#DBLookup_output_table').datagrid('deleteSelections');
					}
				}],
				
			    columns:[[
			         {field:'name',title:'字段',width:150,editor:{
			        	 type:'text'
				        }}, 
				     {field:'rename',title:'新名称',width:150,editor:{
				        	 type:'text'
					 }}, 
					 {field:'default',title:'默认',width:150,editor:{
			        	 type:'text'
				     }},
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
			        }}
			    ]],
			    onClickRow:function(i,r){
				    	var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===i || $('#DBLookup_output_table').datagrid('endEdit',j);
						});
		
			        	$(this).datagrid('beginEdit',i);//编辑点击的行
			        	$(this).datagrid('unselectRow',i);

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
			
			
			$('#DBLookup_cancel').unbind('click').click(function(e){//取消按钮
				$('#DBLookup').window('close');
			});
			$('#DBLookup_ok').unbind('click').click(function(e){//确认按钮
	          	 var DBLookup = {};// 定义一个表输出对象	
	          	 var lookup={};
      			node.text = $('#step_name_DBLookup').textbox('getValue');
      			DBLookup.connection=node.getConnectionName();
      			DBLookup.cache = $('#cache_DBLookup').get(0).checked ? 'Y': 'N';
      			DBLookup.cache_load_all = $('#cache_table_DBLookup').get(0).checked ? 'Y': 'N';
      			DBLookup.cache_size=$('#cache_size_DBLookup').textbox('getValue');
      				lookup.schema=$('#goal_model_DBLookup').textbox('getValue');
                	lookup.table=$('#goal_surface_DBLookup').textbox('getValue');
                	lookup.orderby=null;
                	lookup.fail_on_multiple=$('#cache_result_DBLookup').get(0).checked ? 'Y': 'N';
                	lookup.eat_row_on_failure=$('#cache_ignore_DBLookup').get(0).checked ? 'Y': 'N';
    				var rows = $('#DBLookup_condition_table').datagrid('getRows');// 获取当前页面中所有的行
    				$.each(rows, function(i, o) {
    					$('#DBLookup_condition_table').datagrid('endEdit', i);// 结束编辑所有行
    				});

    				
    				var file=Nasoft.GetProjectData.getFields('#DBLookup_condition_table');//将对应数据字段加入表输出	
    				if(!!file&&file.field.constructor==Array){//数组
    					var key = [];
    					$.each(file.field,function(i,o){
    						key.push(o);
    					});
    					lookup.key=key;
    				    }else if(!!file){//对象
    					    var oldFile = file.field;
    					    lookup.key = [oldFile];
    				}
      			
    				var rowss = $('#DBLookup_output_table').datagrid('getRows');// 获取当前页面中所有的行
    				$.each(rowss, function(i, o) {
    					$('#DBLookup_output_table').datagrid('endEdit', i);// 结束编辑所有行
    				});
    				var files=Nasoft.GetProjectData.getFields('#DBLookup_output_table');//将对应数据字段加入表输出	
    				if(!!files&&files.field.constructor==Array){//数组
    					var value = [];
    					$.each(files.field,function(i,o){
    						value.push(o);
    					});
    					lookup.value=value;
    				    }else if(!!files){//对象
    					    var oldFile = files.field;
    					    lookup.value = [oldFile];
    				}
                DBLookup.lookup=lookup;
      	    	node.setStep(DBLookup);//将步骤的配置属性放入节点中
      			console.log(node)
      			node.setTransfer();//存储要传递的字段
				$('#DBLookup').window('close');//关闭窗口
			});
		}catch(e){
			console.log(e)
		}
	},
    onBeforeClose=function(){}

    return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}