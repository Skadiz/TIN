const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'localhost',
   port: '3306',
   user: 'root',
   password: 'root',
   database: 'TIN2021',
   timezone: 'Europe/Poland'
});
pool.on('connection', conn => {
    conn.query("SET time_zone='+02:00';", error => {
        if(error){
            throw error
        }
    })
})
module.exports = pool;