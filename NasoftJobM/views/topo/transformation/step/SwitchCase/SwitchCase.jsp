<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SwitchCase" class="easyui-window" title="Switch / Case"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 450px; height: 600px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="center">
			<table align="center">
				<tr>
					<td align="right">步骤名称:</td>
					<td><input class="easyui-textbox" id="SwitchCase_step_name"
						name="SwitchCase_step_name" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">Switch字段:</td>
					<td><input class="easyui-combobox"
						id="SwitchCase_step_fieldname" name="SwitchCase_step_fieldname"
						style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">使用字符串包含比较:</td>
					<td><input type="checkbox" id="SwitchCase_step_use_contains" /></td>
				</tr>
				<tr>
					<td align="right">Case值数据类型:</td>
					<td><input class="easyui-combobox"
						id="SwitchCase_step_case_value_type"
						name="SwitchCase_step_case_value_type" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">Case值转换掩码:</td>
					<td><input class="easyui-textbox"
						id="SwitchCase_step_case_value_format"
						name="SwitchCase_step_case_value_format" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">Case值小数点符号:</td>
					<td><input class="easyui-textbox"
						id="SwitchCase_step_case_value_decimal"
						name="SwitchCase_step_case_value_decimal" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">Case值分组标志:</td>
					<td><input class="easyui-textbox"
						id="SwitchCase_step_case_value_group"
						name="SwitchCase_step_case_value_group" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">默认目标步骤:</td>
					<td><input class="easyui-combobox"
						id="SwitchCase_step_default_target_step"
						name="SwitchCase_step_default_target_step" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">Case值:</td>
					<td height="290px"><table id="SwitchCase_step_cases_table"></table>
				</tr>

			</table>
		</div>
		<div region="south" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="SwitchCase_ok" style="width: 60px;">确定</a>
				<a class="easyui-linkbutton" id="SwitchCase_cancel"
					style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>
