<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="GetVariable" class="easyui-window" title="获取变量"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 800px; height: 300px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north">
			<table align="right">
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" id="step_name_GetVariable"
						style="width: 400px"></td>
				</tr>
				<!-- 输入框 -->
			</table>
		</div>

		<div region="center" style="padding: 10px;">
			<!--表格-->
			<label>字段</label>
			<table id='GetVariable_table'>
			</table>
		</div>
		<div region="south" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='GetVariable_ok' class='easyui-linkbutton' style="width: 60px">确定</a>
				<a id='GetVariable_cancel' class='easyui-linkbutton'
					style="width: 60px">取消</a>
			</div>

		</div>
	</div>
</div>
