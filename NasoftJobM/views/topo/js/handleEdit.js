var setingParm = [];
Nasoft.TopButton.Edit={
		init:function(){
			var menubutton=$('#Edit').menubutton({ menu: '#editmenu'});
			$(menubutton.menubutton('options').menu).menu({
				onShow:function(){
					var tabs=$('#stepTabs').tabs('tabs');// 获取所有的tab
					var tab = $('#stepTabs').tabs('getSelected');// 获取当前被选中的tab
					var tabIndex = $('#stepTabs').tabs('getTabIndex',tab);// 获取当前选中tab的index
					if(tabs && tabs.length>1 && tabIndex>0){
					   var hs = tab.handleScene, 
					   cache = tab.cache;
						if(hs.inTheStack && cache){// 当前场景在栈中
						   var index = cache.indexOf(tab.scene);
						   if(index === 0){// 不可以撤销
							   $(this).menu('disableItem',$('#_back'));
							   $(this).menu('enableItem',$('#_march'));
						   }else if(index === cache.length - 1) {
							   $(this).menu('enableItem',$('#_back'));
							   $(this).menu('disableItem',$('#_march'));
						   }else{
							   $(this).menu('enableItem',$('#_back'));
							   $(this).menu('enableItem',$('#_march'));
						   };
						}else if (!hs.inTheStack && cache) {// 不在栈中且有缓存,那么可以撤销
							   $(this).menu('enableItem',$('#_back'));
						}else if (!hs.inTheStack && !cache) {// 不在栈中且没有缓存,那么不能撤销也不能后退
							$(this).menu('disableItem',$('#_march'));
							 $(this).menu('disableItem',$('#_back'));
						}
						$(this).menu('enableItem',$('#menu_cut'));
						$(this).menu('enableItem',$('#menu_copy'));
						$(this).menu('enableItem',$('#menu_paste'));
						$(this).menu('enableItem',$('#menu_clearSelect'));
						$(this).menu('enableItem',$('#menu_selectall'));
						$(this).menu('enableItem',$('#_set_EV'));
						$(this).menu('enableItem',$('#_show_EV'));
						$(this).menu('enableItem',$('#_set'));
					}else{
						$(this).menu('disableItem', $('#_back'));  
						$(this).menu('disableItem',$('#_march'));
						$(this).menu('disableItem',$('#menu_cut'));
						$(this).menu('disableItem',$('#menu_copy'));
						$(this).menu('disableItem',$('#menu_paste'));
						$(this).menu('disableItem',$('#menu_clearSelect'));
						$(this).menu('disableItem',$('#menu_selectall'));
						$(this).menu('disableItem',$('#_set_EV'));
						$(this).menu('disableItem',$('#_show_EV'));
						$(this).menu('disableItem',$('#_set'));
					}
				},
	            onClick: function (item) {
	            	var fns=Nasoft.TopButton.Edit.fns;
	            	 if(typeof fns[item.id]=='function'){
		            	   fns[item.id](); 
		              }
		         }     
			})
		},fns:{
			_back:function(){
				var hs=$('#stepTabs').tabs('getSelected').handleScene;
	  			hs.repealStep();//撤销         
			},
			_march:function(){
				var hs=$('#stepTabs').tabs('getSelected').handleScene;
	  			hs.forwardStep();// ※前进
			},
			menu_cut:function(){
				cutStep();
			},
			menu_copy:function(){
				copyStep();
			},
			menu_paste:function(){
				 pasteStep();
			},
			menu_selectall:function(){
				 selectAllStep();
			},
			menu_clearSelect:function(){
				clearSelectStep();
			},
			menu_back:function(){
				editMenuBack();
			},
			menu_march:function(){
				editMenuMarch();
			},
			_set:function(){
				var tab=$('#stepTabs').tabs('getSelected');
				var project=tab.project();
				if(project && project.project_type === '1'){
					    Nasoft.Window.menuSetProperty.showSetingValue(project);
						$('#set_data_win').window('open');
					}else if(project && project.project_type === '2' || project.project_type === '3'){
						Nasoft.Window.menuSetTask.showSetingTaskValue(project);
						$('#setTask_data_win').window('open');
					}	
			},
			/**
			 * 设置环境变量
			 */
			_set_EV:function(){
				$('#setting_data_win').window('open');
				  $('#setting_table').datagrid({
						toolbar: [{
							iconCls: 'icon-add',
							text : "增加",
							handler: function(){
								$('#setting_table').datagrid(//新增加一行
										'appendRow',
										{
											setingName:'', 
											setingValue:'',
										});}
						}],
					    columns:[[
					  	        {field:'setingName',title:'名称',width:150,
					  	        	editor:{type:'text'}
					  	        },    
					  	        {field:'setingValue', title:'值',width:250,
					  	        	editor:{type:'text'}
					  	        },
					  	    ]],
					  	data:setingParm,
					    onDblClickCell:function(index, field, value){
					    	$('#setting_table').datagrid('beginEdit', index);//编辑点击的行
					    	var ed = 
					    		$('#setting_table').datagrid(
					    			'getEditor', 
					    			{index:index,field:field}
					    		 );
							$(ed.target).focus();
					     }
					});
				  $('#setting_ok').unbind('click').click(function(e){
					  Nasoft.TopButton.Edit.setingClick();
				  });
				  $('#setting_cancel').unbind('click').click(function(e){
					  Nasoft.TopButton.Edit.setingCancelClick();
				  });
			},
			/**
			 * 显示环境变量
			 */
			_show_EV:function(){
				$('#setting_data_win').window('open');
				  $('#setting_table').datagrid({
					  toolbar: null,
					  columns:[[
					  	        {field:'setingName',title:'名称',width:150},    
					  	        {field:'setingValue', title:'值',width:250},
					  	    ]],
					  	data:setingParm,
					});
			},
			/**
			 * 显示参数
			 */
			_show_param:function(){
				$('#show_param_win').window('open');
				 $('#show_param_table').datagrid({
					 columns:[[
					  	        {field:'showParamName',title:'名称',width:150},    
					  	        {field:'showParamValue', title:'值',width:250},
					  	    ]],
					});
				  $('#showParam_ok').unbind('click').click(function(e){
					  Nasoft.TopButton.Edit.showParamOkClick();
				  });
				  $('#showParam_cancel').unbind('click').click(function(e){
					  Nasoft.TopButton.Edit.showParamCancelClick();
				  });
			},
			/**
			 * 搜索工程
			 */
			menu_search_data:function(){
				var opts=$('#search_data_grid').datagrid('options'),				
				options={
					fit : true,
					rownumbers:true,
				    onClickRow: function (index, row) {//单击只选中一行
				    	   var rowInfo = $(this).datagrid('getSelected');
				    	   if(rowInfo){
				    	  
				    	   $(this).datagrid('unselectRow', index);
				    	   }else{
				    		$(this).datagrid('selectRow', index);
				    		
				    	}
                    }, 
				    onDblClickCell: function(index,field,value){//双击事件
				    	if(field=="fileName"){				    		
				    		Nasoft.project.openProject(value);
				    		$('#search_data_win').window('close');
				    	}
	
					}
						};
				opts.columns[0][0].formatter= function(value,row,index){//拆分字符串
	        		  if(value){
			        		var search_fileName=value.split('/')
			        		  value=search_fileName[search_fileName.length-1]
			        	    return value
					             }else{
					        return	 
					            	 
					             }
						}     
				function search_search_data(){//自定义方法
					var search_data=null;
					$.ajax({
						url:$.getRootPath()+'/HandleForFileExtendsCtrl/getFileListA.do',
						async:false,
						dataType:'json',
						type:'post',
						success:function(data){
							
							search_data=data;
							
						}
					});
					
					return search_data;
				}
				
				var search_data=search_search_data();
		
				opts.data={rows:search_data};
				$('#search_data_grid').datagrid($.extend(opts,options));
				$('#search_data_win').window('open');
				$('#condition').textbox('setValue','');
				$('#search_data_grid').datagrid({
					data:search_data,    
						});
    			$('#topo_inquiries').unbind('click').click(function() {//点击查询
    				
					var sFind = $('#condition').textbox('getValue');
					//var vData = Nasoft.GetProjectData.getFields('#search_data_grid');
						if (sFind != "") {
							var vResult = [];
							$.each(search_data, function(i, o) {
						 
								var nPos = -1;
								var search_fileName=o.fileName.split('/')
				        		var value_a=search_fileName[search_fileName.length-1]
										nPos=value_a.indexOf(sFind)
									
								
								if (nPos >= 0) {
									vResult[vResult.length] = o;
									
								}
								
							});
							$('#search_data_grid').datagrid({
								rownumbers:true,
								data:vResult,    
									});
						}
					});
				$('#topo_close_search').unbind().click(function(){//关闭按钮
					$('#search_data_win').window('close');
				});
				
		  }
		},
		menuHandler:function(item){
			alert(item.id);
		},
		getSceneSteps:function(){
			var tab = $('#stepTabs').tabs('getSelected');//获取当前tab
			var scene = Nasoft.Tree.selectScene(tab);	  //根据tab创建场景
			
			var data=[];
			var message="";
			$.each(PARMLIST.sceneArray,function(i,o){
				if(o.scene.childs.length != 0){
					$.each(o.scene.childs,function(j,oc){
						data.push({code:'',name:oc.text,price:oc.text,set:'stepName'});
					})
				}
			});
			
			return data; 
		},
		/**
		 * 点击确定按钮
		 */
		setingClick:function(value){
			setingParm = [];
			var rows = $("#setting_table").datagrid('getRows');
			//将对应数据字段加入表输出
			$.each(rows,function(i,r){
				$('#setting_table').datagrid('endEdit', i);//结束编辑所有行
				setingParm.push({setingName:r.setingName,setingValue:r.setingValue});
			});
//			 $.messager.show({
//					title:'系统提示',
//					msg:'设置环境变量成功!',
//					timeout:5000,
//			});
			$('#setting_data_win').window('close'); 
		},
		/**
		 * 设置变量取消按钮
		 */
		setingCancelClick:function(){
			$('#setting_data_win').window('close'); 
		},
		/**
		 * 显示参数确定按钮
		 */
		showParamOkClick:function(){
			$('#show_param_win').window('close'); 
		},
		/**
		 * 显示参数取消按钮
		 */
		howParamCancelClick:function(){
			$('#show_param_win').window('close');
		}
};