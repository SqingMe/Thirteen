<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<% String path=request.getContextPath(); %>
<div id="FTP" class="easyui-window" title="FTP下载"
	data-options="modal:true,collapsible:false,minimizable:false,
	maximizable:false,closable:true, closed:true"
	style="width: 1200px; height: 600px; padding: 5px;">

	<div class="easyui-layout" fit="true">

		<div region="north">
			<table style="margin-left: 200px;">
				<tr>
					<td>作业项名称</td>
					<td><input class="easyui-textbox" name="school_name_ftp"
						id="school_name_ftp" style="width: 600px;" /></td>
				</tr>
			</table>
		</div>
		<!-- 头部-->

		<div region="center" border="true">
			<div id="ftp" class="easyui-tabs" data-options="fit:true" style="">
				<div title="一般" style="display: none;">
					<form>
						<fieldset>
							<legend>服务器</legend>
							<table style="margin-left: 120px;">
								<tr>
									<td>FTP服务器名称/IP地址:</td>
									<td><input class="easyui-textbox" name="IP_address_ftp"
										id="IP_address_ftp" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>服务器端口</td>
									<td><input class="easyui-textbox" name="server_port_ftp"
										id="server_port_ftp" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>用户名:</td>
									<td><input class="easyui-textbox" name="username_ftp"
										id="username_ftp" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>密码:</td>
									<td><input class="easyui-textbox" name="password_ftp"
										id="password_ftp" type="password" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>代理服务器:</td>
									<td><input class="easyui-textbox" name="agency_server_ftp"
										id="agency_server_ftp" style="width: 600px;" /></td>
								</tr>

								<tr>
									<td>代理服务器端口:</td>
									<td><input class="easyui-textbox"
										name="agency_server_port_ftp" id="agency_server_port_ftp"
										style="width: 600px;" /></td>
								</tr>

								<tr>
									<td>代理服务器用户名:</td>
									<td><input class="easyui-textbox"
										name="agency_username_ftp" id="agency_username_ftp"
										style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>代理服务器密码:</td>
									<td><input class="easyui-textbox"
										name="agency_password_ftp" id="agency_password_ftp"
										type="password" style="width: 600px;" /></td>
								</tr>

							</table>
							<div style="margin: auto; text-align: center">
								<a class="easyui-linkbutton" id='connect_ftp'>测试连接</a>
							</div>

						</fieldset>
					</form>


					<form>
						<fieldset>
							<legend>高级</legend>
							<table style="margin-left: 120px;">
								<tr>
									<td>系统as400?</td>
									<td><input name="binary_system_modle_ftp_binaryAs400"
										id="binary_system_modle_ftp_binaryAs400" type="checkbox" /></td>
								</tr>
								<tr>
									<td>二进制模式?</td>
									<td><input name="binary_system_modle_ftp"
										id="binary_system_modle_ftp" type="checkbox" /></td>
								</tr>
								<tr>
									<td>超时:</td>
									<td><input class="easyui-textbox" name="overtime_ftp"
										id="overtime_ftp" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>使用活动的FTP连接:</td>
									<td><input name="connect_ftp" id="connect_ftp"
										type="checkbox" /></td>
								</tr>

								<tr>
									<td>控制编码:</td>
									<td><select class="easyui-combobox" name="succed_code_ftp"
										id="succed_code_ftp" data-options='editable:false'
										style="width: 600px">
											<option>US-ASCII</option>
											<option>ISO-8859-1</option>
											<option>UTF-8</option>
											<option>UTF-16BE</option>
											<option>UTF-16LE</option>
											<option>UTF-16</option>
									</select></td>
								</tr>
							</table>
						</fieldset>
					</form>
				</div>



				<div title="文件" style="display: none;">
					<form>
						<fieldset>
							<legend>远程</legend>
							<table style="margin-left: 120px;">
								<tr>
									<td>远程目录:</td>
									<td><input class="easyui-textbox" name="catalogue_ftp"
										id="catalogue_ftp" style="width: 600px;" /> <a
										class="easyui-linkbutton" id='check_up_ftp'>检查文件夹</a></td>
								</tr>
								<tr>
									<td>通配符(正则表达式):</td>
									<td><input class="easyui-textbox" name="expression_ftp"
										id="expression_ftp" style="width: 600px;" /></td>
								</tr>

								<tr>
									<td>获取后删除文件:</td>
									<td><input name="delete_ftp" id="delete_ftp"
										type="checkbox" /></td>
								</tr>

								<tr>
									<td>恢复后移动文件:</td>
									<td><input name="recover_ftp" id="recover_ftp"
										type="checkbox" /></td>
								</tr>

								<tr>
									<td>移动到文件夹:</td>
									<td><input class="easyui-textbox" name="shift_ftp"
										id="shift_ftp" style="width: 600px;" /> <a
										class="easyui-linkbutton" id='check_up_ftp'>检查文件夹</a></td>
								</tr>

								<tr>
									<td>新建文件夹:</td>
									<td><input name="new_ftp" id="new_ftp" type="checkbox" /></td>
								</tr>

							</table>
						</fieldset>
					</form>


					<form>
						<fieldset>
							<legend>本地</legend>
							<table style="margin-left: 120px;">
								<tr>
									<td>目标目录:</td>
									<td><input class="easyui-textbox" name="goal_ftp"
										id="goal_ftp" style="width: 600px;" /> <input type="hidden"
										id="goal_ftp_h"> <a class="easyui-linkbutton"
										id='browse_ftp'>浏览</a></td>
								</tr>

								<tr>
									<td>在文件名中包含日期:</td>
									<td><input name="date_ftp" id="date_ftp" type="checkbox" /></td>
								</tr>

								<tr>
									<td>在文件名中包含时间:</td>
									<td><input name="time_ftp" id="time_ftp" type="checkbox" /></td>
								</tr>

								<tr>
									<td>指定日期时间格式:</td>
									<td><input name="time_form_ftp" id="time_form_ftp"
										type="checkbox" /></td>
								</tr>

								<tr>
									<td>日期时间格式:</td>
									<td><select class="easyui-combobox" name="date_from_ftp"
										id="date_from_ftp" data-options='editable:false'
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
									<td>在扩展名前添加日期:</td>
									<td><input name="extension_date_ftp"
										id="extension_date_ftp" type="checkbox" /></td>
								</tr>

								<tr>
									<td>不能覆盖文件:</td>
									<td><input name="cover_ftp" id="cover_ftp" type="checkbox" /></td>
								</tr>

								<tr>
									<td>如果文件已存在:</td>
									<td><select class="easyui-combobox" name="isfile_ftp"
										id="isfile_ftp" data-options='editable:false'
										style="width: 600px">
											<option>跳过</option>
											<option>给本地文件指定唯一名称</option>
											<option>失败</option>
									</select></td>
								</tr>

								<tr>
									<td>在结果中添加文件名:</td>
									<td><input name="file_result_ftp" id="file_result_ftp"
										type="checkbox" /></td>
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
										name="control_coding_tfp" id="control_coding_tfp"
										data-options='editable:false' style="width: 600px">
											<option>一切工作正常</option>
											<option>获取文件数不小于</option>
											<option>错误数小于</option>
									</select></td>
								</tr>
								<tr>
									<td>数量:</td>
									<td><input class="easyui-textbox" name="number_ftp"
										id="number_ftp" style="width: 600px;" /></td>
								</tr>
							</table>
						</fieldset>
					</form>
				</div>

				<div title="Socks代理" style="display: none;">
					<form>
						<fieldset>
							<legend>代理</legend>

							<table style="margin-left: 120px;">
								<tr>
									<td>主机:</td>
									<td><input class="easyui-textbox" name="main_host_ftp"
										id="main_host_ftp" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>端口:</td>
									<td><input class="easyui-textbox" name="main_port_ftp"
										id="main_port_ftp" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>用户名:</td>
									<td><input class="easyui-textbox" name="main_username_ftp"
										id="main_username_ftp" style="width: 600px;" /></td>
								</tr>
								<tr>
									<td>密码:</td>
									<td><input class="easyui-textbox" name="main_password_ftp"
										id="main_password_ftp" type="password" style="width: 600px;" /></td>
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
				<a class="easyui-linkbutton" id="ftp_ok" style="width: 50px;">确定</a>
				<a class="easyui-linkbutton" id="ftp_cancel" style="width: 50px;">取消</a>
			</div>
		</div>
		<!-- 尾部-->
	</div>
</div>