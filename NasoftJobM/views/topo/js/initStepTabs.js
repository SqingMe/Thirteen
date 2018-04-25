		//初始化tabs面板
Nasoft.Topo.initStepTabs=function(){
			 var closeDailog = null;
			 Nasoft.Ajax.loadDoc($.getRootPath()+"/views/topo/dialogHtml/dailog.html","body",function(doc){
				 closeDailog = $(doc);
				 closeDailog.dialog({    
					    title: '关闭提示框',    
					    width: 300,    
					    height: 150,    
					    closed: true,
					    modal: true,
					    buttons:[{
							text:'是',
							width:50,
							handler:function(){
								saveProject();
								closeDailog.dialog('close');
							}
						},{
							text:'否',
							width:50,
							handler:function(){
								var index = closeDailog.data("closeIndex");
								var onBeforeClose = $('#stepTabs').tabs("options").onBeforeClose;
								$('#stepTabs').tabs("options").onBeforeClose = function(){return true;}
								$('#stepTabs').tabs("close",index);
								$('#stepTabs').tabs("options").onBeforeClose = onBeforeClose;
								closeDailog.dialog('close');
							}
						},{
							text:'取消',
							width:50,
							handler:function(){
								closeDailog.dialog('close');
							}
						}]
					});	
			 });
			 Nasoft.Ui_extend.tabs_event('#stepTabs',{
				 onAdd : function(title, index) {// 添加一个tab时执行的函数
					var tab = $('#stepTabs').tabs('getTab', title);// 获取新添加的tab对象
					var mypanel = tab.find("._my_panel");
					Nasoft.Topo.getMyPanel.call(mypanel);
					tabProcess(tab);// 加工tab对象
					Nasoft.Topo.topo(tab);// 根据创建出的新场景初始化topo方法并放回topo完成的场景对象
					$.buttonEnable([ 'start_project', 'pause_project',
							'stop_project', 'replay_project', 'check_project',
							'impact_project', 'SQLbutton_project',
							'explore_project', 'showResult_project',
							'save_file_pictrue', 'save_as_file_pictrue' ]);// 启用此列表中的按钮			
		       	},
		         	onUnselect : function(title,index) {
		         		if(index!==0){//不是选中欢迎页面
		         			var tab=$('#stepTabs').tabs('getTab',title);//获取当前选中面板
		         			tab.projectStack = tab.project();//获取当前项目
		         		}
					},
					onSelect : function(title,index){
						if(index!==0){//不是选中欢迎页面
							var tab=$('#stepTabs').tabs('getTab',title);//获取当前选中面板
							var project=tab.projectStack;//获取当前项目
							var module_data=tab.module_data;//获取当前tab所关联的组件树.	
							$(".no_project_flag").hide();
							if (project || module_data) {
								$('#project').tree({data :[project]});
								$('#step_tool').tree({data : module_data});	
								 Nasoft.WorkButton.enable();//启用此列表中的按钮
							}
						}else{
							Nasoft.WorkButton.disable();//禁用此列表中的按钮	
							$('#step_tool').tree('remove',$('#step_tool').tree('getRoots')[0].target);
							$('#project').tree('remove',$('#project').tree('getRoots')[0].target);
							$(".no_project_flag").show();
						}			
					},
					onBeforeClose:function(title,index){
							var tab=$('#stepTabs').tabs('getTab',title);
							var project=tab.project();
							if(!project.isSave){//没保存的情况下
							var target = this;								
							closeDailog.html(title+' 未保存,是否保存?');
							closeDailog.dialog("open");
							closeDailog.data("closeIndex",index);
							return false;
							}else{//保存的情况下也要弹出一个提示框，提示是否关闭
								var target = this;
								$.messager.confirm('关闭提示框','确定要关闭?',function(r){
									if(r){	
											        Nasoft.Util._open_configuration(tab);
													opts=$(target).tabs('options');
													bc=opts.onBeforeClose;
													opts.onBeforeClose = function(){};  // 允许现在关闭
													$(target).tabs('close',index); //关闭当前tab
													opts.onBeforeClose = bc;  // 还原事件函数
												}	
								});
								return false;
							}				
					}
			 });
			 // 加工tab对象
			 function tabProcess(tab){
				// 获取当前tab的面板属性	
					var canvas = Nasoft.Topo.createCanvas(tab);// 获取画布
					var stage = Nasoft.Topo.createStage(canvas);// 根据画布创建一个舞台
					var scene = Nasoft.Topo.createScene();// 创建一个场景
					// 将场景以及相关数据绑定在一个集合中
					tab.scene = scene;
					tab.stage = stage;
					tab.scene.setTab(tab);
					tab.handleScene = Nasoft.Topo.handleScene(tab);	
					tab.run_project = Nasoft.Project.run_project();
			 }
		}
Nasoft.Topo.initTree_project = function(){
	$('#project').tree({    
		    animate:true,
		    onClick: function(node){
				if('node' === node.clickSign){// 当前点击的是node 节点
					$('#stepTabs').tabs('getSelected').scene.selectedElements = [];
					node[node.clickSign].selected = true;	
				}else if ('link' === node.clickSign) {
					$('#stepTabs').tabs('getSelected').scene.selectedElements = [];
					node[node.clickSign].selected = true;
				}
			},
			 onDblClick:function(node){
				if('connection'===node.clickSign){   
					     /**
					      * 点击链接树节点时将节点的连接配置信息传给connection窗口重新加载	
					      */
                       Nasoft.Window.fns.connection.setInfo(node); 	
					$('#dblink_win').window('open');
			}else if ('node' === node.clickSign){
				var node = node.node, winId = node.getWindow();
				Nasoft.Ui_extend.win_event('#' + winId,Nasoft.Window.fns[winId](node));
				$('#' + winId).window('open');
				$('#stepTabs').tabs('getSelected').handleScene.handleStack();// 操作一下栈缓存	
			}else if ('link' === node.clickSign){}
			 },
		 onContextMenu:function(e, node){    	
			    	e.preventDefault();
			    	$('#project').tree('select',node.target);
			  	    // 判断当前被点击的节点的标记
					switch(Nasoft.Tree.getClickSign('#project')){
					case 'connection':
						$('#database_menu').menu('show',{
							left:e.pageX,
							top:e.pageY
						});
						break;
					case 11:
						 $('#dblink_menu').menu('show', {
								left: e.pageX,
								top: e.pageY
		              });	
						 break;
					}
	              
			    },	
		});
}

Nasoft.Topo.initTree_step = function(){
	$('#step_tool').tree({    
		    animate:true,
		    onLoadSuccess:function(node,data){
		    	if(data){
		    		var $this=$(this);
		    		$.each(data[0].children,function(i,o){
		    			Nasoft.HandleStep.initStepDepend($this.tree('find',o.id).target);
			    	});		
		    	}
		    }
		});
}