angular.module('graph', [])

.directive('circleKey', function() {
  var link = function(scope, element, attr) {
    var outerRadius = 2;
    var innerRadius = 4;
    var radius = 5;

    var svg = d3.select(element[0])
      .append('svg')
      .attr({
        'height': 10,
        'width': 10
      })
      .append('circle')
      .attr('cx', 5)
      .attr('cy', 5);

    if (scope.user === 'true') {
      svg.attr('r', innerRadius)
        .attr('class', 'click')
        .style('stroke-width', outerRadius);
    } else {
      svg.attr('r', radius)
        .attr('class', 'others');
    }
  };

  return {
    restrict: 'E',
    link: link,
    scope: {user: '@'}
  }
})

.directive('happyGraph', function() {
  var link = function(scope, element, attr) {
    var initR = 40;
    var finalR = 10;
    var rippleR = 400;
    var thickness = 5;
    var fontSize = 11;


    var click = function() {
      d3.event.preventDefault();
      
      // location of click
      var clickPos = d3.touches(svg.node());

      // no clickPos when click called on touchOff
      if (clickPos[0]) {
        // check to make sure click position is inside graph
        if (!(clickPos[0][0] > xMin && clickPos[0][0] < xMax && clickPos[0][1] < yMin && clickPos[0][1] > yMax)) {
          console.log('outside Range');
          return;
        }
      }

      var g = svg.selectAll('g.click')
        .data(clickPos, function(d) {
          return d.identifier;
        });

      // used to create closing arc when press and hold.
      var arc = d3.svg.arc()
        .outerRadius(initR)
        .innerRadius(initR - thickness);


      g.enter()
        .append("g")
        .attr("class", "click")
        .attr("transform", function (d) {
          return "translate(" + d[0] + "," + d[1] + ")";
        })
        .append("path")
        .attr("class", "arc")
          .transition().duration(1000).ease('linear')
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
          if (complete(g)) {
            var coords = clickPos[0];
            scope.$apply(function() {
              scope.selectedPoint = [100 * ((coords[0] - xMin) / (xMax - xMin)), 100 * ((yMin - coords[1]) / (yMin - yMax))];
            });
            svg.selectAll('circle.click').remove();
            // append circle with radius that decreases to
            // finalR radius over course of 2 seconds
            svg.append('circle')
              .attr({
                class: 'click',
                cx: coords[0],
                cy: coords[1],
                r: initR - (thickness / 2),
                'stroke-width': thickness
              })
            .transition().duration(2000)
              .attr('r', finalR);
            ripples(d);
          }
        });

      // on touchEnd, set stopped to true

      g.exit().remove().each(function () {
        this.__stopped__ = true;
      });
    };

    // if stopped = true before arc completes, not taken as a "valid" data point
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
          .attr("r", rippleR)
          .style("stroke-opacity", 0)
          .each("end", function () {
              d3.select(this).remove();
          });
      }
    };


    // BUILD X-Y GRAPH
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
      .domain([0, 100])
      //rangeX is left coord, rangeY is right coord
      .range([xMin, xMax]);


    var yScale = d3.scale.linear()
      .domain([0, 100])
      // rangeX is bottom coord, rangeY is top coord
      .range([yMin, yMax]);

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')

    // Actual x-axis
    svg.append('g').call(xAxis.tickValues([0,50,100])).attr({
      transform: 'translate(0,' + height + ')',
      class: 'x axis main-axis'
      })
      .append('text')
      .attr({
        'text-anchor': 'start',
        x: margin.left + 20,
        y: -(margin.bottom - 10),
        'font-size': fontSize
      })
      .text(scope.coordinates.x);

    // x-axis top
    svg.append('g').call(xAxis.tickValues([])).attr({
      transform: 'translate(0,' + margin.top + ')',
      class: 'x axis main-axis'
      })
      .append('text')
      .attr({
        'text-anchor': 'center',
        x: (width - margin.left) / 2,
        dy: fontSize + 14,
        'font-size': fontSize + 10,
        'class': 'graph-domain'
      })
      .text(scope.domain);

    // x-axis middle
    svg.append('g').call(xAxis.tickValues([])).attr({
      transform: 'translate(0,' + ((height + margin.top) / 2) + ')',
      class: 'x axis',
      'stroke-dasharray': '5,10,5'
      });
    
    // Actual y-axis
    svg.append('g').call(yAxis.tickValues([50,100])).attr({
        transform: 'translate(' + margin.left + ', 0)',
        class: 'y axis main-axis'
      })
      .append('text')
      .attr({
        transform: 'rotate(-90)',
        'text-anchor': 'start',
        x: -(height - margin.bottom),
        y: margin.left - 15,
        'font-size': fontSize
      })
      .text(scope.coordinates.y);

    // y-axis right
    svg.append('g').call(yAxis.tickValues([])).attr({
        transform: 'translate(' + width + ', 0)',
        class: 'y axis main-axis'
      })

    // y-axis middle
    svg.append('g').call(yAxis.tickValues([])).attr({
        transform: 'translate(' + ((width + margin.left) / 2) + ', 0)',
        class: 'y axis',
        'stroke-dasharray': '5,10,5'
      })

    svg.on("touchstart", click)
      .on("touchend", click);

    // watch for submitted - when submitted, turn off listeners for touchend, touchstart
    scope.$watch('submitted', function(newValue, oldValue) {
      if (newValue) {
        svg.on("touchstart", null)
          .on("touchend", null);
      }
    });
  };

  return {
    restrict: 'E',
    link: link,
    scope: {selectedPoint: '=', submitted: '=', coordinates: '=', margin: '=', domain: '='}
  }
})
