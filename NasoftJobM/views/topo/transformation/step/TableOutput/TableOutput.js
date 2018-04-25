 Nasoft.Topo.transferFns.TableOutput=function(node){
	 return [{name:'TableOutput'}];
  };
Nasoft.Window.fns.TableOutput=function(node){
	Nasoft.Ui_extend.browser_even('#TableOutput');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){			
			console.log(node)
			var tab=$('#stepTabs').tabs('getSelected');
			try{
				connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
				$('#step_name_tableOutput').textbox('setValue',node.text);
				$('#dataBaseTableName').textbox('setValue',node.getStep().table);
				$('#tbout_connection').combobox({    
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
						console.log(connectionName)
						connectionName!='' && $(this).combobox('select',connectionName);
					},
					onChange:function(newValue,oldValue){
						$.each(connections,function(i,o){//遍历下拉表单的所有数据项
							if(newValue==o.name){//筛选出当前点击的下拉表单项的connection
								//当选项发生改变时将当前被选项的name赋值个node的connectionName
								node.setConnectionName(o.name);
							}
						});
					}
				});
				console.log(node.getStep())
				$('#table_field').datagrid({
				    data:!!node.getStep().fields?{total:1, rows:$.isArray(node.getStep().fields.field)?
				    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},				    		
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
						text : "新增字段",
						handler: function(){
							$('#table_field').datagrid(//新增加一行
									'appendRow',
									{
										column_name:'', 
										stream_name:''
									});}
					},{
						text : "删除字段",
						iconCls : 'icon-remove',
						handler : function() {
//							var del_row = $('#table_field').datagrid('getSelected');
//							var del_rowIndex = $('#table_field').datagrid('getRowIndex',del_row);
//							$('#table_field').datagrid('deleteRow',del_rowIndex);
							$('#table_field').datagrid('deleteSelections');
						}
					}
					],
					columns:[[    
					          {field:'column_name',title:'表字段',width:100,editor:{
					        	  type:'text'
					          }},    
					          {field:'stream_name',title:'流字段',width:100,editor:{
					        	  type:'text'
					          }},    
					          ]],
					          onLoadSuccess:function(data){
					        	
					          },
					          
					          onDblClickCell:function(index, field, value){
					        	  console.log(field)
					        	  $('#table_field').datagrid('beginEdit', index);//编辑点击的行
					        	  var ed = $('#table_field').datagrid('getEditor', {index:index,field:field});
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
				    $('#tableOutput_ok').unbind('click').click(function(){
				    	 var  TableOutput={};//定义一个表输出对象
							var rows=$('#table_field').datagrid('getRows');//获取当前页面中所有的行
							$.each(rows,function(i,o){
								$('#table_field').datagrid('endEdit', i);//结束编辑所有行
							});
							var fields=Nasoft.GetProjectData.getFields('#table_field');//将对应数据字段加入表输出
							TableOutput.fields=fields;  
							var tableName=$('#dataBaseTableName').textbox('getValue');
							TableOutput.table=!!tableName?tableName:'';
							TableOutput.connection=node.getConnectionName();
							node.text=$('#step_name_tableOutput').textbox('getValue');	
							node.setStep(TableOutput);//将步骤的配置属性放入节点中
							console.log(TableOutput);
					      $('#TableOutput').window('close');//关闭弹窗 
				});
				    $('#tableOutput_cancel').unbind('click').click(function(){
			
					      $('#TableOutput').window('close');//关闭弹窗 
				});
			}catch (e) {
				console.log(e)
			}
			
      },
      onBeforeClose=function(){
     }
     return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}

      