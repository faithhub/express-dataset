const sqlite3 = require('sqlite3').verbose();


const DBSOURCE = "mydb.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    } else {
        console.log("Connected to database.");
    }
});

module.exports = db;

// open the database
// let db = new sqlite3.Database('./db/express-data.db', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Connected to the express-data database.');
// });

// db.close((err) => {
//     if (err) {
//         return console.error(err.message);
//     }
//     console.log('Close the database connection.');
// });