
	Nasoft.Window.fns.connection={
			node : {},
			docinit:function(){
				Nasoft.Ajax.loadDoc($.getRootPath()+"/views/topo/transformation/connection/ordinary.html","#in_ordinary");
			},
			init:function(){
				var that = this;
				this.docinit();
				this.typeData =  $.ajax({
					 url:$.getRootPath()+"/views/topo/transformation/connection/conType.json",
					 type:'get',
					 async: false,
					 dataType:'json'}).responseJSON;
				// 数据连接测试
				$('#db_test').unbind('click').click(function(e){
				     e.preventDefault();
					 var name=$('#name').textbox('getValue');// 获取连接名称
					 var form=that.chooseForm().form;// 获取数据库配置信息
					 form.name = name;
					 form.projectName = Nasoft.Topo.getSelectedTab().project().file_path
					 $.ajax({
						 url:$.getRootPath()+"/DblinkCtrl/dbLinkTest.do",
						 data:form,
						 type:'post',
						 dataType:'json',
						 error :function(error){
							 $.messager.alert("连接测试","连接失败"+error.responseText, "error");
							},
						 success:function(data){
							 if(data){
								 var info='<table><tr><td>成功连接数据库'+data.name+
								 '</td></tr><tr><td>主机名:'+data.server+
								 '</td></tr><tr><td>端口号:'+data.port+
								 '</td></tr><tr><td>数据库名:'+data.database+'</td></tr></table>';
								 $.messager.alert("连接测试",info, "info");
								 
							 }else{
								 $.messager.alert("连接测试","连接失败", "error");
							 }
						 }
					 });	
			});
		   // 创建连接
			$('#new_con').unbind('click').click(function(e){
				e.preventDefault();
				    //获取工程树中数据库连接节点
					var selected = $('#project').tree('find',Nasoft.Topo.getSelectedTab().panel('options').id+'_database');
					dbinfo=Nasoft.Window.fns.connection.chooseForm().form;//获取连接配置
					dbinfo.name = $('#name').textbox('getValue');
					if(that.node){//存在同名连接
						    	that.node.dbinfo = dbinfo;
						    	Nasoft.Window.fns.connection.updateDblink(that.node);//在"DB连接"下添加子节点
					}else{
						//添加子节点
						child=[{
							id: $.createId(),
							clickSign:"connection",
							text: dbinfo.name,
							"iconCls":"icon-connection",
							dbinfo:dbinfo 
						}];	
						Nasoft.Window.fns.connection.appendDblink(selected,child);//在"DB连接"下添加子节点
					}	
			});	
				$('#dblink_win').window({
				    onBeforeClose:function(){
					$('#name').textbox('reset');//清空连接名
					$('#ordinary_east').find('.easyui-textbox').textbox('reset');				   
				}
				});
			},
			//左侧列表选项改变时调用,用来右侧窗体显示效果
			 setInfo:function(node){
				 this.node = node
				 this.dbinfo = this.node?this.node.dbinfo:null;
				$('#in_ordinary').show();//显示一般设置,同时隐藏其他设置(只是隐藏不是初始化)
				$('#dblink_win').window("open");
				var that = this;
				var type=this.dbinfo?this.dbinfo.type:'DB2';//如果有配置信息,则val被赋值为配置的数据连接类型,否则默认为'DB2'
				$('#con_type').datalist({ //初始化连接设置数据列表
					data : that.typeData,
					width:250,
					height:200,
					idField:'text',
					onLoadSuccess : function(){
						$(this).datalist('selectRecord',type);
					},
					onSelect : function(i,r){//被选中行之后执行
						that.dbConfigDeserialize(r.text);//将当前选中行的text,和config传参
					}
				});
			},
			//反序列化数据连接配置信息
			dbConfigDeserialize:function(id){
				var dbinfo = this.dbinfo;
				var that = this;
				var form = "#"+id;
				$(form).show().siblings().hide();
				try{	
					if(!dbinfo){
						return;
					}
					$('#name').textbox('setValue',dbinfo.name?dbinfo.name:'');
					for(var key in dbinfo){
						if(key !== 'name'){
							var ele = $(form).find("."+key);
							ele.length > 0 && ele.textbox('setValue',decodeURIComponent(that.node.dbinfo[key]));
						}
					}
				}catch (e) {
					console.log(e)
				}
			},
			//筛选出当前显示的form表单,返回标准序列化和序列化数组
			 chooseForm:function(){
				var form=null;
				var formArray=null;
				$('#ordinary_east').children().each(function(i,o){
					 if($(o).css('display')==='block'){
						 var serialize = decodeURIComponent($(o).serialize(),true);
						 form=$.serialize2Obj(serialize);
						 formArray=$(o).serializeArray();
					 }
				});
				return {"form":form,"formArray":formArray};
			},
			//在DB连接节点下添加子连接节点
			 appendDblink:function(obj,child){			
					$('#project').tree('append', {
						parent: obj.target,
						data: child
					});
					this.node = null;
					$('#dblink_win').window('close');
			},
			updateDblink:function(node){//当有同名的connection被创建时修改之前的connection信息
				$('#project').tree('update', {
					target: node.target,
					text:$('#name').textbox('getValue'),
					dbinfo:node.dbinfo 
				});
				this.node = null;
				$('#dblink_win').window('close');
			}
			
	}

