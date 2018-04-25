Nasoft.TopButton.Execute={
	init:function(){
		var menubutton=$('#Execute').menubutton({ menu: '#eventmenu'});
		$(menubutton.menubutton('options').menu).menu({
			onShow:function(){
				var tabs=$('#stepTabs').tabs('tabs');// 获取所有的tab
				var tab = $('#stepTabs').tabs('getSelected');// 获取当前被选中的tab
				var tabIndex = $('#stepTabs').tabs('getTabIndex',tab);// 获取当前选中tab的index
				if(tabs && tabs.length>1 && tabIndex>0){
					$(this).menu('enableItem',$('#_run'));  
					$(this).menu('enableItem',$('#_run_option'));
					$(this).menu('enableItem',$('#_stop'));
					$(this).menu('enableItem',$('#_debug'));
					$(this).menu('enableItem',$('#_reset'));
					$(this).menu('enableItem',$('#_check_out'));
					$(this).menu('enableItem',$('#_impact'));
					$(this).menu('enableItem',$('#_get_sql'));
				}else{
					$(this).menu('disableItem', $('#_run'));  
					$(this).menu('disableItem',$('#_run_option'));
					$(this).menu('disableItem',$('#_stop'));
					$(this).menu('disableItem',$('#_debug'));
					$(this).menu('disableItem',$('#_reset'));
					$(this).menu('disableItem',$('#_check_out'));
					$(this).menu('disableItem',$('#_impact'));
					$(this).menu('disableItem',$('#_get_sql'));
				}
			},
            onClick: function (item) {
            var fns=Nasoft.TopButton.Execute.fns;
           
               if(typeof fns[item.id]=='function'){
            	   fns[item.id](); 
               }
            }
		})
		
	},
	fns:{
		"_run":function(){//运行任务
			try {			
				Nasoft.Topo.getSelectedTab().run_project.run();	
			} catch (e) {
				// TODO: handle exception
				console.log(e);
			}

		},
		"_reset":function(){//重放
			//再次执行
			Nasoft.Topo.getSelectedTab().run_project.replay();
		},
		"_stop":function(){
			Nasoft.Topo.getSelectedTab().run_project.stopAll();	
		}
	}
}		