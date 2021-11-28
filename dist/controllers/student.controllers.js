"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  }]);

  return StudentControllers;
}();

var _default = StudentControllers;
exports["default"] = _default;