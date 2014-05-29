angular.module('graph', [])

.directive('happyGraph', function() {
  var link = function(scope, element, attr) {
    console.log('hello world');
    var initR = 10;
    var r = 400;
    var thickness = 10;

    var click = function() {
      var clickPos = d3.mouse(svg.node());
      if (!(clickPos[0] > xMin && clickPos[0] < xMax && clickPos[1] < yMin && clickPos[1] > yMax)) {
        console.log('outside Range');
        return;
      }
      d3.event.preventDefault();
      svg.selectAll("g.click").remove();

      var arc = d3.svg.arc()
        .outerRadius(initR)
        .innerRadius(initR - thickness);
              
      scope.$apply(function() {
        var coords = clickPos;
        scope.selectedPoint = [10 * ((coords[0] - xMin) / (xMax - xMin)), 10 * ((yMin - coords[1]) / (yMin - yMax))];
      });
              
      var g = svg.selectAll("g.click")
        .data([clickPos]);

      g.enter()
        .append("g")
        .attr("class", "click")
        .attr("transform", function (d) {
          return "translate(" + d[0] + "," + d[1] + ")";
        })
        .append("path")
        .attr("class", "arc")
          .transition().duration(2000).ease('linear')
        .attrTween("d", function (d) {
          var interpolate = d3.interpolate(
              {startAngle: 0, endAngle: 0},
              {startAngle: 0, endAngle: 2 * Math.PI}
            );
          return function (t) {
            return arc(interpolate(t));
          };
        })
        .each("end", function (d) {
          if (complete(g))
            ripples(d);
          });

      g.exit().remove().each(function () {
          this.__stopped__ = true;
      });
    }

    var complete = function(g) {
      return g.node().__stopped__ !== true;
    }

    var ripples = function(position) {
      for (var i = 1; i < 5; ++i) {
        var circle = svg.append("circle")
          .attr("cx", position[0])
          .attr("cy", position[1])
          .attr("r", initR - (thickness / 2))
          .style("stroke-width", thickness / (i))
        .transition()
          .delay(Math.pow(i, 2.5) * 50)
          .duration(2000).ease('quad-in')
          .attr("r", r)
          .style("stroke-opacity", 0)
          .each("end", function () {
              d3.select(this).remove();
          });
      }
    }

    var svg = d3.select(element[0])
      .append("svg");

    var margin = {top: 10, right: 10, bottom: 30, left: 30};
    var width = svg[0][0].clientWidth - margin.left;
    var height = svg[0][0].clientHeight - margin.bottom;

    var xMin = margin.left;
    var xMax = width;
    var yMin = height;
    var yMax = margin.top;

    console.log(width, height);

    // var x = d3.time.scale().range([0, width]),
    // y = d3.scale.linear().range([height, 0]),
    // xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true),
    // yAxis = d3.svg.axis().scale(y).ticks(4).orient("right");


    var xScale = d3.scale.linear()
      .domain([0, 10])
      //rangeX is left coord, rangeY is right coord
      .range([xMin, xMax]);


    var yScale = d3.scale.linear()
      .domain([0, 10])
      // rangeX is bottom coord, rangeY is top coord
      .range([yMin, yMax]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .tickValues([0,5,10]);

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .tickValues([5,10]);



    svg.append('g').call(xAxis).attr({
      transform: 'translate(0,' + height + ')',
      class: 'x axis'
      })
      .append('text')
      .attr({
        // transform: 'translate(0,' + height + ')',
        x: margin.left,
        dy: margin.bottom,
        'font-size': 8
      })
      // .style('text-anchor', 'end')
      .text('How successful I will be at this company');

    svg.append('g').call(yAxis).attr({
        transform: 'translate(' + margin.left + ', 0)',
        class: 'y axis'
      })
      .append('text')
      .attr({
        transform: 'rotate(-90)',
        dx: -2*margin.bottom,
        dy: -margin.left + 10,
        'font-size': 8
      })
      .style("text-anchor", "end")
      .text("How successful the company will be");

    svg.on("mousedown", click)
      .on("mouseup", click);
  };

  return {
    restrict: 'E',
    link: link,
    scope: {selectedPoint: '='}

  }
});