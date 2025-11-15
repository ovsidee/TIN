-- support of foreign keys (important for SQLite)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Project
(
    project_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS Task
(
    task_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    status      TEXT DEFAULT 'pending',
    created_at  TEXT DEFAULT CURRENT_TIMESTAMP,

    --fk to project
    project_fk  INTEGER,
    FOREIGN KEY (project_fk) REFERENCES Project (project_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);