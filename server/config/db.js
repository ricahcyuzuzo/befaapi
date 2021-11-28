import mysql from 'mysql';
import dbConfig from './db.config';

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    port: 3306
});


connection.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

export default connection;