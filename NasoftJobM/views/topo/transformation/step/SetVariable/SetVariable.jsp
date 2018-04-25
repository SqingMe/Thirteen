<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SetVariable" class="easyui-window" title="设置环境变量"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region='north' style="height: 57px;">
			<table style="margin-left: 250px">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox" name="SetVariable_step_name"
						id="SetVariable_step_name" style="width: 600px" /></td>
				</tr>
				<tr colspan="2">
					<td>格式化:</td>
					<td><input name="SetVariable_use_formatting"
						id="SetVariable_use_formatting" type="checkbox"></td>
				</tr>

			</table>

		</div>


		<div region="center" border="true">
			<label>字段值</label>
			<table id='SetVariable_table' class='easyui-datagrid'
				data-options="singleSelect:true,fit:true">
				<thead>
					<tr>
						<th data-options="field:'field_name',width:60">字段名称</th>
						<th data-options="field:'variable_name',width:60">变量名</th>
						<th data-options="field:'variable_type',width:180">变量活动类型</th>
						<th data-options="field:'default_value',width:100">默认值</th>
					</tr>
				</thead>
			</table>

		</div>

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="SetVariable_ok"
					style="width: 50px;">确定</a> <a class="easyui-linkbutton"
					id="SetVariable_cancel" style="width: 50px;">取消</a> <a
					class="easyui-linkbutton" id="SetVariable_obtain"
					style="width: 80px;">获取字段</a>
			</div>
		</div>
	</div>

</div>

<%--   <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/setVariable/setVariable.js"></script> --%>
