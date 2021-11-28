"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _db = _interopRequireDefault(require("../config/db"));

var _genUid = _interopRequireDefault(require("gen-uid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AuthController = /*#__PURE__*/function () {
  function AuthController() {
    _classCallCheck(this, AuthController);
  }

  _createClass(AuthController, null, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, names, phone, password, passwordHash, post;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, names = _req$body.names, phone = _req$body.phone, password = _req$body.password;
                passwordHash = _crypto["default"].createHash('sha256').update(password).digest('hex');
                post = {
                  GUID: _genUid["default"].v4(),
                  names: names,
                  phone: phone,
                  password: passwordHash,
                  verified: 0,
                  verificationCode: 0,
                  role: '3',
                  createdAt: new Date(),
                  updatedAt: new Date()
                };

                _db["default"].query('INSERT INTO users SET ?', post, function (error, results, fields) {
                  if (error) throw error;
                  res.status(201).json({
                    message: 'Wiyandikishije neza',
                    status: 201
                  });
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }

      return signUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, phone, password, hashedPassword;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, phone = _req$body2.phone, password = _req$body2.password;
                hashedPassword = _crypto["default"].createHash('sha256').update(password).digest('hex');

                _db["default"].query("SELECT * FROM users WHERE phone = '".concat(phone, "' AND password = '").concat(hashedPassword, "' AND role = '3'"), function (error, results, fields) {
                  if (error) throw error;

                  if (results[0]) {
                    res.status(200).json({
                      message: 'Winjiye neza',
                      status: 200,
                      data: results[0].userId
                    });
                  } else {
                    res.status(404).json({
                      message: 'Injiza amakuru y\'ibanga nyayo'
                    });
                  }
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function signIn(_x3, _x4) {
        return _signIn.apply(this, arguments);
      }

      return signIn;
    }()
  }]);

  return AuthController;
}();

var _default = AuthController;
exports["default"] = _default;