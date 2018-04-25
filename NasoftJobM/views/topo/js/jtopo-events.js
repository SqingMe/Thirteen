       // 场景的事件对象
		Nasoft.TopoEvents = function(){
			return {
			    // 如何 线 
				howDrawLink : "shift",
				// 当前事件的场景
				_scene : null,
				// 当前事件的舞台
				_stage : null,
				// 节点被拖拽的标记
				_mousedragFlag : false,
				// 连线的起始节点
				_beginNode : null,
				// 连线的结束节点
				_endNOde : null,
				// 临时代理结束节点
				_tempNodeZ : null,
				// 初始化连线对象
				_link : null,
				_mouseoutTime : null,
				_mouseoverTarget : null,
				/**
				 *设置当前的舞台
				 * @author rsq0113
				 */
				setStage : function (_stage) {
				    this._stage = _stage;
				    this.setTempNodeZ();// 设置临时节点
				    this.bind.call(this);// 给场景绑定事件
				},
				/**
				 * 获取当前的舞台
				 * @author rsq0113
				 */
				getStage : function () {			
				    return this._stage;
				},
				/**
				 * 获取当前的场景
				 * @author rsq0113
				 */
				getScene : function () {
				    this._scene = this._stage.childs[0];
				    return this._scene;
				},
				/**
				 * 设置临时节点
				 * @author rsq0113
				 * @returns
				 */
				setTempNodeZ : function() {
					this._tempNodeZ = new JTopo.Node();
					this._tempNodeZ.setSize(1, 1);// 给委托节点设置大小
				},
				mousewheel : function(e) {
					var that = $('#stepTabs').tabs('getSelected').topoEvents;
					var stage = that._scene.stage;
					var scale = 0;
					if (e.wheelDelta) { // 判断浏览器IE，谷歌滑轮事件
						if (e.wheelDelta > 0) { // 当滑轮向上滚动时
							console.log('up');
							scale = (stage.scaleX) > 10 ? 0 : 0.2;
							stage.scaleX += scale;
							stage.scaleY += scale;

						} else if (e.wheelDelta < 0) { // 当滑轮向下滚动时
							console.log('dowm');
							scale = (stage.scaleX) < 0.3 ? 0 : 0.2;
							stage.scaleX -= scale;
							stage.scaleY -= scale;

						}
					} else if (e.detail) { // Firefox滑轮事件
						if (e.detail > 0) { // 当滑轮向上滚动时
							scale = (stage.scaleX) > 10 ? 0 : 0.2;
							stage.scaleX += scale;
							stage.scaleY += scale;
						} else if (e.detail < 0) { // 当滑轮向下滚动时
							console.log('dowm');
							scale = (stage.scaleX) < 0.3 ? 0 : 0.2;
							stage.scaleX -= scale;
							stage.scaleY -= scale;
						}
					}
				},
				/**
				 * 鼠标双击事件
				 * @author rsq0113
				 */
				dbclick : function(e) {
					var that = $('#stepTabs').tabs('getSelected').topoEvents;
					if (e.target && e.target instanceof JTopo.Node) {// 判断被点击的对象是node
						clearTimeout(that.mouseoverTime);
						var node = e.target, winId = node.getWindow();
						//node.drawLink().hide();
						// 构造一个弹出窗口
						var firstTime = Nasoft.Window.createNodeWin(node);
						document.removeEventListener("keydown",$(document).data("keydown"),false)
						// 获取加载参数
							var options = Nasoft.Window.fns[winId](node);
							options.onBeforeClose = function(){
								document.addEventListener("keydown",$(document).data("keydown"),false)
							}
							// 重新加载弹出窗口
							$("#"+winId).window(options);
							// 打开窗口
							$("#"+winId).window("open");
								that._scene.tab.handleScene.handleStack();// 操作一下栈缓存	
					}
				},
				/**
				 * 鼠标悬停事件
				 * @author rsq0113
				 */
				mouseover : function(e) {
					  var that = $('#stepTabs').tabs('getSelected').topoEvents;
					if (e.target && e.target instanceof JTopo.Link && !that._beginNode && e.ctrlKey) {
						  var thislink = e.target;
						  thislink.addEventListener("mouseout",function(e){
							  if(thislink.dialog){
								  thislink.dialog.hide(); 
								  var form = thislink.dialog.find('form').serializeArray();
								  var obj = {enabled:'N',evaluation:'N',unconditional:'N'};
								  $.each(form,function(i,o){
										  if(o.name==="enabled"){
												 obj["enabled"] = "Y";
											}else if(o.name === "thisname"&&o.value === "unevaluation"){
												  obj.evaluation = "N";
											  }else{
												  obj[o.value] = "Y";
											  }
								  });
								  $.extend(true,thislink,obj);
								  thislink.setAlt();
							  }
							  thislink.removeEventListener("mouseout");
						  });
						  var dialog = thislink.mydialog(e);
						  dialog && dialog.show();
					  }
				},
			
			   /**
			    * 鼠标移动事件
			    * @author rsq0113
			    */
				mousemove : function(e) {// 鼠标在场景移动时触发的事件
					var tab = Nasoft.Topo.getSelectedTab();
					var that = tab.topoEvents;
					if (that._tempNodeZ) {
						that._tempNodeZ.setLocation(e.x, e.y);
					}
				},
				/**
				 * 鼠标点下
				 * @author rsq0113
				 */
				mousedown : function(e){
					var that = $('#stepTabs').tabs('getSelected').topoEvents;
				},
				/**
				 * 鼠标弹起事件
				 * @author rsq0113
				 */
				mouseup : function(e) {
						var tab = Nasoft.Topo.getSelectedTab();
						var that = tab.topoEvents;
						that._mousedragFlag = false;
						if (e.target && e.target instanceof JTopo.Node && e.button == 2) {
							// 移除临时连线
							that._link && (that._scene.remove(that._link),that._link=null);
							// 隐藏代理图标
							//e.target.drawLink().hide();
							that.handleNode(e);// 操作场景中的节点
						} else if (e.target && e.target instanceof JTopo.Link && e.button == 2) {
							e.target.dialog && e.target.dialog.hide();
							that.handleLink(e)// 操作场景中的连线
						} else if (!e.target && e.button == 2) {
							that.handleScene(e);// 操作场景
						}
		                if (e.target && e.target instanceof JTopo.Node) {
		                	var flag;
							// 隐藏代理图标
							$('#panel-linkHandle').hide();
		                	// 使用shift划线
		                	if(that.howDrawLink === "shift"){
		                		flag = that._drawLinkByShift(e);			
		                	}
		                	that._drawLinkEnd(e,flag);
						} else if (that._link) {
							// 代理线段存在的情况下点击的不是node节点则移除此线段
							that._scene.remove(that._link);
							that._beginNode = null;
							that._link = null;
						}
		                e.target = null;
				},
				mousedrag : function(e) {
						var that = $('#stepTabs').tabs('getSelected').topoEvents;
						var tab = Nasoft.Topo.getSelectedTab();// 获取当前tab
						var center = tab.find("._my_panel").layout("panel","center");
 							if (e.target && e.target instanceof JTopo.Node) {// 步骤节点被拖拽
 								var scene = tab.scene;
								var bound = tab.scene.getBound();
								var sl = center.scrollLeft();// 获取滚动条左偏量
								var st = center.scrollTop();// 获取滚动条上偏量
								var center_width = center.width();
								var center_height = center.height();
								var nodes = scene.selectedElements;
								// 选中多个节点移动
								if(nodes.length>1){
									var xx=[],yy=[];
									// 获取被选中的节点的x坐标和y坐标的集合
									for(var i=0;nodes.length>i;i++){
										xx[i]=nodes[i]['x'];
										yy[i]=nodes[i]['y'];
									}
									// 获取最大的x坐标
									var maxx = xx.sort(function(a,b){return b-a;})[0];
									// 获取最大的y坐标
									var maxy = yy.sort(function(a,b){return b-a;})[0];
									if(maxx>(sl+center_width-60)){
							        	 center.scrollLeft(center.scrollLeft()+10);
							         }else if(maxy>(st+center_height-80)){
							        	 center.scrollTop(center.scrollTop()+10);
							         }else if(maxx>bound.width-60){
							        	 // 判断最右边的节点是否即将超出画布边缘
							        	 scene.stage.canvas.width = scene.stage.canvas.width+10;
							        	 center.scrollLeft(center.scrollLeft()+10);
							         }else if(maxy>bound.height-60){
							        	 // 判断最底部的节点是否即将超出画布顶端
							        	 scene.stage.canvas.height = scene.stage.canvas.height+10;
							        	 center.scrollTop(center.scrollTop()+10);
							         }
								}else{
								 // 单节点移动
									if(nodes[0].x>(sl+center_width-60)){
							        	 center.scrollLeft(sl+center_width);
							         }else if(nodes[0].x<sl+10){
							        	 center.scrollLeft(sl-10);
							         }else if(nodes[0].y>(st+center_height-60)){
							        	 center.scrollTop(st+center_height);
							         }else if(nodes[0].y<st+10){
							        	 center.scrollTop(st-10);
							         }else if(nodes[0].x>bound.width-60){
							        	 scene.stage.canvas.width = scene.stage.canvas.width+10;
							        	 center.scrollLeft(sl+10);
							         }else if(nodes[0].y>bound.height-60){
							        	 scene.stage.canvas.height = scene.stage.canvas.height+10;
							        	 center.scrollTop(st+10);
							         }
								}
								// 移除定时函数
								//that.__mouseoutTime && clearTimeout(that.__mouseoutTime);
								tab.onChange.call(tab);
							};
							if(!that._mousedragFlag){
								tab.handleScene.handleStack();// 操作一下栈缓存
							}
							that._mousedragFlag = true; 
				},
				/**
				 * 绘制连线通过shift键
				 * @author rsq0113
				 */
				_drawLinkByShift : function(e) {
					var that = $('#stepTabs').tabs('getSelected').topoEvents;
					var tempNodeZ = that._tempNodeZ,// 初始化临时节点
					    scene = that._scene// 初始化场景对象  
					if (!that._beginNode && e.shiftKey) {
						console.log('shiftKey')
						// 捕获鼠标点击的对象,此对象为JTopo.Node,赋值给初始节点
						that._beginNode = e.target;
						// 创建一条线,终点为临时节点
						that._link = Nasoft.Topo.newLink(that._beginNode, tempNodeZ);
						// 将线加入场景
						scene.add(that._link);
						// 委托的终端节点随鼠标的位置变化,从而可以拉出线.
						tempNodeZ.setLocation(e.x, e.y);
						return true;
					}
					return false;
				},
				_drawLinkEnd : function(e,flag) {
					var that = $('#stepTabs').tabs('getSelected').topoEvents;
					var tempNodeZ = that._tempNodeZ,// 初始化临时节点
					    scene = that._scene;// 初始化场景对象  
					if (!flag && that._beginNode && that._beginNode !== e.target) {
						that._endNode = e.target;// 鼠标再次捕获目标,此目标不是初始节点,而且此时初始节点不为空,将捕获的对象赋值给终端节点
						/**
						 * 判断此时创建的线段是否已经存在
						 */
					    if (scene.existsLink(that._beginNode,that._endNode)) {
								console.log('有相同连线存在......');
								scene.remove(tempNodeZ);// 移除代理的结束节点
								that._link = null;// 清空代理连线的变量
								that._beginNode = null;// 清空开始节点的代理变量
								that._endNode = null;// 清空结束节点的代理变量
						};
						if (that._link) {
						  var l = Nasoft.Topo.newLink(that._beginNode, that._endNode);// 创建一个指定的连线
							scene.remove(that._link);// 移除代理连线
							scene.tab.handleScene.handleStack();// 操作一下栈缓存
							scene.add(l);// 将指定的连线放入场景
							scene.updateProject(scene.getTab().project());// 更新项目树
							that._beginNode = null;// 清空开始节点的代理变量
							that._endNode = null;// 清空结束节点的代理变量
							that._link = null;// 清空代理连线的变量
						}		
					} else if (!flag && that._beginNode === e.target) {
						// 连线点击了同一个节点,移除委托线,清空初始节点
						scene.remove(that._link);
						that._beginNode = null;
						that._link = null;
					}
				},
				_drawLinkByIcon : function(e) {
					var that = $('#stepTabs').tabs('getSelected').topoEvents;
					var tempNodeZ = that._tempNodeZ,// 初始化临时节点
					    scene = that._scene// 初始化场景对象  
					if (!that._beginNode) {
						// 捕获鼠标点击的对象,此对象为JTopo.Node,赋值给初始节点
						that._beginNode = that._mouseoverTarget;
						// 创建一条线,终点为临时节点
						that._link = Nasoft.Topo.newLink(that._beginNode, tempNodeZ);
						// 将线加入场景
						scene.add(that._link);
						// 委托的终端节点随鼠标的位置变化,从而可以拉出线.
						tempNodeZ.setLocation(e.x, e.y);
					}
				},
				/**
				 * 绑定事件
				 * @author rsq0113
				 */
				bind : function() {
				   var scene = this.getScene();
				   scene.removeAllEventListener();
				   scene.mouseover(this.mouseover);
				   scene.dbclick(this.dbclick);
				   scene.mousewheel(this.mousewheel);
				   scene.mousemove(this.mousemove);
				   scene.mousedown(this.mousedown);
				   scene.mouseup(this.mouseup);
				   scene.mousedrag(this.mousedrag);
				},
				handleScene : function  (e) {
					if(this._link) return;
					var scene = this._scene;		
					$('#scene_menu_trn').menu("disableItem", $('#cutStep_scene_trn'));
					scene.getTab().project().project_type === '1' && // 数据处理工程的操作线段
					Nasoft.Ui_extend.menu_showAndHandle('#scene_menu_trn', {
						XY : {
							left : e.pageX,
							top : e.pageY
						},
						onClick : function(item) {
							switch (item.id) {
							case 'pasteStep_scene_trn':// 粘贴
								scene.tab.handleScene.handleStack();// 操作一下栈缓存
								pasteStep();
								break;
							}
						}
					});
					scene.getTab().project().project_type === '2' && // 作业处理工程的操作线段
					Nasoft.Ui_extend.menu_showAndHandle('#scene_menu_job', {
						XY : {
							left : e.pageX,
							top : e.pageY
						},
						onClick : function(item) {
							switch (item.id) {
							case 'pasteStep_scene_trn':// 粘贴
								pasteStep();
								break;
							}
						}
					});
				},
			  handleNode : function (e) {
				  if(this._link) return;
				  var scene = this._scene;
					// 操作node节点
					// 需要扩充(在右击菜单后,根据右击选项的id来对应case的值,然后实现所需的方法)
					$('#node_menu_trn').menu("disableItem", $('#pasteStep_node_trn'));
					$('#node_menu_job').menu("disableItem", $('#pasteStep_node_trn'));
					scene.getTab().project().project_type === '1' && // 数据处理工程的操作线段
					Nasoft.Ui_extend.menu_showAndHandle('#node_menu_trn', {
						XY : {
							left : e.pageX,
							top : e.pageY
						},
						onClick : function(item) {
							switch (item.id) {
							case 'del_node_trn':// 删除节点
								scene.tab.handleScene.handleStack();// 操作一下栈缓存
								Nasoft.HandleStep.deleteStep();// 删除步骤
								$("#panel-linkHandle").hide();
								break;
							case 'copy_node_trn':// 复制                     
								copyStep();
								break;
							case 'cutStep_node_trn':// 剪切
								scene.tab.handleScene.handleStack();// 操作一下栈缓存
								cutStep();
								break;
							}
						}
					});
					if(scene.getTab().project().project_type === '2' || scene.getTab().project().project_type === '3'){
						 Nasoft.Ui_extend.menu_showAndHandle('#node_menu_job', {
								XY : {
									left : e.pageX,
									top : e.pageY
								},
								onClick : function(item) {
									switch (item.id) {
									case 'del_node_job':// 删除节点
										scene.tab.handleScene.handleStack();// 操作一下栈缓存
										Nasoft.HandleStep.deleteStep();
										break;
									case 'copy_node_trn':// 复制
										copyStep();
										break;
									case 'cutStep_node_trn':// 剪切
										scene.tab.handleScene.handleStack();// 操作一下栈缓存
										cutStep();
										break;
									}
								}
							});
					}
				},
				// 选中连线
				handleLink : function (e) {
					if(this._link) return;
					var scene = this._scene;
					scene.getTab().project().project_type === '1'
							&& // 数据处理工程的操作线段
							Nasoft.Ui_extend.menu_showAndHandle('#link_menu_trn', {
								XY : {
									left : e.pageX,
									top : e.pageY
								},
								onClick : function(item) {
									var link = e.target;
									switch (item.id) {
									case 'del_link_trn':// 删除线
										/**
										 * 从场景(scene)中移除选中的对象
										 */
										Nasoft.HandleStep.deleteStep();// 删除当前选中的连线
										break;
									case 'turn_link_trn':// 变化方向
										/**
										 * 实现思路:遍历场景的子对象集合,找出当前所选中的线段,定义两空节点.
										 * 如果所选中的线段的nodeA与nodeZ两两对应,那么将此线段的nodeA赋值
										 * 空的nodeZ,nodeZ赋值空的nodeA实现线段的翻转方向,如果存在有相反
										 * 方向的线则不允许此线段翻转
										 */
										var nodeA = null, nodeZ = null;
										$.each(scene.getChilds(), function(i, l) {
											if ('link' === l.elementType) {
												if (l.nodeZ === link.nodeA
														&& l.nodeA === link.nodeZ) {
													nodeA = link.nodeA
													nodeZ = link.nodeZ
													return false;
												} else {
													nodeA = link.nodeZ;
													nodeZ = link.nodeA;
												}

											}
										});
										scene.remove(link);// 移除被选中的线
										link = Nasoft.Topo.newLink(nodeA, nodeZ);// 创建一条与当前线方向相反的连线
										scene.add(link);// 将新建的线放入场景中
										scene.updateProject(scene.getTab().project());// 更新项目树
										break;
									}

								}
							});
					if(scene.getTab().project().project_type === '2' || scene.getTab().project().project_type === '3')
						 // 数据处理工程的操作线段
					{	Nasoft.Ui_extend.menu_showAndHandle('#link_menu_job', {
								XY : {
									left : e.pageX,
									top : e.pageY
								},
								onClick : function(item) {
									var link = e.target;
									switch (item.id) {
									case 'del_link_job':// 删除线
										/**
										 * 从场景(scene)中移除选中的对象
										 */
										scene.tab.handleScene.handleStack();// 操作一下栈缓存
										Nasoft.HandleStep.deleteStep();// 删除当前选中的连线
										scene.updateProject(scene.getTab().project());
										break;
									case 'turn_link_job':// 变化方向
										/**
										 * 实现思路:遍历场景的子对象集合,找出当前所选中的线段,定义两空节点.
										 * 如果所选中的线段的nodeA与nodeZ两两对应,那么将此线段的nodeA赋值
										 * 空的nodeZ,nodeZ赋值空的nodeA实现线段的翻转方向,如果存在有相反
										 * 方向的线则不允许此线段翻转
										 */
										var nodeA = null, nodeZ = null;
										$.each(scene.getChilds(), function(i, l) {
											if ('link' === l.elementType) {
												if (l.nodeZ === link.nodeA
														&& l.nodeA === link.nodeZ) {
													nodeA = link.nodeA
													nodeZ = link.nodeZ
													return false;
												} else {
													nodeA = link.nodeZ;
													nodeZ = link.nodeA;
												}
											}
										});
										scene.tab.handleScene.handleStack();// 操作一下栈缓存
										scene.remove(link);
										link = Nasoft.Topo.newLink(nodeA, nodeZ);
										scene.add(link);
										scene.updateProject(scene.getTab().project());
										break;
									}
								}
							});
				}
				}
		}  
		}