<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SUCCESS" class="easyui-window" title="成功"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1000px; height: 600px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<table style="margin-left: 200px;">
			<tr>
				<td>作业名称:</td>
				<td><input class="easyui-textbox" id="SUCCESS_task_name"
					name="SUCCESS_task_name" style="width: 600px;" /></td>
			</tr>
		</table>
		<div style="margin: auto; text-align: center">
			<a class="easyui-linkbutton" id="SUCCESS_ok" style="width: 60px;">确定</a>
			<a class="easyui-linkbutton" id="SUCCESS_cancel" style="width: 60px;">取消</a>
		</div>
	</div>
</div>

<%-- <script type="text/javascript" src="<%=path %>/views/topo/job/entries/SUCCESS/SUCCESS.js"></script> --%>