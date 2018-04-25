Nasoft.Topo.transferFns.Abort = function(node) {
	var fds = [];
	return fds;
};
Nasoft.Window.fns.Abort = function(node) {
	Nasoft.Ui_extend.browser_even('#Abort');// 限制组件不能超出浏览器上边缘

	var onBeforeOpen, onBeforeClose, onBeforeOpen = function() {
		try {
			// console.log("node="+node);
			$('#Abort_task_name').textbox('setValue', node.text);
			node.getStep().row_threshold!=''&&node.getStep().row_threshold!=null?$('#Abort_task_record').textbox('setValue', node.getStep().row_threshold):$('#Abort_task_record').textbox('setValue', '');
			node.getStep().message!=''&&node.getStep().message!=null?$('#Abort_task_message').textbox('setValue', node.getStep().message):$('#Abort_task_message').textbox('setValue', '');
			if(node.getStep().always_log_rows==='Y'){
				$('#Abort_Always_record').get(0).checked=true;
			}else if(node.getStep().always_log_rows==='N'){
				$('#Abort_Always_record').get(0).checked=false;
			}else{
				$('#Abort_Always_record').get(0).checked=true;
			}

			// 取消按钮
			$('#Abort_cancel').unbind('click').click(function(e) {
				$('#Abort').window('close');
			});
			// 确认按钮
			$('#Abort_ok').unbind('click').click(function(e) {
								var Abort = {};
								node.text = $('#Abort_task_name').textbox('getValue');
								Abort.row_threshold=($('#Abort_task_record').textbox('getValue')==null||$('#Abort_task_record').textbox('getValue')=='')?'':$('#Abort_task_record').textbox('getValue');
							    Abort.message=($('#Abort_task_message').textbox('getValue')==null||$('#Abort_task_message').textbox('getValue')=='')?'':$('#Abort_task_message').textbox('getValue');
							    Abort.always_log_rows = $('#Abort_Always_record').get(0).checked ? 'Y': 'N';
							    node.setStep(Abort);
								node.setTransfer();// 把定义的常量set出去
								$('#Abort').window('close');// 关闭窗口
							});

		} catch (e) {
			console.log(e);
		}
	}, onBeforeClose = function() {
	};
	return {
		onBeforeOpen : onBeforeOpen,
		onBeforeClose : onBeforeClose
	};
};
