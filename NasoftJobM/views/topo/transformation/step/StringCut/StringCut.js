Nasoft.Topo.transferFns.StringCut=function(node){
	var fds = [];
	if(!!node.getStep().fields){

		//console.log("type : "+type);
		var rows = node.getStep().fields.field;
		if(!!rows&&(node.getStep().fields.field.constructor) == Object){
			var field={};
			if(rows.out_stream_name!=''&&rows.out_stream_name!=null){
				field.name = rows.out_stream_name;
			}else{
				field.name = rows.in_stream_name;	
			}
			fds.push(field);
		}else if(!!rows&&(node.getStep().fields.field.constructor) == Array){
			$.each(rows,function(i,o){
				if(o.out_stream_name!=null&&o.out_stream_name!=''){
					var field={};
					field.name=o.out_stream_name;
					fds.push(field);
				}else{
					var field={};
					field.name=o.in_stream_name;
					fds.push(field);
				}
			});
		}else{
			return fds;
		}
		
	}
	return fds;
 };
Nasoft.Window.fns.StringCut=function(node){
	Nasoft.Ui_extend.browser_even('#StringCut');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose;
	onBeforeOpen=function(){
		try {
			
			//获取当前节点可用字段
			var transferArray=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(!!transferArray){
				var transfer=Nasoft.Util.transferArray_copy(transferArray);//复制当前节点可用的字段
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			$('#step_name_StringCut').textbox('setValue',node.text);
			
			var step=node.getStep();//获取步骤对象		
			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			$('#StringCut_table').datagrid({		
				data:!!step.fields?{total:1, rows:$.isArray(step.fields.field)?
						step.fields.field:[step.fields.field]}:{total:0,rows:[]},
					fit:true,
					rownumbers:true,
					singleSelect:false,
					frozenColumns : [ [ {
						field : 'ck',
						checkbox : true,
					} ] ],
					ctrlSelect:true,
					checkOnSelect:false,
					toolbar: [{
						iconCls: 'icon-add',
						text : "新增",
						handler: function(){
							$('#StringCut_table').datagrid(
								'appendRow',//新增空行
								{
									in_stream_name:'',
									out_stream_name:'',
									cut_from:'',
									cut_to:''
								}
							);
						}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
							$('#StringCut_table').datagrid('deleteSelections');
						}
					}
					],
				    columns:[[
 				              {
									field : 'in_stream_name',
									title : '输入流字段',
									width : 100,
									editor : {
										type : 'combobox',
										options : {
											valueField : "value",
											textField : "text",
											data : caltacomval
										}
									}
								},
 								 {
									field : 'out_stream_name',
									title : '输出流字段',
									width : 100,
									editor : {
										type : 'text'
									}
								}, {
									field : 'cut_from',
									title : '起始位置',
									width : 100,
									editor : {
										type : 'text'
									}
								}, {
									field : 'cut_to',
									title : '结束位置',
									width : 100,
									editor : {
										type : 'text'
									}
								}
						    ]],
					onDblClickCell:function(index, field, value){
						var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===index || $('#StringCut_table').datagrid('endEdit',j);
						});
						$(this).datagrid('beginEdit', index);//编辑点击的行
						var ed = $(this).datagrid('getEditor', {index:index,field:field});
						$(ed.target).focus();
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
			//取消按钮
			$('#StringCut_cancel').unbind('click').click(function(e){
				$('#StringCut').window('close');
			});
			//确认按钮
			$('#StringCut_ok').unbind('click').click(function(e){

				var StringCut={};
		    	node.text=$('#step_name_StringCut').textbox('getValue');
		    	
		    	var rows=$('#StringCut_table').datagrid('getRows');
		    	$.each(rows,function(i,o){
		    		$('#StringCut_table').datagrid('endEdit',i);//取消所有行的编辑
		    	});
		    	var fields=Nasoft.GetProjectData.getFields('#StringCut_table');
				StringCut.fields=fields;
		    	node.setStep(StringCut);

				node.setTransfer();
				$('#StringCut').window('close');//关闭窗口
			});
			$('#StringCut_get').unbind('click').click(function(){//点击元数据表的获取字段
				var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArry){
					var transfer=Nasoft.Util.transferArray_copy(transferArry)
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					var data=[]
				    for (var i = 0; i < transfer.length; i++) {			
					var data_a={}
					data_a.in_stream_name=transfer[i].name;
					data.push(data_a)
				   }
					var opts_a=$('#StringCut_table').datagrid('options');
					    opts_a.data={rows:data};
					$('#StringCut_table').datagrid(opts_a);					
				}
		    });
			
			
			
		} catch (e) {
			// TODO: handle exception
			console.log(e)
		}
		
	};
	onBeforeClose=function(){
     try {
			//console.log(node.getStep());
		} catch (e) {
			// TODO: handle exception
			console.log(e)
		}
	}
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}
function judgeType(o){
    if(typeof o == 'object'){
        if( typeof o.length == 'number' ){
            return 'Array';  
        }else{
            return 'Object';     
        }
    }else{
        return 'param is no object type';
    } 
}; 