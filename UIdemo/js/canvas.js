/**
 * Created by rsq0113 on 2018/5/4.
 */
(function () {
    function Circle(ctx) {
        this.ctx = ctx;
        this.strokeStyle = '#E4E4E4'; //边的颜色
        this.fillStyle = 'blue';  //填充色
        this.barStyle = "blue";
        this.lineCap = null;
        this.shadowOffsetX = 1;
        this.shadowOffsetY = 1;
        this.shadowColor = '#333';
        this.shadowBlur = 8;
    }

    Circle.prototype.draw = function () {
        console.log(this.ctx.canvas.width)
        this.centerX = this.ctx.canvas.width/2;
        this.centerY = this.ctx.canvas.height/2;
        this.radius = Math.min(this.ctx.canvas.width/3,this.ctx.canvas.height/3);
        this.lineWidth = this.radius*4/5;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, true);  // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2
        this.ctx.lineWidth = this.lineWidth;
        this. ctx.strokeStyle = this.strokeStyle;
        this. ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
        this.ctx.closePath();
    };


    function Ring(ctx) {
        /*强转Circle方法的this指向，将Ring的属性进行继承拓展*/
        Circle.call(this,ctx);
        this.startAngle = 3 * Math.PI / 2; //弧起始角度
        this.percent = 0;  //弧占的比例
        this.image = "../static/bootstrap/icons/个人信息.png";
    }

    Ring.prototype = Object.create(Circle.prototype);
    Ring.prototype.drawRing = function () {
        this.draw();  // 调用Circle的draw方法画圈圈     // angle
        this.ctx.beginPath();
        var anglePerSec = this.startAngle + Math.PI * 2 * this.percent; // 蓝色的弧度
        this.ctx.arc(this.centerX,this.centerY, this.radius, this.startAngle, anglePerSec, false); //这里的圆心坐标要和cirle的保持一致
        this.ctx.strokeStyle = this.barStyle;;
        this.ctx.lineCap = this.lineCap;
        this.ctx.stroke();
        this.ctx.closePath();
    }
    Ring.prototype.drawCenter = function () {
        var grad = this.ctx.createLinearGradient(this.centerX-this.radius*Math.sin(Math.PI/4),this.centerY-this.radius*Math.sin(Math.PI/4),
                                            this.centerX+this.radius*Math.sin(Math.PI/4), this.centerY+this.radius*Math.sin(Math.PI/4));
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2, true);  // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2
        this.ctx.shadowOffsetX = this.shadowOffsetX;
        this.ctx.shadowOffsetY = this.shadowOffsetY;
        this.ctx.shadowColor = this.shadowColor;
        this.ctx.shadowBlur = this.shadowBlur;
        grad.addColorStop(0, ' #FFFFFF');
        grad.addColorStop(1, ' #E4E4E4');
        this.ctx.fillStyle = grad;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.shadowOffsetX = null;
        this.ctx.shadowOffsetY = null;
        this.ctx.shadowColor = null;
        this.ctx.shadowBlur = null;
        var image = new Image();
        var that = this;
        image.src = this.image;
        image.onload = function () {
            that.ctx.drawImage(image,that.centerX - 8 , that.centerY - 8, 16, 16);
        };
        this.ctx.closePath();
    }
    Ring.prototype.resize = function () {
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        console.log($(this.ctx.canvas).parent().width())
        this.ctx.canvas.width = $(this.ctx.canvas).parent().width();

        this.drawRing();
        this.drawCenter();
    }
    $.extend({
        drawRing:function(ctx){
            return new Ring(ctx);
        }
    })
})();

