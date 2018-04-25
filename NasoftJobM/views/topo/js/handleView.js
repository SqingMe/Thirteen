Nasoft.TopButton.View={
		init:function(){
			var menubutton=$('#View').menubutton({ menu: '#viewmenu'});
			var menus=menubutton.menubutton('options').menu;
			$(menus).menu({
				onShow:function(){
					var tabs=$('#stepTabs').tabs('tabs');// 获取所有的tab
					var tab = $('#stepTabs').tabs('getSelected');// 获取当前被选中的tab
					var tabIndex = $('#stepTabs').tabs('getTabIndex',tab);// 获取当前选中tab的index
					if(tabs && tabs.length>1 && tabIndex>0){
						$(menus).menu('enableItem', $('#_blow_up'));  
						$(menus).menu('enableItem',$('#_lessen'));
						$(menus).menu('enableItem',$('#_equal_pro'));
					}else{
						$(menus).menu('disableItem', $('#_blow_up'));  
						$(menus).menu('disableItem',$('#_lessen'));
						$(menus).menu('disableItem',$('#_equal_pro'));
					}
				},
	            onClick: function (item) {
	                //item 的相关属性参见API中的menu
	            	 var fns=Nasoft.TopButton.View.fns;
		               if(typeof fns[item.id]=='function'){
		            	   fns[item.id](); 
		               }
	            }
	})
		},
		fns:{
			_blow_up:function(){//放大
				var tab=$('#stepTabs').tabs('getSelected');
				var scene=tab.scene;
				console.log(scene);
				scale=(scene.scaleX)>5?0:0.2;
				scene.scaleX +=scale;
				scene.scaleY +=scale; 
				
			},
			_lessen:function(){//缩小
				var tab=$('#stepTabs').tabs('getSelected');
				var scene=tab.scene;
				console.log(scene)
				scale=(scene.scaleX)<0.3?0:0.2;
				scene.scaleX -=scale;
				scene.scaleY -=scale; 
			},
			_equal_pro:function(){//等比例
				var tab=$('#stepTabs').tabs('getSelected');
				var scene=tab.scene;
				scene.scaleY =1;
				scene.scaleX =1;
			},
			_exe_result:function(bool){//执行结果面板
				var tab=Nasoft.Topo.getSelectedTab();
				var collapsed = tab.find('._my_panel').layout("panel","south").panel("options").collapsed;
				if(!collapsed){
					if(!bool){
						tab.find('._my_panel').layout("collapse","south");
					}
				}else{
					tab.find('._my_panel').layout("expand","south");
				}
			},
		}
};