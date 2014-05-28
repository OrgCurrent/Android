angular.module('app.opinion', [])
.controller('OpinionCtrl', function($scope, $ionicModal) {
  console.log('opinion');
  $scope.$emit('opinion');
  $scope.pointer = false;

  $scope.clickGraph = function(event) {
    console.log(event);
    $scope.pointer = true;
    $scope.r = 10;
    $scope.cx = event.offsetX;
    $scope.cy = event.offsetY;
    $scope.showCircle = true;
  };
    
      // var initR = 100, 
      // r = 400, 
      // thickness = 20;

//   var svg = d3.select(".main-content")
//           .append("svg");

//   d3.select("body")
//           .on("touchstart", touch)
//           .on("touchend", touch);

//   function touch() {
//       d3.event.preventDefault();

//       var arc = d3.svg.arc()
//               .outerRadius(initR)
//               .innerRadius(initR - thickness);
              
//               console.log(d3.touches(svg.node()));
              
//       var g = svg.selectAll("g.touch")
//               .data(d3.touches(svg.node()), function (d) {
//                   return d.identifier;
//               });

//       g.enter()
//           .append("g")
//           .attr("class", "touch")
//           .attr("transform", function (d) {
//               return "translate(" + d[0] + "," + d[1] + ")";
//           })
//           .append("path")
//               .attr("class", "arc")
//               .transition().duration(2000).ease('linear')
//               .attrTween("d", function (d) {
//                   var interpolate = d3.interpolate(
//                           {startAngle: 0, endAngle: 0},
//                           {startAngle: 0, endAngle: 2 * Math.PI}
//                       );
//                   return function (t) {
//                       return arc(interpolate(t));
//                   };
//               })
//               .each("end", function (d) {
//                   if (complete(g))
//                       ripples(d);
//                   g.remove();
//               });

//       g.exit().remove().each(function () {
//           this.__stopped__ = true;
//       });
//   }

//     function complete(g) {
//         return g.node().__stopped__ != true;
//     }

//     function ripples(position) {
//         for (var i = 1; i < 5; ++i) {
//             var circle = svg.append("circle")
//                     .attr("cx", position[0])
//                     .attr("cy", position[1])
//                     .attr("r", initR - (thickness / 2))
//                     .style("stroke-width", thickness / (i))
//                 .transition()
//                     .delay(Math.pow(i, 2.5) * 50)
//                     .duration(2000).ease('quad-in')
//                     .attr("r", r)
//                     .style("stroke-opacity", 0)
//                     .each("end", function () {
//                         d3.select(this).remove();
//                     });
//         }
//     }
//   }

//   $ionicModal.fromTemplateUrl('../templates/modal.html', {
//     scope: $scope,
//     animation: 'slide-in-up'
//   }).then(function(modal) {
//     $scope.modal = modal;
//     console.log('modal!');
//   });
//   $scope.openModal = function() {
//     $scope.modal.show();
//   };
//   $scope.closeModal = function() {
//     $scope.modal.hide();
//   };
//   //Cleanup the modal when we're done with it!
//   $scope.$on('$destroy', function() {
//     $scope.modal.remove();
//   });
//   // Execute action on hide modal
//   $scope.$on('modal.hide', function() {
//     // Execute action
//   });
//   // Execute action on remove modal
//   $scope.$on('modal.removed', function() {
//     // Execute action
//   });

})