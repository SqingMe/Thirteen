Nasoft.Topo.transferFns.ReplaceString=function(node){
	var fds = [];
	if(!!node.getStep().fields){

		//console.log("type : "+type);
		var rows = node.getStep().fields.field;
		if(!!rows&&(node.getStep().fields.field.constructor) == Object){
			var field={};
			field.name = rows.out_stream_name;
			fds.push(field);
		}else if(!!rows&&(node.getStep().fields.field.constructor) == Array){
			$.each(rows,function(i,o){
				for(var key in o){
					if(key=="out_stream_name"){
						var field={};
						field.name=o[key];
						fds.push(field);
					}
				}
			});
		}else{
			return fds;
		}
		
	}
	return fds;
 };
Nasoft.Window.fns.ReplaceString=function(node){
	Nasoft.Ui_extend.browser_even('#ReplaceString');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose;
	onBeforeOpen=function(){
		try {
			
			//获取当前节点可用字段
			var transferArray=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(!!transferArray){
				var transfer=Nasoft.Util.transferArray_copy(transferArray);//复制当前节点可用的字段
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}

			//console.log("node="+node);
			$('#step_name_replaceString').textbox('setValue',node.text);
			
			var isNotVal=[{"value":"Y","text":"是"},{"value":"N","text":"否"}]//是否为空串
			var isNotValue=[{"value":"yes","text":"是"},{"value":"no","text":"否"}]//是否为空串
			function isNotValmatter(value, rowData, rowIndex) {
				if (value == 0) {
					return;
				}
				for (var i = 0; i < isNotVal.length; i++) {
					if (isNotVal[i].value == value) {
						return isNotVal[i].text;
					}
				}
			}
			function isNotValuematter(value, rowData, rowIndex) {
				if (value == 0) {
					return;
				}
				for (var i = 0; i < isNotValue.length; i++) {
					if (isNotValue[i].value == value) {
						return isNotValue[i].text;
					}
				}
			}
			function nameFormatter(value, rowData, rowIndex) {//格式化 '类型',的显示数据
				if (value == 0) {
					return;
				}
				for (var i = 0; i < transfer.length; i++) {
					if (transfer[i].name == value) {
						return transfer[i].name;
					}
				}
			}
			
			var options;
			var opts = $('#replaceString_table').datagrid('options');
			var rows=[];
			var obj=new Object();
			obj.in_stream_name=null;
			obj.out_stream_name=null;
			obj.use_regex=null;
			obj.replace_string=null;
			obj.replace_by_string=null;
			obj.set_empty_string=null;
			obj.replace_field_by_string=null;
			obj.whole_word=null;
			obj.case_sensitive=null;
			rows[0]=obj;
			
			$.each(opts.columns[0],function(i,o){
				var edi=new Object();
				switch(i){
				case 0:
					edi.type='combobox';
					edi.options={ data: transfer, valueField: "name", textField: "name",editable : true};
					o.editor=edi;
					//o.formatter=nameFormatter; //hyc
					break;
				case 2:
					edi.type='combobox';
					edi.options={ data: isNotValue, valueField: "value", textField: "text" };
					o.editor=edi;
					//o.formatter=isNotValuematter; //hyc
					break;
				case 5:
					edi.type='combobox';
					edi.options={ data: isNotVal, valueField: "value", textField: "text" };
					o.editor=edi;
					//o.formatter=isNotValmatter;//hyc
					break;
				case 6:
					edi.type='combobox';
					edi.options={ data: transfer, valueField: "name", textField: "name" };
					o.editor=edi;
					//o.formatter=nameFormatter;//hyc
					break;
				case 7:
					edi.type='combobox';
					edi.options={ data: isNotValue, valueField: "value", textField: "text" };
					o.editor=edi;
					//o.formatter=isNotValuematter;//hyc
					break;
				case 8:
					edi.type='combobox';
					edi.options={ data: isNotValue, valueField: "value", textField: "text" };
					o.editor=edi;
					//o.formatter=isNotValuematter; //hyc
					break;
				default:
					edi.type='text';
					o.editor=edi.type;
				}
			});
			
			options={//自定义datagrid的属性
				data:!!node.getStep().fields?{total:1, rows:$.isArray(node.getStep().fields.field)?
			    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},
	    		rownumbers:true,
				fitColumns:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				fit:true,
				toolbar: [{
					iconCls: 'icon-add',
					text : "新增",
					handler: function(){
						$('#replaceString_table').datagrid(
							'appendRow',//新增空行
							{
								in_stream_name:'',
								out_stream_name:'',
								use_regex:'',
								replace_string:'',
								replace_by_string:'',
								set_empty_string:'',
								replace_field_by_string:'',
								whole_word:'',
								case_sensitive:'',
								replaceNumbers:''
							}
						);
					}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
//						var del_row = $('#replaceString_table').datagrid('getSelected');
//						var del_rowIndex = $('#replaceString_table').datagrid('getRowIndex',del_row);
//						$('#replaceString_table').datagrid('deleteRow',del_rowIndex);
						$('#replaceString_table').datagrid('deleteSelections');
					}
				}
				],
				onDblClickCell:function(index, field, value){
					var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						j===index || $('#replaceString_table').datagrid('endEdit',j);
					});
					
					$(this).datagrid('beginEdit', index);//编辑点击的行
					var ed = $(this).datagrid('getEditor', {index:index,field:field});
					$(ed.target).focus();
				},
				onSelect : function(i,r){
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
			}
			$('#replaceString_table').datagrid(options);//将自定义参数复制给原来的参数集,重新加载列表
//			$('#replaceString_table').datagrid({		
//				data:!!node.getStep().fields?{total:1, rows:$.isArray(node.getStep().fields.field)?
//		    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},
//		    		rownumbers:true,
//					fitColumns:true,
//					singleSelect:true,
//					fit:true,
//					toolbar: [{
//						iconCls: 'icon-add',
//						text : "新增",
//						handler: function(){
//							$('#replaceString_table').datagrid(
//								'appendRow',//新增空行
//								{
//									in_stream_name:'',
//									out_stream_name:'',
//									use_regex:'',
//									replace_string:'',
//									replace_by_string:'',
//									set_empty_string:'',
//									replace_field_by_string:'',
//									whole_word:'',
//									case_sensitive:''
//								}
//							);
//						}
//					},{
//						text : "删除",
//						iconCls : 'icon-remove',
//						handler : function() {
//							var del_row = $('#replaceString_table').datagrid('getSelected');
//							var del_rowIndex = $('#replaceString_table').datagrid('getRowIndex',del_row);
//							$('#replaceString_table').datagrid('deleteRow',del_rowIndex);
//						}
//					}
//					],
////					in_stream_name:'',
////					out_stream_name:'',
////					use_regex:'',
////					replace_string:'',
////					replace_by_string:'',
////					set_empty_string:'',
////					replace_field_by_string:'',
////					whole_word:'',
////					case_sensitive:''
//				    columns:[[
//						        {field:'in_stream_name',title:'名称',width:100,editor:{
//						        	 type:'combobox',
//							            options:{
//							            	valueField :"name",
//											textField : "name",
//											data :nameFormatter(),
//							            }
//							        }}, 
//						    ]],
//					onDblClickCell:function(index, field, value){
//						var rows=$(this).datagrid('getRows');
//						$.each(rows,function(j,o){
//							j===index || $('#replaceString_table').datagrid('endEdit',j);
//						});
//						$(this).datagrid('beginEdit', index);//编辑点击的行
//						var ed = $(this).datagrid('getEditor', {index:index,field:field});
//						$(ed.target).focus();
//					}
//		    		});
			//取消按钮
			$('#replaceString_cancel').unbind('click').click(function(e){
				$('#ReplaceString').window('close');
			});
			//获取字段
			$('#replaceString_obtain').unbind('click').click(function(e){
				//处理数据key值
				var temp = [];
				$.each(transfer,function(i,o){
					var field={};
					field.in_stream_name = o.name;
					field.use_regex='no';
					field.set_empty_string='N';
					field.whole_word='no';
					field.case_sensitive='no';
					temp.push(field);
				});
				var opts=$('#replaceString_table').datagrid('options');
				opts.data={rows:temp};
				$('#replaceString_table').datagrid(opts);
			});
			//确认按钮
			$('#replaceString_ok').unbind('click').click(function(e){
				var rows=$('#replaceString_table').datagrid('getRows');
				$.each(rows,function(i,o){
					$('#replaceString_table').datagrid('endEdit',i);//取消所有行的编辑
				});

				var replaceString={};
		    	node.text=$('#step_name_replaceString').textbox('getValue');
		    	fields=Nasoft.GetProjectData.getFields('#replaceString_table');
				if(!!fields&&fields.field.constructor==Array){//数组
					$.each(fields.field,function(i,o){
						if(o.use_regex ==''){
							o.use_regex = 'no'
						}
						if(o.whole_word == ''){
							o.whole_word = 'no'
						}
						if(o.case_sensitive == ''){
							o.case_sensitive = 'no'
						}
						if(o.set_empty_string ==''){
							o.set_empty_string ='N'
						}
						if(o.replaceNumbers ==''){
							o.replaceNumbers ='0'
						}
					});
				}else if(!!fields){//对象
					if(fields.field.use_regex ==''){
						fields.field.use_regex ='no'
					}
					if(fields.field.whole_word==''){
						fields.field.whole_word='no'
					}
					if(fields.field.case_sensitive==''){
						fields.field.case_sensitive='no'
					}
					if(fields.field.set_empty_string ==''){
						fields.field.set_empty_string ='N'
					}
					if(fields.field.replaceNumbers ==''){
						fields.field.replaceNumbers ='0'
					}
				}
				replaceString.fields=fields;
		    	node.setStep(replaceString);

				node.setTransfer();
				$('#ReplaceString').window('close');//关闭窗口
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