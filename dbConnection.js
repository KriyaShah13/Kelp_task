const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const pool = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
});


pool.connect();


module.exports = pool;  