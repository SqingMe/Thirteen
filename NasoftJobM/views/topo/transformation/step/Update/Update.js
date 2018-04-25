Nasoft.Topo.transferFns.Update=function(node){
	var DBLookup = [];
	return DBLookup;
};
Nasoft.Window.fns.Update=function(node){
	Nasoft.Ui_extend.browser_even('#Update');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			console.log("node="+node);
			$('#step_name_Update').textbox('setValue',node.text);//设置步骤名称
			var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(transferArry.length>0){
				var transfer=Nasoft.Util.transferArray_copy(transferArry);
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			
			if (node.getStep().commit == undefined) {
				$('#goal_submit_Update').textbox('setValue', '');
			} else {
				$('#goal_submit_Update').textbox('setValue', node.getStep().commit);
			}
			if (node.getStep().lookup.schema == undefined) {
				$('#goal_model_Update').textbox('setValue', '');
			} else {
				$('#goal_model_Update').textbox('setValue', node.getStep().lookup.schema);
			}
			if (node.getStep().lookup.table == undefined) {
				$('#goal_surface_Update').textbox('setValue', '');
			} else {
				$('#goal_surface_Update').textbox('setValue', node.getStep().lookup.table);
			}
			if (node.getStep().skip_lookup && node.getStep().skip_lookup === "N") {
				$('#skip_lookup_Update').get(0).checked = false;
			} else if (node.getStep().skip_lookup &&node.getStep().skip_lookup === "Y") {
				$('#skip_lookup_Update').get(0).checked = true;
			}
			if (node.getStep().use_batch && node.getStep().use_batch === "N") {
				$('#use_batch_Update').get(0).checked = false;
			} else if (node.getStep().use_batch &&node.getStep().use_batch === "Y") {
				$('#use_batch_Update').get(0).checked = true;
			}
			   var	connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
				$('#server_conner_Update').combobox({
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
			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			$('#Update_condition_table').datagrid({ 
				fit:true,
				rownumbers:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
			    data: !!step.lookup.key ? {total:1, rows:$.isArray(step.lookup.key)?
			    		step.lookup.key:[step.lookup.key]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					handler: function(){
						$('#Update_condition_table').datagrid(//新增加一行
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
						$('#Update_condition_table').datagrid('deleteSelections');
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
	                		},{
	                			label: '= ~NULL',
	                			value: '= ~NULL'
	                		}]      		
		            	}
			        }},
					{
						field : 'name',
						title : '流里的字段1',
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
						title : '流里的字段2',
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
							j===i || $('#Update_condition_table').datagrid('endEdit',j);
						});
		
			        	$(this).datagrid('beginEdit',i);//编辑点击的行
			        	$(this).datagrid('unselectRow', i);

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
			
			
			$('#Update_output_table').datagrid({ 
				fit:true,
				rownumbers:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
			    data: !!step.lookup.value ? {total:1, rows:$.isArray(step.lookup.value)?
			    		step.lookup.value:[step.lookup.value]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					handler: function(){
						$('#Update_output_table').datagrid(//新增加一行
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
						$('#Update_output_table').datagrid('deleteSelections');
					}
				}],
				
			    columns:[[
			         {field:'name',title:'表字段',width:150,editor:{
			        	 type:'text'
				        }}, 
				     {field:'rename',title:'流字段',width:150,editor:{
				    	 type : 'combobox',
							options : {
								valueField : "value",
								textField : "text",
								data : caltacomval
							}
					 }}
			    ]],
			    onClickRow:function(i,r){
				    	var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===i || $('#Update_output_table').datagrid('endEdit',j);
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
			
			
			$('#Update_cancel').unbind('click').click(function(e){//取消按钮
				$('#Update').window('close');
			});
			$('#Update_ok').unbind('click').click(function(e){//确认按钮
	          	 var Update = {};// 定义一个表输出对象	
	          	 var lookup={};
      			node.text = $('#step_name_Update').textbox('getValue');
      			Update.connection=node.getConnectionName();
      			Update.use_batch = $('#use_batch_Update').get(0).checked ? 'Y': 'N';
      			Update.skip_lookup = $('#skip_lookup_Update').get(0).checked ? 'Y': 'N';
      			Update.commit = $('#goal_submit_Update').textbox('getValue');;
      				lookup.schema=$('#goal_model_Update').textbox('getValue');
                	lookup.table=$('#goal_surface_Update').textbox('getValue');
    				var rows = $('#Update_condition_table').datagrid('getRows');// 获取当前页面中所有的行
    				$.each(rows, function(i, o) {
    					$('#Update_condition_table').datagrid('endEdit', i);// 结束编辑所有行
    				});
    				var file=Nasoft.GetProjectData.getFields('#Update_condition_table');//将对应数据字段加入表输出	
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
      			
    				var rowss = $('#Update_output_table').datagrid('getRows');// 获取当前页面中所有的行
    				$.each(rowss, function(i, o) {
    					$('#Update_output_table').datagrid('endEdit', i);// 结束编辑所有行
    				});
    				var files=Nasoft.GetProjectData.getFields('#Update_output_table');//将对应数据字段加入表输出	
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
    				Update.lookup=lookup;
      	    	node.setStep(Update);//将步骤的配置属性放入节点中
      			console.log(node)
      			node.setTransfer();//存储要传递的字段
				$('#Update').window('close');//关闭窗口
			});
		}catch(e){
			console.log(e)
		}
	},
    onBeforeClose=function(){}

    return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}