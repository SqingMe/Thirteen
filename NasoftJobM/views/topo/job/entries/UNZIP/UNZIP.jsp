<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="UNZIP" class="easyui-window" title="解压缩文件"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px;">

	<div class="easyui-layout" fit="true">

		<div region="north">
			<table style="margin-left: 200px;">
				<tr>
					<td>作业项名称</td>
					<td><input class="easyui-textbox" name="school_name_unzip"
						id="school_name_unzip" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center" border="true">
			<div id="ftp" class="easyui-tabs" data-options="fit:true" style="">

				<div title="一般" style="display: none;">
					<form>
						<fieldset>
							<legend>源文件</legend>
							<table style="margin-left: 120px;">
							   <tr>
									<td>从上一个作业获取参数:</td>
									<td><input name="get_unzip" id="get_unzip"
										type="checkbox" /></td>
								</tr>
								<tr>
									<td>压缩文件名:</td>
									<td><input class="easyui-textbox" name="catalogue_unzip"
										id="catalogue_unzip" style="width: 600px;" /> <input type="hidden"
										id="catalogue_unzip_h"><a
										class="easyui-linkbutton" id='check_up_ftp'>浏览 </a>
										</td>
								</tr>
								<tr>
									<td>通配符(正则表达式):</td>
									<td><input class="easyui-textbox" name="expression_unzip"
										id="expression_unzip" style="width: 600px;" /></td>
								</tr>
							</table>
						</fieldset>
					</form>


					<form>
						<fieldset>
							<legend>解压缩文件</legend>
							<table style="margin-left: 120px;">
							<tr>
									<td>使用压缩文件名作为根目录名称:</td>
									<td><input name="true_unzip" id="true_unzip"
										type="checkbox" /></td>
								</tr>
								<tr>
									<td>目标目录:</td>
									<td><input class="easyui-textbox" name="goal_unzip"
										id="goal_unzip" style="width: 600px;" /> <input type="hidden"
										id="goal_unzip_h"> <a class="easyui-linkbutton"
										id='browse_ftp'>浏览</a></td>
								</tr>
	                          	<tr>
									<td>新建文件夹:</td>
									<td><input name="new_unzip" id="new_unzip" type="checkbox" /></td>
								</tr>
                                <tr>
									<td>包含通配符(正则表达式):</td>
									<td><input class="easyui-textbox" name="new_expression_unzip"
										id="new_expression_unzip" style="width: 600px;" /></td>
								</tr>
								 <tr>
									<td>不包含通配符(正则表达式):</td>
									<td><input class="easyui-textbox" name="no_new_expression_unzip"
										id="no_new_expression_unzip" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>在文件名中包含日期:</td>
									<td><input name="date_unzip" id="date_unzip" type="checkbox" /></td>
								</tr>

								<tr>
									<td>在文件名中包含时间:</td>
									<td><input name="time_unzip" id="time_unzip" type="checkbox" /></td>
								</tr>
								
								
								<tr>
									<td>设置日期时间格式:</td>
									<td><input name="time_form_unzip" id="time_form_unzip"
										type="checkbox" /></td>
								</tr>

								<tr>
									<td>日期时间格式:</td>
									<td><select class="easyui-combobox" name="date_from_unzip"
										id="date_from_unzip" data-options='editable:false'
										style="width: 600px">
											<option>yyyy/MM/dd HH:mm:ss.SSS</option>
											<option>yyyy/MM/dd HH:mm:ss.SSS XXX</option>
											<option>yyyy/MM/dd HH:mm:ss</option>
											<option>yyyy/MM/dd HH:mm:ss XXX</option>
											<option>yyyyMMddHHmmss</option>
											<option>yyyy/MM/dd</option>
											<option>yyyy-MM-dd</option>
											<option>yyyy-MM-dd HH:mm:ss</option>
											<option>yyyy-MM-dd HH:mm:ss XXX</option>
											<option>yyyyMMdd</option>
											<option>MM/dd/yyyy</option>
											<option>MM/dd/yyyy HH:mm:ss</option>
											<option>MM-dd-yyyy</option>
											<option>MM-dd-yyyy HH:mm:ss</option>
											<option>MM/dd/yy</option>
											<option>MM-dd-yy</option>
											<option>dd/MM/yyyy</option>
											<option>dd-MM-yyyy</option>
											<option>yyyy-MM-dd'T'HH:mm:ss.SSSXXX</option>
									</select></td>
								</tr>
                                <tr>
									<td>添加原始时间戳:</td>
									<td><input name="add_time_unzip" id="add_time_unzip"
										type="checkbox" /></td>
								</tr>
								<tr>
									<td>添加修改日期到源文件:</td>
									<td><input name="add_date_unzip" id="add_date_unzip"
										type="checkbox" /></td>
								</tr>
								

								<tr>
									<td>如果文件存在:</td>
									<td><select class="easyui-combobox" name="isfile_unzip"
										id="isfile_unzip" data-options='editable:false'
										style="width: 600px">
											<option>跳过</option>
											<option>覆盖</option>
											<option>唯一名称</option>
											<option>失败</option>
											<option>如果大小不一致就覆盖</option>
											<option>如果大小一致就覆盖</option>
											<option>如果压缩的文件大些就覆盖</option>
											<option>如果压缩的文件不小于源文件就覆盖</option>
											<option>如果压缩的文件大小小些就覆盖</option>
											<option>如果压缩文件不大于源文件大小就覆盖</option>
									</select></td>
								</tr>
                               <tr>
									<td>解压缩后:</td>
									<td><select class="easyui-combobox" name="jie_unzip"
										id="jie_unzip" data-options='editable:false'
										style="width: 600px">
											<option>什么都不做</option>
											<option>删除文件</option>
											<option>移动文件</option>
									</select></td>
								</tr>
								
								<tr>
									<td>移动到文件到:</td>
									<td><input class="easyui-textbox" name="shift_unzip"
										id="shift_unzip" style="width: 600px;" />
										<input type="hidden"
										id="shift_unzip_h"> <a
										class="easyui-linkbutton" id='check_up_unzip_a'>浏览</a></td>
								</tr>
                                 <tr>
									<td>新建文件夹:</td>
									<td><input name="new_unzip_yidong" id="new_unzip_yidong" type="checkbox" /></td>
								</tr>
							
								
							</table>
						</fieldset>
					</form>
				</div>

				<div title="高级" style="display: none;">
					<form>
						<fieldset>
							<legend>成功条件</legend>
							<table style="margin-left: 120px;">
								<tr>
									<td>成功条件:</td>
									<td><select class="easyui-combobox"
										name="control_coding_unzip" id="control_coding_unzip"
										data-options='editable:false' style="width: 600px">
											<option>所有工作正常</option>
											<option>至少运行成功一定数量</option>
											<option>错误数少于</option>
									</select></td>
								</tr>
								<tr>
									<td>数量:</td>
									<td><input class="easyui-textbox" name="number_UNZIP"
										id="number_UNZIP" style="width: 600px;" /></td>
								</tr>
							</table>
						</fieldset>
					</form>
				</div>

			</div>
		</div>
		<!-- 中间-->

		<div region="south" border="true" style="padding: 10px;">
			<div style="margin: auto; text-align: center;">
				<a class="easyui-linkbutton" id="UNZIP_ok" style="width: 50px;">确定</a>
				<a class="easyui-linkbutton" id="UNZIP_cancel" style="width: 50px;">取消</a>
			</div>
		</div>
		<!-- 尾部-->
	</div>
</div>