Nasoft.Topo.transferFns.DetectLastRow = function(node) {
	var file=node.getStep().resultfieldname;//将对应数据字段加入表输出
	var fds = [{name:file}];
	return fds;
};
Nasoft.Window.fns.DetectLastRow = function(node) {
	Nasoft.Ui_extend.browser_even('#DetectLastRow');// 限制组件不能超出浏览器上边缘

	var onBeforeOpen, onBeforeClose, onBeforeOpen = function() {
		try {
			// console.log("node="+node);
			$('#Dummy_task_name').textbox('setValue', node.text);
			$('#detecrow_task_name').textbox('setValue', node.getStep().resultfieldname);
			// 取消按钮
			$('#DetectLastRow_cancel').unbind('click').click(function(e) {
				$('#DetectLastRow').window('close');
			});
			// 确认按钮
			$('#DetectLastRow_ok').unbind('click').click(function(e) {
								var Dummy = {};
								node.text = $('#Dummy_task_name').textbox('getValue');
								Dummy.resultfieldname = $('#detecrow_task_name').textbox('getValue');
							    node.setStep(Dummy);
								node.setTransfer();// 把定义的常量set出去
								$('#DetectLastRow').window('close');// 关闭窗口
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
