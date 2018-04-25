Nasoft.TopButton.PersonCenter = {
	init : function() {
		$("#user_info").find('a').click(function(){
			$("#user_info").window("close");
		});
		//修改密码
		function validate() {
			var $txtOldPass = $("#txtOldPass");// 原始密码
			var $newpass = $('#txtNewPass');// 新密码
			var $rePass = $('#txtRePass');// 确定密码
			var oldPassNull = '<span style="color:#fff">旧密码不能为空！</span>';
			var oldEqNew = '<span style="color:#fff">新旧密码一样！</span>';
			var passNull = '<span style="color:#fff">新密码不能为空！</span>';
			var passLen = '<span style="color:#fff">密码长度必须为6-16位数字或字母！</span>';
			var passEq = '<span style="color:#fff">两次密码不一致！</span>';
			function core() {
				if ($txtOldPass.val().trim() === '') {
					$newpass.tooltip("hide");
					$txtOldPass.tooltip("show");
					$txtOldPass.tooltip("update", oldPassNull);
					$('#update_password_ok').linkbutton("disable");
					return ;
				} if ($newpass.val().trim() === $txtOldPass.val().trim()) {
					$txtOldPass.tooltip("hide");
					$newpass.tooltip("show");
					$newpass.tooltip("update", oldEqNew);
					$('#update_password_ok').linkbutton("disable");
					return ;
				} if ($rePass.val().trim() !== $newpass.val().trim()) {
					$txtOldPass.tooltip("hide");
					$newpass.tooltip("show");
					$newpass.tooltip("update", passEq);
					$('#update_password_ok').linkbutton("disable");
					return ;
				} if ($newpass.val().trim() === ''
						|| !$.regular($newpass.val().trim(), /^[\d_*a-zA-Z]{6,16}$/)) {
					$txtOldPass.tooltip("hide");
					$newpass.tooltip("show");
					$newpass.tooltip("update", passLen);
					$('#update_password_ok').linkbutton("disable");
					return ;
				} 
					$txtOldPass.tooltip("hide");
					$newpass.tooltip("hide");
					$('#update_password_ok').linkbutton("enable");
				
			}
			$txtOldPass.keyup(core);

			$newpass.keyup(core);

			$rePass.keyup(core);

			bindtooltip.call($txtOldPass);
			bindtooltip.call($newpass);
		}
		function bindtooltip() {
			this.tooltip({
				position : 'right',
				showEvent : "",
				hideEvent : "",
				content : '<span style="color:#fff"></span>',
				onShow : function(e) {
					$(this).tooltip('tip').css({
						backgroundColor : '#666',
						borderColor : '#666'
					});
				}
			});
		}
		Nasoft.Ajax.loadDoc($.getRootPath()+"/views/topo/dialogHtml/updatepassword.html","body",function(doc){
			validate();
			$('#update_password_win').window({
				title : '修改密码',
				maximizable : false,
				minimizable : false,
				collapsible : false,
				width : 300,
				modal : true,
				shadow : true,
				closed : true,
				height : 190,
				resizable : false,
				onBeforeOpen : function() {
					$("#txtOldPass").focus();
					$('#update_password_ok').linkbutton("disable");
				},
				onBeforeClose : function() {
					$("#txtOldPass").val('');
					$("#txtOldPass").tooltip("hide")
					$('#txtNewPass').val('');
					$("#txtNewPass").tooltip("hide")
					$('#txtRePass').val('');
					$("#txtRePass").tooltip("hide")
				}
			});
			
			$('#update_password_ok').click(function() {
				var $txtOldPass = $("#txtOldPass");// 原始密码
				var $newpass = $('#txtNewPass');// 新密码
				var $rePass = $('#txtRePass');// 确定密码
				function update(){
					$.ajax({
						url : $.getRootPath() + "/UserInfoCtrl/updateUserInfo.do",
						type : "POST",
						dateType : "text",
						data : {
							passWord : $newpass.val()
						},
						success : function(data) {
							if(Nasoft.Ajax.dataValidation(data)){
								$.alertI("修改成功！重新登录。。。");
								window.location.mypath = "logout";
								window.location.href = $.getRootPath() + '/Login/logout.do';
							}
						}
					});
				}
				$.ajax({
					  url: $.getRootPath() + "/UserInfoCtrl/checkPassword.do",
					  data : {password : $txtOldPass.val()},
					  type : "POST",
					  success : function(data){
						  if(Nasoft.Ajax.dataValidation(data)){
							  update();
						  }
					  }
					 });
			})
			$('#update_password_cancel').click(function() {
				$('#update_password_win').window('close');
			})
		});
		var personCenterMenu ='<div id="personCenterMenu"  style="width:150px;background-color: #ffffff">'+
		'<div id="_update_password">修改密码</div>'+
		'<div id="_user_info">个人信息</div>'+
		'</div>'
		$('body').append($(personCenterMenu));
		var menubutton = $('#personCenter').menubutton({    
		    iconCls: 'icon-small-user', 
		    menu: '#personCenterMenu'   
		}); 
		$(menubutton.menubutton('options').menu).menu({
		    onClick: function (item) {
            	var fns=Nasoft.TopButton.PersonCenter.fns;
            	 if(typeof fns[item.id]=='function'){
	            	   fns[item.id](); 
	              }
	         }  
		})
	
	},
	// 初始化
	fns : {
		_update_password : function(){
			$('#update_password_win').window("center");
			$('#update_password_win').window('open');
		},
		_user_info : function(){
			$("#user_info").window("open");
		}
	},
};


