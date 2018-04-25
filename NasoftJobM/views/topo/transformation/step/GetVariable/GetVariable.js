Nasoft.Topo.transferFns.GetVariable=function(node){
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
			field.trim_type=rows.trim_type;
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
				field.trim_type=o.trim_type;
				fds.push(field);
			});
		}else{
			return fds;
		}
	}
	return fds;
};
Nasoft.Window.fns.GetVariable=function(node){
	Nasoft.Ui_extend.browser_even('#GetVariable');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			//console.log("node="+node);
			$('#step_name_GetVariable').textbox('setValue',node.text);
			$('#GetVariable_table').datagrid({//字段的界面  
				fit:true,
				rownumbers:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				ctrlSelect:true,
				checkOnSelect:false,
			    data:!!node.getStep().fields&&node.getStep().fields.field?{total:1, rows:$.isArray(node.getStep().fields.field)?
			    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					fitColumns:true,
					handler: function(){//添加一行
						$('#GetVariable_table').datagrid(//新增加一行
								'appendRow',
								{
									name:'', 
									variable:'',
									type:'',
									format:'',
									currency:'',
									decimal:'',
									group : '',
									length : '',
									precision : '',
									trim_type : ''
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
//						var del_row = $('#GetVariable_table').datagrid('getSelected');
//						var del_rowIndex = $('#GetVariable_table').datagrid('getRowIndex',del_row);
//						$('#GetVariable_table').datagrid('deleteRow',del_rowIndex);
						$('#GetVariable_table').datagrid('deleteSelections');
					}
				}],
				
			    columns:[[    
			        {field:'name',title:'名称',width:100,editor:{type:'text'}},  
			        {field:'variable',title:'变量',width:100,editor:{type:'text'}},  
			        {field:'type',title:'类型',width:100,editor:{
			        	 type:'combobox',
			        	 options:{
			            		valueField: 'label',
			            		textField: 'value',
			            		editable : false,
		                    	data: [{
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
		                		}],
		                		onSelect : function(newValue){
		                			change(newValue.value);			
		                		}
			        	 }
			        }},    
			        {field:'format',title:'格式',width:100,editor:{
			            type:'combobox',
			            options:{
			            	valueField: 'text',    
			                textField: 'text',
		                	formatter: function(row){
		                		var opts = $(this).combobox('options');
		                		return row[opts.textField];
		                	}

			            }
			        }}, 
			        {field:'currency',title:'货币类型',width:100,editor:{type:'text'}},  
			        {field:'decimal',title:'小数',width:100,editor:{type:'text'}},  
			        {field:'group',title:'分组',width:100,editor:{type:'text'}},  
			        {field:'length',title:'长度',width:100,editor:{type:'text'},
			        	formatter: function(value,row,index){
			        		if(value=='-1'){
			        			value='';
			        		}
	                		return value;
	                	}
			        },  
			        {field:'precision',title:'精度',width:100,editor:{type:'text'},
			        	formatter: function(value,row,index){
			        		if(value=='-1'){
			        			value='';
			        		}
	                		return value;
	                	}	
			        }, 
			        {field:'trim_type',title:'Trim type',width:100,editor:{type:'combobox',
			        	options:{
		            		valueField: 'value',
		            		textField: 'label',
		            		editable : false,
		            		data: [{
	                			label: '不去掉空格',
	                			value: 'none'
	                		},{
	                			label: '去掉左空格',
	                			value: 'left'
	                		},{
	                			label: '去掉右空格',
	                			value: 'right'
	                		},{
	                			label: '去掉左右两端空格',
	                			value: 'both'
	                		}],
			        	}   	
			        },
			        formatter: function(value,row,index){
		        		if(value=='none'){
		        			value='不去掉空格';
		        		}else if(value=='left'){
		        			value='去掉左空格';
		        		}else if(value=='right'){
		        			value='去掉右空格';
		        		}else if(value=='both'){
		        			value='去掉左右两端空格';
		        		}
                		return value;
                	}	
			        }
			        
			    ]],
	    		onClickRow:function(i,r){
			    	var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						j===i || $('#GetVariable_table').datagrid('endEdit',j);
					});

		        	$(this).datagrid('beginEdit',i);//编辑点击的行
		        	$(this).datagrid('unselectRow',i);//取消选择一行

		        	var newOld = change2(r.type,i);
		        	  if(newOld==''){
		        		  var ed=$(this).datagrid('getEditor',{index:i,field:'format'});
		        		  $(ed.target).combobox('setValue',r.format);
		        	  }else{
		        		  var ed=$(this).datagrid('getEditor',{index:i,field:'format'});
		        		  $(ed.target).combobox('setValue',newOld);
		        	  }
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
			});
			//取消按钮
			$('#GetVariable_cancel').unbind('click').click(function(e){
				$('#GetVariable').window('close');
			});
			//确认按钮
			$('#GetVariable_ok').unbind('click').click(function(e){
				var GetVariable={};
				node.text=$('#step_name_GetVariable').textbox('getValue');

				var rows=$('#GetVariable_table').datagrid('getRows');
				$.each(rows,function(i,o){
					$('#GetVariable_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var fields=Nasoft.GetProjectData.getFields('#GetVariable_table');
			   
				if(!!fields&&fields.field.constructor==Array){//数组
					$.each(fields.field,function(i,o){
						if(o.type ==''||o.type==null){
							o.type = 'None'
						}
						if(o.length ==''||o.length==null){
							o.length = '-1'
						}
						if(o.precision == ''||o.precision==null){
							o.precision = '-1'
						}
						if(o.trim_type ==''||o.trim_type==null){
							o.trim_type ='none'
						}
					});
				}else if(!!fields){//对象
					if(fields.field.type ==''||fields.field.type==null){
						fields.field.type ='None'
					}
					if(fields.field.length ==''||fields.field.length==null){
						fields.field.length ='-1'
					}
					if(fields.field.precision==''||fields.field.precision==null){
						fields.field.precision='-1'
					}
					if(fields.field.trim_type ==''||fields.field.trim_type==null){
						fields.field.trim_type ='none'
					}
				}
				GetVariable.fields=fields;
				node.setStep(GetVariable);
				
				node.setTransfer();//把定义的常量set出去
				$('#GetVariable').window('close');//关闭窗口
			});
		}catch(e){
			console.log(e)
		}
	},
    onBeforeClose=function(){}
	/**
	 * type方法
	 */
	function change(newValue){
		var date=[{"id":1,"text":"yyyy/MM/dd HH:mm:ss.SSS"},{"id":2,"text":"yyyy/MM/dd HH:mm:ss.SSS XXX"},{"id":3,"text":"yyyy/MM/dd HH:mm:ss"},
		          {"id":4,"text":"yyyy/MM/dd HH:mm:ss XXX"},{"id":5,"text":"yyyyMMddHHmmss"},{"id":6,"text":"yyyy/MM/dd"},{"id":7,"text":"yyyy-MM-dd"}
		          ,{"id":8,"text":"yyyy-MM-dd HH:mm:ss"},{"id":9,"text":"yyyy-MM-dd HH:mm:ss XXX"},{"id":10,"text":"yyyyMMdd"},{"id":11,"text":"MM/dd/yyyy"}
		          ,{"id":12,"text":"MM/dd/yyyy HH:mm:ss"},{"id":13,"text":"MM-dd-yyyy"},{"id":14,"text":"MM-dd-yyyy HH:mm:ss"},{"id":15,"text":"MM/dd/yy"}
		          ,{"id":15,"text":"MM-dd-yy"},{"id":16,"text":"dd/MM/yyyy"},{"id":17,"text":"dd-MM-yyyy"},{"id":18,"text":"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}
		          ];//定义下拉表单数据
		var number = [{"id":1,"text":"#,##0.###"},{"id":2,"text":"0.00"},{"id":3,"text":"0000000000000"},{"id":4,"text":"#.#"},{"id":5,"text":"#"},{"id":6,"text":"###,###,###.#"},{"id":7,"text":"#######.###"},{"id":8,"text":"#####.###%"}];//
		var empty = [{}];
		
		rowIndex = $('#GetVariable_table').datagrid('getRowIndex', $("#GetVariable_table").datagrid('getSelected'));
		//得到编辑行的id
		if(newValue=='Date'){
			//方案1
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({ data:date ,valueField: "text", textField: "text"});	
		}else if(newValue=='Number'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='BigNumber'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='Integer'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue =='String'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='InternetAddress'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Boolean'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Timestamp'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Binary'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else{
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}
	}
	/**
	 * type方法2
	 */
	function change2(newValue,rowIndex){
		var date=[{"id":1,"text":"yyyy/MM/dd HH:mm:ss.SSS"},{"id":2,"text":"yyyy/MM/dd HH:mm:ss.SSS XXX"},{"id":3,"text":"yyyy/MM/dd HH:mm:ss"},
		          {"id":4,"text":"yyyy/MM/dd HH:mm:ss XXX"},{"id":5,"text":"yyyyMMddHHmmss"},{"id":6,"text":"yyyy/MM/dd"},{"id":7,"text":"yyyy-MM-dd"}
		          ,{"id":8,"text":"yyyy-MM-dd HH:mm:ss"},{"id":9,"text":"yyyy-MM-dd HH:mm:ss XXX"},{"id":10,"text":"yyyyMMdd"},{"id":11,"text":"MM/dd/yyyy"}
		          ,{"id":12,"text":"MM/dd/yyyy HH:mm:ss"},{"id":13,"text":"MM-dd-yyyy"},{"id":14,"text":"MM-dd-yyyy HH:mm:ss"},{"id":15,"text":"MM/dd/yy"}
		          ,{"id":15,"text":"MM-dd-yy"},{"id":16,"text":"dd/MM/yyyy"},{"id":17,"text":"dd-MM-yyyy"},{"id":18,"text":"yyyy-MM-dd'T'HH:mm:ss.SSSXXX"}
		          ];//定义下拉表单数据
		var number = [{"id":1,"text":"#,##0.###"},{"id":2,"text":"0.00"},{"id":3,"text":"0000000000000"},{"id":4,"text":"#.#"},{"id":5,"text":"#"},{"id":6,"text":"###,###,###.#"},{"id":7,"text":"#######.###"},{"id":8,"text":"#####.###%"}];//
		var empty = [{}];
		if(newValue =='Date'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:date ,valueField: "text", textField: "text"});
		}else if(newValue=='Number'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='BigNumber'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='Integer'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue =='String'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='InternetAddress'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Boolean'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Timestamp'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Binary'){
			var ed=$('#GetVariable_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else{
			return '';
		}
		return $(ed.target).combobox('getValue');
	}
    return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}