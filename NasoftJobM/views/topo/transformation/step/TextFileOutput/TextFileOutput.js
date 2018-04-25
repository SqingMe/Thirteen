 Nasoft.Topo.transferFns.TextFileOutput=function(node){
	 var file=node.getStep().fields;//将对应数据字段加入表输出
		var textFileOutput = [];
		if (!!file) {
			if (file.field.constructor == Array) {// 数组
				$.each(file.field, function(i, o) {
					var field = {};
					field.name = o.name;
					field.type = o.type;
					field.format = o.format;
					field.length = o.length;
					field.precision = o.precision;
					field.trim_type = o.trim_type;
					textFileOutput.push(field)
				});
			} else {// 对象
				var oldFile = {}
				oldFile.name = file.field.name;
				oldFile.type = file.field.type;
				oldFile.format = file.field.format;
				oldFile.length = file.field.length;
				oldFile.precision = file.field.precision;
				oldFile.trim_type = file.field.trim_type;
				textFileOutput.push(oldFile)
			}
		}
	
        return textFileOutput;
  };
Nasoft.Window.fns.TextFileOutput=function(node){
	Nasoft.Ui_extend.browser_even('#TextFileOutput');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen=function(){
		try {
			console.log(node.getStep());
			var transferArray=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(!!transferArray){
				var transfer=Nasoft.Util.transferArray_copy(transferArray);
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			var options={
					onClick:function(node){
						try{
							var nasoftProjectrootpath='${nasoftProjectrootpath}';
							var usdir='${usdir}';
							var usfile='${usfile}';
							var groupdir='${groupdir}';
							var path=node.path.split("\\");
							var pathval='';
							for(var i=2;i<path.length-1;i++){
								pathval=pathval+path[i]+'\\';
							}
							pathval=pathval+path[path.length-1];
							var testpath=nasoftProjectrootpath+usfile+groupdir+pathval;
							if(!(node.state=='closed' || node.children)){
								options.onOk(testpath,'#file_name_textFileOutput',node);
								$('#static_handleFile_win').window('close');//关闭当前窗口
						}else{
							$('#file_name_textFileOutput_h').val(testpath+node.separator);			
							$('#file_name_textFileOutput').textbox('setValue',testpath+node.separator);						
							$('#static_handleFile_win').window('close');	
						}
						}catch (e) {
							console.log(e)
						}							
					},
					onSelect:function(node){
						try{
							$('#static_handleFile_ok').linkbutton('enable');
							var nasoftProjectrootpath='${nasoftProjectrootpath}';
							var usdir='${usdir}';
							var usfile='${usfile}';
							var groupdir='${groupdir}';
							var path=node.path.split("\\");
							var pathval='';
							for(var i=2;i<path.length-1;i++){
								pathval=pathval+path[i]+'\\';
							}
							pathval=pathval+path[path.length-1];
							options.onOk(nasoftProjectrootpath+usfile+groupdir+pathval,'#static_handleFile_path',node);
						}catch (e) {
							console.log(e)
						}							
					},
					onOk:function(path_value,$show,node){
						if(!(node.state=='closed' || node.children)){
							
						var sl=path_value.split('\.');
						if(sl.length>1){
							delete sl[sl.length-1]
							sl.length = sl.length-1;
							var  val= sl.join('\.')
							$($show).textbox('setValue',val);
						}else{
							$($show).textbox('setValue',sl);
						}
			
					}else{
						$($show).textbox('setValue',path_value);		//给用户显示的文件路径赋值					
						
					}
						
				}
					
			}
			//文件上传
			$('#fileLook_textFileOutput').unbind('click').click(function(){	//点击浏览
				Nasoft.Static.handleFilePostfix('#file_name_textFileOutput','#file_name_textFileOutput_h',options,'3','');
			});	
			//*****************************第一部分（文件）*************************************
			$('#step_name_textFileOutput').textbox('setValue',node.text);//设置步骤名称
			
			//文件浏览
			if( node.getStep().file==undefined || node.getStep().file.name == ''){
				 $('#file_name_textFileOutput').textbox('setValue','');
			}else{
				 $('#file_name_textFileOutput').textbox('setValue',node.getStep().file.name);
				 $('#file_name_textFileOutput_h').val(node.getStep().file.name);
			}
			
			//结果输送至命令行或脚本
			$('#deliver_script_textFileOutput').change(function(){//显示和隐藏
				if($("#deliver_script_textFileOutput").prop("checked")==true){
					$("#father_catalogue_textFileOutput").attr("disabled",true);
				}else{
					$("#father_catalogue_textFileOutput").attr("disabled",false);
				}
			});
			
			if(node.getStep().file == undefined){
				$("#deliver_script_textFileOutput").get(0).checked=false//
				$("#deliver_script_textFileOutput").attr("disabled",false);//
				$("#father_catalogue_textFileOutput").attr("disabled",false);//
			}else if(node.getStep().file.is_command==='N'){
				$("#deliver_script_textFileOutput").get(0).checked=false
				$("#father_catalogue_textFileOutput").attr("disabled",false);
			}else if(node.getStep().file.is_command==='Y'){
				$("#deliver_script_textFileOutput").get(0).checked=true
				$("#father_catalogue_textFileOutput").attr("disabled",true);
			}
			//输出传递到servlet
			$('#output_servlet_textFileOutput').change(function(){//隐藏和显示
				if($("#output_servlet_textFileOutput").prop("checked")==true){
					$("#deliver_script_textFileOutput").attr("disabled",true);
					$("#file_name_textFileOutput").textbox({disabled:true});
					$("#father_catalogue_textFileOutput").attr("disabled",true);
					$("#no_found_file_textFileOutput").attr("disabled",true);

					$("#file_name_field_textFileOutput").textbox({disabled:true});
					$("#expand_name_textFileOutput").textbox({disabled:true});
					$("#step_count_textFileOutput").attr("disabled",true);
					$("#partition_mark_textFileOutput").attr("disabled",true);
					$("#file_name_date_textFileOutput").attr("disabled",true);
					$("#file_name_time_textFileOutput").attr("disabled",true);
					$("#appoint_date_date_textFileOutput").attr("disabled",true);
					$("#dateTime_format_textFileOutput").textbox({disabled:true});
					$("#add_file_name_textFileOutput").attr("disabled",true);
					
				}else{
					$("#deliver_script_textFileOutput").attr("disabled",false);
					$("#file_name_textFileOutput").textbox({disabled:false});
					$("#father_catalogue_textFileOutput").attr("disabled",false);
					$("#no_found_file_textFileOutput").attr("disabled",false);

					$("#file_name_field_textFileOutput").textbox({disabled:false});
					$("#expand_name_textFileOutput").textbox({disabled:false});
					$("#step_count_textFileOutput").attr("disabled",false);
					$("#partition_mark_textFileOutput").attr("disabled",false);
					$("#file_name_date_textFileOutput").attr("disabled",false);
					$("#file_name_time_textFileOutput").attr("disabled",false);
					$("#appoint_date_date_textFileOutput").attr("disabled",false);
					$("#dateTime_format_textFileOutput").textbox({disabled:false});
					$("#add_file_name_textFileOutput").attr("disabled",false);
					after_field_textFileOutput();
				}
			});
			function after_field_textFileOutput(){
				var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArry){
					var  transfer=Nasoft.Util.transferArray_copy(transferArry)
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					$('#file_name_field_textFileOutput').combobox({
						valueField :"value",
						textField : "text",
						data :Nasoft.Util.file_name_combobox(transfer)
					});
				}
			}
			if(node.getStep().file == undefined){
				$('#output_servlet_textFileOutput').get(0).checked=false;
				$("#deliver_script_textFileOutput").attr("disabled",false);
				$("#output_servlet_textFileOutput").get(0).checked=false
				$("#file_name_textFileOutput").textbox({disabled:false});
				$("#father_catalogue_textFileOutput").attr("disabled",false);
				$("#no_found_file_textFileOutput").attr("disabled",false);

				$("#file_name_field_textFileOutput").textbox({disabled:false});
				$("#expand_name_textFileOutput").textbox({disabled:false});
				$("#step_count_textFileOutput").attr("disabled",false);
				$("#partition_mark_textFileOutput").attr("disabled",false);
				$("#file_name_date_textFileOutput").attr("disabled",false);
				$("#file_name_time_textFileOutput").attr("disabled",false);
				$("#appoint_date_date_textFileOutput").attr("disabled",false);
				$("#dateTime_format_textFileOutput").textbox({disabled:false});
				$("#add_file_name_textFileOutput").attr("disabled",false);
				after_field_textFileOutput()
			}else if(node.getStep().file.servlet_output==='N'){
				$('#output_servlet_textFileOutput').get(0).checked=false;
				$("#deliver_script_textFileOutput").attr("disabled",false);
				$("#output_servlet_textFileOutput").get(0).checked=false
				$("#file_name_textFileOutput").textbox({disabled:false});
				$("#father_catalogue_textFileOutput").attr("disabled",false);
				$("#no_found_file_textFileOutput").attr("disabled",false);

				$("#file_name_field_textFileOutput").textbox({disabled:false});
				$("#expand_name_textFileOutput").textbox({disabled:false});
				$("#step_count_textFileOutput").attr("disabled",false);
				$("#partition_mark_textFileOutput").attr("disabled",false);
				$("#file_name_date_textFileOutput").attr("disabled",false);
				$("#file_name_time_textFileOutput").attr("disabled",false);
				$("#appoint_date_date_textFileOutput").attr("disabled",false);
				$("#dateTime_format_textFileOutput").textbox({disabled:false});
				$("#add_file_name_textFileOutput").attr("disabled",false);
				after_field_textFileOutput()
			}else if(node.getStep().file.servlet_output==='Y'){
				$('#output_servlet_textFileOutput').get(0).checked=true;
				$("#deliver_script_textFileOutput").attr("disabled",true);
				$("#output_servlet_textFileOutput").get(0).checked=true
				$("#file_name_textFileOutput").textbox({disabled:true});
				$("#father_catalogue_textFileOutput").attr("disabled",true);
				$("#no_found_file_textFileOutput").attr("disabled",true);

				$("#file_name_field_textFileOutput").textbox({disabled:true});
				$("#expand_name_textFileOutput").textbox({disabled:true});
				$("#step_count_textFileOutput").attr("disabled",true);
				$("#partition_mark_textFileOutput").attr("disabled",true);
				$("#file_name_date_textFileOutput").attr("disabled",true);
				$("#file_name_time_textFileOutput").attr("disabled",true);
				$("#appoint_date_date_textFileOutput").attr("disabled",true);
				$("#dateTime_format_textFileOutput").textbox({disabled:true});
				$("#add_file_name_textFileOutput").attr("disabled",true);
				
			}
			
			//创建父目录
			if(node.getStep().create_parent_folder == undefined){
				$("#father_catalogue_textFileOutput").get(0).checked=false//
			}else if(node.getStep().create_parent_folder==='N'){
				$("#father_catalogue_textFileOutput").get(0).checked=false
			}else if(node.getStep().create_parent_folder==='Y'){
				$("#father_catalogue_textFileOutput").get(0).checked=true
			}
			
			//启动时不创建文件
			if(node.getStep().file == undefined){
				$("#no_found_file_textFileOutput").get(0).checked=true//
			}else if(node.getStep().file.do_not_open_new_file_init==='N'){
				$("#no_found_file_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.do_not_open_new_file_init==='Y'){
				$("#no_found_file_textFileOutput").get(0).checked=true
			}
			//从字段中获取文件名
			$('#obtain_file_textFileOutput').change(function(){//隐藏和显示
				if($("#obtain_file_textFileOutput").prop("checked")==true){
					$("#no_found_file_textFileOutput").get(0).checked=true;
					$("#file_name_textFileOutput").textbox({disabled:true});
					$("#no_found_file_textFileOutput").attr("disabled",true);
					$("#step_count_textFileOutput").attr("disabled",true);
					$("#partition_mark_textFileOutput").attr("disabled",true);
					$("#file_name_date_textFileOutput").attr("disabled",true);
					$("#file_name_time_textFileOutput").attr("disabled",true);
					$("#appoint_date_date_textFileOutput").attr("disabled",true);
					$("#dateTime_format_textFileOutput").textbox({disabled:true});			
					$("#step_count_textFileOutput").get(0).checked=false;
					$("#partition_mark_textFileOutput").get(0).checked=false;
					$("#file_name_date_textFileOutput").get(0).checked=false;
					$("#file_name_time_textFileOutput").get(0).checked=false;
					$("#appoint_date_date_textFileOutput").get(0).checked=false;
					
					$("#file_name_field_textFileOutput").textbox({disabled:false});
					after_field_textFileOutput();
				}else{
					$("#no_found_file_textFileOutput").get(0).checked=true;
					$("#file_name_textFileOutput").textbox({disabled:false});
					$("#no_found_file_textFileOutput").attr("disabled",false);
					$("#step_count_textFileOutput").attr("disabled",false);
					$("#partition_mark_textFileOutput").attr("disabled",false);
					$("#file_name_date_textFileOutput").attr("disabled",false);
					$("#file_name_time_textFileOutput").attr("disabled",false);
					$("#appoint_date_date_textFileOutput").attr("disabled",false);
					$("#dateTime_format_textFileOutput").textbox({disabled:false});
					
					
					
					$("#file_name_field_textFileOutput").textbox({disabled:true});
				}
			});
			if(node.getStep().fileNameInField == undefined){
				$("#obtain_file_textFileOutput").get(0).checked=false;//
				$("#no_found_file_textFileOutput").get(0).checked=false;
				$("#file_name_textFileOutput").textbox({disabled:false});
				$("#no_found_file_textFileOutput").attr("disabled",false);
				$("#step_count_textFileOutput").attr("disabled",false);
				$("#partition_mark_textFileOutput").attr("disabled",false);
				$("#file_name_date_textFileOutput").attr("disabled",false);
				$("#file_name_time_textFileOutput").attr("disabled",false);
				$("#appoint_date_date_textFileOutput").attr("disabled",false);
				$("#dateTime_format_textFileOutput").textbox({disabled:false});
				
				
				
				$("#dateTime_format_textFileOutput").textbox({disabled:true});
			}else if(node.getStep().fileNameInField==='N'){
				$("#obtain_file_textFileOutput").get(0).checked=false;//
				$("#file_name_textFileOutput").textbox({disabled:false});
				$("#no_found_file_textFileOutput").attr("disabled",false);
				$("#step_count_textFileOutput").attr("disabled",false);
				$("#partition_mark_textFileOutput").attr("disabled",false);
				$("#file_name_date_textFileOutput").attr("disabled",false);
				$("#file_name_time_textFileOutput").attr("disabled",false);
				$("#appoint_date_date_textFileOutput").attr("disabled",false);
				$("#dateTime_format_textFileOutput").textbox({disabled:false});
				$("#dateTime_format_textFileOutput").textbox({disabled:true});
			}else if(node.getStep().fileNameInField==='Y'){
				$("#obtain_file_textFileOutput").get(0).checked=true;//
				$("#no_found_file_textFileOutput").get(0).checked=true
				$("#file_name_textFileOutput").textbox({disabled:true});
				$("#no_found_file_textFileOutput").attr("disabled",true);
				$("#step_count_textFileOutput").attr("disabled",true);
				$("#partition_mark_textFileOutput").attr("disabled",true);
				$("#file_name_date_textFileOutput").attr("disabled",true);
				$("#file_name_time_textFileOutput").attr("disabled",true);
				$("#appoint_date_date_textFileOutput").attr("disabled",true);
				$("#dateTime_format_textFileOutput").textbox({disabled:true});
				
				$("#step_count_textFileOutput").get(0).checked=false;
				$("#partition_mark_textFileOutput").get(0).checked=false;
				$("#file_name_date_textFileOutput").get(0).checked=false;
				$("#file_name_time_textFileOutput").get(0).checked=false;
				$("#appoint_date_date_textFileOutput").get(0).checked=false;		
				$("#dateTime_format_textFileOutput").textbox({disabled:false});
				after_field_textFileOutput();
			}
			
			//文件名字段
			if(node.getStep().fileNameField==undefined){
				$('#file_name_field_textFileOutput').textbox('setValue','');
			}else{
				$('#file_name_field_textFileOutput').textbox('setValue',node.getStep().fileNameField);
			}
			
			//扩展名
			if(node.getStep().file==undefined){
				$('#expand_name_textFileOutput').textbox('setValue','txt');
			}else{
				$('#expand_name_textFileOutput').textbox('setValue',node.getStep().file.extention);
			}
			
			//文件名里包含步骤数
			if(node.getStep().file == undefined){
				$("#step_count_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.split==='N'){
				$("#step_count_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.split==='Y'){
				$("#step_count_textFileOutput").get(0).checked=true
			}
			
			//文件名里包含数据分区号
			if(node.getStep().file == undefined){
				$("#partition_mark_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.haspartno==='N'){
				$("#partition_mark_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.haspartno==='Y'){
				$("#partition_mark_textFileOutput").get(0).checked=true
			}
			
			//文件名里包含日期
			if(node.getStep().file == undefined){
				$("#file_name_date_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.add_date==='N'){
				$("#file_name_date_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.add_date==='Y'){
				$("#file_name_date_textFileOutput").get(0).checked=true
			}
			
			//文件名里包含时间
			if(node.getStep().file == undefined){
				$("#file_name_time_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.add_time==='N'){
				$("#file_name_time_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.add_time==='Y'){
				$("#file_name_time_textFileOutput").get(0).checked=true
			}
			
			//指定日期时间格式
			$('#appoint_date_date_textFileOutput').change(function(){//隐藏和显示
				if($("#appoint_date_date_textFileOutput").prop("checked")==true){
					$("#file_name_date_textFileOutput").attr("disabled",true);
					$("#file_name_time_textFileOutput").attr("disabled",true);
					$("#file_name_date_textFileOutput").get(0).checked=false;
					$("#file_name_time_textFileOutput").get(0).checked=false;
					$("#dateTime_format_textFileOutput").textbox({disabled:false});
				}else{
					$("#file_name_date_textFileOutput").attr("disabled",false);
					$("#file_name_time_textFileOutput").attr("disabled",false);
					$("#dateTime_format_textFileOutput").textbox({disabled:true});
				}
			});
			
			
			if(node.getStep().file == undefined){//指定日期时间格式
				$("#appoint_date_date_textFileOutput").get(0).checked=false//
				$("#file_name_date_textFileOutput").attr("disabled",false);
				$("#file_name_time_textFileOutput").attr("disabled",false);
				$("#dateTime_format_textFileOutput").textbox({disabled:true});
			}else if(node.getStep().file.SpecifyFormat==='N'){
				$("#appoint_date_date_textFileOutput").get(0).checked=false//
				$("#file_name_date_textFileOutput").attr("disabled",false);
				$("#file_name_time_textFileOutput").attr("disabled",false);
				$("#dateTime_format_textFileOutput").textbox({disabled:true});
			}else if(node.getStep().file.SpecifyFormat==='Y'){
				$("#appoint_date_date_textFileOutput").get(0).checked=true//
				$("#file_name_date_textFileOutput").attr("disabled",true);
				$("#file_name_time_textFileOutput").attr("disabled",true);
				$("#dateTime_format_textFileOutput").textbox({disabled:false});
				$("#file_name_date_textFileOutput").get(0).checked=false;
				$("#file_name_time_textFileOutput").get(0).checked=false;
			}
			
			//日期时间格式
			$('#dateTime_format_textFileOutput').combobox({
				onLoadSuccess:function(){
					var date_time_format= node.getStep().file!=undefined ? node.getStep().file.date_time_format : '';
					date_time_format!='' && $('#dateTime_format_textFileOutput').combobox('select',date_time_format);
				},
			});
			
			//结果中添加文件名
			if(node.getStep().file == undefined){
				$("#add_file_name_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.add_to_result_filenames==='N'){
				$("#add_file_name_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.add_to_result_filenames==='Y'){
				$("#add_file_name_textFileOutput").get(0).checked=true
			}
			
			//*****************************第二部分（内容）*************************************
			//追加方式
			if(node.getStep().file == undefined){
				$("#add_to_way_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.append==='N'){
				$("#add_to_way_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.append==='Y'){
				$("#add_to_way_textFileOutput").get(0).checked=true
			}

			//分隔符
			var count = 0;//点击分隔符按钮
			$('#insert_textFileOutput').click(function(){
				var tab = '';
				count++;
				for(var i = 0 ; i<count ; i++){
					console.log(count);
					 tab+="	";	 					
				}
				$('#separate_symbol_textFileOutput').textbox('setValue',tab+';')
			});
			if(node.getStep().separator==undefined){//分隔符
				$('#separate_symbol_textFileOutput').textbox('setValue',';');
			}else{
				var oldSeparator = node.getStep().separator;
				var newSeparator=oldSeparator.replace("&#x3b;",";");
				$('#separate_symbol_textFileOutput').textbox('setValue',newSeparator);
			}
			
			//封闭符
			if(node.getStep().enclosure=='&#x22;' || node.getStep().enclosure=="\""){
				$('#close_symbol_textFileOutput').textbox('setValue','"');
			}else{
				$('#close_symbol_textFileOutput').textbox('setValue',node.getStep().enclosure);
			}
			
			//强制在字段周围加封闭符
			if(node.getStep().enclosure_forced == undefined){
				$("#force_textFileOutput").get(0).checked=false//
			}else if(node.getStep().enclosure_forced==='N'){
				$("#force_textFileOutput").get(0).checked=false
			}else if(node.getStep().enclosure_forced==='Y'){
				$("#force_textFileOutput").get(0).checked=true
			}
			//禁用封闭符修复
			if(node.getStep().enclosure_fix_disabled == undefined){
				$("#repair_textFileOutput").get(0).checked=false//
			}else if(node.getStep().enclosure_fix_disabled==='N'){
				$("#repair_textFileOutput").get(0).checked=false
			}else if(node.getStep().enclosure_fix_disabled==='Y'){
				$("#repair_textFileOutput").get(0).checked=true
			}
			//头部
			if(node.getStep().header == undefined){
				$("#head_textFileOutput").get(0).checked=false;
			}else if(node.getStep().header==='N'){
				$("#head_textFileOutput").get(0).checked=false;
			}else if(node.getStep().header==='Y'){
				$("#head_textFileOutput").get(0).checked=true;
			}
			//尾部
			if(node.getStep().footer == undefined){
				$("#trail_textFileOutput").get(0).checked=false;
			}else if(node.getStep().footer==='N'){
				$("#trail_textFileOutput").get(0).checked=false;
			}else if(node.getStep().footer==='Y'){
				$("#trail_textFileOutput").get(0).checked=true;
			}
			//格式
			$('#format_textFileOutput').combobox({
				onLoadSuccess:function(){
					var date_time_format= node.getStep().file!=undefined ? node.getStep().format : '';
					if(date_time_format=='DOS'){
						$('#format_textFileOutput').combobox('select','CR+LF terminated (Windows, DOS)')
					}else if(date_time_format=='UNIX'){
						$('#format_textFileOutput').combobox('select','LF terminated (Unix)')
					}else if(date_time_format=='CR'){
						$('#format_textFileOutput').combobox('select','CR terminated')
					}else if(date_time_format=='None'){
						$('#format_textFileOutput').combobox('select','No new-line terminator')
					}
				},
			});
			//压缩
			$('#compress_textFileOutput').combobox({
				onLoadSuccess:function(){
					var date_time_format= node.getStep().file!=undefined ? node.getStep().compression : '';
					date_time_format!='' && $('#compress_textFileOutput').combobox('select',date_time_format);
				},
			});
			//编码
			$('#encoding_textFileOutput').combobox({
				onLoadSuccess:function(){
					var date_time_format= node.getStep().file!=undefined ? node.getStep().encoding : '';
					date_time_format!='' && $('#encoding_textFileOutput').combobox('select',date_time_format);
				},
			});

			//字段右填充或裁减
			if(node.getStep().file == undefined){
				$("#field_rightFill_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.pad==='N'){
				$("#field_rightFill_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.pad==='Y'){
				$("#field_rightFill_textFileOutput").get(0).checked=true
			}
			//快速数据存储(无格式)
			if(node.getStep().file == undefined){
				$("#speediness_storage_textFileOutput").get(0).checked=false//
			}else if(node.getStep().file.fast_dump==='N'){
				$("#speediness_storage_textFileOutput").get(0).checked=false
			}else if(node.getStep().file.fast_dump==='Y'){
				$("#speediness_storage_textFileOutput").get(0).checked=true
			}
			//分拆...每一行
			if(node.getStep().file==undefined){
				$('#resolution_textFileOutput').textbox('setValue','0');
			}else{
				$('#resolution_textFileOutput').textbox('setValue',node.getStep().file.splitevery);
			}
			//添加文件结束行
			if(node.getStep().file==undefined){
				$('#finish_line_textFileOutput').textbox('setValue','');
			}else{
				$('#finish_line_textFileOutput').textbox('setValue',node.getStep().endedLine);
			}
			
			//*****************************第三部分（字段）*************************************
			if(node.getStep().fields == null || $.trim(node.getStep().fields) == ""){//第一次加载时候的undefined
					console.log('第一次创建对象');
			}else if(node.getStep().fields.field.constructor == Array){//如果是数组进行替换
				$.each(node.getStep().fields.field,function(i,o){
					if(o.type=="None" ){
						o.type="";
					}
					if(o.trim_type=="none"){
						o.trim_type="none";
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
				node.getStep().fields.field.length =='-1' ? node.getStep().fields.field.length = '' : node.getStep().fields.field.length
				node.getStep().fields.field.precision =='-1'? node.getStep().fields.field.precision ='' : node.getStep().fields.field.precision 
							
			}
			
			$('#textFileOutput_table').datagrid({ 
				rownumbers:true,
				fitColumns:true,
				singleSelect:false,
				frozenColumns : [ [ {
					field : 'ck',
					checkbox : true,
				} ] ],
				fit:true,
			    data: node.getStep().fields!=null && $.trim(node.getStep().fields)!='' ? {total:1, rows:$.isArray(node.getStep().fields.field)?
			    		node.getStep().fields.field:[node.getStep().fields.field]}:{total:0,rows:[]},		
				toolbar: [{
					iconCls: 'icon-add',
					text : "增加",
					handler: function(){
						$('#textFileOutput_table').datagrid(//新增加一行
								'appendRow',
								{
									name:'', 
									type:'',
									format:'',
									length:'',
									precision:'',
									currency:'',
									decimal:'',
									group:'',
									trim_type:'',
									nullif :''
								});}
				},{
					text : "删除",
					iconCls : 'icon-remove',
					handler : function() {
//						var del_row = $('#textFileOutput_table').datagrid('getSelected');
//						var del_rowIndex = $('#textFileOutput_table').datagrid('getRowIndex',del_row);
//						$('#textFileOutput_table').datagrid('deleteRow',del_rowIndex);
						$('#textFileOutput_table').datagrid('deleteSelections');
					}
				}],
				
			    columns:[[
			        {field:'name',title:'名称',width:100,editor:{
			        	 type:'combobox',
				            options:{
				            	valueField :"value",
								textField : "text",
								data :Nasoft.Util.file_name_combobox(transfer)
				            }
				        }}, 
			        {field:'type', title:'类型',width:150,editor:{
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
	                		}]      		
		            	}
			        }},
			        {field:'format',title:'格式',width:150,editor:{
			            type:'combobox',
			            options:{
			            	valueField: 'label',    
			                textField: 'value',
			                data: [{
	                			label: 'yyyy/MM/dd HH:mm:ss.SSS',
	                			value: 'yyyy/MM/dd HH:mm:ss.SSS'
	                		},{
	                			label: 'yyyy/MM/dd HH:mm:ss.SSS XXX',
	                			value: 'yyyy/MM/dd HH:mm:ss.SSS XXX'
	                		},{
	                			label: 'yyyy/MM/dd HH:mm:ss',
	                			value: 'yyyy/MM/dd HH:mm:ss'
	                		},{
	                			label: 'yyyy/MM/dd HH:mm:ss XXX',
	                			value: 'yyyy/MM/dd HH:mm:ss XXX'
	                		},{
	                			label: 'yyyyMMddHHmmss',
	                			value: 'yyyyMMddHHmmss'
	                		},{
	                			label: 'yyyy/MM/dd',
	                			value: 'yyyy/MM/dd'
	                		},{
	                			label: 'yyyy-MM-dd',
	                			value: 'yyyy-MM-dd'
	                		},{
	                			label: 'yyyy-MM-dd HH:mm:ss',
	                			value: 'yyyy-MM-dd HH:mm:ss'
	                		},{
	                			label: 'yyyy-MM-dd HH:mm:ss XXX',
	                			value: 'yyyy-MM-dd HH:mm:ss XXX'
	                		},{
	                			label: 'yyyyMMdd',
	                			value: 'yyyyMMdd'
	                		},{
	                			label: 'MM/dd/yyyy',
	                			value: 'MM/dd/yyyy'
	                		},{
	                			label: 'MM/dd/yyyy HH:mm:ss',
	                			value: 'MM/dd/yyyy HH:mm:ss'
	                		},{
	                			label: 'MM-dd-yyyy',
	                			value: 'MM-dd-yyyy'
	                		},{
	                			label: 'MM-dd-yyyy HH:mm:ss',
	                			value: 'MM-dd-yyyy HH:mm:ss'
	                		},{
	                			label: 'MM/dd/yy',
	                			value: 'MM/dd/yy'
	                		},{
	                			label: 'MM-dd-yy',
	                			value: 'MM-dd-yy'
	                		},{
	                			label: 'dd/MM/yyyy',
	                			value: 'dd/MM/yyyy'
	                		},{
	                			label: '#,##0.###',
	                			value: '#,##0.###'
	                		},{
	                			label: '0.00',
	                			value: '0.00'
	                		},{
	                			label: '0000000000000',
	                			value: '0000000000000'
	                		},{
	                			label: '#.#',
	                			value: '#.#'
	                		},{
	                			label: '#',
	                			value: '#'
	                		},{
	                			label: '###,###,###.#',
	                			value: '###,###,###.#'
	                		},{
	                			label: '#######.###',
	                			value: '#######.###'
	                		},{
	                			label: '#####.###%',
	                			value: '#####.###%'
	                		}]  
			            }
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
			        {field:'decimal',title:'小数',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'group',title:'分组',width:100,editor:{
			            type:'text'
			        }}, 
			        {field:'trim_type',title:'去除空字符的方式',width:120,editor:{
			        	type:'combobox',
			        	options:{
		            		valueField: 'value',
		            		textField: 'label',
		            		editable:false,
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
					
					}
			        
			        },
			        {field:'nullif',title:'NULL',width:100,editor:{
			            type:'text'
			        }},
			    ]],
			    onClickRow:function(i,r){
				    	var rows=$(this).datagrid('getRows');
						$.each(rows,function(j,o){
							j===i || $('#textFileOutput_table').datagrid('endEdit',j);
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
			//获取字段
			$('#obtain_filed').unbind('click').click(function(){
				var transferArray=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
				if(!!transferArray){
					var transfer=Nasoft.Util.transferArray_copy(transferArray);
					transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
					var data_val=[];
					for(var i=0;i<transfer.length;i++){
						var val={}
						val.name=transfer[i].name;
						if(!!transfer[i].type){
							val.type=transfer[i].type;							
						}else{
							val.type='String';							
						}
						val.length=transfer[i].length;
						val.format=transfer[i].format;
						if(!!transfer[i].precision){
							val.precision=transfer[i].precision;
							
						}else{
							val.precision='';
						}
						if(!!transfer[i].trim_type){
							val.trim_type=transfer[i].trim_type;
						}else{
							val.trim_type='none';
						}
						data_val.push(val)
					}
					var opts_a=$('#textFileOutput_table').datagrid('options');
					opts_a.data={rows:data_val};
					$('#textFileOutput_table').datagrid(opts_a);
				}
			});
			//最小宽度
			$('#bestSmall').unbind('click').click(function(){
				var opts=$('#textFileOutput_table').datagrid('options');
				var rows=$('#textFileOutput_table').datagrid('getRows');
				$.each(rows,function(i,o){
					if(o.length!=='' && o.length!==null){
						o.length='';
					}
					if(o.precision!=='' && o.precision!==null){
						o.precision='';
					}
					if(o.type!='' && o.type!=null && (o.type=='Number'|| o.type=='BigNumber' || o.type=='Integer' || o.type=='Binary')){
						o.format = '0';
					}
					if(o.type!='' && o.type!=null && o.type == 'String'){
						o.format = '';
					}
				});
				opts.data.rows=rows;
				$('#textFileOutput_table').datagrid(opts);
			});
			//关闭弹窗
			$('#textFileOutput_ok').unbind('click').click(function(){
				 try {	
					var TableInput={};
					var fileContents = {};//文件对象
					//*****************************第一部分（文件）*************************************
					node.text=$('#step_name_textFileOutput').textbox('getValue');//放入步骤名称
					
					//文件浏览
					if($('#file_name_textFileOutput').textbox('getValue')!='file'){
						var filename = $('#file_name_textFileOutput').val(); 
						fileContents.name  = filename;
					}else{
						fileContents.name  = 'file';
					}
					
					//结果输送至命令行或脚本
					var deliver_script_textFileOutput = $("#deliver_script_textFileOutput").prop("checked")==true ? 'Y' : 'N'; 
					fileContents.is_command = deliver_script_textFileOutput;
					
					//输出传递到servlet
					var output_servlet_textFileOutput = $("#output_servlet_textFileOutput").prop("checked")==true ? 'Y' : 'N'; 
					fileContents.servlet_output = output_servlet_textFileOutput;
					
					//创建父目录
					var father_catalogue_textFileOutput = $("#father_catalogue_textFileOutput").prop("checked")==true ? 'Y' : 'N'; 
					TableInput.create_parent_folder = father_catalogue_textFileOutput;
					
					//启动时不创建文件
					var no_found_file_textFileOutput = $("#no_found_file_textFileOutput").prop("checked")==true ? 'Y' : 'N'; 
					fileContents.do_not_open_new_file_init = no_found_file_textFileOutput;
					
					//从字段中获取文件名
					var obtain_file_textFileOutput = $("#obtain_file_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					TableInput.fileNameInField = obtain_file_textFileOutput;
					
					//文件名字段
					var file_name_field_textFileOutput=$('#file_name_field_textFileOutput').textbox('getValue');
					TableInput.fileNameField=(file_name_field_textFileOutput==null||file_name_field_textFileOutput=='')?'':file_name_field_textFileOutput;
					
					//扩展名
					var expand_name_textFileOutput=$('#expand_name_textFileOutput').textbox('getValue');
					fileContents.extention=(expand_name_textFileOutput==null||expand_name_textFileOutput=='')?'':expand_name_textFileOutput;
					
					//文件名里包含步骤数
					var step_count_textFileOutput = $("#step_count_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.split = step_count_textFileOutput;
					
					//文件名里包含数据分区号
					var partition_mark_textFileOutput = $("#partition_mark_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.haspartno = partition_mark_textFileOutput;
					
					//文件名里包含日期
					var file_name_date_textFileOutput = $("#file_name_date_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.add_date = file_name_date_textFileOutput;
					
					//文件名里包含时间
					var file_name_time_textFileOutput = $("#file_name_time_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.add_time = file_name_time_textFileOutput;
					
					//指定日期时间格式
					var appoint_date_date_textFileOutput = $("#appoint_date_date_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.SpecifyFormat = appoint_date_date_textFileOutput;
					
					//日期时间格式
					var dateTime_format_textFileOutput = $('#dateTime_format_textFileOutput').combobox('getValue'); 
					fileContents.date_time_format =dateTime_format_textFileOutput;
					
					//结果中添加文件名
					var add_file_name_textFileOutput = $("#add_file_name_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.add_to_result_filenames = add_file_name_textFileOutput;
					
					//*****************************第二部分（内容）*************************************
					//追加方式
					var add_to_way_textFileOutput = $("#add_to_way_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.append = add_to_way_textFileOutput;
					
					//分隔符
					var separate_symbol_textFileOutput=$('#separate_symbol_textFileOutput').textbox('getValue'); 
					//console.log(separate_textFileInput);
//					if(';'===separate_symbol_textFileOutput){
//						var newStringDefine = '&#x3b;';
//						var newString = separate_symbol_textFileOutput.replace(separate_symbol_textFileOutput, newStringDefine); 
//						TableInput.separator=((newString==null||newString=='')?'':newString);
//					}else{
//						var newStringDefine = '&#x3b;';
//						var newString = separate_symbol_textFileOutput.replace(';', newStringDefine); 
//						TableInput.separator=((newString==null||newString=='')?'':newString);
//					}
					TableInput.separator=separate_symbol_textFileOutput;
					//封闭符
					var close_symbol_textFileOutput=$('#close_symbol_textFileOutput').textbox('getValue');//文本限定符
//					if('"'===close_symbol_textFileOutput){
//						var newStringDefine='&#x22;';
//						var newString = close_symbol_textFileOutput.replace(close_symbol_textFileOutput, newStringDefine); 
//						TableInput.enclosure=(newString==null||newString=='')?'':newString;
//					}else{
//						TableInput.enclosure=close_symbol_textFileOutput;
//					}
					TableInput.enclosure=close_symbol_textFileOutput;
					//强制在字段周围加封闭符
					var force_textFileOutput = $("#force_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					TableInput.enclosure_forced = force_textFileOutput;
					
					//禁用封闭符修复
					var repair_textFileOutput = $("#repair_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					TableInput.enclosure_fix_disabled = repair_textFileOutput;
					
					//头部
					var head_textFileOutput = $("#head_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					TableInput.header = head_textFileOutput;
					//尾部
					var trail_textFileOutput = $("#trail_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					TableInput.footer = trail_textFileOutput;
					//格式
					var format_textFileOutput = $('#format_textFileOutput').combobox('getValue'); 
					var newStringDefine ; 
					if(format_textFileOutput == 'CR+LF terminated (Windows, DOS)'){
						newStringDefine = 'DOS';
					}else if(format_textFileOutput == 'LF terminated (Unix)'){
						newStringDefine = 'UNIX';
					}else if(format_textFileOutput == 'CR terminated'){
						newStringDefine = 'CR';
					}else if(format_textFileOutput == 'No new-line terminator'){
						newStringDefine = 'None';
					}else{
						newStringDefine = 'DOS';
					}
					var newString = format_textFileOutput.replace(format_textFileOutput, newStringDefine); 
					TableInput.format =newString;
					//压缩
					var compress_textFileOutput = $('#compress_textFileOutput').combobox('getValue'); 
					TableInput.compression =compress_textFileOutput;
					//编码
					var encoding_textFileOutput = $('#encoding_textFileOutput').combobox('getValue'); 
					TableInput.encoding =encoding_textFileOutput;
					//字段右填充或裁减
					var field_rightFill_textFileOutput = $("#field_rightFill_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.pad = field_rightFill_textFileOutput;
					//快速数据存储(无格式)
					var speediness_storage_textFileOutput = $("#speediness_storage_textFileOutput").prop("checked")==true ? 'Y' : 'N';
					fileContents.fast_dump = speediness_storage_textFileOutput;
					//分拆...每一行
					var resolution_textFileOutput=$('#resolution_textFileOutput').textbox('getValue');
					fileContents.splitevery=(resolution_textFileOutput==null||resolution_textFileOutput=='')?'':resolution_textFileOutput;
					//添加文件结束行
					var finish_line_textFileOutput=$('#finish_line_textFileOutput').textbox('getValue');
					TableInput.endedLine=(finish_line_textFileOutput==null||finish_line_textFileOutput=='')?'':finish_line_textFileOutput;
					
					//*****************************第三部分（字段）*************************************
					var rows=$('#textFileOutput_table').datagrid('getRows');//获取当前页面中所有的行
					$.each(rows,function(i,o){
						$('#textFileOutput_table').datagrid('endEdit', i);//结束编辑所有行
					});
					var fields=Nasoft.GetProjectData.getFields('#textFileOutput_table');//将对应数据字段加入表输出
					if(!!fields&&fields.field.constructor==Array){
						$.each(fields.field,function(i,o){//array
							if(o.length=="" ||o.length==null){
								o.length=-1;
							}
							if(o.precision==""||o.precision==null){
								o.precision=-1;
							}
							if(o.type==""||o.type==null){
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
						if(fields.field.precision=="" ||fields.field.precision==null){
							fields.field.precision=-1;
						}
						if(fields.field.type=="" ||fields.field.type==null){
							fields.field.type="None";
						}
						if(fields.field.trim_type=="" ||fields.field.trim_type==null){
							fields.field.trim_type="none";
						}
					}
					TableInput.fields = fields;
					
					//将对象放入大对象中
					TableInput.file = fileContents;
					node.setStep(TableInput);//放入node
					node.setTransfer();//组件中要传递的字段存储进容器中
					} catch (e) {
						console.log(e)
					}
				$('#TextFileOutput').window('close');
			});//确定保存按钮
			
		$('#textFileOutput_cancel').unbind("click").click(function(){
			$('#TextFileOutput').window('close');
		});
		} catch (e) {//打开的try catch
			console.log(e)
		}
	};
	onBeforeClose=function(){}//关闭
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}