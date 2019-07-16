import React, {useEffect} from 'react'
import echarts from 'echarts'

export default (props) => {

	const ret = () => props.history.push('/');

	useEffect(() => {
		setTimeout(() => initChart(), 500);
		return () => {
			chart = '';
		}
	}, []);

	let chart = '';

	const initChart = () => {
		console.log('A');
		let dom = document.getElementById('line');
		console.log(dom);
		chart = echarts.init(dom);
		let setTime;
		const set = () => {
			setTime && clearTimeout(setTime);
			setTime = setTimeout(() => {
				if (chart) chart.resize()
			}, 100)
		};
		window.onresize = () => set();

		renderChart();
	};

	const hexToRgba = (hex, opacity) => {
		return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
	};

	const renderChart = () => {
		let activeDat = {
			typeStr: '测试',
			color: '#240041',
			data: [{d: 1, v: 10},{d: 1, v: 10},{d: 1, v: 10},{d: 1, v: 10},{d: 1, v: 10},],
		};
		let name = '', color = '', xlines = [], data = [], unit = '金额(元)';
		name = activeDat.typeStr;
		color = activeDat.color;
		activeDat.data.map(item => {
			xlines.push(item.d);
			data.push(item.v);
		});

		let option = {
			title: {
				text: '趋势图',
				textStyle: {
					align: 'center',
					color: '#666666',
					fontSize: 16,
				},
				top: '0%',
				left: '5%',
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				color: [color],
				data: [name],
				left: 'center',
				bottom: 'bottom',
				selected: {
					[name]: true
				},
			},
			grid: {
				top: '15%',
				left: '2%',
				right: '0%',
				bottom: '3%',
				height: '75%',
				width: '98%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: xlines,
				axisLine: {
					lineStyle: {
						color: "#999"
					}
				}
			},
			yAxis: {
				type: 'value',
				name: unit,
				nameTextStyle: {
					color: "#999",
				},
				splitLine: {
					lineStyle: {
						type: 'dashed',
						color: '#DDD'
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: "#999"
					},
				},
				splitArea: {
					show: false
				}
			},
			series: [
				{
					name: name,
					type: 'line',
					data: data,
					areaStyle: { //区域填充样式
						normal: {
							//线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: hexToRgba(color, .5)
							},
								{
									offset: 1,
									color: '#F2F2F2'
								}
							], false),
							shadowColor: '#FFFFFF', //阴影颜色
							shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
						}
					},
					color: color,
					lineStyle: {
						normal: {
							width: 3,
							color: {
								type: 'linear',

								colorStops: [{
									offset: 0,
									color: hexToRgba(color, .5) // 0% 处的颜色
								}, {
									offset: 0.4,
									color: color // 100% 处的颜色
								}, {
									offset: 1,
									color: color // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							},
							shadowColor: hexToRgba(color, .5),
							shadowBlur: 10,
							shadowOffsetY: 8
						}
					},
					itemStyle: {
						normal: {
							color: color,
							borderWidth: 6,
							borderColor: color
						}
					},
					smooth: true
				},
			]
		};
		chart && chart.setOption(option);
	}

	return <div>
		<input type="text"/>
		login
		<input type="button" value="ret" onClick={ret}/>

		<div id="line" style={{width: '100%', height: '300px', margin: '0 auto'}}></div>
	</div>
}
