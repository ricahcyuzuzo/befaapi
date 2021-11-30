"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _moment = _interopRequireDefault(require("moment"));

var _db = _interopRequireDefault(require("../config/db"));

var _genUid = _interopRequireDefault(require("gen-uid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StudentControllers = /*#__PURE__*/function () {
  function StudentControllers() {
    _classCallCheck(this, StudentControllers);
  }

  _createClass(StudentControllers, null, [{
    key: "getAllCourses",
    value: function () {
      var _getAllCourses = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var userId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userId = req.query.userId;

                _db["default"].query("SELECT * FROM payments WHERE student = '".concat(userId, "' AND transactionStatus = 'SUCCESS'"), function (error, results, fields) {
                  if (error) throw error;

                  if (!results[0]) {
                    _db["default"].query("SELECT id, GUID, instructor, title, summary, video, createdAt, updatedAt FROM courses LIMIT 3", function (err, result, field) {
                      if (err) throw err;
                      res.status(200).json({
                        data: result,
                        status: 200
                      });
                    });
                  } else {
                    _db["default"].query("SELECT id, GUID, instructor, title, summary, video, createdAt, updatedAt FROM courses", function (err, result, field) {
                      if (err) throw err;
                      res.status(200).json({
                        data: result,
                        status: 200
                      });
                    });
                  }
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAllCourses(_x, _x2) {
        return _getAllCourses.apply(this, arguments);
      }

      return getAllCourses;
    }()
  }, {
    key: "getAllQuizes",
    value: function () {
      var _getAllQuizes = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var userId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userId = req.query.userId;

                _db["default"].query("SELECT * FROM payments WHERE student = '".concat(userId, "' AND transactionStatus = 'SUCCESS'"), function (error, results, fields) {
                  if (error) throw error;

                  if (!results[0]) {
                    res.status(404).json({
                      message: "Ntasomo ribonetse",
                      status: 404
                    });
                  } else {
                    _db["default"].query('SELECT * FROM quiz', function (err, result, field) {
                      if (err) throw err;
                      res.status(200).json({
                        data: result,
                        status: 200
                      });
                    });
                  }
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllQuizes(_x3, _x4) {
        return _getAllQuizes.apply(this, arguments);
      }

      return getAllQuizes;
    }()
  }, {
    key: "getAllQuestions",
    value: function () {
      var _getAllQuestions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var quizId;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                quizId = req.query.quizId;

                _db["default"].query("SELECT q.*, a.optionId as answer FROM questions q INNER JOIN answers a ON a.questionId = q.id WHERE q.quiz = '".concat(quizId, "'"), function (error, results, fields) {
                  if (error) throw error;

                  if (!results[0]) {
                    res.status(404).json({
                      messsage: 'Nta bibazo byabonetse',
                      status: 404
                    });
                  } else {
                    res.status(200).json({
                      data: results,
                      status: 200
                    });
                  }
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getAllQuestions(_x5, _x6) {
        return _getAllQuestions.apply(this, arguments);
      }

      return getAllQuestions;
    }()
  }, {
    key: "getAllOptions",
    value: function () {
      var _getAllOptions = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _db["default"].query('SELECT * FROM options', function (error, results, fields) {
                  if (error) throw error;

                  if (!results[0]) {
                    res.status(404).json({
                      status: 404,
                      message: 'No options'
                    });
                  } else {
                    res.status(200).json({
                      status: 200,
                      data: results
                    });
                  }
                });

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getAllOptions(_x7, _x8) {
        return _getAllOptions.apply(this, arguments);
      }

      return getAllOptions;
    }()
  }, {
    key: "getAllAnswers",
    value: function () {
      var _getAllAnswers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _db["default"].query('SELECT * FROM answers', function (error, results, fields) {
                  if (error) throw error;

                  if (!results[0]) {
                    res.status(404).json({
                      status: 404,
                      message: 'No Answers'
                    });
                  } else {
                    res.status(200).json({
                      status: 200,
                      data: results
                    });
                  }
                });

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getAllAnswers(_x9, _x10) {
        return _getAllAnswers.apply(this, arguments);
      }

      return getAllAnswers;
    }()
  }, {
    key: "callBack",
    value: function () {
      var _callBack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _objectDestructuringEmpty(req.body);

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function callBack(_x11, _x12) {
        return _callBack.apply(this, arguments);
      }

      return callBack;
    }()
  }, {
    key: "pay",
    value: function () {
      var _pay = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var phone, userId;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                phone = req.body.phone;
                userId = req.query.userId;

                _db["default"].query("SELECT * FROM users WHERE id='".concat(userId, "'"), function (error, result, field) {
                  var names = result[0].names;

                  _db["default"].query('SELECT * FROM packages', function (error, results, fields) {
                    if (error) throw error;
                    var amount = results[0].amount;
                    var currency = results[0].currency;
                    var period = results[0].period;
                    var description = "Murakoze ".concat(names, ", Ifatabuguzi ").concat(amount, " ").concat(currency, " rizarangira ").concat(period, ".");
                    var randomId = Math.floor(Math.random() * 1000000000);
                    var d = new Date();
                    var year = d.getFullYear();
                    var transactionId = "BEFA-".concat(year, "-").concat(randomId);
                    var post = {
                      GUID: _genUid["default"].v4(),
                      student: userId,
                      transactionID: transactionId,
                      description: description,
                      telephone: phone,
                      paidAmount: amount,
                      transactionStatus: 'INITIAL',
                      expiryDate: period,
                      createAt: new Date(),
                      updatedAt: new Date()
                    };

                    _db["default"].query('INSERT INTO payments SET ?', post, function (error, resu, fiel) {
                      if (error) throw error;

                      _axios["default"].post('https://opay-api.oltranz.com/opay/paymentrequest', {
                        "telephoneNumber": "25".concat(phone),
                        "amount": amount,
                        "organizationId": "f60681b7-f09e-47fd-9a6c-7d1b1b758b09",
                        "description": description,
                        "callbackUrl": "https://www.amategekoyumuhanda.rw/callback.php",
                        "transactionId": transactionId
                      }).then(function (response) {
                        _db["default"].query("UPDATE payments SET statusMessage = '".concat(response.data.description, "', transactionID = '").concat(response.data.body.transactionId, "', walletTransactionID = '").concat(response.data.body.transactionId, "', transactionStatus = '").concat(response.data.status, "', transactionStatusCode = '").concat(response.data.code, "' WHERE transactionID = '").concat(transactionId, "'"), function (err, re, fi) {
                          if (err) throw err;
                          res.status(response.data.code).json({
                            code: response.data.code,
                            message: response.data.description,
                            status: response.data.status
                          });
                        });
                      })["catch"](function (err) {
                        return console.log(err);
                      });
                    });
                  });
                });

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function pay(_x13, _x14) {
        return _pay.apply(this, arguments);
      }

      return pay;
    }()
  }, {
    key: "checkPayment",
    value: function () {
      var _checkPayment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var userId;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                userId = req.query.userId;

                _db["default"].query("SELECT * FROM payments WHERE student = '".concat(userId, "' AND transactionStatus = 'SUCCESS'"), function (error, results, fields) {
                  if (error) throw error;

                  if (!results[0]) {
                    res.status(404).json({
                      message: "Ntabwo mwari wishyura, rangiza kwishyura.",
                      status: 404
                    });
                  } else {
                    res.status(200).json({
                      message: 'Mwishyuye neza, murakoze gukoresha Befa App',
                      status: 200
                    });
                  }
                });

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function checkPayment(_x15, _x16) {
        return _checkPayment.apply(this, arguments);
      }

      return checkPayment;
    }()
  }]);

  return StudentControllers;
}();

var _default = StudentControllers;
exports["default"] = _default;