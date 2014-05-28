angular.module('graph', [])

.directive('happyGraph', function() {
  var link = function(scope, element, attr) {
    console.log('hello world');
    var initR = 10;
    var r = 400;
    var thickness = 10;

    var click = function() {
      d3.event.preventDefault();
      svg.selectAll("g").remove();

      var arc = d3.svg.arc()
        .outerRadius(initR)
        .innerRadius(initR - thickness);
              
      console.log(d3.mouse(svg.node()));
      scope.$apply(function() {
        scope.selectedPoint = d3.mouse(svg.node());
      });
              
      var g = svg.selectAll("g.click")
        .data([d3.mouse(svg.node())]);

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
            //g.remove();
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

    svg.on("mousedown", click)
      .on("mouseup", click);

  };

  return {
    restrict: 'E',
    link: link,
    scope: {selectedPoint: '='}

  }
});