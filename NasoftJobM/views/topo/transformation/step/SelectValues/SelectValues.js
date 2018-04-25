 Nasoft.Topo.transferFns.SelectValues=function(node){
	 console.log(node);
	 var file=node.getStep().fields;
	    var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
	    var  transfer=Nasoft.Util.transferArray_copy(transferArry)
	    var selectValues = [];
	    if(!!file){
		if (!!file.field&&!!transfer&&(file.field.length>0||file.field.name)){
			if (file.field.constructor == Array) {// 数组
			var data_file=selectval(file.field);//复制选择和修改表中的值
			var data_fileds=removeval(file,data_file);//要传递的值
				for(var i=0;i<transfer.length;i++){
					for(var j=0;j<data_fileds.length;j++){
						var field = {};
						if(transfer[i].name===data_fileds[j].name){
							if (!!data_fileds[j].rename) {
								
								field.name = data_fileds[j].rename;//名称
								field.type=transfer[i].type;//类型
								field.format=transfer[i].format;//格式
								field.trim_type=transfer[i].trim_type;//去空字符串
								if(data_fileds[j].length!='-2'){
									field.length = data_fileds[j].length;//长度									
								}else{
									field.length =transfer[i].length;//长度	
								}
//								field.precision = file.field[j].precision;//精度
								selectValues.push(field)
							}else {
								field.name = data_fileds[j].name;
								field.type=transfer[i].type;//类型
								field.format=transfer[i].format;//格式
								field.trim_type=transfer[i].trim_type;//去空字符串
								if(data_fileds[j].length!='-2'){
									field.length = data_fileds[j].length;//长度									
								}else{
									field.length =transfer[i].length;//长度	
								}
//								field.precision = file.field[j].precision;//精度
								selectValues.push(field)
							} 
						}						
					}
				}
			} else {// 对象
				if(file.remove==undefined||!!!file.remove.name){
					for(var i=0;i<transfer.length;i++){
						if(transfer[i].name===file.field.name){
							var oldFile = {}
							if (!!file.field.rename&&!!!file.remove) {
								oldFile.name = file.field.rename;//名称
								oldFile.type=transfer[i].type;//类型
								oldFile.format=transfer[i].format;//格式
								oldFile.trim_type=transfer[i].trim_type;//去空字符串
								if(file.field.length!='-2'){
									oldFile.length = file.field.length;//长度									
								}else{
									oldFile.length =transfer[i].length;//长度	
								}
//							oldFile.precision = file.field.precision;
								selectValues.push(oldFile)
							} else if(!!!file.remove){
								oldFile.name = file.field.name;
								oldFile.type=transfer[i].type;//类型
								oldFile.format=transfer[i].format;//格式
								oldFile.trim_type=transfer[i].trim_type;//去空字符串
								if(file.field.length!='-2'){
									oldFile.length = file.field.length;//长度									
								}else{
									oldFile.length =transfer[i].length;//长度	
								}
//							oldFile.precision = file.field.precision;
								selectValues.push(oldFile)
							}
						}
					}
				}
		
			}
		}else if(!!file.meta&&!!transfer&&(file.meta.length>0||file.meta.name)){
			if (file.meta.constructor == Array) {// 数组
				var data_file=selectval(file.meta);//复制元数据表中的值
				var data_fileds=removeval(file,data_file);//要传递的值
				for(var i=0;i<transfer.length;i++){
					for(var j=0;j<data_fileds.length;j++){
						var field = {};
						if(transfer[i].name===data_fileds[j].name){
							if (!!data_fileds[j].rename) {
								field.name = data_fileds[j].rename;//名称
								if(!!data_fileds[j].type){
									field.type=data_fileds[j].type;//类型
								}else{
									field.type=transfer[i].type;//类型
									
								}
								if(!!data_fileds[j].conversion_mask){
									field.format=data_fileds[j].conversion_mask;//表中的格式属性
								}else{
									
									field.format=transfer[i].format;//格式
								}
								field.trim_type=transfer[i].trim_type;//去空字符串
								if(!!data_fileds[j].length){
									field.length = data_fileds[j].length;//长度									
								}else{
									field.length =transfer[i].length;//长度	
								}
//								field.precision = file.field[j].precision;//精度
								selectValues.push(field)
							}else {
								field.name = data_fileds[j].name;
								if(!!data_fileds[j].type){
									field.type=data_fileds[j].type;//类型
								}else{
									field.type=transfer[i].type;//类型
									
								}
								if(!!data_fileds[j].conversion_mask){
									field.format=data_fileds[j].conversion_mask;//表中的格式属性
								}else{
									
									field.format=transfer[i].format;//格式
								}
								field.trim_type=transfer[i].trim_type;//去空字符串
								if(!!data_fileds[j].length){
									field.length = data_fileds[j].length;//长度									
								}else{
									field.length =transfer[i].length;//长度	
								}
//								field.precision = file.field[j].precision;//精度
								selectValues.push(field)
							} 
						}						
					}
				}
	
			} else {// 对象
				if(file.remove==undefined||!!!file.remove.name){
					for(var i=0;i<transfer.length;i++){
						if(transfer[i].name===file.meta.name){
							var oldFile = {}
							if (!!file.meta.rename) {
								oldFile.name = file.meta.rename;//名称
								if(!!file.meta[j].type){
									oldFile.type=file.meta.type;//类型
								}else{
									oldFile.type=transfer[i].type;//类型
									
								}
								if(!!file.meta[j].conversion_mask){
									oldFile.format=file.meta.conversion_mask;//表中的格式属性
								}else{
									
									oldFile.format=transfer[i].format;//格式
								}
								oldFile.trim_type=transfer[i].trim_type;//去空字符串
								if(!!file.meta.length){
									oldFile.length = file.meta.length;//长度									
								}else{
									oldFile.length =transfer[i].length;//长度	
								}
//							oldFile.precision = file.field.precision;
								selectValues.push(oldFile)
							} else {
								oldFile.name = file.meta.name;
								if(!!file.meta[j].type){
									oldFile.type=file.meta.type;//类型
								}else{
									oldFile.type=transfer[i].type;//类型				
								}
								if(!!file.meta[j].conversion_mask){
									oldFile.format=file.meta.conversion_mask;//表中的格式属性
								}else{								
									oldFile.format=transfer[i].format;//格式
								}
								oldFile.trim_type=transfer[i].trim_type;//去空字符串
								if(!!file.meta.length){
									oldFile.length = file.meta.length;//长度									
								}else{
									oldFile.length =transfer[i].length;//长度	
								}
//							oldFile.precision = file.field.precision;
								selectValues.push(oldFile)
							}
						}
					}
					
				}
		
			}
		}
 }
      function removeval(file,data){//删除不传递的值,留下要传递的值
    	  if (!!file.remove && file.remove.constructor == Array) {
    		  for(var i=0;i<data.length;i++){
    			  for(var j=0;j<file.remove.length;j++){
    				  if (file.remove[j].name==data[i].name) {	
    					  data.splice(i,1)
    				  }
    			  }
    		  }	
    	  }else if(!!file.remove){
    		  for(var i=0;i<data.length;i++){
    			  if (file.remove.name==data[i].name) {	
    				  data.splice(i,1)
    			  }
    		  }
    	  }	 
    	  return data;
      }
	    function  selectval(fileds){//把表的数据复制,不复制的话,删除操作的是node中的值
	    	var data=[]
	    	for (var i = 0; i < fileds.length; i++) {			
	    		var data_a=$.extend(true, {}, fileds[i]);
	    		data.push(data_a)
	    	}
	    	return data;
	    }
		if(selectValues.length>0||(!!file.field||!!file.meta)){
			node.blocked=true;
			return selectValues;
		}else{
			node.blocked=false;
			return selectValues;
		}
  };
Nasoft.Window.fns.SelectValues = function(node) {
	Nasoft.Ui_extend.browser_even('#SelectValues');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen = function() {	
		try {
			console.log(node);
			$('#step_name_tableInput_selectValues').textbox('setValue',node.text);//设置步骤名称
			var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(transferArry.length>0){
				var transfer=Nasoft.Util.transferArray_copy(transferArry);
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			node.getStep().fields.select_unspecified? $("#line_feed_selectValues").get(0).checked=false ://
			node.getStep().fields.select_unspecified ==='Y' && ($("#line_feed_selectValues").get(0).checked=true)
			node.getStep().fields.select_unspecified ==='N' && ($("#line_feed_selectValues").get(0).checked=false);
			
			if(!!node.getStep().fields.field&&node.getStep().fields.field.constructor == Array){//如果是数组进行替换
				$.each(node.getStep().fields.field,function(i,o){
					if(o.length =='-2'){
						o.length = '';
					}
					if(o.precision =='-2'){
						o.precision = '';
					}
				});
			}else if(!!node.getStep().fields.field){//如果是对象进行替换
				node.getStep().fields.field.length =='-2' ? node.getStep().fields.field.length = '' : node.getStep().fields.field.length
				node.getStep().fields.field.precision =='-2'? node.getStep().fields.field.precision ='' : node.getStep().fields.field.precision
			}
			//选择和修改
			$('#fixed_table_selectValues').datagrid({
				data:!!node.getStep().fields.field?{total:1, rows:$.isArray(node.getStep().fields.field)?
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
					text : "新增字段",
					handler: function(){
						$('#fixed_table_selectValues').datagrid(//新增加一行
								'appendRow',
								{ 
									name:'',
									rename:'',
									length:'',
									precision:''
									
						});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						var del_row = $('#fixed_table_selectValues').datagrid('getSelections');
						var len = del_row.length;
						for (var int = 0; int < len; int++) {
							$('#fixed_table_selectValues').datagrid('deleteRow',
									$('#fixed_table_selectValues').datagrid('getRowIndex',del_row[int]));
						}
					}
				}],
				columns:[[    
				          {field:'name',title:'字段名称',width:100,editor:{
				        	  type:'combobox',
					            options:{
					            	valueField :"value",
									textField : "text",
									data :Nasoft.Util.file_name_combobox(transfer)
					            }
					        }}, 
				          {field:'rename',title:'改名成',width:100,editor:{
				        	  type:'text'
				          }},
				          {field:'length',title:'长度',width:100,editor:{
				        	  type:'text'
				          }},
				          {field:'precision',title:'精度',width:100,editor:{
				        	  type:'text'
				          }},
				          ]],
			          
				         onClickRow:function(i,r){
				        	 var rows=$(this).datagrid('getRows');
							  $.each(rows,function(j,o){
								j===i || $('#fixed_table_selectValues').datagrid('endEdit',j);
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
			function table_selectValues_transfer(transfer){
				var data=[]
				for (var i = 0; i < transfer.length; i++) {			
					var data_a={}
					data_a.name=transfer[i].name;
					data_a.rename='';
					data_a.length='';
					data_a.precision='';
					data.push(data_a)
				}
				return data;
			}
			function remove_selectValues_transfer(transfer){
				var data=[]
				for (var i = 0; i < transfer.length; i++) {			
					var data_a={}
					data_a.name=transfer[i].name;
					data.push(data_a)
				}
				return data;
			}
			$('#selectValues_select_field').unbind('click').click(function(){//点击选择和修改表的获取字段
				var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArry){
					var row = {name:'',}
					var transfer=Nasoft.Util.transferArray_copy(transferArry)
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					var opts_a=$('#fixed_table_selectValues').datagrid('options');
					opts_a.data={rows:table_selectValues_transfer(transfer)};
					$('#fixed_table_selectValues').datagrid(opts_a);					
				}
		    }); 
			$('#selectValues_remove_field').unbind('click').click(function(){//点击移除表的获取字段
				var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArry){
					var transfer=Nasoft.Util.transferArray_copy(transferArry)
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					var opts_a=$('#fixed_table_selectValues_remove').datagrid('options');
					opts_a.data={rows:remove_selectValues_transfer(transfer)};
					$('#fixed_table_selectValues_remove').datagrid(opts_a);					
				}
		    }); 
			$('#selectVales_table_get').unbind('click').click(function(){//点击元数据表的获取字段
				var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArry){
					var transfer=Nasoft.Util.transferArray_copy(transferArry)
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					var data=[]
				    for (var i = 0; i < transfer.length; i++) {			
					var data_a={}
					data_a.name=transfer[i].name;
					data_a.length=transfer[i].length;
					data.push(data_a)
				   }
					var opts_a=$('#fixed_table_selectValues_update').datagrid('options');
					    opts_a.data={rows:data};
					$('#fixed_table_selectValues_update').datagrid(opts_a);					
				}
		    }); 
			//移除
			$('#fixed_table_selectValues_remove').datagrid({
				data:node.getStep().fields.remove?{total:1, rows:$.isArray(node.getStep().fields.remove)?
				    		node.getStep().fields.remove:[node.getStep().fields.remove]}:{total:0,rows:[]},	
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
					text : "新增字段",
					handler: function(){
						$('#fixed_table_selectValues_remove').datagrid(//新增加一行
								'appendRow',
								{ 
									name:'',
								}
						);
					}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						var del_row = $('#fixed_table_selectValues_remove').datagrid('getSelections');
						var len = del_row.length;
						for (var int = 0; int < len; int++) {
							$('#fixed_table_selectValues_remove').datagrid('deleteRow',
									$('#fixed_table_selectValues_remove').datagrid('getRowIndex',del_row[int]));
						}
					}
				}],
				columns:[[    
				          {field:'name',title:'字段名称',width:100,editor:{
				        	  type:'combobox',
					            options:{
					            	valueField :"value",
									textField : "text",
									data :Nasoft.Util.file_name_combobox(transfer)
					            }
					        }}
				]],
				 onClickRow:function(i,r){
		        	 var rows=$(this).datagrid('getRows');
					  $.each(rows,function(j,o){
						j===i || $('#fixed_table_selectValues_remove').datagrid('endEdit',j);
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
			
			
			if(node.getStep().fields.meta == undefined){//第一次加载时候的undefined

			}else if(node.getStep().fields.meta.constructor == Array){//如果是数组进行替换
				$.each(node.getStep().fields.meta,function(i,o){
					if(o.type =='None'){
						o.type = '';
					}
					if(o.length =='-2'){
						o.length = '';
					}
					if(o.precision =='-2'){
						o.precision = '';
					}
				});
			}else{//如果是对象进行替换
				node.getStep().fields.meta.type == 'None' ? node.getStep().fields.meta.type = '' :  node.getStep().fields.meta.type
				node.getStep().fields.meta.length =='-2' ? node.getStep().fields.meta.length = '' : node.getStep().fields.meta.length
				node.getStep().fields.meta.precision =='-2'? node.getStep().fields.meta.precision ='' : node.getStep().fields.meta.precision
			}
			
			//元数据
			$('#fixed_table_selectValues_update').datagrid({
				data:node.getStep().fields.meta?{total:1, rows:$.isArray(node.getStep().fields.meta)?
				    		node.getStep().fields.meta:[node.getStep().fields.meta]}:{total:0,rows:[]},				
	    		rownumbers:true,
				fitColumns:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				fit:true,
				rownumbers:true,
				singleSelect:true,
				rownumbers:true,
				toolbar: [{
					iconCls: 'icon-add',
					text : "新增字段",
					handler: function(){
						$('#fixed_table_selectValues_update').datagrid(//新增加一行
								'appendRow',
								{ 
									name:'',
									rename:'',
									type:'',
									length:'',
									precision:'',
									storage_type:'',
									conversion_mask:'',
									date_format_lenient:'',
									date_format_locale:'',
									date_format_timezone:'',
									lenient_string_to_number:'',
									encoding:'',
									decimal_symbol:'',
									grouping_symbol:'',
									currency_symbol:'',	
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						var del_row = $('#fixed_table_selectValues_update').datagrid('getSelections');
						var len = del_row.length;
						for (var int = 0; int < len; int++) {
							$('#fixed_table_selectValues_update').datagrid('deleteRow',
									$('#fixed_table_selectValues_update').datagrid('getRowIndex',del_row[int]));
						}
					}
				}],
				fitColumns:false,
				columns:[[    
				          {field:'name',title:'字段名称',width:100,editor:{
				        	  type:'combobox',
					            options:{
					            	valueField :"value",
									textField : "text",
									data :Nasoft.Util.file_name_combobox(transfer)
					            }
					        }}, 
				          {field:'rename',title:'改名成',width:100,editor:{
				        	  type:'text'
				          }},
				          {field:'type',title:'类型',width:200,editor:{
					            type:'combobox',
				            	options:{
				            		valueField: 'label',
				            		textField: 'value',
				            		editable:false,
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
				          {field:'length',title:'长度',width:100,editor:{
				        	  type:'text'
				          }},
				          {field:'precision',title:'精度',width:100,editor:{
				        	  type:'text'
				          }},
				          {field:'storage_type',title:'Binary to Normal?',width:100,editor:{type:'combobox',
					        	options:{
				            		valueField: 'value',
				            		textField: 'label',
				            		editable:false,
				            		data: [{
			                			label: '是',
			                			value: 'normal'
			                		},{
			                			label: '否',
			                			value: ''
			                		}],
					        	}
				          }},
				          {field:'conversion_mask',title:'格式',width:200,editor:{
					            type:'combobox',
					            options:{
					            	editable:false,
					            	valueField: 'text',    
					                textField: 'text',
					            }
					      }}, 
				          {field:'date_format_lenient',title:'Date Format Lenient?',width:100,editor:{type:'combobox',
					        	options:{
				            		valueField: 'value',
				            		textField: 'label',
				            		editable:false,
				            		data: [{
			                			label: '是',
			                			value: 'true'
			                		},{
			                			label: '否',
			                			value: 'false'
			                		}],
					        	}
				          }},
				          {field:'date_format_locale',title:'Date Locale?',width:100,editor:{type:'combobox',
					        	options:{
				            		valueField: 'value',
				            		textField: 'label',
				            		editable:false,
				            		data: [{
			                			label: 'zh_CN',
			                			value: 'zh_CN'
			                		},{
			                			label: 'zh',
			                			value: 'zh'
			                		}],
					        	}
				          }},
				          {field:'date_format_timezone',title:'Date Time Zone?',width:100,editor:{type:'combobox',
					        	options:{
				            		valueField: 'value',
				            		textField: 'label',
				            		editable:false,
				            		data: [{
			                			label: 'Beijing',
			                			value: 'Beijing'
			                		},{
			                			label: 'Shanghai',
			                			value: 'Shanghai'
			                		}],
					        	}
				          }},
				          {field:'lenient_string_to_number',title:'Lenient number conversion?',width:100,editor:{type:'combobox',
					        	options:{
				            		valueField: 'value',
				            		textField: 'label',
				            		editable:false,
				            		data: [{
			                			label: '是',
			                			value: 'true'
			                		},{
			                			label: '否',
			                			value: 'false'
			                		}],
					        	}
				          }},
				          {field:'encoding',title:'Encoding',width:100,editor:{type:'combobox',
					        	options:{
				            		valueField: 'value',
				            		textField: 'label',
				            		editable:false,
				            		data: [{
			                			label: 'GBK',
			                			value: 'GBK'
			                		},{
			                			label: 'UTF-8',
			                			value: 'UTF-8'
			                		},{
			                			label: 'gb2312',
			                			value: 'gb2312'
			                		}],
					        	}
				          }},
				          {field:'decimal_symbol',title:'十进制',width:100,editor:{
				        	  type:'text'
				          }},
				          {field:'grouping_symbol',title:'分组',width:100,editor:{
				        	  type:'text'
				          }},
				          {field:'currency_symbol',title:'货币',width:100,editor:{
				        	  type:'text'
				          }},    
				          ]],			          
				          onClickRow:function(i,r){
					    	  var rows=$(this).datagrid('getRows');
							  $.each(rows,function(j,o){
								j===i || $('#fixed_table_selectValues_update').datagrid('endEdit',j);
							  });

				        	  $(this).datagrid('beginEdit',i);//编辑点击的行
				        	  
				        	  var newOld = change2(r.type,i);
				        	  if(newOld==''){
				        		  var ed=$(this).datagrid('getEditor',{index:i,field:'conversion_mask'});
				        		  $(ed.target).combobox('setValue',r.conversion_mask);
				        	  }else{
				        		  var ed=$(this).datagrid('getEditor',{index:i,field:'conversion_mask'});
				        		  $(ed.target).combobox('setValue',newOld);
				        	  }
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
			 $('#tableInput_ok_selectValues').unbind('click').click(function(){

					try {
						node.text=$('#step_name_tableInput_selectValues').textbox('getValue');//放入步骤名称
						var TableInput={};//定义一个TableInput的步骤
						var fields={};//综合定义一个对象
						//选择和修改
						var rows=$('#fixed_table_selectValues').datagrid('getRows');
						$.each(rows,function(i,o){
							$('#fixed_table_selectValues').datagrid('endEdit', i);
						});
						var fields_select_update=Nasoft.GetProjectData.getFields('#fixed_table_selectValues');		
						
						if(!!fields_select_update&&fields_select_update.field.constructor==Array){//数组
							$.each(fields_select_update.field,function(i,o){
			
								if(o.length ==''){
									o.length = '-2'
								}
								if(o.precision == ''){
									o.precision = '-2'
								}
							});
							fields.field=fields_select_update.field;
						}else if(!!fields_select_update){//对象
							
							if(fields_select_update.field.length ==''){
								fields_select_update.field.length ='-2'
							}
							if(fields_select_update.field.precision==''){
								fields_select_update.field.precision='-2'
							}
							fields.field=fields_select_update.field;
						}
						//移除
						var rows1=$('#fixed_table_selectValues_remove').datagrid('getRows');
						$.each(rows1,function(i,o){
							$('#fixed_table_selectValues_remove').datagrid('endEdit', i);
						});
						var fields_remove=Nasoft.GetProjectData.getFields('#fixed_table_selectValues_remove');
						if(!!fields_remove){
							fields.remove = fields_remove.field;
						}
					

						//元数据 
						var rows=$('#fixed_table_selectValues_update').datagrid('getRows');//获取当前页面中所有的行
						$.each(rows,function(i,o){
							$('#fixed_table_selectValues_update').datagrid('endEdit', i);//结束编辑所有行
						});
						var metadata=Nasoft.GetProjectData.getFields('#fixed_table_selectValues_update');//将对应数据字段加入表输出
						
						
						//包含为指定的列
						var line_feed_selectValues = $("#line_feed_selectValues").prop("checked")==true ? 'Y' : 'N'; 

						if(!!metadata&&metadata.field.constructor==Array){//数组
							$.each(metadata.field,function(i,o){
								if(o.type==''){
									o.type ='None'
								}
								if(o.length ==''){
									o.length = '-2'
								}
								if(o.precision == ''){
									o.precision = '-2'
								}
								if(o.date_format_lenient ==''){
									o.date_format_lenient ='false'
								}
								if(o.lenient_string_to_number ==''){
									o.lenient_string_to_number ='false'
								}
							});
							fields.meta = metadata.field;
						}else if(!!metadata){//对象
							if(metadata.field.type==''){
								metadata.field.type='None'
							}
							if(metadata.field.length ==''){
								metadata.field.length ='-2'
							}
							if(metadata.field.precision==''){
								metadata.field.precision='-2'
							}
							if(metadata.field.date_format_lenient ==''){
								metadata.field.date_format_lenient ='false'
							}
							if(metadata.field.lenient_string_to_number ==''){
								metadata.field.lenient_string_to_number ='false'
							}
							fields.meta = metadata.field;
						}
						
						//综合放入配置文件中
						
						
						fields.select_unspecified = line_feed_selectValues;
					
						
						
						TableInput.fields=fields;
						
						node.setStep(TableInput);//将步骤的配置属性放入节点中
						node.setTransfer();//存储要传递的字段
					} catch (e) {
						console.log(e)
					}

			      $('#SelectValues').window('close');//关闭弹窗 
		});//确定保存括号
			 
		 $('#tableInput_cancel_selectValues').unbind('click').click(function(){
				$('#SelectValues').window('close');
		 }); 
		 
		} catch (e) {//打开try 
			console.log(e)
		}
	}, 
	
	onBeforeClose = function() {}
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
  
      			rowIndex = $('#fixed_table_selectValues_update').datagrid('getRowIndex', $("#fixed_table_selectValues_update").datagrid('getSelected'));
      			//得到编辑行的id
      			if(newValue=='Date'){
      				//方案1
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        		$(ed.target).combobox({ data:date ,valueField: "text", textField: "text"});	
      			}else if(newValue=='Number'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='BigNumber'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='Integer'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue =='String'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='InternetAddress'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Boolean'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Timestamp'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Binary'){
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
	        			$(ed.target).combobox({data:empty});
      			}else{
      				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
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
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
				$(ed.target).combobox({data:date ,valueField: "text", textField: "text"});
		}else if(newValue=='Number'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='BigNumber'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='Integer'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue =='String'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='InternetAddress'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Boolean'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Timestamp'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Binary'){
				var ed=$('#fixed_table_selectValues_update').datagrid('getEditor',{index:rowIndex,field:'conversion_mask'});
    			$(ed.target).combobox({data:empty});
			}else{
				return '';
			}
		return $(ed.target).combobox('getValue');
	}
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}
