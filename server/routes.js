var promise = require("./promises");

var SEND_MAIL = true; // TURN ON/OFF EMAILS

exports.resendVerifyEmail = function (req, res) {
  promise.userData(req.param("user"), req.param("domain")).then(function (result) {
      promise.sendVerifyMail(result).then(function () {
        res.send(200, {status: 'sent'});
      }, function (e) {
        res.send(500, e);
      });
    }, function (e) {
      res.send(500, e);
  });
};

exports.verifyUserEmail = function (req, res) {
  promise.verifyUser(req.param("code")).then(function (result) {
      res.send(200, "Verified, go back to the app!");
  }, function (e) {
      res.send(500, "Error. Not able to verify email.");
  });
};

exports.addUser = function (req, res) {
  promise.addUser(req.param("user"), req.param("domain")).then(function (result) {
    if (result.status === 'new' && SEND_MAIL) {
      promise.sendVerifyMail(result.data).then(function () {
        res.send(200, {status: 'new'});
      }, function (e) {
        res.send(500, e);
      });
    } else {
      res.send(200, {status: result.status});
    }
    }, function (e) {
      res.send(500, e);
  });
};

exports.getVerificationStatus = function (req, res) {
  promise.userData(req.param("user"), req.param("domain")).then(function (result) {
      res.send(200, {status: result.verified});
  }, function (e) {
      res.send(500, e);
  });
};