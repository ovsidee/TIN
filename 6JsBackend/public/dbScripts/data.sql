-- "INSERT OR IGNORE" will skip inserting if the 'something' already exists
INSERT OR IGNORE INTO Project (project_name)
VALUES ('Personal');
INSERT OR IGNORE INTO Project (project_name)
VALUES ('Work');
INSERT OR IGNORE INTO Project (project_name)
VALUES ('School');
INSERT OR IGNORE INTO Project (project_name)
VALUES ('Shopping');
INSERT OR IGNORE INTO Project (project_name)
VALUES ('Hobby');

INSERT OR IGNORE INTO Task (description, status, project_fk)
VALUES ('Create pull-request for the project',
        'pending',
        (SELECT project_id FROM Project WHERE project_name = 'Work'));

INSERT OR IGNORE INTO Task (description, status, project_fk)
VALUES ('Buy skyr and protein',
        'pending',
        (SELECT project_id FROM Project WHERE project_name = 'Shopping'));

INSERT OR IGNORE INTO Task (description, status, project_fk)
VALUES ('Preparing for the exams',
        'pending',
        (SELECT project_id FROM Project WHERE project_name = 'School'));

INSERT OR IGNORE INTO Task (description, status, project_fk)
VALUES ('Come up with a new idea for a thesis',
        'done',
        (SELECT project_id FROM Project WHERE project_name = 'Personal'));

INSERT OR IGNORE INTO Task (description, status, project_fk)
VALUES ('Game with friends',
        'done',
        (SELECT project_id FROM Project WHERE project_name = 'Hobby'));