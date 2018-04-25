<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="CREATE_FOLDER" class="easyui-window" title="创建一个目录"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 410px; height: 200px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="center">
			<table align="center">
				<tr>
					<td align="right">作业项名称:</td>
					<td colspan="2"><input class="easyui-textbox"
						id="CREATE_FOLDER_task_name" name="CREATE_FOLDER_task_name"
						style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">文件名:</td>
					<td><input class="easyui-textbox"
						id="CREATE_FOLDER_task_filename" style="width: 140px;" /></td>
					<td align="left"><a id='CREATE_FOLDER_transition'
						class='easyui-linkbutton' style="width: 60px">浏览</a> <input
						type="hidden" id="CREATE_FOLDER_task_filename_h"></td>
				</tr>
				<tr>
					<td align="right">如果目录存在则创建失败:</td>
					<td colspan="2"><input type="checkbox"
						id="CREATE_FOLDER_task_failurefile" /></td>
				</tr>
			</table>
		</div>
		<div region="south" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="CREATE_FOLDER_ok"
					style="width: 60px;">确定</a> <a class="easyui-linkbutton"
					id="CREATE_FOLDER_cancel" style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>

<%-- <script type="text/javascript" src="<%=path %>/views/topo/job/entries/SUCCESS/SUCCESS.js"></script> --%>