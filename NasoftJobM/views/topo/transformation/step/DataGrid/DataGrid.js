Nasoft.Topo.transferFns.DataGrid=function(node){
	 var file=node.getStep().fields;//将对应数据字段加入表输出
	 var DataGrid = [];
	 if(!!file.field){		 
		 if(file.field.constructor==Array){//数组		
			 $.each(file.field,function(i,o){
				 var field={};
				 field.name= o.name;
				 field.type=o.type;
				 field.format=o.format;
				 field.length=o.length;
				 DataGrid.push(field)
			 });		
		 }else{//对象
			 var oldFile ={} 
			 oldFile.name=file.field.name;
			 oldFile.type=file.field.type;
			 oldFile.format=file.field.format;
			 oldFile.length=file.field.length;
			 DataGrid.push(oldFile)
		 }
	 }
        return DataGrid;
};
Nasoft.Window.fns.DataGrid=function(node){
	Nasoft.Ui_extend.browser_even('#DataGrid');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose, 
	onBeforeOpen=function (){
		try{
			//console.log("node="+node);
			$('#step_name_DataGrid').textbox('setValue',node.text);

			$('#DataGrid_metadata_table').datagrid({//字段的界面  
				fit:true,
				rownumbers:true,
				singleSelect:true,
			    data:!!node.getStep().fields&&node.getStep().fields.field?{total:1, rows:$.isArray(node.getStep().fields.field)?
			    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					fitColumns:true,
					handler: function(){//添加一行
						$('#DataGrid_metadata_table').datagrid(//新增加一行
								'appendRow',
								{
									name:'', 
									type:'',
									format:'',
									currency:'',
									decimal:'',
									group : '',
									length : '',
									precision : '',
									set_empty_string : ''
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						var del_row = $('#DataGrid_metadata_table').datagrid('getSelected');
						var del_rowIndex = $('#DataGrid_metadata_table').datagrid('getRowIndex',del_row);
						$('#DataGrid_metadata_table').datagrid('deleteRow',del_rowIndex);
					}
				}],
			    columns:[[    
			        {field:'name',title:'名称',width:100,editor:{type:'text'}},    
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
			        {field:'set_empty_string',title:'设为空串?',width:100,editor:{type:'combobox',
			        	options:{
		            		valueField: 'value',
		            		textField: 'label',
		            		editable : false,
		            		data: [{
	                			label: '是',
	                			value: 'Y'
	                		},{
	                			label: '否',
	                			value: 'N'
	                		}],
			        	}   	
			        },
			        formatter: function(value,row,index){
		        		if(value=='N'){
		        			value='否';
		        		}else{
		        			value='是';
		        		}
                		return value;
                	}	
			        }
			        
			    ]],
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
				},
	    		onClickRow:function(i,r){
			    	var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						j===i || $('#DataGrid_metadata_table').datagrid('endEdit',j);
					});

		        	$(this).datagrid('beginEdit',i);//编辑点击的行

		        	var newOld = change2(r.type,i);
		        	  if(newOld==''){
		        		  var ed=$(this).datagrid('getEditor',{index:i,field:'format'});
		        		  $(ed.target).combobox('setValue',r.format);
		        	  }else{
		        		  var ed=$(this).datagrid('getEditor',{index:i,field:'format'});
		        		  $(ed.target).combobox('setValue',newOld);
		        	  }
	    		}
			});
			
			function geimetadatavalue(obj){
				var rows = $("#DataGrid_metadata_table").datagrid('getRows');//获取配置列表的所有行
				$.each(rows,function(j,o){
					$('#DataGrid_metadata_table').datagrid('endEdit',j);
				});
				param=[],
			    columns=[],//数据表格的列属性
			    col=[],
			    appendRowvalue={},
			    columns.push(col);
			    $.each(rows,function(i,o){
			    	var field={field:o.name,
			    			title:o.name,
			    			width:100,
			    			editor:{
					            type:'text'
					        }
			    	} 
			    	var nameaa=o.name;
			    	appendRowvalue[nameaa] = '';//利用方括号法添加属性和属性值
			    	col.push(field);//定义数据表格列属性
			    	param.push({name:o.name,value:o.value});
			    });
			    
			// 请求数据表格的数据
					$('#DataGrid_data_table').datagrid({
						rownumbers : true,
						fit : true,
//						fitColumns : true,
						data:obj!=undefined?{total:1, rows : $.isArray(obj.field) ?
								obj.field:[obj.field]}:{total:0,rows:[]},
						toolbar: [{
							iconCls: 'icon-add',
							text : "增加",
							fitColumns:true,
							handler: function(){//添加一行
								$('#DataGrid_data_table').datagrid(//新增加一行
										'appendRow',clonObj(appendRowvalue));}
						},{
							text : "删除",
							iconCls : 'icon-remove',
							handler : function() {
								var del_row = $('#DataGrid_data_table').datagrid('getSelected');
								var del_rowIndex = $('#DataGrid_data_table').datagrid('getRowIndex',del_row);
								$('#DataGrid_data_table').datagrid('deleteRow',del_rowIndex);
							}
						}],
						columns :columns ,
						onDblClickCell:function(index, field, value){
							var rows=$(this).datagrid('getRows');
							$.each(rows,function(j,o){
								j===index || $('#DataGrid_data_table').datagrid('endEdit',j);
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
					});
			    function clonObj(obj){
			    	var newObj={};
			    	for(var key in obj){
			    		newObj[key] = "";
			    	}
			    	return newObj;
			    }
			
			}
			var newObjectShow = {};
			var newArrayList = []; 
		if(!!node.getStep().data&&node.getStep().data.line&&$.isArray(node.getStep().data.line)){
				var kk=node.getStep().data.line
				for(var k=0;k<kk.length;k++){
					var yy={}
					if($.isArray(kk[k].item)){
					for(var r=0;r<kk[k].item.length;r++){
						if(!!node.getStep().fields&&node.getStep().fields.field&&$.isArray(node.getStep().fields.field)){
							for(var i=0;i<node.getStep().fields.field.length;i++){
								yy[node.getStep().fields.field[i].name]=kk[k].item[i];
							}
						}else if(!!node.getStep().fields&&node.getStep().fields.field){
							   yy[node.getStep().fields.field.name]=kk[k].item[0];
						}
						}
						newArrayList.push(yy)
					}
				}
		}else if(!!node.getStep().data&&node.getStep().data.line){
			var kk=node.getStep().data.line
				if($.isArray(kk.item)){
				for(var r=0;r<kk.item.length;r++){
					var yy={}
					if(!!node.getStep().fields&&node.getStep().fields.field&&$.isArray(node.getStep().fields.field)){
						for(var i=0;i<node.getStep().fields.field.length;i++){
							yy[node.getStep().fields.field[i].name]=kk.item[i];
						}
					}else if(!!node.getStep().fields&&node.getStep().fields.field){
						   yy[node.getStep().fields.field.name]=kk.item[0];
					}
					}
					newArrayList.push(yy)
				}
		}
		  newObjectShow.field = newArrayList;
		  geimetadatavalue(newObjectShow)
			$('#filedasdas').tabs({    
			    border:false,    
			    onSelect:function(title){    
			    	if(title=="数据"){
			    		geimetadatavalue(newObjectShow);
			    	}
			    }    
			});  

			//取消按钮
			$('#DataGrid_cancel').unbind('click').click(function(e){
				$('#DataGrid').window('close');
			});
			//确认按钮
			$('#DataGrid_ok').unbind('click').click(function(e){
				var DataGrid={};
				node.text=$('#step_name_DataGrid').textbox('getValue');

				var rows=$('#DataGrid_metadata_table').datagrid('getRows');
				$.each(rows,function(i,o){
					$('#DataGrid_metadata_table').datagrid('endEdit', i);//结束编辑所有行
				});
				var fields=Nasoft.GetProjectData.getFields('#DataGrid_metadata_table');
			   
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
				DataGrid.fields=fields;
				var data_da={}
				var data_line=[];
				var rowss=$('#DataGrid_data_table').datagrid('getRows');
				$.each(rowss,function(i,o){
					$('#DataGrid_data_table').datagrid('endEdit', i);//结束编辑所有行
					var item=[];
					var line_itme={}
					for(var key in o){
						item.push(o[key])
					}
					line_itme.item=item;
					data_line.push(line_itme);
				});
				data_da.line=data_line;
				DataGrid.data=data_da;
				
				
				node.setStep(DataGrid);
				
				node.setTransfer();//把定义的常量set出去
				$('#DataGrid').window('close');//关闭窗口
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
		
		rowIndex = $('#DataGrid_metadata_table').datagrid('getRowIndex', $("#DataGrid_metadata_table").datagrid('getSelected'));
		//得到编辑行的id
		if(newValue=='Date'){
			//方案1
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({ data:date ,valueField: "text", textField: "text"});	
		}else if(newValue=='Number'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='BigNumber'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='Integer'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue =='String'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='InternetAddress'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Boolean'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Timestamp'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Binary'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else{
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
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
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:date ,valueField: "text", textField: "text"});
		}else if(newValue=='Number'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='BigNumber'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue=='Integer'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
		}else if(newValue =='String'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='InternetAddress'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Boolean'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Timestamp'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else if(newValue =='Binary'){
			var ed=$('#DataGrid_metadata_table').datagrid('getEditor',{index:rowIndex,field:'format'});
			$(ed.target).combobox({data:empty});
		}else{
			return '';
		}
		return $(ed.target).combobox('getValue');
	}
    return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}
