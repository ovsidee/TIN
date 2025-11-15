const express = require('express');
const router = express.Router();

module.exports = (db) => {
    //get all tasks
    router.get('/tasks', (req, res) => {
        const sql = `
            SELECT Task.task_id,
                   Task.description,
                   Task.status,
                   Task.created_at,
                   Project.project_name
            FROM Task
            LEFT JOIN Project ON Task.project_fk = Project.project_id
            ORDER BY task_id DESC;
        `;

        db.all(sql, [], (err, rows) => {
            if (err) return res.status(500).json({error: err.message});
            res.json(rows);
        });
    });

    // get all projects
    router.get('/projects', (req, res) => {
        const sql = `
            SELECT project_id, project_name
            FROM Project
            ORDER BY project_name;
        `;

        db.all(sql, [], (err, rows) => {
            if (err) return res.status(500).json({error: err.message});
            res.json(rows);
        });
    });

    // get a single task
    router.get('/tasks/:id', (req, res) => {
        const sql = `
        SELECT task_id, description, status, project_fk
        FROM Task
        WHERE task_id = ?;
    `;

        db.get(sql, [req.params.id], (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: "Task not found" });
            res.json(row);
        });
    });

    // update a task
    router.post('/tasks/:id/update', (req, res) => {
        const { description, status, project_fk } = req.body;
        const id = req.params.id;

        if (!description || description.trim().length < 3) {
            return res.status(400).json({ error: "Description too short" });
        }

        if (!["pending", "done"].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        if (!Number.isInteger(Number(project_fk))) {
            return res.status(400).json({ error: "Invalid project ID" });
        }

        const sql = `
            UPDATE Task 
            SET description = ?, status = ?, project_fk = ?
            WHERE task_id = ?;
        `;

        db.run(sql, [description, status, project_fk, id], function(err) {
            if (err) return res.status(500).json({ error: err.message });

            return res.json({ message: "updated" });
        });
    });


    return router;
}