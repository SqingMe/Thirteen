Nasoft.Topo.transferFns.UserDefinedJavaClass=function(node){
	var fds = [];
	 var file=node.getStep().fields;//将对应数据字段加入表输出
	 var textFileInput = [];
	 if(!!file.field){		 
		 if(file.field.constructor==Array){//数组		
			 $.each(file.field,function(i,o){
				 var field={};
				 field.name= o.field_name;
				 field.type=o.field_type;
				 field.length=o.field_length;
				 field.precision=o.field_precision;
				 fds.push(field)
			 });		
		 }else{//对象
			 var oldFile ={} 
			 oldFile.name=file.field.field_name;
			 oldFile.type=file.field.field_type;
			 oldFile.length=file.field.field_length;
			 oldFile.precision=file.field.field_precision;
			 fds.push(oldFile)
		 }
	 }
	return fds;
};
Nasoft.Window.fns.UserDefinedJavaClass=function(node){
				Nasoft.Ui_extend.browser_even('#UserDefinedJavaClass');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		    var editor= null;
		    			$('#step_name_UserDefinedJavaClass').textbox('setValue',node.text);
						var creatTab=Nasoft.Util.createTab('UserDefinedJavaClass_java_tab');//创建一个tab实例
						creatTab.tabs({
							fit:true,
						});
					function createIDE(){//创建一个文本输入
							var ide=document.createElement('div');
							ide.style.width='99%';
							ide.style.height='98%';
							ide.style.resize='none';
							ide.style.border='none';
							return ide;
						};
						var createTitle=function(){
							var title,tabs;
						tabs=creatTab.tabs('tabs');
						title='Processor';
							$.each(tabs,function(i,o){
								if(o.panel('options').title===title){
									title=createTitle();
								}
							});
							return title;
						};
					function addTab(title){//添加一个tab
							//启用提示菜单
						    ace.require("ace/ext/language_tools");
							var title=title || createTitle(),
							content=createIDE();
							editor = Nasoft.Util.createEditor({
								mode:"java",
								ele:content
							});
						   
							creatTab.tabs('add',{
								title:title,
								content:content
							});	
							return editor;
						};
						$('#UserDefinedJavaClass_java_tree').tree({    
							 url: $.getRootPath() +"/views/topo/transformation/step/UserDefinedJavaClass/UserDefinedJavaClassTree.json",
							 onDblClick: function(node){
								 if(node.codeArc){
									 var arc = node.codeArc;
									 // 请求数据表格的数据
									 $.ajax({
										 url:arc,
										 async:false,
										 dataType:'text',
										 type:'POST',
										 success:function(data){
											 editor.insert(data);
										 }
									 });
								 }else if(node.codeBrc){
									 var Brc = node.codeBrc;
									 editor.insert(Brc);
								}
							 },
							 onLoadSuccess:function(data){

									var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
									if(!!transferArry){
									var transname=getname_UserDefinedJavaClass_transfer(transferArry);
									transname=Nasoft.Util.transferFns_repeat_filed(transname);
									var tree_a = $('#UserDefinedJavaClass_java_tree').tree('find', 2);
									var tree_b = $('#UserDefinedJavaClass_java_tree').tree('find', 4);
									
									
									$('#UserDefinedJavaClass_java_tree').tree('append', {
										parent: tree_a.target,
										data: tree_opention(transname,2)
									});
									$('#UserDefinedJavaClass_java_tree').tree('append', {
										parent: tree_b.target,
										data: tree_opention(transname,4)
									});
									}
									if(!!node.getStep().fields&&node.getStep().fields.field){
										    	var fields=node.getStep().fields.field;	
										    	if($.isArray(fields)){
										    		$('#UserDefinedJavaClass_java_tree').tree('append', {
														parent: tree_b.target,
														data: tree_opention(fields,5)
													});
										    	}	
									}
							 }
						}); 
						
						function tree_opention(transname,j){
							var data_a=[];
							for(var i=0;i<transname.length;i++){
								var data={};
								if(j==2 ||j==4){
								data.text=transname[i].name;
								data.state='closed';
								data.children=tree_children(transname[i],j);
								if(j==2){
									data.codeBrc='get(Fields.In, "'+data.text+'")';
								}else if(j==4){
									data.codeBrc='get(Fields.Out, "'+data.text+'")';
								}
								}else if(j==5){
									data.text=transname[i].field_name;
									data.state='closed';
									data.children=tree_children(transname[i],j);
									data.codeBrc='get(Fields.Out, "'+data.text+'")';
								}
								
								data_a.push(data);
							}
							return data_a;
						}
						function tree_children(data,j){
							var data_b_children=[]
							for(var i=0;i<2;i++){
								var data_b_children_a={};
								data_b_children_a.text=tree_children_a(i,data,j);
								data_b_children_a.codeBrc=tree_children_b(i,data,j);
								data_b_children.push(data_b_children_a);
							}
							return data_b_children;
						}
						function tree_children_a(i,data,j){
							var name;
							if(i==0 && (j==2|| j==4)){
								if(data.type=='None'){
									name='getString( )';
								}else{
									name='get'+data.type+'( )';
								}
							}else if(i==0 &&j==5){
								name='get'+data.field_type+'( )';
							}else{
								name='setValue( )';
							}
							return name;
						}
						function tree_children_b(i,data,j){
							var name;
							if(i==0){
								var data_a;
								if(j==2 ||j==4){
									data_a=data.type;
								}else if(j==5){
									data_a=data.field_type
								}
								switch (data_a) {
							    case "String":
							    	if(j==2){
							    		name='String '+data.name+'=  get(Fields.In,"'+data.name+'").getString(r);'
							    	}else if(j==4){
							    		name='String '+data.name+'=  get(Fields.Out,"'+data.name+'").getString(r);'
							    	}else if(j==5){
							    		name='String '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getString(r);'
							    	}
							        break;
							    case "Date":
							    	if(j==2){
							    		name='Date '+data.name+'=  get(Fields.In,"'+data.name+'").getDate(r);'
							    	}else if(j==4){
							    		name='Date '+data.name+'=  get(Fields.Out,"'+data.name+'").getDate(r);'
							    	}else if(j==5){
							    		name='Date '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getDate(r);'
							    	}
							        break;
							    case "Number":
							    	if(j==2){
							    		name='Double '+data.name+'=  get(Fields.In,"'+data.name+'").getNumber(r);'
							    	}else if(j==4){
							    		name='Double '+data.name+'=  get(Fields.Out,"'+data.name+'").getNumber(r);'
							    	}else if(j==5){
							    		name='Double '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getNumber(r);'
							    	}
							        break;
							    case "InternetAddress":
							    	if(j==2){
							    		name='Object '+data.name+'=  get(Fields.In,"'+data.name+'").getInternet Address(r);'
							    	}else if(j==4){
							    		name='Object '+data.name+'=  get(Fields.Out,"'+data.name+'").getInternet Address(r);'
							    	}else if(j==5){
							    		name='Object '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getInternet Address(r);'
							    	}
							        break;
							    case "BigNumber":
							    	if(j==2){
							    		name='BigDecimal '+data.name+'=  get(Fields.In,"'+data.name+'").getBigNumber(r);'
							    	}else if(j==4){
							    		name='BigDecimal '+data.name+'=  get(Fields.Out,"'+data.name+'").getBigNumber(r);'
							    	}else if(j==5){
							    		name='BigDecimal '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getBigNumber(r);'
							    	}
							        break;
							    case "Integer":
							    	if(j==2){
							    		name='Long '+data.name+'=  get(Fields.In,"'+data.name+'").getInteger(r);'
							    	}else if(j==4){
							    		name='Long '+data.name+'=  get(Fields.Out,"'+data.name+'").getInteger(r);'
							    	}else if(j==5){
							    		name='Long '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getInteger(r);'
							    	}
							        break;
							    case "Boolean":
							    	if(j==2){
							    		name='Boolean '+data.name+'=  get(Fields.In,"'+data.name+'").getBoolean(r);'
							    	}else if(j==4){
							    		name='Boolean '+data.name+'=  get(Fields.Out,"'+data.name+'").getBoolean(r);'
							    	}else if(j==5){
							    		name='Boolean '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getBoolean(r);'
							    	}
							        break;
							    case "Timestamp":
							    	if(j==2){
							    		name='Object '+data.name+'=  get(Fields.In,"'+data.name+'").getTimestamp(r);'
							    	}else if(j==4){
							    		name='Object '+data.name+'=  get(Fields.Out,"'+data.name+'").getTimestamp(r);'
							    	}else if(j==5){
							    		name='Object '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getTimestamp(r);'
							    	}
							        break;
							    case "Binary":
							    	if(j==2){
							    		name='byte[] '+data.name+'=  get(Fields.In,"'+data.name+'").getBinary(r);'
							    	}else if(j==4){
							    		name='byte[] '+data.name+'=  get(Fields.Out,"'+data.name+'").getBinary(r);'
							    	}else if(j==5){
							    		name='byte[] '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getBinary(r);'
							    	}
							        break;
							    default:
							    	if(j==2){
							    		name='String '+data.name+'=  get(Fields.In,"'+data.name+'").getString(r);'
							    	}else if(j==4){
							    		name='String '+data.name+'=  get(Fields.Out,"'+data.name+'").getString(r);'
							    	}else if(j==5){
							    		name='Object '+data.field_name+'=  get(Fields.Out,"'+data.field_name+'").getNone(r);'
							    	}
							    	
							}
							}else{
								if(j==2){
									
									name='get(Fields.In, "'+data.name+'").setValue(r, value);';
								}else if(j==4){
									name='get(Fields.Out, "'+data.name+'").setValue(r, value);';
								}else if(j==5){
									name='get(Fields.Out, "'+data.field_name+'").setValue(r, value);';
								}
							}
							return name;
						}
						function getname_UserDefinedJavaClass_transfer(transfer){
							var data=[]
							for (var i = 0; i < transfer.length; i++) {			
								var data_a={}
								data_a.name=transfer[i].name;
								data_a.type=transfer[i].type;
								data.push(data_a)
							}
							return data;
						}
						 if($.isArray(node.getStep().definitions.definition)){//有多个java脚本
//							for(var i=0;i<node.getStep().definitions.definition.length;i++){
//								var tab=addTab(node.getStep().definitions.definition[i].class_name);
//								$(tab).val(node.getStep().definitions.definition[i].class_source);//初始化,添加一个tab,并填充脚本代码
//							}
						 }else{
							//初始化,添加一个tab,并填充脚本代码
							 editor=addTab(node.getStep().definitions.definition.class_name);
						     var class_source=node.getStep().definitions.definition.class_source;
							 if(class_source&&class_source.indexOf("<![CDATA[")!=-1 ){
								 var cc=class_source.slice(9,class_source.length-3)
								 editor.setValue(cc);
								}else if(class_source){
								 editor.setValue(class_source);
								}
						 }
						 if (node.getStep().clear_result_fields && node.getStep().clear_result_fields === "N") {
								$('#Execute_UserDefinedJavaClass').get(0).checked = false;
							} else if (node.getStep().clear_result_fields && node.getStep().clear_result_fields === "Y") {
								$('#Execute_UserDefinedJavaClass').get(0).checked = true;
							}
						 if(!!node.getStep().fields&&node.getStep().fields.field){
							 var fields_a=node.getStep().fields.field;
							 if($.isArray(fields_a)){
									$.each(fields_a,function(i,o){
				    					if(o.field_type=='None'){
				    						o.field_type = 'None';
				    					}
				    					if(o.field_length =='-1'){
				    						o.field_length = '';
				    					}
				    					if(o.field_precision=='-1'){
				    						o.field_precision = '';
				    					}
				    				});
							 }
						 }
							$('#UserDefinedJavaClass_field_table').datagrid({//字段的界面  
								fit:true,
								rownumbers:true,
								singleSelect:true,
								fitColumns:true,
							    data:!!node.getStep().fields&&node.getStep().fields.field?{total:1, rows:$.isArray(node.getStep().fields.field)?
							    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},		
								toolbar: [{
									iconCls: 'icon-add',
									text : "增加",
									fitColumns:true,
									handler: function(){//添加一行
										$('#UserDefinedJavaClass_field_table').datagrid(//新增加一行
												'appendRow',
												{
													field_name:'', 
													field_type:'',
													field_length:'',
													field_precision:'',
												});}
								},{
									text : "删除",
									iconCls : 'icon-remove',
									handler : function() {
										var del_row = $('#UserDefinedJavaClass_field_table').datagrid('getSelected');
										var del_rowIndex = $('#UserDefinedJavaClass_field_table').datagrid('getRowIndex',del_row);
										$('#UserDefinedJavaClass_field_table').datagrid('deleteRow',del_rowIndex);
									}
								}],
								
							    columns:[[    
							        {field:'field_name',title:'名称',width:100,editor:{type:'text'}},    
							        {field:'field_type',title:'类型',width:100,editor:{
							        	 type:'combobox',
							        	 options:{
							            		valueField: 'label',
							            		textField: 'value',
							            		editable : false,
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
						                		}],
						                		onSelect : function(newValue){
						                			change(newValue.value);			
						                		}
							        	 }
							        }},    
							        {field:'field_length',title:'长度',width:100,editor:{type:'text'}},  
							        {field:'field_precision',title:'精度',width:100,editor:{type:'text'}}, 
							    ]],
					    		onClickRow:function(i,r){
							    	var rows=$(this).datagrid('getRows');
									$.each(rows,function(j,o){
										j===i || $('#UserDefinedJavaClass_field_table').datagrid('endEdit',j);
									});

						        	$(this).datagrid('beginEdit',i);//编辑点击的行
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
							$('#UserDefinedJavaClass_parameter_table').datagrid({//参数的界面  
								fit:true,
								rownumbers:true,
								singleSelect:true,
								fitColumns:true,
							    data:!!node.getStep().usage_parameters&&node.getStep().usage_parameters.usage_parameter?{total:1, rows:$.isArray(node.getStep().usage_parameters.usage_parameter)?
							    		node.getStep().usage_parameters.usage_parameter:[node.getStep().usage_parameters.usage_parameter]}:{total:0,rows:[]},		
								toolbar: [{
									iconCls: 'icon-add',
									text : "增加",
									fitColumns:true,
									handler: function(){//添加一行
										$('#UserDefinedJavaClass_parameter_table').datagrid(//新增加一行
												'appendRow',
												{
													parameter_tag:'', 
													parameter_value:'',
													parameter_description:'',
												});}
								},{
									text : "删除",
									iconCls : 'icon-remove',
									handler : function() {
										var del_row = $('#UserDefinedJavaClass_parameter_table').datagrid('getSelected');
										var del_rowIndex = $('#UserDefinedJavaClass_parameter_table').datagrid('getRowIndex',del_row);
										$('#UserDefinedJavaClass_parameter_table').datagrid('deleteRow',del_rowIndex);
									}
								}],
								
							    columns:[[    
							        {field:'parameter_tag',title:'标签',width:100,editor:{type:'text'}},    
							        {field:'parameter_value',title:'值',width:100,editor:{type:'text'}},  
							        {field:'parameter_description',title:'描述',width:100,editor:{type:'text'}}, 
							    ]],
					    		onClickRow:function(i,r){
							    	var rows=$(this).datagrid('getRows');
									$.each(rows,function(j,o){
										j===i || $('#UserDefinedJavaClass_parameter_table').datagrid('endEdit',j);
									});

						        	$(this).datagrid('beginEdit',i);//编辑点击的行
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
							
							
					$('#UserDefinedJavaClass_information_table').datagrid({//消息步骤的界面  
						fit:true,
						rownumbers:true,
						singleSelect:true,
						fitColumns:true,
					    data:!!node.getStep().info_steps&&node.getStep().info_steps.info_step?{total:1, rows:$.isArray(node.getStep().info_steps.info_step)?
					    		node.getStep().info_steps.info_step:[node.getStep().info_steps.info_step]}:{total:0,rows:[]},		
						toolbar: [{
							iconCls: 'icon-add',
							text : "增加",
							fitColumns:true,
							handler: function(){//添加一行
								$('#UserDefinedJavaClass_information_table').datagrid(//新增加一行
										'appendRow',
										{
											step_tag:'', 
											step_name:'',
											step_description:'',
										});}
						},{
							text : "删除",
							iconCls : 'icon-remove',
							handler : function() {
								var del_row = $('#UserDefinedJavaClass_information_table').datagrid('getSelected');
								var del_rowIndex = $('#UserDefinedJavaClass_information_table').datagrid('getRowIndex',del_row);
								$('#UserDefinedJavaClass_information_table').datagrid('deleteRow',del_rowIndex);
							}
						}],
						
					    columns:[[    
					        {field:'step_tag',title:'标签',width:100,editor:{type:'text'}},    
					        {field:'step_name',title:'步骤',width:100,editor:{
					        	 type:'combobox',
					        	 options:{
					        		 valueField :"value",
									 textField : "text",
									 data : UserDefinedJavaClass_steptname()
					        	 },
					        }},    
					        {field:'step_description',title:'描述',width:100,editor:{type:'text'}},  
					    ]],
			    		onClickRow:function(i,r){
					    	var rows=$(this).datagrid('getRows');
							$.each(rows,function(j,o){
								j===i || $('#UserDefinedJavaClass_information_table').datagrid('endEdit',j);
							});
				        	$(this).datagrid('beginEdit',i);//编辑点击的行
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
					$('#UserDefinedJavaClass_goal_table').datagrid({//目标步骤的界面  
						fit:true,
						rownumbers:true,
						singleSelect:true,
						fitColumns:true,
					    data:!!node.getStep().target_steps&&node.getStep().target_steps.target_step?{total:1, rows:$.isArray(node.getStep().target_steps.target_step)?
					    		node.getStep().target_steps.target_step:[node.getStep().target_steps.target_step]}:{total:0,rows:[]},		
						toolbar: [{
							iconCls: 'icon-add',
							text : "增加",
							fitColumns:true,
							handler: function(){//添加一行
								$('#UserDefinedJavaClass_goal_table').datagrid(//新增加一行
										'appendRow',
										{
											step_tag:'', 
											step_name:'',
											step_description:'',
										});}
						},{
							text : "删除",
							iconCls : 'icon-remove',
							handler : function() {
								var del_row = $('#UserDefinedJavaClass_goal_table').datagrid('getSelected');
								var del_rowIndex = $('#UserDefinedJavaClass_goal_table').datagrid('getRowIndex',del_row);
								$('#UserDefinedJavaClass_goal_table').datagrid('deleteRow',del_rowIndex);
							}
						}],
						
					    columns:[[    
					        {field:'step_tag',title:'标签',width:100,editor:{type:'text'}},    
					        {field:'step_name',title:'步骤',width:100,editor:{
					        	 type:'combobox',
					        	 options:{
					        		 valueField :"value",
									 textField : "text",
									 data : UserDefinedJavaClass_next_steptname()
					        	 },
					        }},    
					        {field:'step_description',title:'描述',width:100,editor:{type:'text'}},  
					    ]],
			    		onClickRow:function(i,r){
					    	var rows=$(this).datagrid('getRows');
							$.each(rows,function(j,o){
								j===i || $('#UserDefinedJavaClass_goal_table').datagrid('endEdit',j);
							});
				        	$(this).datagrid('beginEdit',i);//编辑点击的行
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
					
					
					//步骤读取的文件名来自
					function UserDefinedJavaClass_steptname(){
						var stepName=Nasoft.Topo.getStepName(node);			
						var data=[]
						if(stepName!=null){
								for (var i = 0; i < stepName.length; i++) {		
									var data_a={"text":stepName[i].text,"value":stepName[i].text}
									data.push(data_a)
								}
								return data;
						    }else{
						    	var data_b={"text":'',"value":''}
						    	data.push(data_b);
						    	return data;
						    }
					}
				function getStepNextName(node){
						  if(!!node.outLinks && node.outLinks.length > 0){
							  var stepname=[];
								for (var i = 0; i < node.outLinks.length; i++) {
									var nodeZ={}
									nodeZ.text= node.outLinks[i].nodeZ.text//获取上个节点的name名称
									stepname.push(nodeZ)
								}
								return stepname
						  }else{
							  return null;
						  }
					  }; 
					//步骤读取的文件名来自
					function UserDefinedJavaClass_next_steptname(){
						var stepName=getStepNextName(node);			
						var data=[]
						if(stepName!=null){
								for (var i = 0; i < stepName.length; i++) {		
									var data_a={"text":stepName[i].text,"value":stepName[i].text}
									data.push(data_a)
								}
								return data;
						    }else{
						    	var data_b={"text":'',"value":''}
						    	data.push(data_b);
						    	return data;
						    }
					}
						    //点击保存按钮
							$('#UserDefinedJavaClass_ok').unbind('click').click(function(e){
								 var UserDefinedJavaClass = {};// 定义一个表输出对象	
					      			node.text = $('#step_name_UserDefinedJavaClass').textbox('getValue');
					      		    var rows = $('#UserDefinedJavaClass_field_table').datagrid('getRows');// 获取当前页面中所有的行
					      			$.each(rows, function(i, o) {
					      				$('#UserDefinedJavaClass_field_table').datagrid('endEdit', i);// 结束编辑所有行
					      			});
					      			var fields=Nasoft.GetProjectData.getFields('#UserDefinedJavaClass_field_table');//将对应数据字段加入表输出
					      			if(!!fields&&fields.field.constructor==Array){//判断到底是数组还是对象
					    				$.each(fields.field,function(i,o){
					    					if(o.field_type==''){
					    						o.field_type = 'None';
					    					}
					    					if(o.field_length ==''){
					    						o.field_length = '-1';
					    					}
					    					if(o.field_precision==''){
					    						o.field_precision = '-1';
					    					}
					    				});
					    			}else if(!!fields){
					    				fields.field.field_type == '' ? fields.field.field_type = 'None' :  fields.field.field_type
					    				fields.field.field_length=='' ? fields.field.field_length = '-1' : fields.field.field_length
					    				fields.field.field_precision ==''? fields.field.field_precision ='-1' : fields.field.field_precision
					    			}
					      			UserDefinedJavaClass.fields=fields;
					      			UserDefinedJavaClass.clear_result_fields = $("#Execute_UserDefinedJavaClass").prop("checked")==true ? 'Y' : 'N'; //忽略错误
					      			 var rowss = $('#UserDefinedJavaClass_parameter_table').datagrid('getRows');// 获取当前页面中所有的行
						      			$.each(rowss, function(i, o) {
						      				$('#UserDefinedJavaClass_parameter_table').datagrid('endEdit', i);// 结束编辑所有行
						      			});
						      		var parameter=Nasoft.GetProjectData.getFields('#UserDefinedJavaClass_parameter_table');//将对应数据字段加入表输出
						      		if(!!parameter){
										var arguments={
								    		usage_parameter:{}
										}
								    	arguments.usage_parameter = parameter.field;
								    	UserDefinedJavaClass.usage_parameters=arguments;
									    }else{
										UserDefinedJavaClass.usage_parameters=parameter;
									}
						      		 var rowsss = $('#UserDefinedJavaClass_information_table').datagrid('getRows');// 获取当前页面中所有的行
						      			$.each(rowsss, function(i, o) {
						      				$('#UserDefinedJavaClass_information_table').datagrid('endEdit', i);// 结束编辑所有行
						      			});
						      		var information=Nasoft.GetProjectData.getFields('#UserDefinedJavaClass_information_table');//将对应数据字段加入表输出
						      		if(!!information){
										var arguments={}
								    	arguments.info_step = information.field;
								    	UserDefinedJavaClass.info_steps=arguments;
									    }else{
										UserDefinedJavaClass.info_steps=information;
									}
						      		 var rowssss = $('#UserDefinedJavaClass_goal_table').datagrid('getRows');// 获取当前页面中所有的行
						      			$.each(rowssss, function(i, o) {
						      				$('#UserDefinedJavaClass_goal_table').datagrid('endEdit', i);// 结束编辑所有行
						      			});
						      		var goal=Nasoft.GetProjectData.getFields('#UserDefinedJavaClass_goal_table');//将对应数据字段加入表输出
						      		if(!!goal){
										var arguments={}
								    	arguments.target_step = goal.field;
								    	UserDefinedJavaClass.target_steps=arguments;
									    }else{
										UserDefinedJavaClass.target_steps=goal;
									}
						      		
						      		
						    		var tabs_a=creatTab.tabs('tabs');//获取脚本编写的所有选项卡
									console.log(tabs_a[0].panel('options').title)
									if(tabs_a.length===1){
										var definitions={};
										var definition={class_type:"TRANSFORM_CLASS"};//获取单个脚本对象
										$.each(tabs_a,function(i,o){//遍历所有的脚本选项卡
											definition.class_name=o.panel('options').title;//获取脚本名称
											//"<![CDATA["+ +"]]>"<![CDATA[
											definition.class_source="<![CDATA["+editor.getValue()+"]]>";//获取脚本内容
											definitions.definition=definition;
											UserDefinedJavaClass.definitions=definitions;
										});
									}
						      		
						      		
					     			node.setStep(UserDefinedJavaClass);//将步骤的配置属性放入节点中
					      			console.log(node)
					      			node.setTransfer();//存储要传递的字段
								$('#UserDefinedJavaClass').window('close');
							});
							//点击取消按钮
							$('#UserDefinedJavaClass_cancel').unbind('click').click(function(e){
								$('#UserDefinedJavaClass').window('close');
							});
		    	};
		    	onBeforeClose=function(){
                 try {
						
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}