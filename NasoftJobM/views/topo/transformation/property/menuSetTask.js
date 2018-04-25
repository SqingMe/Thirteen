Nasoft.Window.menuSetTask={
		init : function(){
			Nasoft.Ajax.loadDoc($.getRootPath()+"/views/topo/transformation/property/menuSetTask.html","body");
		},
		/**
		 * 为转换属性设值
		 */
		showSetingTaskValue:function(project){
			var tab = Nasoft.Topo.getSelectedTab();
			var Job = tab.scene;
			var JobData = Job.getCore('2');
			var	connections = Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
		    var Jobs = JobData.job;//获取步骤对象			
		    $('#job_name').textbox('setValue',Jobs.name);
			$('#job_describe').textbox('setValue',Jobs.description);
			$('#job_describes').textbox('setValue',Jobs.extended_description);
			$('#job_version').textbox('setValue',Jobs.job_version);
			
		
		var job_conert_status_data=[{'id':'0','name':''},{'id':'1','name':'草案'},{'id':'2','name':'产品'}]
		
			$('#job_conert_status').combobox({//状态
					data:job_conert_status_data,
					valueField:'id',   
					textField:'name',  
					onLoadSuccess:function(data){
						var connectionName;
						connectionName!='' && $(this).combobox('select',Jobs.job_status);
					}
				});
			$('#job_search_data_table').datagrid({//字段的界面  
				fit:true,
				rownumbers:true,
				singleSelect:true,
				fitColumns:true,
			    data:!!Jobs.parameters&&Jobs.parameters.parameter?{total:1, rows:$.isArray(Jobs.parameters.parameter)?
			    		Jobs.parameters.parameter:[Jobs.parameters.parameter]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					fitColumns:true,
					handler: function(){//添加一行
						$('#job_search_data_table').datagrid(//新增加一行
								'appendRow',
								{
									name:'', 
									default_value:'',
									description:'',
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
						var del_row = $('#job_search_data_table').datagrid('getSelected');
						var del_rowIndex = $('#job_search_data_table').datagrid('getRowIndex',del_row);
						$('#job_search_data_table').datagrid('deleteRow',del_rowIndex);
					}
				}],
			    columns:[[    
			        {field:'name',title:'命名参数',width:100,editor:{type:'text'}},    
			        {field:'default_value',title:'默认值',width:100,editor:{type:'text'}},  
			        {field:'description',title:'描述',width:100,editor:{type:'text'}}, 
			    ]],
	    		onClickRow:function(i,r){
			    	var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						j===i || $('#job_search_data_table').datagrid('endEdit',j);
					});
		        	$(this).datagrid('beginEdit',i);//编辑点击的行
	    		},
				onSelect : function(i,r){
					var that = this;
					$(document).unbind('keydown');
					$(document).keydown(function(event){
						  switch(event.keyCode) {
						  case 38:
							  event.ctrlKey && $(that).datagrid("selectmoveUp",r);
						  case 40:
							  event.ctrlKey && $(that).datagrid("selectmoveDown",r);
						  }
						});
				}
			});
			$('#job_log_recdate_one').combobox({
				data:connections,
				valueField:'name',   //将connections的id字段绑定在下拉表单的value上 
				textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
				onLoadSuccess:function(data){
					var connectionName;
					connectionName=Jobs["job-log-table"].connection!=''?Jobs["job-log-table"].connection:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
    			onChange:function(newValue,oldValue){
    				$.each(connections,function(i,o){//遍历下拉表单的所有数据项
    					if(newValue==o.name){//筛选出当前点击的下拉表单项的connection
							//当选项发生改变时将当前被选项的name赋值个node的connectionName
							node.setConnectionName(o.name);
    					}
    				});
    			}
			});
			$('#job_log_recdate_two').combobox({
				data:connections,
				valueField:'name',   //将connections的id字段绑定在下拉表单的value上 
				textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
				onLoadSuccess:function(data){
					var connectionName;
					connectionName=Jobs["jobentry-log-table"].connection!=''?Jobs["jobentry-log-table"].connection:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
    			onChange:function(newValue,oldValue){
    				$.each(connections,function(i,o){//遍历下拉表单的所有数据项
    					if(newValue==o.name){//筛选出当前点击的下拉表单项的connection
							//当选项发生改变时将当前被选项的name赋值个node的connectionName
							node.setConnectionName(o.name);
    					}
    				});
    			}
			});
			$('#job_log_recdate_channel').combobox({
				data:connections,
				valueField:'name',   //将connections的id字段绑定在下拉表单的value上 
				textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
				onLoadSuccess:function(data){
					var connectionName;
					connectionName=Jobs["channel-log-table"].connection!=''?Jobs["channel-log-table"].connection:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
    			onChange:function(newValue,oldValue){
    				$.each(connections,function(i,o){//遍历下拉表单的所有数据项
    					if(newValue==o.name){//筛选出当前点击的下拉表单项的connection
							//当选项发生改变时将当前被选项的name赋值个node的connectionName
							node.setConnectionName(o.name);
    					}
    				});
    			}
			});
			
			
			Jobs["job-log-table"].schema!=''&&Jobs["job-log-table"].schema!=null?$('#job_log_tabmodel').textbox('setValue', Jobs["job-log-table"].schema):$('#job_log_tabmodel').textbox('setValue', '');
			Jobs["job-log-table"].table!=''&&Jobs["job-log-table"].table!=null?$('#job_log_table').textbox('setValue', Jobs["job-log-table"].table):$('#job_log_table').textbox('setValue', '');
			Jobs["job-log-table"].interval!=''&&Jobs["job-log-table"].interval!=null?$('#job_log_time').textbox('setValue', Jobs["job-log-table"].interval):$('#job_log_time').textbox('setValue', '');
			Jobs["job-log-table"].timeout_days!=''&&Jobs["job-log-table"].timeout_days!=null?$('#job_log_day').textbox('setValue', Jobs["job-log-table"].timeout_days):$('#job_log_day').textbox('setValue', '');
			Jobs["job-log-table"].size_limit_lines!=''&&Jobs["job-log-table"].size_limit_lines!=null?$('#job_log_link').textbox('setValue', Jobs["job-log-table"].size_limit_lines):$('#job_log_link').textbox('setValue', '');

            $('#job_log_recdate_one_table').datagrid({ 
				fit:true,
				rownumbers:true,
				singleSelect: false,
				selectOnCheck: false,
				checkOnSelect: false,
				fitColumns:true,
			    data:Jobs["job-log-table"].field?{total:1, rows:$.isArray(Jobs["job-log-table"].field)?
			    		Jobs["job-log-table"].field:[Jobs["job-log-table"].field]}:{total:0,rows:[]},		
			    columns:[[    
			        {field:'ck',checkbox : true},    
			        {field:'name',title:'字段名称',editor:{type:'text'}},  
			        {field:'id',title:'ID',hidden:'true'},
			        {field:'enabled',title:'enabled',hidden:'true'},
			        {field:'description',title:'字段描述',
			        	formatter: function(value,row,index){
							if(row.id=='ID_JOB'){
							return value="The batch ID.It's a unique number,increased by one for each run of a job";
							}
							if(row.id=='CHANNEL_ID'){
							return value="The log channel ID (GUID),can be matched to the logging lineage information";
							}
							if(row.id=='JOBNAME'){
							return value="The name of the job.";
							}
							if(row.id=='STATUS'){
								return value="The status of the job:start,end,stopped,running";
							}
							if(row.id=='LINES_READ'){
								return value="The number of lines read by the last job entry(transformation).";
							}
							if(row.id=='LINES_WRITTEN'){
								return value="The number of lines writtenby the last job entry(transformation).";
							}
							if(row.id=='LINES_UPDATED'){
								return value="The number of update statements executed by the last job entry(transformatiom).";
							}
							if(row.id=='LINES_INPUT'){
								return value="The number of lines read from disk or the network by the last job entry(transformation).This is input from files,databases,etc.";
							}
							if(row.id=='LINES_OUTPUT'){
								return value="The number of lines written to disk or the network by the last job entry(transformation).This is input to files,databases,eat.";
							}
							if(row.id=='LINES_REJECTED'){
								return value="The number of lines rejected with error handling by the last job entry(transformation).";
							}
							if(row.id=='ERRORS'){
								return value="The number of errors that occurred.";
							}
							if(row.id=='STARTDATE'){
								return value="The start of the date range for incremental (CDC) data processing.It's the end of date range of the last time this job ran corrrectly.";
							}
							if(row.id=='ENDDATE'){
								return value="The end of the date range for incremental (CDC) data processing.";
							}
							if(row.id=='LOGDATE'){
								return value="The update time of this log record.If the job has status 'end' it's the end of the job.";
							}
							if(row.id=='DEPDATE'){
								return value="The dependency date:the maximum date calculated by the dependency rules in the job settings.";
							}
							if(row.id=='REPLAYDATE'){
								return value="The replay date is synonym for the start time of the job.";
							}
							if(row.id=='LOG_FIELD'){
								return value="The field that will contain the complete text log of the job run.Usually this is a CLOB or(long) TEXT type of field";
							}
							if(row.id=='EXECUTING_SERVER'){
								return value="The server that executed this job.";
							}
							if(row.id=='EXECUTING_USER'){
								return value="The user that executed this job.This is the repository user if available or the OS user otherwise.";
							}
							if(row.id=='START_JOB_ENTRY'){
								return value="The name of the job entry where this job started.";
							}
							if(row.id=='CLIENT'){
								return value="The Client which executed the job: pan,kitchen,carte.";
							}
						}
			        },
			    ]],
			    onDblClickCell:function(index, field, value){
			    	var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						 $('#job_log_recdate_one_table').datagrid('endEdit',j);
					});
					$(this).datagrid('beginEdit',index);//编辑点击的行
	    		},
	    		onLoadSuccess:function(data) {
	    		    var rowData = data.rows;
	    		    $.each(rowData, function (index, val) {
	    		        if (val.enabled=='Y') {
	    		            $("#job_log_recdate_one_table").datagrid("checkRow", index);
	    		        }else{
	    		        	$("#job_log_recdate_one_table").datagrid("uncheckRow", index);
	    		        }
	    		    });
	                $("#job_log_recdate_one_table").parent().find("div .datagrid-header-check").children("input[type=\"checkbox\"]").eq(0).attr("style", "display:none;");
	    		},
				onSelect : function(i,r){
					var that = this;
					$(document).unbind('keydown');
					$(document).keydown(function(event){
						  switch(event.keyCode) {
						  case 38:
							  event.ctrlKey && $(that).datagrid("selectmoveUp",r);
						  case 40:
							  event.ctrlKey && $(that).datagrid("selectmoveDown",r);
						  }
						});
				},
	    		onCheck:function(index, row){
	    			row.enabled='Y';
	    		},
	    		onUncheck:function(index, row){
	    			row.enabled='N';
	    		}
			});


            Jobs["jobentry-log-table"].schema!=''&&Jobs["jobentry-log-table"].schema!=null?$('#job_log_recdate_model').textbox('setValue', Jobs["jobentry-log-table"].schema):$('#job_log_recdate_model').textbox('setValue', '');
            Jobs["jobentry-log-table"].table!=''&&Jobs["jobentry-log-table"].table!=null?$('#job_log_recdate_table').textbox('setValue', Jobs["jobentry-log-table"].table):$('#job_log_recdate_table').textbox('setValue', '');
            Jobs["jobentry-log-table"].timeout_days!=''&&Jobs["jobentry-log-table"].timeout_days!=null?$('#job_log_recdate_days').textbox('setValue',Jobs["jobentry-log-table"].timeout_days):$('#job_log_recdate_days').textbox('setValue', '');
			
			 $('#job_log_recdate_two_table').datagrid({
				fit:true,
				rownumbers:true,
				singleSelect: false,
				selectOnCheck: false,
				checkOnSelect: false,
				fitColumns:true,
			    data:Jobs["jobentry-log-table"].field?{total:1, rows:$.isArray(Jobs["jobentry-log-table"].field)?
			    		Jobs["jobentry-log-table"].field:[Jobs["jobentry-log-table"].field]}:{total:0,rows:[]},		
			    columns:[[    
			        {field:'ck',checkbox : true},    
			        {field:'name',title:'字段名称',editor:{type:'text'}},  
			        {field:'id',title:'ID',hidden:'true'},
			        {field:'enabled',title:'enabled',hidden:'true'},
			        {field:'description',title:'字段描述',
			        	formatter: function(value,row,index){
							if(row.id=='ID_BATCH'){
							return value="The job batch ID.";
							}
							if(row.id=='CHANNEL_ID'){
							return value="The log channel ID";
							}
							if(row.id=='LOG_DATE'){
							return value="The logging date.";
							}
							if(row.id=='JOBNAME'){
								return value="The name of the parent job";
							}
							if(row.id=='JOBENTRYNAME'){
								return value="The job entry name";
							}
							if(row.id=='LINES_READ'){
								return value="The number of lines read by the(transformation) job entry";
							}
							if(row.id=='LINES_WRITTEN'){
								return value="The number of lines written by the(transformation) job entry";
							}
							if(row.id=='LINES_UPDATED'){
								return value="The number of update statements executed by the(transformation) job entry";
							}
							if(row.id=='LINES_INPUT'){
								return value="The number of lines read from input (file,database,network,...) by the job entry.";
							}
							if(row.id=='LINES_OUTPUT'){
								return value="The number of lines written to output (file,database,network,...) by the job entry.";
							}
							if(row.id=='LINES_REJECTED'){
								return value="The number of lines rejected by error handling by the (transformation) job entry.";
							}
							if(row.id=='ERRORS'){
								return value="Errors";
							}
							if(row.id=='RESULT'){
								return value="The boolean result.";
							}
							if(row.id=='NR_RESULT_ROWS'){
								return value="The number of result rows after execution.";
							}
							if(row.id=='NR_RESULT_FILES'){
								return value="The number of result files after execution.";
							}
							if(row.id=='LOG_FIELD'){
								return value="The log field that contains the error log for this specific job entry only.";
							}
							if(row.id=='COPY_NR'){
								return value="Copy Nr.";
							}
						}
			        },
			    ]],
			    onDblClickCell:function(index, field, value){
			    	var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						 $('#job_log_recdate_two_table').datagrid('endEdit',j);
					});
					$(this).datagrid('beginEdit',index);//编辑点击的行
	    		},
				onSelect : function(i,r){
					var that = this;
					$(document).unbind('keydown');
					$(document).keydown(function(event){
						  switch(event.keyCode) {
						  case 38:
							  event.ctrlKey && $(that).datagrid("selectmoveUp",r);
						  case 40:
							  event.ctrlKey && $(that).datagrid("selectmoveDown",r);
						  }
						});
				},
	    		onLoadSuccess:function(data) {
	    		    var rowData = data.rows;
	    		    $.each(rowData, function (index, val) {
	    		        if (val.enabled=='Y') {
	    		            $("#job_log_recdate_two_table").datagrid("checkRow", index);
	    		        }else{
	    		        	$("#job_log_recdate_two_table").datagrid("uncheckRow", index);
	    		        }
	    		    });
	                $("#job_log_recdate_two_table").parent().find("div .datagrid-header-check").children("input[type=\"checkbox\"]").eq(0).attr("style", "display:none;");
	    		},
	    		onCheck:function(index, row){
	    			row.enabled='Y';
	    		},
	    		onUncheck:function(index, row){
	    			row.enabled='N';
	    		}
			});
			
			 Jobs["channel-log-table"].schema!=''&& Jobs["channel-log-table"].schema!=null?$('#job_log_channel_model').textbox('setValue', Jobs["channel-log-table"].schema):$('#job_log_channel_model').textbox('setValue', '');
			 Jobs["channel-log-table"].table!=''&& Jobs["channel-log-table"].table!=null?$('#job_log_channel_table').textbox('setValue', Jobs["channel-log-table"].table):$('#job_log_channel_table').textbox('setValue', '');
			 Jobs["channel-log-table"].timeout_days!=''&& Jobs["channel-log-table"].timeout_days!=null?$('#job_log_channel_days').textbox('setValue', Jobs["channel-log-table"].timeout_days):$('#job_log_channel_days').textbox('setValue', '');
			
			 $('#job_log_recdate_channel_table').datagrid({ 
				fit:true,
				rownumbers:true,
				singleSelect: false,
				selectOnCheck: false,
				checkOnSelect: false,
				fitColumns:true,
			    data:Jobs["channel-log-table"].field?{total:1, rows:$.isArray(Jobs["channel-log-table"].field)?
			    		Jobs["channel-log-table"].field:[Jobs["channel-log-table"].field]}:{total:0,rows:[]},		
			    columns:[[    
			        {field:'ck',checkbox : true},    
			        {field:'name',title:'字段名称',editor:{type:'text'}},  
			        {field:'id',title:'ID',hidden:'true'},
			        {field:'enabled',title:'enabled',hidden:'true'},
			        {field:'description',title:'字段描述',
			        	formatter: function(value,row,index){
							if(row.id=='ID_BATCH'){
							return value="The batch ID.";
							}
							if(row.id=='CHANNEL_ID'){
							return value="Logging channel ID.";
							}
							if(row.id=='LOG_DATE'){
							return value="Log date.";
							}
							if(row.id=='LOGGING_OBJECT_TYPE'){
								return value="Object type";
							}
							if(row.id=='OBJECT_NAME'){
								return value="Name of the object";
							}
							if(row.id=='OBJECT_COPY'){
								return value="Object (usually step) copy";
							}
							if(row.id=='REPOSITORY_DIRECTORY'){
								return value="Repository directory of the object";
							}
							if(row.id=='FILENAME'){
								return value="Filename";
							}
							if(row.id=='OBJECT_ID'){
								return value="Repository Object ID";
							}
							if(row.id=='OBJECT_REVISION'){
								return value="Repository Object revision.";
							}
							if(row.id=='PARENT_CHANNEL_ID'){
								return value="Logging channel ID of the parent object";
							}
							if(row.id=='ROOT_CHANNEL_ID'){
								return value="Channel ID of the object that logged this information";
							}
						}
			        },
			    ]],
			    onDblClickCell:function(index, field, value){
			    	var rows=$(this).datagrid('getRows');
					$.each(rows,function(j,o){
						 $('#job_log_recdate_channel_table').datagrid('endEdit',j);
					});
					$(this).datagrid('beginEdit',index);//编辑点击的行
	    		},
				onSelect : function(i,r){
					var that = this;
					$(document).unbind('keydown');
					$(document).keydown(function(event){
						  switch(event.keyCode) {
						  case 38:
							  event.ctrlKey && $(that).datagrid("selectmoveUp",r);
						  case 40:
							  event.ctrlKey && $(that).datagrid("selectmoveDown",r);
						  }
						});
				},
	    		onLoadSuccess:function(data) {
	    		    var rowData = data.rows;
	    		    $.each(rowData, function (index, val) {
	    		        if (val.enabled=='Y') {
	    		            $("#job_log_recdate_channel_table").datagrid("checkRow", index);
	    		        }else{
	    		        	$("#job_log_recdate_channel_table").datagrid("uncheckRow", index);
	    		        }
	    		    });
	                $("#job_log_recdate_channel_table").parent().find("div .datagrid-header-check").children("input[type=\"checkbox\"]").eq(0).attr("style", "display:none;");
	    		},
	    		onCheck:function(index, row){
	    			row.enabled='Y';
	    		},
	    		onUncheck:function(index, row){
	    			row.enabled='N';
	    		}
			});

			 //工程变量设置
			 $('#job_engineering_variable_setup_table').datagrid({//字段的界面  
					fit:true,
					rownumbers:true,
					singleSelect:true,
					fitColumns:true,
					toolbar: [{
						iconCls: 'icon-add',
						text : "增加",
						fitColumns:true,
						handler: function(){//添加一行
							$('#job_engineering_variable_setup_table').datagrid(//新增加一行
									'appendRow',
									{
										name:'', 
										default_value:''
									});}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
							var del_row = $('#job_engineering_variable_setup_table').datagrid('getSelected');
							var del_rowIndex = $('#job_engineering_variable_setup_table').datagrid('getRowIndex',del_row);
							$('#job_engineering_variable_setup_table').datagrid('deleteRow',del_rowIndex);
						}
					}],
				    columns:[[    
				        {field:'name',title:'变量名称',width:100,editor:{type:'text'}},    
				        {field:'default_value',title:'值',width:100,editor:{type:'text'}},  
				    ]],
		    		onClickRow:function(i,r){
				    	var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===i || $('#job_engineering_variable_setup_table').datagrid('endEdit',j);
						});
			        	$(this).datagrid('beginEdit',i);//编辑点击的行
		    		},
					onSelect : function(i,r){
						var that = this;
						$(document).unbind('keydown');
						$(document).keydown(function(event){
							  switch(event.keyCode) {
							  case 38:
								  event.ctrlKey && $(that).datagrid("selectmoveUp",r);
							  case 40:
								  event.ctrlKey && $(that).datagrid("selectmoveDown",r);
							  }
							});
					}
				});
	 			// 请求数据表格的数据
	 			$.ajax({
	 			    url:$.getRootPath()+'/FileInfoCtrl/getappproperties.do',
	 				async:false,
	 				data:{path:project.file_path},
	 				dataType:'json',
	 				type:'POST',
	 				success:function(data){
	 					 $('#job_engineering_variable_setup_table').datagrid({//字段的界面  
	 						data:data
	 						 });
	 					 }
	 			});
			 
			 
				
				$('#job_data_win_cancel').unbind('click').click(function(e){//取消按钮
					$('#setTask_data_win').window('close');
				});
				
				
				$('#job_data_win_ok').unbind('click').click(function(e){//确定按钮
				    var menuSetTask={};
				    menuSetTask.name= $('#job_name').textbox('getValue');
				    menuSetTask.description= $('#job_describe').textbox('getValue');
				    menuSetTask.extended_description= $('#job_describes').textbox('getValue');
				    menuSetTask.job_version= $('#job_version').textbox('getValue');
				    menuSetTask.job_status=$('#job_conert_status').combobox('getValue');
				    
                    
                    var log_trans_two={};
                    log_trans_two.connection=$('#job_log_recdate_one').combobox('getValue');
                    log_trans_two.schema=$('#job_log_tabmodel').textbox('getValue');
                    log_trans_two.table=$('#job_log_table').textbox('getValue');
                    log_trans_two.interval=$('#job_log_time').textbox('getValue');
                    log_trans_two.timeout_days=$('#job_log_day').textbox('getValue');
                    log_trans_two.size_limit_lines=$('#job_log_link').textbox('getValue');
                    var rows_log_trans_two = $('#job_log_recdate_one_table').datagrid('getRows');// 获取当前页面中所有的行
         			$.each(rows_log_trans_two, function(index, o) {
         				$('#job_log_recdate_one_table').datagrid('endEdit', index);// 结束编辑所有行
         			});
         			
         			var file_log_trans_two=Nasoft.GetProjectData.getFields('#job_log_recdate_one_table');//将对应数据字段加入表输出	
				    log_trans_two.field=file_log_trans_two.field;
				    
                    menuSetTask['job-log-table']=log_trans_two;	
                    var log_trans_run={};
                    log_trans_run.connection=$('#job_log_recdate_two').combobox('getValue');
                    log_trans_run.schema=$('#job_log_recdate_model').textbox('getValue');
                    log_trans_run.table=$('#job_log_recdate_table').textbox('getValue');
                    log_trans_run.timeout_days=$('#job_log_recdate_days').textbox('getValue');
                    
                     var rows_log_trans_run = $('#job_log_recdate_two_table').datagrid('getRows');// 获取当前页面中所有的行
         			$.each(rows_log_trans_run, function(index, o) {
         				$('#job_log_recdate_two_table').datagrid('endEdit', index);// 结束编辑所有行
         			});
         			
         			var file_log_trans_run=Nasoft.GetProjectData.getFields('#job_log_recdate_two_table');//将对应数据字段加入表输出	
				    log_trans_run.field=file_log_trans_run.field;
				    
				    menuSetTask['jobentry-log-table']=log_trans_run;	
                    
                    var log_trans_channel={};
                    log_trans_channel.connection=$('#job_log_recdate_channel').combobox('getValue');
                    log_trans_channel.schema=$('#job_log_channel_model').textbox('getValue');
                    log_trans_channel.table=$('#job_log_channel_table').textbox('getValue');
                    log_trans_channel.timeout_days=$('#job_log_channel_days').textbox('getValue');
                    
                   var rows_log_trans_channel = $('#job_log_recdate_channel_table').datagrid('getRows');// 获取当前页面中所有的行
         			$.each(rows_log_trans_channel, function(index, o) {
         				$('#job_log_recdate_channel_table').datagrid('endEdit', index);// 结束编辑所有行
         			});
         			
         			
         			
         			var file_log_trans_channel=Nasoft.GetProjectData.getFields('#job_log_recdate_channel_table');//将对应数据字段加入表输出	
				    log_trans_channel.field=file_log_trans_channel.field;
                    
				    menuSetTask['channel-log-table']=log_trans_channel;	
                    var rows = $('#job_search_data_table').datagrid('getRows');// 获取当前页面中所有的行
         			$.each(rows, function(i, o) {
         				$('#job_search_data_table').datagrid('endEdit', i);// 结束编辑所有行
         			});
        			var file=Nasoft.GetProjectData.getFields('#job_search_data_table');//将对应数据字段加入表输出	
        			var parameters={};
        			parameters.parameter=file.field;
        			menuSetTask.parameters=parameters;
        			$.extend(true,JobData.job,menuSetTask);
         			var engineering_variable_data = $('#job_engineering_variable_setup_table').datagrid('getRows');// 获取当前页面中所有的行
         			var setup_table_data=[];
         			$.each(engineering_variable_data, function(index, o) {
         				$('#job_engineering_variable_setup_table').datagrid('endEdit', index);// 结束编辑所有行
         				setup_table_data.push(o);
         			});
         			var datavaluesetup=JSON.stringify(setup_table_data);
         			$.ajax({
    	 			    url:$.getRootPath()+'/FileInfoCtrl/writeFileContent.do',
    	 				async:false,
    	 				data:{path:project.file_path,newstr:datavaluesetup},
    	 				dataType:'json',
    	 				type:'POST',
    	 				success:function(data){
    	 					if(data){
    	 						$('#setTask_data_win').window('close');
    	 					}else{
    	 						alert('变量设置失败');
    	 					}
    	 					 }
    	 			});
				});
			
			
			
		}
		
		
}