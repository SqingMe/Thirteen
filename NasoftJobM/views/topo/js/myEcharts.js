Nasoft.Echarts = {
		/**
		 * 构造一个图表对象
		 * @author rsq0113
		 * @returns
		 */
	_createEcharts_ : function() {
		return echarts.init(this.domElement, '', {
			width : 1200,
			height : 250
		});
	},
	// 图表的容器
	domElement : null,
	// 展示图表
	showTime : function(tab) {
		this.domElement = tab.find('._metrics')[0];// 设置图表的容器
		var charts = this._createEcharts_();
		charts.setOption(this.options);
	},
	// 设置数据
	setData : function(data) {
		this.options.xAxis[0].data = []; // 清空数据
		this.options.series[0].data = []; // 清空数据
		for ( var key in data) {
			this.options.xAxis[0].data.push($.parseHTML(key)[0].textContent);
			this.options.series[0].data.push(data[key]);
		}
	},
	// 图表的属性列表
	options : {
		color : [ '#3398DB' ],
		tooltip : {
			trigger : 'axis',
			axisPointer : { // 坐标轴指示器，坐标轴触发有效
				type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid : {
			left : '1%',
			right : '1%',
			bottom : '1%',
			containLabel : true
		},
		xAxis : [ {
			name : '执行步骤',
			type : 'category',
			data : [],
			axisTick : {
				alignWithLabel : true
			}
		} ],
		yAxis : [ {
			name : '执行时间-ms',
			type : 'value',
			axisTick : {
				show : true
			}
		} ],
		series : [ {
			name : '执行时间',
			type : 'bar',
			barWidth : '20%',
			data : []
		} ]
	}
}