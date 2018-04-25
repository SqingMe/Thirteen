<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SystemInfo" class="easyui-window" title="获取系统信息"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1000px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region='north' style="padding: 20px;">
			<table style="margin-left: 150px">
				<tr colspan="2">
					<td>步骤名称</td>
					<td><input class="easyui-textbox" name="systemInfo_step_name"
						id="systemInfo_step_name" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>

		<div region="center" border="true">
			<label>字段:</label>
			<table id='systemInfo_table' class='easyui-datagrid'>
				<thead>
					<tr>
						<th data-options="field:'name',width:60">名称</th>
						<th data-options="field:'type',width:60">类型</th>
					</tr>
				</thead>
			</table>
		</div>
		<div id="systemInfo_table_type"></div>
		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="SystemInfo_ok" style="width: 80px;">确定</a>
				<a class="easyui-linkbutton" id="SystemInfo_preview"
					style="width: 80px;">预览记录</a> <a class="easyui-linkbutton"
					id="SystemInfo_cancel" style="width: 80px;">取消</a>
			</div>
			<div id="SystemInfo_window_preview"></div>
			<div id="SystemInfo_window_fileProperty"></div>
		</div>
	</div>
</div>
