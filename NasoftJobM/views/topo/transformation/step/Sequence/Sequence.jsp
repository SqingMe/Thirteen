<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="Sequence" class="easyui-window" title="增加序列"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 450px; height: 500px; padding: 0px;">
	<div class="easyui-layout" fit="true">
		<div region="north" style="height:80px;">
			<table align="center" style="padding-top: 13px;">
				<tr>
					<td align="right">步骤名称:</td>
					<td><input class="easyui-textbox" id="Sequence_step_name"
						name="Sequence_step_name" style="width: 200px;" /></td>
				</tr>
				<tr>
					<td align="right">值的名称:</td>
					<td><input class="easyui-textbox" id="Sequence_step_namefiled"
						name="Sequence_step_namefiled" style="width: 200px;" /></td>
				</tr>
			</table>
		</div>
		<div region="center" >
			<div class="easyui-layout" fit="true">
				<div region="north" data-options="fit:true,title:'使用数据库来生成序列',collapsible:false,maxHeight:150" style="height:100px">
					<table align="center">
						<tr>
							<td align="tight">使用DB来获取sequence？</td>
							<td>
								<input name="FruitDBSequence" type="checkbox" value="" id="DBSequence_step_checkbox" />
							</td>
						</tr>
						<tr>
							<td align="right">数据库连接:</td>
							<td><input class="easyui-textbox" id="DBSequence_step_contion" data-options="disabled:true"
								name="DBSequence_step_contion"  style="width: 200px;" /></td>
						</tr>
						<tr>
							<td align="right">模式名称:</td>
							<td><input class="easyui-textbox" id="DBSequence_step_SchemasName" data-options="disabled:true"
								name="DBSequence_step_SchemasName" style="width: 200px;" /></td>
						</tr>
						<tr>
							<td align="right">sequence名称:</td>
							<td><input class="easyui-textbox" id="DBSequence_step_name" data-options="disabled:true"
								name="DBSequence_step_name" style="width: 200px;" /></td>
						</tr>
					</table>
				</div>
				<!-- begin -->
				<div region="center" data-options="title:'使用转换计数器来生产序列',collapsible:false">
					<table align="center">
						<tr>
							<td align="tight">使用计数器来计算sequence？</td>
							<td>
								<input name="FruitSequence" type="checkbox" checked="checked" value="" id="Sequence_step_checkbox" />
							</td>
						</tr>
						<tr>
							<td align="right">计数器名称(可选):</td>
							<td><input class="easyui-textbox" id="Sequence_step_counter" data-options="disabled:false"
								style="width: 200px;" /></td>
						</tr>
						<tr>
							<td align="right">起始值:</td>
							<td><input class="easyui-textbox" id="Sequence_step_start" data-options="disabled:false"
								style="width: 200px;" /></td>
						</tr>
						<tr>
							<td align="right">增长根据:</td>
							<td><input class="easyui-textbox" id="Sequence_step_growth" data-options="disabled:false"
								name="Sequence_step_growth" style="width: 200px;" /></td>
						</tr>
						<tr>
							<td align="right">最大值:</td>
							<td><input class="easyui-textbox" id="Sequence_step_max" data-options="disabled:false"
								name="Sequence_step_max" style="width: 200px;" /></td>
						</tr>
					</table>
				</div>
				<!-- end -->
				<!-- 按钮 begin -->
				<div region="south" style="padding: 10px;">
					<div style="margin: auto; text-align: center">
						<a class="easyui-linkbutton" id="Sequence_ok" style="width: 60px;">确定</a>
						<a class="easyui-linkbutton" id="Sequence_cancel"
							style="width: 60px;">取消</a>
					</div>
				</div>
				<!-- 按钮 end -->
			</div>
		</div>
	</div>
</div>
