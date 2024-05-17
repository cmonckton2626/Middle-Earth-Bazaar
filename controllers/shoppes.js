const express = require("express");
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
        res.redirect(`/`);;
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
        res.redirect(`/`);
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
        res.redirect(`/`);
    }
});

router.get("/:shoppeId/:reviewId/editReview", async (req, res) => {
    try {
        const soloShoppe = await Shoppe.findById(req.params.shoppeId);
        res.render("reviews/edit.ejs", { shoppe: soloShoppe, reviewId: req.params.reviewId })
    } catch (error) {
        res.redirect(`/`);
    }
});

router.put("/:shoppeId/:reviewId", async (req, res) => {
    try {
        const editShoppe = await Shoppe.findById(req.params.shoppeId)

        editShoppe.reviews[req.params.reviewId].review = req.body.reviewText
        const modifiedShoppe = await Shoppe.findByIdAndUpdate(
            req.params.shoppeId,
            editShoppe,
            { new: true }
            
        ); 
        res.render("./shoppes/show.ejs", { shoppe: editShoppe })
    } catch (error) {
        res.redirect(`/`);
    }
});

router.delete("/:shoppeId/:reviewId", async (req, res) => {
    const shoppeId = req.params.shoppeId;
    const reviewId = req.params.reviewId;
    try {
        const shoppe = await Shoppe.findById(shoppeId);
        if (!shoppe) {
            return res.status(404).send("Shoppe not found");
        }
        if (reviewId < 0 || reviewId >= shoppe.reviews.length) {
            return res.status(404).send("Review not found");
        }
        shoppe.reviews.splice(reviewId, 1);
        await shoppe.save();

        res.render("./shoppes/show.ejs", { shoppe: shoppe });
    } 
    catch (err) {
        res.redirect(`/`);
    }
});



        
module.exports = router;