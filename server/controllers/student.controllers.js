import axios from 'axios';
import moment from 'moment';
import conn from '../config/db';
import uid from 'gen-uid';

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

    static async getAllOptions (req, res){
        conn.query('SELECT * FROM options', (error, results, fields) => {
            if(error) throw error;

            if(!results[0]){
                res.status(404).json({
                    status: 404,
                    message: 'No options'
                })
            }else{
                res.status(200).json({
                    status: 200,
                    data: results
                })
            }
        })
    } 

    static async getAllAnswers (req, res){
        conn.query('SELECT * FROM answers', (error, results, fields) => {
            if(error) throw error;

            if(!results[0]){
                res.status(404).json({
                    status: 404,
                    message: 'No Answers'
                })
            }else{
                res.status(200).json({
                    status: 200,
                    data: results
                })
            }
        })
    } 

    static async pay (req, res) {
        const { phone } = req.body;
        const {userId} = req.query;
        conn.query(`SELECT * FROM users WHERE id='${userId}'`, (error, result, field) => {
            const names = result[0].names;
            conn.query('SELECT * FROM packages', (error, results, fields) => {
                if (error) throw error;
                const amount = results[0].amount;
                const currency = results[0].currency;
                const period = results[0].period;
                const description = `Murakoze ${names}, Ifatabuguzi ${amount} ${currency} rizarangira ${period}.`;

                const randomId = Math.floor(Math.random() * 1000000000);
                const d = new Date();
                let year = d.getFullYear();
                const transactionId = `BEFA-${year}-${randomId}`;
                
                const post = {
                    GUID: uid.v4(),
                    student: userId,
                    transactionID: transactionId,
                    description: description,
                    telephone: phone,
                    paidAmount: amount,
                    transactionStatus: 'INITIAL',
                    expiryDate: period,
                    createAt: new Date(),
                    updatedAt: new Date(),  
                }

                conn.query('INSERT INTO payments SET ?', post, (error, resu, fiel) => {
                    if(error) throw error;

                    axios.post('https://opay-api.oltranz.com/opay/paymentrequest', 
                    {
                        "telephoneNumber" : `25${phone}`,
                        "amount" : amount,
                        "organizationId" : "f60681b7-f09e-47fd-9a6c-7d1b1b758b09",
                        "description" : description,
                        "callbackUrl" : "https://www.amategekoyumuhanda.rw/callback.php",
                        "transactionId" : transactionId
                    })
                    .then((response) => {
                        conn.query(`UPDATE payments SET statusMessage = '${response.data.description}', transactionID = '${transactionId}', walletTransactionID = '${transactionId}', transactionStatus = '${response.data.status}', transactionStatusCode = '${response.data.code}' WHERE transactionID = '${transactionId}'`, (err, re, fi) => {
                            if(err) throw err;
                            res.status(response.data.code).json({
                                code: response.data.code,
                                message: response.data.description,
                                status: response.data.status
                            });  
                        })
                    })
                    .catch(err => console.log(err))

                })

            });
    
        });
    }
}

export default StudentControllers;
