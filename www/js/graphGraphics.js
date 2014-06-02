angular.module('graphics', [])

.factory('CircleGraph', ['$rootScope', 
  function($rootScope) {
  return {
    dailyAvg: function(data, margin) {

      var animate = function(data) {
        status += (100 * 1./totalDays);
        progressBar(status);
        
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
          return (xMin + x/100 * (xMax - xMin));
        }

        // y inverted
        var translateY = function(y) {
          return (yMax + y/100 * (yMin - yMax));
        }

        // data join
        var others = svg.selectAll("circle.others")
          .data(data.shift())
        
        // update
        others.transition().duration(100)
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
            .transition().duration(100)
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
        }.bind(this), 110);
      };

      var totalDays = data.length;
      var status = 0;

      var progressBar = function(status) {
        // PROGRESS BAR
        // data join
        if (status === 100) {
          $rootScope.$broadcast('complete');
        }
        var progress = d3.select('.graph').selectAll('progress')
          .data([status]);

        // update 
        progress.transition().ease('linear').duration(100)
          .attr({
            value: function(d) { return d; }
          });

        // enter
        progress.enter()
          .append('progress')
          .attr({
            max: 100,
            value: function(d) { return d; }
          })
      }
      progressBar(status);
      animate(data);
    }
  }
}])

.factory('LineGraph', ['$rootScope', 
  function($rootScope) {
  return {
    dailyAvg: function(data, margin) {
      var recentScores = [];
      for (var i = 0; i < data.length; i++) {
        var numScores = data[i].scores.length;
        var userScores = [];
        for (var j = 3; j > 0; j--) {
          if (j > numScores) {
            userScores.push([]);
          } else {
            userScores.push([data[i].scores[numScores - j].x,data[i].scores[numScores - j].y]);
          }
        }
        recentScores.push(userScores);
      }
      // recentScores now contains x arrays (one per user) of most 3 recent scores.

      var avgScores = [[50,50]];
      for (var i = 0; i < 3; i++) {
        var totalX = 0;
        var totalY = 0;
        var num = 0;
        for (var j = 0; j < recentScores.length; j++) {
          // console.log(recentScores[j][0])
          if (recentScores[j][i][0] !== undefined) {
            totalX += recentScores[j][i][0];
            totalY += recentScores[j][i][1];
            num += 1;
          }
        }
        if (num > 0) {
          avgScores.push([totalX/num, totalY/num]);
        }
      }
      // avgScores now contains avg score of most 3 recent scores.
      // TEMP FOR TESTING
      avgScores = [[50,50],[20,30],[70,90],[40,5]]; 
      // TEMP FOR TESTING

      var dataPoints = avgScores.length;
      var status = 0;
      var lastRound = false;

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

      var animate = function(data) {
        status += (100 * 1./dataPoints);
        progressBar(status);

        if (!lastRound) {
          var thisRoundData = [data.shift()];
        } else {
          var thisRoundData = '';
        }

        path(thisRoundData);
        movingAvg(thisRoundData);


        if (!lastRound) {
          setTimeout(function() {
            // status += (100 * 1./totalDays);
            // $rootScope.$broadcast('status', status);
            if (data.length > 0) {
              animate(data);
            } else {
              lastRound = true;
              animate();
            }
          }, 1100);
        }
      };

      var initR = 10;
      var r = 100;
      var thickness = 3;

      var ripples = function(position) {
        // for (var i = 1; i < 5; ++i) {
        var circle = svg.append("circle")
          .attr("cx", position[0])
          .attr("cy", position[1])
          .attr("r", initR - (thickness / 2))
          .attr('class', 'other-ripples')
          .style("stroke-width", thickness)
        .transition()
          // .delay(Math.pow(i, 2.5) * 50)
          .duration(1000).ease('quad-in')
          .attr("r", r)
          .style("stroke-opacity", 0)
          .each("end", function () {
              d3.select(this).remove();
          });
        
      };

      var movingAvg = function(data) {
        // circle
        // data join
        var others = svg.selectAll("circle.others")
          .data(data)
        
        // update
        others.transition().duration(1000)
          .tween('ripple', function(d, i) {
            console.log('tween', d, i, this);
            return function() {
              ripples([this.cx.animVal.value, this.cy.animVal.value]);
            }.bind(this)
          })
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
            .transition().duration(1000)
          .attr({r: 15})
            .transition().duration(1000)
          .attr({r: 5})
            .transition().duration(1000)
          .attr({r: 15})
            .transition().duration(1000)
          .attr({r: 5})
            .transition().duration(1000)
          .attr({r: 10})
      }


      var path = function(data) {
        // path
        // data join
        var trail = svg.selectAll(".trail")
          .data(data)
        
        // update
        trail
          .attr({
            d: function(d) {return trail.attr('d') + ' L ' + translateX(d[0]) + ' ' + translateY(d[1]); },
          });

        // enter
        trail.enter()
          .append('path')
          .attr({
            class: 'trail',
            'stroke-dasharray': '2,4,2',
            d: function(d) {return 'M ' + translateX(d[0]) + ' ' + translateY(d[1]); },
          })
      }


      var progressBar = function(status) {
        // PROGRESS BAR
        // data join
        if (status === 100) {
          $rootScope.$broadcast('complete');
        }
        var progress = d3.select('.graph').selectAll('progress')
          .data([status]);

        // update 
        progress.transition().ease('linear').duration(1000)
          .attr({
            value: function(d) { return d; }
          });

        // enter
        progress.enter()
          .append('progress')
          .attr({
            max: 100,
            value: function(d) { return d; }
          })
      };

      progressBar(status);
      animate(avgScores);
    }
  }
}])


.factory('PointGraph', ['$rootScope', 
  function($rootScope) {
  return {
    dailyAvg: function(data, margin) {
      var recentScores = [];
      for (var i = 0; i < data.length; i++) {
        var numScores = data[i].scores.length;
        var userScores = [];
        for (var j = 3; j > 0; j--) {
          if (j > numScores) {
            userScores.push([]);
          } else {
            userScores.push([data[i].scores[numScores - j].x,data[i].scores[numScores - j].y]);
          }
        }
        recentScores.push(userScores);
      }
      // recentScores now contains x arrays (one per user) of most 3 recent scores.

      var avgScores = [[50,50]];
      for (var i = 0; i < 3; i++) {
        var totalX = 0;
        var totalY = 0;
        var num = 0;
        for (var j = 0; j < recentScores.length; j++) {
          // console.log(recentScores[j][0])
          if (recentScores[j][i][0] !== undefined) {
            totalX += recentScores[j][i][0];
            totalY += recentScores[j][i][1];
            num += 1;
          }
        }
        if (num > 0) {
          avgScores.push([totalX/num, totalY/num]);
        }
      }
      // avgScores now contains avg score of most 3 recent scores.
      // TEMP FOR TESTING
      avgScores = [[50,50],[20,30],[70,90],[40,5]]; 
      // TEMP FOR TESTING

      var dataPoints = avgScores.length;
      var status = 0;
      var lastRound = false;

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

      var animate = function(data) {
        status += (100 * 1./dataPoints);
        progressBar(status);

        if (!lastRound) {
          var thisRoundData = [data.shift()];
        } else {
          var thisRoundData = '';
        }

        path(thisRoundData);
        movingAvg(thisRoundData);


        if (!lastRound) {
          setTimeout(function() {
            // status += (100 * 1./totalDays);
            // $rootScope.$broadcast('status', status);
            if (data.length > 0) {
              animate(data);
            } else {
              lastRound = true;
              animate();
            }
          }, 1100);
        }
      };

      var initR = 10;
      var r = 100;
      var thickness = 3;

      var ripples = function(position) {
        // for (var i = 1; i < 5; ++i) {
        var circle = svg.append("circle")
          .attr("cx", position[0])
          .attr("cy", position[1])
          .attr("r", initR - (thickness / 2))
          .attr('class', 'other-ripples')
          .style("stroke-width", thickness)
        .transition()
          // .delay(Math.pow(i, 2.5) * 50)
          .duration(1000).ease('quad-in')
          .attr("r", r)
          .style("stroke-opacity", 0)
          .each("end", function () {
              d3.select(this).remove();
          });
        
      };

      var movingAvg = function(data) {
        // circle
        // data join
        var others = svg.selectAll("circle.others")
          .data(data)
        
        // update
        others.transition().duration(1000)
          .tween('ripple', function(d, i) {
            console.log('tween', d, i, this);
            return function() {
              ripples([this.cx.animVal.value, this.cy.animVal.value]);
            }.bind(this)
          })
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
            .transition().duration(1000)
          .attr({r: 15})
            .transition().duration(1000)
          .attr({r: 5})
            .transition().duration(1000)
          .attr({r: 15})
            .transition().duration(1000)
          .attr({r: 5})
            .transition().duration(1000)
          .attr({r: 10})
      }


      var path = function(data) {
        // path
        // data join
        var trail = svg.selectAll(".trail")
          .data(data)
        
        // update
        trail
          .attr({
            d: function(d) {return trail.attr('d') + ' L ' + translateX(d[0]) + ' ' + translateY(d[1]); },
          });

        // enter
        trail.enter()
          .append('path')
          .attr({
            class: 'trail',
            'stroke-dasharray': '2,4,2',
            d: function(d) {return 'M ' + translateX(d[0]) + ' ' + translateY(d[1]); },
          })
      }


      var progressBar = function(status) {
        // PROGRESS BAR
        // data join
        if (status === 100) {
          $rootScope.$broadcast('complete');
        }
        var progress = d3.select('.graph').selectAll('progress')
          .data([status]);

        // update 
        progress.transition().ease('linear').duration(1000)
          .attr({
            value: function(d) { return d; }
          });

        // enter
        progress.enter()
          .append('progress')
          .attr({
            max: 100,
            value: function(d) { return d; }
          })
      };

      progressBar(status);
      animate(avgScores);
    }
  }
}]);