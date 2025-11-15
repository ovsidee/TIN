const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const PORT = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// db connection
const DB_FILE = path.join(__dirname, 'db');
const db = new sqlite3.Database(DB_FILE, (err) => {
    if (err) console.error("error while getting the db: ", err.message);
});

// api for sending data as json
const apiRouter = require('./routes/api');
app.use('/api', apiRouter(db));

//post routes for tasks
app.post("/tasks/add", (req, res) => {
    const { description, status, project_fk } = req.body;

    if (!description || description.trim().length < 3) {
        return res.status(400).send("Description too short.");
    }
    if (!["pending", "done"].includes(status)) {
        return res.status(400).send("Invalid status.");
    }
    if (!Number.isInteger(Number(project_fk))) {
        return res.status(400).send("Invalid project.");
    }

    const sql = `
        INSERT INTO Task (description, status, project_fk, created_at)
        VALUES (?, ?, ?, datetime('now'))
    `;

    db.run(sql, [description, status, project_fk], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Error while inserting the task");
        }
        // redirect to tasks list
        res.redirect("/");
    });
});
app.post("/tasks/delete/:id", (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM Task WHERE task_id = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send("Error while deleting the task");
        }

        return res.redirect("/");
    });
});

// html routes (getters of the page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});
app.get('/tasks/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/edit.html'));
});
app.get('/tasks/delete/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/delete.html'));
});
app.get('/tasks/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/add.html'));
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
});