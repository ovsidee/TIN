const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db');
const DB_SCRIPTS_PATH = path.join(__dirname, 'public', 'dbScripts');
const CREATE_SCRIPT_PATH = path.join(DB_SCRIPTS_PATH, 'create.sql');
const DATA_SCRIPT_PATH = path.join(DB_SCRIPTS_PATH, 'data.sql');

let createSql;
let dataSql;

try {
    createSql = fs.readFileSync(CREATE_SCRIPT_PATH, 'utf8');
    dataSql = fs.readFileSync(DATA_SCRIPT_PATH, 'utf8');
} catch (err) {
    console.error('something wrong with the *.sql files:', err.message);
    process.exit(1);
}

const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) return console.error('error opening database:', err.message);
    console.log(`connected to the database: ${DB_FILE}`);
});

db.serialize(() => {
    console.log('running create.sql...');
    db.exec(createSql, (err) => {
        if (err) {
            console.error('error executing create.sql:', err.message);
            db.close();
            return;
        }
        console.log('tables created successfully!');

        console.log('running data.sql...');

        const sqlCheck = `SELECT COUNT(*) AS count FROM Task`;

        // get() runs sqlCheck query and gets a single row
        db.get(sqlCheck, [], (err, row) => {
            if (err) {
                console.error('error checking task count:', err.message);
                db.close();
                return;
            }

            if (row.count === 0) {
                console.log('table is empty, running data.sql...');

                db.exec(dataSql, (err) => {
                    if (err) console.error('error running data.sql:', err.message);
                    else console.log('data seeded successfully!');

                    db.close((err) => {
                        if (err) return console.error('error closing the database:', err.message);
                        console.log('database created successfully!');
                    });
                });
            } else {
                //not empty
                console.log('table already has data. data.sql skipped.');

                db.close((err) => {
                    if (err) return console.error('error closing the database:', err.message);
                    console.log('database created successfully!');
                });
            }
        });
    });
});