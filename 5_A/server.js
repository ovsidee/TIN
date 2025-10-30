const express = require('express');
const path = require('path');
const app = express();
const port = 3030;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/staticResourses.html"));
});

// routes
app.use('/static', require('./routes/staticRouter'));

app.use((req, res) => {
    res.status(404).send("Not Found");
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));