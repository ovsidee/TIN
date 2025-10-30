const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/submit', (req, res) => {
    const name = req.body.name;
    const ageNum = Number(req.body.age);
    const email = req.body.email;

    const fs = require('fs');

    let errorMessage = validation(name, ageNum, email);
    if (errorMessage) {
        let htmlError = fs.readFileSync(path.join(__dirname, 'public/errorForm.html'), 'utf8');
        htmlError = htmlError.replace('${error}', errorMessage);

        return res.send(htmlError);
    }

    let htmlResponse = fs.readFileSync(path.join(__dirname, 'public/responseForm.html'), 'utf8');
    htmlResponse = htmlResponse
        .replace('${name}', name)
        .replace('${age}', ageNum)
        .replace('${email}', email);

    res.send(htmlResponse);
});


function validation(name, ageNum, email) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errorMessage = '';

    if (!name || !ageNum || !email) {
        errorMessage = 'All fields are required.';
    } else if (!nameRegex.test(name)) {
        errorMessage = 'Name can only contain letters and spaces.';
    } else if (isNaN(ageNum) || ageNum < 18 || ageNum > 90) {
        errorMessage = 'Age must be a number between 18 and 90.';
    } else if (!emailRegex.test(email)) {
        errorMessage = 'Please enter a valid email address.';
    }

    return errorMessage;
}


app.listen(port, () => console.log(`Server is running on port ${port}`));