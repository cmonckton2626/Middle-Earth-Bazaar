const express = require("express");
// const { route } = require("./auth");
const router = express.Router();

const Shoppe = require('../models/shoppe.js');

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

router.get("/:shoppeId", async (req, res) => {
    const soloShoppe = await Shoppe.findById(req.params.shoppeId);
    res.render("./shoppes/show.ejs", { shoppe: soloShoppe })
});

router.get("/:shoppeId/addReview", async (req, res) => {
    try {
        const soloShoppe = await Shoppe.findById(req.params.shoppeId);
        res.render("reviews/new.ejs", { shoppe: soloShoppe });
    } catch (error) {
        console.log(error)
    }
});

router.post("/:shoppeId", async (req, res) => {
    try {
        const user = req.session.user;
        const newReview = { reviewer: user.username, review: req.body.reviewText }
        const shoppe = await Shoppe.findById(req.body.shoppeId);
        shoppe.reviews.push(newReview);
        await shoppe.save();
        res.redirect(`${shoppe._id}`)
    } catch (error) {
        console.log(error)
    }
});

router.get("/:shoppeId/:reviewId/editReview", async (req, res) => {
    try {
        const soloShoppe = await Shoppe.findById(req.params.shoppeId);
        res.render("reviews/edit.ejs", { shoppe: soloShoppe, reviewId: req.params.reviewId })
    } catch (error) {
        console.log(error)
    }
});

router.put("/:shoppeId/:reviewId", async (req, res) => {
    try {
        
        console.log(req.body)
        const editShoppe = await Shoppe.findById(req.params.shoppeId)
        //  editShoppe.reviews.splice(req.params.reviewId, 1)
        editShoppe.reviews[req.params.reviewId].review = req.body.reviewText
        const modifiedShoppe = await Shoppe.findByIdAndUpdate(
            req.params.shoppeId,
            editShoppe,
            { new: true }
            
        ); 
        res.render("./shoppes/show.ejs", { shoppe: editShoppe })
    } catch (error) {
        console.log(error)
    }
});

// edit route i think
// const existingShoppeData = {
        //     shoppeName: req.body.shoppeName,
        //     location: req.body.location,
        //     shoppeKeeper: req.body.shoppeKeeper
        // };
        // const existingShoppe = await Shoppe.findOne(existingShoppeData)
        // 

        
module.exports = router;