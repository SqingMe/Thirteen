Nasoft.Topo.transferFns.Sequence = function(node) {
	var Sequence = [];
	       if(node.valuename){
	    	return [{name:node.valuename}] ;
	       }          
	return Sequence;
};
Nasoft.Window.fns.Sequence = function(node) {
	Nasoft.Ui_extend.browser_even('#Sequence');// 限制组件不能超出浏览器上边缘

	var onBeforeOpen, onBeforeClose, onBeforeOpen = function() {
		try {
			// console.log("node="+node);
			$('#Sequence_step_name').textbox('setValue', node.text);
			node.getStep().valuename!=''&&node.getStep().valuename!=null?$('#Sequence_step_namefiled').textbox('setValue', node.getStep().valuename):$('#Sequence_step_namefiled').textbox('setValue', '');

			node.getStep().counter_name!=''&&node.getStep().counter_name!=null?$('#Sequence_step_counter').textbox('setValue', node.getStep().counter_name):$('#Sequence_step_counter').textbox('setValue', '');
			node.getStep().start_at!=''&&node.getStep().start_at!=null?$('#Sequence_step_start').textbox('setValue', node.getStep().start_at):$('#Sequence_step_start').textbox('setValue', '');
			node.getStep().increment_by!=''&&node.getStep().increment_by!=null?$('#Sequence_step_growth').textbox('setValue', node.getStep().increment_by):$('#Sequence_step_growth').textbox('setValue', '');
			node.getStep().max_value!=''&&node.getStep().max_value!=null?$('#Sequence_step_max').textbox('setValue', node.getStep().max_value):$('#Sequence_step_max').textbox('setValue', '');
//			//使用DB来获取sequence
			node.getStep().schema!=''&&node.getStep().schema!=null?$('#DBSequence_step_SchemasName').textbox('setValue', node.getStep().schema):$('#DBSequence_step_SchemasName').textbox('setValue', '');
			node.getStep().seqname!=''&&node.getStep().seqname!=null?$('#DBSequence_step_name').textbox('setValue', node.getStep().seqname):$('#DBSequence_step_name').textbox('setValue', '');
			 var	connections=Nasoft.GetProjectData.getConnectins();//获取树结构中所有数据连接数据
				$('#DBSequence_step_contion').combobox({
					data:connections,
					valueField:'name',   //将connections的id字段绑定在下拉表单的value上 
					textField:'name',  //将connections的text字段绑定在下拉表单的显示字段上
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
			node.getStep().connection!=''&&node.getStep().connection!=null?$('#DBSequence_step_contion').combobox('setValue', node.getStep().connection):$('#DBSequence_step_contion').combobox('setValue', '');
			// 取消按钮
			$('#Sequence_cancel').unbind('click').click(function(e) {
				$('#Sequence').window('close');
			});
			// 确认按钮
			$('#Sequence_ok').unbind('click').click(function(e) {
				var Sequence = {};
				node.text = $('#Sequence_step_name').textbox('getValue');
				Sequence.valuename=($('#Sequence_step_namefiled').textbox('getValue')==null||$('#Sequence_step_namefiled').textbox('getValue')=='')?'':$('#Sequence_step_namefiled').textbox('getValue');
				//使用计数器来计算sequence
				if($('input[name="FruitSequence"]').prop("checked")){
					Sequence.use_counter ='Y';
				}else{
					Sequence.use_counter ='N';
				}
				Sequence.start_at=($('#Sequence_step_start').textbox('getValue')==null||$('#Sequence_step_start').textbox('getValue')=='')?'':$('#Sequence_step_start').textbox('getValue');
				Sequence.increment_by=($('#Sequence_step_growth').textbox('getValue')==null||$('#Sequence_step_growth').textbox('getValue')=='')?'':$('#Sequence_step_growth').textbox('getValue');
				Sequence.max_value=($('#Sequence_step_max').textbox('getValue')==null||$('#Sequence_step_max').textbox('getValue')=='')?'':$('#Sequence_step_max').textbox('getValue');
				Sequence.counter_name=($('#Sequence_step_counter').textbox('getValue')==null||$('#Sequence_step_counter').textbox('getValue')=='')?'':$('#Sequence_step_counter').textbox('getValue');
				//使用DB来获取sequence
				if($('input[name="FruitDBSequence"]').prop("checked")){
					Sequence.use_database = 'Y';
				}else{
					Sequence.use_database = 'N';
				}
				Sequence.connection=($('#DBSequence_step_contion').combobox('getValue')==null||$('#DBSequence_step_contion').combobox('getValue')=='')?'':$('#DBSequence_step_contion').combobox('getValue');
				Sequence.schema=($('#DBSequence_step_SchemasName').textbox('getValue')==null||$('#DBSequence_step_SchemasName').textbox('getValue')=='')?'':$('#DBSequence_step_SchemasName').textbox('getValue');
				Sequence.seqname=($('#DBSequence_step_name').textbox('getValue')==null||$('#DBSequence_step_name').textbox('getValue')=='')?'':$('#DBSequence_step_name').textbox('getValue');
				
				node.setStep(Sequence);
				node.setTransfer();// 把定义的常量set出去
				$('#Sequence').window('close');// 关闭窗口
			});
			$("#DBSequence_step_checkbox").click(function() { 
				//获取复选框的是否被选中
				 if($('input[name="FruitDBSequence"]').prop("checked")){
					 	$('input[name="FruitSequence"]').prop("checked",false);
					 	checked();
		        }else{
		        	checked();
		        }
			 });
			$("#Sequence_step_checkbox").click(function() { 
				//获取复选框的是否被选中
				if($('input[name="FruitSequence"]').prop("checked")){
					$('input[name="FruitDBSequence"]').prop("checked",false);
				 	checked();
				}else{
					checked();
				}
			});

		} catch (e) {
			console.log(e)
		}
	}, onBeforeClose = function() {
	},checked = function(){
		//获取复选框的是否被选中
		if($('input[name="FruitSequence"]').prop("checked")){
			$('#Sequence_step_max').textbox({ disabled:false});
			$('#Sequence_step_growth').textbox({ disabled:false});
			$('#Sequence_step_start').textbox({ disabled:false});
			$('#Sequence_step_counter').textbox({ disabled:false});
		}else{
			$('#Sequence_step_max').textbox({ disabled:true});
			$('#Sequence_step_growth').textbox({ disabled:true});
			$('#Sequence_step_start').textbox({ disabled:true});
			$('#Sequence_step_counter').textbox({ disabled:true});
		}
		//获取复选框的是否被选中
		 if($('input[name="FruitDBSequence"]').prop("checked")){
			 	$('#DBSequence_step_contion').combobox({ disabled:false});
			 	$('#DBSequence_step_SchemasName').textbox({ disabled:false});
			 	$('#DBSequence_step_name').textbox({ disabled:false});
	       }else{
	       		$('#DBSequence_step_contion').combobox({ disabled:true});
	       		$('#DBSequence_step_SchemasName').textbox({ disabled:true});
	       		$('#DBSequence_step_name').textbox({ disabled:true});
	       }
	}
	return {
		onBeforeOpen : onBeforeOpen,
		onBeforeClose : onBeforeClose
	}
}

