Nasoft.Topo.transferFns.SeqFileInputStep=function(node){
	 return [{name:'SeqFileInputStep'}];
  };
Nasoft.Window.fns.SeqFileInputStep=function(node){
				Nasoft.Ui_extend.browser_even('#SeqFileInputStep');//限制组件不能超出浏览器上边缘
			function onBeforeOpen(){
				var step = node.step;// 引用node节点中的step对象
				$("#SeqFileInputStep_step_name").textbox("setValue",node.text);// 设置步骤的名称
				$("#SeqFileInputStep_file_find").textbox("setValue",step.field_name);
				for(var key in step){
					if(key.startsWith("wT")){
						$("#"+key).val(step[key]);
					}else if(key.startsWith("wch")){
						$("#"+key).prop("checked",step[key]==="N"?false:true);
					}
				}
				$("#SeqFileInputStep").find(".ok").unbind("click").click(function(){
					$("#SeqFileInputStep").find(".field-config").find("input").each(function(i){
						if($(this).prop("checked")){
							step[$(this).attr("id")] = "Y";
						}else{
							step[$(this).attr("id")] = "N";
						}
					});
					$("#SeqFileInputStep").find(".file-config").find("input").each(function(i){
							step[$(this).attr("id")] = $(this).val();
					});
					step.field_name = $('#SeqFileInputStep_file_find').textbox("getValue");
					$("#SeqFileInputStep").window("close");
				});
				$("#SeqFileInputStep").find(".cancel").unbind("click").click(function(){
					$("#SeqFileInputStep").window("close");
				});
				$("#SeqFileInputStep_choose").unbind("click").click(function(){
					Nasoft.Static.handleFilePostfix('#SeqFileInputStep_file_find','#SeqFileInputStep_file_hide',{},'3','');
				});
				
			}	
			return {onBeforeOpen : onBeforeOpen};
				}