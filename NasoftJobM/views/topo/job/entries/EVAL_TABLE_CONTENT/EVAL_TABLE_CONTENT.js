Nasoft.Window.fns.EVAL_TABLE_CONTENT=function(node){
	Nasoft.Ui_extend.browser_even('#EVAL_TABLE_CONTENT');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen=function(){
		try {
			$('#school_name_EVAL_TABLE_CONTENT').textbox('setValue',node.text);
		 	
			node.getEntry().is_custom_sql==='Y' && ($("#entry_zidingyiSql_EVAL_TABLE_CONTENT").get(0).checked=true)
			node.getEntry().is_custom_sql==='N' && ($("#entry_zidingyiSql_EVAL_TABLE_CONTENT").get(0).checked=false);
			
			node.getEntry().is_usevars==='Y' && ($("#entry_bianliang_EVAL_TABLE_CONTENT").get(0).checked=true)
			node.getEntry().is_usevars==='N' && ($("#entry_bianliang_EVAL_TABLE_CONTENT").get(0).checked=false);
			
			node.getEntry().clear_result_rows==='Y' && ($("#entry_return_lEVAL_TABLE_CONTENT").get(0).checked=true)
			node.getEntry().clear_result_rows==='N' && ($("#entry_return_lEVAL_TABLE_CONTENT").get(0).checked=false);
			
			node.getEntry().add_rows_result==='Y' && ($("#entry_returnh_EVAL_TABLE_CONTENT").get(0).checked=true)
			node.getEntry().add_rows_result==='N' && ($("#entry_returnh_EVAL_TABLE_CONTENT").get(0).checked=false);
			 var connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
			$('#entry_connect_EVAL_TABLE_CONTENT').combobox({
					data:connections,
					valueField:'name',   //将connections的id字段绑定在下拉表单的value上 
					textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
					onLoadSuccess:function(data){
						var connectionName;
						/**
						 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
						 * 否则去直接获取connection的Name选中对应项,
						 * 若没有则不选中任何
						 */
						connectionName=node.getEntry().connection!=''?node.getEntry().connection:node.getConnectionName();
						console.log("dbconnection : "+connectionName)
						connectionName!='' && $(this).combobox('select',connectionName);
					},
					onChange:function(newValue,oldValue){
						$.each(connections,function(i,o){//遍历下拉表单的所有数据项
							if(newValue==o.name){//筛选出当前点击的下拉表单项的connection
								//当选项发生改变时将当前被选项的name赋值个node的connectionName
								node.setConnectionName(o.name);
								databaseName = o;
							}
						});
					}
				});
			if(node.getEntry().schemaname ==''){
				$('#fileSql_entry_EVAL_TABLE_CONTENT').textbox('setValue','');
			}else{
				$('#fileSql_entry_EVAL_TABLE_CONTENT').textbox('setValue',node.getEntry().schemaname);
			}
			if(node.getEntry().tablename ==''){
				$('#table_entry_EVAL_TABLE_CONTENT').textbox('setValue','');
			}else{
				$('#table_entry_EVAL_TABLE_CONTENT').textbox('setValue',node.getEntry().tablename);
			}
			if(node.getEntry().limit ==''){
				$('#shuzhi_entry_EVAL_TABLE_CONTENT').textbox('setValue','');
			}else{
				$('#shuzhi_entry_EVAL_TABLE_CONTENT').textbox('setValue',node.getEntry().limit);
			}
			if (node.getEntry().connection == undefined) {
				$('#entry_connect_EVAL_TABLE_CONTENT').combobox('setValue','');
			} else {
				$('#entry_connect_EVAL_TABLE_CONTENT').combobox('setValue', node.getEntry().connection);
			}
			
			var success_condition = node.getEntry().success_condition;  //如果文件已存在
			 if(success_condition == 'rows_count_equal'){ 
				 node.getEntry().success_condition = '等于';
	    	 }else if(success_condition =='rows_count_different'){
	    		 node.getEntry().success_condition = '不等于' ;
	    	 }else if(success_condition =='rows_count_smaller' ){
	    		 node.getEntry().success_condition = '小于';
	    	 }else if(success_condition == 'rows_count_smaller_equal'){
	    		 node.getEntry().success_condition = '不大于' ;
	    	 }else if(success_condition == 'rows_count_greater'){
	    		 node.getEntry().success_condition ='大于' ;
	    	 }else if(success_condition == 'rows_count_greater_equal'){
	    		 node.getEntry().success_condition = '不小于';
	    	 }
			
			
			$('#suncess_ECAL_EVAL_TABLE_CONTENT').combobox({ //   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getEntry().success_condition!='')?node.getEntry().success_condition:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
			});
			var entry=$.codeFilter('de',node.getEntry());//获取步骤对象			
			
		   	var  editor;
	    	 editor = Nasoft.Util.createEditor({
	    			mode:"sql",
					ele:"textarea_evalcon"
				});
	    		editor.setValue(entry.custom_sql?entry.custom_sql:'');//改成input的多行
	    		
			if($('#entry_zidingyiSql_EVAL_TABLE_CONTENT').get(0).checked==false){//指定日期时间格式状态判断
				$('#entry_bianliang_EVAL_TABLE_CONTENT').attr("disabled",true);
				$('#entry_return_lEVAL_TABLE_CONTENT').attr("disabled",true);
				$('#entry_returnh_EVAL_TABLE_CONTENT').attr("disabled",true);
				editor.setReadOnly(true);
				$('#fileSql_entry_EVAL_TABLE_CONTENT').textbox({disabled:false});
				$('#table_entry_EVAL_TABLE_CONTENT').textbox({disabled:false});
				$('#entry_bianliang_EVAL_TABLE_CONTENT').get(0).checked = false;
				$('#entry_return_lEVAL_TABLE_CONTENT').get(0).checked = false;
				$('#entry_returnh_EVAL_TABLE_CONTENT').get(0).checked = false;
			}else{
				editor.setReadOnly(false);
				$('#entry_bianliang_EVAL_TABLE_CONTENT').attr("disabled",false);
				$('#entry_return_lEVAL_TABLE_CONTENT').attr("disabled",false);
				$('#entry_returnh_EVAL_TABLE_CONTENT').attr("disabled",false);
				$('#fileSql_entry_EVAL_TABLE_CONTENT').textbox({disabled:true});
				$('#table_entry_EVAL_TABLE_CONTENT').textbox({disabled:true});
			}
			
			$('#entry_zidingyiSql_EVAL_TABLE_CONTENT').change(function(){
				if($('#entry_zidingyiSql_EVAL_TABLE_CONTENT').get(0).checked==false){//指定日期时间格式状态判断
					$('#entry_bianliang_EVAL_TABLE_CONTENT').attr("disabled",true);
					$('#entry_return_lEVAL_TABLE_CONTENT').attr("disabled",true);
					$('#entry_returnh_EVAL_TABLE_CONTENT').attr("disabled",true);
					$('#fileSql_entry_EVAL_TABLE_CONTENT').textbox({disabled:false});
					$('#table_entry_EVAL_TABLE_CONTENT').textbox({disabled:false});
					$('#entry_bianliang_EVAL_TABLE_CONTENT').get(0).checked = false;
					$('#entry_return_lEVAL_TABLE_CONTENT').get(0).checked = false;
					$('#entry_returnh_EVAL_TABLE_CONTENT').get(0).checked = false;
					editor.setReadOnly(true);
				}else{
					editor.setReadOnly(false);
					$('#entry_bianliang_EVAL_TABLE_CONTENT').attr("disabled",false);
					$('#entry_return_lEVAL_TABLE_CONTENT').attr("disabled",false);
					$('#entry_returnh_EVAL_TABLE_CONTENT').attr("disabled",false);
					$('#fileSql_entry_EVAL_TABLE_CONTENT').textbox({disabled:true});
					$('#table_entry_EVAL_TABLE_CONTENT').textbox({disabled:true});
				}
			});
			
		 	
			//确定
			$('#EVAL_TABLE_CONTENT_ok').unbind('click').click(function(e){ //确定保存

			     try {
			    	 var entry = {};
			    	 node.text=$('#school_name_EVAL_TABLE_CONTENT').textbox('getValue');//放入步骤名称
			    	 entry.schemaname=$('#fileSql_entry_EVAL_TABLE_CONTENT').textbox('getValue');
			    	 entry.tablename=$('#table_entry_EVAL_TABLE_CONTENT').textbox('getValue');
			    	 entry.limit=$('#shuzhi_entry_EVAL_TABLE_CONTENT').textbox('getValue');
			    	 
			    	 var success_condition = $('#suncess_ECAL_EVAL_TABLE_CONTENT').combobox('getValue');  
			    	 if(success_condition == '等于'){ 
			    		 entry.success_condition ='rows_count_equal' ;
			    	 }else if(success_condition =='不等于' ){
			    		 entry.success_condition = 'rows_count_different';
			    	 }else if(success_condition =='小于' ){
			    		 entry.success_condition = 'rows_count_smaller';
			    	 }else if(success_condition =='不大于' ){
			    		 entry.success_condition = 'rows_count_smaller_equal';
			    	 }else if(success_condition =='大于' ){
			    		 entry.success_condition = 'rows_count_greater';
			    	 }else if(success_condition =='不小于' ){
			    		 entry.success_condition = 'rows_count_greater_equal';
			    	 }
			    	 if($('#entry_connect_EVAL_TABLE_CONTENT').combobox('getValue')!=''&&$('#entry_connect_EVAL_TABLE_CONTENT').combobox('getValue')!=null){
			    		 entry.connection=$('#entry_connect_EVAL_TABLE_CONTENT').combobox('getValue');
         	            }
			    	 
			    	 entry.is_custom_sql = $("#entry_zidingyiSql_EVAL_TABLE_CONTENT").prop("checked")? 'Y' : 'N'; 
			    	 entry.is_usevars = $("#entry_bianliang_EVAL_TABLE_CONTENT").prop("checked")? 'Y' : 'N'; 
			    	 entry.clear_result_rows = $("#entry_return_lEVAL_TABLE_CONTENT").prop("checked")? 'Y' : 'N'; 
			    	 entry.add_rows_result = $("#entry_returnh_EVAL_TABLE_CONTENT").prop("checked")? 'Y' : 'N'; 
			    	 entry.custom_sql = editor.getValue();
			    	 node.setEntry(entry);
					} catch (e) {
						console.log(e)
					}
				$('#EVAL_TABLE_CONTENT').window('close');
			});
			$('#EVAL_TABLE_CONTENT_cancel').unbind("click").click(function(){
				$('#EVAL_TABLE_CONTENT').window('close');
			});
		} catch (e) {
			console.log(e)
		}
	};
	onBeforeClose=function(){}//关闭
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}