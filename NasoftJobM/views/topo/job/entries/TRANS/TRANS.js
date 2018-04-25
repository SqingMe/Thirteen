Nasoft.Window.fns.TRANS=function(node){
				Nasoft.Ui_extend.browser_even('#TRANS');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose;
		    	onBeforeOpen=function(){
		    		
		    		try {
		    			console.log(node)
						$('#step_name_TRANS').textbox('setValue',node.text);
						//*******************转换设置*********************
						//$('#filename_TRANS').textbox('setValue',node.step?node.step.filename?node.step.filename:'':'');
						if(node.getEntry().filename==undefined){
							$('#filename_TRANS').textbox('setValue','');
						}else{
							$('#filename_TRANS').textbox('setValue',node.getEntry().filename);
						}
						if(node.getEntry().filename_h==undefined){
							$('#TRANS_transition_h').val('');
						}else{
							$('#TRANS_transition_h').val(node.getEntry().filename_h);
						}
						//$('#filename_TRANS').textbox('readonly',true);//设置只读  
						var  file_path= Nasoft.Topo.getSelectedTab().project().file_path;
                        $('#TRANS_transition').unbind('click').click(function(e) { // 点击转换							
                        	Nasoft.Static.handleFilePostfix('#filename_TRANS','#TRANS_transition_h',{},'1',file_path);
						});
                        $('#TRANS_transition_open').unbind('click').click(function(e){//编辑按钮
            				var filename=$('#TRANS_transition_h').val();
            				if(filename){
            					Nasoft.Project.openProject(filename);
            				}
            				$('#TRANS').window('close');
            			});
//                        $('#TRANS_transformation').unbind('click').click(function(e) { //点击 New transformation						
//                        	$('#set_data_win').window('open');
// 	
//						});
                       
						
						//*******************高级*********************
						if(node.getEntry().arg_from_previous==='Y'){//复制上一步结果到位置参数
							$("#TRANS_copy_location").get(0).checked=true
							
						}else if(node.getEntry().arg_from_previous==='N'){
							$("#TRANS_copy_location").get(0).checked=false
						}else{
							$("#TRANS_copy_location").get(0).checked=false
						}
						
						
						if(node.getEntry().params_from_previous==='Y'){//复制上一步结果到命名参数
							$("#TRANS_copy_name").get(0).checked=true
							
						}else if(node.getEntry().params_from_previous==='N'){
							$("#TRANS_copy_name").get(0).checked=false
						}else{
							$("#TRANS_copy_name").get(0).checked=false
						}
						
						if(node.getEntry().exec_per_row==='Y'){//执行每一个输入行
							$("#TRANS_input_line").get(0).checked=true
							
						}else if(node.getEntry().exec_per_row==='N'){
							$("#TRANS_input_line").get(0).checked=false
						}else{
							$("#TRANS_input_line").get(0).checked=false
						}
						
						if(node.getEntry().clear_rows==='Y'){//在执行前清除结果行列表
							$("#TRANS_result_listing").get(0).checked=true
							
						}else if(node.getEntry().clear_rows==='N'){
							$("#TRANS_result_listing").get(0).checked=false
						}else{
							$("#TRANS_result_listing").get(0).checked=false
						}
						
						if(node.getEntry().clear_files==='Y'){//在执行前清除结果文件列表
							$("#TRANS_result_file").get(0).checked=true
							
						}else if(node.getEntry().clear_files==='N'){
							$("#TRANS_result_file").get(0).checked=false
						}else{
							$("#TRANS_result_file").get(0).checked=false
						}
						
						if(node.getEntry().cluster==='Y'){//在集群模式下运行这个转换
							$("#TRANS_colony_transform").get(0).checked=true;
							$('#TRANS_locally').prop('disabled', false);
							$('#long_distance_server').combobox('disable');
						}else if(node.getEntry().cluster==='N'){
							$("#TRANS_colony_transform").get(0).checked=false;
							$('#TRANS_locally').prop('disabled', true);
							$('#long_distance_server').combobox('enable');
						}else{
							$("#TRANS_colony_transform").get(0).checked=false;
							$('#TRANS_locally').prop('disabled', true);
							$('#long_distance_server').combobox('enable');
						}
						
						if(node.getEntry().logging_remote_work==='Y'){//Log remote execution locally
							$("#TRANS_locally").get(0).checked=true
							
						}else if(node.getEntry().logging_remote_work==='N'){
							$("#TRANS_locally").get(0).checked=false
						}else{
							$("#TRANS_locally").get(0).checked=false
						}
						
						$('#TRANS_colony_transform').unbind('click').click(function(e) {//点击在集群模式下运行这个转换
							
							if ($('#TRANS_colony_transform').get(0).checked) {
							
								$('#TRANS_locally').prop('disabled', false);
								$('#long_distance_server').combobox('disable');
								
							} else {
								
								$('#TRANS_locally').prop('disabled', true);
								 $('#long_distance_server').combobox('enable');
								
							}
						})
						
						if(node.getEntry().slave_server_name==undefined){
							$('#long_distance_server').combobox('setValue','');
						}else{
							$('#long_distance_server').combobox('setValue',node.getEntry().slave_server_name);
						}
						
						function distance_server(){//自定义方法 
						var long_distance_server=$('#long_distance_server').combobox('getValue');//获取远程从服务器的值
							if(long_distance_server==null||long_distance_server==''){
								$('#TRANS_finish').prop('disabled', true);
								$('#TRANS_stop').prop('disabled', true);
							}else{
								
								$('#TRANS_finish').prop('disabled', false);
								if($('#TRANS_finish').get(0).checked){
									$('#TRANS_stop').prop('disabled', false);
								}else{
									
									$('#TRANS_stop').prop('disabled', true);
								}
							}
							
						}
						if(node.getEntry().wait_until_finished==='Y'){//等待远程转换执行结束
							$("#TRANS_finish").get(0).checked=true;
							distance_server();
						}else if(node.getEntry().wait_until_finished==='N'){
							$("#TRANS_finish").get(0).checked=false;
							distance_server()
						}else{
							$("#TRANS_finish").get(0).checked=true;
							distance_server()
						}
						if(node.getEntry().follow_abort_remote==='Y'){//本地转换终止时远程转换也通知终止
							$("#TRANS_stop").get(0).checked=true;
							
						}else if(node.getEntry().follow_abort_remote==='N'){
							$("#TRANS_stop").get(0).checked=false;
							
						}else{
							$("#TRANS_stop").get(0).checked=false;
							
						}

			            $('#TRANS_finish').unbind('click').click(function(e) {//点击等待远程转换执行结束
			            	distance_server();
			            	
			            	
			          })
						
						// *******************设置日志*********************
						$('#TRANS_log_rank').combobox({//日志级别
		    				editable: false,
	    					valueField: 'value',
	    					textField: 'label',
	    					value:'Basic',
	    					data: [{
	    						label: '没有日志',
	    						value: 'Nothing'
	    					},{
	    						label: '错误日志',
	    						value: 'Error'
	    					},{
	    						label: '最小日志',
	    						value: 'Minimal'
	    					},{
	    						label: '基本日志',
	    						value: 'Basic'
	    					},{
	    						label: '详细日志',
	    						value: 'Detailed'
	    					},{
	    						label: '调试',
	    						value: 'Debug'
	    					},{
	    						label: '行级日志(非常详细)',
	    						value: 'Rowlevel'
	    					}]});
						function TRANS_appoint(){
							
							if($('#TRANS_appoint_file').get(0).checked){//指定日志文件
	    						
    							$('#TRANS_add_file_trail').prop('disabled', false);
    							$('#TRANS_father_folder').prop('disabled', false);
    							$('#TRANS_log_date').prop('disabled', false);
    							$('#TRANS_log_time').prop('disabled', false);
    							$('#TRANS_log_rank').combobox('enable');
    							$('#TRANS_browse').linkbutton('enable');
    							$('#TRANS_log_file_name').textbox('enable');
    							$('#TRANS_file_postfix').textbox('enable');
    						}else{
    							
    							$('#TRANS_add_file_trail').prop('disabled', true);
    							$('#TRANS_father_folder').prop('disabled', true);
    							$('#TRANS_log_date').prop('disabled', true);
    							$('#TRANS_log_time').prop('disabled', true);
    							$('#TRANS_log_rank').combobox('disable');
    							$('#TRANS_browse').linkbutton('disable');
    							$('#TRANS_log_file_name').textbox('disable');
    							$('#TRANS_file_postfix').textbox('disable');
    						}
							
							
						}
						
						
						if(node.getEntry().set_logfile==='Y'){//指定日志文件
							$("#TRANS_appoint_file").get(0).checked=true;
							TRANS_appoint();
							
						}else if(node.getEntry().set_logfile==='N'){
							$("#TRANS_appoint_file").get(0).checked=false;
							TRANS_appoint();
						}else{
							$("#TRANS_appoint_file").get(0).checked=false;
							TRANS_appoint();
						}
                        $('#TRANS_appoint_file').unbind('click').click(function(e){
                        	
                        	
                        	TRANS_appoint();

		    			});
						if(node.getEntry().set_append_logfile==='Y'){//添加到日志文件尾
							$("#TRANS_add_file_trail").get(0).checked=true
							
						}else if(node.getEntry().set_append_logfile==='N'){
							$("#TRANS_add_file_trail").get(0).checked=false
						}else{
							$("#TRANS_add_file_trail").get(0).checked=false
						}
						
						if(node.getEntry().create_parent_folder==='Y'){//创建父文件夹
							$("#TRANS_father_folder").get(0).checked=true
							
						}else if(node.getEntry().create_parent_folder==='N'){
							$("#TRANS_father_folder").get(0).checked=false
						}else{
							$("#TRANS_father_folder").get(0).checked=false
						}
						
						if(node.getEntry().add_date==='Y'){//日志文件包含日期
							$("#TRANS_log_date").get(0).checked=true
							
						}else if(node.getEntry().add_date==='N'){
							$("#TRANS_log_date").get(0).checked=false
						}else{
							$("#TRANS_log_date").get(0).checked=false
						}
						
						if(node.getEntry().add_time==='Y'){//日志文件包含时间
							$("#TRANS_log_time").get(0).checked=true
							
						}else if(node.getEntry().add_time==='N'){
							$("#TRANS_log_time").get(0).checked=false
						}else{
							$("#TRANS_log_time").get(0).checked=false
						}
						if(node.getEntry().logfile==undefined){//日志文件名
							$('#TRANS_log_file_name').textbox('setValue','');
						}else{
							$('#TRANS_log_file_name').textbox('setValue',node.getEntry().logfile);
						}
						
						if(node.getEntry().logext==undefined){//日志文件后缀名
							$('#TRANS_file_postfix').textbox('setValue','');
						}else{
							$('#TRANS_file_postfix').textbox('setValue',node.getEntry().logext);
						}
						$('#TRANS_browse').unbind('click').click(function(e) { // 点击浏览
							
							Nasoft.Static.handleFile('#log_file_name','#TRANS_browse_h',{});
						});
					
						if(node.getEntry().loglevel){//日志级别的值
	                    	  $('#TRANS_log_rank').combobox('setValue',node.getEntry().loglevel);
	
	                      }else{
	                    	  
	                    	  $('#TRANS_log_rank').combobox('setValue','Basic');
	                      }
						 //*******************位置参数*********************
						

						var vData =node.getEntry();
						console.log(node.getEntry())
						if (vData != "") {
							var nPos =[];						
							var i=0;
								for ( var key in vData) {
									//var keystr=key.substring(0,8);
									if (key.indexOf('argument')>-1) {//获取跟argument匹配的标签存进数组中
										nPos[i] ={argument:vData[key]};
										i++;
									}
									
								}	
		    		      }
						$('#positional_arguments_table').datagrid({//设置表格属性
							data:nPos,
									
		    						columns : [ [ {
		    							field : 'argument',
		    							title : '位置参数',
		    							width : 40,
		    							editor : {
		    								type : 'text'
		    							}
		    						} ] ],
		    	    		rownumbers:true,
		    				fitColumns:true,
		    				singleSelect:true,
		    				fit:true,
		    				toolbar: [{
		    					iconCls: 'icon-add',
		    					text : "新增",
		    					handler: function(){
		    						$('#positional_arguments_table').datagrid(
		    							'appendRow',//新增空行
		    							{
		    								argument:'',
		    							}
		    						);
		    					}
		    				},{
								text : "删除",
								iconCls : 'icon-remove',
								handler : function() {
									var del_row = $('#positional_arguments_table').datagrid('getSelected');
									var del_rowIndex = $('#positional_arguments_table').datagrid('getRowIndex',del_row);
									$('#positional_arguments_table').datagrid('deleteRow',del_rowIndex);
								}
							}
		    				],  
		    				onDblClickCell: function(index,field,value){
		    					
		    					var rows=$(this).datagrid('getRows');
		    					$.each(rows,function(j,o){
		    						j===index || $('#positional_arguments_table').datagrid('endEdit',j);
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
						
						//*******************命名参数*********************
						if(node.getEntry().parameters&&node.getEntry().parameters.pass_all_parameters==='Y'){//将所有参数值都传递到子转换
							$("#TRANS_conversion").get(0).checked=true
						}else if(node.getEntry().parameters&&node.getEntry().parameters.pass_all_parameters==='N'){
							$("#TRANS_conversion").get(0).checked=false
						}else{
							$("#TRANS_conversion").get(0).checked=true
						}
						
						
						$('#TRANS_parameter_table').datagrid({//命名参数表
							   rownumbers:true,
		    				   fitColumns:true,
		    				   singleSelect:true,
		    				   fit:true,
							   data:!!node.getEntry().parameters&&node.getEntry().parameters.parameter?{total:1, rows :$.isArray(node.getEntry().parameters.parameter)?
										node.getEntry().parameters.parameter:[node.getEntry().parameters.parameter]}:{total:0,rows:[]},
										toolbar: [{
					    					iconCls: 'icon-add',
					    					text : "新增",
					    					handler: function(){
					    						$('#TRANS_parameter_table').datagrid(
					    							'appendRow',//新增空行
					    							{
					    								name:'',
					    								stream_name:'',
					    								value:'',
					    							}
					    						)
					    					}
					    				},{
											text : "删除",
											iconCls : 'icon-remove',
											handler : function() {
												var del_row = $('#TRANS_parameter_table').datagrid('getSelected');
												var del_rowIndex = $('#TRANS_parameter_table').datagrid('getRowIndex',del_row);
												$('#TRANS_parameter_table').datagrid('deleteRow',del_rowIndex);
											}
										}], 
										columns : [[{
		    							field : 'name',
		    							title : '命名参数',
		    							width : 60,
		    							editor : {
		    								type : 'text'
		    							}
		    						},{
		    							field : 'stream_name',
		    							title : '流列名',
		    							width : 60,
		    							editor : {
		    								type : 'text'
		    							}
		    						},{
		    							field : 'value',
		    							title : '值',
		    							width : 60,
		    							editor : {
		    								type : 'text'
		    							}
		    						}]],
		    				onDblClickCell: function(index,field,value){
		    					
		    					var rows_c=$(this).datagrid('getRows');
		    					$.each(rows_c,function(j,o){
		    						j===index || $('#TRANS_parameter_table').datagrid('endEdit',j);
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
						
		    		
						//取消
		    			$('#TRANS_tableInput_cancel').unbind('click').click(function(e){
		    				
		    				$('#TRANS').window('close');	
		    			});
		    			//确定
						$('#TRANS_tableInput_ok').unbind('click').click(function(e){
							if($('#filename_TRANS').textbox('getValue')!=null&&$('#filename_TRANS').textbox('getValue')!=''){
			                	 var TRANS={};
			                	 var entryname =$('#step_name_TRANS').textbox('getValue');//步骤名称
			                	 node.text= entryname;
			                	 TRANS.filename=$('#filename_TRANS').textbox('getValue');
			                	 TRANS.filename_h=$('#TRANS_transition_h').val();
			                	 //*******************高级*********************
			                	 TRANS.arg_from_previous= $("#TRANS_copy_location").prop("checked")==true ? 'Y' : 'N'; //复制上一步结果到位置参数
			                	 TRANS.params_from_previous= $("#TRANS_copy_name").prop("checked")==true ? 'Y' : 'N';//复制上一步结果到命名参数
			                	 TRANS.exec_per_row= $("#TRANS_input_line").prop("checked")==true ? 'Y' : 'N';//执行每一个输入行
			                	 TRANS.clear_rows= $("#TRANS_result_listing").prop("checked")==true ? 'Y' : 'N';//在执行前清除结果行列表
			                	 TRANS.clear_files= $("#TRANS_result_file").prop("checked")==true ? 'Y' : 'N';//在执行前清除结果文件列表
			                	 TRANS.cluster= $("#TRANS_colony_transform").prop("checked")==true ? 'Y' : 'N';//在集群模式下运行这个转换
			                	 TRANS.logging_remote_work= $("#TRANS_locally").prop("checked")==true ? 'Y' : 'N';//Log remote execution locally
			                	 TRANS.slave_server_name=$('#long_distance_server').combobox('getValue');//远程从服务器
			                	 TRANS.wait_until_finished= $("#TRANS_finish").prop("checked")==true ? 'Y' : 'N';//等待远程转换执行结束
			                	 TRANS.follow_abort_remote= $("#TRANS_stop").prop("checked")==true ? 'Y' : 'N';//本地转换终止时远程转换也通知终止
			                	 //*******************设置日志*********************
			                	 TRANS.set_logfile= $("#TRANS_appoint_file").prop("checked")==true ? 'Y' : 'N'; //指定日志文件
			                	 TRANS.set_append_logfile= $("#TRANS_add_file_trail").prop("checked")==true ? 'Y' : 'N';//添加到日志文件尾
			                	 TRANS.create_parent_folder= $("#TRANS_father_folder").prop("checked")==true ? 'Y' : 'N';//创建父文件夹
			                	 TRANS.add_date= $("#TRANS_log_date").prop("checked")==true ? 'Y' : 'N';//日志文件包含日期
			                	 TRANS.add_time= $("#TRANS_log_time").prop("checked")==true ? 'Y' : 'N';//日志文件包含时间
			                	 TRANS.logfile=$('#TRANS_log_file_name').textbox('getValue');//日志文件名
			                	 TRANS.logext=$('#TRANS_file_postfix').textbox('getValue');//日志文件后缀名
			                	 TRANS.loglevel=$('#TRANS_log_rank').combobox('getValue');//日志级别
			                	 //*******************位置参数*********************
			                	var rows_a = $('#positional_arguments_table').datagrid('getRows');// 获取位置参数页面中所有的行
			          			$.each(rows_a, function(i, o) {
			          				$('#positional_arguments_table').datagrid('endEdit', i);// 结束编辑所有行
			          			});
			           			var positional_arguments_table=Nasoft.GetProjectData.getFields('#positional_arguments_table');
			           			
			           			if(positional_arguments_table!=""&&$.isArray(positional_arguments_table.field)){//数组

			        				$.each(positional_arguments_table.field,function(i,o){
			        					
			        					TRANS['argument'+i]=o.argument;//将每个字段的值存入转换对象中
			 
			        				});
			        				
			        			    }else if(positional_arguments_table!=""){//对象
			        			    	TRANS.argument0=positional_arguments_table.field.argument;
			        			}

			                	//*******************命名参数*********************
			                	
			           			var rows_b = $('#TRANS_parameter_table').datagrid('getRows');// 获取当前页面中所有的行
			         			$.each(rows_b, function(i, o) {
			         				$('#TRANS_parameter_table').datagrid('endEdit', i);// 结束编辑所有行
			         			});
			          			var TRANS_parameter_table=Nasoft.GetProjectData.getFields('#TRANS_parameter_table');
			          			
			          				if(TRANS_parameter_table!=null&&TRANS_parameter_table!=''){
			          					TRANS.parameters={};
			          					TRANS.parameters.parameter=TRANS_parameter_table.field;	
			          					TRANS.parameters.pass_all_parameters= $("#TRANS_conversion").prop("checked")==true ? 'Y' : 'N'; //将所有参数值都传递到子转换
			          				}
			                	 node.setEntry(TRANS);
			                	 $('#TRANS').window('close');
			          			}else{
			          				$.messager.alert('系统信息','请选择你的转换文件','info');

			          			}
						});
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    		
		    	};
		    	onBeforeClose=function(){
                 try {
                
//                	 console.log(node.getEntry())
					} catch (e) {
						// TODO: handle exception
						console.log(e)
					}
		    	}
		    	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}