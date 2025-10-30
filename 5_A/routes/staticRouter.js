const router = require("express").Router();
const path = require("path");

router.get("/class1", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/class1/index.html"));
});

router.get("/class2", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/class2/index.html"));
});

router.get("/class4", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/class4/index.html"));
});

module.exports = router;