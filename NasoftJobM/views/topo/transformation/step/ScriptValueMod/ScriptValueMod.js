 Nasoft.Topo.transferFns.ScriptValueMod=function(node){
		var fds = [];
		 var file=node.getStep().fields;//将对应数据字段加入表输出
		 var textFileInput = [];
		 if(!!file.field){		 
			 if(file.field.constructor==Array){//数组		
				 $.each(file.field,function(i,o){
					 var field={};
					 if(o.rename!=null&&o.rename!=''){
						 field.name= o.rename; 
					 }else{
						 field.name= o.name;
					 }
					 field.type=o.type;
					 field.length=o.length;
					 field.precision=o.precision;
					 fds.push(field)
				 });		
			 }else{//对象
				 var oldFile ={} 
				 if(file.field.rename!=null&&file.field.rename!=''){
					 oldFile.name=file.field.rename;
				 }else{
					 oldFile.name=file.field.name;
				 }
				 oldFile.type=file.field.type;
				 oldFile.length=file.field.length;
				 oldFile.precision=file.field.precision;
				 fds.push(oldFile)
			 }
		 }
	 return fds;
  };
Nasoft.Window.fns.ScriptValueMod=function(node){
				Nasoft.Ui_extend.browser_even('#ScriptValueMod');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose,creatTab,number=Nasoft.Util.myNumber();
		    	onBeforeOpen=function(){
		    		try {
		    			/**
		    			 * step:节点关联的步骤,
		    			 * JSScripts:不中所包含的所有的js脚本的集合,
		    			 * jsScript:单个js脚本,
		    			 * tabs:新创建的选项卡面板,
		    			 * ScriptValueMod_table:窗口的table,
		    			 * table_options:table的属性对象
		    			 */
		    			initTab();
		    			var step,jsScripts,jsScript,tabs,ScriptValueMod_table,table_options
						step=node.getStep();//获取步骤对象
						
						$('#ScriptValueMod_name_selectValues').textbox('setValue',node.text);
					/***********************************tab start******************************************/
						creatTab=Nasoft.Util.createTab('ScriptValueMod_script_tab');//创建一个tab实例
						creatTab.tabs({
							fit:true					
						})
						var createTextarea=function(){//创建一个文本输入
							var textarea=document.createElement('textarea');
							textarea.style.width='99%';
							textarea.style.height='98%';
							textarea.style.resize='none';
							textarea.style.border='none';
							return textarea;
						};
						var createTitle=function(){
							var title,tabs;
						tabs=creatTab.tabs('tabs');
						title='Script'+number.handle('add');
							$.each(tabs,function(i,o){
								if(o.panel('options').title===title){
									title=createTitle();
								}
							});
							
							return title;
						};
						var addTab=function(title){//添加一个tab
							
							tabs=creatTab.tabs('tabs');//获取脚本编写的所有选项卡
							if(tabs.length<2){
								var title=title || createTitle(),content=createTextarea();
								creatTab.tabs('add',{
									title:title,
									closable:true,
									content:content
								});	
								return content;
							}else{
								alert('最多创建2个Script');
								return;
							}
						};
					
						 if($.isArray(step.jsScripts.jsScript)){//有多个js脚本
							for(var i=0;i<step.jsScripts.jsScript.length;i++){
								number.handle('add');
								var tab=addTab(step.jsScripts.jsScript[i].jsScript_name);
								$(tab).val(step.jsScripts.jsScript[i].jsScript_script);//初始化,添加一个tab,并填充脚本代码
							}
								
							
						 }else{
							//初始化,添加一个tab,并填充脚本代码
							 var tab=addTab(step.jsScripts.jsScript.jsScript_name);
							 $(tab).val(step.jsScripts.jsScript.jsScript_script);
						 }
						$('#ScriptValueMod_script_menu').menu({onClick:function(item){//点击添加
										if(item.id==='add_script_tab'){//创建一个tab
											addTab();
										}
									}})
						creatTab.find('.tabs-header').unbind('mouseup').mouseup(function(e){
							if(e.button===2){//右击
								e.preventDefault();
								$('#ScriptValueMod_script_menu').menu('show',{left:e.pageX,top: e.pageY});			
							}
						});
                       /************************************tab end********************************************************/
					  /************************************table start********************************************************/
						var typeCombobox=[{'value':'Data','text':'Data'},{'value':'String','text':'String'},{'value':'Number','text':'Number'},
			    			            {'value':'Internet Address','text':'Internet Address'},{'value':'BigNumber','text':'BigNumber'},
			    			            {'value':'Integer','text':'Integer'},{'value':'Boolean','text':'Boolean'},{'value':'Timestamp','text':'Timestamp'},
			    			            {'value':'Binary','text':'Binary'}]//定义下拉数据
						var isReplaceCombobox=[{'value':'N','text':'否'},{'value':'Y','text':'是'}];
						ScriptValueMod_table=$('#ScriptValueMod_table');
						function typeFormatter(value, rowData, rowIndex) {//格式化 '类型',的显示数据
							if (value == 0) {
								return;
							}
							for (var i = 0; i < typeCombobox.length; i++) {
								if (typeCombobox[i].value == value) {
									return typeCombobox[i].text;
								}
							}
						}
						function replaceFormatter(value, rowData, rowIndex){//格式化 '替换字段名',的显示数据
							if (value == 0) {
								return;
							}
							for (var i = 0; i < isReplaceCombobox.length; i++) {
								if (isReplaceCombobox[i].value == value) {
									return isReplaceCombobox[i].text;
								}
							}
						}
						table_options=ScriptValueMod_table.datagrid('options');
						table_options.data=step.fields?{total:1,rows:$.isArray(step.fields.field)?step.fields.field:[step.fields.field]}:{total:0,rows:[]};
						table_options.toolbar=[{//定义工具栏
							iconCls: 'icon-add',
							text : "新增",
							handler: function(){
								ScriptValueMod_table.datagrid(
									'appendRow',//新增空行
									{name:'',rename:'',type:'',length:'',precision:'',replace:''}
								);
							}
						},{
							text : "删除",
							iconCls : 'icon-remove',
							handler : function() {
								var del_row = $('#ScriptValueMod_table').datagrid('getSelected');
								var del_rowIndex = $('#ScriptValueMod_table').datagrid('getRowIndex',del_row);
								$('#ScriptValueMod_table').datagrid('deleteRow',del_rowIndex);
							}
						}];
						$.each(table_options.columns[0],function(i,o){
						 //给需要格式化的列加入格式化方法
							switch (i) {
							case 2:	//第三个字段				
							    o.formatter=typeFormatter;//加入格式化方法(引用一个字面量函数)
								break;				
							case 5:	//第四个字段
							    o.formatter=replaceFormatter;//加入格式化方法(引用一个字面量函数)
								break;
							}
						});
						//双击一列的事件
						table_options.onDblClickCell=function(index, field, value){
							 $.each(ScriptValueMod_table.datagrid('getRows'),function(j,o){//初始化结束所有行的编辑
								 ScriptValueMod_table.datagrid('endEdit',j);
			    			 });
							 $.each(table_options.columns[0],function(i,o){//输出当前表的所有列
									if(o.field===field){//判断当前列在所有列中的位置
										switch (field) {
										case 'type'://类型字段
											o.editor={};//初始化编辑器
											o.editor.type='combobox';
										    o.editor.options={data:typeCombobox,valueField: "value", textField: "text"}
										    $.each(table_options.columns[0],function(k,b){
										    	if(b!==o && b.editor) delete b.editor;//删除其他列的编辑器(用于实现只编辑当前点击的单元格)
										    });
											break;
										case 'replace':
											o.editor={};//格式化编辑器
											o.editor.type='combobox';
										    o.editor.options={data:isReplaceCombobox,valueField: "value", textField: "text"}
										    $.each(table_options.columns[0],function(k,b){
										    	if(b!==o && b.editor) delete b.editor;//删除其他列的编辑器(用于实现只编辑当前点击的单元格)
										    });
											break;
										default://默认执行
											o.editor={};//格式化编辑器
										    o.editor.type='text';
										    $.each(table_options.columns[0],function(k,b){
										    	if(b!==o && b.editor) delete b.editor;//删除其他列的编辑器(用于实现只编辑当前点击的单元格)
										    });
											break;
										}	
									}
									
								});
							 ScriptValueMod_table.datagrid('beginEdit',index);//初始化编辑器完毕,开始编辑当前行
			    		var	eg=ScriptValueMod_table.datagrid('getEditor',{index:index,field:field});//获取当前编辑器
			    		$(eg.target).focus().focusout(function(){//失去
			    			ScriptValueMod_table.datagrid('endEdit',index);//编辑器事情焦点后结束编辑
			    		});
					};
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
						ScriptValueMod_table.datagrid(table_options);//重新加载表格;
					  /************************************table end********************************************************/
						
						$('#ScriptValueMod_ok').unbind('click').click(function(e){
							//保存脚本
							jsScripts=step.jsScripts;//取出模板中的属性值
							node.text=$('#ScriptValueMod_name_selectValues').textbox('getValue');
							tabs=creatTab.tabs('tabs');//获取脚本编写的所有选项卡
							console.log(tabs[0].panel('options').title)
							if(tabs.length===1){
								jsScript={jsScript_type:0};//获取单个脚本对象
								$.each(tabs,function(i,o){//遍历所有的脚本选项卡
									jsScript.jsScript_name=o.panel('options').title;//获取脚本名称
									jsScript.jsScript_script=o.find('textarea').val();//获取脚本内容
									jsScript.jsScript_script=jsScript.jsScript_script;
									jsScripts.jsScript=jsScript;
								});
							}else if(tabs.length>1){
								var thisJs=[];//存在多个选项卡
//								jsScript={jsScript_type:0};//获取单个脚本对象
								$.each(tabs,function(i,o){//遍历所有的脚本选项卡
									var jsScr={jsScript_type:i};//获取单个脚本对象
									thisJs[i]=jsScr;//从模板中继承属性
									thisJs[i].jsScript_name=o.panel('options').title;//获取脚本名称
									thisJs[i].jsScript_script=o.find('textarea').val();//获取脚本内容
									thisJs[i].jsScript_script=thisJs[i].jsScript_script;
								});
								jsScripts.jsScript=thisJs;
							}
							var len=$('#ScriptValueMod_table').datagrid('getRows').length;
							for(var i=0;i<len;i++){
								$('#ScriptValueMod_table').datagrid('endEdit',i);
							}
							//保存表格数据
							step.fields=Nasoft.GetProjectData.getFields('#ScriptValueMod_table');//将表格字段对应的数据放入step对象中
							node.setStep();//不放人参数时step 会更新必要的属性(name,type)
							node.setTransfer();//存储要传递的字段
							$('#ScriptValueMod').window('close');
						});
						$('#ScriptValueMod_cancel').unbind('click').click(function(e){
							$('#ScriptValueMod').window('close');
						});
						$('#ScriptValueMod_obtain').unbind('click').click(function(e){
							var fields=[];
							var tab = $('#_create_tab_').tabs('getSelected');
							var s=tab.find('textarea').val()
							var reg = /(?:var)\s+([^=|;]*)(?==|;)/g
								s.replace(reg,function(){
									var table_val={};
									table_val.name=arguments[1];
									table_val.replace='N';
									fields.push(table_val);
								})
						for(var i=0;i<fields.length;i++){
							$('#ScriptValueMod_table').datagrid('appendRow',{
								name: fields[i].name,
								rename:'',
								type:'String',
								length:'',
								precision:'',
								replace:fields[i].replace,
							});
						}
						});
						$('#ScriptValueMod_test').unbind('click').click(function(e){});
						function initTab(){
							 var tabs=creatTab.tabs('tabs');
		                	 $.each(tabs,function(i,o){
		                		 creatTab.tabs('close',i);        		 
		                	 });
		                	 number.handle('zero');//归零
		                	 creatTab.remove();//从dom中移除创建的tab
						}
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
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