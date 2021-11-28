"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _db = _interopRequireDefault(require("./db.config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connection = _mysql["default"].createConnection({
  host: _db["default"].HOST,
  user: _db["default"].USER,
  password: _db["default"].PASSWORD,
  database: _db["default"].DB,
  port: 3306
});

connection.connect(function (err) {
  if (err) throw err;
  console.log('Database connected');
});
var _default = connection;
exports["default"] = _default;