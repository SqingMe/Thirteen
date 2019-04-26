var log = {
    init(id) {
        this.createCanvas(id);
        var canvas = document.getElementById(id);
        canvas.onclick = this.onclick.bind(this);
        canvas.onmousedown = this.onmousedown.bind(this);
    },
    onmousedown(e){
        this.canvas.onmousemove = this.onmousemove.bind(this);
    },
    onclick(e) {
        this.context.clearRect(0, 0, 600, 400);
        var x = e.pageX - this.canvas.offsetLeft;
        var y = e.pageY - this.canvas.offsetTop;
        //创建背景
        this.background();
        //创建坐标
        this.createCoord();
        //创建曲线
        this.createLog({
            x: x,
            y: y
        });
        this.canvas.onmousemove = null;
        this.createCtrlPoint({
            x:x,
            y:y
        });
        this.createCtrlLine({
            x:x,
            y:y
        })
    },

    onmousemove(e) {
        console.log("onmousemove");
        this.context.clearRect(0, 0, 600, 400);
        var x = e.pageX - this.canvas.offsetLeft;
        var y = e.pageY - this.canvas.offsetTop;
        //创建背景
        this.background();
        //创建坐标
        this.createCoord();
        //创建曲线
        this.createLog({
            x: x,
            y: y
        });
        this.createCtrlPoint({
            x:x,
            y:y
        });
        this.createCtrlLine({
            x:x,
            y:y
        })
    },
    createCanvas(id) {
        console.log("creatCanvas");
        var canvas = document.getElementById(id);
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
    },
    background: function () {
        this.context.fillStyle = "#e5e5e5";
        this.context.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    },
    createCoord() {
        this.context.beginPath();
        this.strokeStyle = "#000";
        this.context.moveTo(30, 400);
        this.context.lineTo(30, 0);
        this.context.stroke();
        this.context.moveTo(0, 370);
        this.context.lineTo(600, 370);
        this.context.stroke();
        this.context.moveTo(30, 0);
        this.context.lineTo(40, 10);
        this.context.stroke();
        this.context.moveTo(30, 0);
        this.context.lineTo(20, 10);
        this.context.stroke();
        this.context.moveTo(600, 370);
        this.context.lineTo(590, 360);
        this.context.stroke();
        this.context.moveTo(600, 370);
        this.context.lineTo(590, 380);
        this.context.stroke();
        this.context.save();
    },
    createLog(point) {
        this.context.beginPath();
        this.context.strokeStyle = "#0E00FF";
        this.context.moveTo(35, 10);
        this.context.quadraticCurveTo(point.x, point.y, 590, 360);
        this.context.stroke();
    },
    createCtrlPoint(point){
        this.context.beginPath();
        this.context.fillStyle = "#000";
        this.context.arc(point.x,point.y,1,0,2*Math.PI);
        this.context.stroke();
        this.context.fill();
    },
    createCtrlLine(point){
        this.context.beginPath();
        this.context.setLineDash([5]);
        this.context.moveTo(30,10);
        this.context.lineTo(point.x,point.y);
        this.context.stroke();
        this.context.restore();
    }
}
log.init("canvas");
log.background();
log.createCoord();