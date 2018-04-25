 Nasoft.Topo.transferFns.RuleExecutor=function(node){
	 return [{name:'RuleExecutor'}];
  };
Nasoft.Window.fns.RuleExecutor=function(node){
				Nasoft.Ui_extend.browser_even('#RuleExecutor');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			console.log(node);
                      
		    			$('#RuleExecutor_step_name').textbox('setValue',node.text);//获取步骤名称
		    			if(!!node.getStep()['rule-file']){//初始化单选按钮,对应的字段有值的时候相应的单选按钮被选中
		    				$('#RuleExecutor_rule_file').textbox('setValue',node.getStep()['rule-file']);
		    				$('#Rule_file_radio').get(0).checked=true;	
                            $('#RuleExecutor_rule_file').textbox('enable');//启用对应的输入框
                            $('#RuleExecutor_rule_definition').get(0).disabled=true;//禁用
		    			}else if(!!node.getStep()['rule-definition']){//初始化单选按钮
		    				$('#RuleExecutor_rule_definition').val(node.getStep()['rule-definition']);
		    				$('#Rule_definition_radio').get(0).checked=true;
		    				$('#RuleExecutor_rule_definition').get(0).disabled=false;//启用
		    				$('#RuleExecutor_rule_file').textbox('disable');//禁用
		    			}else{//初始化单选按钮,在对应字段没有值的时候,默认选中
		    				$('#Rule_file_radio').get(0).checked=true;	
		    				$('#RuleExecutor_rule_file').textbox('enable');//启用
		    				$('#RuleExecutor_rule_definition').get(0).disabled=true;//禁用
		    			}
		    			$('input[name="Rule_radio"]').unbind('click').click(function(e){//单击单选按钮的时候触发的事件
		    				if($('#Rule_file_radio').get(0).checked){//被选中
		    					$('#RuleExecutor_rule_file').textbox('enable');//启用
	                            $('#RuleExecutor_rule_definition').get(0).disabled=true;//禁用
		    				}else{//另一个被选中
		    					$('#RuleExecutor_rule_definition').get(0).disabled=false;//启用
			    				$('#RuleExecutor_rule_file').textbox('disable');//禁用
		    				}
		    			});
		    			
		    		var options=$('#Rule_result_table').datagrid('options');//获取表格的所有相关属性;
		    		var option={};//自定义我们需要的表格属性对象空间;
		    		option.data=node.getStep().fields?{total:1, rows:$.isArray(node.getStep().fields.field)?
				    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]};
		    		option.toolbar=[{//自定义工具栏;
		    			iconCls: 'icon-add',
		    			text:'增加一行',
		    			handler: function(){
		    				$('#Rule_result_table').datagrid('appendRow',{
		    					'column-name':'',
		    					'column-type':''
		    				});
		    			}
		    		},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
							var del_row = $('#Rule_result_table').datagrid('getSelected');
							var del_rowIndex = $('#Rule_result_table').datagrid('getRowIndex',del_row);
							$('#Rule_result_table').datagrid('deleteRow',del_rowIndex);
						}
					}];
		    		 var  columns= options.columns[0];//获取表格的列属性
		    		
		    		 option.onDblClickCell=function(i,f,v){
		    			 $.each($('#Rule_result_table').datagrid('getRows'),function(j,o){
		    				 $('#Rule_result_table').datagrid('endEdit',j);
		    			 });
		    			 var data =[{'value':'Data','text':'Data'},{'value':'String','text':'String'},{'value':'Number','text':'Number'},
		    			            {'value':'Internet Address','text':'Internet Address'},{'value':'BigNumber','text':'BigNumber'},
		    			            {'value':'Integer','text':'Integer'},{'value':'Boolean','text':'Boolean'},{'value':'Timestamp','text':'Timestamp'},
		    			            {'value':'Binary','text':'Binary'}]//定义下拉数据
		    			  
		    			if('column-name'===f){
		    				columns[0].editor={type:'text'};
		    				if(columns[1].editor)delete columns[1].editor;
		    			}else{
		    				columns[1].editor={type:'combobox',options:{
		    					valueField:'value',
			    				textField:'text',
			    				data:data
		    				}}
		    				if(columns[0].editor)delete columns[0].editor;
		    			}
		    			 $('#Rule_result_table').datagrid('beginEdit',i);
		    		var	eg=$('#Rule_result_table').datagrid('getEditor',{index:i,field:f});
		    		$(eg.target).focus().focusout(function(){//失去
		    			$('#Rule_result_table').datagrid('endEdit',i);
		    		});
		    			 console.log({'i':i,f:f,v:v});
		    		 };
		    		 option.onSelect=function(i,r){
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
						};
		    		 
		    		$('#Rule_result_table').datagrid($.extend(options,option));
		    		$('#RuleExecutor_ok').unbind('click').click(function(e){
		    			 $.each($('#Rule_result_table').datagrid('getRows'),function(j,o){
		    				 $('#Rule_result_table').datagrid('endEdit',j);//退出所有行的编辑
		    			 });
		    			var RuleExecutor={};
		    			var Rule_result_table=Nasoft.GetProjectData.getFields('#Rule_result_table');//获取表字段
		    			if($('#Rule_file_radio').get(0).checked){
		    				var rule_file=$('#RuleExecutor_rule_file').textbox('getValue');//获取输入框的值(禁用的时候无效)
		    				
		    			}else{		    				
		    				var rule_definition=$('#RuleExecutor_rule_definition').val();//获取输入框的值(禁用的时候无效)
		    			}
		    			RuleExecutor['rule-file']=rule_file||'';
		    			RuleExecutor['rule-definition']=rule_definition||'';
		    			RuleExecutor.name=$('#RuleExecutor_step_name').textbox('getValue');
		    			RuleExecutor.fields=Rule_result_table;
		    			node.text=$('#RuleExecutor_step_name').textbox('getValue');
		    			node.setStep(RuleExecutor);
		    			$('#RuleExecutor').window('close');
		    			
		    		});
		    		$('#RuleExecutor_cancel').unbind('click').click(function(e){

		    			$('#RuleExecutor').window('close');
		    			
		    		});
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
		    	};
		    	onBeforeClose=function(){
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}