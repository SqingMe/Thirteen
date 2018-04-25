 Nasoft.Topo.transferFns.FixedInput=function(node){
	 var file=node.getStep().fields;//将对应数据字段加入表输出
	 var fixedInput = [];
	 if(!!file){		 
		 if(file.field.constructor==Array){//数组		
			 $.each(file.field,function(i,o){
				 var field={};
				 field.name= o.name;
				 field.type=o.type;
				 field.format=o.format;
				 field.length=o.length;
				 field.precision=o.precision;
				 field.trim_type=o.trim_type;
				 fixedInput.push(field)
			 });		
		 }else{//对象
			 var oldFile ={} 
			 oldFile.name=file.field.name;
			 oldFile.type=file.field.type;
			 oldFile.format=file.field.format;
			 oldFile.length=file.field.length;
			 oldFile.precision=file.field.precision;
			 oldFile.trim_type=file.field.trim_type;
			 fixedInput.push(oldFile)
		 }
	 }
        return fixedInput;
  };
Nasoft.Window.fns.FixedInput=function(node){
	Nasoft.Ui_extend.browser_even('#FixedInput');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen=function(){//打开
		try{		
			$('#fixedInput_filelook').unbind('click').click(function(){	//确定配置信息后执行	文件上传
				Nasoft.Static.handleFilePostfix('#fixedInput_update','#fixedInput_update_h',{},"3","");
			});	
			$('#step_name_fixedInput').textbox('setValue',node.text);//设置步骤名称
			
			if(node.getStep().line_width==undefined){//以字节数表示的行宽度(不包括回车符CR)
				$('#byte_tableInput_fixedInput').textbox('setValue','');
			}else{
				$('#byte_tableInput_fixedInput').textbox('setValue',node.getStep().line_width);
			}
			if(node.getStep().buffer_size==undefined){//NIO缓存大小
				$('#big_or_small_fixedInput').textbox('setValue','');
			}else{
				$('#big_or_small_fixedInput').textbox('setValue',node.getStep().buffer_size);
			}
			if(node.getStep().filename==undefined){//文件名
				$('#fixedInput_update').filebox('setValue','');
			}else{
				$('#fixedInput_update').textbox('setValue',node.getStep().filename);
				$('#fixedInput_update_h').val(node.getStep().filename);
			}
			node.getStep().line_feed == undefined ? $("#line_feed_fixedInput").get(0).checked=false :
			node.getStep().line_feed==='Y' && ($("#line_feed_fixedInput").get(0).checked=true)
			node.getStep().line_feed==='N' && ($("#line_feed_fixedInput").get(0).checked=false);
			
			node.getStep().lazy_conversion == undefined ? $("#transition_fixedInput").get(0).checked=false :
			node.getStep().lazy_conversion ==='Y' && ($("#transition_fixedInput").get(0).checked=true)
			node.getStep().lazy_conversion ==='N' && ($("#transition_fixedInput").get(0).checked=false);
			
			node.getStep().header == undefined ? $("#head_information_fixedInput").get(0).checked=false :
			node.getStep().header==='Y' && ($("#head_information_fixedInput").get(0).checked=true)
			node.getStep().header==='N' && ($("#head_information_fixedInput").get(0).checked=false);
			
			$('#parallel_fixedInput').change(function(){
				if($("#parallel_fixedInput").get(0).checked==true){
					$('#span_hidden_parallel_fixedInput').show();
				}else{
					$('#span_hidden_parallel_fixedInput').hide();
				}
			});

			if(node.getStep().parallel == undefined){  //以平行方式运行与后面那个下拉列表
				$("#parallel_fixedInput").get(0).checked=false;
				$('#span_hidden_parallel_fixedInput').hide();
				$('#hidden_parallel_fixedInput').combobox('select','没有换行符');
			}else{
				if(node.getStep().parallel ==='Y'){
					$("#parallel_fixedInput").get(0).checked=true;
					$('#span_hidden_parallel_fixedInput').show();
					$('#hidden_parallel_fixedInput').combobox({ //下拉框   
						onLoadSuccess:function(){
							var connectionName;
							if(node.getStep().file_type == '没有换行符'){
								connectionName!='' && $(this).combobox('select','没有换行符');
							}else if(node.getStep().file_type == 'UNIX'){
								connectionName!='' && $(this).combobox('select','Unix (1 字节)');
							}else if(node.getStep().file_type == 'DOS'){
								connectionName!='' && $(this).combobox('select','MS-DOS (2 字节)');
							}

						},
					});
				}else if(node.getStep().parallel ==='N'){
					$("#parallel_fixedInput").get(0).checked=false;
					$('#hidden_parallel_fixedInput').combobox('select','没有换行符');
					$('#span_hidden_parallel_fixedInput').hide();
				}
			}

			node.getStep().add_to_result_filenames == undefined ? $("#file_listing_fixedInput").get(0).checked=false :
			node.getStep().add_to_result_filenames ==='Y' && ($("#file_listing_fixedInput").get(0).checked=true)
			node.getStep().add_to_result_filenames ==='N' && ($("#file_listing_fixedInput").get(0).checked=false);
			
			$('#easyui-combobox-fixedInput').combobox({ //下拉框   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getStep().encoding!='' || node.getStep().encoding!=undefined)?node.getStep().encoding:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
			});
			
			//
			if(!!node.getStep().fields){//第一次加载时候的undefined
			if(node.getStep().fields.field.constructor == Array){//如果是数组进行替换
				$.each(node.getStep().fields.field,function(i,o){
					if(o.type=="None" ){
						o.type="";
					}
					if(o.trim_type=="none"){
						o.trim_type="none";
					}
					if(o.width=="-1"){
						o.width="";
					}
					if(o.length=="-1"){
						o.length="";
					}
					if(o.precision=="-1"){
						o.precision="";
					}
				});
			}else{//如果是对象进行替换
				node.getStep().fields.field.type == 'None' ? node.getStep().fields.field.type = '' :  node.getStep().fields.field.type
				node.getStep().fields.field.trim_type =='none' ? node.getStep().fields.field.trim_type = 'none' : node.getStep().fields.field.trim_type
				node.getStep().fields.field.width =='-1'? node.getStep().fields.field.width ='' : node.getStep().fields.field.width 
				node.getStep().fields.field.length =='-1' ? node.getStep().fields.field.length = '' : node.getStep().fields.field.length
				node.getStep().fields.field.precision =='-1'? node.getStep().fields.field.precision ='' : node.getStep().fields.field.precision 
							
			}
			}
			//
			$('#fixed_table_fixedInput').datagrid({ 
				rownumbers:true,
				fitColumns:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				fit:true,
			    data:!!node.getStep().fields?{total:1, rows:$.isArray(node.getStep().fields.field)?
			    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					handler: function(){
						$('#fixed_table_fixedInput').datagrid(//新增加一行
								'appendRow',
								{
									name:'', 
									type:'',
									format:'',
									width:'',
									length:'',
									precision:'',
									currency:'',
									decimal:'',
									group:'',
									trim_type:'',
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
//						var del_row = $('#fixed_table_fixedInput').datagrid('getSelected');
//						var del_rowIndex = $('#fixed_table_fixedInput').datagrid('getRowIndex',del_row);
//						$('#fixed_table_fixedInput').datagrid('deleteRow',del_rowIndex);
						$('#fixed_table_fixedInput').datagrid('deleteSelections');
					}
				}],
				
			    columns:[[
			        {field:'name',title:'名称',width:80,editor:{
			            type:'text'
			        }},    
			        {field:'type', title:'类型',width:180,editor:{
			            type:'combobox',
		            	options:{
		            		valueField: 'label',
		            		textField: 'value',
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
			        {field:'format',title:'格式',width:200,editor:{
			            type:'combobox',
			            options:{
			            	editable : false,
			            	valueField: 'text',    
			                textField: 'text',
			            },
			        }}, 
			        {field:'width',title:'宽度',width:60,editor:{
			            type:'text'
			        }}, 
			        {field:'length',title:'长度',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'precision',title:'精度',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'currency',title:'货币',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'decimal',title:'十进制',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'group',title:'组',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'trim_type',title:'去除空字符的方式',width:200,editor:{
			        	type:'combobox',
			        	options:{
		            		valueField: 'value',
		            		textField: 'label',
		            		data: [{
	                			label: '不去掉空格',
	                			value: 'none'
	                		},{
	                			label: '去掉做掉左侧空格',
	                			value: 'left'
	                		},{
	                			label: '去掉做掉右侧空格',
	                			value: 'right'
	                		},{
	                			label: '去掉左右两端空格',
	                			value: 'both'
	                		}],
			        	}   	
			        },
			        formatter: function(value, rowData, rowIndex) {
						if (value == 'none') {
							return '不去掉空格'
						}else if(value == 'left'){
							return '去掉做掉左侧空格'
						}else if(value == 'right'){
							return '去掉做掉右侧空格'
						}else if(value == 'both'){
							return  '去掉左右两端空格'
						}
					return '';
					}
			        }
			    ]],
			    onClickRow:function(i,r){
			    	  var rows=$(this).datagrid('getRows');
					  $.each(rows,function(j,o){
						j===i || $('#fixed_table_fixedInput').datagrid('endEdit',j);
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
			$('#fixedInput_ok').unbind('click').click(function(){//确定保存	
				try{
					console.log(node.getStep());
					var TableInput={};//定义一个TableInput的步骤
					
					var byte_tableInput_fixedInput=$('#byte_tableInput_fixedInput').textbox('getValue');//以字节数表示的行宽度(不包括回车符CR)
					TableInput.line_width=(byte_tableInput_fixedInput==null||byte_tableInput_fixedInput=='')?'':byte_tableInput_fixedInput;
					
					var big_or_small=$('#big_or_small_fixedInput').textbox('getValue');//NIO缓存大小
					TableInput.buffer_size=(big_or_small==null||big_or_small=='')?'':big_or_small;
					
					var line_feed = $("#line_feed_fixedInput").prop("checked")==true ? 'Y' : 'N'; //保留换行符?
					TableInput.line_feed = line_feed;
					
					var lazy_conversion = $("#transition_fixedInput").prop("checked")==true ? 'Y' : 'N';; //简易转换?
					TableInput.lazy_conversion = lazy_conversion;
					
					var header = $("#head_information_fixedInput").prop("checked")? 'Y' : 'N'; //保留头信息?
					TableInput.header = header;
					
					var parallel = $("#parallel_fixedInput").prop("checked")==true ? 'Y' : 'N'; //以平行的方式运行?
					TableInput.parallel = parallel;
					if($('#hidden_parallel_fixedInput').textbox('getValue') == '没有换行符'){
						TableInput.file_type = 'none';
					}else if($('#hidden_parallel_fixedInput').textbox('getValue') == 'Unix (1 字节)'){
						TableInput.file_type = 'UNIX';
					}else if($('#hidden_parallel_fixedInput').textbox('getValue') == 'MS-DOS (2 字节)'){
						TableInput.file_type = 'DOS';
					}else{
						TableInput.file_type = 'none';
					}

					var add_to_result_filenames = $("#file_listing_fixedInput").prop("checked")==true ? 'Y' : 'N'; //添加文件列表:
					TableInput.add_to_result_filenames = add_to_result_filenames;
					
					var encoding = $('#easyui-combobox-fixedInput').combobox('getValue');  //字符集编码
					TableInput.encoding =encoding;
					
					if($('#fixedInput_update').textbox('getValue')!=''){
						var filename = $('#fixedInput_update').textbox('getValue'); //获取文件名
						TableInput.filename =filename;
					}else{
						TableInput.filename = '';
					}
					
					var rows=$('#fixed_table_fixedInput').datagrid('getRows');//获取当前页面中所有的行
					$.each(rows,function(i,o){
						$('#fixed_table_fixedInput').datagrid('endEdit', i);//结束编辑所有行
					});
					var fields=Nasoft.GetProjectData.getFields('#fixed_table_fixedInput');//将对应数据字段加入表输出
					if(!!fields&&fields.field.constructor==Array){
						$.each(fields.field,function(i,o){//array
							if(o.length==""||o.length==null ){
								o.length=-1;
							}
							if(o.width==""||o.width==null){
								o.width=-1;
							}
							if(o.precision==""||o.precision==null){
								o.precision=-1;
							}
							if(o.type=="" ||o.type==null){
								o.type='None';
							}
							if(o.trim_type==""||o.trim_type==null){
								o.trim_type='none';
							}
						});
					}else if(!!fields){//object
						
						if(fields.field.length=="" ||fields.field.length==null){
							fields.field.length=-1;
						}
						if(fields.field.width==""||fields.field.width==null){
							fields.field.width=-1;
						}
						if(fields.field.precision==""||fields.field.precision==null){
							fields.field.precision=-1;
						}
						if(fields.field.type==""||fields.field.type==null){
							fields.field.type="None";
						}
						if(fields.field.trim_type==""||fields.field.trim_type==null){
							fields.field.trim_type="none";
						}
					}

					TableInput.fields=fields; 
					
					node.text=$('#step_name_fixedInput').textbox('getValue');//放入步骤名称
					node.setStep(TableInput);//放入node
					node.setTransfer();
	
				}catch(e){
					console.log(e)
				}
    			$('#FixedInput').window('close');
    		});//这个是确定保存按钮接受的位置	
			$('#fixedInput_preview').unbind('click').click(function(){
				$("#previewRows").textbox("setValue",'100');
					// 打开获取预览条数的窗口
					$("#rowsWin").window("open");		
			});
			$('#fixedInput_cancel').unbind('click').click(function(){//取消按钮
				$('#FixedInput').window('close');
			});
			// 取消预览条数
			$("#passPreviewRows").unbind('click').click(function(){
				// 关闭获取预览条数的窗口
				$("#rowsWin").window("close");
			});
			$("#getPreviewRows").unbind('click').click(function() {
				var path = $('#fixedInput_update').textbox('getValue');// 获取预览文件路径
				var rowsnumber = $("#previewRows").textbox('getValue');// 获取预览条数
				var rows=$("#fixed_table_fixedInput").datagrid('getRows'),//获取配置列表的所有行
				    table,//展示数据的表格
				    tabledata,
				    columns=[],//数据表格的列属性
				    col=[],
				    param=[],
				    myWindow,//弹出窗口
				    winOPtions,//弹出窗口的属性列表
				    tableOptions;//数据表格的属性列表
				columns.push(col);
				$.each(rows,function(i,o){
					var field={field:o.name,title:o.name,width:100} 
					col.push(field);//定义数据表格列属性
					//构造一个读取文件的参数
					param.push({name:o.name,width:o.width,trimType:o.trim_type});
				});
				// 请求数据表格的数据
				$.ajax({
				    url:$.getRootPath()+'/FixedInput/fixedInputPreView.do',
					async:false,
					data:{path:path,param:JSON.stringify(param),rows:rowsnumber},
					dataType:'json',
					type:'POST',
					success:function(data){
						console.log(data);
						tabledata=data;
					}
				});
				// 数据表格的参数
				tableOptions={
						data:tabledata,
						columns:columns,
						fit:true,
						rownumbers:true,
						singleSelect:true
				};
				// 弹出窗口的参数
				winOPtions={
						id:'tempwin',
						title:'预览数据',
						collapsible:false,
						minimizable:false,
						modal:true,
						width:800,
						height:500
				};
				// 创建一个弹出窗
				myWindow=Nasoft.Util.createWindow(winOPtions,function(win){
					table=document.createElement("table");
					table.setAttribute('id', 'temptable');
					// 将数据表格放入弹出窗
					win.appendChild(table);			
					//将窗口放入页面文档
					document.body.appendChild(win);
					$(win).window(winOPtions);
				});	
				$("#temptable").datagrid(tableOptions);
				$(myWindow).window('open');	
				// 关闭获取预览条数的窗口
				$("#rowsWin").window("close");
			});
			
		}catch(e){//这个是打开方法的try catch别搞混了。
			console.log(e)
		}
	},
	
    onBeforeClose=function(){//关闭	
		
	}
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
  
      			rowIndex = $('#fixed_table_fixedInput').datagrid('getRowIndex', $("#fixed_table_fixedInput").datagrid('getSelected'));
      			//得到编辑行的id
      			if(newValue=='Date'){
      				//方案1
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        		$(ed.target).combobox({ data:date ,valueField: "text", textField: "text"});	
      				//方案2    这个有问题
      				/*var option = $('#fixed_table_fixedInput').datagrid('options').columns[0][2];
      				var edi=new Object();
      				edi.type='combobox';
					edi.options={ data: date, valueField: "id", textField: "text" }
					option.editor=edi;
					$('#fixed_table_fixedInput').datagrid(option);*/
      			}else if(newValue=='Number'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='BigNumber'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue=='Integer'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
      			}else if(newValue =='String'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='InternetAddress'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Boolean'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Timestamp'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else if(newValue =='Binary'){
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
	        			$(ed.target).combobox({data:empty});
      			}else{
      				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
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
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
				$(ed.target).combobox({data:date ,valueField: "text", textField: "text"});
		}else if(newValue=='Number'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='BigNumber'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue=='Integer'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:number ,valueField: "text", textField: "text"});
			}else if(newValue =='String'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='InternetAddress'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Boolean'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Timestamp'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else if(newValue =='Binary'){
				var ed=$('#fixed_table_fixedInput').datagrid('getEditor',{index:rowIndex,field:'format'});
    			$(ed.target).combobox({data:empty});
			}else{
				return '';
			}
		return $(ed.target).combobox('getValue');
	}
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose};
}

      