const mysql = require('mysql2');


const db = mysql.createConnection({
    host: '34.101.154.226',
    user: 'root',
    password: 'firmanikhsan12',
    database: 'kolhub'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL!');
    }
  });

module.exports = db