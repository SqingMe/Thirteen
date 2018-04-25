Nasoft.Topo.transferFns.Dummy = function(node) {
	var fds = [];
	return fds;
};
Nasoft.Window.fns.Dummy = function(node) {
	Nasoft.Ui_extend.browser_even('#Dummy');// 限制组件不能超出浏览器上边缘

	var onBeforeOpen, onBeforeClose, onBeforeOpen = function() {
		try {
			// console.log("node="+node);
			$('#Dummy_task_name').textbox('setValue', node.text);
			// 取消按钮
			$('#Dummy_cancel').unbind('click').click(function(e) {
				$('#Dummy').window('close');
			});
			// 确认按钮
			$('#Dummy_ok').unbind('click').click(function(e) {
								var Dummy = {};
								node.text = $('#Dummy_task_name').textbox('getValue');
							    node.setStep(Dummy);
								node.setTransfer();// 把定义的常量set出去
								$('#Dummy').window('close');// 关闭窗口
							});

		} catch (e) {
			console.log(e)
		}
	}, onBeforeClose = function() {
	}
	return {
		onBeforeOpen : onBeforeOpen,
		onBeforeClose : onBeforeClose
	}
}
