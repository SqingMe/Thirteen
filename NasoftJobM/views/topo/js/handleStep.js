Nasoft.HandleStep={
		/**
		 * 删除节点
		 * @param node
		 */
		deleteStep:function(){
			var tab=$('#stepTabs').tabs('getSelected'),
			scene=tab.scene,
			project=tab.project(),
			sceneChilds=scene.childs;
			for(var i=0;i<sceneChilds.length;i++){
				if(sceneChilds[i].selected){
					sceneChilds[i].selected = false;
					sceneChilds[i].removeAllEventListener();
					sceneChilds[i].dialog && sceneChilds[i].dialog.hide();
					scene.remove(sceneChilds[i]);
				}
			}	
		},
		initStepDepend : function(dom){
			var stepNode=null,
			scene=null,
			tab,
			center,
			project,
			theight,
		    lwidth,
			width,
			tab_width,
			tab_height,
			height,
			$tool,
			isAdd;//定义一个步骤节点,定义一个场景		
			$(dom).draggable({ //将所有匹配到的子节点都修饰成可拖拽
					 revert : true,// 拖拽完毕复位
					 proxy : function(source) {
						var proxy = $('<div style="width:187px;z-index:9999;"></div>');
						    proxy.html($(source).html()).appendTo('body');
					    return proxy;
								},// 以一个克隆的节点为拖拽对象
					 onStartDrag : function(e) {
						 			tab = Nasoft.Topo.getSelectedTab();
						 			center = tab.find("._my_panel").layout("panel","center");
									$tool = $('#step_tool').tree('getData', this);// 获取当前拖拽节点的数据
									$('#step_tool').tree('select', this);// 获取当前拖拽节点的数据						
									scene = tab.scene;
									project = tab.project();
									stepNode = Nasoft.Topo.newNode(40, 40,project.project_type, $tool);
									width = document.body.offsetWidth;// 获取body的宽度
									height = document.body.offsetHeight;// 获取body的高度
									center_width = center.width();
									center_height = center.height();
									theight = height - tab.height();
									lwidth = width - tab.width();
								},
			 onDrag : function(e) {
				         if(e.pageX > (width-2)){
				        	 scene.stage.canvas.width = scene.stage.canvas.width+10;
				        	 center.scrollLeft(center.scrollLeft()+10);
				         }else if(e.pageY  > center_height+theight){
				        	 scene.stage.canvas.height = scene.stage.canvas.height+10;
				        	 center.scrollTop(center.scrollTop()+10);
				         }
								},
			 onStopDrag : function(e) {
				 var sl = center.scrollLeft();// 获取滚动条左偏量
				 var st = center.scrollTop();// 获取滚动条上偏量
									if (stepNode && e.pageX  > lwidth && e.pageY > theight && e.pageY < center_height+theight) {
										window.document.body.removeChild(window.document.body.lastChild);
										tab.handleScene.handleStack();// 操作一下栈缓存 
										stepNode.setCenterLocation(e.pageX+sl - lwidth,e.pageY+st - theight);
										if (scene.existsNode(stepNode)) {
											stepNode.text = stepNode.text+$.createId();
										};
											scene.add(stepNode);
											if (project.project_type === '1') {
												stepNode.setStep();
											} else {
												stepNode.setEntry();
											}
									} else {
										return false;
									}
								}
		   });
		},
       stepExist : function(node){
    	   var scene = Nasoft.Topo.getSelectedTab().scene;
    	   var nodeText = node.text;
    	   $.each(scene.stepclassifyMap,function(i,o){
    		    
    	   });
       }
}