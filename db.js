import mysql from "mysql2";

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password24@#",
  database:"rishblog"
})
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database.');
  }
});