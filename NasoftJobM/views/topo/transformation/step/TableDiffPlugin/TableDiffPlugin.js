 Nasoft.Topo.transferFns.TableDiffPlugin=function(node){
	 var file=node.getStep().fields;//将对应数据字段加入表输出
	 var tableDiffPlugin = [];
	 if(!!file){		
		 if(file.field.constructor==Array){//数组	
			 $.each(file.field,function(i,o){
				 var field={};
				 if(!!file.field.newname){
					 field.name= o.newname;
					 field.type=o.type;
					 field.format=o.format;
					 field.length=o.length;
					 field.precision=o.precision;
					 field.trim_type=o.trim_type;
					 tableDiffPlugin.push(field)					 
				 }else{
					 field.name= o.name;
					 field.type=o.type;
					 field.format=o.format;
					 field.length=o.length;
					 field.precision=o.precision;
					 field.trim_type=o.trim_type;
					 tableDiffPlugin.push(field)		
				 }
			 });		
		 }else{//对象
			 var oldFile ={}
			 if(!!file.field.newname){
				 oldFile.name=file.field.newname;
				 oldFile.type=file.field.type;
				 oldFile.format=file.field.format;
				 oldFile.length=file.field.length;
				 oldFile.precision=file.field.precision;
				 oldFile.trim_type=file.field.trim_type;
				 tableDiffPlugin.push(oldFile) 
			 }else{ 
				 oldFile.name=file.field.name;
				 oldFile.type=file.field.type;
				 oldFile.format=file.field.format;
				 oldFile.length=file.field.length;
				 oldFile.precision=file.field.precision;
				 oldFile.trim_type=file.field.trim_type;
				 tableDiffPlugin.push(oldFile)
			 }
		 }
	 }
        return tableDiffPlugin;	 
  };
Nasoft.Window.fns.TableDiffPlugin=function(node){
	Nasoft.Ui_extend.browser_even('#TableDiffPlugin');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose;
	onBeforeOpen=function(){
		try {
			var databaseName = null; 
			$('#step_name_tableDiffPlugin').textbox('setValue',node.text);
		   var	connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
			$('#server_conner').combobox({
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

			$('#add_lt').unbind('click').click(function(e){//点击添加事件
				//console.log("进入增加事件")
				var lib_name = $('#server_conner').combobox('getValue');
				var schema_name = $('#goal_model').val();
				var table_name = $('#goal_surface').val();
				var where_name = $('#goal_condition').val();
				var agent_name = $('#agency_name').val();
				var file=Nasoft.GetProjectData.getFields('#select_table');//将对应数据字段加入表输出	
				if(!!file&&file.field.constructor==Array&&file.field.length>0){//数组
				function constructor_array(file,agent_name){
					for(var i=0;i<file.field.length;i++){
						if(file.field[i].agent===agent_name){
							return true;
						}
					}
					return false;					
				}
				if(constructor_array(file,agent_name)){
					alert("代理名不能相同!!!")
				}else{
					if(lib_name !='' || table_name !='' || agent_name!='' ){
						console.log(lib_name,table_name,agent_name)
						
						$('#select_table').datagrid(
							'insertRow',{
								row: {
									library:lib_name,
									table:table_name,
									where:where_name,
									agent:agent_name
								}
							}
						);
						setNullForTextBox('goal_model','goal_surface','goal_condition','agency_name');
					}
				}
				}else if(!!file){
					if(file.field.agent==agent_name){
						alert("代理名不能相同!!!")
						return false;
					}else{
						if(lib_name !='' || table_name !='' || agent_name!='' ){
							console.log(lib_name,table_name,agent_name)
							
							$('#select_table').datagrid(
								'insertRow',{
									row: {
										library:lib_name,
										table:table_name,
										where:where_name,
										agent:agent_name
									}
								}
							);
							setNullForTextBox('goal_model','goal_surface','goal_condition','agency_name');
						}
					}
				}else{
					if(lib_name !='' || table_name !='' || agent_name!='' ){
						console.log(lib_name,table_name,agent_name)
						
						$('#select_table').datagrid(
							'insertRow',{
								row: {
									library:lib_name,
									table:table_name,
									where:where_name,
									agent:agent_name
								}
							}
						);
						setNullForTextBox('goal_model','goal_surface','goal_condition','agency_name');
					}
				}

			});


			$('#server_conner').combobox('setValue','');
			setNullForTextBox('goal_model','goal_surface','goal_condition','agency_name');

			var newObject = node.getStep().select;
//			console.log("newObject : "+newObject)
//			console.log("是什么 : "+(typeof newObject.library))
//			console.log("是什么 : "+(newObject.library))
			if(!!newObject&&(typeof newObject.library) == 'object' && newObject.library != null){
				//console.log("进来没 : "+(newObject.library))
				var newObjectShow = {};
				var newArrayList = [];
				$.each(newObject.library,function(i,o){
					//console.log("循环 "+i+" 次")
					var newObjectResult = {};
					newObjectResult.library = o;
					newObjectResult.table = newObject.table[i];
					newObjectResult.where = newObject.where[i];
					newObjectResult.agent = newObject.agent[i];
					newArrayList.push(newObjectResult);
				});
				newObjectShow.field = newArrayList;
			}
			//console.log("newObjectShow是什么 : "+newObjectShow)
			//console.log("node.getStep().select是什么 : "+[node.getStep().select])
			$('#select_table').datagrid({
				rownumbers:true,
				fit:true,
				data:node.getStep().select.library?{total:1, rows : newObjectShow!=undefined?newObjectShow.field:[node.getStep().select]}:{total:0,rows:[]},
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

			$('#del_lt').unbind('click').click(function(e) {
				var selt_del_row = $('#select_table').datagrid('getSelected');
				var selt_del_rowIndex = $('#select_table').datagrid('getRowIndex',selt_del_row);
				$('#select_table').datagrid('deleteRow',selt_del_rowIndex);
			});

			//比较条件
			var con_Object = node.getStep().condition;
			//console.log("con_Object : "+con_Object)
			//console.log("是什么 : "+(con_Object.term))
			if(!!con_Object&&(typeof con_Object.term) == 'object' && con_Object.term != null){
				var con_ObjectShow = {};
				var con_ArrayList = [];
				$.each(con_Object.term,function(i,o){
					var con_ObjectResult = {};
					con_ObjectResult.term = o;
					con_ObjectResult.agent = con_Object.agent[i];
					con_ObjectResult.field = con_Object.field[i];
					con_ArrayList.push(con_ObjectResult);
				});
				con_ObjectShow.field = con_ArrayList;
			}
			$('#condition_table').datagrid({//自定义datagrid的属性
				    data:con_Object.term?{total:1, rows:con_ObjectShow!=undefined?con_ObjectShow.field:[con_Object]}:{total:0,rows:[]},
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
							$('#condition_table').datagrid(
								'appendRow',//新增空行
								{
									term:'',
									agent:'',
									field:''
								}
							);
						}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
//							var del_row = $('#condition_table').datagrid('getSelected');
//							var del_rowIndex = $('#condition_table').datagrid('getRowIndex',del_row);
//							$('#condition_table').datagrid('deleteRow',del_rowIndex);
							$('#condition_table').datagrid('deleteSelections');
						}
					}
					],
					onDblClickCell:function(index, field, value){
						var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===index || $('#condition_table').datagrid('endEdit',j);
						});
						$(this).datagrid('beginEdit', index);//编辑点击的行
						var ed = $(this).datagrid('getEditor', {index:index,field:field});
						console.log("ed.target : "+ed.target.toString);
						console.log("ed.target : ");
//						writeObj(ed.target);
						
						$(ed.target).focus();
					},
					onClickCell:function(index, field, value){
						//console.log("单击 index: "+index+",field: "+field+",value: "+value)
						//获取列值存入数组
						var values = getColumnValues('select_table',"agent");
						//整理成Combobox认识的对象数组 
						var datas = getComBoxData(values,"value","text");
						//加载数据到Combobox
						loadComboboxValues('condition_table', 1, datas, "value","text");
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

			var rpl_Object = node.getStep().rplfield;
			//console.log("rpl_Object : "+rpl_Object)
			if(!!rpl_Object&&(typeof rpl_Object.gnum) == 'object' && rpl_Object.gnum != null){
				var rpl_ObjectShow = {};
				var rpl_ArrayList = [];
				$.each(rpl_Object.gnum,function(i,o){
					var rpl_ObjectResult = {};
					rpl_ObjectResult.gnum = o;
					rpl_ObjectResult.replacefieldname = rpl_Object.replacefieldname[i];
					rpl_ArrayList.push(rpl_ObjectResult);
				});
				rpl_ObjectShow.field = rpl_ArrayList;
			}
			
			
			$('#rplfield_table').datagrid({//自定义datagrid的属性
				data:rpl_Object.gnum?{total:1, rows:rpl_ObjectShow!=undefined?rpl_ObjectShow.field:[rpl_Object]}:{total:0,rows:[]},
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
							$('#rplfield_table').datagrid(
								'appendRow',//新增空行
								{
									gnum:'',
									replacefieldname:''
								}
							);
						}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
//							var del_row = $('#rplfield_table').datagrid('getSelected');
//							var del_rowIndex = $('#rplfield_table').datagrid('getRowIndex',del_row);
//							$('#rplfield_table').datagrid('deleteRow',del_rowIndex);
							$('#rplfield_table').datagrid('deleteSelections');
						}
					}
					],
					onDblClickCell:function(index, field, value){
						var rows=$('#rplfield_table').datagrid('getRows');
						$.each(rows,function(j,o){
							j===index || $('#rplfield_table').datagrid('endEdit',j);
						});
						$('#rplfield_table').datagrid('beginEdit', index);//编辑点击的行
						if(field=='replacefieldname'){
							var ed = $('#rplfield_table').datagrid('getEditor', {index:index,field:'replacefieldname'});
							$(ed.target).focus();
						}

					},
					onClickCell:function(index, field, value){
						//console.log("单击 index: "+index+",field: "+field+",value: "+value)
						var values = [];
						//获取列值存入数组
						values = getColumnValues('condition_table',"term");
						//去重复数据
						values = values.duplicate();
						//整理成Combobox认识的对象数组 
						var datas = getComBoxData(values,"value","text");
						//加载数据到Combobox
						loadComboboxValues('rplfield_table', 0, datas, "value","text");
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
			
			//比较字段
			var com_object = node.getStep().comparison
			//console.log("com_object : "+com_object)
			if(!!com_object&&(typeof com_object.term) == 'object' && com_object.term != null){
				var com_objectShow = {};
				var com_arrayList = [];
				$.each(com_object.term,function(i,o){
					var com_ObjectResult = {};
					com_ObjectResult.term = o;
					com_ObjectResult.agentname = com_object.agentname[i];
					com_ObjectResult.fieldname = com_object.fieldname[i];
					com_arrayList.push(com_ObjectResult);
				});
				com_objectShow.field = com_arrayList;
			}
			$('#comparison_table').datagrid({//自定义datagrid的属性
				    data:!!com_object.term?{total:1, rows:com_objectShow!=undefined?com_objectShow.field:[com_object]}:{total:0,rows:[]},
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
							$('#comparison_table').datagrid(
								'appendRow',//新增空行
								{
									term:'',
									agentname:'',
									fieldname:''
								}
							);
						}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
//							var del_row = $('#comparison_table').datagrid('getSelected');
//							var del_rowIndex = $('#comparison_table').datagrid('getRowIndex',del_row);
//							$('#comparison_table').datagrid('deleteRow',del_rowIndex);
							$('#comparison_table').datagrid('deleteSelections');
						}
					}
					],
					onDblClickCell:function(index, field, value){
						var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===index || $('#comparison_table').datagrid('endEdit',j);
						});
						$(this).datagrid('beginEdit', index);//编辑点击的行
						var ed = $(this).datagrid('getEditor', {index:index,field:field});
						$(ed.target).focus();
					},
					onClickCell:function(index, field, value){
						//console.log("单击 index: "+index+",field: "+field+",value: "+value)
						//获取列值存入数组
						var values = getColumnValues('select_table',"agent");
						//整理成Combobox认识的对象数组 
						var datas = getComBoxData(values,"value","text");
						//加载数据到Combobox
						loadComboboxValues('comparison_table', 1, datas, "value","text");
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

			var nfd_Object = node.getStep().newfield;
			//console.log("nfd_Object : "+nfd_Object)
			if(!!nfd_Object&&(typeof nfd_Object.tnum) == 'object' && nfd_Object.tnum != null){
				var nfd_ObjectShow = {};
				var nfd_ArrayList = [];
				$.each(nfd_Object.tnum,function(i,o){
					var nfd_ObjectResult = {};
					nfd_ObjectResult.tnum = o;
					nfd_ObjectResult.newfieldname = nfd_Object.newfieldname[i];
					nfd_ArrayList.push(nfd_ObjectResult);
				});
				nfd_ObjectShow.field = nfd_ArrayList;
			}
			$('#newfield_table').datagrid({//自定义datagrid的属性
				data:nfd_Object.tnum?{total:1, rows:nfd_ObjectShow!=undefined?
						nfd_ObjectShow.field:[nfd_Object]}:{total:0,rows:[]},
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
							$('#newfield_table').datagrid(
								'appendRow',//新增空行
								{
									tnum:'',
									newfieldname:''
								}
							);
						}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
//							var del_row = $('#newfield_table').datagrid('getSelected');
//							var del_rowIndex = $('#newfield_table').datagrid('getRowIndex',del_row);
//							$('#newfield_table').datagrid('deleteRow',del_rowIndex);
							$('#newfield_table').datagrid('deleteSelections');
						}
					}
					],
					onDblClickCell:function(index, field, value){
						var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===index || $('#newfield_table').datagrid('endEdit',j);
						});
						$(this).datagrid('beginEdit', index);//编辑点击的行
						var ed = $(this).datagrid('getEditor', {index:index,field:field});
						$(ed.target).focus();
					},
					onClickCell:function(index, field, value){
						//console.log("单击 index: "+index+",field: "+field+",value: "+value)
						var values = [];
						//获取列值存入数组
						values = getColumnValues('comparison_table',"term");
						//去重复数据
						values = values.duplicate();
						//整理成Combobox认识的对象数组 
						var datas = getComBoxData(values,"value","text");
						//加载数据到Combobox
						loadComboboxValues('newfield_table', 0, datas, "value","text");
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

			//输出字段
			var oupt_table=$('#output_table').datagrid('options');
			$.each(oupt_table.columns[0],function(i,o){
				var oupt_edi=new Object();
				switch(i){
				case 0:
					oupt_edi.type='combobox';
					oupt_edi.options={
						valueField: 'value',    
			            textField: 'text',
			            editable : false,
			            data:change_name(),
//			            onSelect : function(newValue){
//			            	change_name(newValue.value)			
//                		}
        
					}
					o.editor=oupt_edi;
					break;
				case 2:
					oupt_edi.type='combobox';
					oupt_edi.options={ 
							valueField: "label", 
							textField: "value",
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
	                			change1(newValue.value);			
	                		}
					}
					o.editor=oupt_edi;
					break;
				case 3:
					oupt_edi.type='combobox';
					oupt_edi.options={
						valueField: 'text',    
			            textField: 'text',
			            formatter: function(row){
	                		var opts = $(this).combobox('options');
	                		return row[opts.textField];
	                	}
					}
					o.editor=oupt_edi;
					break;
				case 9:
					oupt_edi.type='combobox';
					oupt_edi.options={ 
							valueField: "value", 
							textField: "label",
							editable : false,
							data:[{
	                			label: '不去掉空格',
	                			value: 'none'
	                		},{
	                			label: '去掉做掉左侧空格',
	                			value: 'left'
	                		},{
	                			label: '去掉做掉右侧空格',
	                			value: 'right'
	                		},{
	                			label: '去掉左右两端空格',
	                			value: 'both'
	                		}],
					}
					o.editor=oupt_edi;
					break;	
				default:
					oupt_edi.type='text';
					o.editor=oupt_edi.type;
				}
			});
			var output_table_val;
			if(!!node.getStep().fields&&$.isArray(node.getStep().fields.field)){
				output_table_val=node.getStep().fields.field;
			}else if(!!node.getStep().fields&&node.getStep().fields.field.name!=null&&node.getStep().fields.field.name!=''){
				output_table_val=[node.getStep().fields.field];
			}else{
				output_table_val={total:0,rows:[]};
			}
			$('#output_table').datagrid({//自定义datagrid的属性
//					data:!!node.getStep().fields?{total:1, rows:$.isArray(node.getStep().fields.field)?
//				    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},
				    data:output_table_val,
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
							$('#output_table').datagrid(
								'appendRow',//新增空行
								{
									name:'',
									newname:'',
									type:'',
									format:'',
									length:'',
									precision:'',
									currency:'',
									decimal:'',
									group:'',
									trim_type:''
								}
							);
						}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
//							var del_row = $('#output_table').datagrid('getSelected');
//							var del_rowIndex = $('#output_table').datagrid('getRowIndex',del_row);
//							$('#output_table').datagrid('deleteRow',del_rowIndex);
							$('#output_table').datagrid('deleteSelections');
						}
					}
					],
					onDblClickCell:function(index, field, value){
						var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===index || $('#output_table').datagrid('endEdit',j);
						});
						if(field=='name'){
							$(this).datagrid('beginEdit', index);//编辑点击的行
							var name_data=change_name();
							if(rplfield_identical()){
								alert('比较条件代替名称字段相同,将导致获取字段失败,请重新设置')
							}else if(newfield_identical()){
								alert('比较字段新名称字段相同,将导致获取字段失败,请重新设置')
							}else{
								var ed=$('#output_table').datagrid('getEditor',{index:index,field:'name'});
//								$(ed.target).combobox({data:name_data});
								$(ed.target).focus();
							}
						}
    						if(field=='type'){
                        	var newOld = change2(value,index);
                        	if(newOld==''){
                        		var ed=$(this).datagrid('getEditor',{index:index,field:'format'});
                        		$(ed.target).combobox('setValue',row.format);
                        	}else{
                        		var ed=$(this).datagrid('getEditor',{index:index,field:'format'});
                        		$(ed.target).combobox('setValue',newOld);
                        	}
    						}
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
			$('#TableDiffPlugin').window({
				onClose:function(){
					setNullForTextBox('goal_model','goal_surface','goal_condition','agency_name');
				}
			});
			$('#tableDiffPlugin_cancel').unbind('click').click(function(e){
				$('#TableDiffPlugin').window('close');
				setNullForTextBox('goal_model','goal_surface','goal_condition','agency_name');
			});
			$('#tableDiffPlugin_browse_surface').unbind('click').click(function(e){//点击目标表浏览
	        	Nasoft.Static.handleFile('#goal_surface','#goal_surface_h',{});
			});
			$('#tableDiffPlugin_ok').unbind('click').click(function(e){
				var tableDiffPlugin={};
				//步骤名称
				node.text=$('#step_name_tableDiffPlugin').textbox('getValue');
				//数据库
				tableDiffPlugin.connection=node.getConnectionName();
				//一般
				var choose=Nasoft.GetProjectData.getFields('#select_table');//将对应数据字段加入表输出	
				if(!!choose&&choose.field.constructor==Array){
					var resulttable = {};
					var library = [];
					var table = [];
					var where = [];
					var agent = [];
					$.each(choose.field,function(i,o){
						library[i] = o.library;
						table[i] = o.table;
						where[i] = o.where;
						agent[i] = o.agent;
					});
					resulttable.library = library;
					resulttable.table = table;
					resulttable.where = where;
					resulttable.agent = agent;
					if(choose.field!=0){
						tableDiffPlugin.select = resulttable;
					}
				}else{
					tableDiffPlugin.select = choose.field;
				}
				//比较条件
				var con_rows=$('#condition_table').datagrid('getRows');
				$.each(con_rows,function(i,o){
					$('#condition_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var condition=Nasoft.GetProjectData.getFields('#condition_table');
				if(!!condition&&condition.field.constructor == Array){
					var con_result = {};
					var term = [];
					var agent = [];
					var field = [];
					$.each(condition.field,function(i,o){
						term[i] = o.term;
						agent[i] = o.agent;
						field[i] = o.field;
					});
					con_result.term = term;
					con_result.agent = agent;
					con_result.field = field;
	                if(condition.field!=0){
	                	tableDiffPlugin.condition = con_result;
					}
				}else{
					tableDiffPlugin.condition = condition.field;
				}
				var rpl_rows=$('#rplfield_table').datagrid('getRows');
				$.each(rpl_rows,function(i,o){
					$('#rplfield_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var rplfield=Nasoft.GetProjectData.getFields('#rplfield_table');
				if(!!rplfield&&rplfield.field.constructor == Array){
					var rpl_result = {};
					var gnum = [];
					var replacefieldname = [];
					$.each(rplfield.field,function(i,o){
						gnum[i] = o.gnum;
						replacefieldname[i] = o.replacefieldname;
					});
					rpl_result.gnum = gnum;
					rpl_result.replacefieldname = replacefieldname;
					if(rplfield.field!=0){
						tableDiffPlugin.rplfield = rpl_result;
					}
				}else{
					tableDiffPlugin.rplfield = rplfield.field;
				}
				//比较字段 
				var com_rows=$('#comparison_table').datagrid('getRows');
				$.each(com_rows,function(i,o){
					$('#comparison_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var comparison=Nasoft.GetProjectData.getFields('#comparison_table');
				if(!!comparison&&comparison.field.constructor == Array){
					var com_result = {};
					var term = [];
					var agentname = [];
					var fieldname = [];
					$.each(comparison.field,function(i,o){
						term[i] = o.term;
						agentname[i] = o.agentname;
						fieldname[i] = o.fieldname;
					});
					com_result.term = term;
					com_result.agentname = agentname;
					com_result.fieldname = fieldname;
					if(comparison.field!=0){
						tableDiffPlugin.comparison = com_result;
					}
				}else{
					tableDiffPlugin.comparison = comparison.field;
				}
				var nfd_rows=$('#newfield_table').datagrid('getRows');
				$.each(nfd_rows,function(i,o){
					$('#newfield_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var newfield=Nasoft.GetProjectData.getFields('#newfield_table');
				if(!!newfield&&newfield.field.constructor == Array){
					var nfd_result = {}
					var tnum = [];
					var newfieldname = [];
					$.each(newfield.field,function(i,o){
						tnum[i] = o.tnum;
						newfieldname[i] = o.newfieldname;
					});
					nfd_result.tnum = tnum;
					nfd_result.newfieldname = newfieldname;
					if(newfield.field!=0){
						tableDiffPlugin.newfield = nfd_result;
					}
					
				}else{
					tableDiffPlugin.newfield = newfield.field;
				}
				
				//输出字段
				var oupt_rows=$('#output_table').datagrid('getRows');
				$.each(oupt_rows,function(i,o){
					$('#output_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var fields=Nasoft.GetProjectData.getFields('#output_table');
				if(!!fields&&fields.field.constructor==Array){//判断到底是数组还是对象
					$.each(fields.field,function(i,o){
						if(o.type==''){
							o.type = 'None';
						}
						if(o.length ==''){
							o.length = '-1';
						}
						if(o.precision==''){
							o.precision = '-1';
						}
						if(o.trim_type==''){
							o.trim_type = 'none';
						}
					});
				}else if(!!fields){
					fields.field.type == '' ? fields.field.type = 'None' :  fields.field.type;
					fields.field.length=='' ? fields.field.length = '-1' : fields.field.length;
					fields.field.precision ==''?fields.field.precision='-1' : fields.field.precision;
					fields.field.trim_type =='' ? fields.field.trim_type='none' : fields.field.trim_type;
				}
				tableDiffPlugin.fields = fields;

				node.setStep(tableDiffPlugin);
				node.setTransfer();
				$('#TableDiffPlugin').window('close');
			});
		} catch (e) {
			// TODO: handle exception
			console.log(e);
		}
	};

	onBeforeClose=function(){
	}

	/**
	 * type方法
	 */
	function change1(newValue){
				var date=[{"id":1,"text":"yyyy/MM/dd HH:mm:ss.SSS"},{"id":2,"text":"yyyy/MM/dd HH:mm:ss.SSS XXX"},{"id":3,"text":"yyyy/MM/dd HH:mm:ss"},
	      			{"id":4,"text":"yyyy/MM/dd HH:mm:ss XXX"},{"id":5,"text":"yyyyMMddHHmmss"},{"id":6,"text":"yyyy/MM/dd"},{"id":7,"text":"yyyy-MM-dd"}
	      			,{"id":8,"text":"yyyy-MM-dd HH:mm:ss"},{"id":9,"text":"yyyy-MM-dd HH:mm:ss XXX"},{"id":10,"text":"yyyyMMdd"},{"id":11,"text":"MM/dd/yyyy"}
	      			,{"id":12,"text":"MM/dd/yyyy HH:mm:ss"},{"id":13,"text":"MM-dd-yyyy"},{"id":14,"text":"MM-dd-yyyy HH:mm:ss"},{"id":15,"text":"MM/dd/yy"}
	      			,{"id":15,"text":"MM-dd-yy"},{"id":16,"text":"dd/MM/yyyy"},{"id":17,"text":"dd-MM-yyyy"},{"id":18,"text":"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}
	      			];//定义下拉表单数据
      			var number = [{"id":1,"text":"#,##0.###"},{"id":2,"text":"0.00"},{"id":3,"text":"0000000000000"},{"id":4,"text":"#.#"},{"id":5,"text":"#"},{"id":6,"text":"###,###,###.#"},{"id":7,"text":"#######.###"},{"id":8,"text":"#####.###%"}];
      			var empty = [{}];
  
      			rowIndex = $('#output_table').datagrid('getRowIndex', $("#output_table").datagrid('getSelected'));
      			//得到编辑行的id
      			if(newValue=='Date'){
      				//方案1
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        		$(ed.target).combobox({ data:date ,valueField: "text", textField: "text"});	
      			}else if(newValue=='Number'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='BigNumber'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='Integer'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue =='String'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='InternetAddress'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Boolean'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Timestamp'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Binary'){
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else{
      				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
        			$(ed.target).combobox({data:empty});
      			}
	}
	/**
	 * type方法2
	 */
	function change2(newValue,rowIndex){
		var date=[{"id":1,"text":"yyyy/MM/dd HH:mm:ss.SSS"},{"id":2,"text":"yyyy/MM/dd HH:mm:ss.SSS XXX"},{"id":3,"text":"yyyy/MM/dd HH:mm:ss"},
	      			{"id":4,"text":"yyyy/MM/dd HH:mm:ss XXX"},{"id":5,"text":"yyyyMMddHHmmss"},{"id":6,"text":"yyyy/MM/dd"},{"id":7,"text":"yyyy-MM-dd"}
	      			,{"id":8,"text":"yyyy-MM-dd HH:mm:ss"},{"id":9,"text":"yyyy-MM-dd HH:mm:ss XXX"},{"id":10,"text":"yyyyMMdd"},{"id":11,"text":"MM/dd/yyyy"}
	      			,{"id":12,"text":"MM/dd/yyyy HH:mm:ss"},{"id":13,"text":"MM-dd-yyyy"},{"id":14,"text":"MM-dd-yyyy HH:mm:ss"},{"id":15,"text":"MM/dd/yy"}
	      			,{"id":15,"text":"MM-dd-yy"},{"id":16,"text":"dd/MM/yyyy"},{"id":17,"text":"dd-MM-yyyy"},{"id":18,"text":"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}
	      			];//定义下拉表单数据
		var number = [{"id":1,"text":"#,##0.###"},{"id":2,"text":"0.00"},{"id":3,"text":"0000000000000"},{"id":4,"text":"#.#"},{"id":5,"text":"#"},{"id":6,"text":"###,###,###.#"},{"id":7,"text":"#######.###"},{"id":8,"text":"#####.###%"}];//
		var empty = [{}];
		if(newValue =='Date'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
				$(ed.target).combobox({data:date ,valueField: "text", textField: "text"});
		}else if(newValue=='Number'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='BigNumber'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='Integer'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue =='String'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='InternetAddress'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Boolean'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Timestamp'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Binary'){
				var ed=$('#output_table').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else{
				return '';
			}
		return $(ed.target).combobox('getValue');
	}
	
	/**
	 * 輸出字段name
	 */
	function change_name(){		         
		var rows_rplfield=$('#rplfield_table').datagrid('getRows');
		var rows_newfield=$('#newfield_table').datagrid('getRows');

		 console.log(rows_rplfield);
		 console.log(rows_newfield);
		 var data=[];
		 var rowIndex = $('#output_table').datagrid('getRowIndex', $("#output_table").datagrid('getSelected'));
		 if(!!rows_rplfield){ 
			 $.each(rows_rplfield,function(i,o){
				 $('#rplfield_table').datagrid('endEdit',i);
				 var data_a={"text":o.replacefieldname,"value":o.replacefieldname}
		    		data.push(data_a)
			 });
		 }
		if(!!rows_newfield){
             $.each(rows_newfield,function(i,o){
            	 $('#newfield_table').datagrid('endEdit',i);
            	 var data_a={"text":o.newfieldname,"value":o.newfieldname}
         		data.push(data_a)
			 });
		
	}
		return data;
	}
	/**
	 * 比较条件代替名称值唯一	
	 */
	function rplfield_identical(){
		var rows_rplfield=$('#rplfield_table').datagrid('getRows');
		if(rows_rplfield.length>1){
			for(var i=0;i<rows_rplfield.length-1;i++){
				if(rows_rplfield[i].replacefieldname==rows_rplfield[i+1].replacefieldname){
					return true;
				}
			}			
		}
		return false;
	}
	/**
	 * 比较字段新名称值唯一	
	 */
	function newfield_identical(){
		var rows_newfield=$('#newfield_table').datagrid('getRows');
		if(rows_newfield.length>1){
		for(var i=0;i<rows_newfield.length-1;i++){
			if(rows_newfield[i].newfieldname==rows_newfield[i+1].newfieldname){
				return true;
			}	
		  }
		}
		return false;
	}
	/*
	 * 作者：高帅
	 * 日期：2016年11月10日
	 * 功能：为combobox的获取指定格式的数据
	 * 参数：values：数组格式的变量
	 * 返回值：指定格式的数据values
	 */	
	function getComBoxData(values,valueField,textField){
		var Datas = [];
		var value = eval("("+valueField+")");//将字符串转换问对象
		var text = eval("("+textField+")");
		for (var i = 0; i<values.length; i++){
			var Field = new Object();
			Field.value = values[i];
			Field.text = values[i];
			Datas.push(Field);
		}
		return Datas;
	}
	
	/*
	 * 作者：高帅
	 * 日期：2016年11月10日
	 * 功能：datagrid动态加载combobox的列表
	 * 参数：Id:table的id
	 * 	num：table的第几列动态加载
	 * 	datas：加载的数据（value）
	 * 	value: valueField
	 * 	text: textField
	 */
	function loadComboboxValues(Id,num,datas,valueField,textField){
		var opt_table=$('#'+Id).datagrid('options');
		$.each(opt_table.columns[0],function(i,o){
			var edi = new Object();
			if(i == num){
				edi.type='combobox';
				edi.options={
						valueField: valueField, 
						textField: textField,
						editable : false,
						data: datas 
				}
				o.editor=edi;
				o.formatter=function (value, rowData, rowIndex) {
					console.log("formatter value : "+value);
					if (value == "") {
						return;
					}
					for (var i = 0; i < datas.length; i++) {
						if (datas[i].value == value) {
							return datas[i].text;
						}
					}
				}
			}
			else{
				edi.type='text';
				o.editor=edi.type;
			}
		})
	}
	
	/*
	 * 作者：高帅
	 * 日期：2016年11月10日
	 * 功能：置空textbox
	 * 参数：（参数不固定）传入id
	 * 传入id规则: 'id名称'
	 */
	function setNullForTextBox(){
		for(i = 0; i<arguments.length; i++){
			$('#'+arguments[i]).textbox('setValue','');
		}
	}
	/*
	 * 作者：高帅
	 * 日期：2016年11月10日
	 * 功能：循环获取datagrid某一列的值，返回一个数组
	 * 参数：gridId：table的ID ； field：要获取的列名
	 * 返回值：返回数组
	 */
	function getColumnValues(gridId,field){
		var rows = $('#'+gridId).datagrid('getRows');
		var Values = [];
		for (var i = 0; i<rows.length; i++){
			Values[i] = rows[i][field];
			//console.log("Values[i]是什么 : "+Values[i])
		}
		return Values;
	}
	/*
	 * 作者：高帅
	 * 日期：2016年11月10日
	 * 功能：数组去重复
	 */
	Array.prototype.duplicate = function()
	{
		var n = {},r=[]; //n为hash表，r为临时数组
		for(var i = 0; i < this.length; i++) //遍历当前数组
		{
			if (!n[this[i]]) //如果hash表中没有当前项
			{
				n[this[i]] = true; //存入hash表
				r.push(this[i]); //把当前数组的当前项push到临时数组里面
			}
		}
		return r;
	}

	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}
 