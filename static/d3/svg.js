
	// 向数组中的每个对象添加位置
	addXY = (arr, x) => {
		var clueLength = arr.length;
		var clueAddY = height / (clueLength + 1);
		for (const key in arr) {
			if (arr.hasOwnProperty(key)) {
				arr[key].x = x
				arr[key].y = clueAddY + clueAddY*key
			}
		}
	}
	// 生成连线信息 xOffset为x方向偏移量
	generateConnInfo = (arrBefor, arrAfter, xOffset) => {
		let res = [];
		let offset = xOffset ? xOffset : 0;
		arrAfter.map(data => {
			for(key in arrBefor) {
				if(data.related.indexOf(parseInt(key)) > -1){
					res.push({
						source:{x: arrBefor[key].x + offset, y: arrBefor[key].y},
						target:{x: data.x, y: data.y},
						color: data.color ? data.color : '#3490f0'
					});
					if (data.type === 'caseGroup') {
						if (data.name === '') {
							data.name = arrBefor[key].name
						} else {
							data.name = data.name + '|' + arrBefor[key].name
						}
          }
          if (data.type === 'relatedCase') {
						if (data.name === '') {
							data.name = '通过' + arrBefor[key].name
						} else {
							data.name = data.name + '|' + arrBefor[key].name
						}
					}
				}
      }
      if (data.type === 'relatedCase') {
          data.name += '关联的案件名称'
      }
    })
		return res;
  }
  // 生成大括号信息
  bracketsInfo = (arrBefor, arrAfter, xOffset) => {
    let res = [];
    let UpperPart = arrBefor[3].y - arrAfter[0].y
    let LowerPart = arrAfter[arrAfter.length - 1].y - arrBefor[3].y
    res.push({
      start: { x: arrBefor[3].x + xOffset, y: arrBefor[3].y },
      UpperPart,
      LowerPart
    });
    return res;
  }
	var width = 1200,height = 600;

	var svg = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(100,0)")

	var mainCase = [{name:'主案件', x: 0, y: 300, des: '案件描述'}]
	var clue = [
		{name:'线索001', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索002', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索003', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索004', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索005', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索006', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索007', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索008', related: [0], color: 'rgb(61,208,190)'},
		{name:'线索009', related: [0], color: 'rgb(61,208,190)'}
	]

	var caseGroup = [
		{name:'', related: [1,2], type: 'caseGroup', color: 'rgb(61,208,190)'},
		{name:'', related: [3], type: 'caseGroup', color: 'rgb(242,94,67)'},
		{name:'', related: [0,4,6], type: 'caseGroup', color: '#ffd572'},
		{name:'', related: [1,2], type: 'caseGroup', color: '#2d8cf0'},
		{name:'', related: [4,5,6], type: 'caseGroup', color: '#ab8df2'},
		{name:'', related: [0,1,6], type: 'caseGroup', color: '#abd5f2'},
		{name:'', related: [0,2,3], type: 'caseGroup', color: '#9bd598'},
		{name:'', related: [4,5,7,8], type: 'caseGroup', color: '#ffd58f'}
	]

	var relatedCase = [
		{name:'', related: [3], type: 'relatedCase'},
		{name:'', related: [3], type: 'relatedCase'},
		{name:'', related: [3], type: 'relatedCase'},
		{name:'', related: [3], type: 'relatedCase'}
	]

	this.addXY(clue, 200)
	this.addXY(caseGroup, 400)
	this.addXY(relatedCase, 700)


	concatData = mainCase.concat(clue, caseGroup, relatedCase)
	console.log('mainCase', mainCase)

	let lineInfo = this.generateConnInfo(mainCase, clue)
	let lineInfo1 = this.generateConnInfo(clue, caseGroup, 100)
  let lineInfo2 = this.generateConnInfo(caseGroup, relatedCase, 200)
  let brackets = this.bracketsInfo(caseGroup, relatedCase, 205)
	lineInfo = lineInfo.concat(lineInfo1)
	console.log('lineInfo', lineInfo)
	console.log('bracketsInfo', brackets)
	
	// 添加连线，有数据，而没有足够图形元素的时候，使用此方法可以添加足够的元素
	svg.selectAll('line')
	 .data(lineInfo)
	 .enter()
	 .append('line')
	 .attr('style', function(d){ return "stroke:" + d.color + ";stroke-width:1" })
	 .attr('x1', function(d){ return d.source.x })
	 .attr('y1', function(d){ return d.source.y })
	 .attr('x2', function(d){ return d.target.x })
	 .attr('y2', function(d){ return d.target.y })
  
  // 添加大括号
  svg.selectAll('circle')
  .data(brackets)
  .enter()
  .append('circle')
  // .transition()
  // .duration(5000)
  .attr('cx', (d) => { return d.start.x - 5 })
  .attr('cy', (d) => { return d.start.y })
  .attr('r', "5")
  .attr('stroke', "blue")
  .attr('stroke-width', "2")
  .attr('fill', "white")

	svg.selectAll('path')
  .data(brackets)
  .enter()
  .append('path')
  .attr('stroke', "blue")
  .attr('stroke-width', "1")
  .attr('fill', "none")
  .attr('d', function(d){ return `M ${d.start.x} ${d.start.y} l 50 0 l 15 -15 l 0 -${d.UpperPart} l 5 -5 l 10 -5`})

  svg.selectAll('path1')
  .data(brackets)
  .enter()
  .append('path')
  .attr('stroke', "blue")
  .attr('stroke-width', "1")
  .attr('fill', "none")
  .attr('d', function(d){ return `M ${d.start.x + 50} ${d.start.y} l 15 15 l 0 ${d.LowerPart} l 5 5 l 10 5`})

	// 数据展示
	dataDisplay = (dataArr, position, isShowCircle, isOtherRect) => {
		var nodes = svg.selectAll(position.node)
			.data(dataArr)
			.enter()
			.append("g")
			.attr("class", "node")
			.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		if (isShowCircle) {
			nodes.append("circle")
				.attr("r", 5);
		}
		if (isOtherRect) {
			nodes.append("rect")
			.attr("rx", 4)
			.attr("ry", 4)
			// .attr("x", 100)
			.attr("y", -20)
			.attr("width", 40)
			.attr("height", 40)
			.attr('style',function(d){ return "fill:" + d.color })
		}
		nodes.append("rect")
			.attr("rx", 4)
			.attr("ry", 4)
			.attr("x", position.rect.x)
			.attr("y", position.rect.y)
			.attr("width",  position.rect.width)
			.attr("height", 40)
			.attr('style', "fill:black;opacity:0.1")
		nodes.append("text")
			.attr("dx", position.text.dx)
			.attr("dy", position.text.dy)
			// .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
			.text(function(d) { return d.name })
	}

// 数据展示
	var position = {
		text: {
			dx: -60,
			dy: 3
		},
		rect: {
			x: -90,
			y: -20,
			width: 100
		},
		node: '.node'
	}
	this.dataDisplay(mainCase, position, true)

	position.text.dx = 10
	position.text.dy = 3
	position.rect.x = -10
	position.rect.y = -20
	position.rect.width = 110
	position.node = '.node1'
	this.dataDisplay(clue, position, true)
	
	position.text.dx = 40
	position.text.dy = 5
	position.rect.x = 40
	position.rect.y = -20
	position.rect.width = 160
	position.node = '.node2'
	this.dataDisplay(caseGroup, position, false, true)
	
	position.text.dx = 10
	position.text.dy = 3
	position.rect.x = 0
	position.rect.y = -20
	position.rect.width = 200
	position.node = '.node3'
	this.dataDisplay(relatedCase, position)

	svg.selectAll("line");
