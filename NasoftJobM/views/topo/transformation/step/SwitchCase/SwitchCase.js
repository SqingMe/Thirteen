Nasoft.Topo.transferFns.SwitchCase = function(node) {
	var fds = [];
	return fds;
};
Nasoft.Window.fns.SwitchCase = function(node) {
	Nasoft.Ui_extend.browser_even('#SwitchCase');// 限制组件不能超出浏览器上边缘

	var onBeforeOpen, onBeforeClose, onBeforeOpen = function() {
		try {
			// console.log("node="+node);
			$('#SwitchCase_step_name').textbox('setValue', node.text);
			node.getStep().case_value_format!=''&&node.getStep().case_value_format!=null?$('#SwitchCase_step_case_value_format').textbox('setValue', node.getStep().case_value_format):$('#SwitchCase_step_case_value_format').textbox('setValue', '');
			node.getStep().case_value_decimal!=''&&node.getStep().case_value_decimal!=null?$('#SwitchCase_step_case_value_decimal').textbox('setValue', node.getStep().case_value_decimal):$('#SwitchCase_step_case_value_decimal').textbox('setValue', '');
			node.getStep().case_value_group!=''&&node.getStep().case_value_group!=null?$('#SwitchCase_step_case_value_group').textbox('setValue', node.getStep().case_value_group):$('#SwitchCase_step_case_value_group').textbox('setValue', '');
			
			var transferArry = Nasoft.Topo.transferFns.getTransfer(node);// 获取当前节点可用的字段
			if (transferArry.length > 0) {
				var transfer = Nasoft.Util.transferArray_copy(transferArry);
				transfer = Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			$('#SwitchCase_step_fieldname').combobox({//Switch字段
				data:caltacomval,
				valueField:'value',   
				textField:'text',  
				onLoadSuccess:function(data){
					node.getStep().fieldname!=''&&node.getStep().fieldname!=null?$(this).combobox('select',node.getStep().fieldname):$(this).combobox('setValue','');
				}
			});
			var conert_status_data=[{
    			label: 'String',
    			value: 'String'
    		},{
    			label: 'Date',
    			value: 'Date'
    		},{
    			label: 'Number',
    			value: 'Number'
    		},{
    			label: 'InternetAddress',
    			value: 'InternetAddress'
    		},{
    			label: 'BigNumber',
    			value: 'BigNumber'
    		},{
    			label: 'Integer',
    			value: 'Integer'
    		},{
    			label: 'Boolean',
    			value: 'Boolean'
    		},{
    			label: 'Timestamp',
    			value: 'Timestamp'
    		},{
    			label: 'Binary',
    			value: 'Binary'
    		}];
			
			$('#SwitchCase_step_case_value_type').combobox({//类型
					data:conert_status_data,
					valueField:'value',   
					textField:'label',  
					onLoadSuccess:function(data){
						node.getStep().case_value_type!=''&&node.getStep().case_value_type!=null?$(this).combobox('select',node.getStep().case_value_type):$(this).combobox('setValue','');
					}
				});
			
			//默认步骤
			
			function scgetStepNextName(node){
				  if(!!node.outLinks && node.outLinks.length > 0){
					  var stepname=[];
						for (var i = 0; i < node.outLinks.length; i++) {
							var nodeZ={}
							nodeZ.text= node.outLinks[i].nodeZ.text//获取下个节点的name名称
							stepname.push(nodeZ)
						}
						return stepname
				  }else{
					  return null;
				  }
			  }; 
			function switchcase_next_steptname(node){
				var stepName=scgetStepNextName(node);			
				var data=[]
				if(stepName!=null){
						for (var i = 0; i < stepName.length; i++) {		
							var data_a={"text":stepName[i].text,"value":stepName[i].text}
							data.push(data_a)
						}
						return data;
				    }else{
				    	var data_b={"text":'',"value":''}
				    	data.push(data_b);
				    	return data;
				    }
			}
			$('#SwitchCase_step_default_target_step').combobox({
				valueField :"value",
				textField : "text",
				data :switchcase_next_steptname(node),
				onLoadSuccess:function(data){
					node.getStep().default_target_step!=''&&node.getStep().default_target_step!=null?$(this).combobox('select',node.getStep().default_target_step):$(this).combobox('setValue','');
				}
			});
			if(node.getStep().use_contains==='Y'){
				$('#SwitchCase_step_use_contains').get(0).checked=true;
			}else if(node.getStep().use_contains==='N'){
				$('#SwitchCase_step_use_contains').get(0).checked=false;
			}else{
				$('#SwitchCase_step_use_contains').get(0).checked=true;
			}

			
			$('#SwitchCase_step_cases_table').datagrid({//目标步骤的界面  
				fit:true,
				rownumbers:true,
				singleSelect:true,
				fitColumns:true,
			    data:!!node.getStep().cases&&node.getStep().cases['case']?{total:1, rows:$.isArray(node.getStep().cases['case'])?
			    		node.getStep().cases['case']:[node.getStep().cases['case']]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					fitColumns:true,
					handler: function(){//添加一行
						$('#SwitchCase_step_cases_table').datagrid(//新增加一行
								'appendRow',
								{
									value:'', 
									target_step:'',
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						var del_row = $('#SwitchCase_step_cases_table').datagrid('getSelected');
						var del_rowIndex = $('#SwitchCase_step_cases_table').datagrid('getRowIndex',del_row);
						$('#SwitchCase_step_cases_table').datagrid('deleteRow',del_rowIndex);
					}
				}],
				
			    columns:[[    
			        {field:'value',title:'值',width:100,editor:{type:'text'}},    
			        {field:'target_step',title:'目标步骤',width:100,editor:{
			        	 type:'combobox',
			        	 options:{
			        		 valueField :"value",
							 textField : "text",
							 editable:true,
							 data : switchcase_next_steptname(node)
			        	 },
			        }}   
			    ]],
	    		onClickRow:function(i,r){
			    	var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						j===i || $('#SwitchCase_step_cases_table').datagrid('endEdit',j);
					});
		        	$(this).datagrid('beginEdit',i);//编辑点击的行
	    		},
				onSelect:function(i,r){
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
				}
			});
			// 取消按钮
			$('#SwitchCase_cancel').unbind('click').click(function(e) {
				$('#SwitchCase').window('close');
			});
			// 确认按钮
			$('#SwitchCase_ok').unbind('click').click(function(e) {
								var SwitchCase = {};
								node.text = $('#SwitchCase_step_name').textbox('getValue');
								SwitchCase.case_value_format=($('#SwitchCase_step_case_value_format').textbox('getValue')==null||$('#SwitchCase_step_case_value_format').textbox('getValue')=='')?'':$('#SwitchCase_step_case_value_format').textbox('getValue');
								SwitchCase.case_value_decimal=($('#SwitchCase_step_case_value_decimal').textbox('getValue')==null||$('#SwitchCase_step_case_value_decimal').textbox('getValue')=='')?'':$('#SwitchCase_step_case_value_decimal').textbox('getValue');
								SwitchCase.case_value_group=($('#SwitchCase_step_case_value_group').textbox('getValue')==null||$('#SwitchCase_step_case_value_group').textbox('getValue')=='')?'':$('#SwitchCase_step_case_value_group').textbox('getValue');
								SwitchCase.use_contains = $('#SwitchCase_step_use_contains').get(0).checked ? 'Y': 'N';
								SwitchCase.fieldname=($('#SwitchCase_step_fieldname').combobox('getValue')==null||$('#SwitchCase_step_fieldname').combobox('getValue')=='')?'':$('#SwitchCase_step_fieldname').combobox('getValue');
								SwitchCase.case_value_type=($('#SwitchCase_step_case_value_type').combobox('getValue')==null||$('#SwitchCase_step_case_value_type').combobox('getValue')=='')?'':$('#SwitchCase_step_case_value_type').combobox('getValue');
								SwitchCase.default_target_step=($('#SwitchCase_step_default_target_step').combobox('getValue')==null||$('#SwitchCase_step_default_target_step').combobox('getValue')=='')?'':$('#SwitchCase_step_default_target_step').combobox('getValue');
								
								var rows = $('#SwitchCase_step_cases_table').datagrid('getRows');
						        $.each(rows, function(i, o) {
							    $('#SwitchCase_step_cases_table').datagrid('endEdit',i);// 结束编辑所有行
						       });
						       var fields = Nasoft.GetProjectData.getFields('#SwitchCase_step_cases_table');
						       if (!!fields&& fields.field.constructor == Array) {// 数组
						    	   var parameters={};
						    	   var variablemapping_value=[]
						    	   $.each(fields.field,function(i, o) {
						    		   variablemapping_value.push(o);
											});
						    	   parameters['case']=variablemapping_value;
						    	   SwitchCase.cases = parameters;
								} else if (!!fields) {// 对象
									 var parameters={};
							    	   var variablemapping=[]
							    	   variablemapping.push(fields.field);
							    	   parameters['case']=variablemapping;
							    	   SwitchCase.cases = parameters;
								}
							    node.setStep(SwitchCase);
								node.setTransfer();// 把定义的常量set出去
								$('#SwitchCase').window('close');// 关闭窗口
							});

		} catch (e) {
			console.log(e)
		}
	}, onBeforeClose = function() {
	}
	return {
		onBeforeOpen : onBeforeOpen,
		onBeforeClose : onBeforeClose
	}
}
