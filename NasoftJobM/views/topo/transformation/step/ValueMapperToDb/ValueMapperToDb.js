Nasoft.Topo.transferFns.ValueMapperToDb = function(node) {
	var fds = [];
	return fds;
};
Nasoft.Window.fns.ValueMapperToDb = function(node) {
	Nasoft.Ui_extend.browser_even('#ValueMapperToDb');// 限制组件不能超出浏览器上边缘

	var onBeforeOpen, onBeforeClose, onBeforeOpen = function() {
		try {
			// console.log("node="+node);
			$('#ValueMapperToDb_step_name').textbox('setValue', node.text);
			var connections=Nasoft.GetProjectData.getConnectins();//获取树结构中数据连接的所有名称  		
    		console.log(connections);
    		$('#ValueMapperToDb_step_connection').combobox({    
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
					connectionName=node.getStep().connection!=''?node.getStep().connection:node.getConnectionName();
					console.log(connectionName)
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
    		var transferArry=Nasoft.Topo.transferFns.getTransfer(node);//获取当前节点可用的字段
			if(transferArry.length>0){
				var transfer=Nasoft.Util.transferArray_copy(transferArry);
				transfer=Nasoft.Util.transferFns_repeat_filed(transfer);
			}
			var caltacomval = Nasoft.Util.file_name_combobox(transfer);
			$('#ValueMapperToDb_step_filedA').combobox({
				data:caltacomval,
				valueField : "value",
				textField : "text",
				onLoadSuccess:function(data){
						$(this).combobox('select',node.getStep().field_to_use);
    			}
			});
			node.getStep().schema!=''&&node.getStep().schema!=null?$('#ValueMapperToDb_step_use_schema').textbox('setValue', node.getStep().schema):$('#ValueMapperToDb_step_use_schema').textbox('setValue', '');
			node.getStep().table!=''&&node.getStep().table!=null?$('#ValueMapperToDb_step_table').textbox('setValue', node.getStep().table):$('#ValueMapperToDb_step_table').textbox('setValue', '');
			node.getStep().originname!=''&&node.getStep().originname!=null?$('#ValueMapperToDb_step_originname').textbox('setValue', node.getStep().originname):$('#ValueMapperToDb_step_originname').textbox('setValue', '');
			node.getStep().aimname!=''&&node.getStep().aimname!=null?$('#ValueMapperToDb_step_aimname').textbox('setValue', node.getStep().aimname):$('#ValueMapperToDb_step_aimname').textbox('setValue', '');
			node.getStep().wherename!=''&&node.getStep().wherename!=null?$('#ValueMapperToDb_step_wherename').textbox('setValue', node.getStep().wherename):$('#ValueMapperToDb_step_wherename').textbox('setValue', '');
			

			// 取消按钮
			$('#ValueMapperToDb_cancel').unbind('click').click(function(e) {
				$('#ValueMapperToDb').window('close');
			});
			// 确认按钮
			$('#ValueMapperToDb_ok').unbind('click').click(function(e) {
								var ValueMapperToDb = {};
								node.text = $('#ValueMapperToDb_step_name').textbox('getValue');
								ValueMapperToDb.connection=($('#ValueMapperToDb_step_connection').combobox('getValue')==null||$('#ValueMapperToDb_step_connection').combobox('getValue')=='')?'':$('#ValueMapperToDb_step_connection').combobox('getValue');
								ValueMapperToDb.schema=($('#ValueMapperToDb_step_use_schema').textbox('getValue')==null||$('#ValueMapperToDb_step_use_schema').textbox('getValue')=='')?'':$('#ValueMapperToDb_step_use_schema').textbox('getValue');
								ValueMapperToDb.table=($('#ValueMapperToDb_step_table').textbox('getValue')==null||$('#ValueMapperToDb_step_table').textbox('getValue')=='')?'':$('#ValueMapperToDb_step_table').textbox('getValue');
								ValueMapperToDb.originname=($('#ValueMapperToDb_step_originname').textbox('getValue')==null||$('#ValueMapperToDb_step_originname').textbox('getValue')=='')?'':$('#ValueMapperToDb_step_originname').textbox('getValue');
								ValueMapperToDb.aimname=($('#ValueMapperToDb_step_aimname').textbox('getValue')==null||$('#ValueMapperToDb_step_aimname').textbox('getValue')=='')?'':$('#ValueMapperToDb_step_aimname').textbox('getValue');
								ValueMapperToDb.wherename=($('#ValueMapperToDb_step_wherename').textbox('getValue')==null||$('#ValueMapperToDb_step_wherename').textbox('getValue')=='')?'':$('#ValueMapperToDb_step_wherename').textbox('getValue');
								ValueMapperToDb.field_to_use=($('#ValueMapperToDb_step_filedA').combobox('getValue')==null||$('#ValueMapperToDb_step_filedA').combobox('getValue')=='')?'':$('#ValueMapperToDb_step_filedA').combobox('getValue');
							    node.setStep(ValueMapperToDb);
								node.setTransfer();// 把定义的常量set出去
								$('#ValueMapperToDb').window('close');// 关闭窗口
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
