<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>
<div id="WRITE_TO_LOG" class="easyui-window" title="写日志"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 400px; height: 600px; padding: 5px;">
	<div class="easyui-layout" fit="true">
		<!-- 头部-->

		<div region="center">
			<div>
				<table align="center">
					<tr>
						<td align="right">作业项名称:</td>
						<td><input class="easyui-textbox"
							name="entry_name_WRITE_TO_LOG" id="entry_name_WRITE_TO_LOG"
							style="width: 220px"></td>
					</tr>
					<tr>
						<td align="right">日志级别:</td>
						<td><input id="entry_connect_WRITE_TO_LOG"
							style="width: 220px" /></td>
					</tr>
					<tr>
						<td align="right">日志主题:</td>
						<td align="left"><input class="easyui-textbox"
							id="entry_Logtopic_WRITE_TO_LOG" style="width: 220px" /></td>
					</tr>
					<tr>
						<td align="right">日志消息:</td>
						<td align="left"><textarea id="WRITE_TO_LOG_entry_textarea"
								wrap="wrap" style="width: 215px; height: 400px;"></textarea></td>
					</tr>
					<!-- 输入框 -->
				</table>
			</div>
		</div>
		<!--中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="entry_WRITE_TO_LOG_ok"
					style="width: 100px;">确定</a> <a class="easyui-linkbutton"
					id="entry_WRITE_TO_LOG_cancel" style="width: 100px;">取消</a>
			</div>
		</div>
		<!--底部-->
	</div>
	<!--大布局-->
</div>


