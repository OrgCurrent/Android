angular.module('graph', [])

.directive('helloWorld', function() {
  var link = function(scope, element, attr) {
    console.log('hello world');
    var initR = 100;
    var r = 400;
    thickness = 20;

  var svg = d3.select(element[0])
        .append("svg");

  svg.on("mousedown", click)
    .on("mouseup", click);

  function click() {
    d3.event.preventDefault();

    var arc = d3.svg.arc()
            .outerRadius(initR)
            .innerRadius(initR - thickness);
            
            console.log(d3.click(svg.node()));
            
    var g = svg.selectAll("g.click")
            .data(d3.click(svg.node()), function (d) {
                return d.identifier;
            });

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
                g.remove();
            });

    g.exit().remove().each(function () {
        this.__stopped__ = true;
    });
}

  function complete(g) {
      return g.node().__stopped__ != true;
  }

  function ripples(position) {
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
};

  return {
    restrict: 'E',
    link: link

  }
});