<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="DBLookup" class="easyui-window" title="数据库查询"
	data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">

	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px">
			<table style="margin-left: 280px;">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox" nama="step_name_DBLookup"
						id="step_name_DBLookup" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center">
			<div id="DBLookup_tabs" class="easyui-tabs" data-options="fit:true"
				style="">
				<div title="一般" style="display: none;">
					<div region="center">
						<form>
							<fieldset>
								<legend>连接</legend>
								<table style="margin-left: 400px;">
									<tr>
										<td>数据库连接</td>
										<!-- class="easyui-combobox" -->
										<td><input id="server_conner_DBLookup"
											style="width: 640px" /> <!-- <a class="easyui-linkbutton" id='tableInput_compile'>编辑</a> 
												<a class="easyui-linkbutton" id='tableInput_new'>新建</a> 
												<a class="easyui-linkbutton" id='tableInput_Wizard'>Wizard</a> -->
										</td>
									</tr>
									<tr>
										<td>模式名称</td>
										<td><input class="easyui-textbox"
											id="goal_model_DBLookup" style="width: 600px;" /></td>
									</tr>
									<tr>
										<td>目标表</td>
										<td><input class="easyui-textbox"
											id="goal_surface_DBLookup" style="width: 600px;" /></td>
									</tr>
									<tr>
										<td>使用缓存</td>
										<td><input type="checkbox" id="cache_DBLookup" /></td>
									</tr>
									<tr>
										<td>缓存大小</td>
										<td><input class="easyui-textbox"
											id="cache_size_DBLookup" style="width: 600px;" /></td>
									</tr>
									<tr>
										<td>从表中加载所有数据</td>
										<td><input type="checkbox" id="cache_table_DBLookup" />
										</td>
									</tr>
									<tr>
										<td>查询失败则忽略</td>
										<td><input type="checkbox" id="cache_ignore_DBLookup" />
										</td>
									</tr>
									<tr>
										<td>多行结果时失败</td>
										<td><input type="checkbox" id="cache_result_DBLookup" />
										</td>
									</tr>
								</table>
							</fieldset>
						</form>
					</div>
				</div>
				<div title="查询表关键字" style="display: none;">
					<table id='DBLookup_condition_table' class='easyui-datagrid'
						data-options="singleSelect:true,fit:true">
					</table>
				</div>

				<div title="输出字段" style="display: none;">
					<table id='DBLookup_output_table' class='easyui-datagrid'
						data-options="singleSelect:true,fit:true">
					</table>
				</div>
			</div>

		</div>
		<!--中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="DBLookup_ok" style="width: 100px;">确定</a>
				<a class="easyui-linkbutton" id="DBLookup_cancel"
					style="width: 100px;">取消</a>
			</div>
		</div>
		<!--底部-->

	</div>
	<!--大布局-->
</div>

