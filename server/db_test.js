var db = require("./models")
var domainName = 'github.io'
var userName = 'john'


var domain = new db.Domain({name: domainName})

domain.save(function (err) {
  if (err) throw err;
  console.log("saved: ", domain)
  db.Domain.find({ name: domainName }, function (err, rec) {
    console.log("queried: ", typeof rec[0], rec[0])
    var user = new db.User({username: userName, email: userName + "@" + domainName, code: 'sgsdggr4344r'})
    rec[0].users.push(user);
    rec[0].save(function (err) {
      console.log("User saved!!!")
    })
  });
});