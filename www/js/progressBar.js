angular.module('progressBar', [])

.directive('progress', function() {
  var link = function(scope, element, attr) {

    var screenWidth = screen.width;
    var screenHeight = screen.height;

    var svg = d3.select(element[0])
      .append('svg')
      .attr('height', 20)
      .attr('width', screenWidth);

    console.log(scope.day);

    var rect = d3.svg.selectAll('rect')
      .data([scope.day])
      .enter()
      .append('rect')
      .attr({
        x: 0;
        y: 0;
        width: function(d) { return d * screenWidth / scope.totalDays; },
        height: 20
      })

    var updateBar = function(day) {
      var rect = d3.svg.selectAll('rect')
        .data([day])
        .attr({
          x: 0;
          y: 0;
          width: function(d) { return d * screenWidth / scope.totalDays; },
          height: 20
        });
    }

    scope.$watch('day', function(newValue, oldValue) {
      console.log(newValue, oldValue);
      updateBar(newValue);
    })
  };

  return {
    restrict: 'E',
    link: link,
    scope: {totalDays: '=', day: '='}
  }
});