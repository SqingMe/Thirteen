Nasoft.Topo.transferFns.StringOperations=function(node){
	 var fds = [];
	 var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
	    var  transfer=Nasoft.Util.transferArray_copy(transferArry)
	if(!!node.getStep().fields){
//		var type = judgeType(node.getStep().fields.field);
		var rows = node.getStep().fields.field;
		if(!!rows&&(node.getStep().fields.field.constructor) == Object){
			var field={};
			if(!!rows.out_stream_name&&rows.padding_type!='none'){				
				field.name=rows.out_stream_name;
				field.length=rows.pad_len;
				transfer.push(field);
				fds=transfer;
			}else if(!!rows.pad_len&&!!transfer&&rows.padding_type!='none'){//如果长度改变,覆盖transfer中字段的长度
				for(var i=0;i<transfer.length;i++){
					if(transfer[i].name==rows.in_stream_name){
					   transfer[i].length=rows.pad_len;
					}
				}
				fds=transfer;
			}
		}else if(!!rows&&(node.getStep().fields.field.constructor) == Array){
			$.each(rows,function(i,o){
				var field={};
				if(!!o.out_stream_name&&o.padding_type!='none'){
					field.name=o.out_stream_name;
					field.length=o.pad_len;
					transfer.push(field);
					fds=transfer;
				}else if(!!o.pad_len&&!!transfer&&o.padding_type!='none'){
					for(var i=0;i<transfer.length;i++){
						if(transfer[i].name==o.in_stream_name){
						   transfer[i].length=o.pad_len;
						}
					}
					
					fds=transfer;
				}
			});
		}
	}
	    if(fds.length>0){
			node.blocked=true;
			return fds;
		}else{
			node.blocked=false;
			return fds;
		}
};
Nasoft.Window.fns.StringOperations=function(node){
	Nasoft.Ui_extend.browser_even('#StringOperations');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen=function(){
		try {
			//获取当前节点可用字段
			var transferArray=Nasoft.Topo.transferFns.getTransfer(node);
			if(!!transferArray){
			var transfer=Nasoft.Util.transferArray_copy(transferArray);
			transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			$('#step_name_stringOperations').textbox('setValue',node.text)

			function nameFormatter(value, rowData, rowIndex) {//格式化 '类型',的显示数据
				if (value == 0) {
					return;
				}
				for (var i = 0; i < transfer.length; i++) {
					if (transfer[i].name == value) {
						return transfer[i].name;
					}else{
						return value; //hyc 添加修改手动编辑后无法显示value值
					}
				}
			}
			
			var options;
			var opts=$('#stringOperations_table').datagrid('options');
			var rows=[];
			for (var i = 0; i < 10; i++) {
				var obj=new Object();
				obj.in_stream_name=null;
				obj.out_stream_name=null;
				obj.trim_type=null;
				obj.lower_upper=null;
				obj.padding_type=null;
				obj.pad_char=null;
				obj.pad_len=null;
				obj.init_cap=null;
				obj.mask_xml=null;       
				obj.digits=null;
				obj.remove_special_characters=null;
				rows[i]=obj;
			};
			console.log(opts.columns);
			$.each(opts.columns[0],function(i,o){
				var edi=new Object();
				switch(i){
				case 0:
					edi.type='combobox';
					edi.options={ data: transfer, valueField: "name", textField: "name",editable:true};
					o.editor=edi;
					//o.formatter=nameFormatter;
					break;
				case 2:
					edi.type='combobox';
					edi.options={
							valueField: 'value',
		            		textField: 'label',
		            		editable:false,
		            		data: [{
	                			label: 'none',
	                			value: 'none'
	                		},{
	                			label: 'left',
	                			value: 'left'
	                		},{
	                			label: 'right',
	                			value: 'right'
	                		},{
	                			label: 'both',
	                			value: 'both'
	                		}]
					};
					o.editor=edi;
					o.formatter=function(value, rowData, rowIndex) {
						if (value == 'none') {
							return 'none'
						}else if(value == 'left'){
							return 'left'
						}else if(value == 'right'){
							return 'right'
						}else if(value == 'both'){
							return  'both'
						}
					};
					break;
				case 3:
					edi.type='combobox';
					edi.options={
							valueField: 'value',
		            		textField: 'label',
		            		editable:false,
		            		data: [{
	                			label: 'none',
	                			value: 'none'
	                		},{
	                			label: 'lower',
	                			value: 'lower'
	                		},{
	                			label: 'upper',
	                			value: 'upper'
	                		}]
					};
					o.editor=edi;
					o.formatter=function(value, rowData, rowIndex) {
						if (value == 'none') {
							return 'none'
						}else if(value == 'lower'){
							return 'lower'
						}else if(value == 'upper'){
							return 'upper'
						}
					};
					break;
				case 4:
					edi.type='combobox';
					edi.options={
							valueField: 'value',
		            		textField: 'label',
		            		editable:false,
		            		data: [{
	                			label: 'none',
	                			value: 'none'
	                		},{
	                			label: 'left',
	                			value: 'left'
	                		},{
	                			label: 'right',
	                			value: 'right'
	                		}]
					};
					o.editor=edi;
					o.formatter=function(value, rowData, rowIndex) {
						if (value == 'none') {
							return 'none'
						}else if(value == 'left'){
							return 'left'
						}else if(value == 'right'){
							return 'right'
						}
					};
					break;
				case 7:
					edi.type='combobox';
					edi.options={
							valueField: 'value',
		            		textField: 'label',
		            		editable:false,
		            		data: [{
	                			label: '否',
	                			value: 'no'
	                		},{
	                			label: '是',
	                			value: 'yes'
	                		}]
					};
					o.editor=edi;
					o.formatter=function(value, rowData, rowIndex) {
					    if(value == 'no'){
							return '否'
						}else if(value == 'yes'){
							return '是'
						}
					};
					break;
				case 8:
					edi.type='combobox';
					edi.options={
							valueField: 'value',
		            		textField: 'label',
		            		editable:false,
		            		data: [{
	                			label: 'None',
	                			value: 'none'
	                		},{
	                			label: 'Escape XML',
	                			value: 'escapexml'
	                		},{
	                			label: 'Use CDATA',
	                			value: 'cdata'
	                		},{
	                			label: 'Unescape XML',
	                			value: 'unescapexml'
	                		},{
	                			label: 'Escape SQL',
	                			value: 'escapesql'
	                		},{
	                			label: 'Escape HTML',
	                			value: 'escapehtml'
	                		},{
	                			label: 'Unescape HTML',
	                			value: 'unescapehtml'
	                		}]
					};
					o.editor=edi;
					o.formatter=function(value, rowData, rowIndex) {
						if (value == 'none') {
							return 'None'
						}else if(value == 'escapexml'){
							return 'Escape XML'
						}else if(value == 'cdata'){
							return 'Use CDATA'
						}else if(value == 'unescapexml'){
							return 'Unescape XML'
						}else if(value == 'escapesql'){
							return 'Escape SQL'
						}else if(value == 'escapehtml'){
							return 'Escape HTML'
						}else if(value == 'unescapehtml'){
							return 'Unescape HTML'
						}
					};
					break;
				case 9:
					edi.type='combobox';
					edi.options={
							valueField: 'value',
		            		textField: 'label',
		            		editable:false,
		            		data: [{
	                			label: 'none',
	                			value: 'none'
	                		},{
	                			label: 'only',
	                			value: 'digits_only'
	                		},{
	                			label: 'remove',
	                			value: 'remove_digits'
	                		}]
					};
					o.editor=edi;
					o.formatter=function(value, rowData, rowIndex) {
						if (value == 'none') {
							return 'none'
						}else if(value == 'digits_only'){
							return 'only'
						}else if(value == 'remove_digits'){
							return 'remove'
						}
					};
					break;
				case 10:
					edi.type='combobox';
					edi.options={
							valueField: 'value',
		            		textField: 'label',
		            		editable:false,
		            		data: [{
	                			label: 'none',
	                			value: 'none'
	                		},{
	                			label: 'carriage return(CR)',
	                			value: 'cr'
	                		},{
	                			label: 'line feed(LF)',
	                			value: 'lf'
	                		},{
	                			label: 'carriage return & line feed',
	                			value: 'crlf'
	                		},{
	                			label: 'horizontal tab',
	                			value: 'tab'
	                		},{
	                			label: 'space',
	                			value: 'espace'
	                		}]
					};
					o.editor=edi;
					o.formatter=function(value, rowData, rowIndex) {
						if (value == 'none') {
							return 'none'
						}else if(value == 'cr'){
							return 'carriage return(CR)'
						}else if(value == 'lf'){
							return 'line feed(LF)'
						}else if(value == 'crlf'){
							return 'carriage return & line feed'
						}else if(value == 'tab'){
							return 'horizontal tab'
						}else if(value == 'espace'){
							return 'space'
						}
					};
					break;
				default:
					edi.type='text';
					o.editor=edi.type;
				}
			});
			options={//自定义datagrid的属性
					rownumbers:true,
					fitColumns:true,
					singleSelect:false,
					frozenColumns : [ [ {
						field : 'ck',
						checkbox : true,
					} ] ],
					fit:true,
					data:!!node.getStep().fields?$.isArray(node.getStep().fields.field)?
							{rows:node.getStep().fields.field}:{rows:[node.getStep().fields.field]}:{total:0,rows:[]},//列表的数据
					toolbar: [{
						iconCls: 'icon-add',
						text : "增加一行",
						handler: function(){
							$('#stringOperations_table').datagrid(//新增加一行
									'appendRow',
									{
										in_stream_name:'', 
										out_stream_name:'',
										trim_type:'',
										lower_upper:'',
										padding_type:'',
										pad_char:'',
										pad_len:'',
										init_cap:'',
										mask_xml:'',
										digits:'',
										remove_special_characters:''
									});}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
							var del_row = $('#stringOperations_table').datagrid('getSelections');
							var len = del_row.length;
							for (var int = 0; int < len; int++) {
								$('#stringOperations_table').datagrid('deleteRow',
										$('#stringOperations_table').datagrid('getRowIndex',del_row[int]));
							}
						}
					}
					],
					onDblClickCell:function(i,f,v){//双击行
						var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===i || $('#stringOperations_table').datagrid('endEdit',j);
						});
						$(this).datagrid('beginEdit', i);//编辑点击的行
						var ed = $(this).datagrid('getEditor', {index:i,field:f});
						console.log(ed);
						
						//ed.actions.setValue(ed.actions.getValue());
						$(ed.target).focus();		
					},
					rownumbers:true,
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
					
			}
			console.log("opts :"+opts)
			console.log("options :"+options)
			$('#stringOperations_table').datagrid($.extend(opts,options));//将自定义参数复制给原来的参数集,重新加载列表

			$('#stringOperations_cancel').unbind('click').click(function(e){
				$('#StringOperations').window('close');	
			});
			//获取字段
			$('#stringOperations_getFields').unbind('click').click(function(e){
				//处理数据key值
				var temp = [];
				$.each(transfer,function(i,o){
					var field={};
					field.in_stream_name = o.name;
					if(!!o.trim_type){
						field.trim_type=o.trim_type;	
					}else{
						field.trim_type='none'
					}
					if(!!o.lower_upper){
						field.lower_upper=o.lower_upper;	
					}else{
						field.lower_upper='none'
					}
					if(!!o.padding_type){
						field.padding_type=o.padding_type;	
					}else{
						field.padding_type='none'
					}
					if(!!o.init_cap){
						field.init_cap=o.init_cap;	
					}else{
						field.init_cap='no'
					}
					if(!!o.mask_xml){
						field.mask_xml=o.mask_xml;	
					}else{
						field.mask_xml='none'
					}
					if(!!o.digits){
						field.digits=o.digits;	
					}else{
						field.digits='none'
					}
					if(!!o.remove_special_characters){
						field.remove_special_characters=o.remove_special_characters;	
					}else{
						field.remove_special_characters='none'
					}
					field.out_stream_name='';
					field.pad_char='';
					field.pad_len='';
					temp.push(field);
				});
				var opts=$('#stringOperations_table').datagrid('options');
				opts.data={rows:temp};
				$('#stringOperations_table').datagrid(opts);
			});

			$('#stringOperations_ok').unbind('click').click(function(e){
				 var  stringOperations={};//定义一个表输出对象
		    	 node.text=$('#step_name_stringOperations').textbox('getValue')
		    	 var rows=$('#stringOperations_table').datagrid('getRows');//获取当前页面中所有的行
					$.each(rows,function(i,o){
						
						$('#stringOperations_table').datagrid('endEdit', i);//结束编辑所有行
					});
		    	 var fields=Nasoft.GetProjectData.getFields('#stringOperations_table');//将对应数据字段加入表输出
		    	 stringOperations.fields=fields;//将获取的字段放入组件配置中;
		    	 node.setStep(stringOperations);

		    	 node.setTransfer();
				$('#StringOperations').window('close');	
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