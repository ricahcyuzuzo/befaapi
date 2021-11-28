import crypto from 'crypto';
import conn from '../config/db';
import uid from 'gen-uid';

class AuthController {
    static async signUp (req, res){
        const { names, phone, password } = req.body;

        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
        const post  = {
            GUID: uid.v4(),
            names: names,
            phone: phone,
            password: passwordHash,
            verified: 0,
            verificationCode: 0,
            role: '3',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        conn.query('INSERT INTO users SET ?', post, (error, results, fields) => {
            if (error) throw error;
            res.status(201).json({
                message: 'Wiyandikishije neza',
                status: 201
            });
        });
    }

    static async signIn (req, res) {
        const { phone, password } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        conn.query(`SELECT * FROM users WHERE phone = '${phone}' AND password = '${hashedPassword}' AND role = '3'`, (error, results, fields) => {
            if (error) throw error;
            if(results[0]){
                res.status(200).json({
                    message: 'Winjiye neza',
                    status: 200,
                });
            }
        })
    }


}

export default AuthController;
