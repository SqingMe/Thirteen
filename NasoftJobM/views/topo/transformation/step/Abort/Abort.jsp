<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="Abort" class="easyui-window" title="中止"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 400px; height: 210px; padding: 5px;">
	<div class="easyui-layout" fit="true">
	<!-- <div region="north">
			<table align="center">
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" id="step_name_Calculator"
						style="width: 200px"></td>
				</tr>
			</table>
		</div> -->
		<div region="center">
			<table align="center">
				<tr>
					<td align="right">步骤名:</td>
					<td><input class="easyui-textbox" id="Abort_task_name"
						name="Abort_task_name" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">中止记录:</td>
					<td><input class="easyui-textbox" id="Abort_task_record"
						name="ABORT_task_record" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">中止信息:</td>
					<td><input class="easyui-textbox" id="Abort_task_message"
						name="ABORT_task_message" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">总是记录:</td>
					<td><input type="checkbox" id="Abort_Always_record" /></td>
				</tr>
			</table>
		</div>


		<div region="south" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="Abort_ok" style="width: 60px;">确定</a>
				<a class="easyui-linkbutton" id="Abort_cancel" style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>
