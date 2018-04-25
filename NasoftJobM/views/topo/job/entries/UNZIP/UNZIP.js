Nasoft.Window.fns.UNZIP=function(node){
	Nasoft.Ui_extend.browser_even('#UNZIP');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen=function(){
		try {
			
			
			$('#check_up_ftp').unbind('click').click(function(){	//浏览
				Nasoft.Static.handleFilePostfix('#catalogue_unzip','#catalogue_unzip_h',{},'3','');
			});
			$('#browse_ftp').unbind('click').click(function(){	//浏览
				Nasoft.Static.handleFilePostfix('#goal_unzip','#goal_unzip_h',{},'3','');
			});
			$('#check_up_unzip_a').unbind('click').click(function(){	//浏览
				Nasoft.Static.handleFilePostfix('#shift_unzip','#shift_unzip_h',{},'3','');
			});
			
			
			
			
			node.getEntry().isfromprevious==='Y' && ($("#get_unzip").get(0).checked=true)
			node.getEntry().isfromprevious==='N' && ($("#get_unzip").get(0).checked=false);
			
			node.getEntry().rootzip==='Y' && ($("#true_unzip").get(0).checked=true)
			node.getEntry().rootzip==='N' && ($("#true_unzip").get(0).checked=false);
			
			node.getEntry().createfolder==='Y' && ($("#new_unzip").get(0).checked=true)
			node.getEntry().createfolder==='N' && ($("#new_unzip").get(0).checked=false);
			
			node.getEntry().adddate==='Y' && ($("#date_unzip").get(0).checked=true)
			node.getEntry().adddate==='N' && ($("#date_unzip").get(0).checked=false);
			
			node.getEntry().addtime==='Y' && ($("#time_unzip").get(0).checked=true)
			node.getEntry().addtime==='N' && ($("#time_unzip").get(0).checked=false);
			
			node.getEntry().SpecifyFormat==='Y' && ($("#time_form_unzip").get(0).checked=true)
			node.getEntry().SpecifyFormat==='N' && ($("#time_form_unzip").get(0).checked=false);
			
			node.getEntry().addOriginalTimestamp==='Y' && ($("#add_time_unzip").get(0).checked=true)
			node.getEntry().addOriginalTimestamp==='N' && ($("#add_time_unzip").get(0).checked=false);
			
			node.getEntry().setOriginalModificationDate==='Y' && ($("#add_date_unzip").get(0).checked=true)
			node.getEntry().setOriginalModificationDate==='N' && ($("#add_date_unzip").get(0).checked=false);
			
			node.getEntry().create_move_to_directory==='Y' && ($("#new_unzip_yidong").get(0).checked=true)
			node.getEntry().create_move_to_directory==='N' && ($("#new_unzip_yidong").get(0).checked=false);
			
			
			if(node.getEntry().zipfilename ==''){
				$('#catalogue_unzip').textbox('setValue','');
			}else{
				$('#catalogue_unzip').textbox('setValue',node.getEntry().zipfilename);
			}
			if(node.getEntry().wildcardSource ==''){
				$('#expression_unzip').textbox('setValue','');
			}else{
				$('#expression_unzip').textbox('setValue',node.getEntry().wildcardSource);
			}
			if(node.getEntry().targetdirectory ==''){
				$('#goal_unzip').textbox('setValue','');
			}else{
				$('#goal_unzip').textbox('setValue',node.getEntry().targetdirectory);
			}
			if(node.getEntry().wildcard ==''){
				$('#new_expression_unzip').textbox('setValue','');
			}else{
				$('#new_expression_unzip').textbox('setValue',node.getEntry().wildcard);
			}
			if(node.getEntry().wildcardexclude ==''){
				$('#no_new_expression_unzip').textbox('setValue','');
			}else{
				$('#no_new_expression_unzip').textbox('setValue',node.getEntry().wildcardexclude);
			}
			
			if(node.getEntry().movetodirectory ==''){
				$('#shift_unzip').textbox('setValue','');
			}else{
				$('#shift_unzip').textbox('setValue',node.getEntry().movetodirectory);
			}
			
			if(node.getEntry().nr_limit ==''){
				$('#number_UNZIP').textbox('setValue','');
			}else{
				$('#number_UNZIP').textbox('setValue',node.getEntry().nr_limit);
			}
			
			
			
			 var iffileexistsget = node.getEntry().iffileexists;  //如果文件已存在
	    	 if(iffileexistsget =='SKIP' ){ 
	    		 node.getEntry().iffileexists = '跳过';
	    	 }else if(iffileexistsget =='OVERWRITE'){
	    		 node.getEntry().iffileexists =  '覆盖';
	    	 }else if(iffileexistsget =='UNIQ' ){
	    		 node.getEntry().iffileexists = '唯一名称';
	    	 }else if(iffileexistsget =='FAIL'){
	    		 node.getEntry().iffileexists =  '失败';
	    	 }else if(iffileexistsget =='OVERWRITE_DIFF_SIZE'){
	    		 node.getEntry().iffileexists = '如果大小不一致就覆盖';
	    	 }else if(iffileexistsget == 'OVERWRITE_EQUAL_SIZE'){
	    		 node.getEntry().iffileexists = '如果大小一致就覆盖';
	    	 }else if(iffileexistsget =='OVERWRITE_ZIP_BIG' ){
	    		 node.getEntry().iffileexists = '如果压缩的文件大些就覆盖';
	    	 }else if(iffileexistsget == 'OVERWRITE_ZIP_BIG_EQUAL'){
	    		 node.getEntry().iffileexists = '如果压缩的文件不小于源文件就覆盖';
	    	 }else if(iffileexistsget == 'OVERWRITE_ZIP_BIG_SMALL'){
	    		 node.getEntry().iffileexists = '如果压缩文件大小小些就覆盖';
	    	 }else if(iffileexistsget =='OVERWRITE_ZIP_BIG_SMALL_EQUAL' ){
	    		 node.getEntry().iffileexists = '如果压缩问价不大于源文件大小就覆盖';
	    	 }
	    	 
	    	 var afterunzipget = node.getEntry().afterunzip;  //如果文件已存在
	    	 if(afterunzipget == '0'){ 
	    		 node.getEntry().afterunzip = '什么都不做';
	    	 }else if(afterunzip =='1' ){
	    		 node.getEntry().afterunzip = '删除文件';
	    	 }else if(afterunzip == '2'){
	    		 node.getEntry().afterunzip = '移动文件';
	    	 }
	    	 
	    	 
	    	 var success_conditionget = node.getEntry().success_condition;  //如果文件已存在
	    	 if(success_conditionget == 'success_if_no_errors'){ 
	    		 node.getEntry().success_condition = '所有工作正常';
	    	 }else if(success_conditionget == 'success_when_at_least'){
	    		 node.getEntry().success_condition = '至少运行成功一定数量';
	    	 }else if(success_conditionget =='success_if_errors_less' ){
	    		 node.getEntry().success_condition = '至少运行成功一定数量';
	    	 }
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			//***************************第一部分一般********************************
			$('#school_name_unzip').textbox('setValue',node.text);//设置步骤名称
			
			
			if($('#get_unzip').get(0).checked==false){ //从上一个作业获取参数
				$('#catalogue_unzip').textbox({disabled:false});
				$('#expression_unzip').textbox({disabled:false});
				$('#check_up_ftp').linkbutton('enable');
			}else{
				$('#catalogue_unzip').textbox({disabled:true});
				$('#expression_unzip').textbox({disabled:true});
				$('#check_up_ftp').linkbutton('disable');
			}
			$('#get_unzip').change(function(){
				if($('#get_unzip').get(0).checked==false){ //从上一个作业获取参数
					$('#catalogue_unzip').textbox({disabled:false});
					$('#expression_unzip').textbox({disabled:false});
					$('#check_up_ftp').linkbutton('enable');
				}else{
					$('#catalogue_unzip').textbox({disabled:true});
					$('#expression_unzip').textbox({disabled:true});
					$('#check_up_ftp').linkbutton('disable');
				}
			});
			
			
			
			if($('#time_form_unzip').get(0).checked==false){//指定日期时间格式状态判断
				$('#date_from_unzip').combobox({disabled:true});
				$('#add_time_unzip').attr("disabled",true);
				$('#time_unzip').attr("disabled",false);
				$('#date_unzip').attr("disabled",false);
			}else{
				$('#time_unzip').attr("disabled",true);
				$('#date_unzip').attr("disabled",true);
				$('#date_from_unzip').combobox({disabled:false});
				$('#add_time_unzip').attr("disabled",false);
				
				$('#time_unzip').get(0).checked = false;
				$('#date_unzip').get(0).checked = false;
				
				$('#add_time_unzip').get(0).checked = false;
			}
			
			
			$('#time_form_unzip').change(function(){
				if($('#time_form_unzip').get(0).checked==false){//指定日期时间格式状态判断
					$('#date_from_unzip').combobox({disabled:true});
					$('#add_time_unzip').attr("disabled",true);
					$('#time_unzip').attr("disabled",false);
					$('#date_unzip').attr("disabled",false);
				}else{
					$('#time_unzip').attr("disabled",true);
					$('#date_unzip').attr("disabled",true);
					$('#date_from_unzip').combobox({disabled:false});
					$('#add_time_unzip').attr("disabled",false);
					
					$('#time_unzip').get(0).checked = false;
					$('#date_unzip').get(0).checked = false;
					
					$('#add_time_unzip').get(0).checked = false;
				}
				
			});
			
			
			if($('#date_unzip').get(0).checked==false){
				$('#add_time_unzip').attr("disabled",true);
			}else{
				$('#add_time_unzip').attr("disabled",false);
				$('#add_time_unzip').get(0).checked = false;
			}
			
			
			$('#date_unzip').change(function(){
				if($('#date_unzip').get(0).checked==false){
					$('#add_time_unzip').attr("disabled",true);
				}else{
					$('#add_time_unzip').attr("disabled",false);
					$('#add_time_unzip').get(0).checked = false;
				}
				
			});
			if($('#time_unzip').get(0).checked==false){
				$('#add_time_unzip').attr("disabled",true);
			}else{
				$('#add_time_unzip').attr("disabled",false);
				$('#add_time_unzip').get(0).checked = false;
			}
			
			
			$('#time_unzip').change(function(){
				if($('#time_unzip').get(0).checked==false){
					$('#add_time_unzip').attr("disabled",true);
				}else{
					$('#add_time_unzip').attr("disabled",false);
					$('#add_time_unzip').get(0).checked = false;
				}
				
			});
			
			
			
			
			
			
			
			
			$('#jie_unzip').combobox({ //   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getEntry().afterunzip!='')?node.getEntry().afterunzip:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
				onSelect:function(){
				var control=	$(this).combobox('getValue');
				
					 if(control == '什么都不做'){
						 $('#shift_unzip').textbox({disabled:true});
						 $('#new_unzip_yidong').attr("disabled",true);
						 $('#check_up_unzip_a').linkbutton('disable');
			    	 }else if(control == '删除文件'){
			    		 $('#shift_unzip').textbox({disabled:true});
			    		 $('#new_unzip_yidong').attr("disabled",true);
			    		 $('#check_up_unzip_a').linkbutton('disable');
			    	 }else if(control== '移动文件'){
			    		 $('#shift_unzip').textbox({disabled:false});
			    		 $('#new_unzip_yidong').attr("disabled",false);
			    		 $('#new_unzip_yidong').get(0).checked = false;
			    		 $('#check_up_unzip_a').linkbutton('enable');
			    	 }
				
				}
			});
			
			
			$('#control_coding_unzip').combobox({ //   
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
				onSelect:function(){
				var control=	$(this).combobox('getValue');
				
					 if(control == '所有工作正常'){
						 $('#number_UNZIP').textbox({disabled:true});//不知道什么时候该解除禁止？
			    	 }else if(control == '至少运行成功一定数量'){
			    		 $('#number_UNZIP').textbox({disabled:false});//不知道什么时候该解除禁止？
			    	 }else if(control== '错误数少于'){
			    		 $('#number_UNZIP').textbox({disabled:false});//不知道什么时候该解除禁止？
			    	 }
				
				}
			});
			
			
			$('#date_from_unzip').combobox({ //   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getEntry().date_time_format!='')?node.getEntry().date_time_format:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
			});
			$('#isfile_unzip').combobox({ //   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getEntry().iffileexists!='')?node.getEntry().iffileexists:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				}
			});
			
			
			//***************************第二部分文件********************************
			//***************************第三部分高级********************************
	
			
			//确定
			$('#UNZIP_ok').unbind('click').click(function(e){ //确定保存

			     try {
			    	 var entry = {};
			    	 //***************************第一部分一般********************************
			    	 entry.isfromprevious = $("#get_unzip").prop("checked")? 'Y' : 'N'; 
			    	 entry.rootzip = $("#true_unzip").prop("checked")? 'Y' : 'N'; 
			    	 entry.createfolder = $("#new_unzip").prop("checked")? 'Y' : 'N'; 
			    	 entry.adddate = $("#date_unzip").prop("checked")? 'Y' : 'N'; 
			    	 entry.addtime = $("#time_unzip").prop("checked")? 'Y' : 'N'; 
			    	 
			    	 entry.SpecifyFormat = $("#time_form_unzip").prop("checked")? 'Y' : 'N'; 
			    	 entry.addOriginalTimestamp = $("#add_time_unzip").prop("checked")? 'Y' : 'N'; 
			    	 entry.setOriginalModificationDate = $("#add_date_unzip").prop("checked")? 'Y' : 'N'; 
			    	 
			    	 entry.create_move_to_directory = $("#new_unzip_yidong").prop("checked")? 'Y' : 'N'; 
			    	 
			    	 
			    	 entry.zipfilename =  $('#catalogue_unzip').textbox('getValue');
			    	 entry.wildcardSource =  $('#expression_unzip').textbox('getValue');
			    	 entry.targetdirectory =  $('#goal_unzip').textbox('getValue');
			    	 entry.wildcard =  $('#new_expression_unzip').textbox('getValue');
			    	 entry.wildcardexclude =  $('#no_new_expression_unzip').textbox('getValue');
			    	 
			    	 entry.date_time_format = $('#date_from_unzip').combobox('getValue');  //日期时间格式
			    	 entry.movetodirectory = $('#shift_unzip').combobox('getValue');  //日期时间格式
			    	 entry.nr_limit = $('#number_UNZIP').combobox('getValue');  //日期时间格式
			    	 
			    	 
			    	 
			    	 var iffileexists = $('#isfile_unzip').combobox('getValue');  //如果文件已存在
			    	 if(iffileexists == '跳过'){ 
			    		 entry.iffileexists = 'SKIP';
			    	 }else if(iffileexists == '覆盖'){
			    		 entry.iffileexists = 'OVERWRITE';
			    	 }else if(iffileexists == '唯一名称'){
			    		 entry.iffileexists = 'UNIQ';
			    	 }else if(iffileexists == '失败'){
			    		 entry.iffileexists = 'FAIL';
			    	 }else if(iffileexists == '如果大小不一致就覆盖'){
			    		 entry.iffileexists = 'OVERWRITE_DIFF_SIZE';
			    	 }else if(iffileexists == '如果大小一致就覆盖'){
			    		 entry.iffileexists = 'OVERWRITE_EQUAL_SIZE';
			    	 }else if(iffileexists == '如果压缩的文件大些就覆盖'){
			    		 entry.iffileexists = 'OVERWRITE_ZIP_BIG';
			    	 }else if(iffileexists == '如果压缩的文件不小于源文件就覆盖'){
			    		 entry.iffileexists = 'OVERWRITE_ZIP_BIG_EQUAL';
			    	 }else if(iffileexists == '如果压缩文件大小小些就覆盖'){
			    		 entry.iffileexists = 'OVERWRITE_ZIP_BIG_SMALL';
			    	 }else if(iffileexists == '如果压缩问价不大于源文件大小就覆盖'){
			    		 entry.iffileexists = 'OVERWRITE_ZIP_BIG_SMALL_EQUAL';
			    	 }
			    	 
			    	 var afterunzip = $('#jie_unzip').combobox('getValue');  //如果文件已存在
			    	 if(afterunzip == '什么都不做'){ 
			    		 entry.afterunzip = '0';
			    	 }else if(afterunzip == '删除文件'){
			    		 entry.afterunzip = '1';
			    	 }else if(afterunzip == '移动文件'){
			    		 entry.afterunzip = '2';
			    	 }
			    	 
			    	 
			    	 var success_condition = $('#control_coding_unzip').combobox('getValue');  //如果文件已存在
			    	 if(success_condition == '所有工作正常'){ 
			    		 entry.success_condition = 'success_if_no_errors';
			    	 }else if(success_condition == '至少运行成功一定数量'){
			    		 entry.success_condition = 'success_when_at_least';
			    	 }else if(success_condition == '至少运行成功一定数量'){
			    		 entry.success_condition = 'success_if_errors_less';
			    	 }
			    	//***************************第四部分socks代理********************************
			    	 node.text=$('#school_name_unzip').textbox('getValue');//放入步骤名称
			    	 
			    	 node.setEntry(entry);
					} catch (e) {
						console.log(e)
					}
				$('#UNZIP').window('close');
			});
			$('#UNZIP_cancel').unbind("click").click(function(){
				$('#UNZIP').window('close');
			});
		} catch (e) {
			console.log(e)
		}
	};
	onBeforeClose=function(){}//关闭
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}