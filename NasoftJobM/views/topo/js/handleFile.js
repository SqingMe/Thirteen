Nasoft.TopButton.File={
		init:function(){
			var menubutton=$('#File').menubutton({ menu: '#filemenu'});
			$(menubutton.menubutton('options').menu).menu({
				onShow:function(){
					var tabs=$('#stepTabs').tabs('tabs');// 获取所有的tab
					var tab = $('#stepTabs').tabs('getSelected');// 获取当前被选中的tab
					var tabIndex = $('#stepTabs').tabs('getTabIndex',tab);// 获取当前选中tab的index
					if(tabs && tabs.length>1 && tabIndex>0){
						$(this).menu('enableItem',$('#_close_project'));  
						$(this).menu('enableItem',$('#_close_all'));
						$(this).menu('enableItem',$('#_save_file'));
						$(this).menu('enableItem',$('#_save_as'));
						$(this).menu('enableItem',$('#_print'));
					}else if (!(tabs && tabs.length>1 && tabIndex>0)){
						$(this).menu('disableItem', $('#_close_project'));  
						$(this).menu('disableItem',$('#_close_all'));
						$(this).menu('disableItem',$('#_save_file'));
						$(this).menu('disableItem',$('#_save_as'));
						$(this).menu('disableItem',$('#_print'));
					}
				},
	            onClick: function (item) {
	               var fns=Nasoft.TopButton.File.fns;
	               if(typeof fns[item.id]=='function'){
	            	   fns[item.id](); 
	               }
	            }
	});
			project_win();
			function project_win(){
				$('#user_open_dir_tree_ul').tree($.extend(true,{
					url:$.getRootPath()+"/HandleFile/getFileList.do?path=",
					onDblClick:function(node){
							if(!(node.state=='closed' || node.children)){	
							   // 解析工程文件,返回工程名
								  var projectName = Nasoft.Project.openProject(node.path);
								  $('#open_project_path').textbox('setValue',projectName);
								  $('#open_project_win').window('close');
							}
					},
					onSelect:function(node){
						if(!(node.state=='closed' || node.children)){// 被选中节点为文件
							$('#open_ok').linkbutton('enable');
							$('#open_project_path').textbox('setText','');
							$('#open_project_path').textbox('setText',node.text);
						}else{
							$('#open_ok').linkbutton('disable');
							$('#open_project_path').textbox('setText','');
						}
					}
				},Nasoft.Window.createProject.projectTreeOpts()));
				$('#open_project_win').window({				
					onBeforeOpen:function(){	
						$('#user_open_dir_tree_ul').tree("reload");
					}
					});
				
				$('#open_cancel').unbind('click').click(function(e){// 取消退出
					e.preventDefault();
					$('#open_project_path').textbox('setText','');
					$('#user_open_dir_tree_ul').find('.tree-node-selected').removeClass('tree-node-selected');
					$('#open_project_win').window('close');
				});
				
				$('#open_cancelChooise').unbind('click').click(function(e){//取消选择
					$('#user_open_dir_tree_ul').find('.tree-node-selected').removeClass('tree-node-selected');
				})
				
				$('#open_ok').unbind('click').click(function(e){
					 var node = $('#user_open_dir_tree_ul').tree("getSelected");
					 var name=Nasoft.Project.openProject(node.path);
					 $('#open_project_path').textbox('setValue',name);
					 $('#open_project_win').window('close');	
				});
			    $('#open_ok').linkbutton('disable');// 初始化禁用按钮(事件绑定之后禁用避免禁用方法失效)
			}
		},
		fns:{	
			// 新建工程
			_new_project_plumbing:function(){
				  $('#project_dir_name_win').window('open');
			      $('#project_btnEp').linkbutton('disable');//初始化按钮禁止
			},
			// 创建工程文件
			_new_project_file:function(){
				// 初始化创建工程文件窗口
				Nasoft.Window.createProject.windowOpen();
			},
			// 打开工程
		   _open_project:function(){
			   $('#open_project_win').window('open');
			},
			// 打开最近一次的配置
			_open_ne_set:function(){},
			// 关闭工程
			_close_project:function(){
				var thisTab=$('#stepTabs').tabs('getSelected');// 获取当前选中的tab
				var index = $('#stepTabs').tabs('getTabIndex',thisTab);// 获取当前选中的tab的index
				console.log(index)
				if(index>0){
					$('#stepTabs').tabs('close',index)
					}else{
						$.messager.alert("系统提示!","工程已经全部关闭!",'info');
					};// 关闭当前选中的tab
			},
			// 关闭所有
			_close_all:function(){
				var tabs=$('#stepTabs').tabs('tabs');// 获取所有的tab
				$.each(tabs,function(i,o){
					if(i>0){
						$('#stepTabs').tabs('close',i);
					}else{
						$.messager.alert("系统提示!","工程已经全部关闭!",'info');
					}// 遍历并关闭除欢迎一面以外所有选项卡tabs
				
				});
			},
			// 保存
			_save_file:function(){
					   saveProject();
			},
			// 保存为
			_save_as:function(){
						Nasoft.TopButton.File.save_as();
			},
			// 打印
			_print:function(){},
			// 导出到本地
			_export_file:function(){
				var parjectFileTree=Nasoft.Util.createProjectFileTree($('#export_file_tree'));
				parjectFileTree && 			
				Nasoft.Ui_extend.win_event('#exprot_win',{
					onBeforeOpen:function(){		
						parjectFileTree.tree({// 加载导出文件的树结构
						url:$.getRootPath()+"/HandleFile/getFileList.do?path=",
						lines:true,
						onSelect:function(node){
							
								if(node.state=='closed' || node.children){// 被选中节点为文件
									$('#export_ok').linkbutton('disable');
									$('#export_delFile').linkbutton('disable')
								}else{
									$('#export_ok').linkbutton('enable');
									$('#export_delFile').linkbutton('enable')
								}
							
						},			
						onContextMenu:function(e,node){
						
							console.log(node)
							if(node.state=='closed'|| node.children){
				                     return false;
							}else{
								parjectFileTree.tree('select',node.target);
								$('#export_menu').menu('show',{
									left: e.pageX,
   									top: e.pageY
								});
							}
							
						},
						onBeforeExpand:Nasoft.Util.treeExpand
					});
						$('#export_createFile').unbind('click').click(function(e){
							e.preventDefault();	
							$('#ok_createFile').linkbutton('disable');
							$('#project_dir_name_win').window('open');
						});
						$('#export_delFile').unbind('click').click(function(e){
							e.preventDefault();	
							var node=parjectFileTree.tree('getSelected')
							Nasoft.Ajax.deleteFile(parjectFileTree,node.path);
						});
						$('#export_delFile').linkbutton('disable');
						$('#export_cancel').unbind('click').click(function(e){
							e.preventDefault();	
							$('#exprot_win').window('close');
						});
					    $('#export_ok').unbind('click').click(function(e){
						e.preventDefault();
						var selected= parjectFileTree.tree('getSelected');// 获取当前被选中的节点
						console.log(selected)
						 var form=$("<form>");//定义一个form表单
                            form.attr("style","display:none");
                            form.attr("method","GET");
                            form.attr("action",$.getRootPath()+"/TopoCtrl/exportFile.do");
                            var input1=$("<input>");
                            input1.attr("type","hidden");
                            input1.attr("name","path");
                            input1.attr("value",selected.path);
                            $("body").append(form);//将表单放置在web中
                            form.append(input1);
                            form.submit();
                            form.remove();
						 $('#exprot_win').window('close');
					});
					    $('#export_ok').linkbutton('disable');
				}				
				});
			 $('#exprot_win').window('open');// 打开导出
			 
			},
			// 导入工程
			_import_file:function(){
				var parjectFileTree=Nasoft.Util.createProjectFileTree($('#import_file_tree'));// 创建一个工程文件树
				parjectFileTree &&
				Nasoft.Ui_extend.win_event('#import_win',{
					
				 onBeforeOpen:function(){
					var importFilePath=null;// 定义导入文件路径
						$('#import_file_tree').unbind('click').click(function(e){
						e.preventDefault();	
						//获取Cookie中的值
						function getCookie(cookie_name)
						{
						var allcookies = document.cookie;
						var cookie_pos = allcookies.indexOf(cookie_name);

						// 如果找到了索引，就代表cookie存在，
						// 反之，就说明不存在。
						if (cookie_pos != -1)
						{
						// 把cookie_pos放在值的开始，只要给值加1即可。
						cookie_pos += cookie_name.length + 1;
						var cookie_end = allcookies.indexOf(";", cookie_pos);

						if (cookie_end == -1)
						{
						cookie_end = allcookies.length;
						}

						var value = unescape(allcookies.substring(cookie_pos, cookie_end));
						}

						return value;
						}
						var Cookie_value=getCookie('userName');
						var path="user"+"/"+Cookie_value
						$('#import_file_path').val(path);// 将处理后的字段赋予显示的文本框
						$('#import_ok').linkbutton('enable');
						$('#import_delFile').linkbutton('enable')
					});
					$('#file_box').filebox({
						buttonText: '选择文件'
					});
					parjectFileTree.tree({
						url:$.getRootPath()+"/HandleFile/getFileList.do?path=",
						lines:true,
						onLoadSuccess:function(){
							$('#import_file_path').val('');
							$('#import_delFile').linkbutton('disable');
						},
						onSelect:function(node){
							if(node.state === 'closed' || node.children){// 被选中节点为文件
								$('#import_file_path').val(node.path);// 将处理后的字段赋予显示的文本框
								$('#import_ok').linkbutton('enable');
								$('#import_delFile').linkbutton('disable')
							}else{
								var parentPath=$(this).tree('getParent',node.target).path;// 获取当前节点的父节点的文件路径
								$('#import_file_path').val(parentPath);// 将处理后的路径字段赋予路径显示文本框
								$('#import_ok').linkbutton('enable');
								$('#import_delFile').linkbutton('enable')
							}
						},
						onBeforeExpand:Nasoft.Util.treeExpand
					});
					// 上传表单异步提交
				    function uplodeSubmit(again){
						$("#has_upload").text("0");// 已上传大小清零
			            $("#upload_speed").text("0");// 速度显示清零
			            $("#fileUp_progress").progressbar('options').text='{value}%';
						$("#fileUp_progress").progressbar('setValue',0);// 进度条清零
			           // var oTimer=null;
						console.log($('#import_from').get(0))
						$('#again_submit').val(again);
						var formData = new FormData($('#import_from').get(0));
						$.ajax({    
							url:$.getRootPath()+'/TopoCtrl/importFile.do', 
							type:"POST",
							 data:formData,
							 processData: false,
							 contentType: false,
							 xhr: function(){
								var xhr = $.ajaxSettings.xhr();
								if (xhr.upload) {
									xhr.upload.addEventListener('progress', function(e){
										console.log(e);
										if (e.lengthComputable) {
											var total = e.total;
											var position = e.loaded || e.position;
											var percent = Math.ceil(position * 100 / total);
											$("#fileUp_progress").progressbar('setValue',parseFloat(percent));
										}
									}, false);
								}
								return xhr;
							},
							success:function(data){ 
								console.log(data)
								var close=null;					
								 if (data && data !='error'){
									 parjectFileTree.tree('reload');
											$('#import_ok').linkbutton('enable');// 启用上传按钮
								 }else if(data && data==='error'){
									        $.messager.confirm('确认','文件已存在,是否覆盖已有文件？',function(r){    
									            if (r){    
									            	uplodeSubmit('Y'); 
									            }else{
									            	$('#import_win').window('close');// 关闭上传窗口
													$("#fileUp_progress").progressbar('setValue',0);// 进度条清零
													$('#file_update_tb').hide();// 隐藏进度显示
													$('#import_ok').linkbutton('enable');// 启用上传按钮
									            }    
									        });  
						                }else{
						                	$('#file_update_tb').hide();// 隐藏进度显示
						                	alert("你上传的文件格式或上传路径不正确,上传失败!!!")
											$("#fileUp_progress").progressbar('setValue',0);// 进度条清零
											$('#import_ok').linkbutton('enable');// 启用上传按钮
						                }	
							}
							
						});  			
					};
					
				
					$('#import_createFile').unbind('click').click(function(e){
						e.preventDefault();	
						$('#ok_createFile').linkbutton('disable');
						$('#project_dir_name_win').window('open');
						$('#import_win').window('close');
					});
					$('#import_unpack').unbind('click').click(function(e){//点击解压		
						e.preventDefault();	
						var import_file_path=$('#import_file_path').val();
						var selected= parjectFileTree.tree('getSelected');
						var filename=selected.text;
		            	$.ajax({
		            		type: "post",
		            		dataType: "json",
		            		async:false,// 阻止异步请求,强制为同步
		            		url: $.getRootPath() + "/TopoCtrl/unpackFile.do",
		            		data: {path:import_file_path,name:filename},
		            		success: function(data) {
		            			console.log(data);
		            			if(data=="1"){
		            				parjectFileTree.tree('reload');	
		            			}else{
		            				alert("你上传的文件名发生冲突,解压失败!!!")
		            			}
		            			
		            		}
		            	});	
						
					});
					$('#import_delFile').unbind('click').click(function(e){
						e.preventDefault();	
						var node=parjectFileTree.tree('getSelected')
						Nasoft.Ajax.deleteFile(parjectFileTree,node.path);
						$('#import_delFile').linkbutton('disable');
					});
					$('#import_delFile').linkbutton('disable');
					$('#import_cancel').unbind('click').click(function(e){
						e.preventDefault();	
						$('#import_win').window('close');
					});
					$('#import_ok').unbind('click').click(function(e){// 提交信息
						e.preventDefault();				
						var import_file_path=$('#import_file_path').val();
						var file_box=$('#file_box').textbox('getValue');
						if(!!import_file_path && !!file_box){
							$('#file_update_tb').show();// 显示上传进度
							$('#import_ok').linkbutton('disable');// 禁用上传按钮,避免重复提交
							uplodeSubmit('N'); 
							
						}else{
							$.messager.alert('系统提示!','导出信息不完整','info')
						}
					});
					$('#import_ok').linkbutton('disable');
				},
				onBeforeClose:function(){
					$("#has_upload").text("0");// 已上传大小清零
                    $("#upload_speed").text("0");// 速度显示清零
					$("#fileUp_progress").progressbar('setValue',0);// 进度条清零
					$('#file_update_tb').hide();// 隐藏进度显示
				}
				});
			
				$('#import_win').window('open');
			},
			// 导入测试文件
			_import_testfile:function(){
				var parjectFileTree=Nasoft.Util.createProjectFileTree($('#import_file_tree_testfile'));// 创建一个工程文件树
				parjectFileTree &&
				Nasoft.Ui_extend.win_event('#import_win_testfile',{
				 onBeforeOpen:function(){
					var importFilePath=null;// 定义导入文件路径
						$('#import_file_tree_testfile').unbind('click').click(function(e){
						e.preventDefault();	
						//获取Cookie中的值
						function getCookie(cookie_name)
						{
						var allcookies = document.cookie;
						var cookie_pos = allcookies.indexOf(cookie_name);

						// 如果找到了索引，就代表cookie存在，
						// 反之，就说明不存在。
						if (cookie_pos != -1)
						{
						// 把cookie_pos放在值的开始，只要给值加1即可。
						cookie_pos += cookie_name.length + 1;
						var cookie_end = allcookies.indexOf(";", cookie_pos);

						if (cookie_end == -1)
						{
						cookie_end = allcookies.length;
						}

						var value = unescape(allcookies.substring(cookie_pos, cookie_end));
						}

						return value;
						}
						var Cookie_value=getCookie('userName');
						var path="usertest"+"/"+Cookie_value
						$('#import_file_path_testfile').val(path);// 将处理后的字段赋予显示的文本框
						$('#import_ok_testfile').linkbutton('enable');
						$('#import_delFile_testfile').linkbutton('enable')
					});
					$('#file_box_testfile').filebox({
						buttonText: '选择文件'
					});
					parjectFileTree.tree({
						url:$.getRootPath()+"/HandleFile/getTestFileList.do?path=",
						lines:true,
						onLoadSuccess:function(){
							$('#import_file_path_testfile').val('');
							$('#import_delFile_testfile').linkbutton('disable');
						},
						onSelect:function(node){
							if(node.state === 'closed' || node.children){// 被选中节点为文件
								$('#import_file_path_testfile').val(node.path);// 将处理后的字段赋予显示的文本框
								$('#import_ok_testfile').linkbutton('enable');
								$('#import_delFile_testfile').linkbutton('enable')
							}else{
								var parentPath=$(this).tree('getParent',node.target).path;// 获取当前节点的父节点的文件路径
								$('#import_file_path_testfile').val(parentPath);// 将处理后的路径字段赋予路径显示文本框
								$('#import_ok_testfile').linkbutton('enable');
								$('#import_delFile_testfile').linkbutton('enable')
							}
						},
						onBeforeExpand:Nasoft.Util.treeExpand
					});
					// 上传表单异步提交
				    function uplodeSubmit(again){
						$("#has_upload").text("0");// 已上传大小清零
			            $("#upload_speed").text("0");// 速度显示清零
			            $("#fileUp_progress_testfile").progressbar('options').text='{value}%';
						$("#fileUp_progress_testfile").progressbar('setValue',0);// 进度条清零
			           // var oTimer=null;
						console.log($('#import_from_testfile').get(0))
						$('#again_submit_testfile').val(again);
						var formData = new FormData($('#import_from_testfile').get(0));
						$.ajax({    
							url:$.getRootPath()+'/TopoCtrl/importTestFile.do', 
							type:"POST",
							 data:formData,
							 processData: false,
							 contentType: false,
							 xhr: function(){
								var xhr = $.ajaxSettings.xhr();
								if (xhr.upload) {
									xhr.upload.addEventListener('progress', function(e){
										console.log(e);
										if (e.lengthComputable) {
											var total = e.total;
											var position = e.loaded || e.position;
											var percent = Math.ceil(position * 100 / total);
											$("#fileUp_progress_testfile").progressbar('setValue',parseFloat(percent));
										}
									}, false);
								}
								return xhr;
							},
							success:function(data){ 
								console.log(data)
								var close=null;					
								 if (data && data !='error'){
									 parjectFileTree.tree('reload');
											$('#import_ok_testfile').linkbutton('enable');// 启用上传按钮
								 }else if(data && data==='error'){
									        $.messager.confirm('确认','文件已存在,是否覆盖已有文件？',function(r){    
									            if (r){    
									            	uplodeSubmit('Y'); 
									            }else{
									            	$('#import_win_testfile').window('close');// 关闭上传窗口
													$("#fileUp_progress_testfile").progressbar('setValue',0);// 进度条清零
													$('#file_update_tb_testfile').hide();// 隐藏进度显示
													$('#import_ok_testfile').linkbutton('enable');// 启用上传按钮
									            }    
									        });  
						                }else{
						                	$('#file_update_tb_testfile').hide();// 隐藏进度显示
						                	alert("上传失败!!!")
											$("#fileUp_progress_testfile").progressbar('setValue',0);// 进度条清零
											$('#import_ok_testfile').linkbutton('enable');// 启用上传按钮
						                }	
							}
							
						});  			
					};
					
				
					$('#import_createFile_testfile').unbind('click').click(function(e){
						e.preventDefault();	
						$('#user_group_dir_name_win_test').window('open');
					});
					$('#group_user_btnEp_testfile').unbind('click').click(function(e){
						e.preventDefault();	
					var testpath=$('#import_file_path_testfile').val();// 将处理后的字段赋予显示的文本框
					var testname=$('#group_user_dir_name_testfile').textbox('getValue');// 将处理后的字段赋予显示的文本框	
					$.ajax({
						url:$.getRootPath()+'/HandleFile/createDirectoryFile.do', 
						async:false,
						data:{path:testpath,filename:testname,type:'1'},
						dataType:'json',
						type:'POST',
						success:function(data){
							console.log(data);
							if(data=="1"){
	            				parjectFileTree.tree('reload');	
	            				$('#user_group_dir_name_win_test').window('close');
	            				$('#group_user_dir_name_testfile').textbox('setValue','');
	            			}else{
	            				alert("创建文件夹失败")
	            			}
						}
					});
					});
					$('#group_user_new_cancel_testfile').unbind('click').click(function(e){
						e.preventDefault();	
						$('#user_group_dir_name_win_test').window('close');
					});
					$('#import_unpack_testfile').unbind('click').click(function(e){//点击解压		
						e.preventDefault();	
						var import_file_path=$('#import_file_path_testfile').val();
						var selected= parjectFileTree.tree('getSelected');
						var filename=selected.text;
		            	$.ajax({
		            		type: "post",
		            		dataType: "json",
		            		async:false,// 阻止异步请求,强制为同步
		            		url: $.getRootPath() + "/TopoCtrl/unpackTestFile.do",
		            		data: {path:import_file_path,name:filename},
		            		success: function(data) {
		            			console.log(data);
		            			if(data=="1"){
		            				parjectFileTree.tree('reload');	
		            			}else{
		            				alert("你上传的文件名发生冲突,解压失败!!!")
		            			}
		            			
		            		}
		            	});	
						
					});
					$('#import_delFile_testfile').unbind('click').click(function(e){
						e.preventDefault();	
						var node=parjectFileTree.tree('getSelected')
						Nasoft.Ajax.deleteFile(parjectFileTree,node.path);
						$('#import_delFile_testfile').linkbutton('disable');
					});
					$('#import_delFile_testfile').linkbutton('disable');
					$('#import_cancel_testfile').unbind('click').click(function(e){
						e.preventDefault();	
						$('#import_win_testfile').window('close');
					});
					$('#import_ok_testfile').unbind('click').click(function(e){// 提交信息
						e.preventDefault();				
						var import_file_path=$('#import_file_path_testfile').val();
						var file_box=$('#file_box_testfile').textbox('getValue');
						if(!!import_file_path && !!file_box){
							$('#file_update_tb_testfile').show();// 显示上传进度
							$('#import_ok_testfile').linkbutton('disable');// 禁用上传按钮,避免重复提交
							uplodeSubmit('N'); 
							
						}else{
							$.messager.alert('系统提示!','导入信息不完整','info')
						}
					});
					$('#import_ok_testfile').linkbutton('disable');
				},
				onBeforeClose:function(){
					$("#has_upload").text("0");// 已上传大小清零
                    $("#upload_speed").text("0");// 速度显示清零
					$("#fileUp_progress_testfile").progressbar('setValue',0);// 进度条清零
					$('#file_update_tb_testfile').hide();// 隐藏进度显示
				}
				});
			
				$('#import_win_testfile').window('open');
			},
			// 注销
			_log_off:function(){
				window.location=$.getRootPath()+'/Login/logout.do';
			},
			// 退出
			_quit:function(){
				 if (navigator.userAgent.indexOf("MSIE") > 0) {
					  if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
					   window.opener = null;
					   window.close();
					  } else {
					   window.open('', '_top');
					   window.top.close();
					  }
					 }
					 else if (navigator.userAgent.indexOf("Firefox") > 0) {
					  window.location.href = 'about:blank ';
					 } else {
					  window.opener = null;
					  window.open('', '_self', '');
					  window.close();
					 }

			},
		
		},
		 save_as : function(){
			var user_saveStep_dir_tree_ul = $('#user_saveStep_dir_tree_ul');
					Nasoft.Ui_extend.win_event('#saveStep_win',{
					onBeforeOpen:function(){
						user_saveStep_dir_tree_ul.tree({
							url:$.getRootPath()+"/HandleFile/getFileList.do?path=",
							lines:true,
							onClick:function(node){
								console.log(node)
								if(node.state=='closed' || node.children){
									$('#save_file_path').textbox('setValue',node.path);
								}else{
									var parentPath=user_saveStep_dir_tree_ul.tree('getParent',node.target).path;
									$('#save_file_path').textbox('setValue',parentPath)
								}
								
							},
							onSelect:function(node){
								if(!(node.state=='closed' || node.children)){// 被选中节点为文件
									$('#saveStep_file_url').val(user_saveStep_dir_tree_ul.tree('getParent',node.target).path);
									$('#saveStep_ok').linkbutton('disable');
									$('#savePath_ok').linkbutton('disable');
								}else{
									$('#saveStep_file_url').val(node.path);
									$('#saveStep_ok').linkbutton('enable');
								}
							},		
							onBeforeExpand:function(node){Nasoft.Util.treeExpand.call(this,node);}
						});
						$('#saveStep_cancelChooise').unbind('click').click(function(e){
							user_saveStep_dir_tree_ul.find('.tree-node-selected').removeClass('tree-node-selected');
						});
						$('#saveStep_cancel').unbind('click').click(function(e){
							$('#saveStep_file_name').textbox('setText','');
							user_saveStep_dir_tree_ul.find('.tree-node-selected').removeClass('tree-node-selected');
							$('#saveStep_win').window('close');
						});
						
						$('#saveStep_ok').unbind('click').click(function(e){
							e.preventDefault();
							var user = user_saveStep_dir_tree_ul.tree('getSelected');
							if(user){
								$.messager.alert("系统提示!","不能同时选择两种类型",'info');
								$('#saveStep_ok').linkbutton('disable');
								var url=!!$('#saveStep_file_name').textbox('getValue')?
										$('#saveStep_file_url').val()+
									'/'+$('#saveStep_file_name').textbox('getValue'):null;
							}else{
								$('#saveStep_ok').linkbutton('disable')
							}
							if(url==null){
								$.messager.alert("系统提示!","请填写文件名!",'info');
								$('#saveStep_file_name').textbox('textbox').focus();  
							}else{
								var tab=$('#stepTabs').tabs('getSelected');
								tab.project().file_path=url;
								saveProject();// 保存项目文件
								$('#saveStep_win').window('close');// 关闭保存文件窗口
							}
						});  
					}
				});
				$('#saveStep_win').window('open');// 打开保存文件窗口
		} 	 
};
