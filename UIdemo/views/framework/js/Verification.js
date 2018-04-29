$.extend($.fn.datagrid.methods,{
	// 选中的节点上移
	selectmoveUp : function(jq,selected){
		return jq.each(function(){
			var index = $(this).datagrid("getRowIndex",selected);// 获取选中行的索引
			$(this).datagrid("endEdit",index);
			if(index === 0){
				alert("已经是第一行！");
				return;
			}
			var row = $.extend(true,{},selected);// 将被选中的行数据复制一份
			$(this).datagrid("deleteRow",index);//　删除选中的行
			$(this).datagrid("insertRow",{index:index-1,row:row});// 将此行向上移动一行
			$(this).datagrid("selectRow",index-1);// 选中移动后的行
		});
	},
	// 选中的节点下移
	selectmoveDown : function(jq,selected){
		return jq.each(function(){
			var index = $(this).datagrid("getRowIndex",selected);// 获取选中行的索引
			$(this).datagrid("endEdit",index);
			var endindex = $(this).datagrid("getRows").length-1;
			console.log(endindex)
			if(index === endindex){
				alert("已经是最后一行！");
				return;
			}
			var row = $.extend(true,{},selected);// 将被选中的行数据复制一份
			$(this).datagrid("deleteRow",index);//　删除选中的行
			$(this).datagrid("insertRow",{index:index+1,row:row});// 将此行向上移动一行
			$(this).datagrid("selectRow",index+1);// 选中移动后的行
		});
    },
    // 结束索引行的编辑
	endEditAll : function(jq){
			var grid = jq;
			var rows = grid.datagrid("getRows");
			$.each(rows,function(i,r){
				grid.datagrid("endEdit",i);
			});
			return grid.datagrid("getRows");
	},
	deleteSelections : function(jq){
		return jq.each(function(){
			var grid = $(this);
			var rows = grid.datagrid("getSelections");
			var len = rows.length;
			for (var int = 0; int < len; int++) {
				grid.datagrid('deleteRow',
						grid.datagrid('getRowIndex',rows[int]));
				
			}
		});
	}
 }); 

/**
 * linkbutton方法扩展 解决linkbutton无法禁用的问题
 */
		$.extend(
				$.fn.linkbutton.methods,
				{
					/**
					 * 激活选项（覆盖重写）
					 * 
					 * @param {Object}
					 *            jq
					 */
					enable : function(jq) {
						return jq
								.each(function() {
									var state = $.data(this, 'linkbutton');
									if ($(this).hasClass('l-btn-disabled')) {
										var itemData = state._eventsStore;
										// 恢复超链接
										if (itemData.href) {
											$(this).attr("href", itemData.href);
										}
										// 回复点击事件
										if (itemData.onclicks) {
											for (var j = 0; j < itemData.onclicks.length; j++) {
												$(this).bind('click',
														itemData.onclicks[j]);
											}
										}
										// 设置target为null，清空存储的事件处理程序
										itemData.target = null;
										itemData.onclicks = [];
										$(this).removeClass('l-btn-disabled');
									}
								});
					},
					/**
					 * 禁用选项（覆盖重写）
					 * 
					 * @param {Object}
					 *            jq
					 */
					disable : function(jq) {
						return jq
								.each(function() {
									var state = $.data(this, 'linkbutton');
									if (!state._eventsStore)
										state._eventsStore = {};
									if (!$(this).hasClass('l-btn-disabled')) {
										var eventsStore = {};
										eventsStore.target = this;
										eventsStore.onclicks = [];
										// 处理超链接
										var strHref = $(this).attr("href");
										if (strHref) {
											eventsStore.href = strHref;
											$(this).attr("href","javascript:void(0)");
										}
										// 处理直接耦合绑定到onclick属性上的事件
										var onclickStr = $(this).attr("onclick");
										if (onclickStr && onclickStr != "") {
											eventsStore.onclicks[eventsStore.onclicks.length] = new Function(
													onclickStr);
											$(this).attr("onclick", "");
										}
										// 处理使用jquery绑定的事件
										var eventDatas = $(this).data("events")
												|| $._data(this, 'events');
										if (eventDatas["click"]) {
											var eventData = eventDatas["click"];
											for (var i = 0; i < eventData.length; i++) {
												if (eventData[i].namespace != "menu") {
													eventsStore.onclicks[eventsStore.onclicks.length] = eventData[i]["handler"];
													$(this).unbind('click',eventData[i]["handler"]);
													i--;
												}
											}
										}
										state._eventsStore = eventsStore;
										$(this).addClass('l-btn-disabled');
									}
								});
					}
				});






$.extend($.fn.validatebox.defaults.rules, {  
    /*必须和某个字段相等*/
    equalTo: {
        validator:function(value,param){
            return $(param[0]).val() == value;
        },
        message:'两次密码不一致'
    },
  //金额格式,格式定义为带小数的正数，小数点后最多三位
    money:{
    	 validator:function(value){
             return $.regular(value,/^[0-9]+[\.][0-9]{0,3}$/);
         },
         message:'输入格式有误'
    },
  //英文字母和数字和下划线组成 
    numletter_:{
    	validator:function(value){
            return $.regular(value,/^[0-9a-zA-Z\_]+$/);
        },
        message:'非法字符'
    },
  //英文字母和数字
    numletter:{
    	validator:function(value){
            return $.regular(value,/^[0-9a-zA-Z]+$/);
        },
        message:'只能输入数字和字母'
    },
  //汉字、字母、数字组成 
    numletterchina:{
    	validator:function(value){
            return $.regular(value,/^[0-9a-zA-Z\u4e00-\u9fa5]+$/);
        },
        message:'只能输入汉字,字母,数字'
    },
    email:{
    	validator:function(value){
            return $.regular(value,/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
        },
        message:'邮箱格式有误'
    },
    tel:{
    	validator:function(value){
            return $.regular(value,/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/);
        },
        message:'固话格式有误'
    },
    mobile:{
    	validator:function(value){
            return $.regular(value,/^(13[0-9]|15[0-9]|18[0-9])([0-9]{8})$/);
        },
        message:'手机号码有误'
    },
    //浮点
    decimal:{
    	validator:function(value){
            return $.regular(value,/^[0-9]+([.][0-9]+)?$/);
        },
        message:'请输入浮点数'
    },
    //文件地址
    filePath:{
    	validator:function(value){
            return $.regular(value,/^[a-zA-Z]:\\\\(([a-zA-Z](.ktr|.KTR))||([a-zA-Z]\\([a-zA-Z](.ktr|.KTR))))*$/);
        },
        message:'文件地址不正确'
    },
    date:{
    	validator:function(value){
            return $.regular(value, /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        },
        message:'时间格式不正确'
    },
    int:{
    	validator:function(value){
            return $.regular(value,/^[0-9]*[1-9][0-9]*$/);
        },
        message:'请输入整数'
    },
    pInt:{
    	validator:function(value){
            return $.regular(value,/^\\d+$/);
        },
        message:'请输入正整数'
    },
    nInt:{
    	validator:function(value){
            return $.regular(value,/^((-\\d+)|(0+))$/);
        },
        message:'请输入负整数'
    },
    china:{
    	validator:function(value){
            return $.regular(value, /^[\u0391-\uFFE5]+$/);
        },
        message:'请输入中文'
    }
           
});
$.extend({
	msg:function(m){
		$.messager.show({
			title:'系统提示!',
			msg:m,
			timeout:3000,
			showType:'slide'
		});
	},
	// 警告提示
	alertW : function(m){
		$.messager.alert('警告',m,'warning'); 	
	},
	// 信息提示
	alertI : function(m){
		$.messager.alert('信息',m,'info'); 	
	},
	// 疑问提示
	alertQ : function(m){
		$.messager.alert('疑问',m,'question'); 	
	},
	// 错误提示
	alertE : function(m){
		$.messager.alert('错误',m,'error'); 	
	},
	getRootPath:function(){
		   //获取当前网址，如： http://localhost:8888/NasoftJob/share/meun.jsp
	    var curWwwPath=window.document.location.href;
	    //获取主机地址之后的目录
	    var pathName=window.document.location.pathname;
	    var pos=curWwwPath.indexOf(pathName);
	    //获取主机地址，如： http://localhost:8888
	    var localhostPath=curWwwPath.substring(0,pos);
	    //获取带"/"的项目名，如：/NasoftJob
	    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	    return(localhostPath+projectName);
	},
	getCookie:function(){//
		var myCookie={}, cookie=window.document.cookie;//获取document的cookie
		if(cookie.indexOf(';')!==-1){//是否存在多个属性
		   var cookieArray=cookie.split(';')//以;拆分cookie
		   for(var i=0,len=cookieArray.length;i<len;i++){//将cookie组织成js可读的对象形式
		     var c=cookieArray[i].trim().split('=')
		    myCookie[c[0]]=c[1];
		   }
		}else{
		  var c=cookie.trim().split('=');
		   myCookie[c[0]]=c[1];
		}
		return myCookie;
	},
   createId:function(){//依赖当前时间生成随机码
	   var arrs = new Date().getTime().toString(36).split('');
	   var j = parseInt(Math.random() * arrs.length,10);
	    var thisId='';
	    var $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefhgijklmnopqrstuvwxyz123456789';  
		var today = new Date(); 
		 thisId+= $chars.charAt(Math.floor(Math.random() * $chars.length));//随机码
		 for(var i=0;arrs.length>i;i++){
		     if(i == j){
		    	 thisId +='_'+arrs[i];
		     }else{
		    	 thisId +=arrs[i]
		     }
		   }
		 thisId+= $chars.charAt(Math.floor(Math.random() * $chars.length));//随意码
	   return thisId;
   },
  //将序列化的"key=value&key=value"形式的字符串转换成"{key:value,key:value}"格式的json对象
     serialize2Obj:function(content){
    	var value='';
    	 var key='';
    	var array='{';
    	 for(var i=0;i<content.length;i++){
    		 var c= content[i]; 
             switch(c){
             case '=':
            	 array+='"'+key+'":';
            	 key='';
            	 value='';
            	 c='';
            	 break;
             case '&':
            	 array+='"'+value+'",';
            	 key='';
            	 value='';
            	 c='';
            	 break;
             }
             key+=c;
             value+=c;
    	 }
    	 array=array+'"'+value+'"}';
    	 return $.parseJSON(array);
    },
    fullscreen:function(docElm) {
   	 
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
        else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
   },
	  StringToUnicode:function (str) {
		  if(''!==str){
			
			  var temp,
			  i = 0,
			  r = '',
			  len = str.length;
			   
			  for (; i < len; i++) {
			  temp = str.charCodeAt(i).toString(16);
			   
			  while ( temp.length < 4 )
			  temp = '0' + temp;
			   
			  r += '\\u' + temp;
			  };
			   
			  return r;
			 
			
		  }else{
			  return '';
		  }
			  } ,
			  InternationalToString:function(str){
				  return unescape(str.replace(/&#x([0-9a-fA-F]{4});/gm, '%u$1'));
			  },
			  StringToInternational:function () {
				  if (arguments.length===0) {
	               throw new Error('未定义参数!')
				}
				  var str=arguments[0];
				  var sign=arguments[1]?arguments[1]:null;
				  if(''!==str && !sign){
					  var temp,
					  i = 0,
					  r = '',
					  len = str.length;
					   
					  for (; i < len; i++) {
					  temp = str.charCodeAt(i).toString(16);
					   
					  while ( temp.length < 4 )
					  temp = '0' + temp;
					   
					  r += '&#x' + temp+';';
					  };					   
					  return r;	
				  }else if (''!==str && sign) {
					  var temp, i = 0,r = '',
					  len = str.length;			  
					  for (; i < len; i++) {
						  if(str[i]===sign){
							  temp = str.charCodeAt(i).toString(16);							  
							  while ( temp.length < 4 )
								  temp = '0' + temp;
							  r += '&#x' + temp+';';
						  }else{
							  r+=str[i];							  
						  }	
						  }
						  
					  return r;						  
				}else{
					  return '';
				  }
					  },
			 isChainese:function(val){
				
					 return $.regular(val,/[\u4E00-\u9FFF]+/g);
				},
				/**
				 * @param str
				 * @returns 
				 */
			chaineseToInternational:function(str){
				var newStr=[];
					if(str!==''){
						for (var i = 0; i < str.length; i++) {
							if($.isChainese(str[i])){
								newStr[i]=$.StringToInternational(str[i]);//将汉字转成&#x格式
							}else{
							newStr[i]=str[i];
							}
						}
					}
					return newStr.join('');
				},
				/**
				 * @param str
				 * @returns 
				 */
				urlToInternational:function(str){
					var newStr=[];
					if(!!!str){
						for (var i = 0; i < str.length; i++) {
							if($.regular(str[i],/^(\/)$/)){
								newStr[i]=$.StringToInternational(str[i]);//将'/'转成&#x格式
							}else if($.regular(str[i],/^(\:)$/)){
								newStr[i]=$.StringToInternational(str[i]);//将'/'转成&#x格式
							}else{
								newStr[i]=str[i];							
							}
						}
					}
					return newStr.join('');			
				},
				/**
				 * @param value,reg
				 * @returns 
				 */
				regular:function(value,reg){
					 if (reg.test(value)) {
					        return true;
					    }
					    else {
					        return false;
					    }
				},
				/**
				 * 批量禁用按钮
				 * @author rsq0113
				 */
				buttonDisable:function(){
					if(arguments.length>0){
						var argument=typeof arguments[0]==='String'?[arguments[0]]:arguments[0];
						for (var i = 0; i < argument.length; i++) {
							$('#'+argument[i]).linkbutton('disable');							
						}
					}
				},
				/**
				 * 批量释放按钮
				 * @author rsq0113
				 */
				buttonEnable:function(){
					if(arguments.length>0){
						var argument=typeof arguments[0]==='String'?[arguments[0]]:arguments[0];
						for (var i = 0; i < argument.length; i++) {
							$('#'+argument[i]).linkbutton('enable');							
						}
					}
				},
				codingFilter:function(func,obj){
					// 判断参数的合法性;
					  if(arguments.length==0 || arguments.length>2 ){
						    throw new Error('Too many or  too little  parameters');
						  }else if(arguments[0]!=='en'&& arguments[0]!=='de'){
							throw new Error(arguments[0]+'is not a parameter');
						  }
					 var needed = /(?:!|"|#|\$|%|&|'|\(|\)|\*|\+|,|\/|:|;|<|=|>|\?|@|\[|\\|\]|\^|`|\{|\}|~|[\u4E00-\u9FFF]+)/;
					 var javaCode = /(?:<!\[CDATA\[).*|\r|\n\r|\n(\]\]>)$/;
					 var neededDe = /&#x/;
					  if(func === "en"){
						  // 将对象中的特殊字符串格式化;
						return  JSON.stringify(obj,function(k,v){
							// 字符串中含有特殊字符并且不是javaCode,将字符串中的特殊字符进行格式化
							  if(typeof v === "string" && !$.regular(v,javaCode) && $.regular(v,needed) ){
								  v = en(v);
							  }
							  return v;
						  },1);
					  }else{
						  if(typeof obj === "object" && obj !== null){
							  obj = JSON.stringify(obj);
						  }
						return  JSON.parse(obj,function(k,v){
							  if(typeof v === "string" && $.regular(v,neededDe)){
								  v = $.InternationalToString(v);
							  }
							  return v;
						  });
					  }
					  function en(str){
						  var len=str.length,newStr='';
						  for(var i=0;i<len;i++){
						    if($.regular(str[i],needed)){
						     newStr += $.StringToInternational(str[i]);
						    }else{
						      newStr +=str[i];
						    }
						  }
						  return newStr;
					  }
					  function de(){
						  
					  }
				},
				/**
				 * 
				 */
				 codeFilter:function(){
					  if(arguments.length==0 || arguments.length>2 ){
					    throw new Error('Too many or  too little  parameters');
					  }else if(arguments[0]!=='en'&& arguments[0]!=='de'){
						throw new Error(arguments[0]+'is not a parameter');
					  }
					 var d=arguments[0];
					function query(q){
					if(!$.isArray(q) && typeof q!=='string'){
					  for(var key in q){
					  q[key]=query(q[key]);
					  }
					}else if($.isArray(q)){
					   for(var i=0;i<q.length;i++){
					    q[i]=query(q[i]);
					   }
					}else if(typeof q==='string'){
						var is;
						if(d==='en'){
				    //汉字和(特殊字符除了-_.) 
			                is=$.regular(q,/(?:!|"|#|\$|%|&|'|\(|\)|\*|\+|,|\/|:|;|<|=|>|\?|@|\[|\\|\]|\^|`|\{|\}|~|[\u4E00-\u9FFF]+)/);
			                is = $.regular(q,/(?:<!\[CDATA\[).*|\r|\n\r|\n(\]\]>)$/)? false : is;
						}else if(d==='de'){
							is=$.regular(q,/&#x/);
						}
					   if(is) { q=tt(q);
					          }
					}
					     return q;
					}
					function tt(str){
						if(d==='en'){
					  var len=str.length,newStr='';
					  for(var i=0;i<len;i++){
					    if($.regular(str[i],/(?:!|"|#|\$|%|&|'|\(|\)|\*|\+|,|\/|:|;|<|=|>|\?|@|\[|\\|\]|\^|`|\{|\}|~|[\u4E00-\u9FFF]+)/)){
					     newStr += $.StringToInternational(str[i]);
					    }else{
					      newStr +=str[i];
					    }
					  }
					  return newStr;
						}else if(d==='de'){
							return $.InternationalToString(str);
						}
					}
					  return  query(arguments[1]);
					  },
					  fianlEle : function (obj){
					   for(var key in obj){
					    a(obj,key);
					  }
					   function a(obj,key){
					    //对象已有的属性添加特性描述
					  Object.defineProperty(obj,key,{
					      configurable:false,
					      enumerable:true,
					      writable:false
					  });
					  }
					   return obj;
					  },
					  watchScene:function(scene){
						  new Vue({
							  data : scene,
							  watch : {
								  childs : function(n,o){
										  scene.updateProject(scene.tab.project());
								  }
							  }
						  })
					  }
});
$.ajaxSetup({   // ajax 方法的公共参数列表设置
	beforeSend : function(){
			console.log("ajax开始加载。。。")
			 $("#top-load").show();
	},
    error: function (XMLHttpRequest, textStatus, errorThrown){  
           if(XMLHttpRequest.status==403){  
               $.messager.alert('提示', '限制访问此资源或进行此操作','info');  
               return false;  
           }  
       },    
    complete:function(XMLHttpRequest,textStatus){   
    	console.log("ajax 结束加载。。。")
		 $("#top-load").hide();
        var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头,sessionstatus，   
           if(sessionstatus==='timeout'){    
        	   if(!window.$messager){
        		   window.$messager = true;
                   //如果超时就处理 ，指定要跳转的页面    
          	   $.messager.confirm('系统提示！', '用户信息过期,是否重新登录？', function(r){
          			if (r){
          				  window.location.replace($.getRootPath()+"/Login/tologin.do");
          			}else{
          				window.$messager = void(0);
          			}
          		});
        	   }
           }else if(sessionstatus==='illegal'){
        	   window.location.replace($.getRootPath()+"/Login/tologin.do");
           }  
    }     
});
