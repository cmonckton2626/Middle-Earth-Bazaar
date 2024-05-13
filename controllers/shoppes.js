const express = require("express");
const { route } = require("./auth");
const router = express.Router();

const shoppe = require('../models/shoppe.js');

router.get("/", (req, res) => {
    res.render("shoppes/shoppes.ejs");
});

router.get("/new", (req, res) => {
    res.render("shoppes/new.ejs");
});



module.exports = router;