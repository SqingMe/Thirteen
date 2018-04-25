Nasoft.Topo.transferFns.IfNull=function(node){
	var DBLookup = [];
	return DBLookup;
};
Nasoft.Window.fns.IfNull=function(node){
	Nasoft.Ui_extend.browser_even('#IfNull');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			console.log("node="+node);
			$('#step_name_IfNull').textbox('setValue',node.text);//设置步骤名称
			var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(transferArry.length>0){
				var transfer=Nasoft.Util.transferArray_copy(transferArry);
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			
			node.getStep().setEmptyStringAll==='Y' && ($("#cache_IfNull").get(0).checked=true)
			node.getStep().setEmptyStringAll==='N' && ($("#cache_IfNull").get(0).checked=false);
			node.getStep().selectFields==='Y' && ($("#cache_IfNull_XZ").get(0).checked=true)
			node.getStep().selectFields==='N' && ($("#cache_IfNull_XZ").get(0).checked=false);
			node.getStep().selectValuesType==='Y' && ($("#cache_IfNull_ZLX").get(0).checked=true)
			node.getStep().selectValuesType==='N' && ($("#cache_IfNull_ZLX").get(0).checked=false);
			
			
			if(node.getStep().replaceAllByValue ==''||node.getStep().selectFields==='Y'||node.getStep().selectValuesType==='Y'||node.getStep().setEmptyStringAll==='Y'){
				$('#goal_model_IfNull').textbox('setValue','');
			}else{
				$('#goal_model_IfNull').textbox('setValue',node.getStep().replaceAllByValue);
			}
			$('#IFNULL_mask').combobox({
				valueField:'value',   //将connections的id字段绑定在下拉表单的value上 
				textField:'text',  //将connections的text字段绑定在下拉表单的显示字段上
				onLoadSuccess:function(data){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=node.getStep().replaceAllMask!=''&&node.getStep().selectFields==='N'&&node.getStep().selectValuesType==='N'&&node.getStep().setEmptyStringAll==='N'?node.getStep().replaceAllMask:'';
					console.log("dbconnection : "+connectionName)
					connectionName!='' && $(this).combobox('select',connectionName);
				}
			});
			 
			
			
			function ifnullfalse(){
			if($('#cache_IfNull_XZ').get(0).checked==false && $('#cache_IfNull_ZLX').get(0).checked==false){//指定日期时间格式状态判断
				$('#goal_model_IfNull').textbox({disabled:false});
				$('#cache_IfNull').attr({disabled:false});
				$('#IFNULL_mask').combobox({disabled:false});
			}else if($('#cache_IfNull_XZ').get(0).checked==true ||   $('#cache_IfNull_ZLX').get(0).checked==true){
				$('#goal_model_IfNull').textbox({disabled:true});
				$('#cache_IfNull').attr({disabled:true});
				$('#IFNULL_mask').combobox({disabled:true});
			}
			}
			ifnullfalse();
			$('#cache_IfNull_XZ').change(function(){
				ifnullfalse();
				if($('#cache_IfNull_XZ').get(0).checked==true){
					$('#cache_IfNull_ZLX').get(0).checked=false;
				}
			});
			$('#cache_IfNull_ZLX').change(function(){
				ifnullfalse();
				if($('#cache_IfNull_ZLX').get(0).checked==true){
					$('#cache_IfNull_XZ').get(0).checked=false;
				}
			});
			
			
			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			
		 	 $("#IfNull_condition_table").datagrid({
		 		data:!!node.getStep().valuetypes&&node.getStep().valuetypes.valuetype?{total:1, rows :$.isArray(node.getStep().valuetypes.valuetype)?
						node.getStep().valuetypes.valuetype:[node.getStep().valuetypes.valuetype]}:{total:0,rows:[]},	
		 		 singleSelect:true,
			 		fitColumns:true,
				 	 	toolbar:
				 	 		[{
		    					iconCls: 'icon-add',
		    					text:"增加",
		    					handler: function(){
		    						if($('#cache_IfNull_ZLX').get(0).checked==false){
		    							return;
		    						}
		    						$("#IfNull_condition_table").datagrid("appendRow",{
		    							name:"",
		    							value:"",
		    							mask:"",
		    							set_type_empty_string:"N"
	                                     });
		    					}
		    				},{
						iconCls: 'icon-remove',
						text:"删除",
						handler: function(){
							if($('#cache_IfNull_ZLX').get(0).checked==false){
    							return;
    						}
							var select = $("#IfNull_condition_table").datagrid("getSelected");
	    			 	 	var index = $("#IfNull_condition_table").datagrid("getRowIndex",select);
	    			 	 	$("#IfNull_condition_table").datagrid("deleteRow",index)
						}
					}
				 	 	],
				 	 		columns:[[
					 	 		 {field : "name",
						 	 		 title : "类型",
						 	 		 align : "center",
						 	 		 width : 100,
						 	 		 editor : {
						 	 		 	type : "combobox",
						 	 		 	options : {
											valueField : "value",
											textField : "text",
											editable : false,
											data : [
												{text:'-',value:'-'},
												{text:'Number',value:'Number'},
												{text:'String',value:'String'},
												{text:'Date',value:'Date'}
							           			,{text:'Boolean',value:'Boolean'},
							           			{text:'Integer',value:'Integer'},
							           			{text:'BigNumber',value:'BigNumber'},
							           			{text:'Serializable',value:'Serializable'}
							           			,{text:'Binary',value:'Binary'},
							           			{text:'Timestamp',value:'Timestamp'},
							           			{text:'Internet Address',value:'Internet Address'}
											]
										}
						 	 		 }
						 	 		},
						 	 		{field : "value",
						 	 		 title : "值替换为",
						 	 		 align : "center",
						 	 		 width : 100,
						 	 		 editor : {
						 	 		 	type : "text"
						 	 		 }
						 	 		},
						 	 		{field : "mask",
							 	 		 title : "日期(掩码)",
							 	 		 align : "center",
							 	 		 width : 100,
							 	 		 editor : {
							 	 		 	type : "combobox",
							 	 		 	options : {
							            		valueField: 'value',
							            		textField: 'text',
							            		editable : false,
							            		data:[{text:'yyyy/MM/dd HH:mm:ss.SSS',value:'yyyy/MM/dd HH:mm:ss.SSS'},{text:'yyyy/MM/dd HH:mm:ss',value:'yyyy/MM/dd HH:mm:ss'},{text:'yyyyMMddHHmmss',value:'yyyyMMddHHmmss'},{text:'yyyy/MM/dd',value:'yyyy/MM/dd'}
							           			,{text:'yyyy-MM-dd',value:'yyyy-MM-dd'},{text:'yyyy-MM-dd HH:mm:ss',value:'yyyy-MM-dd HH:mm:ss'},{text:'yyyyMMdd',value:'yyyyMMdd'},{text:'MM/dd/yyyy',value:'MM/dd/yyyy'}
							           			,{text:'MM/dd/yyyy HH:mm:ss',value:'MM/dd/yyyy HH:mm:ss'},{text:'MM-dd-yyyy',value:'MM-dd-yyyy'},{text:'MM-dd-yyyy HH:mm:ss',value:'MM-dd-yyyy HH:mm:ss'},{text:'MM/dd/yy',value:'MM/dd/yy'}
							           			,{text:'MM-dd-yy',value:'MM-dd-yy'},{text:'dd/MM/yyyy',value:'dd/MM/yyyy'},{text:'dd-MM-yyyy',value:'dd-MM-yyyy'}]
								        	} 	
							 	 		 },
								 	 		formatter:function(value, rowData, rowIndex){
								 	 			return value;
							 	 		}  
							 	 		},
						 	 		{field : "set_type_empty_string",
						 	 		 title : "设置空字符串",
						 	 		 align : "center",
						 	 		 width : 100,
						 	 		 editor : {
						 	 		 	type : "combobox",
						 	 		 	options : {
						            		valueField: 'value',
						            		textField: 'label',
						            		editable : false,
						            		data: [{
					                			label: '是',
					                			value: 'Y'
					                		},{
					                			label: '否',
					                			value: 'N'
					                		}]
							        	} 	
						 	 		 },
							 	 		formatter:function(value, rowData, rowIndex){
											if (value=='Y') {
												return value='是';
											}else{
												return value='否';
											}
						 	 		}  
						 	 		}
						 	 		]],
				 	 		onClickCell : function(index,field,value){
				 	 			var rows = $(this).datagrid("getRows");
		    			 	 	$.each(rows,function(i,o){
		    			 	 		$("#EVAL_FILES_METRICS_table").datagrid("endEdit",i);
		    			 	 	});
		    			 	 	
		    			 	 	if($('#cache_IfNull_ZLX').get(0).checked==false){
	    							return;
	    						}
		    			 	 	$(this).datagrid("beginEdit",index);
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
			
		 	 $("#IfNull_output_table").datagrid({
			 		data:!!node.getStep().fields&&node.getStep().fields.field?{total:1, rows :$.isArray(node.getStep().fields.field)?
							node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},
			 		 singleSelect:true,
			 		fitColumns:true,
				 	 	toolbar:
				 	 		[{
		    					iconCls: 'icon-add',
		    					text:"增加",
		    					handler: function(){
		    						if($('#cache_IfNull_XZ').get(0).checked==false){
		    							return;
		    						}
		    						$("#IfNull_output_table").datagrid("appendRow",{
		    							name:"",
		    							value:"",
		    							mask:"",
		    							set_empty_string:"N"
	                                     });
		    					}
		    				},{
						iconCls: 'icon-remove',
						text:"删除",
						handler: function(){
							if($('#cache_IfNull_XZ').get(0).checked==false){
    							return;
    						}
							var select = $("#IfNull_output_table").datagrid("getSelected");
	    			 	 	var index = $("#IfNull_output_table").datagrid("getRowIndex",select);
	    			 	 	$("#IfNull_output_table").datagrid("deleteRow",index)
						}
					}
				 	 	],
				 	 		columns:[[
				 	 		 {field : "name",
				 	 		 title : "字段",
				 	 		 align : "center",
				 	 		 width : 100,
				 	 		 editor : {
				 	 		 	type : "combobox",
				 	 		 	options : {
									valueField : "value",
									textField : "text",
									data : caltacomval
								}
				 	 		 }
				 	 		},
				 	 		{field : "value",
				 	 		 title : "值替换为",
				 	 		 align : "center",
				 	 		 width : 100,
				 	 		 editor : {
				 	 		 	type : "text"
				 	 		 }
				 	 		},
				 	 		{field : "mask",
					 	 		 title : "日期(掩码)",
					 	 		 align : "center",
					 	 		 width : 100,
					 	 		 editor : {
					 	 		 	type : "combobox",
					 	 		 	options : {
					            		valueField: 'value',
					            		textField: 'text',
					            		editable : false,
					            		data:[{text:'yyyy/MM/dd HH:mm:ss.SSS',value:'yyyy/MM/dd HH:mm:ss.SSS'},{text:'yyyy/MM/dd HH:mm:ss',value:'yyyy/MM/dd HH:mm:ss'},{text:'yyyyMMddHHmmss',value:'yyyyMMddHHmmss'},{text:'yyyy/MM/dd',value:'yyyy/MM/dd'}
					           			,{text:'yyyy-MM-dd',value:'yyyy-MM-dd'},{text:'yyyy-MM-dd HH:mm:ss',value:'yyyy-MM-dd HH:mm:ss'},{text:'yyyyMMdd',value:'yyyyMMdd'},{text:'MM/dd/yyyy',value:'MM/dd/yyyy'}
					           			,{text:'MM/dd/yyyy HH:mm:ss',value:'MM/dd/yyyy HH:mm:ss'},{text:'MM-dd-yyyy',value:'MM-dd-yyyy'},{text:'MM-dd-yyyy HH:mm:ss',value:'MM-dd-yyyy HH:mm:ss'},{text:'MM/dd/yy',value:'MM/dd/yy'}
					           			,{text:'MM-dd-yy',value:'MM-dd-yy'},{text:'dd/MM/yyyy',value:'dd/MM/yyyy'},{text:'dd-MM-yyyy',value:'dd-MM-yyyy'}]
						        	} 	
					 	 		 },
						 	 		formatter:function(value, rowData, rowIndex){
						 	 			return value;
					 	 		}  
					 	 		},
				 	 		{field : "set_empty_string",
				 	 		 title : "设置空字符串",
				 	 		 align : "center",
				 	 		 width : 100,
				 	 		 editor : {
				 	 		 	type : "combobox",
				 	 		 	options : {
				            		valueField: 'value',
				            		textField: 'label',
				            		editable : false,
				            		data: [{
			                			label: '是',
			                			value: 'Y'
			                		},{
			                			label: '否',
			                			value: 'N'
			                		}]
					        	} 	
				 	 		 },
					 	 		formatter:function(value, rowData, rowIndex){
									if (value=='Y') {
										return value='是';
									}else{
										return value='否';
									}
				 	 		}  
				 	 		}
				 	 		]],
				 	 		onClickCell : function(index,field,value){
				 	 			var rows = $(this).datagrid("getRows");
		    			 	 	$.each(rows,function(i,o){
		    			 	 		$("#EVAL_FILES_METRICS_table").datagrid("endEdit",i);
		    			 	 	});
		    			 	 	if($('#cache_IfNull_XZ').get(0).checked==false){
	    							return;
	    						}
		    			 	 	$(this).datagrid("beginEdit",index);
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
			
			$('#IfNull_cancel').unbind('click').click(function(e){//取消按钮
				$('#IfNull').window('close');
			});
			$('#IfNull_ok').unbind('click').click(function(e){//确认按钮
	          	 var IfNull = {};// 定义一个表输出对象	
	          	 node.text=$('#step_name_IfNull').textbox('getValue');//放入步骤名称
	          	 
	          	if($('#cache_IfNull').get(0).checked==false){
	          		IfNull.replaceAllByValue=$('#goal_model_IfNull').textbox('getValue');
	          		IfNull.replaceAllMask=$('#IFNULL_mask').combobox('getValue');
	          	}else{
	          		IfNull.replaceAllByValue='';
	          			IfNull.replaceAllMask='';
	          	}
	          	 
	          	IfNull.setEmptyStringAll=$("#cache_IfNull").prop("checked")? 'Y' : 'N'; 
	          	IfNull.selectFields=$("#cache_IfNull_XZ").prop("checked")? 'Y' : 'N'; 
	          	IfNull.selectValuesType=$("#cache_IfNull_ZLX").prop("checked")? 'Y' : 'N'; 
	          	
	          	var rows=$('#IfNull_output_table').datagrid('getRows');//获取当前页面中所有的行
					$.each(rows,function(i,o){
						$('#IfNull_output_table').datagrid('endEdit', i);//结束编辑所有行
					});
					var fields=Nasoft.GetProjectData.getFields('#IfNull_output_table');//将对应数据字段加入表输出
					IfNull.fields=fields;  
				
					var rowss=$('#IfNull_condition_table').datagrid('getRows');//获取当前页面中所有的行
					var valuetypes = {};
					valuetypes.valuetype = [];
					$.each(rowss,function(i,o){
						$('#IfNull_condition_table').datagrid('endEdit', i);//结束编辑所有行
						
						var ok;
						for ( var key in o) {
							console.log(o[key])
							var k;
							k = o[key] !== null && o[key] !== '';// 等于null等于'',都返回false
							if (k) {
								ok = true;
							}
						}
						ok && valuetypes.valuetype.push(o)// 有值就存入
					});
						if (valuetypes.valuetype.length === 1) {// 只有一行数据,返回一个object
							
							valuetypes.valuetype = valuetypes.valuetype[0];
							IfNull.valuetypes=valuetypes;
							
						} else if (valuetypes.valuetype.length === 0) {// 没有数据行,返回一个空字符串
						} else if (valuetypes.valuetype.length > 1){// 有多行数据返回一个array
							IfNull.valuetypes=valuetypes;			
						}
					
      	    	node.setStep(IfNull);//将步骤的配置属性放入节点中
      			console.log(node)
      			node.setTransfer();//存储要传递的字段
				$('#IfNull').window('close');//关闭窗口
			});
		}catch(e){
			console.log(e)
		}
	},
    onBeforeClose=function(){}

    return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}