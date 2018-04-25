<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="StringCut" class="easyui-window" title="剪切字符串"
	data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:true, closed:true"
	style="width: 800px; height: 350px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" style="padding: 10px">
			<table style="margin-left: 150px;">
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" id="step_name_StringCut"
						style="width: 400px;" /></td>
				</tr>
			</table>
		</div>

		<div region="center" style="padding: 10px;">
			<label>要剪切的字段</label>
			<table id='StringCut_table' class='easyui-datagrid'
				data-options="fitColumns:true,singleSelect:true,fit:true">
			</table>
		</div>

		<div region="south" border="true" style="height:50px">
			<div style="margin: auto; text-align: center;padding: 10px" >
				<a class="easyui-linkbutton" id="StringCut_ok" style="width: 60px;">确定</a>
				<a id='StringCut_get' class='easyui-linkbutton'>获取字段</a>
				<a class="easyui-linkbutton" id="StringCut_cancel" style="width: 60px;">取消</a>
			</div>
		</div>
	</div>
</div>


