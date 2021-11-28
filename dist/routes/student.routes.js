"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _student = _interopRequireDefault(require("../controllers/student.controllers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = (0, _express["default"])();
routes.get('/courses', _student["default"].getAllCourses);
routes.get('/quizes', _student["default"].getAllQuizes);
routes.get('/questions', _student["default"].getAllQuestions);
routes.get('/options', _student["default"].getAllOptions);
routes.get('/answers', _student["default"].getAllAnswers);
var _default = routes;
exports["default"] = _default;