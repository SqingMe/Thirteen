<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="DetectLastRow" class="easyui-window" title="识别流的最后一行"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 400px; height: 210px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="center">
			<table align="center">
				<tr>
					<td align="right">步骤名:</td>
					<td><input class="easyui-textbox" id="Dummy_task_name"
						name="Dummy_task_name" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">结果字段名:</td>
					<td><input class="easyui-textbox" id="detecrow_task_name"
						name="detecrow_task_name" style="width: 200px;" /></td>
				</tr>
			</table>
		</div>


		<div region="south" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="DetectLastRow_ok" style="width: 60px;">确定</a>
				<a class="easyui-linkbutton" id="DetectLastRow_cancel" style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>