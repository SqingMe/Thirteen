Nasoft.TopButton={
			init:function(){//定义一个总的加载函数	
					
							for(var key in Nasoft.TopButton){
								if(key!='init' && key!='save'){//找出Nasoft.TopButton对象中除了init以外的所有对象
									Nasoft.TopButton[key].init();//运行每一个对象的init函数
								}
							}
						}
	};
Nasoft.TopButton.Help={
	init:function(){
		var menubutton=$('#Help').menubutton({ menu: '#helpmenu'});
		$(menubutton.menubutton('options').menu).menu({
            onClick: function (item) {
            	if(item.text =='欢迎页面'){
					$('#stepTabs').tabs('select',0);
            	}else if(item.text =='关于'){
            		alert('我们的这款产品主要有两大功能，数据处理和作业处理这两大核心及其他控制面板。这里面定义了许多组件比如固定宽度组件、选中字段组件、文本输入输出组件、客户可以根据自己的需求来选择使用相应的组件实现业务需求。');
            	}
            }
})
	},
	menuHandler:function(item){
		alert(item.id);
	}
};