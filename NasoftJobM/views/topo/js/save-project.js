//序列化scene数据为固定格式的json
function saveProject() {
		var isCreate = arguments[0]?true:false;
		Nasoft.Topo.tidy();
		var tab = Nasoft.Topo.getSelectedTab(), connection, scene = null, project = null,root;
		scene = tab.scene;
		project = tab.project();
		root = scene.getCore(project.project_type);
		$.ajax({
			url : $.getRootPath() + '/TopoCtrl/saveProjectJson.do',
			type : "post",
			data : {
				"url" : project.file_path,
				"projectType":project.project_type,
				"root" : $.codingFilter('en', root)
			},
			success : function(data) {
				!isCreate && $.messager.show({
					title : '系统提示',
					msg : '工程  ' + project.project_name + ' 保存成功!',
					timeout : 5000,
					showType : 'slide'
				});
				tab.onSave.call(tab);
			}
		});
}
Nasoft.GetProjectData = {
	// 获取列表的数据
	getFields : function() {
		var fields = {};
		if (typeof arguments[0] === 'string') {
			var data = $(arguments[0]).datagrid('getData');
			console.log(data);
			fields.field = [];
			$.each(data.rows, function(i, o) {
				var ok;
				for ( var key in o) {
					console.log(o[key])
					var k;
					k = o[key] !== null && o[key] !== '';// 等于null等于'',都返回false
					if (k) {
						ok = true;
					}
				}
				ok && fields.field.push(o)// 有值就存入
			});
			if (fields.field.length === 1) {// 只有一行数据,返回一个object
				fields.field = fields.field[0];
				return fields;
			} else if (fields.field.length === 0) {// 没有数据行,返回一个空字符串
				return '';
			} else if (fields.field.length > 1){// 有多行数据返回一个array
				return fields;				
			}
		}
		return '';
	},

	// 从工程树中获取数据库连接的信息
	getConnectins : function() {
			var root, title, node, nodeChild, connectionData, connections;
	        var tab = Nasoft.Topo.getSelectedTab();
	        var project = tab.project();
	        var dbNodes = project.children[0].children;
	        if(!dbNodes){
	        	return [];
	        }
			connectionData = dbNodes;
			connections = [];
			connectionData
					&& $.each(connectionData,function(i, o) {
										var connection = {};
										var dbinfoJson = o.dbinfo;
										connection.name = o.text;
										connection.server = dbinfoJson.server;
										connection.type = dbinfoJson.type;
										connection.access = "Native";
										connection.database = dbinfoJson.database;
										connection.port = dbinfoJson.port;
										connection.username = dbinfoJson.username;
										if (!!dbinfoJson.password) {
											// 链接密码后台加密返回
											$.ajax({
														url : $.getRootPath()
																+ '/TopoCtrl/conEncrypt.do',
														data : {
															password : dbinfoJson.password
														},
														async : false,
														type : 'POST',
														dataType : 'json',
														success : function(data) {
															connection.password = data.password;
														}
													})
										} else {
											// 链接密码加密
											connection.password = 'Encrypted ';
										}
										connection.data_tablespace = dbinfoJson.data_tablespace ? dbinfoJson.data_tablespace
												: '';
										connection.index_tablespace = dbinfoJson.index_tablespace ? dbinfoJson.index_tablespace
												: '';
										connections.push(connection);
									});
			return connections;
	},
	// 获取当前点击的db连接的相关数据
	getConnection : function(obj) {
		var connection = {};
		var dbinfoJson = obj.dbinfo;
		connection.name = obj.text;
		connection.server = dbinfoJson.hostName;
		connection.type = dbinfoJson.dbType;
		connection.access = "Native";
		connection.database = dbinfoJson.dbName;
		connection.port = dbinfoJson.port;
		connection.username = dbinfoJson.userName;
		if (!!dbinfoJson.password) {
			$.ajax({
				url : $.getRootPath() + '/TopoCtrl/conEncrypt.do',
				data : {
					password : dbinfoJson.password
				},
				async : false,
				type : 'POST',
				dataType : 'json',
				success : function(data) {
					connection.password = data.password;
				}
			})
		} else {
			connection.password = 'Encrypted ';
		}
		connection.data_tablespace = dbinfoJson.data_tablespace ? dbinfoJson.data_tablespace
				: '';
		connection.index_tablespace = dbinfoJson.index_tablespace ? dbinfoJson.index_tablespace
				: '';
		return connection;
	}
}