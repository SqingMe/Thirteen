 Nasoft.Topo.transferFns.TextFileInput=function(node){
	 var file=node.getStep().fields;//将对应数据字段加入表输出
	 var textFileInput = [];
	 if(!!file){		 
		 if(file.field.constructor==Array){//数组		
			 $.each(file.field,function(i,o){
				 var field={};
				 field.name= o.name;
				 field.type=o.type;
				 field.format=o.format;
				 field.length=o.length;
				 field.precision=o.precision;
				 field.trim_type=o.trim_type;
				 textFileInput.push(field)
			 });		
		 }else{//对象
			 var oldFile ={} 
			 oldFile.name=file.field.name;
			 oldFile.type=file.field.type;
			 oldFile.format=file.field.format;
			 oldFile.length=file.field.length;
			 oldFile.precision=file.field.precision;
			 oldFile.trim_type=file.field.trim_type;
			 textFileInput.push(oldFile)
		 }
	 }
        return textFileInput;
  };
Nasoft.Window.fns.TextFileInput=function(node){
	Nasoft.Ui_extend.browser_even('#TextFileInput');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose;
	onBeforeOpen=function(){//打开窗口执行的
		try{
			node.getStep();
		//*************************浏览按钮部分************************************
			var options_extend={//点击浏览按钮,自定义方法
					onClick:function(node){
						try{
							if(!(node.state=='closed' || node.children)){
								$('#static_handleFile_ok').linkbutton('disable');
							}else{
								$('#error_jinggao_textFileInput_h').val(node.path);	
								
								
								$('#error_jinggao_textFileInput').textbox('setValue',node.path);						
								$('#static_handleFile_win').window('close');
							}
						}catch (e) {
							console.log(e)
						}							
					},
					onSelect:function(node){
						if(!(node.state=='closed' || node.children)){//被选中节点为文件
							$('#static_handleFile_ok').linkbutton('disable');
						}else{
							$('#static_handleFile_ok').linkbutton('enable');
							$('#static_handleFile_path').textbox('setValue',node.path);
						}
					},
					onOk:function(path_value,$show,node){
							$($show).textbox('setValue',path_value);			
							$('#static_handleFile_win').window('close');//关闭当前窗口
					}
					
			}	
			var options_extend1={//点击浏览按钮,自定义方法
					onClick:function(node){
						try{
							if(!(node.state=='closed' || node.children)){
								$('#static_handleFile_ok').linkbutton('disable');
							}else{
								$('#error_fileMuLu_textFileInput_h').val(node.path);			
								$('#error_fileMuLu_textFileInput').textbox('setValue',node.path);						
								$('#static_handleFile_win').window('close');
							}
						}catch (e) {
							console.log(e)
						}							
					},
					onSelect:options_extend.onSelect,
					onOk:options_extend.onOk
					
			}	
			var options_extend2={//点击浏览按钮,自定义方法
					onClick:function(node){
						try{
							if(!(node.state=='closed' || node.children)){
								$('#static_handleFile_ok').linkbutton('disable');
							}else{
								$('#error_failLine_textFileInput_h').val(node.path);			
								$('#error_failLine_textFileInput').textbox('setValue',node.path);						
								$('#static_handleFile_win').window('close');
							}
						}catch (e) {
							console.log(e)
						}							
					},
					onSelect:options_extend.onSelect,
					onOk:options_extend.onOk
			}	
		$('#filelook').unbind('click').click(function(){//点击浏览
			Nasoft.Static.handleFilePostfix('#textFileInput_handle_file','#textFileInput_handle_file_h',{},'3','');
		});	
		
		$('#extend_textFileInput').unbind('click').click(function(){	//点击浏览
			$('#error_hidden_textFileInput').prop('checked') == true ? Nasoft.Static.handleFilePostfix('#error_jinggao_textFileInput','#error_jinggao_textFileInput_h',options_extend,'3','') : null;
		});	
		$('#extend1_textFileInput').unbind('click').click(function(){	//点击浏览
			$('#error_hidden_textFileInput').prop('checked') == true ? Nasoft.Static.handleFilePostfix('#error_fileMuLu_textFileInput','#error_fileMuLu_textFileInput_h',options_extend1,'3','') : null;
		});	
		$('#extend2_textFileInput').unbind('click').click(function(){	//点击浏览
			$('#error_hidden_textFileInput').prop('checked') == true ? Nasoft.Static.handleFilePostfix('#error_failLine_textFileInput','#error_failLine_textFileInput_h',options_extend2,'3','') : null;
		});
        
		$('#add_textFileInput').unbind('click').click(function(){//点击添加事件	
			var fileName2 = $('#textFileInput_handle_file').textbox('getValue')
			var fileName = $('#textFileInput_handle_file_h').val();
			var rule = $('#rule_textFileInput').val();
			var regule = $('#regular_textFileInput').val();
			$('#textFileInput_handle_file').textbox('setValue','');
			$('#rule_textFileInput').textbox('setValue','');//规则表达式
			$('#regular_textFileInput').textbox('setValue','');//正则表达式
			
			/*if(fileName !='' && fileName2 !=''){
			}*/
			$('#Selected_file_textFileInput').datagrid('insertRow',{
				row: {
					name:fileName2, 
					filemask:rule,
					exclude_filemask:regule,
					file_required:'否',
					include_subfolders:'否',
					namepath:fileName
				}
			});
			$('#textFileInput_handle_file_h').val('');
		});
		
		$('#delete_textFileInput').unbind('click').click(function(){//点击删除事件
			var row = $('#Selected_file_textFileInput').datagrid('getSelected');
			if(row){
				var rowIndex = $('#Selected_file_textFileInput').datagrid('getRowIndex',row);
				 $('#Selected_file_textFileInput').datagrid('deleteRow', rowIndex);  
			}else{
				alert("请选中一行");
			}	
		});
		//*****************************第一部分（文件）*************************************
		
		$('#fri-name_textFileInput').textbox('setValue',node.text);//设置步骤名称
		
		$('#textFileInput_handle_file,#rule_textFileInput').textbox({//默认是显示的状态（浏览和文件输入框）
			disabled:false,         
		});
		
		$('#beforfilename_textFileInput').change(function(){//显示和隐藏（从之前步骤接受文件名）
			if($("#beforfilename_textFileInput").prop("checked")==true){
				
				$('#beforfield_textFileInput').removeAttr("disabled");	
				
				$('#inputfieldfilename_textFileInput').textbox({    
					disabled:false,         
				});
				$('#readfilename_textFileInput').combobox({    
					disabled:false,         
				});
				$('#inputfieldfilename_textFileInput,#readfilename_textFileInput').textbox({    
					disabled:false,         
				});
				$('#textFileInput_handle_file,#rule_textFileInput').textbox({    
					disabled:true,         
				});
				$('#filelook').linkbutton('disable');
				$('#add_textFileInput').linkbutton('disable');
				$('#delete_textFileInput').linkbutton('disable');
				var rowss = $('#Selected_file_textFileInput').datagrid('getRows');//获取当前页面中所有的行
				$.each(rowss, function(i, o) {
					$('#Selected_file_textFileInput').datagrid('endEdit', i);//结束编辑所有行
				});
				textfileinput_steptname();
			}else{
				console.log("点击为false");
				$("#beforfield_textFileInput").attr("disabled","");
				$("#beforfield_textFileInput").prop("checked",false);
				$('#inputfieldfilename_textFileInput').textbox({    
					disabled:true,         
				});
				$('#readfilename_textFileInput').combobox({    
					disabled:true,         
				});
				$('#textFileInput_handle_file,#rule_textFileInput').textbox({    
					disabled:false,         
				});
				$('#filelook').linkbutton('enable');
				$('#add_textFileInput').linkbutton('enable');
				$('#delete_textFileInput').linkbutton('enable');

			}
		});
		
		$('#textFileInput_handle_file').textbox('setValue','');//浏览
		
		$('#rule_textFileInput').textbox('setValue','');//规则表达式
		
		$('#regular_textFileInput').textbox('setValue','');//正则表达式
		
//		$('#readfilename_textFileInput').textbox('setValue',node.getStep().accept_stepname);//步骤读取的文件名来自
		if(!!node.getStep().accept_stepname){
			$('#readfilename_textFileInput').combobox({
				value:node.getStep().accept_stepname  
			}); 
			
		}else{
			$('#readfilename_textFileInput').combobox({
				value:[] 
			}); 
		}
		
		$('#inputfieldfilename_textFileInput').textbox('setValue',node.getStep().accept_field);//在输入里的字段被当做文件名
		
		var newObject = node.getStep().file;
		if(!!newObject&&(typeof newObject.name) == 'object' && (newObject.name) !=null){
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
		//加载页面需要的
		$('#Selected_file_textFileInput').datagrid({ 
			rownumbers:true,
			fit:true,
			data:!!node.getStep().file&&!!node.getStep().file.name?{total:1, rows : newObjectShow!=undefined ?
					newObjectShow.field:[node.getStep().file]}:{total:0,rows:[]},
		    columns:[[
		        {field:'name',title:'文件/目录',width:350,editor:{
		            type:'text'
		        }},    
		        {field:'filemask', title:'通配符',width:80,editor:{
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
                			value: '是'
                		},{
                			label: '否',
                			value: '否'
                		}],
		        	}   	
		        }},
		        {field:'namepath',title:'文件真实路径',hidden:'true'},
		    ]],
			onClickRow:function(i,r){
	        	 var rows=$(this).datagrid('getRows');
				  $.each(rows,function(j,o){
					j===i || $('#Selected_file_textFileInput').datagrid('endEdit',j);
				  });
				  if($("#beforfilename_textFileInput").prop("checked")==false){
					  $(this).datagrid('beginEdit',i);//编辑点击的行
					  
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
		
		//从之前步骤接受字段名 	
		if (node.getStep().accept_filenames && node.getStep().accept_filenames === "N") {
			$("#beforfilename_textFileInput").get(0).checked=false;
			$("#beforfield_textFileInput").attr("disabled","");
			$("#beforfield_textFileInput").prop("checked",false);
			$('#inputfieldfilename_textFileInput').textbox({    
				disabled:true,         
			});
			$('#readfilename_textFileInput').combobox({    
				disabled:true,         
			});
			
			$('#textFileInput_handle_file,#rule_textFileInput').textbox({    
				disabled:false,         
			});
			$('#filelook').linkbutton('enable');
			$('#add_textFileInput').linkbutton('enable');
			$('#delete_textFileInput').linkbutton('enable');
		} else if (node.getStep().accept_filenames && node.getStep().accept_filenames === "Y") {
			$("#beforfilename_textFileInput").get(0).checked=true;
			$('#inputfieldfilename_textFileInput,#readfilename_textFileInput').textbox({    
				disabled:false,         
			});
			$('#readfilename_textFileInput').combobox({    
				disabled:false,         
			});
			$('#textFileInput_handle_file,#rule_textFileInput').textbox({    
				disabled:true,         
			});
			$('#filelook').linkbutton('disable');
			$('#add_textFileInput').linkbutton('disable');
			$('#delete_textFileInput').linkbutton('disable');
			var rowss = $('#Selected_file_textFileInput').datagrid('getRows');//获取当前页面中所有的行
			$.each(rowss, function(i, o) {
				$('#Selected_file_textFileInput').datagrid('endEdit', i);//结束编辑所有行
			});
			textfileinput_steptname();
		} else {
			$("#beforfilename_textFileInput").get(0).checked=false;
			$("#beforfield_textFileInput").attr("disabled","");
			$("#beforfield_textFileInput").prop("checked",false);
			$('#inputfieldfilename_textFileInput').textbox({    
				disabled:true,         
			});
			$('#readfilename_textFileInput').combobox({    
				disabled:true,         
			});
			$('#textFileInput_handle_file,#rule_textFileInput').textbox({    
				disabled:false,         
			});
			$('#filelook').linkbutton('enable');
			$('#add_textFileInput').linkbutton('enable');
			$('#delete_textFileInput').linkbutton('enable');
		}
		//从之前步骤接受字段名
		node.getStep().passing_through_fields == undefined ? $("#beforfield_textFileInput").get(0).checked=false :
		node.getStep().passing_through_fields==='Y' && ($("#beforfield_textFileInput").get(0).checked=true)
		node.getStep().passing_through_fields==='N' && ($("#beforfield_textFileInput").get(0).checked=false);
		
		//步骤读取的文件名来自
		function textfileinput_steptname(){
			var stepName=Nasoft.Topo.getStepName(node);			
				function readfilename(stepName) {//格式化 '类型',的显示数据
					var data=[]
					for (var i = 0; i < stepName.length; i++) {		
						console.log(stepName[i].text);	
						var data_a={"text":stepName[i].text,"id":stepName[i].text};
						data.push(data_a)
					}
					return data;
				}
				if(stepName!=null){
				$('#readfilename_textFileInput').combobox({
					valueField :"id",
					textField : "text",
					data :readfilename(stepName)
				});
			    }else{
			    	$('#readfilename_textFileInput').combobox({
						valueField :"id",
						textField : "text",
						data:[]
					});
			    }
			
		}
			$('#TextFileInput_window_filename')
					.window(
							{// 设置显示名称的弹出框属性
								width : 700,
								height : 240,
								modal : true,
								minimizable : false,
								maximizable : false,
								collapsible : false,
								closable : true,
								title : 'Files read',
								content : '<br><span style="color:#balick">过滤:</span><input class="easyui-textbox" name="textFileInput_search" id="textFileInput_search" style="width:200px;"/>&nbsp;&nbsp;<a class="easyui-linkbutton" name="TextFileInput_inquiries" id="TextFileInput_inquiries" style="width:50px;">查询</a><br><ul class="easyui-datalist" title="Files read" style="width:650px;height:100px" id="textFileInput_table_datalist"></ul><br><center><a class="easyui-linkbutton" name="TextFileInput_shut" id="TextFileInput_shut" style="width:50px;">关闭</a></center>'
							});
			$('#TextFileInput_window_filename').window('close');
			$('#textFileInput_filename')
					.unbind('click')
					.click(
							function(e) {// 点击显示文件名称
								if (!$('#beforfilename_textFileInput').get(0).checked) {
									$('#TextFileInput_window_filename').window(
											'open');
									var data = Nasoft.GetProjectData
											.getFields('#Selected_file_textFileInput')
									if (!!data) {
										$('#textFileInput_table_datalist')
												.datalist(
														{
															data : $
																	.isArray(data.field) ? data.field
																	: [ data.field ],
															columns : [ [ {
																field : 'name',
																title : '文件/目录',
																width : 80,
																editor : {
																	type : 'text'
																}
															} ] ],
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

									} else {
										$('#textFileInput_table_datalist')
												.datalist({
													columns : [ [ {
														field : 'name',
														title : '文件/目录',
														width : 80,
														editor : {
															type : 'text'
														}
													} ] ],
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
									}
								}
							});
			$('#TextFileInput_inquiries').unbind('click').click(
					function() {// 点击查询
						var sFind = $('#textFileInput_search').textbox(
								'getValue');
						var vData = $('#Selected_file_textFileInput').datalist(
								'getRows');// 获取当前页面中所有的行
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
							$('#textFileInput_table_datalist').datalist({//重新设置弹出框列表的属性
								data : vResult,
								columns : [ [ {
									field : 'name',
									title : '文件/目录',
									width : 80,
									editor : {
										type : 'text'
									}
								} ] ],
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
						}

					});	
			$('#TextFileInput_shut').unbind('click').click(function(e) {// 点击弹出窗口的关闭
				$('#TextFileInput_window_filename').window('close');
			});	
			$('#TextFileInput_window_line').window(//设置获取内容弹出框属性
					{
						width : 260,
						height : 120,
						modal : true,
						minimizable : false,
						maximizable : false,
						collapsible : false,
						closable : true,
						title : 'Nr of lines to view.0 means all lines.',
						content : '<span style="color:#balick">Number of lines (0=all lines)</span><br><input class="easyui-textbox"  id="textTileInput_notes" style="width:200px;"/><br><center><a class="easyui-linkbutton" id="textTileInput_preview_ok" style="width:60px;">确定</a><a class="easyui-linkbutton" id="textTileInput_preview_cancel" style="width:60px;">取消</a></center>',
					});
	        $('#TextFileInput_window_line').window('close');	
	        
			$('#textFileInput_window_fileProperty').window(// 设置内容显示弹出框属性
					{
						width : 1100,
						height : 400,
						modal : true,
						minimizable : true,
						maximizable : true,
						collapsible : false,
						closable : true,
						title : 'The content of the selected files',
						content:'<span id="span_textFileInput_window_fileProperty" style="color:#balick; width: 50px;padding: 10px;"></span><br><div style="width: 1050px;height:280px;padding: 10px;"><table id="textFileInput_table_fileProperty"></table></div><div><center><a class="easyui-linkbutton" id="textFileInput_window_fileProperty_cancel" style="width: 60px;">关闭</a></center></div>'
              });
	        $('#textFileInput_window_fileProperty').window('close');	
			$('#textFileInput_table_fileProperty').datagrid({
				rownumbers : true,
				fit : true,
				fitColumns : true,
				onBeforeSelect : function() {
					return false;
				},
				columns : [ [ {
					field : 'content',
					title : '内容',
					formatter: function(value,row,index){
							return "<span style='white-space:pre;'>"+value+"</span>";//加载数据中的空格
					}
				} ] ]
			});
			$('#textTileInput_preview_ok').unbind('click').click(function(e) {//点击文件内容弹出框的确定按钮
				var separator="0";
				if($('#head_textFileInput').get(0).checked){
					 separator = $('#inputhead_textFileInput').textbox('getValue')
				}
				if(!$('#Selected_file_textFileInput').datagrid('getSelected')) alert('请选择要获取内容的文件!');
				// 获取被选中的文件路径
				var path = $('#Selected_file_textFileInput').datagrid('getSelected').namepath;
				var notes=$('#textTileInput_notes').textbox('getValue');
				if(isNaN(notes)){
					alert("请输入正确的格式!如:10");
					return;
					}
				var notes1= parseInt(notes);
				var separator1= parseInt(separator);
				var param;
				if(notes1==0){
					param=notes1;
				}else{
					param=notes1+separator1;
				}
				$.ajax({
					url : $.getRootPath() + '/TextFileInput/textFileInputContent.do',
					traditional : true,
					data:{path:path,param:param},
					dataType : "json",
					type : "POST",
					success : function(data) {
						if(param==0){
							$('#span_textFileInput_window_fileProperty').text(data.length+" lines:"); 
						}else if(data.length<param){
							$('#span_textFileInput_window_fileProperty').text(data.length+" lines:");
						}else{
							$('#span_textFileInput_window_fileProperty').text(notes+" lines:"); 
						}
						$('#textFileInput_table_fileProperty').datagrid({
							data:data
						});
						
						$('#textTileInput_notes').textbox('setValue',"");
						$('#TextFileInput_window_line').window('close');
						$('#textFileInput_window_fileProperty').window('open');
					}
				});
				})
			$('#textFileInput_line').unbind('click').click(function(e) {//点击显示文件内容按钮
				$('#TextFileInput_window_line').window('open');
			});		
			$('#textFileInput_window_fileProperty_cancel').unbind('click').click(function(e) {//内容显示弹出框的关闭按钮
				$('#textFileInput_window_fileProperty').window('close');
			});	
	    	$('#textTileInput_preview_cancel').unbind('click').click(function(e) {//文件内容弹出框的取消按钮
				$('#TextFileInput_window_line').window('close');
			});
		//**********************************第二部分（内容）*****************************************
		
		$('#head_textFileInput').change(function(){//头部隐藏显示
			if($("#head_textFileInput").prop("checked")==true){
				$('#inputhead_textFileInput').textbox({    
					disabled:false,         
				});
			}else{
				$('#inputhead_textFileInput').textbox({    
					disabled:true,         
				});
			}
		});
		$('#endcount_textFileInput').change(function(){//尾部隐藏显示
			if($("#endcount_textFileInput").prop("checked")==true){
				$('#end_textFileInput').textbox({    
					disabled:false,         
				});
			}else{
				$('#end_textFileInput').textbox({    
					disabled:true,         
				});
			}
		});
		$('#packlinecount_textFileInput').change(function(){//包装行隐藏显示
			if($("#packlinecount_textFileInput").prop("checked")==true){
				$('#packline_textFileInput').textbox({    
					disabled:false,         
				});
			}else{
				$('#packline_textFileInput').textbox({    
					disabled:true,         
				});
			}
		});
		$('#pagelayout_textFileInput').change(function(){//分页布局隐藏显示
			if($("#pagelayout_textFileInput").prop("checked")==true){
				$('#each_recorde_textFileInput').textbox({    
					disabled:false,         
				});
				$('#word_head_textFileInput').textbox({    
					disabled:false,         
				});
			}else{
				$('#each_recorde_textFileInput').textbox({    
					disabled:true,         
				});
				$('#word_head_textFileInput').textbox({    
					disabled:true,         
				});
			}
		});
		$('#intoincludefield_textFileInput').change(function(){//包含文件名的字段名称 布局隐藏显示
			if($("#intoincludefield_textFileInput").prop("checked")==true){
				$('#intoincludefield_input_textFileInput').textbox({    
					disabled:false,         
				});
			}else{
				$('#intoincludefield_input_textFileInput').textbox({    
					disabled:true,         
				});
			}
		});
		$('#intoincludeline_textFileInput').change(function(){//行数字段名称布局隐藏显示
			if($("#intoincludeline_textFileInput").prop("checked")==true){
				$('#fieldoutlinenumber_textFileInput').removeAttr("disabled");	
				$('#intoincludeline_input_textFileInput').textbox({    
					disabled:false,         
				});
			}else{
				$("#fieldoutlinenumber_textFileInput").attr("disabled","");
				$('#intoincludeline_input_textFileInput').textbox({    
					disabled:true,         
				});
			}
		});
		
//		$('#filetype_textFileInput').combobox({ //文件类型
//			onLoadSuccess:function(){
//				var filetype_textFileInput;
//				/**
//				 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
//				 * 否则去直接获取connection的Name选中对应项,
//				 * 若没有则不选中任何
//				 */
//				filetype_textFileInput=(node.getStep().filetype_textFileInput!='' || node.getStep().filetype_textFileInput!=undefined)?node.getStep().filetype_textFileInput:'';
//				filetype_textFileInput!='' && $(this).combobox('select',filetype_textFileInput);
//			},
//		});
		if(node.getStep().enclosure=='&#x22;' || node.getStep().textlimite_textFileInput== "\""){//文本限定符
			$('#textlimite_textFileInput').textbox('setValue','"');
		}else{
			$('#textlimite_textFileInput').textbox('setValue',node.getStep().enclosure);
		}
		
		if(node.getStep().separator==undefined){//分隔符
			$('#separate_textFileInput').textbox('setValue',';');
		}else{
			var oldSeparator = node.getStep().separator;
			var newSeparator=oldSeparator.replace("&#x3b;",";");
			$('#separate_textFileInput').textbox('setValue',newSeparator);
		}
		
		var count = 0;
		$('#separate_button_textFileInput').click(function(){//点击分隔符按钮
			var tab = '';
			count++;
			for(var i = 0 ; i<count ; i++){
				console.log(count);
				 tab+="	";	 					
			}
			$('#separate_textFileInput').textbox('setValue',tab+';')
		});
		
		if(node.getStep().escapechar==undefined){//逃逸字符
			$('#escapefont_textFileInput').textbox('setValue','');
		}else{
			$('#escapefont_textFileInput').textbox('setValue',node.getStep().escapechar);
		}
		//头部	
		if(node.getStep().header==='Y'){
			$("#head_textFileInput").get(0).checked=true
			$('#inputhead_textFileInput').textbox({disabled:false,});
		}else if(node.getStep().header==='N'){
			$("#head_textFileInput").get(0).checked=false
			$('#inputhead_textFileInput').textbox({disabled:true,});
		}else if(node.getStep().header == undefined){
			$("#head_textFileInput").get(0).checked=false
			$('#inputhead_textFileInput').textbox({disabled:true,});
		}
		
		if(node.getStep().nr_headerlines==undefined){
			$('#inputhead_textFileInput').textbox('setValue','1');
		}else{
			$('#inputhead_textFileInput').textbox('setValue',node.getStep().nr_headerlines);
		}

		//尾部
		if(node.getStep().footer==='Y'){
			$("#endcount_textFileInput").get(0).checked=true
			$('#end_textFileInput').textbox({disabled:false,});
		}else if(node.getStep().footer==='N'){
			$("#endcount_textFileInput").get(0).checked=false
			$('#end_textFileInput').textbox({disabled:true,});
		}else if(node.getStep().footer == undefined){
			$("#endcount_textFileInput").get(0).checked=false
			$('#end_textFileInput').textbox({disabled:true,});
		}
		
		if(node.getStep().nr_footerlines==undefined){
			$('#end_textFileInput').textbox('setValue','1');
		}else{
			$('#end_textFileInput').textbox('setValue',node.getStep().nr_footerlines);
		}
		
		//包装行
		if(node.getStep().line_wrapped==='Y'){
			$("#packlinecount_textFileInput").get(0).checked=true
			$('#packline_textFileInput').textbox({disabled:false,});
		}else if(node.getStep().line_wrapped==='N'){
			$("#packlinecount_textFileInput").get(0).checked=false
			$('#packline_textFileInput').textbox({disabled:true,});
		}else if(node.getStep().line_wrapped == undefined){
			$("#packlinecount_textFileInput").get(0).checked=false
			$('#packline_textFileInput').textbox({disabled:true,});
		}
		
		if(node.getStep().nr_wraps==undefined){
			$('#packline_textFileInput').textbox('setValue','1');
		}else{
			$('#packline_textFileInput').textbox('setValue',node.getStep().nr_wraps);
		}
		//每页记录的行数
		if(node.getStep().layout_paged==='Y'){
			$("#pagelayout_textFileInput").get(0).checked=true;
			$('#each_recorde_textFileInput').textbox({disabled:false,});
			$('#word_head_textFileInput').textbox({disabled:false,});
		}else if(node.getStep().layout_paged==='N'){
			$("#pagelayout_textFileInput").get(0).checked=false;
			$('#each_recorde_textFileInput').textbox({disabled:true,});
			$('#word_head_textFileInput').textbox({disabled:true,});
		}else if(node.getStep().layout_paged == undefined){
			$("#pagelayout_textFileInput").get(0).checked=false;
			$('#each_recorde_textFileInput').textbox({disabled:true,});
			$('#word_head_textFileInput').textbox({disabled:true,});
		}
		
		if(node.getStep().nr_lines_per_page==undefined){
			$('#each_recorde_textFileInput').textbox('setValue','80');
		}else{
			$('#each_recorde_textFileInput').textbox('setValue',node.getStep().nr_lines_per_page);
		}
		
		//文档头部行
		if(node.getStep().nr_lines_doc_header==undefined){
			$('#word_head_textFileInput').textbox('setValue','0');
		}else{
			$('#word_head_textFileInput').textbox('setValue',node.getStep().nr_lines_doc_header);
		}
		
		//压缩
//		$('#compress_textFileInput').combobox({
//			onLoadSuccess:function(){
//				var compress;
//				/**
//				 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
//				 * 否则去直接获取connection的Name选中对应项,
//				 * 若没有则不选中任何
//				 */
//				compress_textFileInput=(node.getStep().compress_textFileInput!='' || node.getStep().compress_textFileInput!=undefined)?node.getStep().compress_textFileInput:'';
//				compress_textFileInput!='' && $(this).combobox('select',compress_textFileInput);
//			},
//		});
		
		//没有空行
		if(node.getStep().noempty==='Y'){
			$("#nonenull_textFileInput").get(0).checked=true
		}else if(node.getStep().noempty==='N'){
			$("#nonenull_textFileInput").get(0).checked=false
		}else if(node.getStep().noempty == undefined){
			$("#nonenull_textFileInput").get(0).checked=false
		}
		
		//在输出包括字段名
		if(node.getStep().include==='Y'){
			$("#intoincludefield_textFileInput").get(0).checked=true
			$('#intoincludefield_input_textFileInput').textbox({disabled:false,});
		}else if(node.getStep().include==='N'){
			$("#intoincludefield_textFileInput").get(0).checked=false
			$('#intoincludefield_input_textFileInput').textbox({disabled:true,});
		}else if(node.getStep().include == undefined){
			$("#intoincludefield_textFileInput").get(0).checked=false
			$('#intoincludefield_input_textFileInput').textbox({disabled:true,});
		}
		
		if(node.getStep().include_field==undefined){
			$('#intoincludefield_input_textFileInput').textbox('setValue','1');
		}else{
			$('#intoincludefield_input_textFileInput').textbox('setValue',node.getStep().include_field);
		}
		
		//行数字段名称
		if(node.getStep().rownum==='Y'){
			$("#intoincludeline_textFileInput").get(0).checked=true
			$('#intoincludeline_input_textFileInput').textbox({disabled:false,});
		}else if(node.getStep().rownum==='N'){
			$("#intoincludeline_textFileInput").get(0).checked=false
			$('#intoincludeline_input_textFileInput').textbox({disabled:true,});
		}else if(node.getStep().rownum == undefined){
			$("#intoincludeline_textFileInput").get(0).checked=false
			$('#intoincludeline_input_textFileInput').textbox({disabled:true,});
		}
		
		if(node.getStep().rownum_field==undefined){
			$('#intoincludeline_input_textFileInput').textbox('setValue','1');
		}else{
			$('#intoincludeline_input_textFileInput').textbox('setValue',node.getStep().rownum_field);
		}
		
		if(node.getStep().rownumByFile==='Y'){
			$("#fieldoutlinenumber_textFileInput").get(0).checked=true
		}else if(node.getStep().rownumByFile==='N'){
			$("#fieldoutlinenumber_textFileInput").get(0).checked=false
		}else if(node.getStep().rownumByFile == undefined){
			$("#fieldoutlinenumber_textFileInput").get(0).checked=false
		}
		//格式
		$('#format_textFileInput').combobox({ 
			onLoadSuccess:function(){
				var compress;
				/**
				 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
				 * 否则去直接获取connection的Name选中对应项,
				 * 若没有则不选中任何
				 */
				format_textFileInput=(node.getStep().format!='' || node.getStep().format!=undefined)?node.getStep().format:'';
				format_textFileInput!='' && $(this).combobox('select',format_textFileInput);
			},
		});
		//编码方式
		var data_combox_format=[{id:"",text:"","selected":"true"},{id:"GBK",text:"GBK"},{id:"UTF-8",text:"UTF-8"},{id:"ISO-8859-1",text:"ISO-8859-1"}]
		$('#codetype_textFileInput').combobox({ 
			  valueField:'id',   
		      textField:'text',  
		      data:data_combox_format,
			onLoadSuccess:function(){
				var compress;
				
				/**
				 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
				 * 否则去直接获取connection的Name选中对应项,
				 * 若没有则不选中任何
				 */
				codetype_textFileInput=(node.getStep().encoding!='' || node.getStep().encoding!=undefined)?node.getStep().encoding:'';
				codetype_textFileInput!='' && $(this).combobox('select',codetype_textFileInput);
			},
			onShowPanel:function(){
				var data_combox=[{id:"GBK",text:"GBK"},{id:"UTF-8",text:"UTF-8"},{id:"ISO-8859-1",text:"ISO-8859-1"}]
				$('#codetype_textFileInput').combobox({
					data:data_combox
				})
			},
		});
		
		//记录数量限制
		if(node.getStep().limit==undefined){
			$('#recodecountlimiete_textFileInput').textbox('setValue','1');
		}else{
			$('#recodecountlimiete_textFileInput').textbox('setValue',node.getStep().limit);
		}
		
		//解析日期时候是否严格要求格式
		if(node.getStep().date_format_lenient==='Y'){
			$("#dateisask_textFileInput").get(0).checked=true
		}else if(node.getStep().date_format_lenient==='N'){
			$("#dateisask_textFileInput").get(0).checked=false
		}else if(node.getStep().date_format_lenient == undefined){
			$("#dateisask_textFileInput").get(0).checked=false
		}
		
		$('#local_date_textFileInput').combobox({ //本地日期格式
			onLoadSuccess:function(){
				var compress;
				/**
				 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
				 * 否则去直接获取connection的Name选中对应项,
				 * 若没有则不选中任何
				 */
				local_date_textFileInput=(node.getStep().date_format_locale!='' || node.getStep().date_format_locale!=undefined)?node.getStep().date_format_locale:'';
				local_date_textFileInput!='' && $(this).combobox('select',local_date_textFileInput);
			},
		});
		
		//添加文件名
		if(node.getStep().add_to_result_filenames==='Y'){
			$("#addfilename_textFileInput").get(0).checked=true
		}else if(node.getStep().add_to_result_filenames==='N'){
			$("#addfilename_textFileInput").get(0).checked=false
		}else if(node.getStep().add_to_result_filenames == undefined){
			$("#addfilename_textFileInput").get(0).checked=false
		}
		
		//*****************************第三部分（错误处理）*****************************************
		$("#error_hidden_textFileInput").get(0).checked=false;
		
		$("#error_hidden_textFileInput").change(function(){//选中忽略错误文件时候的事件
			if($('#error_hidden_textFileInput').get(0).checked){
				if(!($('#error_hiddenFile_textFileInput').get(0).checked)){
					$('#error_fileField_textFileInput').textbox({disabled:true,});
					$('#error_informationField_textFileInput').textbox({disabled:true,});
				}else{
					$('#error_fileField_textFileInput').textbox({disabled:false,});
					$('#error_informationField_textFileInput').textbox({disabled:false,});
				}
				$('#error_jinggao_input_textFileInput,#error_countField_textFileInput,#error_fieldfilename_textFileInput,#error_textfield_textFileInput,#error_jinggao_textFileInput,#error_fileMuLu_textFileInput,#error_extendName_textFileInput,#error_failLine_textFileInput,#error_extendTwo_textFileInput,#error_extend_textFileInput').textbox({disabled:false});
				$('#error_hiddenFile_textFileInput').removeAttr("disabled");
				$('#error_breakline_textFileInput').removeAttr("disabled");
			}else{
				$('#error_jinggao_input_textFileInput,#error_fileField_textFileInput,#error_informationField_textFileInput,#error_countField_textFileInput,#error_fieldfilename_textFileInput,#error_textfield_textFileInput,#error_jinggao_textFileInput,#error_fileMuLu_textFileInput,#error_extendName_textFileInput,#error_failLine_textFileInput,#error_extendTwo_textFileInput,#error_extend_textFileInput').textbox({disabled:true});
				$("#error_hiddenFile_textFileInput").attr("disabled",true);
				$("#error_breakline_textFileInput").attr("disabled",true);
			}
			
		});
		$('#error_hiddenFile_textFileInput').change(function(){//选中忽略错误文件时候的事件
			if(!$('#error_hiddenFile_textFileInput').get(0).checked){
				$('#error_fileField_textFileInput').textbox({disabled:true,});
				$('#error_informationField_textFileInput').textbox({disabled:true,});
			}else{
				$('#error_fileField_textFileInput').textbox({disabled:false,});
				$('#error_informationField_textFileInput').textbox({disabled:false,});
			}
		});
		if(node.getStep().error_ignored==='Y'){//忽略错误
			$("#error_hidden_textFileInput").get(0).checked=true
			$('#error_jinggao_input_textFileInput,#error_fileField_textFileInput,#error_informationField_textFileInput,#error_countField_textFileInput,#error_fieldfilename_textFileInput,#error_textfield_textFileInput,#error_jinggao_textFileInput,#error_fileMuLu_textFileInput,#error_extendName_textFileInput,#error_failLine_textFileInput,#error_extendTwo_textFileInput,#error_extend_textFileInput').textbox({disabled:true});
		}else if(node.getStep().error_ignored==='N'){
			$("#error_hidden_textFileInput").get(0).checked=false
			$('#error_jinggao_input_textFileInput,#error_fileField_textFileInput,#error_informationField_textFileInput,#error_countField_textFileInput,#error_fieldfilename_textFileInput,#error_textfield_textFileInput,#error_jinggao_textFileInput,#error_fileMuLu_textFileInput,#error_extendName_textFileInput,#error_failLine_textFileInput,#error_extendTwo_textFileInput,#error_extend_textFileInput').textbox({disabled:false});
		}else if(node.getStep().error_ignored == undefined){
			$("#error_hidden_textFileInput").get(0).checked=false
			$('#error_jinggao_input_textFileInput,#error_fileField_textFileInput,#error_informationField_textFileInput,#error_countField_textFileInput,#error_fieldfilename_textFileInput,#error_textfield_textFileInput,#error_jinggao_textFileInput,#error_fileMuLu_textFileInput,#error_extendName_textFileInput,#error_failLine_textFileInput,#error_extendTwo_textFileInput,#error_extend_textFileInput').textbox({disabled:false});
		}
		if(node.getStep().skip_bad_files==='Y'){//忽略错误文件
			$("#error_hiddenFile_textFileInput").get(0).checked=true
		}else if(node.getStep().skip_bad_files==='N'){
			$("#error_hiddenFile_textFileInput").get(0).checked=false
		}else if(node.getStep().skip_bad_files == undefined){
			$("#error_hiddenFile_textFileInput").get(0).checked=false
		}
		if(node.getStep().error_line_skipped==='Y'){//跳过错误行
			$("#error_breakline_textFileInput").get(0).checked=true
		}else if(node.getStep().error_line_skipped==='N'){
			$("#error_breakline_textFileInput").get(0).checked=false
		}else if(node.getStep().error_line_skipped == undefined){
			$("#error_breakline_textFileInput").get(0).checked=false
		}
		if(node.getStep().file_error_field==undefined){//错误文件字段名
			$('#error_fileField_textFileInput').textbox('setValue','');
		}else{
			$('#error_fileField_textFileInput').textbox('setValue',node.getStep().file_error_field);
		}
		if(node.getStep().file_error_message_field==undefined){//文件错误信息字段名
			$('#error_informationField_textFileInput').textbox('setValue','');
		}else{
			$('#error_informationField_textFileInput').textbox('setValue',node.getStep().file_error_message_field);
		}
		
		if(node.getStep().error_count_field==undefined){//错误计数字段
			$('#error_countField_textFileInput').textbox('setValue','');
		}else{
			$('#error_countField_textFileInput').textbox('setValue',node.getStep().error_count_field);
		}
		
		if(node.getStep().error_fields_field==undefined){//错误字段文件名
			$('#error_fieldfilename_textFileInput').textbox('setValue','');
		}else{
			$('#error_fieldfilename_textFileInput').textbox('setValue',node.getStep().error_fields_field);
		}
		
		if(node.getStep().error_text_field==undefined){//错误文本字段
			$('#error_textfield_textFileInput').textbox('setValue','');
		}else{
			$('#error_textfield_textFileInput').textbox('setValue',node.getStep().error_text_field);
		}

		if(node.getStep().bad_line_files_destination_directory==undefined){//告警文件目录
			$('#error_jinggao_textFileInput').textbox('setValue','');
		}else{
			$('#error_jinggao_textFileInput').textbox('setValue',node.getStep().bad_line_files_destination_directory);
		}
		if(node.getStep().bad_line_files_extension==undefined){//告警文件目录(扩展名)
			$('#error_jinggao_input_textFileInput').textbox('setValue','warning');
		}else{
			$('#error_jinggao_input_textFileInput').textbox('setValue',node.getStep().bad_line_files_extension);
		}
		
		if(node.getStep().error_line_files_destination_directory==undefined){//错误文件目录
			$('#error_fileMuLu_textFileInput').textbox('setValue','');
		}else{
			$('#error_fileMuLu_textFileInput').textbox('setValue',node.getStep().error_line_files_destination_directory);
		}
		if(node.getStep().error_line_files_extension==undefined){//错误文件目录(扩展名)
			$('#error_extendName_textFileInput').textbox('setValue','error');
		}else{
			$('#error_extendName_textFileInput').textbox('setValue',node.getStep().error_line_files_extension);
		}
		
		if(node.getStep().line_number_files_destination_directory==undefined){//失败行数文件目录
			$('#error_failLine_textFileInput').textbox('setValue','');
		}else{
			$('#error_failLine_textFileInput').textbox('setValue',node.getStep().line_number_files_destination_directory);
		}
		if(node.getStep().line_number_files_extension==undefined){//失败行数文件目录(扩展名)
			$('#error_extendTwo_textFileInput').textbox('setValue','line');
		}else{
			$('#error_extendTwo_textFileInput').textbox('setValue',node.getStep().line_number_files_extension);
		}
		//********************************第四部分（过滤）********************************************
		if(node.getStep().filters==null || $.trim(node.getStep().filters)==''){//第一次加载时候的undefined
				console.log('第一次加载对象');
		}else if(node.getStep().filters.filter.constructor == Array){//如果是数组进行替换
			$.each(node.getStep().filters.filter,function(i,o){
				if(o.filter_position =='-1'){
					o.filter_position = '';
				}
				if(o.filter_is_last_line=='N'){
					o.filter_is_last_line = '';
				}
				if(o.filter_is_positive=='N'){
					o.filter_is_positive = '';
				}
			});
		}else{//如果是对象进行替换
			node.getStep().filters.filter.filter_position == '-1' ? node.getStep().filters.filter.filter_position = '' :  node.getStep().filters.filter.filter_position
			node.getStep().filters.filter.filter_is_last_line =='N' ? node.getStep().filters.filter.filter_is_last_line = '' : node.getStep().filters.filter.filter_is_last_line
			node.getStep().filters.filter.filter_is_positive =='N'? node.getStep().filters.filter.filter_is_positive ='' : node.getStep().filters.filter.filter_is_positive 
		}
		
		$('#filter_textFileInput').datagrid({
			fit:true,
			rownumbers:true,
			singleSelect : false,
			frozenColumns : [ [ {
				field : 'ck',
				checkbox : true,
			} ] ],
		    data:node.getStep().filters!=null && $.trim(node.getStep().filters)!= '' ?{total:1, rows:$.isArray(node.getStep().filters.filter)?
		    		node.getStep().filters.filter:[node.getStep().filters.filter]}:{total:0,rows:[]},
			toolbar :[{
				iconCls: 'icon-add',
				text : "增加",
				fitColumns:true,
				handler: function(){//添加一行
					console.log('点击添加');
					$('#filter_textFileInput').datagrid('appendRow',{
						filter_string:'', 
						filter_position:'',
						filter_is_last_line:'',
						filter_is_positive:''
					});
				}
			},{
				text : "删除",
				iconCls : 'icon-remove',
				handler : function() {
//					var del_row = $('#filter_textFileInput').datagrid('getSelected');
//					var del_rowIndex = $('#filter_textFileInput').datagrid('getRowIndex',del_row);
//					$('#filter_textFileInput').datagrid('deleteRow',del_rowIndex);
					$('#filter_textFileInput').datagrid('deleteSelections');
				}
			}],
		    columns:[[    
		        {field:'filter_string',title:'过滤字符串',width:100,editor:{type:'text'}},    
		        {field:'filter_position',title:'过滤器位置',width:100,editor:{type:'text'}},    
		        {field:'filter_is_last_line',title:'停止在过滤器',width:100,editor:{
		        	type:'combobox',
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
		        {field:'filter_is_positive',title:'积极匹配',width:100,editor:{
		        	type:'combobox',
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
		        }}  
		    ]],
    		onClickRow:function(i,r){
		    	var rows=$(this).datagrid('getRows');
				$.each(rows,function(j,o){
					j===i || $('#filter_textFileInput').datagrid('endEdit',j);
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

		//********************************第五部分（字段）********************************************
		if(!!node.getStep().fields){
			
			if(node.getStep().fields.field.constructor == Array){//如果是数组进行替换
				$.each(node.getStep().fields.field,function(i,o){
					if(o.type=='None'){
						o.type = '';
					}
					if(o.length =='-1'){
						o.length = '';
					}
					if(o.position=='-1'){
						o.position = '';
					}
					if(o.precision=='-1'){
						o.precision = '';
					}
					if(o.trim_type=='none'){
						o.trim_type = 'none';
					}
					if(o.repeat=='N'){
						o.repeat = '';
					}
				});
			}else{//如果是对象进行替换
					node.getStep().fields.field.type == 'None' ? node.getStep().fields.field.type = ''
							: node.getStep().fields.field.type
					node.getStep().fields.field.length == '-1' ? node.getStep().fields.field.length = ''
							: node.getStep().fields.field.length
					node.getStep().fields.field.position == '-1' ? node
							.getStep().fields.field.position = '' : node
							.getStep().fields.field.position
					node.getStep().fields.field.precision == '-1' ? node
							.getStep().fields.field.precision = '' : node
							.getStep().fields.field.precision
					node.getStep().fields.field.trim_type == 'none' ? node
							.getStep().fields.field.trim_type = 'none' : node
							.getStep().fields.field.trim_type
					node.getStep().fields.field.repeat == 'N' ? node.getStep().fields.field.repeat = ''
							: node.getStep().fields.field.repeat
			}
		}
		
		$('#field_big_fixedInput').datagrid({//字段的界面  
			rownumbers:true,
			fitColumns:true,
			singleSelect:false,
			frozenColumns : [ [ {
				field : 'ck',
				checkbox : true,
			} ] ],
			fit:true,
		    data:node.getStep().fields?{total:1, rows:$.isArray(node.getStep().fields.field)?
		    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},		
			toolbar: [{
				iconCls: 'icon-add',
				text : "增加",
				fitColumns:true,
				handler: function(){//添加一行
					$('#field_big_fixedInput').datagrid(//新增加一行
							'appendRow',
							{
								name:'', 
								type:'',
								format:'',
								currency:'',
								decimal:'',
								group : '',
								nullif : '',
								ifnull : '',
								position : '',
								length : '',
								precision : '',
								trim_type : '',
								repeat : ''
							});}
			},{
				text : "删除",
				iconCls : 'icon-remove',
				handler : function() {
//					var del_row = $('#field_big_fixedInput').datagrid('getSelected');
//					var del_rowIndex = $('#field_big_fixedInput').datagrid('getRowIndex',del_row);
//					$('#field_big_fixedInput').datagrid('deleteRow',del_rowIndex);
					$('#field_big_fixedInput').datagrid('deleteSelections');
				}
			}],
			
		    columns:[[    
		        {field:'name',title:'名称',width:100,editor:{type:'text'}},    
		        {field:'type',title:'类型',width:100,editor:{
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
		        {field:'format',title:'格式',width:100,editor:{
		            type:'combobox',
		            options:{
		            	valueField: 'text',    
		                textField: 'text',
	                	formatter: function(row){
	                		var opts = $(this).combobox('options');
	                		return row[opts.textField];
	                	}

		            }
		        }}, 
		        {field:'currency',title:'货币类型',width:100,editor:{type:'text'}},  
		        {field:'decimal',title:'小数',width:100,editor:{type:'text'}},  
		        {field:'group',title:'分组',width:100,editor:{type:'text'}},  
		        {field:'nullif',title:'null if',width:100,editor:{type:'text'}},  
		        {field:'ifnull',title:'默认',width:100,editor:{type:'text'}},  
		        {field:'position',title:'位置',width:100,editor:{type:'text'}},  
		        {field:'length',title:'长度',width:100,editor:{type:'text'}},  
		        {field:'precision',title:'精度',width:100,editor:{type:'text'}}, 
		        {field:'trim_type',title:'去除空字符串方式',width:100,editor:{
		        	type:'combobox',
		        	options:{
	            		valueField: 'value',
	            		textField: 'label',
	            		editable : false,
	            		data: [{
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
		        },
		        formatter: function(value, rowData, rowIndex) {
					if (value == 'none') {
						return '不去掉空格'
					}else if(value == 'left'){
						return '去掉做掉左侧空格'
					}else if(value == 'right'){
						return '去掉做掉右侧空格'
					}else if(value == 'both'){
						return  '去掉左右两端空格'
					}
				return '';
				}
		        },
		        {field:'repeat',title:'重复',width:100,editor:{type:'combobox',
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
		        }}
		        
		    ]],
    		onClickRow:function(i,r){
		    	var rows=$(this).datagrid('getRows');
				$.each(rows,function(j,o){
					j===i || $('#field_big_fixedInput').datagrid('endEdit',j);
				});

	        	$(this).datagrid('beginEdit',i);//编辑点击的行

	        	var newOld = change2(r.type,i);
	        	  if(newOld==''){
	        		  var ed=$(this).datagrid('getEditor',{index:i,field:'format'});
	        		  $(ed.target).combobox('setValue',r.format);
	        	  }else{
	        		  var ed=$(this).datagrid('getEditor',{index:i,field:'format'});
	        		  $(ed.target).combobox('setValue',newOld);
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
		//字段传递,加载进表格
//		var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
//		if(!!transferArry){
//			var  transfer=Nasoft.Util.transferArray_copy(transferArry)
//			var opts_a=$('#field_big_fixedInput').datagrid('options');
//			opts_a.data={rows:transfer};
//			$('#field_big_fixedInput').datagrid(opts_a);
//		}
		//********************************第六部分（其他输出字段）********************************************
		
		node.getStep().shortFileFieldName == undefined ? $('#filenamefield_textFileInput').textbox('setValue','') : $('#filenamefield_textFileInput').textbox('setValue',node.getStep().shortFileFieldName);//	
		node.getStep().extensionFieldName == undefined ? $('#extends_textFileInput').textbox('setValue','') : $('#extends_textFileInput').textbox('setValue',node.getStep().extensionFieldName);
		node.getStep().pathFieldName == undefined ? $('#pathfield_textFileInput').textbox('setValue','') : $('#pathfield_textFileInput').textbox('setValue',node.getStep().pathFieldName);
		node.getStep().sizeFieldName == undefined ? $('#filesizefield_textFileInput').textbox('setValue','') : $('#filesizefield_textFileInput').textbox('setValue',node.getStep().sizeFieldName);
		node.getStep().hiddenFieldName == undefined ? $('#ishiddenfield_textFileInput').textbox('setValue','') : $('#ishiddenfield_textFileInput').textbox('setValue',node.getStep().hiddenFieldName);
		node.getStep().lastModificationTimeFieldName == undefined ? $('#endupdatetimefield_textFileInput').textbox('setValue','') : $('#endupdatetimefield_textFileInput').textbox('setValue',node.getStep().lastModificationTimeFieldName);
		node.getStep().uriNameFieldName == undefined ? $('#uri_textFileInput').textbox('setValue','') : $('#uri_textFileInput').textbox('setValue',node.getStep().uriNameFieldName);
		node.getStep().rootUriNameFieldName == undefined ? $('#rooturi_textFileInput').textbox('setValue','') : $('#rooturi_textFileInput').textbox('setValue',node.getStep().rootUriNameFieldName);
		
		
		
		//***********
		$('#textFileInput_ok').unbind('click').click(function(){//确定配置信息后执行	
			//关闭窗口执行的
			try{
			var TableInput={};
			
			//*****************************第一部分（文件）*************************************
			
			node.text=$('#fri-name_textFileInput').textbox('getValue');//放入步骤名称
			
			//文件或目录
			/*var filename = $('#textFileInput_handle_file_h').val(); //获取文件名
			TableInput.name =filename;*/

			var rows=$('#Selected_file_textFileInput').datagrid('getRows');//获取当前页面中所有的行
			$.each(rows,function(i,o){
				$('#Selected_file_textFileInput').datagrid('endEdit', i);//结束编辑所有行
			});
			
			var file=Nasoft.GetProjectData.getFields('#Selected_file_textFileInput');//将对应数据字段加入表输出	
			if(!!file&&file.field.constructor==Array){//数组
				var resulttable = {};
				var fileName = [];
				var filemask = [];
				var exclude_filemask = [];
				var file_required = [];
				var include_subfolders = [];
				var namepath = [];
				$.each(file.field,function(i,o){
					var file_required_chuli =  o.file_required == '是' ? 'Y' : 'N'
					var include_subfolders_chuli =  o.include_subfolders == '是' ? 'Y' : 'N'
					fileName[i] = o.name;
					filemask[i] = o.filemask;
					exclude_filemask[i] = o.exclude_filemask;
					namepath[i]=o.namepath;
					file_required[i] = file_required_chuli;
					include_subfolders[i] = include_subfolders_chuli;
				});
				
				resulttable.name = fileName;
				resulttable.filemask = filemask;
				resulttable.exclude_filemask = exclude_filemask;
				resulttable.file_required = file_required;
				resulttable.include_subfolders =  include_subfolders;
				resulttable.namepath=namepath;
				var fileType = $('#filetype_textFileInput').combobox('getValue');//文件类型
				var compress = $('#compress_textFileInput').combobox('getValue');//文件类型
				if(fileType===''){
					resulttable.type = 'CSV'
				}else{
					resulttable.type = fileType;
				}
				if(compress ===''){
					resulttable.compression = 'None';
				}else{
					resulttable.compression = compress;
				}
				if(file.field!=0){
					TableInput.file=resulttable;
				}
			}else if(!!file){//对象
				var oldFile = file.field;
				
				var fileType = $('#filetype_textFileInput').combobox('getValue');//文件类型
				var compress = $('#compress_textFileInput').combobox('getValue');//文件类型
				if(fileType===''){
					oldFile.type = 'CSV'
				}else{
					oldFile.type = fileType;
				}
				if(compress ===''){
					oldFile.compression = 'None';
				}else{
					oldFile.compression = compress;
				}
				
					TableInput.file = oldFile;
			}else{
				TableInput.file =file;
			}
			
			var accept_filenames = $("#beforfilename_textFileInput").prop("checked")==true ? 'Y' : 'N'; //从之前步骤接受文件名
			TableInput.accept_filenames = accept_filenames;
				
			var passing_through_fields = $("#beforfield_textFileInput").prop("checked")==true ? 'Y' : 'N'; //从之前步骤接受字段名 
			TableInput.passing_through_fields = passing_through_fields;
			
			var readfilename_textFileInput = $('#readfilename_textFileInput').combobox('getValue');//步骤读取的文件名来自
	
			TableInput.accept_stepname=readfilename_textFileInput;
			
			
			var inputfieldfilename=$('#inputfieldfilename_textFileInput').textbox('getValue');//在输入里的字段被当做文件名
			TableInput.accept_field=inputfieldfilename;
			
			//*****************************第二部分（内容）*************************************
			
//			var filetype_textFileInput = $('#filetype_textFileInput').combobox('getValue'); //类型
			
			var separate_textFileInput=$('#separate_textFileInput').textbox('getValue'); //分隔符
			//console.log(separate_textFileInput);
//			if(';'===separate_textFileInput){
//				var newStringDefine = '&#x3b;';
//				var newString = separate_textFileInput.replace(separate_textFileInput, newStringDefine); 
//				TableInput.separator=((newString==null||newString=='')?'':newString);
//			}else{
//				var newStringDefine = '&#x3b;';
//				var newString = separate_textFileInput.replace(';', newStringDefine); 
//				TableInput.separator=((newString==null||newString=='')?'':newString);
//			}
			TableInput.separator=separate_textFileInput;
			var textlimite_textFileInput=$('#textlimite_textFileInput').textbox('getValue');//文本限定符
//			if('"'===textlimite_textFileInput){
//				var newStringDefine='&#x22;';
//				var newString = textlimite_textFileInput.replace(textlimite_textFileInput, newStringDefine); 
//				TableInput.enclosure=(newString==null||newString=='')?'':newString;
//			}else{
//				TableInput.enclosure=textlimite_textFileInput;
//			}
			TableInput.enclosure=textlimite_textFileInput;
			var escapefont_textFileInput=$('#escapefont_textFileInput').textbox('getValue');//逃逸字符
			TableInput.escapechar=(escapefont_textFileInput==null||escapefont_textFileInput=='')?'':escapefont_textFileInput;
			
			var head_textFileInput = $("#head_textFileInput").prop("checked")==true ? 'Y' : 'N';//头部
			TableInput.header = head_textFileInput;
			
			var inputhead_textFileInput=$('#inputhead_textFileInput').textbox('getValue');//头部行数量
			TableInput.nr_headerlines=(inputhead_textFileInput==null||inputhead_textFileInput=='')?'':inputhead_textFileInput;
			
			var endcount_textFileInput = $("#endcount_textFileInput").prop("checked")==true ? 'Y' : 'N'; //尾部
			TableInput.footer = endcount_textFileInput;
			
			var end_textFileInput=$('#end_textFileInput').textbox('getValue');//尾部
			TableInput.nr_footerlines=(end_textFileInput==null||end_textFileInput=='')?'':end_textFileInput;
			
			var packlinecount_textFileInput = $("#packlinecount_textFileInput").prop("checked")==true ? 'Y' : 'N';//包装行
			TableInput.line_wrapped = packlinecount_textFileInput;
			
			var packline_textFileInput=$('#packline_textFileInput').textbox('getValue');//以时间包装的行数
			TableInput.nr_wraps=(packline_textFileInput==null||packline_textFileInput=='')?'':packline_textFileInput;
			
			var pagelayout_textFileInput = $("#pagelayout_textFileInput").prop("checked")==true ? 'Y' : 'N';//每页记录的行数
			TableInput.layout_paged = pagelayout_textFileInput;
			
			var each_recorde_textFileInput=$('#each_recorde_textFileInput').textbox('getValue');//每页记录的行数
			TableInput.nr_lines_per_page=(each_recorde_textFileInput==null||each_recorde_textFileInput=='')?'':each_recorde_textFileInput;
			
			var word_head_textFileInput=$('#word_head_textFileInput').textbox('getValue');	//文档头部
			TableInput.nr_lines_doc_header=(word_head_textFileInput==null||word_head_textFileInput=='')?'':word_head_textFileInput;
			
//			var compress_textFileInput = $('#compress_textFileInput').combobox('getValue'); //压缩
//			TableInput.compress_textFileInput =compress_textFileInput;
		
			var nonenull_textFileInput = $("#nonenull_textFileInput").prop("checked")==true ? 'Y' : 'N';//没有空行
			TableInput.noempty = nonenull_textFileInput;
			
			var intoincludeline_textFileInput = $("#intoincludeline_textFileInput").prop("checked")==true ? 'Y' : 'N';//在输出包括字段名
			TableInput.rownum = intoincludeline_textFileInput;
			
			var intoincludeline_input_textFileInput=$('#intoincludeline_input_textFileInput').textbox('getValue');//行数字段名称
			TableInput.rownum_field=(intoincludeline_input_textFileInput==null||intoincludeline_input_textFileInput=='')?'':intoincludeline_input_textFileInput;
			
			var intoincludefield_textFileInput = $("#intoincludefield_textFileInput").prop("checked")==true ? 'Y' : 'N';//行数字段名称 
			TableInput.include = intoincludefield_textFileInput;
			
			var intoincludefield_input_textFileInput=$('#intoincludefield_input_textFileInput').textbox('getValue');//包含文件名的字段名称
			TableInput.include_field=(intoincludefield_input_textFileInput==null||intoincludefield_input_textFileInput=='')?'':intoincludefield_input_textFileInput;
			
			var fieldoutlinenumber_textFileInput = $("#fieldoutlinenumber_textFileInput").prop("checked")==true ? 'Y' : 'N';//按文件取行号
			TableInput.rownumByFile = fieldoutlinenumber_textFileInput;
			
			var format_textFileInput = $('#format_textFileInput').combobox('getValue'); //格式
			TableInput.format =format_textFileInput;
			
			var codetype_textFileInput = $('#codetype_textFileInput').combobox('getValue');//编码方式
			TableInput.encoding =codetype_textFileInput;
			
			var recodecountlimiete_textFileInput=$('#recodecountlimiete_textFileInput').textbox('getValue');//记录数量限制
			TableInput.limit=(recodecountlimiete_textFileInput==null||recodecountlimiete_textFileInput=='')?'':recodecountlimiete_textFileInput;
			
			var dateisask_textFileInput = $("#dateisask_textFileInput").prop("checked")==true ? 'Y' : 'N'; //解析日期时候是否严格要求格式
			TableInput.date_format_lenient = dateisask_textFileInput;
			
			var local_date_textFileInput = $('#local_date_textFileInput').combobox('getValue'); //本地日期格式
			TableInput.date_format_locale =local_date_textFileInput;
			
			var addfilename_textFileInput = $("#addfilename_textFileInput").prop("checked")==true ? 'Y' : 'N'; //添加文件名
			TableInput.add_to_result_filenames = addfilename_textFileInput;
			
			//*****************************第三部分（错误处理）*************************************
			
			var error_hidden_textFileInput = $("#error_hidden_textFileInput").prop("checked")==true ? 'Y' : 'N'; //忽略错误
			TableInput.error_ignored = error_hidden_textFileInput;
			
			var error_hiddenFile_textFileInput = $("#error_hiddenFile_textFileInput").prop("checked")==true ? 'Y' : 'N'; //忽略错误文件
			TableInput.skip_bad_files = error_hiddenFile_textFileInput;
			
			var error_breakline_textFileInput = $("#error_breakline_textFileInput").prop("checked")==true ? 'Y' : 'N'; //跳过错误行?
			TableInput.error_line_skipped = error_breakline_textFileInput;
			
			var error_fileField_textFileInput=$('#error_fileField_textFileInput').textbox('getValue');//错误文件字段名
			TableInput.file_error_field=(error_fileField_textFileInput==null||error_fileField_textFileInput=='')?'':error_fileField_textFileInput;
			
			var error_informationField_textFileInput=$('#error_informationField_textFileInput').textbox('getValue');//文件错误信息字段名
			TableInput.file_error_message_field=(error_informationField_textFileInput==null||error_informationField_textFileInput=='')?'':error_informationField_textFileInput;
			
			var error_countField_textFileInput=$('#error_countField_textFileInput').textbox('getValue');//错误计数字段
			TableInput.error_count_field=(error_countField_textFileInput==null||error_countField_textFileInput=='')?'':error_countField_textFileInput;
			
			var error_fieldfilename_textFileInput=$('#error_fieldfilename_textFileInput').textbox('getValue');//错误字段文件名
			TableInput.error_fields_field=(error_fieldfilename_textFileInput==null||error_fieldfilename_textFileInput=='')?'':error_fieldfilename_textFileInput;
			
			var error_textfield_textFileInput=$('#error_textfield_textFileInput').textbox('getValue');//错误文本字段
			TableInput.error_text_field=(error_textfield_textFileInput==null||error_textfield_textFileInput=='')?'':error_textfield_textFileInput;
			
			var error_jinggao_input_textFileInput=$('#error_jinggao_input_textFileInput').textbox('getValue');//告警文件目录
			TableInput.bad_line_files_extension=(error_jinggao_input_textFileInput==null||error_jinggao_input_textFileInput=='')?'':error_jinggao_input_textFileInput;
			
			if($('#error_jinggao_textFileInput').textbox('getValue')!=''){
				var error_jinggao_textFileInput_h=$('#error_jinggao_textFileInput_h').val(); //
				TableInput.bad_line_files_destination_directory = error_jinggao_textFileInput_h;
			}else{
				TableInput.bad_line_files_destination_directory ='';
			}
			
			var error_extendName_textFileInput=$('#error_extendName_textFileInput').textbox('getValue');//错误文件目录
			TableInput.error_line_files_extension=(error_extendName_textFileInput==null||error_extendName_textFileInput=='')?'':error_extendName_textFileInput;
			if($('#error_fileMuLu_textFileInput').textbox('getValue')!=''){
				var error_fileMuLu_textFileInput_h=$('#error_fileMuLu_textFileInput_h').val(); //
				TableInput.error_line_files_destination_directory = error_fileMuLu_textFileInput_h;
			}else{
				TableInput.error_line_files_destination_directory ='';
			}
			
			var error_extendTwo_textFileInput=$('#error_extendTwo_textFileInput').textbox('getValue');//失败行数文件目录
			TableInput.line_number_files_extension=(error_extendTwo_textFileInput==null||error_extendTwo_textFileInput=='')?'':error_extendTwo_textFileInput;
			if($('#error_failLine_textFileInput').textbox('getValue')!=''){
				var error_failLine_textFileInput_h=$('#error_failLine_textFileInput_h').val(); //
				TableInput.line_number_files_destination_directory = error_failLine_textFileInput_h;
			}else{
				TableInput.line_number_files_destination_directory ='';
			}
			//********************************第四部分（过滤）********************************************
			var rows=$('#filter_textFileInput').datagrid('getRows');//获取当前页面中所有的行
			$.each(rows,function(i,o){
				$('#filter_textFileInput').datagrid('endEdit', i);//结束编辑所有行
			});
			var filter=Nasoft.GetProjectData.getFields('#filter_textFileInput');//将对应数据字段加入表输出
			if(!!filter){			
				var oldValue = filter.field;
				var newFileter ={'filter':oldValue};//构建一个新的对象目的是符合配置文件里的要求
				if(newFileter.filter.constructor==Array){//判断到底是数组还是对象
					$.each(newFileter.filter,function(i,o){
						if(o.filter_string==''){
							o.filter_string = '';
						}
						if(o.filter_position ==''){
							o.filter_position = '-1';
						}
						if(o.filter_is_last_line==''){
							o.filter_is_last_line = 'N';
						}
						if(o.filter_is_positive==''){
							o.filter_is_positive = 'N';
						}
						
					});
				}else{
					newFileter.filter.filter_string == '' ? newFileter.filter.filter_string = '' :  newFileter.filter.filter_string
							newFileter.filter.filter_position=='' ? newFileter.filter.filter_position = '-1' : newFileter.filter.filter_position
									newFileter.filter.filter_is_last_line ==''?newFileter.filter.filter_is_last_line ='N' : newFileter.filter.filter_is_last_line
											newFileter.filter.filter_is_positive ==''?newFileter.filter.filter_is_positive='N' : newFileter.filter.filter_is_positive
				}
			}
			TableInput.filters=newFileter; 
			
			//********************************第五部分（字段）********************************************
			
			var rows=$('#field_big_fixedInput').datagrid('getRows');//获取当前页面中所有的行
			$.each(rows,function(i,o){
				$('#field_big_fixedInput').datagrid('endEdit', i);//结束编辑所有行
			});
			var fields=Nasoft.GetProjectData.getFields('#field_big_fixedInput');//将对应数据字段加入表输出
			if(!!fields&&fields.field.constructor==Array){//判断到底是数组还是对象
				$.each(fields.field,function(i,o){
					if(o.type==''){
						o.type = 'None';
					}
					if(o.length ==''){
						o.length = '-1';
					}
					if(o.position==''){
						o.position = '-1';
					}
					if(o.precision==''){
						o.precision = '-1';
					}
					if(o.trim_type==''){
						o.trim_type = 'none';
					}
					if(o.repeat==''){
						o.repeat = 'N';
					}
				});
			}else if(!!fields){
				fields.field.type == '' ? fields.field.type = 'None' :  fields.field.type
				fields.field.length=='' ? fields.field.length = '-1' : fields.field.length
				fields.field.position ==''? fields.field.position ='-1' : fields.field.position
				fields.field.precision ==''?fields.field.precision='-1' : fields.field.precision
				fields.field.trim_type =='' ? fields.field.trim_type='none' : fields.field.trim_type
				fields.field.repeat =='' ? fields.field.repeat = 'N' :  fields.field.repeat		
			}
			TableInput.fields=fields; 
			
			//*****************************第六部分（其他输出字段）*************************************
			
			var filenamefield_textFileInput=$('#filenamefield_textFileInput').textbox('getValue');//文件名字段
			TableInput.shortFileFieldName=(filenamefield_textFileInput==null||filenamefield_textFileInput=='')?'':filenamefield_textFileInput;
			
			var extends_textFileInput=$('#extends_textFileInput').textbox('getValue');//扩展名字段
			TableInput.extensionFieldName=(extends_textFileInput==null||extends_textFileInput=='')?'':extends_textFileInput;
			
			var pathfield_textFileInput=$('#pathfield_textFileInput').textbox('getValue');//路径字段
			TableInput.pathFieldName=(pathfield_textFileInput==null||pathfield_textFileInput=='')?'':pathfield_textFileInput;
			
			var filesizefield_textFileInput=$('#filesizefield_textFileInput').textbox('getValue');//文件大小字段
			TableInput.sizeFieldName=(filesizefield_textFileInput==null||filesizefield_textFileInput=='')?'':filesizefield_textFileInput;
			
			var ishiddenfield_textFileInput=$('#ishiddenfield_textFileInput').textbox('getValue');//是否为隐藏文件字段
			TableInput.hiddenFieldName=(ishiddenfield_textFileInput==null||ishiddenfield_textFileInput=='')?'':ishiddenfield_textFileInput;
			
			var endupdatetimefield_textFileInput=$('#endupdatetimefield_textFileInput').textbox('getValue');//最后修改时间字段
			TableInput.lastModificationTimeFieldName=(endupdatetimefield_textFileInput==null||endupdatetimefield_textFileInput=='')?'':endupdatetimefield_textFileInput;
			
			var uri_textFileInput=$('#uri_textFileInput').textbox('getValue');//Uri字段
			TableInput.uriNameFieldName=(uri_textFileInput==null||uri_textFileInput=='')?'':uri_textFileInput;
			
			var rooturi_textFileInput=$('#rooturi_textFileInput').textbox('getValue');//Root Uri字段
			TableInput.rootUriNameFieldName=(rooturi_textFileInput==null||rooturi_textFileInput=='')?'':rooturi_textFileInput;
			
			node.setStep(TableInput);//放入node
			node.setTransfer();//组件中要传递的字段存储进容器中
			}catch(e){
				console.log(e)
			}
		
			$('#TextFileInput').window('close');//关闭弹窗
		});	//确定保存
		$('#textFileInput_prv').unbind('click').click(function(){
			$("#previewRows").textbox("setValue",'100');
			// 打开获取预览条数的窗口
			$("#rowsWin").window("open");		
		});
		$('#textFileInput_cancel').unbind( "click" ).click(function(){
			$('#TextFileInput').window('close');//关闭弹窗
		});
		// 取消预览条数
		$("#passPreviewRows").unbind('click').click(function(){
			// 关闭获取预览条数的窗口
			$("#rowsWin").window("close");
		});
		$("#getPreviewRows").unbind('click').click(function() {
			// 获取拆分文件的分隔符
			var separator = $('#separate_textFileInput').textbox('getValue')
			if(!$('#Selected_file_textFileInput').datagrid('getSelected')) alert('请选择要预览的文件!');
			// 获取被选中的文件路径
			var path = $('#Selected_file_textFileInput').datagrid('getSelected').namepath;
			var rowsnumber = $("#previewRows").textbox('getValue');// 获取预览条数
			var rows = $("#field_big_fixedInput").datagrid('getRows'),//获取配置列表的所有行
			    table,//展示数据的表格
			    tabledata,
			    columns=[],//数据表格的列属性
			    col=[],
			    param=[],
			    myWindow,//弹出窗口
			    winOPtions,//弹出窗口的属性列表
			    tableOptions;//数据表格的属性列表
			columns.push(col);
			$.each(rows,function(i,o){
				var field={field:o.name,title:o.name,width:100} 
				col.push(field);//定义数据表格列属性
				//构造一个读取文件的参数
				param.push({name:o.name,separator:separator,trimType:o.trim_type});
			});
			// 请求数据表格的数据
			$.ajax({
			    url:$.getRootPath()+'/TextFileInput/textFileInputPreview.do',
				async:false,
				data:{path:path,param:JSON.stringify(param),rows:rowsnumber},
				dataType:'json',
				type:'POST',
				success:function(data){
					console.log(data);
					tabledata=data;
				}
			});
			// 数据表格的参数
			tableOptions={
					data:tabledata,
					columns:columns,
					fit:true,
					rownumbers:true,
					singleSelect:true
			};
			// 弹出窗口的参数
			winOPtions={
					id:'tempwin_textFileInput',
					title:'预览数据',
					collapsible:false,
					minimizable:false,
					modal:true,
					width:800,
					height:500
			};
			// 创建一个弹出窗
			myWindow=Nasoft.Util.createWindow(winOPtions,function(win){
				table=document.createElement("table");
				table.setAttribute('id', 'temptable_textFileInput');
				// 将数据表格放入弹出窗
				win.appendChild(table);			
				//将窗口放入页面文档
				document.body.appendChild(win);
				$(win).window(winOPtions);
			});	
			$("#temptable_textFileInput").datagrid(tableOptions);
			$(myWindow).window('open');
			// 关闭获取预览条数的窗口
			$("#rowsWin").window("close");
		});
		}catch(e){//打开
			console.log(e)
		}
	}
	
	onBeforeClose=function(){}
	/**
	 * type方法
	 */
	function change(newValue){
				var date=[{"id":1,"text":"yyyy/MM/dd HH:mm:ss.SSS"},{"id":2,"text":"yyyy/MM/dd HH:mm:ss.SSS XXX"},{"id":3,"text":"yyyy/MM/dd HH:mm:ss"},
	      			{"id":4,"text":"yyyy/MM/dd HH:mm:ss XXX"},{"id":5,"text":"yyyyMMddHHmmss"},{"id":6,"text":"yyyy/MM/dd"},{"id":7,"text":"yyyy-MM-dd"}
	      			,{"id":8,"text":"yyyy-MM-dd HH:mm:ss"},{"id":9,"text":"yyyy-MM-dd HH:mm:ss XXX"},{"id":10,"text":"yyyyMMdd"},{"id":11,"text":"MM/dd/yyyy"}
	      			,{"id":12,"text":"MM/dd/yyyy HH:mm:ss"},{"id":13,"text":"MM-dd-yyyy"},{"id":14,"text":"MM-dd-yyyy HH:mm:ss"},{"id":15,"text":"MM/dd/yy"}
	      			,{"id":15,"text":"MM-dd-yy"},{"id":16,"text":"dd/MM/yyyy"},{"id":17,"text":"dd-MM-yyyy"},{"id":18,"text":"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}
	      			];//定义下拉表单数据
      			var number = [{"id":1,"text":"#,##0.###"},{"id":2,"text":"0.00"},{"id":3,"text":"0000000000000"},{"id":4,"text":"#.#"},{"id":5,"text":"#"},{"id":6,"text":"###,###,###.#"},{"id":7,"text":"#######.###"},{"id":8,"text":"#####.###%"}];//
      			var empty = [{}];
  
      			rowIndex = $('#field_big_fixedInput').datagrid('getRowIndex', $("#field_big_fixedInput").datagrid('getSelected'));
      			//得到编辑行的id
      			if(newValue=='Date'){
      				//方案1
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        		$(ed.target).combobox({ data:date ,valueField: "text", textField: "text"});	
      			}else if(newValue=='Number'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='BigNumber'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='Integer'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue =='String'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='InternetAddress'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Boolean'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Timestamp'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Binary'){
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else{
      				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
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
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
				$(ed.target).combobox({data:date ,valueField: "text", textField: "text"});
		}else if(newValue=='Number'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='BigNumber'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='Integer'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue =='String'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='InternetAddress'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Boolean'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Timestamp'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Binary'){
				var ed=$('#field_big_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else{
				return '';
			}
		return $(ed.target).combobox('getValue');
	}	
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}
