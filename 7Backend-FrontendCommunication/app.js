const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const users = {};
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/form.html'));
});

app.post("/register", (req, res) => {
    const { name, email, password, birthdate } = req.body;

    const nameRegex = /^[A-Za-z ]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !nameRegex.test(name)) {
        return res.json({ success: false, message: "Name may contain only letters and spaces." });
    }

    if (!email || !emailRegex.test(email)) {
        return res.json({ success: false, message: "Email is not valid." });
    }

    if (!password || !passwordRegex.test(password)) {
        return res.json({
            success: false,
            message: "Password must be at least 6 characters and include a number and special character."
        });
    }

    const birth = new Date(birthdate);
    const today = new Date();

    if (isNaN(birth.getTime()) || birth > today) {
        return res.json({ success: false, message: "Birthdate must be a past date." });
    }

    if (users[email]) {
        return res.json({ success: false, message: "User with this email already exists." });
    }

    let age = calculateAge(birthdate);

    users[email] = {
        name,
        email,
        password,
        birthdate,
        age
    };

    console.log("Current Users:", users);

    return res.json({
        success: true,
        message: "Registration successful!",
        age
    });
});

function calculateAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const currentMonth = today.getMonth();
    const birthMonth = birth.getMonth();

    if (currentMonth < birthMonth) {
        age--;
    } else if (currentMonth === birthMonth) {
        const currentDay = today.getDate();
        const birthDay = birth.getDate();

        if (currentDay < birthDay) {
            age--;
        }
    }

    return age;
}

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
