<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="SPECIAL" class="easyui-window" title="作业定时调度"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1000px; height: 600px; padding: 5px;">

	<div class="easyui-layout" fit="true">

		<table style="margin-left: 300px;">
			<tr colspan="2">
				<td>重复</td>
				<td><input name="SPECIAL_repeat" id="SPECIAL_repeat"
					type="checkbox"></td>
			</tr>

			<tr>
				<td>类型</td>
				<td><input class="easyui-combobox" name="SPECIAL_type"
					id="SPECIAL_type" style="width: 500px" /></td>
			</tr>


			<tr>
				<td>以秒计算的间隔</td>
				<td><input class="easyui-numberspinner" style="width: 500px"
					id="second_interval" disabled></td>
			</tr>

			<tr>
				<td>以分钟计算的间隔</td>
				<td><input class="easyui-numberspinner" style="width: 500px"
					id="minute_interval" disabled></td>
			</tr>

			<tr>
				<td>每天</td>
				<td><input class="easyui-numberspinner" style="width: 250px"
					id="SPECIAL_sky_hours" disabled> <input
					class="easyui-numberspinner" style="width: 250px"
					id="SPECIAL_sky_minute" disabled></td>
			</tr>

			<tr>
				<td>每周</td>
				<td><input class="easyui-combobox" name="SPECIAL_week"
					id="SPECIAL_week" style="width: 500px" disabled /></td>
			</tr>

			<tr>
				<td>每月</td>
				<td><input class="easyui-numberspinner" style="width: 500px"
					id="SPECIAL_month" disabled></td>
			</tr>
		</table>

		<div style="margin: auto; text-align: center">
			<a id='SPECIAL_tableInput_ok' class='easyui-linkbutton'
				style="width: 60px">确定</a> <a id='SPECIAL_tableInput_cancel'
				class='easyui-linkbutton' style="width: 60px">取消</a>

		</div>

	</div>
</div>

<%-- <script type="text/javascript" src="<%=path %>/views/topo/job/entries/SPECIAL/SPECIAL.js"></script> --%>