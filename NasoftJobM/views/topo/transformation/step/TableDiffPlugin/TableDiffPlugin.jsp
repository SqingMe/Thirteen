<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="TableDiffPlugin" class="easyui-window" title="表数据对比"
	data-options="modal:true,collapsible:false,minimizable:false,maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">

	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 20px">
			<table style="margin-left: 280px;">
				<tr>
					<td>步骤名称</td>
					<td><input class="easyui-textbox"
						nama="step_name_tableDiffPlugin" id="step_name_tableDiffPlugin"
						style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center">
			<div id="TableDiffPlugin_tabs" class="easyui-tabs"
				data-options="fit:true" style="">
				<div title="一般" style="display: none;">
					<div class="easyui-layout" fit="true">
						<div region="center">
							<form>
								<fieldset>
									<legend>连接</legend>
									<table style="margin-left: 400px;">
										<tr>
											<td>数据库连接</td>
											<!-- class="easyui-combobox" -->
											<td><input name="server_conner" id="server_conner"
												style="width: 640px" /> <!-- <a class="easyui-linkbutton" id='tableInput_compile'>编辑</a> 
												<a class="easyui-linkbutton" id='tableInput_new'>新建</a> 
												<a class="easyui-linkbutton" id='tableInput_Wizard'>Wizard</a> -->
											</td>
										</tr>
										<tr>
											<td>目标模式</td>
											<td><input class="easyui-textbox" name="goal_model"
												id="goal_model" style="width: 600px;" /> <!-- 												<a class="easyui-linkbutton" id="tableDiffPlugin_browse_model">浏览</a> -->
												<!-- 												<input type="hidden" id="tableDiffPlugin_browse_model_h"> -->
											</td>
										</tr>
										<tr>
											<td>目标表</td>
											<td><input class="easyui-textbox" name="goal_surface"
												id="goal_surface" style="width: 600px;" /> <!-- 												<a class="easyui-linkbutton" id="tableDiffPlugin_browse_surface">浏览</a> -->
												<!-- 	                             				<input type="hidden" id="goal_surface_h">						 -->
											</td>
										</tr>
										<tr>
											<td>where条件</td>
											<td><input class="easyui-textbox" name="goal_condition"
												id="goal_condition" style="width: 620px;" /></td>
										</tr>
										<tr>
											<td>代理名</td>
											<td><input class="easyui-textbox" name="agency_name"
												id="agency_name" style="width: 560px;" /> <a
												class="easyui-linkbutton" id="add_lt">增加</a> <a
												class="easyui-linkbutton" id="del_lt">删除</a></td>
										</tr>
									</table>
								</fieldset>
							</form>
						</div>
						<div region="south" style="height: 225px;">
							<div class="easyui-layout" fit="true">
								<div region="west" style="width: 1200px;">
									<table id='select_table' class='easyui-datagrid'
										data-options="singleSelect:true,fit:true">
										<thead>
											<tr>
												<th data-options="field:'library',width:60">库名</th>
												<th data-options="field:'table',width:60">表名</th>
												<th data-options="field:'where',width:80">where条件</th>
												<th data-options="field:'agent',width:60">代理名</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div title="比较条件" style="display: none;">
					<div class="easyui-layout" fit="true">
						<div region="center">
							<table id='condition_table' class='easyui-datagrid'
								data-options="singleSelect:true,fit:true">
								<thead>
									<tr>
										<th data-options="field:'term',width:80">条件组</th>
										<th data-options="field:'agent',width:80">代理名</th>
										<th data-options="field:'field',width:80">字段名称</th>
									</tr>
								</thead>
							</table>
						</div>
						<div region="south" style="height: 230px;">
							<label>代替名称</label>
							<table id='rplfield_table' class='easyui-datagrid'
								data-options="singleSelect:true,fit:true">
								<thead>
									<tr>
										<th data-options="field:'gnum',width:60">组号</th>
										<th data-options="field:'replacefieldname',width:80">代替名称</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>

				<div title="比较字段" style="display: none;">
					<div class="easyui-layout" fit="true">
						<div region="center">
							<label>组内比较</label>
							<table id='comparison_table' class='easyui-datagrid'
								data-options="singleSelect:true,fit:true">
								<thead>
									<tr>
										<th data-options="field:'term',width:80">字段组</th>
										<th data-options="field:'agentname',width:80">代理名</th>
										<th data-options="field:'fieldname',width:100">字段名称</th>
									</tr>
								</thead>
							</table>
						</div>

						<div region="south" style="height: 230px;">
							<label>新名称</label>
							<table id='newfield_table' class='easyui-datagrid'
								data-options="singleSelect:true,fit:true">
								<thead>
									<tr>
										<th data-options="field:'tnum',width:60">组号</th>
										<th data-options="field:'newfieldname',width:80">新名称</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
				</div>
				<div title="输出字段" style="display: none;">
					<table id='output_table' class='easyui-datagrid'
						data-options="singleSelect:true,fit:true">
						<thead>
							<tr>
								<th data-options="field:'name',width:80">字段名称</th>
								<th data-options="field:'newname',width:50">重命名</th>
								<th data-options="field:'type',width:50">类型</th>
								<th data-options="field:'format',width:50">格式</th>
								<th data-options="field:'length',width:50">长度</th>
								<th data-options="field:'precision',width:50">精度</th>
								<th data-options="field:'currency',width:50">货币</th>
								<th data-options="field:'decimal',width:50">小数</th>
								<th data-options="field:'group',width:50">分组</th>
								<th data-options="field:'trim_type',width:120">去除空字符串方式</th>
							</tr>
						</thead>
					</table>

				</div>

			</div>

		</div>
		<!--中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="tableDiffPlugin_ok"
					style="width: 100px;">确定</a> <a class="easyui-linkbutton"
					id="tableDiffPlugin_cancel" style="width: 100px;">取消</a>
			</div>
		</div>
		<!--底部-->

	</div>
	<!--大布局-->
</div>

<%--   <script type="text/javascript" src="<%=path %>/views/topo/transformation/step/tableDiffPlugin/tableDiffPlugin.js"></script> --%>