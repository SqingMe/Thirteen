Nasoft.Window.fns.EVAL_FILES_METRICS=function(node){
	Nasoft.Ui_extend.browser_even('#EVAL_FILES_METRICS');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen=function(){
		try {
			$('#school_name_EVAL_FILES_METRICS').textbox('setValue',node.text);
			if(node.getEntry().result_filenames_wildcard ==''){
				$('#expression_unzip').textbox('setValue','');
			}else{
				$('#expression_unzip').textbox('setValue',node.getEntry().result_filenames_wildcard);
			}
			if(node.getEntry().Result_field_file ==''){
				$('#filejg_eval_files').textbox('setValue','');
			}else{
				$('#filejg_eval_files').textbox('setValue',node.getEntry().Result_field_file);
			}
			if(node.getEntry().Result_field_wildcard ==''){
				$('#expression_JIEGUOFILED_EVAL_FILES').textbox('setValue','');
			}else{
				$('#expression_JIEGUOFILED_EVAL_FILES').textbox('setValue',node.getEntry().Result_field_wildcard);
			}
			if(node.getEntry().Result_field_includesubfolders ==''){
				$('#BHZWJJGFILED_EVAL_METRICS').textbox('setValue','');
			}else{
				$('#BHZWJJGFILED_EVAL_METRICS').textbox('setValue',node.getEntry().Result_field_includesubfolders);
			}
			if(node.getEntry().comparevalue ==''){
				$('#number_EVAL_FILES_METRICS').textbox('setValue','');
			}else{
				$('#number_EVAL_FILES_METRICS').textbox('setValue',node.getEntry().comparevalue);
			}
			
			if(node.getEntry().minvalue ==''){
				$('#SIMPLE_EVAL_min').textbox('setValue','');
			}else{
				$('#SIMPLE_EVAL_min').textbox('setValue',node.getEntry().minvalue);
			}
			if(node.getEntry().maxvalue ==''){
				$('#SIMPLE_EVAL_max').textbox('setValue','');
			}else{
				$('#SIMPLE_EVAL_max').textbox('setValue',node.getEntry().maxvalue);
			}
			
				$('#file_catalogue_EVAL_FILES_METRICS').textbox('setValue','');
				$('#regular_expression_EVAL_FILES_METRICS').textbox('setValue','');
			
			
			
				 var evaluation_type = node.getEntry().evaluation_type;  //如果文件已存在
		    	 if(evaluation_type == 'size'){ 
		    		 node.getEntry().evaluation_type = '文件总大小';
		    	 }else if(evaluation_type =='count' ){
		    		 node.getEntry().evaluation_type = '全部文件数';
		    	 }
		    	 
		    	 
		    	 var scale = node.getEntry().scale;  //如果文件已存在
		    	 if(scale == 'bytes'){ 
		    		 node.getEntry().scale = '字节';
		    	 }else if(scale == 'kbytes'){
		    		 node.getEntry().scale= 'KB';
		    	 }else if(scale =='mbytes' ){
		    		 node.getEntry().scale = 'MB';
		    	 }else if(scale =='gbytes' ){
		    		 node.getEntry().scale = 'GB';
		    	 }
		    	 
		    	 
		    	 
		    	 var successnumbercondition = node.getEntry().successnumbercondition;  //如果文件已存在
		    	 if(successnumbercondition == 'equal'){ 
		    		 node.getEntry().successnumbercondition = '如果值等于';
		    	 }else if(successnumbercondition == 'smaller'){
		    		 node.getEntry().successnumbercondition = '如果值小于';
		    	 }else if(successnumbercondition =='greater' ){
		    		 node.getEntry().successnumbercondition = '如果值大于';
		    	 }else if(successnumbercondition =='inlist' ){
		    		 node.getEntry().successnumbercondition = '如果值在列表中';
		    	 }else if(successnumbercondition =='notinlist' ){
		    		 node.getEntry().successnumbercondition = '如果值不在列表中';
		    	 }else if(successnumbercondition =='smallequal' ){
		    		 node.getEntry().successnumbercondition = 'If value is smaller or equal';
		    	 }else if(successnumbercondition =='greaterequal' ){
		    		 node.getEntry().successnumbercondition = 'If value is greater or equal';
		    	 }else if(successnumbercondition =='between' ){
		    		 node.getEntry().successnumbercondition = 'If value is between';
		    	 }
		    	 
		    	 
		    	 
		    	 
		    	 
		    	 
		    	 
		    	 var source_files = node.getEntry().source_files;  //如果文件已存在
		    	 if(source_files == 'files'){ 
		    		 node.getEntry().source_files = '文件/文件夹';
		    		 
		    	 }else if(source_files == 'filenamesresult'){
		    		 node.getEntry().source_files = '文件名结果集';
		    	 }else if(source_files =='previousresult' ){
		    		 node.getEntry().source_files = '上一步结果行';
		    	 }
		    	 
		    		
					$('#PINGGU_ECAL_FALES').combobox({ //   
						onLoadSuccess:function(){
							var connectionName;
							/**
							 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
							 * 否则去直接获取connection的Name选中对应项,
							 * 若没有则不选中任何
							 */
							connectionName=(node.getEntry().evaluation_type!='')?node.getEntry().evaluation_type:'';
							connectionName!='' && $(this).combobox('select',connectionName);
						 	var contra=node.getEntry().successnumbercondition;
							if(connectionName == '文件总大小'){
								 $("#EVAL_FILES_table").show();
								 if(contra == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
								
					    	 }else if(connectionName == '全部文件数'){
					    		 $("#EVAL_FILES_table").hide(); 
					    	
					    		 if(contra == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
					    	 }
						 	
						
						},
						onSelect:function(){
							var control=	$(this).combobox('getValue');
							
	                       	var contra=$("#control_coding_EVAL_FILES_METRICS").combobox('getValue');
							
							if(control == '文件总大小'){
								 $("#EVAL_FILES_table").show();
								 if(contra == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
								
					    	 }else if(control == '全部文件数'){
					    		 $("#EVAL_FILES_table").hide(); 
					    	
					    		 if(contra == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
					    	 }
							
								 
							}
						
					});
					
					
					$('#danwei_EVAL_FILES_METRICS').combobox({ //   
						onLoadSuccess:function(){
							var connectionName;
							/**
							 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
							 * 否则去直接获取connection的Name选中对应项,
							 * 若没有则不选中任何
							 */
							connectionName=(node.getEntry().scale!='')?node.getEntry().scale:'';
							connectionName!='' && $(this).combobox('select',connectionName);
						},
					});
					
					
					$('#control_coding_EVAL_FILES_METRICS').combobox({ //   
						onLoadSuccess:function(){
							var connectionName;
							/**
							 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
							 * 否则去直接获取connection的Name选中对应项,
							 * 若没有则不选中任何
							 */
							connectionName=(node.getEntry().successnumbercondition!='')?node.getEntry().successnumbercondition:'';
							connectionName!='' && $(this).combobox('select',connectionName);
                            var contra=node.getEntry().evaluation_type;
                        	if(contra == '文件总大小'){
								 $("#EVAL_FILES_table").show();
								 if(connectionName == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
								
					    	 }else if(contra == '全部文件数'){
					    		 $("#EVAL_FILES_table").hide(); 
					    	
					    		 if(connectionName == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
					    	 }
						},
						onSelect:function(){
							var control=	$(this).combobox('getValue');
							var contra=$("#PINGGU_ECAL_FALES").combobox('getValue');
							
							if(contra == '文件总大小'){
								 $("#EVAL_FILES_table").show();
								 if(control == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
								
					    	 }else if(contra == '全部文件数'){
					    		 $("#EVAL_FILES_table").hide(); 
					    	
					    		 if(control == 'If value is between'){
						    		 $("#number_EVAL_tr_max").show();
									 $("#number_EVAL_tr_min").show();
									 $("#number_EVAL_tr").hide(); 
						    	 }else{
						    		 $("#number_EVAL_tr").show();
						    		 $("#number_EVAL_tr_max").hide(); 
									 $("#number_EVAL_tr_min").hide(); 
						    	 }
					    	 }
							
							 
						}
					});
					
			
			
			$('#ORIFILE_ECAL_FALES').combobox({ //   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getEntry().source_files!='')?node.getEntry().source_files:'';
					connectionName!='' && $(this).combobox('select',connectionName);
					
					 if(connectionName == '文件/文件夹'){
						 $('#expression_unzip').textbox({disabled:true});
						 $('#filejg_eval_files').textbox({disabled:true});
						 $('#expression_JIEGUOFILED_EVAL_FILES').textbox({disabled:true});
						 $('#BHZWJJGFILED_EVAL_METRICS').textbox({disabled:true});
			    	 }else if(connectionName == '文件名结果集'){
			    		 $('#expression_unzip').textbox({disabled:false});
						 $('#filejg_eval_files').textbox({disabled:true});
						 $('#expression_JIEGUOFILED_EVAL_FILES').textbox({disabled:true});
						 $('#BHZWJJGFILED_EVAL_METRICS').textbox({disabled:true});
			    	 }else if(connectionName== '上一步结果行'){
			    		 $('#expression_unzip').textbox({disabled:true});
						 $('#filejg_eval_files').textbox({disabled:false});
						 $('#expression_JIEGUOFILED_EVAL_FILES').textbox({disabled:false});
						 $('#BHZWJJGFILED_EVAL_METRICS').textbox({disabled:false});
			    	 }
					
					
				},
				onSelect:function(){
				var control=	$(this).combobox('getValue');
				
					 if(control == '文件/文件夹'){
						 $('#expression_unzip').textbox({disabled:true});
						 $('#filejg_eval_files').textbox({disabled:true});
						 $('#expression_JIEGUOFILED_EVAL_FILES').textbox({disabled:true});
						 $('#BHZWJJGFILED_EVAL_METRICS').textbox({disabled:true});
			    	 }else if(control == '文件名结果集'){
			    		 $('#expression_unzip').textbox({disabled:false});
						 $('#filejg_eval_files').textbox({disabled:true});
						 $('#expression_JIEGUOFILED_EVAL_FILES').textbox({disabled:true});
						 $('#BHZWJJGFILED_EVAL_METRICS').textbox({disabled:true});
			    	 }else if(control== '上一步结果行'){
			    		 $('#expression_unzip').textbox({disabled:true});
						 $('#filejg_eval_files').textbox({disabled:false});
						 $('#expression_JIEGUOFILED_EVAL_FILES').textbox({disabled:false});
						 $('#BHZWJJGFILED_EVAL_METRICS').textbox({disabled:false});
			    	 }
				
				}
			});
			
		 	 $("#EVAL_FILES_METRICS_table").datagrid({
		 		data:!!node.getEntry().fields&&node.getEntry().fields.field?{total:1, rows :$.isArray(node.getEntry().fields.field)?
						node.getEntry().fields.field:[node.getEntry().fields.field]}:{total:0,rows:[]},
		 		 singleSelect:true,
			 	 	toolbar:
			 	 		[{
	    					iconCls: 'icon-add',
	    					text:"增加",
	    					handler: function(){
	    						$("#EVAL_FILES_METRICS_table").datagrid("appendRow",{
	    							source_filefolder:"",
	    							wildcard:"",
	    							include_subFolders:"N"
                                     });
	    					}
	    				},{
					iconCls: 'icon-remove',
					text:"删除",
					handler: function(){
						var select = $("#EVAL_FILES_METRICS_table").datagrid("getSelected");
    			 	 	var index = $("#EVAL_FILES_METRICS_table").datagrid("getRowIndex",select);
    			 	 	$("#EVAL_FILES_METRICS_table").datagrid("deleteRow",index)
					}
				}
			 	 	],
			 	 		columns:[[
			 	 		 {field : "source_filefolder",
			 	 		 title : "源文件/文件夹",
			 	 		 align : "center",
			 	 		 width : 100,
			 	 		 editor : {
			 	 		 	type : "text"
			 	 		 }
			 	 		},
			 	 		{field : "wildcard",
			 	 		 title : "通配符",
			 	 		 align : "center",
			 	 		 width : 100,
			 	 		 editor : {
			 	 		 	type : "text"
			 	 		 }
			 	 		},
			 	 		{field : "include_subFolders",
			 	 		 title : "包含子文件夹",
			 	 		 align : "center",
			 	 		 width : 100,
			 	 		 editor : {
			 	 		 	type : "combobox",
			 	 		 	options : {
			            		valueField: 'value',
			            		textField: 'label',
			            		editable : false,
			            		data: [{
		                			label: '是',
		                			value: 'Y'
		                		},{
		                			label: '否',
		                			value: 'N'
		                		}]
				        	} 	
			 	 		 },
				 	 		formatter:function(value, rowData, rowIndex){
								if (value=='Y') {
									return value='是';
								}else{
									return value='否';
								}
			 	 		}  
			 	 		}
			 	 		]],
			 	 		onClickCell : function(index,field,value){
			 	 			var rows = $(this).datagrid("getRows");
	    			 	 	$.each(rows,function(i,o){
	    			 	 		$("#EVAL_FILES_METRICS_table").datagrid("endEdit",i);
	    			 	 	});
	    			 	 	$(this).datagrid("beginEdit",index);
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
		 	 
		 	$('#EVAL_FILES_METRICS_browse').unbind('click').click(function(){	//浏览
				Nasoft.Static.handleFilePostfix('#file_catalogue_EVAL_FILES_METRICS','#file_catalogue_h_EVAL_FILES_METRICS',{},'3','');
			});
			
		 	$('#EVAL_FILES_METRICS_increase').unbind('click').click(function(){//点击添加事件	
				var file_catalogue_EVAL_FILES_METRICS = $('#file_catalogue_EVAL_FILES_METRICS').textbox('getValue')
				var regular_expression_EVAL_FILES_METRICS = $('#regular_expression_EVAL_FILES_METRICS').textbox('getValue')
					$('#EVAL_FILES_METRICS_table').datagrid('insertRow',{
						row: {
							source_filefolder:file_catalogue_EVAL_FILES_METRICS, 
							wildcard:regular_expression_EVAL_FILES_METRICS,
							include_subFolders:'否',
						}
					});
				});
		
		 	
		 	
		 	
		 	
		 	
		 	
			//确定
			$('#EVAL_FILES_METRICS_ok').unbind('click').click(function(e){ //确定保存

			     try {
			    	 var entry = {};
			    	 node.text=$('#school_name_EVAL_FILES_METRICS').textbox('getValue');//放入步骤名称
			    	 entry.result_filenames_wildcard=$('#expression_unzip').textbox('getValue');//放入步骤名称
			    	 entry.Result_field_file=$('#filejg_eval_files').textbox('getValue');//放入步骤名称
			    	 entry.Result_field_wildcard=$('#expression_JIEGUOFILED_EVAL_FILES').textbox('getValue');//放入步骤名称
			    	 entry.Result_field_includesubfolders=$('#BHZWJJGFILED_EVAL_METRICS').textbox('getValue');//放入步骤名称
			    	 entry.comparevalue=$('#number_EVAL_FILES_METRICS').textbox('getValue');//放入步骤名称
			    	 entry.minvalue = $("#SIMPLE_EVAL_min").textbox("getValue");
			    	 entry.maxvalue = $("#SIMPLE_EVAL_max").textbox("getValue");
			    	 
			    	 var evaluation_type = $('#PINGGU_ECAL_FALES').combobox('getValue');  
			    	 if(evaluation_type == '文件总大小'){ 
			    		 entry.evaluation_type ='size' ;
			    	 }else if(evaluation_type =='全部文件数' ){
			    		 entry.evaluation_type = 'count';
			    	 }
			    	 
			    	 
			    	 var scale =  $('#danwei_EVAL_FILES_METRICS').combobox('getValue'); 
			    	 if(scale == '字节'){ 
			    		 entry.scale = 'bytes';
			    	 }else if(scale =='KB' ){
			    		 entry.scale= 'kbytes';
			    	 }else if(scale =='MB' ){
			    		 entry.scale = 'mbytes';
			    	 }else if(scale =='GB'){
			    		 entry.scale = 'gbytes' ;
			    	 }
			    	 
			    	 
			    	 
			    	 var successnumbercondition = $('#control_coding_EVAL_FILES_METRICS').combobox('getValue'); 
			    	 if(successnumbercondition == '如果值等于'){ 
			    		 entry.successnumbercondition = 'equal';
			    	 }else if(successnumbercondition == '如果值小于'){
			    		 entry.successnumbercondition = 'smaller';
			    	 }else if(successnumbercondition == 'greater'){
			    		 entry.successnumbercondition = '如果值大于';
			    	 }else if(successnumbercondition =='如果值在列表中'){
			    		 entry.successnumbercondition = 'inlist' ;
			    	 }else if(successnumbercondition == '如果值不在列表中'){
			    		 entry.successnumbercondition = 'notinlist';
			    	 }else if(successnumbercondition =='If value is smaller or equal' ){
			    		 entry.successnumbercondition = 'smallequal';
			    	 }else if(successnumbercondition =='If value is greater or equal' ){
			    		 entry.successnumbercondition = 'greaterequal';
			    	 }else if(successnumbercondition == 'If value is between'){
			    		 entry.successnumbercondition = 'between';
			    	 }
			    	 var source_files =$('#ORIFILE_ECAL_FALES').combobox('getValue'); 
			    	 if(source_files == '文件/文件夹'){ 
			    		 entry.source_files = 'files';
			    		 
			    	 }else if(source_files ==  '文件名结果集'){
			    		 entry.source_files ='filenamesresult';
			    	 }else if(source_files =='上一步结果行'){
			    		 entry.source_files = 'previousresult' ;
			    	 }
			    	 
			    	 var rows=$('#EVAL_FILES_METRICS_table').datagrid('getRows');//获取当前页面中所有的行
						$.each(rows,function(i,o){
							$('#EVAL_FILES_METRICS_table').datagrid('endEdit', i);//结束编辑所有行
						});
						var fields=Nasoft.GetProjectData.getFields('#EVAL_FILES_METRICS_table');//将对应数据字段加入表输出
						
						if(!!fields&&fields.field.constructor==Array){//数组
							$.each(fields.field,function(i,o){
								if(o.include_subFolders ==''||o.include_subFolders==null){
									o.set_empty_string ='N'
								}
							});
						}else if(!!fields){//对象
							if(fields.field.include_subFolders ==''||fields.field.include_subFolders==null){
								fields.field.set_empty_string ='N'
							}
						}
						
						
						entry.fields=fields;  
			    	 
			    	 
			    	 
			    	 
			    	 node.setEntry(entry);
					} catch (e) {
						console.log(e)
					}
				$('#EVAL_FILES_METRICS').window('close');
			});
			$('#EVAL_FILES_METRICS_cancel').unbind("click").click(function(){
				$('#EVAL_FILES_METRICS').window('close');
			});
		} catch (e) {
			console.log(e)
		}
	};
	onBeforeClose=function(){}//关闭
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}