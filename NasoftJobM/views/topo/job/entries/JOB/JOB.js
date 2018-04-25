Nasoft.Window.fns.JOB=function(node){
				Nasoft.Ui_extend.browser_even('#JOB');//限制组件不能超出浏览器上边缘
	
		    	var onBeforeOpen,onBeforeClose;
		    	onBeforeOpen=function(){
		    		
		    		try {
		    			console.log(node)
						$('#step_name_JOB').textbox('setValue',node.text);
						//*******************转换设置*********************
						//$('#filename_TRANS').textbox('setValue',node.step?node.step.filename?node.step.filename:'':'');
						if(node.getEntry().filename==undefined){
							$('#filename_JOB').textbox('setValue','');
						}else{
							$('#filename_JOB').textbox('setValue',node.getEntry().filename);
						}
						if(node.getEntry().filename_h==undefined){
							$('#JOB_transition_h').val('');
						}else{
							$('#JOB_transition_h').val(node.getEntry().filename_h);
						}
						$('#filename_JOB').textbox('readonly',true);//设置只读  
						var  file_path= Nasoft.Topo.getSelectedTab().project().file_path;
                        $('#JOB_transition').unbind('click').click(function(e) { // 点击浏览							
                        	Nasoft.Static.handleFilePostfix('#filename_JOB','#JOB_transition_h',{},'2',file_path);
						});
                        $('#JOB_transition_open').unbind('click').click(function(e){//编辑按钮
            				var filename=$('#JOB_transition_h').val();
            				if(filename){
            					Nasoft.Project.openProject(filename);
            				}
            				$('#JOB').window('close');
            			});
                       
						//*******************高级*********************
						if(node.getEntry().arg_from_previous==='Y'){//复制上一步结果到位置参数
							$("#JOB_copy_location").get(0).checked=true
							
						}else if(node.getEntry().arg_from_previous==='N'){
							$("#JOB_copy_location").get(0).checked=false
						}else{
							$("#JOB_copy_location").get(0).checked=false
						}
						
						if(node.getEntry().params_from_previous==='Y'){//复制上一步结果到命名参数
							$("#JOB_copy_name").get(0).checked=true
							
						}else if(node.getEntry().params_from_previous==='N'){
							$("#JOB_copy_name").get(0).checked=false
						}else{
							$("#JOB_copy_name").get(0).checked=false
						}
						if(node.getEntry().exec_per_row==='Y'){//执行每一个输入行
							$("#JOB_input_line").get(0).checked=true
							
						}else if(node.getEntry().exec_per_row==='N'){
							$("#JOB_input_line").get(0).checked=false
						}else{
							$("#JOB_input_line").get(0).checked=false
						}
						
						
						if(node.getEntry().pass_export==='Y'){//将作业结果发送到从服务器上
							$("#JOB_finish").get(0).checked=true
							
						}else if(node.getEntry().pass_export==='N'){
							$("#JOB_finish").get(0).checked=false
						}else{
							$("#JOB_finish").get(0).checked=false
						}
						
						if(node.getEntry().slave_server_name==null||node.getEntry().slave_server_name==''){
							$('#long_distance_server_job').textbox('setValue','');
						}else{
							$('#long_distance_server_job').textbox('setValue',node.getEntry().slave_server_name);
						}
						
						function distance_server(){//自定义方法 
						var long_distance_server=$('#long_distance_server_job').textbox('getValue');//获取远程从服务器的值
							if(long_distance_server==null||long_distance_server==''){
								$('#JOB_finish_end').prop('disabled', true);
								$('#JOB_finish_termination').prop('disabled', true);
								$('#JOB_finish_child').prop('disabled', true);
							}else{
								$('#JOB_finish_end').prop('disabled', false);
								if($('#JOB_finish_end').get(0).checked){
									$('#JOB_finish_termination').prop('disabled', false);
								}else{
									$('#JOB_finish_termination').prop('disabled', true);
								}
								$('#JOB_finish_child').prop('disabled', false);
							}
							
						}
						if(node.getEntry().wait_until_finished==='Y'){//等待远程转换执行结束
							$("#JOB_finish_end").get(0).checked=true;
							distance_server();
						}else if(node.getEntry().wait_until_finished==='N'){
							$("#JOB_finish_end").get(0).checked=false;
							distance_server()
						}else{
							$("#JOB_finish_end").get(0).checked=true;
							distance_server()
						}
						if(node.getEntry().follow_abort_remote==='Y'){//本地转换终止时远程转换也通知终止
							$("#JOB_finish_termination").get(0).checked=true;
							
						}else if(node.getEntry().follow_abort_remote==='N'){
							$("#JOB_finish_termination").get(0).checked=false;
							
						}else{
							$("#JOB_finish_termination").get(0).checked=false;
							
						}
						if(node.getEntry().expand_remote_job==='Y'){//Expand child jobs and transformations on the server
							$("#JOB_finish_child").get(0).checked=true;
							
						}else if(node.getEntry().expand_remote_job==='N'){
							$("#JOB_finish_child").get(0).checked=false;
							
						}else{
							$("#JOB_finish_child").get(0).checked=false;
							
						}
			            $('#JOB_finish_end').unbind('click').click(function(e) {//点击等待远程转换执行结束
			            	distance_server();
			             })
						
						// *******************设置日志*********************
						$('#JOB_log_rank').combobox({//日志级别
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
						function JOB_appoint(){
							
							if($('#JOB_appoint_file').get(0).checked){//指定日志文件
	    						
    							$('#JOB_additional_file').prop('disabled', false);
    							$('#JOB_father_folder').prop('disabled', false);
    							$('#JOB_log_date').prop('disabled', false);
    							$('#JOB_log_time').prop('disabled', false);
    							$('#JOB_log_rank').combobox('enable');
    							$('#JOB_browse').linkbutton('enable');
    							$('#JOB_log_file_name').textbox('enable');
    							$('#JOB_file_postfix').textbox('enable');
    						}else{
    							
    							$('#JOB_additional_file').prop('disabled', true);
    							$('#JOB_father_folder').prop('disabled', true);
    							$('#JOB_log_date').prop('disabled', true);
    							$('#JOB_log_time').prop('disabled', true);
    							$('#JOB_log_rank').combobox('disable');
    							$('#JOB_browse').linkbutton('disable');
    							$('#JOB_log_file_name').textbox('disable');
    							$('#JOB_file_postfix').textbox('disable');
    						}
							
							
						}
						
						if(node.getEntry().force_separate_logging==='Y'){//独立的日志
							$("#JOB_force_file").get(0).checked=true;
							
						}else if(node.getEntry().force_separate_logging==='N'){
							$("#JOB_force_file").get(0).checked=false;
						}else{
							$("#JOB_force_file").get(0).checked=false;
						}
						if(node.getEntry().set_logfile==='Y'){//指定日志文件
							$("#JOB_appoint_file").get(0).checked=true;
							JOB_appoint();
							
						}else if(node.getEntry().set_logfile==='N'){
							$("#JOB_appoint_file").get(0).checked=false;
							JOB_appoint();
						}else{
							$("#JOB_appoint_file").get(0).checked=false;
							JOB_appoint();
						}
                        $('#JOB_appoint_file').unbind('click').click(function(e){
                        	JOB_appoint();
		    			});
						if(node.getEntry().set_append_logfile==='Y'){//追加日志文件
							$("#JOB_additional_file").get(0).checked=true
							
						}else if(node.getEntry().set_append_logfile==='N'){
							$("#JOB_additional_file").get(0).checked=false
						}else{
							$("#JOB_additional_file").get(0).checked=false
						}
						
						if(node.getEntry().create_parent_folder==='Y'){//创建父文件夹
							$("#JOB_father_folder").get(0).checked=true
							
						}else if(node.getEntry().create_parent_folder==='N'){
							$("#JOB_father_folder").get(0).checked=false
						}else{
							$("#JOB_father_folder").get(0).checked=false
						}
						
						if(node.getEntry().add_date==='Y'){//日志文件包含日期
							$("#JOB_log_date").get(0).checked=true
							
						}else if(node.getEntry().add_date==='N'){
							$("#JOB_log_date").get(0).checked=false
						}else{
							$("#JOB_log_date").get(0).checked=false
						}
						
						if(node.getEntry().add_time==='Y'){//日志文件包含时间
							$("#JOB_log_time").get(0).checked=true
							
						}else if(node.getEntry().add_time==='N'){
							$("#JOB_log_time").get(0).checked=false
						}else{
							$("#JOB_log_time").get(0).checked=false
						}
						if(node.getEntry().logfile==undefined){//日志文件名
							$('#JOB_log_file_name').textbox('setValue','');
						}else{
							$('#JOB_log_file_name').textbox('setValue',node.getEntry().logfile);
						}
						
						if(node.getEntry().logext==undefined){//日志文件后缀名
							$('#JOB_file_postfix').textbox('setValue','');
						}else{
							$('#JOB_file_postfix').textbox('setValue',node.getEntry().logext);
						}
						
						$('#JOB_browse').unbind('click').click(function(e) { // 点击浏览
							
							Nasoft.Static.handleFile('#JOB_log_file_name','#JOB_browse_h',{});
						});
						if(node.getEntry().loglevel){//日志级别的值
	                    	  $('#JOB_log_rank').combobox('setValue',node.getEntry().loglevel);
	
	                      }else{
	                    	  $('#JOB_log_rank').combobox('setValue','Basic');
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
						$('#JOB_positional_arguments_table').datagrid({//设置表格属性
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
		    						$('#JOB_positional_arguments_table').datagrid(
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
									var del_row = $('#JOB_positional_arguments_table').datagrid('getSelected');
									var del_rowIndex = $('#JOB_positional_arguments_table').datagrid('getRowIndex',del_row);
									$('#JOB_positional_arguments_table').datagrid('deleteRow',del_rowIndex);
								}
							}
		    				],  
		    				onDblClickCell: function(index,field,value){
		    					
		    					var rows=$(this).datagrid('getRows');
		    					$.each(rows,function(j,o){
		    						j===index || $('#JOB_positional_arguments_table').datagrid('endEdit',j);
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
						if(node.getEntry().parameters&&node.getEntry().parameters.pass_all_parameters==='Y'){//将所有参数值都传递到子作业
							$("#JOB_conversion").get(0).checked=true
						}else if(node.getEntry().parameters&&node.getEntry().parameters.pass_all_parameters==='N'){
							$("#JOB_conversion").get(0).checked=false
						}else{
							$("#JOB_conversion").get(0).checked=true
						}
						
						
						$('#JOB_parameter_table').datagrid({//命名参数表
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
					    						$('#JOB_parameter_table').datagrid(
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
												var del_row = $('#JOB_parameter_table').datagrid('getSelected');
												var del_rowIndex = $('#JOB_parameter_table').datagrid('getRowIndex',del_row);
												$('#JOB_parameter_table').datagrid('deleteRow',del_rowIndex);
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
		    							title : '列名',
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
		    						j===index || $('#JOB_parameter_table').datagrid('endEdit',j);
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
		    			$('#JOB_tableInput_cancel').unbind('click').click(function(e){
		    				
		    				$('#JOB').window('close');	
		    			});
		    			//确定
						$('#JOB_tableInput_ok').unbind('click').click(function(e){
							if($('#filename_JOB').textbox('getValue')!=null&&$('#filename_JOB').textbox('getValue')!=''){
			                	 var TRANS={};
			                	 var entryname =$('#step_name_JOB').textbox('getValue');//步骤名称
			                	 node.text= entryname;
			                	 TRANS.filename=$('#filename_JOB').textbox('getValue');
			                	 TRANS.filename_h=$('#JOB_transition_h').val();
			                	 
			                	 //*******************高级*********************
			                	 TRANS.arg_from_previous= $("#JOB_copy_location").prop("checked")==true ? 'Y' : 'N'; //复制上一步结果到位置参数
			                	 TRANS.params_from_previous= $("#JOB_copy_name").prop("checked")==true ? 'Y' : 'N';//复制上一步结果到命名参数
			                	 TRANS.exec_per_row= $("#JOB_input_line").prop("checked")==true ? 'Y' : 'N';//执行每一个输入行
			                	 TRANS.slave_server_name=$('#long_distance_server_job').textbox('getValue');//远程从服务器
			                	 TRANS.pass_export= $("#JOB_finish").prop("checked")==true ? 'Y' : 'N';//将作业结果发送到从服务器上
			                	 TRANS.wait_until_finished= $("#JOB_finish_end").prop("checked")==true ? 'Y' : 'N';//等待远程转换执行结束
			                	 TRANS.follow_abort_remote= $("#JOB_finish_termination").prop("checked")==true ? 'Y' : 'N';//本地转换终止时远程转换也通知终止
			                	 TRANS.expand_remote_job= $("#JOB_finish_child").prop("checked")==true ? 'Y' : 'N';//Expand child jobs and transformations on the server
			                	 //*******************设置日志*********************
			                	 TRANS.force_separate_logging= $("#JOB_force_file").prop("checked")==true ? 'Y' : 'N'; //指定日志文件
			                	 TRANS.set_logfile= $("#JOB_appoint_file").prop("checked")==true ? 'Y' : 'N'; //指定日志文件
			                	 TRANS.set_append_logfile= $("#JOB_additional_file").prop("checked")==true ? 'Y' : 'N';//追加日志文件
			                	 TRANS.create_parent_folder= $("#JOB_father_folder").prop("checked")==true ? 'Y' : 'N';//创建父文件夹
			                	 TRANS.add_date= $("#JOB_log_date").prop("checked")==true ? 'Y' : 'N';//日志文件包含日期
			                	 TRANS.add_time= $("#JOB_log_time").prop("checked")==true ? 'Y' : 'N';//日志文件包含时间
			                	 TRANS.logfile=$('#JOB_log_file_name').textbox('getValue');//日志文件名
			                	 TRANS.logext=$('#JOB_file_postfix').textbox('getValue');//日志文件后缀名
			                	 TRANS.loglevel=$('#JOB_log_rank').combobox('getValue');//日志级别
			                	 //*******************位置参数*********************
			                	var rows_a = $('#JOB_positional_arguments_table').datagrid('getRows');// 获取位置参数页面中所有的行
			          			$.each(rows_a, function(i, o) {
			          				$('#JOB_positional_arguments_table').datagrid('endEdit', i);// 结束编辑所有行
			          			});
			           			var positional_arguments_table=Nasoft.GetProjectData.getFields('#JOB_positional_arguments_table');
			           			
			           			if(positional_arguments_table!=""&&$.isArray(positional_arguments_table.field)){//数组

			        				$.each(positional_arguments_table.field,function(i,o){
			        					
			        					TRANS['argument'+i]=o.argument;//将每个字段的值存入转换对象中
			 
			        				});
			        				
			        			    }else if(positional_arguments_table!=""){//对象
			        			    	TRANS.argument0=positional_arguments_table.field.argument;
			        			}

			                	//*******************命名参数*********************
			                	
			           			var rows_b = $('#JOB_parameter_table').datagrid('getRows');// 获取当前页面中所有的行
			         			$.each(rows_b, function(i, o) {
			         				$('#JOB_parameter_table').datagrid('endEdit', i);// 结束编辑所有行
			         			});
			          			var TRANS_parameter_table=Nasoft.GetProjectData.getFields('#JOB_parameter_table');
			          			
			          				if(TRANS_parameter_table!=null&&TRANS_parameter_table!=''){
			          					TRANS.parameters={};
			          					TRANS.parameters.parameter=TRANS_parameter_table.field;	
			          					TRANS.parameters.pass_all_parameters= $("#JOB_conversion").prop("checked")==true ? 'Y' : 'N'; //将所有参数值都传递到子转换
			          				}
			                	 node.setEntry(TRANS);
			                	 $('#JOB').window('close');
			          			}else{
			          				$.messager.alert('系统信息','请选择你的作业文件','info');

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