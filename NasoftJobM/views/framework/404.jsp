<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<LINK type=text/css rel=stylesheet>
<STYLE>
{
PADDING-RIGHT


:

 

0
px


;
PADDING-LEFT


:

 

0
px


;
PADDING-BOTTOM


:

 

0
px


;
MARGIN


:

 

0
px


;
PADDING-TOP


:

 

0
px




}
BODY {
	BACKGROUND: #dad9d7;
	FONT-FAMILY: "微软雅黑"
}

IMG {
	BORDER-TOP-STYLE: none;
	BORDER-RIGHT-STYLE: none;
	BORDER-LEFT-STYLE: none;
	BORDER-BOTTOM-STYLE: none
}

A {
	CURSOR: pointer
}

UL {
	LIST-STYLE-TYPE: none
}

LI {
	LIST-STYLE-TYPE: none
}

TABLE {
	TABLE-LAYOUT: fixed
}

TABLE TR TD {
	WORD-BREAK: break-all;
	WORD-WRAP: break-word
}

A {
	TEXT-DECORATION: none;
	outline: none
}

A:hover {
	TEXT-DECORATION: underline
}

.cf:unknown {
	CLEAR: both;
	DISPLAY: block;
	FONT-SIZE: 0px;
	VISIBILITY: hidden;
	HEIGHT: 0px;
	content: "."
}

.cf {
	CLEAR: both;
	ZOOM: 1
}

.bg {
	BACKGROUND: url(404/01.jpg) #dad9d7 no-repeat center top;
	LEFT: 0px;
	OVERFLOW: hidden;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 0px;
	HEIGHT: 600px
}

.cont {
	MARGIN: 0px auto;
	WIDTH: 500px;
	LINE-HEIGHT: 20px
}

.c1 {
	HEIGHT: 360px;
	TEXT-ALIGN: center
}

.c1 .img1 {
	MARGIN-TOP: 180px
}

.c1 .img2 {
	MARGIN-TOP: 165px
}

.cont H2 {
	FONT-WEIGHT: normal;
	FONT-SIZE: 18px;
	COLOR: #555;
	HEIGHT: 35px;
	TEXT-ALIGN: center
}

.c2 {
	HEIGHT: 35px;
	TEXT-ALIGN: center
}

.c2 A {
	DISPLAY: inline-block;
	FONT-SIZE: 14px;
	MARGIN: 0px 4px;
	COLOR: #626262;
	PADDING-TOP: 1px;
	HEIGHT: 23px;
	TEXT-ALIGN: left;
	TEXT-DECORATION: none
}

.c2 A:hover {
	COLOR: #626262;
	TEXT-DECORATION: none
}

.c2 A.home {
	PADDING-LEFT: 30px;
	BACKGROUND: url(404/02.png);
	WIDTH: 66px
}

.c2 A.home:hover {
	BACKGROUND: url(404/02.png) 0px -24px
}

.c2 A.home:active {
	BACKGROUND: url(404/02.png) 0px -48px
}

.c2 A.re {
	PADDING-LEFT: 30px;
	BACKGROUND: url(404/03.png);
	WIDTH: 66px
}

.c2 A.re:hover {
	BACKGROUND: url(404/03.png) 0px -24px
}

.c2 A.re:active {
	BACKGROUND: url(404/03.png) 0px -48px
}

.c2 A.sr {
	PADDING-LEFT: 28px;
	BACKGROUND: url(404/04.png);
	WIDTH: 153px
}

.c2 A.sr:hover {
	BACKGROUND: url(404/04.png) 0px -24px
}

.c2 A.sr:active {
	BACKGROUND: url(404/04.png) 0px -48px
}

.c3 {
	FONT-SIZE: 12px;
	COLOR: #999;
	HEIGHT: 180px;
	TEXT-ALIGN: center
}

#bf {
	LEFT: 0px;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 269px
}

.bf1 {
	PADDING-LEFT: 32px;
	MARGIN: 0px auto;
	WIDTH: 99px
}

.bd {
	OVERFLOW: hidden;
	HEIGHT: 600px
}

#box {
	LEFT: 0px;
	WIDTH: 100%;
	POSITION: absolute;
	TOP: 165px;
	TEXT-ALIGN: center
}

.bf1 {
	PADDING-LEFT: 32px;
	MARGIN: 0px auto;
	WIDTH: 99px
}
</STYLE>
</head>
<body>
<BODY>
	<DIV class=bg>
		<DIV class=cont>
			<DIV class=c1>
				<IMG class=img1
					src="<%=request.getContextPath() %>/static/images/error/01.png">
			</DIV>
			<H2>Sorry…北京汇金科技提醒您访问的页面不存在</H2>
			<DIV class=c2>
				<A class=home href="<%=request.getContextPath() %>/">用户首页</A>
			</DIV>

		</DIV>
	</DIV>
</body>
</html>