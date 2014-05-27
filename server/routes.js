// var Promise = require("bluebird");
var DB = require("./models");

// var Domain = BB.promisify(DB.Domain);
// var User   = BB.promisify(DB.User);
// var Score  = BB.promisify(DB.Score);


var resolved = function () {
  console.log("saved!!");
}

var rejected = function () {
  console.log("not good!!");
}

var lookupDomain = function (domainName) {
  return new Promise (function (resolved, rejected) {
    domain = new DB.Domain({name: domainName});
    domain.save(function (err) {
      if (err) rejected();
      resolved();
    });
  });
};

var createDomain = function (domainName) {
  return new Promise (function (resolved, rejected) {
    domain = new DB.Domain({name: domainName});
    domain.save(function (err) {
      if (err) rejected();
      resolved();
    });
  });
};



createDomain('steve.us').then(function () {
  console.log("Made it!");
}).catch(function (e) {
  console.log(e);
});

// Q.fcall(promisedStep1)
// .then(promisedStep2)
// .then(promisedStep3)
// .then(promisedStep4)
// .then(function (value4) {
//     // Do something with value4
// })
// .catch(function (error) {
//     // Handle any error from all above steps
// })
// .done();


// exports.addUser = function (req, res) {

//   var user = new Mongo.User({username: userName, code: 'xxxxxxxxx'});

//   Mongo.Domain.find({ name: req.param("domain")}, function (err, result) {
//     if (result.length === 0) {
//       var domain = new Mongo.Domain({name: req.param("domain")})
//       domain.save(function (err) {
//         domain.users.push(user);
//         domain.save(function (err) {

//         })
//       });



//     }
//     var user = new db.User({username: userName, email: userName + "@" + domainName, verified: true, code: 'sgsdggr4344r'})
//     rec[0].users.push(user);
//     rec[0].save(function (err) {
//       console.log("User saved!!!");
//       console.log("User count: ", rec[0].countUsers());
//     })
//   });

// }


// exports.getSeasonEpisodes = function (req, res) {
//   options = getOptions(req.param("season"), 'GET_EPISODES');
//   request.post(options, function (err, response, body) {
//     if (err) throw err;
//     if (body.data != undefined && response.statusCode === 200) {
//       res.send(body.data);
//     } else {
//       throw new Error('GET_EPISODES: '+ response.body.message);
//     }
//   });
// };




// domain.save(function (err) {
//   if (err) throw err;
//   console.log("saved: ", domain)
//   db.Domain.find({ name: domainName }, function (err, rec) {
//     console.log("queried: ", typeof rec[0], rec[0])
//     rec[0].users.push(user);
//     rec[0].save(function (err) {
//       console.log("User saved!!!");
//       console.log("User count: ", rec[0].countUsers());
//     })
//   });
// });