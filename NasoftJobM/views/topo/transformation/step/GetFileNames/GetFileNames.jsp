<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
%>
<div id="GetFileNames" class="easyui-window" title="获取文件名"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 10px">
			<table style="margin-left: 280px;">
				<tr>
					<td>步骤名称:</td>
					<td><input class="easyui-textbox"
						nama="step_name_selectValues" id="step_name_selectValues"
						style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!--头部-->

		<div region="center" border="true">
			<div id="file" class="easyui-tabs" data-options="fit:true" style="">
				<div title="文件" style="display: none;">
					<div class="easyui-layout" fit="true">
						<div region="north">
							<form>
								<fieldset>
									<legend>从字段获取文件名</legend>
									<table style="margin-left: 200px;">
										<tr>
											<td>文件名定义在字段里?</td>
											<td><input type="checkbox" name="GetFileNames_check"
												id="GetFileNames_check" /></td>
										</tr>

										<tr>
											<td>从字段中获取文件名</td>
											<td><input class="easyui-combobox"
												name="field_file_naem" id="field_file_naem"
												style="width: 500px" /></td>
										</tr>

										<tr>
											<td>从字段获取通配符</td>
											<td><input class="easyui-combobox" name="file_obtain"
												id="file_obtain" style="width: 500px" /></td>
										</tr>

										<tr>
											<td>通配符(排除)</td>
											<td><input class="easyui-combobox" name="tong_pei_fu"
												id="tong_pei_fu" style="width: 500px" /></td>
										</tr>

										<tr>
											<td>包含子目录</td>
											<td><input type="checkbox" name="character_catalogue"
												id="character_catalogue" /></td>
										</tr>

									</table>

								</fieldset>
							</form>

						</div>
						<!--头部-->

						<div region="center">
							<table style="margin-left: 230px;">
								<tr>
									<td>文件或目录</td>
									<td><input class="easyui-textbox" name="file_catalogue"
										id="file_catalogue" style="width: 400px;" /> <a
										class="easyui-linkbutton" name="GetFileNames_increase"
										id="GetFileNames_increase" style="width: 50px;">增加</a> <a
										class="easyui-linkbutton" name="GetFileNames_browse"
										id="GetFileNames_browse" style="width: 50px;">浏览</a> <input
										type="hidden" id="file_catalogue_h"></td>
								</tr>

								<tr>
									<td>正则表达式</td>
									<td><input class="easyui-textbox"
										name="regular_expression" id="regular_expression"
										style="width: 500px;" /></td>
								</tr>

								<tr>
									<td>正则表达式(排除)</td>
									<td><input class="easyui-textbox"
										name="regular_expression_remove"
										id="regular_expression_remove" style="width: 500px;" /></td>
								</tr>
							</table>
							<label>已经选择的文件名称:</label>
							<table id='getFileNames_file_table' class='easyui-datagrid'
								data-options="singleSelect:true,fit:true">

							</table>
						</div>
						<!--中间-->

						<div region="south">
							<div style="margin: auto;">
								<a class="easyui-linkbutton" id="tableInput_filename"
									style="width: 100px;">显示文件名称</a> <a class="easyui-linkbutton"
									id="tableInput_delete" style="width: 60px;">删除</a>
								<!-- 									<a class="easyui-linkbutton" id="tableInput_compile" style="width: 60px;">编辑</a> -->
								<div id="GetFileNames_window_filename"></div>
							</div>
						</div>
						<!--底部-->

					</div>
					<!--内部大-->
				</div>

				<div title="过滤" style="display: none;">
					<table style="margin-left: 320px;">
						<tr>
							<td>获取</td>
							<td><input class="easyui-combobox" name="obtain" id="obtain"
								style="width: 600px;" /></td>
						</tr>
					</table>
					<form>
						<fieldset>
							<legend>附件字段</legend>
							<table style="margin-left: 230px; height: 80px;">
								<tr colspan="4">
									<td>在输出中包含行号</td>
									<td><input type="checkbox" id="linemark" name="linemark" /></td>
									<td>行号字段名</td>
									<td><input class="easyui-textbox" name="line_mark_name"
										id="line_mark_name" style="width: 500px;" /></td>
								</tr>
							</table>
						</fieldset>
					</form>

					<table style="margin-left: 195px;">
						<tr>
							<td>当没有文件或目录时不报错</td>
							<td><input type="checkbox" name="not_have_file"
								id="not_have_file" /></td>
						</tr>

						<tr>
							<td>限制</td>
							<td><input class="easyui-textbox" name="astrict"
								id="astrict" style="width: 500px;" /></td>
						</tr>
					</table>
					<form>
						<fieldset>
							<legend>增加到结果文件中</legend>
							<table style="margin-left: 155px; height: 80px;">
								<tr>
									<td>将文件名增加到结果文件列表中</td>
									<td><input type="checkbox"
										name="GetFileNames_add_file_name"
										id="GetFileNames_add_file_name" /></td>
								</tr>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<!--中间-->
		<div region="south" border="true">
			<div style="margin: auto; text-align: center">
				<a class="easyui-linkbutton" id="GetFileNames_ok"
					style="width: 60px;">确定</a> <a class="easyui-linkbutton"
					id="GetFileNames_preview" style="width: 80px;">预览记录</a> <a
					class="easyui-linkbutton" id="GetFileNames_cancel"
					style="width: 60px;">取消</a>
			</div>
			<div id="GetFileNames_window_preview"></div>
			<div id="GetFileNames_window_fileProperty"></div>
		</div>
		<!--低部-->
	</div>
	<!--大布局-->
</div>
<!--网页布局-->

