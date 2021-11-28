import Router from 'express';
import StudentControllers from '../controllers/student.controllers';

const routes = Router();

routes.get('/courses', StudentControllers.getAllCourses);
routes.get('/quizes', StudentControllers.getAllQuizes);
routes.get('/questions', StudentControllers.getAllQuestions);

export default routes;
