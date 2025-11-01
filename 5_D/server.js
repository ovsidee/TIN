const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const people = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/person', (req, res) => {
    const { name, surname, age, password } = req.body;

    const errorMessage  = validatePerson(name, surname, age, password);
    if (errorMessage ) {
        let htmlError = fs.readFileSync(path.join(__dirname, 'public/error.html'), 'utf8');
        htmlError = htmlError.replace('${error}', errorMessage);
        return res.status(400).send(htmlError);
    }

    const ageNum = parseInt(age);
    const birthYear = new Date().getFullYear() - ageNum;

    people.push({ name, surname, ageNum, birthYear });

    let htmlSuccess = fs.readFileSync(path.join(__dirname, 'public/success.html'), 'utf8');
    htmlSuccess = htmlSuccess
        .replace('${name}', name)
        .replace('${surname}', surname)
        .replace('${birthYear}', birthYear);

    res.status(200).send(htmlSuccess);

    console.log(`Person added successfully, current list is:`, people);
})

function validatePerson(name, surname, age, password ) {
    const nameRegex = /^[A-Za-z\s]+$/;
    // at least 8 characters, one uppercase, one number
    const passRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!name || !surname || !age || !password) {
        return "All fields are required.";
    }

    if (!nameRegex.test(name) || !nameRegex.test(surname)) {
        return "Name and surname must contain only letters and spaces.";
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120 || ageNum < 18) {
        return "Age must be a positive number and be in range 18-120.";
    }

    if (!passRegex.test(password)) {
        return "Password must have at least 8 characters, one uppercase letter, and one number.";
    }

    return null;
}

app.listen(port, () => console.log(`Server is running on port ${port}`));

app.use((req, res) => {
    res.status(404).send("Not Found");
});