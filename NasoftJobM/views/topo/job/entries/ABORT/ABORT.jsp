<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="ABORT" class="easyui-window" title="中止作业"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 400px; height: 160px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="center">
			<table align="center">
				<tr>
					<td align="right">中止作业:</td>
					<td><input class="easyui-textbox" id="ABORT_task_name"
						name="ABORT_task_name" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">消息:</td>
					<td><input class="easyui-textbox" id="ABORT_task_message"
						name="ABORT_task_message" style="width: 200px;" /></td>
				     
	
					           
		
		</div>


		<div region="south" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="ABORT_ok" style="width: 60px;">确定</a>
				<a class="easyui-linkbutton" id="ABORT_cancel" style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>

<%-- <script type="text/javascript" src="<%=path %>/views/topo/job/entries/SUCCESS/SUCCESS.js"></script> --%>