angular.module('graphics', [])

.factory('PointGraph', ['$rootScope', 
  function($rootScope) {
  return {

    animate: function(data, margin) {
      var scores = this.getRecentScores(data);
      // recentScores is an array of the most recent score for each user.
      var recentScores = scores.recentScores;
      // myScore is an array of my most recent score.
      var myScore = scores.myScore;
      var status = 0;

      var svg = d3.select('svg');
      var width = svg[0][0].clientWidth - margin.left;
      var height = svg[0][0].clientHeight - margin.bottom;

      var xMin = margin.left;
      var xMax = width;
      var yMin = height;
      var yMax = margin.top;

      // translate data into correct pixels
      var translateX = function(x) {
        return (xMin + x/100 * (xMax - xMin));
      }

      // y inverted
      var translateY = function(y) {
        return (yMin - y/100 * (yMin - yMax));
      }

      // place my most recent point
      var placeMyPoint = function(data) {
        var initR = 40;
        var finalR = 10;
        var thickness = 5;

        svg.append('circle')
          .attr({
            class: 'click',
            cx: translateX(data[0]),
            cy: translateY(data[1]),
            r: finalR,
            'stroke-width': thickness
          })
      }

      // place co-worker data points.
      var placePoints = function(data) {
        var radius = 5;
        var delay = 50;
        var duration = 200;

        // data join
        var others = svg.selectAll('circle.others')
          .data(data)

        // enter
        others.enter()
          .append('circle')
          .attr({
            class: 'others',
            cx: function(d) { return translateX(d[0]); },
            cy: function(d) { return translateY(d[1]); },
            r: 0
          })
        .transition().delay(function(d, i) { return delay * i }).duration(duration)
          .attr('r', radius)
          .each('end', function() {
            // update progress bar 
            progressBarUpdate();
            // have ripple around data point
            ripple([this.cx.animVal.value, this.cy.animVal.value]);
          });
      }

      // ripple shown whenever co-workers data point dropped
      var ripple = function(position) {
        // constants for the ripple
        var initR = 10;
        var finalR = 50;
        var thickness = 3;
        var duration = 1000;

        var circle = svg.append('circle')
          .attr({
            'cx': position[0],
            'cy': position[1],
            'r': (initR - (thickness / 2)),
            'class': 'other-ripples',
          })
          .style('stroke-width', thickness)
        .transition().duration(duration).ease('quad-in')
          .attr("r", finalR)
          .style("stroke-opacity", 0)
          .each('end', function () {
            d3.select(this).remove();
          });
      };

      // for best fit line
      var line = d3.svg.line()
        .x(function(d) { return d.x; })
        .y(function(d) { return d.y; });

      // Derive a linear regression
      var regression = ss.linear_regression().data(recentScores.map(function(d) {
        return [translateX(d[0]), translateY(d[1])];
      })).line();

      // Create a line based on the beginning and endpoint of the range
      var lineData =  recentScores.map(function(d) {
        return {
          x: translateX(d[0]),
          y: regression(translateX(d[0]))
        };
      });

      var createBestFit = function() {
        svg.append('path')
            .datum(lineData)
            .attr({
              'd': line,
              'fill': 'none',
              'stroke': 'black',
              'stroke-width': 3
            })
      };

      var progressBarUpdate = function() {
        status += (100./recentScores.length);
        
        // PROGRESS BAR
        if (status > 95) {
          // when progress bar near complete,
          // broadcast complete so reset button can be added
          $rootScope.$broadcast('complete');
          // show best fit line in 1 second
          setTimeout(createBestFit, 1000);
        }

        // data join
        var progress = d3.select('.graph').selectAll('progress')
          .data([status]);

        // update 
        progress.transition().ease('linear').duration(30)
          .attr({
            value: function(d) { return d; }
          });

        // enter
        progress.enter()
          .append('progress')
          .attr({
            max: 100,
            value: function(d) { return d; }
          });
      };

      // Once you submit, begin place points process.
      // ******************* //
      // place my point
      placeMyPoint(myScore);
      // place everyone else's
      placePoints(recentScores);
      // ******************* //
    },

    getRecentScores: function(data) {
      var recentScores = [];
      var myScore = [];

      for (var i = 0; i < data.length; i++) {
        var numScores = data[i].scores.length;
        if (numScores && data[i].username !== window.localStorage.username) {
          recentScores.push([data[i].scores[numScores - 1].x, data[i].scores[numScores - 1].y]);
        } else if (data[i].username === window.localStorage.username) {
          myScore = [data[i].scores[numScores - 1].x, data[i].scores[numScores - 1].y];
        }
      }

      return {recentScores: recentScores, myScore: myScore};
    }
  }

}]);