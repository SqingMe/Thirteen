<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="DELAY" class="easyui-window" title="等待"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true,closed:true"
	style="width: 300px; height: 200px; padding: 5px;">
	<table style="margin: auto;">
		<tr>
			<td>作业名称:</td>
			<td><input id="DELAY_jobname" class="easyui-textbox" /></td>
		</tr>
		<tr>
			<td>最大超时:</td>
			<td><input id="DELAY_maximumTimeout" class="easyui-textbox" /></td>
		</tr>
		<tr>
			<td>单位:</td>
			<td><input id="DELAY_scaletime" class="easyui-combobox"
				data-options="
       			    data:[{'text':'秒','value':0},{'text':'分','value':1},{'text':'时','value':2}]" /></td>
		</tr>
	</table>
	<div style="text-align: center; margin: 20px auto auto auto;">
		<a class="easyui-linkbutton" id="DELAY_ok">确定</a> <a
			class="easyui-linkbutton" id="DELAY_cancel">取消</a>
	</div>
</div>