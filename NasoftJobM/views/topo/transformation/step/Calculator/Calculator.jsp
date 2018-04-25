<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="Calculator" class="easyui-window" title="计算器"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 800px; height: 300px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north">
			<table align="center">
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" id="step_name_Calculator"
						style="width: 200px"></td>
				</tr>
			</table>
		</div>

		<div region="center" style="padding: 10px;">
			<!--表格-->
			<label>字段:</label>
			<table id='Calculator_table'>
			</table>
			<div id="Calculator_table_calctytype"></div>
		</div>
		<div region="south" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='Calculator_ok' class='easyui-linkbutton' style="width: 60px">确定</a>
				<a id='Calculator_cancel' class='easyui-linkbutton'
					style="width: 60px">取消</a>
			</div>

		</div>
	</div>
</div>
<%-- <script type="text/javascript" src="<%=path%>/views/topo/transformation/step/constant/constant.js"></script> --%>