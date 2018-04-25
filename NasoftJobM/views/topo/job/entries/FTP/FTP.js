Nasoft.Window.fns.FTP=function(node){
	Nasoft.Ui_extend.browser_even('#FTP');//限制组件不能超出浏览器上边缘
	
	var onBeforeOpen,onBeforeClose
	onBeforeOpen=function(){
		try {
			$('#connect_ftp').unbind('click').click(function(){//FTP测试连接
				var flag = false; //
				var ip = $.trim($('#IP_address_ftp').val());
				var port = $.trim($('#server_port_ftp').val());
				var username = $.trim($('#username_ftp').val());
				var password = $.trim($('#password_ftp').val());
				var path = $.trim($("#catalogue_ftp").val());
				if(ip=='' || port==''){
					alert('ip、端口、用户名、密码不能为空');
					return flag;
				}else{
					return ftp(ip,port,username,password,path);
				}
			});
			$('#check_up_ftp').unbind('click').click(function(){//文件是否存在
				var flag = false; //
				var ip = $.trim($('#IP_address_ftp').val());
				var port = $.trim($('#server_port_ftp').val());
				var username = $.trim($('#username_ftp').val());
				var password = $.trim($('#password_ftp').val());
				var path = $.trim($("#catalogue_ftp").val());
				if(path==''){
					alert('路径不能为空');
					return flag;
				}else{
					return ftDirectoryExists(ip,port,username,password,path);
				}
			});
			$('#browse_ftp').unbind('click').click(function(){	//浏览
				Nasoft.Static.handleFile('#goal_ftp','#goal_ftp_h');
			});
			
			if($('#recover_ftp').get(0).checked==false){ //移动到文件夹状态判断
				$('#shift_ftp').textbox({disabled:true});
				$('#new_ftp').attr("disabled",true);
			}else{
				$('#shift_ftp').textbox({disabled:false});
				$('#new_ftp').attr("disabled",false);
				$('#delete_ftp').get(0).checked =false;
			}
			$('#recover_ftp').change(function(){
				if($('#recover_ftp').get(0).checked==false){
					$('#shift_ftp').textbox({disabled:true});
					$('#new_ftp').attr("disabled",true);
				}else{
					$('#delete_ftp').get(0).checked =false;
					$('#shift_ftp').textbox({disabled:false});
					$('#new_ftp').attr("disabled",false);
				}
			});
			
			if($('#time_form_ftp').get(0).checked==false){//指定日期时间格式状态判断
				$('#date_from_ftp').combobox({disabled:true});
				$('#extension_date_ftp').attr("disabled",true);
				$('#time_ftp').attr("disabled",false);
				$('#date_ftp').attr("disabled",false);
			}else{
				$('#time_ftp').attr("disabled",true);
				$('#date_ftp').attr("disabled",true);
				$('#date_from_ftp').combobox({disabled:false});
				$('#extension_date_ftp').attr("disabled",false);
				
				$('#time_ftp').get(0).checked = false;
				$('#date_ftp').get(0).checked = false;
				
				$('#extension_date_ftp').get(0).checked = false;
			}
			
			$('#time_form_ftp').change(function(){
				if($('#time_form_ftp').get(0).checked==false){
					$('#date_from_ftp').combobox({disabled:true});
					$('#extension_date_ftp').attr("disabled",true);
					$('#time_ftp').attr("disabled",false);
					$('#date_ftp').attr("disabled",false);	
				}else{
					$('#time_ftp').get(0).checked = false;
					$('#date_ftp').get(0).checked = false;
					
					$('#extension_date_ftp').get(0).checked = false;
					
					$('#time_ftp').attr("disabled",true);
					$('#date_ftp').attr("disabled",true);
					$('#date_from_ftp').combobox({disabled:false});
					$('#extension_date_ftp').attr("disabled",false);
					
				}
			});
			
			if($('#cover_ftp').get(0).checked == false){//不覆盖文件状态判断
				$('#isfile_ftp').combobox({disabled:true});
			}else{
				$('#isfile_ftp').combobox({disabled:false});
			}
			
			$('#cover_ftp').change(function(){
				if($('#cover_ftp').get(0).checked == false){//不覆盖文件状态判断
					$('#isfile_ftp').combobox({disabled:true});
				}else{
					$('#isfile_ftp').combobox({disabled:false});
				}
			});
			//***************************第一部分一般********************************
			$('#school_name_ftp').textbox('setValue',node.text);//设置步骤名称
			
			$('#IP_address_ftp').textbox('setValue',node.getEntry().servername);
			$('#server_port_ftp').textbox('setValue',node.getEntry().port);
			$('#username_ftp').textbox('setValue',node.getEntry().username);
			if(node.getEntry().password =='Encrypted' || node.getEntry().password ==''){
				$('#password_ftp').textbox('setValue','');
			}else{
				$('#password_ftp').textbox('setValue',node.getEntry().password);
			}
			$('#agency_server_ftp').textbox('setValue',node.getEntry().proxy_host);
			$('#agency_server_port_ftp').textbox('setValue',node.getEntry().proxy_port);
			$('#agency_username_ftp').textbox('setValue',node.getEntry().proxy_username);
			if(node.getEntry().proxy_password == 'Encrypted' || node.getEntry().proxy_password ==''){
				$('#agency_password_ftp').textbox('setValue','');
			}else{
				$('#agency_password_ftp').textbox('setValue',node.getEntry().proxy_password);
			}
			
			node.getEntry().binaryAs400==='Y' && ($("#binary_system_modle_ftp_binaryAs400").get(0).checked=true)
			node.getEntry().binaryAs400==='N' && ($("#binary_system_modle_ftp_binaryAs400").get(0).checked=false);
			
			node.getEntry().binary==='Y' && ($("#binary_system_modle_ftp").get(0).checked=true)
			node.getEntry().binary==='N' && ($("#binary_system_modle_ftp").get(0).checked=false);
			
			$('#overtime_ftp').textbox('setValue',node.getEntry().timeout);
			
			node.getEntry().active==='Y' && ($("#connect_ftp").get(0).checked=true)
			node.getEntry().active==='N' && ($("#connect_ftp").get(0).checked=false);
			
			$('#succed_code_ftp').combobox({ //   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getEntry().control_encoding!='')?node.getEntry().control_encoding:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
			});
			
			//***************************第二部分文件********************************
			if(node.getEntry().ftpdirectory ==''){
				$('#catalogue_ftp').textbox('setValue','');
			}else{
				$('#catalogue_ftp').textbox('setValue',node.getEntry().ftpdirectory);
			}
			if(node.getEntry().wildcard ==''){
				$('#expression_ftp').textbox('setValue','');
			}else{
				$('#expression_ftp').textbox('setValue',node.getEntry().wildcard);
			}
			node.getEntry().remove==='Y' && ($("#delete_ftp").get(0).checked=true)
			node.getEntry().remove==='N' && ($("#delete_ftp").get(0).checked=false);
			
			node.getEntry().movefiles==='Y' && ($("#recover_ftp").get(0).checked=true)
			node.getEntry().movefiles==='N' && ($("#recover_ftp").get(0).checked=false);
			
			if(node.getEntry().movetodirectory ==''){
				$('#shift_ftp').textbox('setValue','');
			}else{
				$('#shift_ftp').textbox('setValue',node.getEntry().movetodirectory);
			}
			
			node.getEntry().createmovefolder==='Y' && ($("#new_ftp").get(0).checked=true)
			node.getEntry().createmovefolder==='N' && ($("#new_ftp").get(0).checked=false);
			
			if(node.getEntry().targetdirectory==''){//浏览
				$('#goal_ftp').filebox('setValue','');
			}else{
				$('#goal_ftp').textbox('setValue',node.getEntry().targetdirectory);
				$('#goal_ftp_h').val(node.getEntry().targetdirectory);
			}
			
			node.getEntry().adddate==='Y' && ($("#date_ftp").get(0).checked=true)
			node.getEntry().adddate==='N' && ($("#date_ftp").get(0).checked=false);
			
			node.getEntry().addtime==='Y' && ($("#time_ftp").get(0).checked=true)
			node.getEntry().addtime==='N' && ($("#time_ftp").get(0).checked=false);
			
			node.getEntry().SpecifyFormat==='Y' && ($("#time_form_ftp").get(0).checked=true)
			node.getEntry().SpecifyFormat==='N' && ($("#time_form_ftp").get(0).checked=false);
			
			$('#date_from_ftp').combobox({ //   
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
			
			node.getEntry().AddDateBeforeExtension==='Y' && ($("#extension_date_ftp").get(0).checked=true);
			node.getEntry().AddDateBeforeExtension==='N' && ($("#extension_date_ftp").get(0).checked=false);
			
			node.getEntry().only_new==='Y' && ($("#cover_ftp").get(0).checked=true);
			node.getEntry().only_new==='N' && ($("#cover_ftp").get(0).checked=false);
			
			if(node.getEntry().ifFileExists =='ifFileExistsSkip'){
				node.getEntry().ifFileExists ='跳过';
			}else if(node.getEntry().ifFileExists =='ifFileExistsCreateUniq'){
				node.getEntry().ifFileExists ='给本地文件指定唯一名称';
			}else if(node.getEntry().ifFileExists =='ifFileExistsFail'){
				node.getEntry().ifFileExists ='失败';
			}
			
			$('#isfile_ftp').combobox({ //   
				onLoadSuccess:function(){
					var connectionName;
					/**
					 * 节点已保存并且step.connection不是空串的情况下选中对应的项,
					 * 否则去直接获取connection的Name选中对应项,
					 * 若没有则不选中任何
					 */
					connectionName=(node.getEntry().ifFileExists!='')?node.getEntry().ifFileExists:'';
					connectionName!='' && $(this).combobox('select',connectionName);
				},
			});
			
			node.getEntry().isaddresult==='Y' && ($("#file_result_ftp").get(0).checked=true);
			node.getEntry().isaddresult==='N' && ($("#file_result_ftp").get(0).checked=false);
			
			//***************************第三部分高级********************************
			if(node.getEntry().success_condition == 'success_if_no_errors'){
				node.getEntry().success_condition ='一切工作正常';
			}else if(node.getEntry().success_condition == 'success_if_errors_less'){
				node.getEntry().success_condition ='错误数小于';
			}else if(node.getEntry().success_condition == 'success_when_at_least'){
				node.getEntry().success_condition ='获取文件数不小于';
			}
			$('#control_coding_tfp').combobox({ //   
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
			
			if(node.getEntry().nr_limit ==''){
				$('#number_ftp').textbox('setValue','');
			}else{
				//$('#number_ftp').textbox({disabled:true});//不知道什么时候该解除禁止？
				$('#number_ftp').textbox('setValue',node.getEntry().nr_limit);
			}
			
			//***************************第四部分sockes代理********************************
			if(node.getEntry().socksproxy_host ==''){
				$('#main_host_ftp').textbox('setValue','');
			}else{
				$('#main_host_ftp').textbox('setValue',node.getEntry().socksproxy_host);
			}
			
			if(node.getEntry().socksproxy_port ==''){
				$('#main_port_ftp').textbox('setValue','');
			}else{
				$('#main_port_ftp').textbox('setValue',node.getEntry().socksproxy_port);
			}
			
			console.log(node.getEntry().socksproxy_username);
			if(node.getEntry().socksproxy_username ==null ){
				$('#main_username_ftp').textbox('setValue','');
			}else{
				$('#main_username_ftp').textbox('setValue',node.getEntry().socksproxy_username);
			}
			
			if(node.getEntry().socksproxy_password == 'Encrypted'){
				$('#main_password_ftp').textbox('setValue','');
			}else{
				$('#main_password_ftp').textbox('setValue',node.getEntry().socksproxy_password);
			}
			
			
			
			
			//确定
			$('#ftp_ok').unbind('click').click(function(e){ //确定保存

			     try {
			    	 var entry = {};
			    	 //***************************第一部分一般********************************
			    	 var IP_address_ftp=$('#IP_address_ftp').textbox('getValue');//FTP服务器名字
			    	 entry.name = IP_address_ftp;
			    	 
			    	 entry.servername=(IP_address_ftp==null||IP_address_ftp=='')?'':IP_address_ftp;

			    	 var server_port_ftp=$('#server_port_ftp').textbox('getValue');//FTP端口
			    	 entry.port=(server_port_ftp==null||server_port_ftp=='')?'':server_port_ftp;
			    	 
			    	 var username_ftp=$('#username_ftp').textbox('getValue');//FTP用户名
			    	 entry.username=(username_ftp==null||username_ftp=='')?'':username_ftp;

			    	 var password_ftp=$('#password_ftp').textbox('getValue');//FTP密码
			    	 entry.password=(password_ftp==null||password_ftp=='')?'':password_ftp;
			    	 
			    	 var agency_server_ftp=$('#agency_server_ftp').textbox('getValue');//代理服务器
			    	 entry.proxy_host=(agency_server_ftp==null||agency_server_ftp=='')?'':agency_server_ftp;
			    	 
			    	 var agency_server_port_ftp=$('#agency_server_port_ftp').textbox('getValue');//代理服务器端口
			    	 entry.proxy_port=(agency_server_port_ftp==null||agency_server_port_ftp=='')?'':agency_server_port_ftp;
			    	 
			    	 var agency_username_ftp=$('#agency_username_ftp').textbox('getValue');//代理服务器用户名
			    	 entry.proxy_username=(agency_username_ftp==null||agency_username_ftp=='')?'':agency_username_ftp;
			    	 
			    	 var agency_password_ftp=$('#agency_password_ftp').textbox('getValue');//代理服务器密码
			    	 entry.proxy_password=(agency_password_ftp==null||agency_password_ftp=='')?'':agency_password_ftp;
			    	
			    	 entry.binaryAs400 = $("#binary_system_modle_ftp_binaryAs400").prop("checked")? 'Y' : 'N'; //系统as400
			    	 
			    	 entry.binary = $("#binary_system_modle_ftp").prop("checked")? 'Y' : 'N'; //二进制模式
			    	 
			    	 var overtime_ftp=$('#overtime_ftp').textbox('getValue');//超时
			    	 entry.timeout=(overtime_ftp==null||overtime_ftp=='')?'':overtime_ftp;
			    	 
			    	 entry.active = $("#connect_ftp").prop("checked")? 'Y' : 'N'; //使用活动的FTP连接
			    	 
			    	 entry.control_encoding = $('#succed_code_ftp').combobox('getValue');  //控制编码
			    	 
			    	//***************************第二部分文件********************************
			    	 var catalogue_ftp=$('#catalogue_ftp').textbox('getValue');//远程目录
			    	 entry.ftpdirectory=(catalogue_ftp==null||catalogue_ftp=='')?'':catalogue_ftp;
			    	 
			    	 var expression_ftp=$('#expression_ftp').textbox('getValue');//通配符(正则表达式)
			    	 entry.wildcard=(expression_ftp==null||expression_ftp=='')?'':expression_ftp;
			    	 
			    	 entry.remove = $("#delete_ftp").prop("checked")? 'Y' : 'N'; //获取后删除文件
			    	 
			    	 entry.movefiles = $("#recover_ftp").prop("checked")? 'Y' : 'N'; //恢复后移动文件
			    	 
			    	 var shift_ftp=$('#shift_ftp').textbox('getValue');//移动到文件夹
			    	 entry.movetodirectory=(shift_ftp==null||shift_ftp=='')?'':shift_ftp;
			    	 
			    	 entry.createmovefolder = $("#new_ftp").prop("checked")? 'Y' : 'N'; //新建文件夹
			    	 
			    	 if($('#goal_ftp').textbox('getValue')!=''){//获取文件名
							var goal_ftp = $('#goal_ftp_h').val(); 
							entry.targetdirectory =goal_ftp;
						}else{
							entry.targetdirectory = '';
						}
			    	 
			    	 
			    	 
			    	 entry.adddate = $("#date_ftp").prop("checked")? 'Y' : 'N'; //在文件名中包含日期
			    	 
			    	 entry.addtime = $("#time_ftp").prop("checked")? 'Y' : 'N'; //在文件名中包含时间
			    	 
			    	 entry.SpecifyFormat = $("#time_form_ftp").prop("checked")? 'Y' : 'N'; //指定日期时间格式
			    	 
			    	 entry.date_time_format = $('#date_from_ftp').combobox('getValue');  //日期时间格式
			    	 
			    	 entry.AddDateBeforeExtension = $("#extension_date_ftp").prop("checked")? 'Y' : 'N'; //在扩展名前添加日期
			    	 
			    	 entry.only_new = $("#cover_ftp").prop("checked")? 'Y' : 'N'; //不能覆盖文件
			    	 
			    	 var isfile_ftp = $('#isfile_ftp').combobox('getValue');  //如果文件已存在
			    	 if(isfile_ftp == '跳过'){ 
			    		 entry.ifFileExists = 'ifFileExistsSkip';
			    	 }else if(isfile_ftp == '给本地文件指定唯一名称'){
			    		 entry.ifFileExists = 'ifFileExistsCreateUniq';
			    	 }else if(isfile_ftp == '失败'){
			    		 entry.ifFileExists = 'ifFileExistsFail';
			    	 }else{
			    		 entry.ifFileExists = 'ifFileExistsSkip';
			    	 }

			    	 entry.isaddresult = $("#file_result_ftp").prop("checked")? 'Y' : 'N'; //在结果中添加文件名
			 
			    	//***************************第三部分高级********************************
			    	 var control_coding_tfp = $('#control_coding_tfp').combobox('getValue');//成功条件
			    	 if(control_coding_tfp == '一切工作正常'){
			    		 entry.success_condition = 'success_if_no_errors';
			    	 }else if(control_coding_tfp == '获取文件数不小于'){
			    		 entry.success_condition = 'success_when_at_least';
			    	 }else if(control_coding_tfp == '错误数小于'){
			    		 entry.success_condition = 'success_if_errors_less';
			    	 }else{
			    		 entry.success_condition = 'success_if_no_errors';
			    	 }
			    	  
			    	 var number_ftp=$('#number_ftp').textbox('getValue');//数量
			    	 entry.nr_limit=(number_ftp==null||number_ftp=='')?'':number_ftp;
			    	 
			    	//***************************第四部分socks代理********************************
			    	 var main_host_ftp=$('#main_host_ftp').textbox('getValue');//主机
			    	 entry.socksproxy_host=(main_host_ftp==null||main_host_ftp=='')?'':main_host_ftp;
			    	 
			    	 var main_port_ftp=$('#main_port_ftp').textbox('getValue');//端口
			    	 entry.socksproxy_port=(main_port_ftp==null||main_port_ftp=='')?'':main_port_ftp;
			    	 
			    	 var main_username_ftp=$('#main_username_ftp').textbox('getValue');//用户名
			    	 entry.socksproxy_username=(main_username_ftp==null||main_username_ftp=='')?'':main_username_ftp;
			    	 
			    	 var main_password_ftp=$('#main_password_ftp').textbox('getValue');//密码
			    	 entry.socksproxy_password=(main_password_ftp==null||main_password_ftp=='')?'':main_password_ftp;
			    	 entry.name = $('#school_name_ftp').textbox('getValue');
			    	 node.text=$('#school_name_ftp').textbox('getValue');//放入步骤名称
			    	 
			    	 node.setEntry(entry);
					} catch (e) {
						console.log(e)
					}
				$('#FTP').window('close');
			});
			$('#ftp_cancel').unbind("click").click(function(){
				$('#FTP').window('close');
			});
		} catch (e) {
			console.log(e)
		}
	};
	onBeforeClose=function(){}//关闭
	function ftp(ip,port,username,password,path){//测试连接ftp是否通的
		var url = "/NasoftJob/ftp/ftpLoginTest";
		$.ajax({
				url : url,
				data : {'path':path,'ip':ip,'port':port,'username':username,'password':password},
				dataType : "text",
				type : "POST",
				success : function(values) {
					if(values =='1'){
						alert('成功连接到'+ip);
					}else{
						alert('连接失败,请检查写入的参数');
					}
				}
			});
	}
	function ftDirectoryExists(ip,port,username,password,path){//文件是否存在
		var url = "/NasoftJob/ftp/ftDirectoryExists";
		$.ajax({
				url : url,
				data : {'path':path,'ip':ip,'port':port,'username':username,'password':password},
				dataType : "text",
				type : "POST",
				success : function(values) {
					if(values =='2'){
						alert('文件夹'+path+'已存在');
					}else if(values =='3'){
						alert('文件夹不存在');
					}else{
						alert('无法连接'+ip);
					}
				}
			});
	}
	return {onBeforeOpen:onBeforeOpen,onBeforeClose:onBeforeClose}
}