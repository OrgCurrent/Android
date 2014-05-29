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
              
      // send the click coordinates back up to controller scope
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
    };

    var complete = function(g) {
      return g.node().__stopped__ !== true;
    };

    var ripples = function(position) {
      for (var i = 1; i < 5; ++i) {
        var circle = svg.append("circle")
          .attr("cx", position[0])
          .attr("cy", position[1])
          .attr("r", initR - (thickness / 2))
          .attr('class', 'ripples')
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
    };


    var screenWidth = screen.width;
    var screenHeight = screen.height;

    var svg = d3.select(element[0])
      .append('svg')
      .attr('height', screenHeight/2)
      .attr('width', screenWidth);

    var margin = scope.margin;
    var width = svg[0][0].clientWidth - margin.left;
    var height = svg[0][0].clientHeight - margin.bottom;

    var xMin = margin.left;
    var xMax = width;
    var yMin = height;
    var yMax = margin.top;

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

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')

    // Actual x-axis
    svg.append('g').call(xAxis.tickValues([0,5,10])).attr({
      transform: 'translate(0,' + height + ')',
      class: 'x axis'
      })
      .append('text')
      .attr({
        x: margin.left + 40,
        dy: -margin.bottom + 10,
        'font-size': 12
      })
      // .style('text-anchor', 'end')
      .text(scope.coordinates.x);

    // x-axis top
    svg.append('g').call(xAxis.tickValues([])).attr({
      transform: 'translate(0,' + margin.top + ')',
      class: 'x axis'
      });

    // x-axis middle
    svg.append('g').call(xAxis.tickValues([])).attr({
      transform: 'translate(0,' + ((height + margin.top) / 2) + ')',
      class: 'x axis',
      'stroke-dasharray': '5,10,5'
      });
    
    // Actual y-axis
    svg.append('g').call(yAxis.tickValues([5,10])).attr({
        transform: 'translate(' + margin.left + ', 0)',
        class: 'y axis'
      })
      .append('text')
      .attr({
        transform: 'rotate(-90)',
        dx: -2*margin.bottom,
        dy: margin.left - 10,
        'font-size': 12
      })
      .style("text-anchor", "end")
      .text(scope.coordinates.y);

    // y-axis right
    svg.append('g').call(yAxis.tickValues([])).attr({
        transform: 'translate(' + width + ', 0)',
        class: 'y axis'
      })

    // y-axis middle
    svg.append('g').call(yAxis.tickValues([])).attr({
        transform: 'translate(' + ((width + margin.left) / 2) + ', 0)',
        class: 'y axis',
        'stroke-dasharray': '5,10,5'
      })

    svg.on("mousedown", click)
      .on("mouseup", click);

    // watch for submitted - when submitted, turn off listeners for mouseup, mousedown
    scope.$watch('submitted', function(newValue, oldValue) {
      console.log('submitted changed', newValue, oldValue);
      if (newValue) {
        svg.on("mousedown", null)
          .on("mouseup", null);
      }
    });
  };

  return {
    restrict: 'E',
    link: link,
    scope: {selectedPoint: '=', submitted: '=', coordinates: '=', margin: '='}
  }
})

.factory('CircleGraph', function() {
  return {
    dailyAvg: function(data, margin) {

      var animate = function(data) {
        var svg = d3.select('svg');

        // translate data into correct pixels
        var width = svg[0][0].clientWidth - margin.left;
        var height = svg[0][0].clientHeight - margin.bottom;

        var xMin = margin.left;
        var xMax = width;
        var yMin = height;
        var yMax = margin.top;

        // scope.selectedPoint = [10 * ((coords[0] - xMin) / (xMax - xMin)), 10 * ((yMin - coords[1]) / (yMin - yMax))];
        var translateX = function(x) {
          return (xMin + x/10 * (xMax - xMin));
        }

        // y inverted
        var translateY = function(y) {
          return (yMax + y/10 * (yMin - yMax));
        }


        // data join
        var others = svg.selectAll("circle.others")
          .data(data.shift())
        
        // update
        others.transition().duration(1000)
          .attr({
            cx: function(d) { return translateX(d[0]); },
            cy: function(d) { return translateY(d[1]); }
          });

        // enter
        others.enter()
          .append("circle")
          .attr({
            class: 'others',
            cx: function(d) { return translateX(d[0]); },
            cy: function(d) { return translateY(d[1]); },
            r: 0,
            fill: 'black'
          })
            .transition()
          .attr('r', 5);

        // exit
        others.exit()
            .transition()
          .attr({r: 0})
          .remove();

        setTimeout(function() {
          if (data.length > 0) {
            animate(data);
          }
        }, 1100);
      };

      animate(data);
    }
  }
});