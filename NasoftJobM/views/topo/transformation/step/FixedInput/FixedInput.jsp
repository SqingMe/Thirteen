<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="FixedInput" class="easyui-window" title="固定宽度文件输入"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 800px; height: 600px; padding: 5px; background: #fafafa;">
	<div class="easyui-layout" fit="true">
		<div region="north" border="true" style="padding: 10px;">
			<table>
				<tr>
					<td align="right">步骤名称</td>
					<td><input class="easyui-textbox" name="step_name_fixedInput"
						id="step_name_fixedInput" style="width: 450px"></td>
				</tr>

				<tr>
					<td align="right">文件名</td>
					<td>
						<!-- <input name="fixedInput_update" id="fixedInput_update" class='easyui-filebox'  buttonText="浏 览" style="width: 450px"/> -->

						<input class='easyui-textbox' id='fixedInput_update'
						name='fixedInput_update' style="width: 200px" /> <a
						class='easyui-linkbutton' id="fixedInput_filelook">浏览</a> <input
						type="hidden" id="fixedInput_update_h">
					</td>
				</tr>

				<tr>
					<td align="left">以字节数表示的行宽度(不包括回车符CR)</td>
					<td><input class="easyui-textbox"
						name="byte_tableInput_fixedInput" id="byte_tableInput_fixedInput"
						style="width: 450px"></td>
				</tr>

				<tr colspan="2">
					<td align="right">保留换行符?</td>
					<td><input name="line_feed_fixedInput"
						id="line_feed_fixedInput" type="checkbox" checked="checked"></td>
				</tr>

				<tr>
					<td align="right">NIO缓存大小</td>
					<td><input class="easyui-textbox"
						name="big_or_small_fixedInput" id="big_or_small_fixedInput"
						style="width: 450px"></td>
				</tr>

				<tr colspan="2">
					<td align="right">简易转换?:</td>
					<td><input name="transition_fixedInput"
						id="transition_fixedInput" type="checkbox"></td>
				</tr>

				<tr colspan="2">
					<td align="right">保留头信息?:</td>
					<td><input name="head_information_fixedInput"
						id="head_information_fixedInput" type="checkbox"></td>
				</tr>

				<tr colspan="2">
					<td align="right">以平行的方式运行?:</td>
					<td><input name="parallel_fixedInput" id="parallel_fixedInput"
						type="checkbox"> <span
						id="span_hidden_parallel_fixedInput" style="display: none">
							<select style="width: 423px;" id="hidden_parallel_fixedInput"
							name="hidden_parallel_fixedInput" class="easyui-combobox"
							data-options="editable:false">
								<option>没有换行符</option>
								<option>Unix (1 字节)</option>
								<option>MS-DOS (2 字节)</option>
						</select>
					</span></td>
				</tr>

				<tr>
					<td align="right">编码</td>
					<td><select id="easyui-combobox-fixedInput"
						name="easyui-combobox-fixedInput" class="easyui-combobox"
						style="width: 450px;" data-options="editable:false">
							<option>UTF-8</option>
							<option>GBK</option>
							<option>GB2312</option>
					</select></td>
				</tr>

				<tr colspan="2">
					<td align="right">添加文件列表:</td>
					<td><input name="file_listing_fixedInput"
						id="file_listing_fixedInput" type="checkbox"></td>
				</tr>

				<!-- 输入框 -->
			</table>
		</div>
		<div region="center" border="true" style="padding: 10px;">
			<!--表格-->
			<table id='fixed_table_fixedInput' class='easyui-datagrid'
				data-options="fitColumns:true,singleSelect:true,fit:true">
				<thead>
					<tr>
						<th data-options="field:'id',width:20">#</th>
						<th data-options="field:'name',width:100">名称</th>
						<th data-options="field:'type',width:60">类型</th>
						<th data-options="field:'format',width:60">格式</th>
						<th data-options="field:'width',width:60">宽度</th>
						<th data-options="field:'length',width:60">长度</th>
						<th data-options="field:'precision',width:60">精度</th>
						<th data-options="field:'currency',width:60">货币</th>
						<th data-options="field:'decimal',width:60">十进制</th>
						<th data-options="field:'group',width:60">组</th>
						<th data-options="field:'trim_type',width:100">去除空字符的方式</th>
					</tr>
				</thead>

			</table>
		</div>
		<div region="south" border="true" style="padding: 10px;">
			<!-- 按钮-->
			<div style="margin: auto; text-align: center">
				<a id='fixedInput_ok' class='easyui-linkbutton' style="width: 60px">确定</a>
				<!--         <a id='fixedInput_obtain' class='easyui-linkbutton' style="width: 60px">获取字段</a> -->
				<a id='fixedInput_preview' class='easyui-linkbutton'
					style="width: 60px">预览</a> <a id='fixedInput_cancel'
					class='easyui-linkbutton' style="width: 60px">取消</a>
			</div>

		</div>
	</div>
</div>
