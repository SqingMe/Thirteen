Nasoft.Topo.transferFns.FieldSplitter=function(node){
	var fds = [];
	var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
	var  transfer=Nasoft.Util.transferArray_copy(transferArry)
	if(!!node.getStep().fields&&!!node.getStep().splitfield){
		var split_field=node.getStep().splitfield;
		for(var i=0;i<transfer.length;i++){
			if(transfer[i].name==split_field){
			   transfer.splice(i, 1);
			}
		}
		var rows = node.getStep().fields.field;
		if(!!rows&&(node.getStep().fields.field.constructor) == Object){
			var field={};
			field.name=rows.name;
			field.type=rows.type;
			field.format=rows.format;
			field.length=rows.length;
			field.precision=rows.precision;
			transfer.push(field);
			fds=transfer;
			//return rows;
		}else if(!!rows&&(node.getStep().fields.field.constructor) == Array){
			$.each(rows,function(i,o){
				var field={};
				field.name=o.name;
				field.type=o.type;
				field.format=o.format;
				field.length=o.length;
				field.precision=o.precision;
				transfer.push(field);
			});
			fds=transfer;
		}
	}
	      if(fds.length>0){
			node.blocked=true;//增加锁,前面组件中的值后面组件获取不到
			return fds;
		   }else{
			node.blocked=false;
			return fds;
		 }
};
Nasoft.Window.fns.FieldSplitter=function(node){
				Nasoft.Ui_extend.browser_even('#FieldSplitter');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose
		    	onBeforeOpen=function(){
		    		try {
		    			var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
		    			var  transfer=Nasoft.Util.transferArray_copy(transferArry)
		    			     transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
		    			$('#step_name_fieldSplitter').textbox('setValue',node.text);
		    			
		    			var splitfield,delimiter,enclosure;
		    			if (!$.isEmptyObject(node.getStep())) {
		    				console.log("进来没 : "+node.getStep().splitfield)
		    				splitfield=!!node.getStep().splitfield?node.getStep().splitfield:'';
		    				delimiter=!!node.getStep().delimiter?node.getStep().delimiter:',';
		    				enclosure=!!node.getStep().enclosure?node.getStep().enclosure:'';
						}

		    			function nameFormatter(transfer) {
							var data=[]
							for (var i = 0; i < transfer.length; i++) {
								console.log(transfer[i].name);	
								var data_a={"label":transfer[i].name,"value":transfer[i].name}
								data.push(data_a)
							}
							return data;
						}
		    				
			    			$('#splitfield').combobox({
			    				data:nameFormatter(transfer),
			    				valueField :"label",
								textField : "value"
			    			});
			    		$('#splitfield').combobox('setValue',splitfield);
						$('#delimiter').textbox('setValue',delimiter);
						$('#enclosure').textbox('setValue',enclosure);
		    			var trimtypeVal=[{"value":'none',"text":"不去空格"},{"value":'left',"text":"去掉左空格"},{"value":'right',"text":"去掉右空格",},
		    			                 {"value":'both',"text":"去掉左右两端空格"}]//定义下拉表单数据
		    			var typeVal=[{"value":'None',"text":"None"},{"value":'String',"text":"String"},{"value":'Number',"text":"Number"},
		    			             {"value":'Internet Address',"text":"Internet Address",},
	    			                 {"value":"BigNumber","text":"BigNumber"},{"value":"Integer","text":"Integer"},{"value":'Boolean',"text":"Boolean"},
	    			                 {"value":"Timestamp","text":"Timestamp"},{"value":"Binary","text":"Binary"}]//定义下拉表单数据
		    			var idremVal=[{"value":"Y","text":"Y"},{"value":"N","text":"N"}]//是否移除Id的数据
		    		/*	*/
		    			function trimtypeformatter(value, rowData, rowIndex) {
		    				console.log(value)
                            if (value == 1) {
                                      return;
                           }
                             for (var i = 0; i < trimtypeVal.length; i++) {
                                  if (trimtypeVal[i].value == value) {
                                      return trimtypeVal[i].text;
                                  }else{
                                	  return value;
                                  }
                            }
                          }
		    			function typeformatter(value, rowData, rowIndex) {
		    				console.log(value)
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
		    			console.log(node);
		    			var options;
		    			var opts=$('#fieldSplitter_table').datagrid('options');
		    			var rows=[];    			
		    			var obj=new Object();
		    				obj.name=null;
		    				obj.id=null;
		    				obj.idrem=null;
		    				obj.type=null;
		    				obj.format=null;
		    				obj.group=null;
		    				obj.decimal=null;
		    				obj.currency=null;
		    				obj.length=null;       
		    				obj.precision=null;
		    				obj.nullif=null;
		    				obj.trimtype=null;
		    				rows[0]=obj;
		        		
		    			$.each(opts.columns[0],function(i,o){
		    				var edi=new Object();
		    				switch(i){
		    				case 2:
		    					edi.type='combobox';
		    					edi.options={ data: idremVal, valueField: "value", textField: "text" }
			    				o.editor=edi;
		    				    o.formatter=function (value, rowData, rowIndex) {
		    				    	console.log(value);
		                            if (value == 1) {
	                                      return;
	                           }
	                             for (var i = 0; i < idremVal.length; i++) {
	                                  if (idremVal[i].value == value) {
	                                      return idremVal[i].text;
	                                  }else{
	                                	  return value;
	                                  }
	                            }
	                          };//定义下拉单的数据	    				  
		    				break;
		    				case 3:
		    					edi.type='combobox';
		    					edi.options={ data: typeVal, valueField: "value", textField: "text",onChange:function(){
		    						
		    					} }
			    				o.editor=edi;
		    				    o.formatter=typeformatter;//定义下拉单的数据	    				  
		    				break;
		    				case 12:
		    					edi.type='combobox';
		    					edi.options={ data: trimtypeVal, valueField: "value", textField: "text" }
			    				o.editor=edi;
		    				    o.formatter=trimtypeformatter;//定义下拉单的数据
		    				  
		    				break;
		    				default:
		    					edi.type='text';
		    				    o.editor=edi.type;
		    				}
		    				
		    			});
		    			//$.unique(a1.concat(a2)
		    			
		    			
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
		    					onClickCell:function(i,f,v){//双击行
		    						
		    						var rows=$(this).datagrid('getRows');
		    						$.each(rows,function(j,o){
		    							j===i || $('#fieldSplitter_table').datagrid('endEdit',j);
		    						});
		    						$(this).datagrid('beginEdit', i);//编辑点击的行
		    						var ed = $(this).datagrid('getEditor', {index:i,field:f});
		    						console.log(ed);
		    					
		    						//ed.actions.setValue(ed.actions.getValue());
		    						$(ed.target).focus();		
		    					},
		    					toolbar: [{
		    						iconCls: 'icon-add',
		    						text : "增加一行",
		    						handler: function(){
		    							$('#fieldSplitter_table').datagrid(//新增加一行
		    									'appendRow',
		    									{	    										
		    					    				name:'', 
		    					    				id:'',
		    					    				idrem:'',
		    					    				type:'',
		    					    				format:'',
		    					    				group:'',
		    					    				decimal:'',
		    					    				currency:'',
		    					    				length:'',
		    					    				precision:'',
		    					    				nullif:'',
		    					    				trimtype:''
		    									});
		    							}
		    					},{
		    						text : "删除",
		    						iconCls : 'icon-remove',
		    						handler : function() {
		    							var del_row = $('#fieldSplitter_table').datagrid('getSelections');
		    							var len = del_row.length;
		    							for (var int = 0; int < len; int++) {
		    								$('#fieldSplitter_table').datagrid('deleteRow',
		    										$('#fieldSplitter_table').datagrid('getRowIndex',del_row[int]));
										}
		    						}
		    					}],
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
						$('#fieldSplitter_table').datagrid($.extend(opts,options));//将自定义参数复制给原来的参数集,重新加载列表
		    			$('#fieldSplitter_cancel').unbind('click').click(function(e){
		    				$('#FieldSplitter').window('close');	
		    			});
						$('#fieldSplitter_ok').unbind('click').click(function(e){
							var rows=$('#fieldSplitter_table').datagrid('getRows');
							$.each(rows,function(i,o){
								$('#fieldSplitter_table').datagrid('endEdit',i);//取消所有行的编辑
							});
							
							var fieldSplitter={};
							 node.text=$('#step_name_fieldSplitter').textbox('getValue')
							 var fields=Nasoft.GetProjectData.getFields('#fieldSplitter_table');//将对应数据字段加入表输出		
								if(!!fields&&fields.field.constructor==Array){//数组
									$.each(fields.field,function(i,o){
										if(o.idrem ==''){
											o.idrem = 'N'
										}
										if(o.type==''){
											o.type ='None'
										}
										if(o.length ==''){
											o.length = '-1'
										}
										if(o.precision == ''){
											o.precision = '-1'
										}
										if(o.trimtype ==''){
											o.trimtype ='none'
										}
									});
								}else if(!!fields){//对象
									if(fields.field.idrem==''){
										fields.field.idrem='N'
									}
									if(fields.field.type==''){
										fields.field.type='None'
									}
									if(fields.field.length ==''){
										fields.field.length ='-1'
									}
									if(fields.field.precision==''){
										fields.field.precision='-1'
									}
									if(fields.field.trimtype ==''){
										fields.field.trimtype ='none'
									}
								}
								
								
							 fieldSplitter.fields=fields;
							 fieldSplitter.splitfield=$('#splitfield').combobox('getValue');
							 fieldSplitter.delimiter=$('#delimiter').textbox('getValue');
							 fieldSplitter.enclosure=$('#enclosure').textbox('getValue');
							 node.setStep(fieldSplitter);
							
							node.setTransfer();
							$('#FieldSplitter').window('close');
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