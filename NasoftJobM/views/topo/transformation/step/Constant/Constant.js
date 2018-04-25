Nasoft.Topo.transferFns.Constant=function(node){
	var fds = [];
	if(!!node.getStep().fields){
		var rows = node.getStep().fields.field;
		if(!!rows&&(node.getStep().fields.field.constructor) == Object){
			var field={};
			field.name=rows.name;
			field.type=rows.type;
			field.format=rows.format;
			field.length=rows.length;
			field.precision=rows.precision;
			fds.push(field);
			//return rows;
		}else if(!!rows&&(node.getStep().fields.field.constructor) == Array){
			$.each(rows,function(i,o){
				var field={};
				field.name=o.name;
				field.type=o.type;
				field.format=o.format;
				field.length=o.length;
				field.precision=o.precision;
				fds.push(field);
			});
		}else{
			return fds;
		}
	}
	return fds;
};
Nasoft.Window.fns.Constant=function(node){
	Nasoft.Ui_extend.browser_even('#Constant');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			//console.log("node="+node);
			$('#step_name_constant').textbox('setValue',node.text);
			
			var typeVal=[{"value":'None',"text":"None"},{"value":'String',"text":"String"},{"value":'Number',"text":"Number"},
			             {"value":'Internet Address',"text":"Internet Address",},
		                 {"value":"BigNumber","text":"BigNumber"},{"value":"Integer","text":"Integer"},{"value":'Boolean',"text":"Boolean"},
		                 {"value":"Timestamp","text":"Timestamp"},{"value":"Binary","text":"Binary"}]//定义下拉表单数据
			var isEmptyVal=[{"value":"Y","text":"是"},{"value":"N","text":"否"}]//是否为空串

			function typeformatter(value, rowData, rowIndex) {
				//console.log("value 是什么 : "+value)
				if (value == 0) {
					return;
				}
				for (var i = 0; i < typeVal.length; i++) {
					if (typeVal[i].value == value) {
						return typeVal[i].text;
					}else{
						return value;
					}
				}
			}

			var opts=$('#constant_table').datagrid('options');
			$.each(opts.columns[0],function(i,o){
				var edi=new Object();
				switch(i){
				case 1:
					edi.type='combobox';
					edi.options={ data: typeVal, valueField: "value", textField: "text",onChange:function(){
						
					}}
					o.editor=edi;
					//o.formatter=typeformatter;//定义下拉单的数据
					break;
				case 9:
					edi.type='combobox';
					edi.options={ data: isEmptyVal, valueField: "value", textField: "text" }
					o.editor=edi;
					o.formatter=function (value, rowData, rowIndex) {
						//console.log(value);
						if (value == 1) {
							return;
						}
						for (var i = 0; i < isEmptyVal.length; i++) {
							if (isEmptyVal[i].value == value) {
								return isEmptyVal[i].text;
							}
						}
					}
					break;
				default:
					edi.type='text';
					o.editor=edi.type;
				}
			});
	         if(!!node.getStep().fields&&node.getStep().fields.field.constructor == Array){//如果是数组进行替换
				$.each(node.getStep().fields.field,function(i,o){
		
					if(o.length =='-1'){
						o.length = '';
					}
					if(o.precision =='-1'){
						o.precision = '';
					}
				});
			}else if(!!node.getStep().fields){//如果是对象进行替换
				node.getStep().fields.field.length =='-1' ? node.getStep().fields.field.length = '' : node.getStep().fields.field.length
				node.getStep().fields.field.precision =='-1'? node.getStep().fields.field.precision ='' : node.getStep().fields.field.precision
			}
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
						$('#constant_table').datagrid(
							'appendRow',//新增空行
							{
								name:'',
								type:'',
								format:'',
								length:'',
								precision:'',
								currency:'',
								decimal:'',
								group:'',
								nullif:'',
								set_empty_string:''
							}
						);
					}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						$('#constant_table').datagrid('deleteSelections');
					}
				}
				],
				onDblClickCell:function(index, field, value){
					var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						j===index || $('#constant_table').datagrid('endEdit',j);
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

			$('#constant_table').datagrid($.extend(opts,options));//将自定义参数复制给原来的参数集,重新加载列表
			//取消按钮
			$('#constant_cancel').unbind('click').click(function(e){
				$('#Constant').window('close');
			});
			//确认按钮
			$('#constant_ok').unbind('click').click(function(e){
				var constant={};
				node.text=$('#step_name_constant').textbox('getValue');

				var rows=$('#constant_table').datagrid('getRows');
				$.each(rows,function(i,o){
					$('#constant_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var fields=Nasoft.GetProjectData.getFields('#constant_table');
			   
				if(!!fields&&fields.field.constructor==Array){//数组
					$.each(fields.field,function(i,o){
						if(o.length ==''||o.length==null){
							o.length = '-1'
						}
						if(o.precision == ''||o.precision==null){
							o.precision = '-1'
						}
						if(o.set_empty_string ==''||o.set_empty_string==null){
							o.set_empty_string ='N'
						}
					});
				}else if(!!fields){//对象
					if(fields.field.length ==''||fields.field.length==null){
						fields.field.length ='-1'
					}
					if(fields.field.precision==''||fields.field.precision==null){
						fields.field.precision='-1'
					}
					if(fields.field.set_empty_string ==''||fields.field.set_empty_string==null){
						fields.field.set_empty_string ='N'
					}
				}
				 constant.fields=fields;
				node.setStep(constant);
				
				node.setTransfer();//把定义的常量set出去
				$('#Constant').window('close');//关闭窗口
			});
		}catch(e){
			console.log(e)
		}
	},
    onBeforeClose=function(){}

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
