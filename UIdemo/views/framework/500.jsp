<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true"%>
<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory"%>
<%	
	//设置返回码200，避免浏览器自带的错误页面
	response.setStatus(200);
	//记录日志
	Logger logger = LoggerFactory.getLogger("500.jsp");
	logger.error(exception.getMessage(), exception);
%>

<!DOCTYPE html>
<html>
<head>
<title>500 - 系统内部错误</title>
<STYLE type=text/css>
body {
	margin: 0 auto;
	background: #FFF;
	text-align: center;
}

a:link {
	text-decoration: none;
	color: #03F;
}

a:visited {
	text-decoration: none;
	color: #F60;
}

a:hover {
	text-decoration: underline;
	color: #F60;
}

a:active {
	text-decoration: none;
	colorwhite;
}

.main {
	margin: 0 auto;
}

.con {
	margin: 0 auto;
	width: 540px;
}

.errorPic {
	margin: 0 auto;
}

.errorNotes {
	
}

.errorNotes ul {
	height: 30px;
}

.errorNotes li {
	float: left;
	width: 150px;
	text-align: center;
	line-height: 30px;
	list-style: none;
}

.re {
	margin: 0 auto;
	width: 280px;
	text-align: center;
}

.re .title {
	text-align: center;
	line-height: 30px;
	font-size: 20px;
	font-weight: bold;
	color: #F00;
}

.re dt {
	text-align: left;
	line-height: 30px;
}
</STYLE>
</head>

<body>
	<div class="main">
		<div class="con">
			<div class="errorPic">
				<img src="<%=request.getContextPath()%>/static/images/error/500.png">
			</div>
			<div class="errorNotes">
				<div class="re">
					<div class="title"></div>

					<a href="<%=request.getContextPath() %>/">返回首页</a>

				</div>
			</div>
		</div>
	</div>
</body>
</html>
