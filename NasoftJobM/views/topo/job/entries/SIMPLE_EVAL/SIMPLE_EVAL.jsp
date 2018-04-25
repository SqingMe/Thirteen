<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SIMPLE_EVAL" class="easyui-window" title="检验字段值"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true,closed:true"
	style="width: 500px; height: 350px; padding: 5px;">
	<div class="easyui-layout" fit='true'>
		<div region="north">
			<table style="margin: auto;">
				<tr>
					<td>作业名称:</td>
					<td><input id="SIMPLE_EVAL_jobname" data-options="width:150"
						class="easyui-textbox" /></td>
				</tr>
			</table>
		</div>
		<div region="center">
			<fieldset style="border: inherit;">
				<legend>源</legend>
				<table style="margin: auto;">
					<tr>
						<td>检验:</td>
						<td><input id="SIMPLE_EVAL_valuetype" class="easyui-combobox"
							data-options="
										width:150,
       			data:[{text:'上一步结果字段',value:'field'},{text:'变量',value:'variable'}]"></td>
					</tr>
					<tr>
						<td>字段名:</td>
						<td><input id="SIMPLE_EVAL_fieldname" class="easyui-textbox"
							data-options="width:150" /></td>
					</tr>
					<tr>
						<td>变量名:</td>
						<td><input id="SIMPLE_EVAL_variablename"
							class="easyui-textbox" data-options="width:150" /></td>
					</tr>
					<tr>
						<td>类型:</td>
						<td><input id="SIMPLE_EVAL_fieldtype" class="easyui-combobox"
							data-options="width:150,
       			data:[{text:'String',value:'string'},{text:'Number',value:'number'},{text:'Date',value:'datetime'},{text:'Boolean',value:'boolean'}]"></td>
					</tr>
					<tr>
						<td>掩码:</td>
						<td><input id="SIMPLE_EVAL_mask" class="easyui-combobox"
							data-options="width:150,
       			data:[{text:'yyyy/MM/dd HH:mm:ss.SSS',value:'yyyy/MM/dd HH:mm:ss.SSS'},{text:'yyyy/MM/dd HH:mm:ss',value:'yyyy/MM/dd HH:mm:ss'},{text:'yyyyMMddHHmmss',value:'yyyyMMddHHmmss'},{text:'yyyy/MM/dd',value:'yyyy/MM/dd'}
       			,{text:'yyyy-MM-dd',value:'yyyy-MM-dd'},{text:'yyyy-MM-dd HH:mm:ss',value:'yyyy-MM-dd HH:mm:ss'},{text:'yyyyMMdd',value:'yyyyMMdd'},{text:'MM/dd/yyyy',value:'MM/dd/yyyy'}
       			,{text:'MM/dd/yyyy HH:mm:ss',value:'MM/dd/yyyy HH:mm:ss'},{text:'MM-dd-yyyy',value:'MM-dd-yyyy'},{text:'MM-dd-yyyy HH:mm:ss',value:'MM-dd-yyyy HH:mm:ss'},{text:'MM/dd/yy',value:'MM/dd/yy'}
       			,{text:'MM-dd-yy',value:'MM-dd-yy'},{text:'dd/MM/yyyy',value:'dd/MM/yyyy'},{text:'dd-MM-yyyy',value:'dd-MM-yyyy'}]
       			" /></td>
					</tr>
				</table>
			</fieldset>
			<fieldset style="border: inherit;">
				<legend>成功条件</legend>
				<table style="margin: auto;">
					<tr>
						<td>当变量设置成功:</td>
						<td><input id="SIMPLE_EVAL_successwhenvarset" type="checkbox" /></td>
					</tr>
					<tr>
						<td>成功条件:</td>
						<td><input id="SIMPLE_EVAL_file_variable_type"
							data-options="width:150" class="easyui-combobox" /></td>
					</tr>
					<tr>
						<td>最大值:</td>
						<td><input id="SIMPLE_EVAL_max" class="easyui-textbox"
							data-options="width:150" /></td>
					</tr>
					<tr>
						<td>最小值:</td>
						<td><input id="SIMPLE_EVAL_min" class="easyui-textbox"
							data-options="width:150" /></td>
					</tr>
					<tr>
						<td>值:</td>
						<td><input id="SIMPLE_EVAL_comparevalue"
							class="easyui-textbox" data-options="width:150" /></td>
					</tr>
				</table>
			</fieldset>
		</div>
		<div region='south'>
			<div style="text-align: center;">
				<a class="easyui-linkbutton" id="SIMPLE_EVAL_ok">确定</a> <a
					class="easyui-linkbutton" id="SIMPLE_EVAL_cancel">取消</a>
			</div>
		</div>
	</div>
</div>

