<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SET_VARIABLES" class="easyui-window" title="设置变量"
	data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:true, closed:true"
	style="width: 500px; height: 500px; padding: 5px;">
	<div class="easyui-layout" fit='true'>
		<div region="north">
			<table style="margin: auto;">
				<tr>
					<td>作业名称:</td>
					<td><input id="SET_VARIABLES_jobname" class="easyui-textbox" /></td>
				</tr>
			</table>
			<fieldset style="border: inherit;">
				<legend>属性文件</legend>
				<table style="margin: auto;">
					<tr>
						<td>属性文件名:</td>
						<td><input id="SET_VARIABLES_filename" class="easyui-textbox" /></td>
					</tr>
					<tr>
						<td>变量有效范围:</td>
						<td><input id="SET_VARIABLES_file_variable_type"
							class="easyui-combobox" /></td>
					</tr>
				</table>
			</fieldset>
			<fieldset style="border: inherit;">
				<legend>设置</legend>
				<table style="margin: auto;">
					<tr>
						<td>变量替换:</td>
						<td><input id="SET_VARIABLES_replacevars" type="checkbox" /></td>
					</tr>
				</table>
			</fieldset>
		</div>
		<div region="center">
			<label>变量:</label>

			<table id="SET_VARIABLES_field" class="easyui-datagrid" fit="true">
			</table>
		</div>
		<div region='south'>
			<div style="text-align: center;">
				<a class="easyui-linkbutton" id="SET_VARIABLES_ok">确定</a> <a
					class="easyui-linkbutton" id="SET_VARIABLES_cancel">取消</a>
			</div>
		</div>
	</div>
</div>