<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="ValueMapperToDb" class="easyui-window" title="数据库值映射"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 450px; height: 330px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="center">
			<table align="center">
				<tr>
					<td align="right">步骤名称:</td>
					<td><input class="easyui-textbox"
						id="ValueMapperToDb_step_name" name="ValueMapperToDb_step_name"
						style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">数据库连接:</td>
					<td><input class="easyui-combobox"
						id="ValueMapperToDb_step_connection"
						name="ValueMapperToDb_step_connection" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">目标模式:</td>
					<td><input class="easyui-textbox"
						id="ValueMapperToDb_step_use_schema" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">目标表名:</td>
					<td><input class="easyui-textbox"
						id="ValueMapperToDb_step_table" name="ValueMapperToDb_step_table"
						style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">源字段名:</td>
					<td><input class="easyui-textbox"
						id="ValueMapperToDb_step_originname"
						name="ValueMapperToDb_step_originname" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">目标字段名:</td>
					<td><input class="easyui-textbox"
						id="ValueMapperToDb_step_aimname"
						name="ValueMapperToDb_step_aimname" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">使用的字段名:</td>
					<td><input class="easyui-combobox"
						id="ValueMapperToDb_step_filedA"
						name="ValueMapperToDb_step_filedA" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">条件筛选:</td>
					<td><input class="easyui-textbox"
						id="ValueMapperToDb_step_wherename"
						name="ValueMapperToDb_step_wherename" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">不匹配时的默认值:</td>
					<td><input class="easyui-textbox"
						id="ValueMapperToDb_step_non_match_default"
						name="ValueMapperToDb_step_non_match_default"
						style="width: 200px;" /></td>
				</tr>
			</table>
		</div>
		<div region="south" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="ValueMapperToDb_ok"
					style="width: 60px;">确定</a> <a class="easyui-linkbutton"
					id="ValueMapperToDb_cancel" style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>
