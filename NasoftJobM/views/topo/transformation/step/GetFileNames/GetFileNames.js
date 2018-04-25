 Nasoft.Topo.transferFns.GetFileNames=function(node){
	 console.log(node);
	 var getfilename = [{name:"filename",type:"String",format:"",length:"500",precision:"",trim_type:"none"},
	                    {name:"short_filename",type:"String",format:"",length:"500",precision:"",trim_type:"none"},
	                    {name:"path",type:"String",format:"",length:"500",precision:"",trim_type:"none"},
	                    {name:"type",type:"String",format:"",length:"500",precision:"",trim_type:"none"},
	                    {name:"exists",type:"Boolean",format:"",length:"",precision:"",trim_type:"none"},
	                    {name:"ishidden",type:"Boolean",format:"",length:"",precision:"",trim_type:"none"},
	                    {name:"isreadable",type:"Boolean",format:"",length:"",precision:"",trim_type:"none"},
	                    {name:"iswriteable",type:"Boolean",format:"",length:"",precision:"",trim_type:"none"},
	                    {name:"lastmodifiedtime",type:"Date",format:"",length:"",precision:"",trim_type:"none"},
	                    {name:"size",type:"Integer",format:"#.#",length:"",precision:"0",trim_type:"none"},
	                    {name:"extension",type:"String",format:"",length:"",precision:"",trim_type:"none"},
	                    {name:"uri",type:"String",format:"",length:"",precision:"",trim_type:"none"},
	                    {name:"rooturi",type:"String",format:"",length:"",precision:"",trim_type:"none"}

	 ];
     return getfilename;
  };
  //获取上一个节点的步骤名
  Nasoft.Topo.getStepName=function(node){
	  console.log(node);
	  if(!!node.inLinks && node.inLinks.length > 0){
		  var stepname=[];
			for (var i = 0; i < node.inLinks.length; i++) {
				var nodeA={}
				nodeA.text= node.inLinks[i].nodeA.text//获取上个节点的name名称
				stepname.push(nodeA)
			}
			return stepname
	  }else{
		  return null;
	  }
  };   
  
Nasoft.Window.fns.GetFileNames = function(node) {
	Nasoft.Ui_extend.browser_even('#GetFileNames');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen = function() {
		try {
			console.log({"node" : node});
			$('#step_name_selectValues').textbox('setValue', node.text);// 设置步骤名称
			if (node.getStep().filename_Field == undefined) {
				$('#field_file_naem').textbox('setValue', '');
			} else {
				$('#field_file_naem').textbox('setValue',
						node.getStep().filename_Field);
			}
			if (node.getStep().wildcard_Field == undefined) {
				$('#file_obtain').textbox('setValue', '');
			} else {
				$('#file_obtain').textbox('setValue',
						node.getStep().wildcard_Field);
			}

			if (node.getStep().exclude_wildcard_Field == undefined) {
				$('#tong_pei_fu').textbox('setValue', '');
			} else {
				$('#tong_pei_fu').textbox('setValue',
						node.getStep().exclude_wildcard_Field);
			}
			if (node.getStep().rownum_field == undefined) {
				$('#line_mark_name').textbox('setValue', '');
			} else {
				$('#line_mark_name').textbox('setValue',
						node.getStep().rownum_field);
			}
			if (node.getStep().limit == undefined) {
				$('#astrict').textbox('setValue', '');
			} else {
				$('#astrict').textbox('setValue', node.getStep().astrict);
			}
			if (node.getStep().filefield && node.getStep().filefield === "N") {
				$('#GetFileNames_check').get(0).checked = false;
				$('#field_file_naem').textbox('disable');
				$('#file_obtain').textbox('disable');
				$('#tong_pei_fu').textbox('disable');
				$('#character_catalogue').prop('disabled', true);
				$('#file_catalogue').textbox('enable');
				$('#GetFileNames_increase').linkbutton('enable');
				$('#GetFileNames_browse').linkbutton('enable');
				$('#regular_expression').textbox('enable');
				$('#astrict').textbox('enable');
				$('#regular_expression_remove').textbox('enable');
				$('#tableInput_filename').linkbutton('enable');
				$('#tableInput_delete').linkbutton('enable');
				$('#tableInput_compile').linkbutton('enable');
				$('#GetFileNames_preview').linkbutton('enable');
			} else if (node.getStep().filefield
					&& node.getStep().filefield === "Y") {
				$('#GetFileNames_check').get(0).checked = true;
				$('#astrict').textbox('disable');
				$('#file_catalogue').textbox('disable');
				$('#GetFileNames_increase').linkbutton('disable');
				$('#GetFileNames_browse').linkbutton('disable');
				$('#regular_expression').textbox('disable');
				$('#regular_expression_remove').textbox('disable');

				$('#tableInput_filename').linkbutton('disable');
				$('#tableInput_delete').linkbutton('disable');
				$('#tableInput_compile').linkbutton('disable');
				$('#GetFileNames_preview').linkbutton('disable');
				var rowss = $('#getFileNames_file_table').datagrid('getRows');//获取当前页面中所有的行
				$.each(rowss, function(i, o) {
					$('#getFileNames_file_table').datagrid('endEdit', i);//结束编辑所有行
				});
				$('#field_file_naem').textbox('enable');
				$('#file_obtain').textbox('enable');
				$('#tong_pei_fu').textbox('enable');
				$('#character_catalogue').prop('disabled', false);
				after_field_getfilename()
			} else {
				$('#GetFileNames_check').get(0).checked = false;
				$('#field_file_naem').textbox('disable');
				$('#file_obtain').textbox('disable');
				$('#tong_pei_fu').textbox('disable');
				$('#character_catalogue').prop('disabled', true);
				$('#file_catalogue').textbox('enable');
				$('#GetFileNames_increase').linkbutton('enable');
				$('#GetFileNames_browse').linkbutton('enable');
				$('#regular_expression').textbox('enable');
				$('#astrict').textbox('enable');
				$('#regular_expression_remove').textbox('enable');
				$('#tableInput_filename').linkbutton('enable');
				$('#tableInput_delete').linkbutton('enable');
				$('#tableInput_compile').linkbutton('enable');
				$('#GetFileNames_preview').linkbutton('enable');
			}

			if (node.getStep().dynamic_include_subfolders
					&& node.getStep().dynamic_include_subfolders === "N") {
				$('#character_catalogue').get(0).checked = false;
			} else if (node.getStep().dynamic_include_subfolders === "Y") {
				$('#character_catalogue').get(0).checked = true;
			} else {
				$('#character_catalogue').get(0).checked = false;
			}
			if (node.getStep().rownum && node.getStep().rownum === "N") {
				$('#linemark').get(0).checked = false;
			} else if (node.getStep().rownum === "Y") {
				$('#linemark').get(0).checked = true;
			} else {
				$('#linemark').get(0).checked = false;
			}
			if (node.getStep().doNotFailIfNoFile
					&& node.getStep().doNotFailIfNoFile === "N") {
				$('#not_have_file').get(0).checked = false;
			} else if (node.getStep().doNotFailIfNoFile === "Y") {
				$('#not_have_file').get(0).checked = true;
			} else {
				$('#not_have_file').get(0).checked = false;
			}
			console.log(node.getStep().isaddresult)
			if (node.getStep().isaddresult
					&& node.getStep().isaddresult === "N") {
				$('#GetFileNames_add_file_name').get(0).checked = false;
			} else if (node.getStep().isaddresult === "Y") {
				$('#GetFileNames_add_file_name').get(0).checked = true;
				
			} else {
				$('#GetFileNames_add_file_name').get(0).checked = false;
				
			}
			$('#file_catalogue').textbox('setValue', '');
			$('#regular_expression').textbox('setValue', '');
			$('#regular_expression_remove').textbox('setValue', '');
			$('#GetFileNames_check').unbind('click').click(function(e) {//点击文件名在字段里的复选框
				if ($('#GetFileNames_check').get(0).checked) {
					$('#astrict').textbox('disable');
					$('#file_catalogue').textbox('disable');
					$('#GetFileNames_increase').linkbutton('disable');
					$('#GetFileNames_browse').linkbutton('disable');
					$('#regular_expression').textbox('disable');
					$('#regular_expression_remove').textbox('disable');

					$('#tableInput_filename').linkbutton('disable');
					$('#tableInput_delete').linkbutton('disable');
					$('#tableInput_compile').linkbutton('disable');
					$('#GetFileNames_preview').linkbutton('disable');
					var rowss = $('#getFileNames_file_table').datagrid('getRows');//获取当前页面中所有的行
					$.each(rowss, function(i, o) {
						$('#getFileNames_file_table').datagrid('endEdit', i);//结束编辑所有行
					});
					$('#field_file_naem').textbox('enable');
					$('#file_obtain').textbox('enable');
					$('#tong_pei_fu').textbox('enable');
					$('#character_catalogue').prop('disabled', false);
					after_field_getfilename();
				} else {
					$('#field_file_naem').textbox('disable');
					$('#file_obtain').textbox('disable');
					$('#tong_pei_fu').textbox('disable');
					$('#character_catalogue').prop('disabled', true);
					$('#file_catalogue').textbox('enable');
					$('#GetFileNames_increase').linkbutton('enable');
					$('#GetFileNames_browse').linkbutton('enable');
					$('#regular_expression').textbox('enable');
					$('#astrict').textbox('enable');
					$('#regular_expression_remove').textbox('enable');
					$('#tableInput_filename').linkbutton('enable');
					$('#tableInput_delete').linkbutton('enable');
					$('#tableInput_compile').linkbutton('enable');
					$('#GetFileNames_preview').linkbutton('enable');
				}
			})
			$('#GetFileNames_increase').unbind('click').click(function(){//点击添加事件	
				if(!$('#GetFileNames_check').get(0).checked){
				var fileName2 = $('#file_catalogue').textbox('getValue')
				var fileName = $('#file_catalogue_h').val();
				var rule = $('#regular_expression').val();
				var regule = $('#regular_expression_remove').val();
				$('#file_catalogue').textbox('setValue','');
				$('#regular_expression').textbox('setValue','');//规则表达式
				$('#regular_expression_remove').textbox('setValue','');//正则表达式
				if(fileName !='' || fileName2 !=''){
					$('#getFileNames_file_table').datagrid('insertRow',{
						row: {
							name:fileName2, 
							filemask:rule,
							exclude_filemask:regule,
							file_required:'否',
							include_subfolders:'否',
							namepath:fileName
						}
					});
				}
				$('#file_catalogue_h').val('');
			}
				});
			//自定义方法 处理获取到的字段
			function after_field_getfilename(){
				var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArry){
					var  transfer=Nasoft.Util.transferArray_copy(transferArry)
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					$('#field_file_naem').combobox({
						valueField :"value",
						textField : "text",
						data :Nasoft.Util.file_name_combobox(transfer)
					});
					$('#file_obtain').combobox({
						valueField :"value",
						textField : "text",
						data :Nasoft.Util.file_name_combobox(transfer)
					});
					$('#tong_pei_fu').combobox({
						valueField :"value",
						textField : "text",
						data :Nasoft.Util.file_name_combobox(transfer)
					});
				}
			}
			var newObject = node.getStep().file;

			if(!!newObject&&(typeof newObject.name) == 'object' ){
				console.log(newObject.field != Object);
				var newObjectShow = {};
				var newArrayList = []; 
				$.each(newObject.name,function(i,o){
					var newObjectResult = {};
					newObjectResult.name = o;
					newObjectResult.filemask = newObject.filemask[i];
					newObjectResult.exclude_filemask = newObject.exclude_filemask[i];
					newObjectResult.file_required = newObject.file_required[i];
					newObjectResult.include_subfolders = newObject.include_subfolders[i];
					newObjectResult.namepath=newObject.namepath;
					newArrayList.push(newObjectResult);
				});
				newObjectShow.field = newArrayList;
			}
			$('#getFileNames_file_table').datagrid({
				rownumbers:true,
				fit:true,
				data:newObjectShow!=undefined?{total:1, rows : $.isArray(newObjectShow.field) ?
						newObjectShow.field:[newObjectShow.field]}:{total:0,rows:[]},
			    columns:[[
			        {field:'name',title:'文件/目录',width:100,editor:{
			            type:'text'
			        }},    
			        {field:'filemask', title:'通配符',width:60,editor:{
			            type:'text'
			        }},
			        {field:'exclude_filemask',title:'通配符(排除)',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'file_required',title:'要求',width:60,editor:{type:'combobox',
			        	options:{
		            		valueField: 'value',
		            		textField: 'label',
		            		editable : false,
		            		data: [{
	                			label: '是',
	                			value: 'Y'
	                		},{
	                			label: '否',
	                			value: 'N'
	                		}],
			        	}   	
			        }}, 
			        {field:'include_subfolders',title:'包含子目录',width:100,editor:{type:'combobox',
			        	options:{
		            		valueField: 'value',
		            		textField: 'label',
		            		editable : false,
		            		data: [{
	                			label: '是',
	                			value: 'Y'
	                		},{
	                			label: '否',
	                			value: 'N'
	                		}],
			        	}   	
			        }}, 
			        {field:'namepath',title:'文件真实路径',hidden:'true'}
			    ]],
						onDblClickCell : function(index, field, value) {
							console.log(field);
							if ($('#GetFileNames_check').get(0).checked) {
								$('#getFileNames_file_table').datagrid('endEdit',index);// 禁用编辑的行
							} else {
								var rows=$(this).datagrid('getRows');
								$.each(rows,function(j,o){
									j===index || $('#getFileNames_file_table').datagrid('endEdit',j);
								});	
								$('#getFileNames_file_table').datagrid('beginEdit',
										index);// 编辑点击的行

							}
							var ed = $('#getFileNames_file_table').datagrid(
									'getEditor', {
										index : 0,
										field : field
									});
							$(ed.target).focus();
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
			$('#tableInput_delete').unbind('click').click(function(e) {// 点击删除
				if(!$('#GetFileNames_check').get(0).checked){
						var tableInput_delete_row = $('#getFileNames_file_table').datagrid('getSelected');
						var tableInput_delete_rowIndex = $('#getFileNames_file_table').datagrid('getRowIndex',tableInput_delete_row);
						$('#getFileNames_file_table').datagrid('deleteRow',tableInput_delete_rowIndex);
				}
					});	
			$('#tableInput_compile').unbind('click').click(function(e) { // 点击编辑
				if(!$('#GetFileNames_check').get(0).checked){
								var tableInput_compile_row = $('#getFileNames_file_table').datagrid('getSelected');
								var tableInput_compile_name = tableInput_compile_row.name;
								var tableInput_compile_filemask = tableInput_compile_row.filemask;
								var tableInput_compile_exclude_filemask = tableInput_compile_row.exclude_filemask;
								$('#file_catalogue').textbox('setValue',tableInput_compile_name);
								$('#regular_expression').textbox('setValue',tableInput_compile_filemask);
								$('#regular_expression_remove').textbox('setValue',tableInput_compile_exclude_filemask);
								$('#file_catalogue_h').val(tableInput_compile_row.namepath);
								var tableInput_compile_rowIndex = $('#getFileNames_file_table').datagrid('getRowIndex', tableInput_compile_row);
								$('#getFileNames_file_table').datagrid('deleteRow',tableInput_compile_rowIndex);
				}
							});
			$('#GetFileNames_browse').unbind('click').click(function(e) { // 点击浏览
				        if(!$('#GetFileNames_check').get(0).checked){
				        	Nasoft.Static.handleFilePostfix('#file_catalogue','#file_catalogue_h',{},'3','');
				        }
					});
			$('#GetFileNames_window_filename').window({// 设置显示名称的弹出框属性
								width : 700,
								height : 240,
								modal : true,
								minimizable : false,
								maximizable : false,
								collapsible : false,
								closable : true,
								title : 'Files read',
								content : '<br><span style="color:#balick">过滤:</span><input class="easyui-textbox" name="getFileNames_search" id="getFileNames_search" style="width:200px;"/>&nbsp;&nbsp;<a class="easyui-linkbutton" name="GetFileNames_inquiries" id="GetFileNames_inquiries" style="width:50px;">查询</a><br><ul class="easyui-datalist" title="Files read" style="width:650px;height:100px" id="getFileNames_table_datalist"></ul><br><center><a class="easyui-linkbutton" name="GetFileNames_shut" id="GetFileNames_shut" style="width:50px;">关闭</a></center>'
							});
			$('#GetFileNames_window_filename').window('close');			
			$('#tableInput_filename').unbind('click').click(function(e) {// 点击显示文件名称
				if(!$('#GetFileNames_check').get(0).checked){
						$('#GetFileNames_window_filename').window('open');
						var data = Nasoft.GetProjectData.getFields('#getFileNames_file_table')
						if(!!data){
							$('#getFileNames_table_datalist').datalist({
								data : $.isArray(data.field) ? data.field
										: [ data.field ],
										columns : [ [ {
											field : 'name',
											title : '文件/目录',
											width : 80,
											editor : {
												type : 'text'
											}
										} ] ],
										
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
							
						}else{
							$('#getFileNames_table_datalist').datalist({
										columns : [ [ {
											field : 'name',
											title : '文件/目录',
											width : 80,
											editor : {
												type : 'text'
											}
										} ] ],
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
						}
			}
					});
			$('#GetFileNames_inquiries').unbind('click').click(function() {//点击查询
						var sFind = $('#getFileNames_search').textbox('getValue');
						var vData = $('#getFileNames_file_table').datalist('getRows');// 获取当前页面中所有的行
						if (sFind != "") {
							var vResult = [];
							$.each(vData, function(i, o) {
								var nPos = -1;
								for ( var key in o) {
									if (key === 'name') {
										nPos = o[key].indexOf(sFind)
									}
								}
								if (nPos >= 0) {
									vResult[vResult.length] = o;
								}
							});
							$('#getFileNames_table_datalist').datalist({//重新设置弹出框列表的属性
								data : vResult,
								columns : [ [ {
									field : 'name',
									title : '文件/目录',
									width : 80,
									editor : {
										type : 'text'
									}
								} ] ],
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
						}

					});								
			$('#GetFileNames_shut').unbind('click').click(function(e) {// 点击弹出窗口的关闭
				$('#GetFileNames_window_filename').window('close');
			});			
			$('#GetFileNames_window_preview').window(// 设置预览弹出框属性
							{
								width : 240,
								height : 120,
								modal : true,
								minimizable : false,
								maximizable : false,
								collapsible : false,
								closable : true,
								title : '输入预览大小',
								content : '<span style="color:#balick">输入你想预览的记录行数:</span><br><input class="easyui-textbox" name="getFileNames_notes" id="getFileNames_notes" style="width:200px;"/><br><a class="easyui-linkbutton" id="GetFileNames_preview_ok" style="width:60px;">确定</a><a class="easyui-linkbutton" id="GetFileNames_preview_cancel" style="width:60px;">取消</a>',
							});
			$('#GetFileNames_window_preview').window('close');	
			$('#GetFileNames_window_fileProperty').window(// 设置预览弹出框属性
					{
						width : 1100,
						height : 400,
						modal : true,
						minimizable : true,
						maximizable : true,
						collapsible : false,
						closable : true,
						title : '预览记录',
						content:'<span id="span_GetFileNames_window_fileProperty" style="color:#balick; width: 50px;padding: 10px;"></span><br><div style="width: 1050px;height:280px;padding: 10px;"><table id="GetFileNames_table_fileProperty"></table></div><div><center><a class="easyui-linkbutton" id="GetFileNames_window_fileProperty_cancel" style="width: 60px;">关闭</a></center></div>'
              });
	        $('#GetFileNames_window_fileProperty').window('close');	
			$('#GetFileNames_table_fileProperty').datagrid({
				rownumbers : true,
				fit : true,
				fitColumns : true,
				onBeforeSelect : function() {
					return false;
				},
				columns : [ [ {
					field : 'fileName',
					title : 'filename',
					align : 'center',
					halign : 'center'
				}, {
					field : 'shortFileName',
					title : 'short_filename',
					align : 'center',
					halign : 'center',
				}, {
					field : 'path',
					title : 'path',
					align : 'center',
					halign : 'center',
				}, {
					field : 'type',
					title : 'type',
					align : 'center',
					halign : 'center',
				}, {
					field : 'exists',
					title : 'exists',
					align : 'center',
					halign : 'center'
				}, {
					field : 'ishidden',
					title : 'ishidden',
					align : 'center',
					halign : 'center'
				}, {
					field : 'isreadable',
					title : 'isreadable',
					align : 'center',
					halign : 'center'
				}, {
					field : 'iswriteable',
					title : 'iswriteable',
					align : 'center',
					halign : 'center'
				}, {
					field : 'lastmodifiedtime',
					title : 'lastmodifiedtime',
					align : 'center',
					halign : 'center'
				}, {
					field : 'size',
					title : 'size',
					align : 'center',
					halign : 'center'
				}, {
					field : 'extension',
					title : 'extension',
					align : 'center',
					halign : 'center'
				},{
					field : 'uri',
					title : 'uri',
					align : 'center',
					halign : 'center'
				}, {
					field : 'rooturi',
					title : 'rooturi',
					align : 'center',
					halign : 'center'
				}  ] ],
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
				},
			});
			$('#GetFileNames_preview').unbind('click').click(function(e) {// 点击预览
				if(!$('#GetFileNames_check').get(0).checked){
				$('#GetFileNames_window_preview').window('open');
				}
			});
			$('#GetFileNames_preview_ok').unbind('click').click(function(e) {//点击预览弹出框的确定按钮
			var notes=$('#getFileNames_notes').textbox('getValue');
			var rows = $('#getFileNames_file_table').datagrid('getRows');// 获取当前页面中所有的行
			var path = new Array();// 新建一个id存储集合	
			if(!isNaN(notes)&&notes>0){
				if(rows.length==0){
					 alert("请先添加预览文件!");
					return;
				}
				   for(var i=0;i<notes;i++){
					   if(i>=rows.length){
						   break;
					   }else{
						   path[i]=rows[i].namepath
					   }
				   }
				}else{
				   alert("请输入正确的格式!如:10");
				   return;
				}
			$.ajax({
				url : $.getRootPath() + '/FileInfoCtrl/fileAttributesInformation.do',
				traditional : true,
				data : {
					"path" : [path]
				},
				dataType : "json",
				type : "POST",
				success : function(data) {
					console.log(data)
					$('#span_GetFileNames_window_fileProperty').text("步骤  获取文件名  的数据   ("+data.length+" rows)"); 
					$('#GetFileNames_table_fileProperty').datagrid({
						data:data
					});
					$('#getFileNames_notes').textbox('setValue',"");
					$('#GetFileNames_window_preview').window('close');
					$('#GetFileNames_window_fileProperty').window('open');
				}
			});
			})
			$('#GetFileNames_preview_cancel').unbind('click').click(function(e) {//预览弹出框的取消按钮
				$('#GetFileNames_window_preview').window('close');
			});
			$('#GetFileNames_window_fileProperty_cancel').unbind('click').click(function(e) {//预览弹出框的取消按钮
				$('#GetFileNames_window_fileProperty').window('close');
			});
			$('#obtain').combobox({// 设置获取下拉框属性
				valueField : 'label',
				textField : 'value',
				data : [ {
					label : 'all_files',
					value : '所有文件'
				}, {
					label : 'only_files',
					value : '只获取文件'
				}, {
					label : 'only_folders',
					value : '只获取目录'
				} ]

			});
			$('#GetFileNames_ok').unbind('click').click(function() {// 点击确定
				var GetFileNames = {};// 定义一个表输出对象
				var field_file_naem = $('#field_file_naem').textbox('getValue');// 获取字段获取名
				GetFileNames.filename_Field = (field_file_naem == null || field_file_naem == '') ? '': field_file_naem;//保存字段获取名
				GetFileNames.connection = node.getConnectionName();
				node.text = $('#step_name_selectValues').textbox('getValue');
				var rows = $('#getFileNames_file_table').datagrid('getRows');// 获取当前页面中所有的行
				$.each(rows, function(i, o) {
					$('#getFileNames_file_table').datagrid('endEdit', i);// 结束编辑所有行
				});

				
				var file=Nasoft.GetProjectData.getFields('#getFileNames_file_table');//将对应数据字段加入表输出	
				if(!!file&&file.field.constructor==Array){//数组
					var resulttable = {};
					var fileName = [];
					var filemask = [];
					var exclude_filemask = [];
					var file_required = [];
					var include_subfolders = [];
					var namepath=[];
					$.each(file.field,function(i,o){
						var file_required_chuli =  o.file_required == 'Y' ? 'Y' : 'N'					
						var include_subfolders_chuli =  o.include_subfolders == 'Y' ? 'Y' : 'N'	
						fileName[i] = o.name;
						filemask[i] = o.filemask;
						exclude_filemask[i] = o.exclude_filemask;
						file_required[i] = file_required_chuli;
						include_subfolders[i] = include_subfolders_chuli;
						namepath=o.namepath;
					});
					
					resulttable.name = fileName;
					resulttable.filemask = filemask;
					resulttable.exclude_filemask = exclude_filemask;
					resulttable.file_required = file_required;
					resulttable.include_subfolders =  include_subfolders;
					resulttable.namepath=namepath;
					if(file.field!=0){
						GetFileNames.file=resulttable;		
					}
				    }else if(!!file){//对象
					    var oldFile = file.field;
					    GetFileNames.file = oldFile;
				}
				
				
				
				var filename = $('#step_name_selectValues').textbox('getValue');//步骤名称
				GetFileNames.name = filename;// 
				var file_obtain = $('#file_obtain').textbox('getValue');//从字段获取通配符
				GetFileNames.wildcard_Field = (file_obtain == null || file_obtain == '') ? '': file_obtain;
				var line_mark_name = $('#line_mark_name').textbox('getValue');//行号字段名
				GetFileNames.rownum_field = (line_mark_name == null || line_mark_name == '') ? '': line_mark_name;
				var astrict = $('#astrict').textbox('getValue');// 限制
				GetFileNames.limit = (astrict == null || astrict == '') ? '': astrict;
				var GetFileNames_check = $('#GetFileNames_check').get(0).checked;// 文件名定义在字段里
				GetFileNames.filefield = !GetFileNames_check ? 'N' : 'Y';
				var character_catalogue = $('#character_catalogue').get(0).checked;// 包含子目录
				GetFileNames.dynamic_include_subfolders = !character_catalogue ? 'N': 'Y';
				var linemark = $('#linemark').get(0).checked;// 在输出中包含行号
				GetFileNames.rownum = !linemark ? 'N' : 'Y';
				var not_have_file = $('#not_have_file').get(0).checked;// 当没有文件或目录时不报错
				GetFileNames.doNotFailIfNoFile = !not_have_file ? 'N' : 'Y';
				var add_file_name = $('#GetFileNames_add_file_name').get(0).checked;// 将文件名增加到结果文件列表中
				GetFileNames.isaddresult = !add_file_name ? 'N' : 'Y';
				console.log(GetFileNames.isaddresult);
				var tong_pei_fu = $('#tong_pei_fu').textbox('getValue');// 通配符(排除)
				GetFileNames.exclude_wildcard_Field = (tong_pei_fu == null || tong_pei_fu == '') ? '': tong_pei_fu;
				node.setStep(GetFileNames);// 将步骤的配置属性放入节点中
				node.setTransfer();
				$('#GetFileNames').window('close');// 关闭弹窗
			});	
			$('#GetFileNames_cancel').unbind('click').click(function() {// 点击取消

				$('#GetFileNames').window('close');// 关闭弹窗

			});

		} catch (e) {
			// TODO: handle exception
			console.log(e)
		}

	};
	onBeforeClose = function() {
	}
	return {
		onBeforeOpen : onBeforeOpen,
		onBeforeClose : onBeforeClose
	};
}