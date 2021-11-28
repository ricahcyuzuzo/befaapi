import conn from '../config/db';

class StudentControllers {
    static async getAllCourses (req, res) {
        const { userId } = req.query;
        conn.query(`SELECT * FROM payments WHERE student = '${userId}' AND transactionStatus = 'SUCCESS'`, (error, results, fields) => {
            if(error) throw error;
            if(!results[0]){
                conn.query(`SELECT id, GUID, instructor, title, summary, video, createdAt, updatedAt FROM courses LIMIT 3`, (err, result, field) => {
                    if(err) throw err;
                    res.status(200).json({
                        data: result,
                        status: 200,
                    });
                })
            }else{
                conn.query(`SELECT id, GUID, instructor, title, summary, video, createdAt, updatedAt FROM courses`, (err, result, field) => {
                    if(err) throw err;
                    res.status(200).json({
                        data: result,
                        status: 200,
                    });
                })
            }
        });
    }

    static async getAllQuizes (req, res) {
        const { userId } = req.query;

        conn.query(`SELECT * FROM payments WHERE student = '${userId}' AND transactionStatus = 'SUCCESS'`, (error, results, fields) => {
            if(error) throw error;
            if(!results[0]){
                res.status(404).json({
                    message: "Ntasomo ribonetse",
                    status: 404
                });
            }else{
                conn.query('SELECT * FROM quiz', (err, result, field) => {
                    if(err) throw err;
                    res.status(200).json({
                        data: result,
                        status: 200
                    })
                })
            }
        })
    }

    static async getAllQuestions (req, res) {
        const { quizId } = req.query;

        conn.query(`SELECT q.*, a.optionId as answer FROM questions q INNER JOIN answers a ON a.questionId = q.id WHERE q.quiz = '${quizId}'`, (error, results, fields) => {
            if(error) throw error;

            if(!results[0]){
                res.status(404).json({
                    messsage: 'Nta bibazo byabonetse',
                    status: 404,
                })
            }else{
                res.status(200).json({
                    data: results,
                    status: 200,
                })
            }
        })
    }
}

export default StudentControllers;
