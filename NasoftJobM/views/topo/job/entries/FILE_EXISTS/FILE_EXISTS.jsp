<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="FILE_EXISTS" class="easyui-window" title="检查一个文件是否存在"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 400px; height: 160px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<div region="center">
			<table align="center">
				<tr>
					<td align="right">作业项名称:</td>
					<td colspan="2"><input class="easyui-textbox"
						id="FILE_EXISTS_task_name" name="FILE_EXISTS_task_name"
						style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">文件名:</td>
					<td><input class="easyui-textbox"
						id="FILE_EXISTS_task_filename" style="width: 140px;" /></td>
					<td align="left"><a id='FILE_EXISTS_transition'
						class='easyui-linkbutton' style="width: 60px">浏览</a> <input
						type="hidden" id="FILE_EXISTS_task_filename_h"></td>
				</tr>
			</table>
		</div>
		<div region="south" style="padding: 10px;">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="FILE_EXISTS_ok"
					style="width: 60px;">确定</a> <a class="easyui-linkbutton"
					id="FILE_EXISTS_cancel" style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>

<%-- <script type="text/javascript" src="<%=path %>/views/topo/job/entries/SUCCESS/SUCCESS.js"></script> --%>