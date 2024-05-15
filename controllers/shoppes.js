const express = require("express");
const { route } = require("./auth");
const router = express.Router();

const  Shoppe = require('../models/shoppe.js');

router.get("/new", (req, res) => {
    res.render("shoppes/new.ejs");
});

router.post("/", async (req, res) => {
    try {
        const newShoppeData = {
            shoppeName: req.body.shoppeName,
            location: req.body.location,
            shoppeKeeper: req.body.shoppeKeeper,
            shoppePhoto: req.body.shoppePhoto
        };
        const existingShoppe = await Shoppe.findOne(newShoppeData)
            if (existingShoppe !== null) {
                res.send("This shop already exists.")
            } else {
                const newShoppe = await Shoppe.create(newShoppeData)
                if (newShoppe !== null) {
                    res.render("/shoppes", {  })
                } else {
                    res.send("failed to create")
                }
            }
        
        res.redirect("/shoppes");
    } catch (error) {
        console.log(error);
        res.redirect("/shoppes/shoppe/new");
    }
});

// const existingShoppeData = {
        //     shoppeName: req.body.shoppeName,
        //     location: req.body.location,
        //     shoppeKeeper: req.body.shoppeKeeper
        // };
        // const existingShoppe = await Shoppe.findOne(existingShoppeData)
        // 

module.exports = router;