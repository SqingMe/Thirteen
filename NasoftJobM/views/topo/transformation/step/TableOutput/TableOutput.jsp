<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="TableOutput" class="easyui-window" title="表输出"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 700px; height: 600px; padding: 10px;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 10px;">
			<table>
				<tr>
					<td>步骤名称:</td>
					<td><input class="easyui-textbox" name='step_name_tableOutput'
						id='step_name_tableOutput' style='width: 450px'></td>
				</tr>
				<tr>
					<td>数据库连接:</td>
					<td><input name='tbout_connection' id='tbout_connection'
						style='width: 450px'></td>
				</tr>
				<tr>
					<td>目标表:</td>
					<td><input class='easyui-textbox' name='table'
						id='dataBaseTableName' style='width: 450px'></td>
				</tr>
			</table>
		</div>
		<div region="center" border="true" style="padding: 10px;">
			<div id="tableOutput_Tabs" class='easyui-tabs'
				data-options="border:true,fit:true"
				style="width: 475px; height: 300px;">
				<div title="数据库字段">
					<table id="table_field"></table>
				</div>
			</div>
		</div>
		<div region="south" border="true"
			style="text-align: right; padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a id='tableOutput_ok' class='easyui-linkbutton'>确定</a> <a
					id='tableOutput_cancel' class='easyui-linkbutton'>取消</a>
			</div>
		</div>
	</div>
</div>
<%--  <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/tableOutput/tableOutput.js"></script> --%>