const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

var publishable_Key = "";

var secret_Key = "";

const stripe = require("stripe")(secret_Key);

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("home", {
    key: publishable_Key,
  });
});

app.post("/payment", function (req, res) {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "sharath",
      address: {
        line1: "Mavinakoppa",
        postal_code: "577418",
        city: "Hosanagara",
        state: "Karnataka",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.charges.create({
        amount: 2500,
        description: "stripe integration to web",
        currency: "INR",
        customer: customer.id,
      });
    })
    .then((charge) => {
      res.send("success");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, function (err) {
  if (err) {
    throw error;
  }
  console.log("server created succesfully");
});
