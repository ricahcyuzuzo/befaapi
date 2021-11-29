import Router from 'express';
import StudentControllers from '../controllers/student.controllers';

const routes = Router();

routes.get('/courses', StudentControllers.getAllCourses);
routes.get('/quizes', StudentControllers.getAllQuizes);
routes.get('/questions', StudentControllers.getAllQuestions);
routes.get('/options', StudentControllers.getAllOptions);
routes.get('/answers', StudentControllers.getAllAnswers);
routes.post('/pay', StudentControllers.pay);
routes.get('/check', StudentControllers.checkPayment);

export default routes;
