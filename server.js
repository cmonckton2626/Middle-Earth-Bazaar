const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const session = require("express-session");


const port = process.env.PORT ? process.env.PORT : "3000";
const authController = require("./controllers/auth.js");
const shopController = require("./controllers/shoppes.js");
const passUserToView = require("./middleware/pass-user-to-view.js");
const isSignedIn = require("./middleware/is-signed-in.js");
const Shoppe = require("./models/shoppe.js");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}. 💍`);
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/shoppes", async (req, res) => {
  const allShoppes = await Shoppe.find();
  res.render("shoppes/shoppes", { shoppes: allShoppes });
});

app.use("/auth", authController);
app.use(isSignedIn);
app.use("/shoppes/shoppe", shopController);






app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});
