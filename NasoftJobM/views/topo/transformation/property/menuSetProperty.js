
Nasoft.Window.menuSetProperty={
		init : function(){
			Nasoft.Ajax.loadDoc($.getRootPath()+"/views/topo/transformation/property/menuSetProperty.html","body");
			var that = this;
			$(document).keydown(function(event){
				  switch(event.keyCode) {
				  case 38:
					  event.ctrlKey && $(that.grid).datagrid("selectmoveUp",r);
				  case 40:
					  event.ctrlKey && $(that.grid).datagrid("selectmoveDown",r);
				  }
				});
		},
		grid : null,
		/**
		 * 为转换属性设值
		 */
		showSetingValue:function(project){
		var that = this;
		var info = Nasoft.Topo.getSelectedTab().scene;
		var	connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
		var infoData = info.getCore('1');
	    var infos = infoData.transformation.info;//获取步骤对象			
			$('#convert_name').textbox('setValue',infos.name);
			$('#convert_describe').textbox('setValue',infos.description);
			$('#convert_describes').textbox('setValue',infos.extended_description);
			$('#convert_version').textbox('setValue',infos.trans_version);
		
		var conert_status_data=[{'id':'0','name':''},{'id':'1','name':'草案'},{'id':'2','name':'产品'}]
		
			$('#conert_status').combobox({//状态
					data:conert_status_data,
					valueField:'id',   
					textField:'name',  
					onLoadSuccess:function(data){
						var connectionName;
						connectionName!='' && $(this).combobox('select',infoData.transformation.info.trans_status);
					}
				});
			$('#setparameters_data_grid').datagrid({
				fit:true,
				rownumbers:true,
				singleSelect:true,
				fitColumns:true,
			    data:function(){
			    	if(infoData.transformation.info.parameters){
						if($.isArray(infoData.transformation.info.parameters.parameter)){
							return infoData.transformation.info.parameters.parameter;
						}else{
							return [infoData.transformation.info.parameters.parameter];
						}
					}else{
						return [];
					}
			    }(),
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					fitColumns:true,
					handler: function(){//添加一行
						$('#setparameters_data_grid').datagrid(//新增加一行
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
						var del_row = $('#setparameters_data_grid').datagrid('getSelected');
						var del_rowIndex = $('#setparameters_data_grid').datagrid('getRowIndex',del_row);
						$('#setparameters_data_grid').datagrid('deleteRow',del_rowIndex);
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
						j===i || $('#setparameters_data_grid').datagrid('endEdit',j);
					});
		        	$(this).datagrid('beginEdit',i);//编辑点击的行
	    		},
				onSelect : function(i,r){
					that.grid = this;
				}
			});
			 //工程变量设置
			 $('#menupro_engineering_variable_setup_table').datagrid({//字段的界面  
					fit:true,
					rownumbers:true,
					singleSelect:true,
					fitColumns:true,
					toolbar: [{
						iconCls: 'icon-add',
						text : "增加",
						fitColumns:true,
						handler: function(){//添加一行
							$('#menupro_engineering_variable_setup_table').datagrid(//新增加一行
									'appendRow',
									{
										name:'', 
										default_value:''
									});}
					},{
						text : "删除",
						iconCls : 'icon-remove',
						handler : function() {
							var del_row = $('#menupro_engineering_variable_setup_table').datagrid('getSelected');
							var del_rowIndex = $('#menupro_engineering_variable_setup_table').datagrid('getRowIndex',del_row);
							$('#menupro_engineering_variable_setup_table').datagrid('deleteRow',del_rowIndex);
						}
					}],
				    columns:[[    
				        {field:'name',title:'变量名称',width:100,editor:{type:'text'}},    
				        {field:'default_value',title:'值',width:100,editor:{type:'text'}},  
				    ]],
		    		onClickRow:function(i,r){
				    	var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===i || $('#menupro_engineering_variable_setup_table').datagrid('endEdit',j);
						});
			        	$(this).datagrid('beginEdit',i);//编辑点击的行
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
				
				$('#set_data_win_cancel').unbind('click').click(function(e){//取消按钮
					$('#set_data_win').window('close');
				});
				
				
				$('#set_data_win_ok').unbind('click').click(function(e){//确定按钮
				    var menuSetProperty={};
				    menuSetProperty.name= $('#convert_name').textbox('getValue');
				    menuSetProperty.description= $('#convert_describe').textbox('getValue');
				    menuSetProperty.extended_description= $('#convert_describes').textbox('getValue');
				    menuSetProperty.trans_version= $('#convert_version').textbox('getValue');
				    menuSetProperty.trans_status=$('#conert_status').combobox('getValue');
                    
                    var maxdate={}
                    menuSetProperty.maxdate=maxdate;
                    var rows = $('#setparameters_data_grid').datagrid('getRows');// 获取当前页面中所有的行
         			$.each(rows, function(i, o) {
         				$('#setparameters_data_grid').datagrid('endEdit', i);// 结束编辑所有行
         			});
        			var file=Nasoft.GetProjectData.getFields('#setparameters_data_grid');//将对应数据字段加入表输出	
        			var parameters={};
        			parameters.parameter=file.field;
        			menuSetProperty.parameters=parameters;
         			
         			$.extend(true,infoData.transformation.info,menuSetProperty);
                    
                    var engineering_variable_data = $('#menupro_engineering_variable_setup_table').datagrid('getRows');// 获取当前页面中所有的行
         			var setup_table_data=[];
         			$.each(engineering_variable_data, function(index, o) {
         				$('#menupro_engineering_variable_setup_table').datagrid('endEdit', index);// 结束编辑所有行
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
    	 					console.log(data);
    	 					if(data){
    	 						$('#set_data_win').window('close');
    	 					}else{
    	 						alert('变量设置失败');
    	 					}
    	 					 }
    	 			});
				});
		}
}
