var parentNode = [];
Nasoft.TopButton.Tool={
		init:function(){
			var menubutton=$('#Tool').menubutton({ menu: '#toolsmenu'});
			$(menubutton.menubutton('options').menu).menu({
				onShow:function(){
					var tabs=$('#stepTabs').tabs('tabs');// 获取所有的tab
					var tab = $('#stepTabs').tabs('getSelected');// 获取当前被选中的tab
					var tabIndex = $('#stepTabs').tabs('getTabIndex',tab);// 获取当前选中tab的index
					if(tabs && tabs.length>1 && tabIndex>0){
						$(this).menu('enableItem', $('#_browse'));  
						$(this).menu('enableItem', $('#_create_db_con')); 
					}else{
						$(this).menu('disableItem', $('#_browse'));  
						$(this).menu('disableItem', $('#_create_db_con'));
					}
				},
	            onClick: function (item) {
	            	var fns=Nasoft.TopButton.Tool.fns;
		               if(typeof fns[item.id]=='function'){
		            	   fns[item.id](); 
		               }
	            }
	})
		},
		fns:{
			databaseList : function(connection,input){
				try {
		    		var parjectFileTree=Nasoft.Util.createProjectFileTree($('#dbTable_tree'));
    		    	Nasoft.Ui_extend.win_event('#dbTable_win',{
    		    		onBeforeOpen:function(){// 调用window的打开是执行函数
						connection.state='closed';
						parjectFileTree.tree({
							data:[connection] ,
							formatter:function(node){
								if(node.TABLE_NAME){
									return node.TABLE_NAME;
								}else if(node.TABLE_SCHEM && !node.TABLE_NAME){    										
									return node.TABLE_SCHEM;
								}else{
									return node.name;
								}
							},
                            onSelect:function(node){
                            	if(input){
                            		input.textbox('setValue',node.text);
                            	}
                            },
							onBeforeExpand:function(node){
								var child_data=null;// 定义子节点数据
								console.log(node)
								
								if(node.state==='closed' || node.children){
									
									connection.schema=node.TABLE_SCHEM?node.TABLE_SCHEM:null;
									$.ajax({
										url:$.getRootPath()+'/DblinkCtrl/getTables.do',
										data:connection,
										type:'post',
										async:false,
										dataType:'json',
										success:function(child){
											child_data=child;// 为子节点数据赋值
									}
									});
									console.log(child_data);
									if(node.children && node.children.length>0){
										var that = this;
										var childs = $(this).tree("getChildren",node.target);
										$.each(childs,function(i,o){
											$(that).tree("remove",o.target);
										});
										$(this).tree('append', {// 更新子节点
											parent: node.target,
											data: child_data
										});
									}else if(child_data.length>0){											
										parjectFileTree.tree('append', {// 添加子节点
											parent: node.target,
											data: child_data
										});
									}else{
										console.log('空文件夹')
										return false;
									}	
								}else{
									$.messager.alert("系统提示!","这是文件!",'info');
								}
							}
						});
					}		    	
    		    	});	
				} catch (e) {
					// TODO: handle exception
					console.log(e)
				}
			},
			_browse:function(){
				var that=this;
				Nasoft.Ui_extend.win_event('#browse_win',{
					onBeforeOpen:function(){// 调用window的打开是执行函数
					var connections=Nasoft.GetProjectData.getConnectins()
					console.log(connections);
					var connection=null;
					$('#connection_datalist').datalist({
						data:connections,
		    		    valueField:'name',   // 将connections的id字段绑定在下拉表单的value上
		    		    textField:'name',  // 将connections的text字段绑定在下拉表单的显示字段上
		    		    fit:true,
		    		    onDblClickCell:function(index, field, value){
		    		    	$.each(connections,function(i,o){// 遍历下拉表单的所有数据项
		    		    		if(value==o.name){// 筛选出当前点击的下拉表单项的connection
		    		    			connection=o;			
		    		    		}
		    		    	});
		    		    	that.databaseList(connection);
		    		    
		    		    	$('#dbTable_win').window('open');
		    		    }
					});
				}
				});
				
				$('#browse_win').window('open');
			},
			_keycode:function(){		
				topo_keycode_open_a(); 
				 $('#topo_keycode_ok').unbind('click').click(function(e){// 点击确定
					    savekeycode();
	 					$('#toolsmenu_keycode_win').window('close');
	    				
	    			});
				 $('#topo_keycode_save').unbind('click').click(function(e){// 点击应用
					    savekeycode();
	    				
	    			});
				 $('#topo_keycode_cancel').unbind('click').click(function(e){// 点击关闭
					 
	 					$('#toolsmenu_keycode_win').window('close');
	    				
	    			});
				 function topo_keycode_open_a(){
						$.ajax({
							// 请求方式为get
							type : "post",
							// json文件位置
							url : $.getRootPath() + '/views/topo/jsonData/KeyCode.json',

							// 返回数据格式为json
							dataType : "json",
							// 请求成功完成后要执行的方法
							success : function(keyall) {
								var	mykey=keyall;
								console.log(mykey)
								var typeVal={rows:[{keycode:'save',houtkry:formatter(mykey.save)},{keycode:'copy',houtkry:formatter(mykey.copy)},
										             {keycode:'shear',houtkry:formatter(mykey.shear)},{keycode:'paste',houtkry:formatter(mykey.paste)},
										             {keycode:'choose',houtkry:formatter(mykey.choose)},{keycode:'back',houtkry:formatter(mykey.back)},
										             {keycode:'forward',houtkry:formatter(mykey.forward)},{keycode:'del',houtkry:formatter(mykey.del)},
										             {keycode:'search',houtkry:formatter(mykey.search)},{keycode:'openFile',houtkry:formatter(mykey.openFile)},
										             {keycode:'newProject',houtkry:formatter(mykey.newProject)},{keycode:'saveAs',houtkry:formatter(mykey.saveAs)},
										             {keycode:'newFile',houtkry:formatter(mykey.newFile)},{keycode:'close',houtkry:formatter(mykey.close)},
										             {keycode:'closeAll',houtkry:formatter(mykey.closeAll)},{keycode:'shared',houtkry:formatter(mykey.shared)},
										             {keycode:'import',houtkry:formatter(mykey.import)},{keycode:'exp',houtkry:formatter(mykey.exp)},
										             {keycode:'cancel',houtkry:formatter(mykey.cancel)},{keycode:'exit',houtkry:formatter(mykey.exit)}           
										             ]}
								$('#toolsmenu_keycode_data').datagrid({
									data:typeVal,
									columns : [ [{
										field : "keycode",
										title : "功能说明",
										align : 'center',
										width : 200,
										singleSelect:true,
										formatter: function(value,row,index){
											
											  if(value){
												  switch (value)
												  {
												  case 'save':
													  value="保存";
												    break;
												  case 'copy':
													  value="复制";
												    break;
												  case 'shear':
													  value="剪切";
												    break;
												  case 'paste':
													  value="粘贴";
												    break;
												  case 'choose':
													  value="全选";
												    break;
												  case 'back':
													  value="后退";
												    break;
												  case 'forward':
													  value="前进";
												    break;
												  case 'del':
													  value="删除步骤";
												    break;
												  case 'search':
													  value="搜索";
												    break;
												  case 'openFile':
													  value="打开";
												    break;
												  case 'newProject':
													  value="新建工程";
												    break;
												  case 'saveAs':
													  value="保存为";
												    break;
												  case 'newFile':
													  value="新建文件";
												    break;
												  case 'close':
													  value="关闭";
												    break;
												  case 'closeAll':
													  value="关闭所有";
												    break;
												  case 'shared':
													  value="共享";
												    break;
												  case 'import':
													  value="导入";
												    break;
												  case 'exp':
													  value="导出";
												    break;
												  case 'cancel':
													  value="注销";
												    break;
												  case 'exit':
													  value="退出";
												    break;
												    
												  }
												  console.log(value)
									        	    return value;
											             }else{
											        return	 
											        }
										}
									},{
										field : "houtkry",
										title : "快捷键",
										align : 'center',
										width : 300,
										editor : {
		    								type :'textbox',
		    								autoSave:true,
		    							},
										
									}
									] ],
									onClickRow: function (index, row) {// 单击只选中一行
								    	   var rowInfo = $(this).datagrid('getSelected');
								    	   if(rowInfo){
								    	  
								    	   $(this).datagrid('unselectRow', index);
								    	   }else{
								    		$(this).datagrid('selectRow', index);
								    		
								    	}
				                    },  
								    onDblClickCell: function(index,field,value){// 双击事件
								    	console.log(value)
								    	console.log(field)
								    	var rows=$('#toolsmenu_keycode_data').datagrid('getRows');
								    	$.each(rows,function(j,o){
								    		j===index || $('#toolsmenu_keycode_data').datagrid('endEdit',j);
								    	});
				    				      
				    						$('#toolsmenu_keycode_data').datagrid('beginEdit', index);// 编辑点击的行

				    						 var ed = $(this).datagrid('getEditor', {index:index,field:field});
				    						 var val=''
				    							 var span=ed.target[0].nextSibling;
				    						     var inputs=span.childNodes;
				    						     inputs[0].onkeydown= function(e) {
				    						    		setTimeout(function(){
				    						    			 val=keydown(e);
								    						 function keyCode_conflict (){
								    							 for(var i=0;i<rows.length;i++){
								    								 var vala=rows[i].houtkry;
									    							 if(val==vala){
								
									    								 return true;
									    							 }
								    							 }
								    							 return false;
								    							 
								    						 }
								    						if(keyCode_conflict()){
								    							alert('您设置的热键发生冲突');
								    							$(ed.target).textbox('setValue', value);
								    						}else{
								    							$(ed.target).textbox('setValue', val);
								    						}

				    						    		},1)
				    						    		e.keyCode = 0;
				    						    		if (e.preventDefault) {  // firefox
				    						    			e.preventDefault();
				    						    		} else { // other
				    						    			e.returnValue = false;
				    						    		}
							    					}
				    						   
									}
								});
							}
						})
					 
						$('#toolsmenu_keycode_win').window('open');
				 }
				 function savekeycode(){			
				 var vData = $('#toolsmenu_keycode_data').datagrid('getRows');// 获取当前页面中所有的行
					var obj={};
					$.each(vData, function(i, o) {
			    		 $('#toolsmenu_keycode_data').datagrid('endEdit',i);
						obj[vData[i].keycode]=deformatter(vData[i].houtkry);
					});
					 console.log(obj)
					var keycodeString=JSON.stringify(obj);
					var path=$.getRootPath() + '/views/topo/jsonData/KeyCode.json'
					$.ajax({
						url:$.getRootPath()+'/KeyCode/KeyCodeSet.do',
						data:{keycodeset:keycodeString},
						async:false,
						dataType:'json',
						success : function(keyall) {
							Nasoft.KeyCode.SetKey(obj);
							var typeVal={rows:[{keycode:'save',houtkry:formatter(obj.save)},{keycode:'copy',houtkry:formatter(obj.copy)},
									             {keycode:'shear',houtkry:formatter(obj.shear)},{keycode:'paste',houtkry:formatter(obj.paste)},
									             {keycode:'choose',houtkry:formatter(obj.choose)},{keycode:'back',houtkry:formatter(obj.back)},
									             {keycode:'forward',houtkry:formatter(obj.forward)},{keycode:'del',houtkry:formatter(obj.del)},
									             {keycode:'search',houtkry:formatter(obj.search)},{keycode:'openFile',houtkry:formatter(obj.openFile)},
									             {keycode:'newProject',houtkry:formatter(obj.newProject)},{keycode:'saveAs',houtkry:formatter(obj.saveAs)},
									             {keycode:'newFile',houtkry:formatter(obj.newFile)},{keycode:'close',houtkry:formatter(obj.close)},
									             {keycode:'closeAll',houtkry:formatter(obj.closeAll)},{keycode:'shared',houtkry:formatter(obj.shared)},
									             {keycode:'import',houtkry:formatter(obj.import)},{keycode:'exp',houtkry:formatter(obj.exp)},
									             {keycode:'cancel',houtkry:formatter(obj.cancel)},{keycode:'exit',houtkry:formatter(obj.exit)}           
									             ]}
							$('#toolsmenu_keycode_data').datagrid({
								data:typeVal,
							});
						}
					});
					
			}
				 
				 
				 
				  function formatter(obj){					
					  if(obj){
						  var ctrlk='';
						  var shifk='';
						  var altk='';
						  var realkey='';
						  if(obj.ctrlKey){
							  ctrlk='Ctrl+'; 							  
						  }
						  if(obj.shiftKey){
							  shifk='Shift+';							  
						  }
						  if(obj.altKey){
							  altk='Alt+';							  
						  }
						  if(obj.keyCode){
							  realkey=String.fromCharCode(obj.keyCode); // 将数字形式的键值转化为真实的按键
							  if(realkey=="."){
								 realkey="Delete"
							  }
						  }
						  value=ctrlk+shifk+altk+realkey
						  console.log(value)
			        	    return value;			        
					        }
				}
				  function deformatter(str){					
					  var keyobj={}
					  if(str){
						 var keyArray=str.split('+');
						 var ctrlKey=false;
						 var shiftKey=false;
						 var altKey=false;
						 var keyCode;
						$.each(keyArray,function(i,o){
							if(keyArray[i]=='Ctrl'){								
								ctrlKey=true; 
								
							}
						   if(keyArray[i]=='Shift'){
							   shiftKey=true;
							   
							}
							if(keyArray[i]=='Alt'){
								altKey=true;
								
							}
							if(keyArray[i]){
								if(keyArray[i]=="Delete"){
									keyArray[i]="."
								}
								 keyCode = keyArray[i].charCodeAt();	
								
							}
							
						})
						keyobj.ctrlKey=ctrlKey;
						keyobj.shiftKey=shiftKey;
						keyobj.altKey=altKey;
						keyobj.keyCode=keyCode;
						return keyobj;			        
	}
}
				  
				  function keydown(e){
						  console.log(e)
						   var ctrlk='';
						  var shifk='';
						  var altk='';
						  var realkey='';
						  if(e.ctrlKey && (e.shiftKey===false || e.altKey===false)){
							  ctrlk='Ctrl+'
						  }
						  if(e.shiftKey && (e.ctrlKey===false || e.altKey===false)){
							  shifk+='Shift+'
						  }
						  if(e.altKey && (e.shiftKey===false || e.ctrlKey===false)){
							  altk='Alt+'						
						  }
						  
						  if(e.keyCode>=65 && e.keyCode<=105 || e.keyCode==46){
							  if(e.keyCode==46){
								  realkey=String.fromCharCode(e.keyCode);
								  realkey="Delete"
							  }else{
								  
								  realkey=String.fromCharCode(e.keyCode);
							  }
						  }
					  value=ctrlk+shifk+altk+realkey
					  console.log(value)
		        	    return value;		
				  }
				
			},
			_create_db_con:function(){
				Nasoft.Window.fns.connection.setInfo();
				$('#dblink_win').window('open');
			},
			/**
			 * 选项
			 */
			_options:function(){
				Nasoft.Ui_extend.win_onBeforeOpen('#options_win',function(){// 调用window的打开是执行函数
					Nasoft.OptionsWindow.initList();
					$('#options_tools_btn').unbind('click').click(function(e){
						var nodes3 = $('#options_tree').tree('getRoots');  // 获取所有根节点
						Nasoft.TopButton.Tool.fns.getParent(nodes3);
						$('#options_win').window('close');
						Nasoft.TopButton.Tool.fns.createbtn();
					});
					
				});
				$('#options_win').window('open');
			},
			getParent:function(node){
				parentNode = [];
				for(var i=0;i<node.length;i++){
					var childrenNodes = node[i].children;
					var childNode = new Array();
					for(var j=0;j<childrenNodes.length;j++){
						if(childrenNodes[j].checkState == "checked"){
							childNode.push(childrenNodes[j]);
						}
					}
					parentNode.push({'pid"':node[i].id,'node':childNode});
				}
			},
			createbtn:function(){
				$("#tools_menu").empty(); 
				$.each(parentNode,function(i,n){
					
					$.each(n.node,function(j,o){
						 $("#tools_menu").append("<a id='"+o.id+"' class=\"easyui-linkbutton\" href=\"#\"></a>&nbsp;");
						 $("#"+o.id+"").linkbutton({    
						        iconCls: 'icon-search'   
						    }); 
					});
 				});
			}
			// 选项end
		}
};



Nasoft.OptionsWindow={
		// 打开窗口的时候调用以便初始化列表状态
		 initList:function(index){
			$('#options_ul').datalist({
				onLoadSuccess:function(){
					$('#options_ul').datalist('selectRow',0);
				},
				onSelect:function(i,r){
					Nasoft.OptionsWindow.toeast(r.value,index);
				}
			});	
		},
		// 左侧列表选项改变时调用,用来右侧窗体显示效果
		 toeast:function(value,index){
			var ind=index||0;
			switch(value){
			case"options_tools":
				$('#options_tools').show().siblings().hide();// 显示一般设置,同时隐藏其他设置(只是隐藏不是初始化)
				$.getJSON($.getRootPath()+'/views/topo/jsonData/options-tool.json',function(treeData){
					$('#options_tree').tree({
						checkbox:true,
						data: treeData
					});
				});
				break;
			case"options_test":
				$('#options_test').show().siblings().hide();
				break;
			}
		}
}


