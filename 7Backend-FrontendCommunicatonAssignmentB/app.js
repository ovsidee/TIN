const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html");
});

app.get("/status", (req, res) => {
    const cpuUsage = Math.floor(Math.random() * 100); // 0 to 100%
    const ramUsage = Math.floor(Math.random() * 16000); // 0 to 16000 MB
    const activeUsers = Math.floor(Math.random() * 500); // 0 to 500
    const timestamp = new Date().toLocaleTimeString();

    const data = {
        cpu: cpuUsage,
        ram: ramUsage,
        users: activeUsers,
        time: timestamp
    };

    res.json(data);
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));