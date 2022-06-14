const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.static("public"));
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
//   res.header("Access-Control-Allow-Headers");
//   next();
// });
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
exports.createPaymentIntent = functions.https.onRequest((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  cors()(req, res, () => {
    const {id, amount} = req.body;
    const stripe = require("stripe")(functions.config().stripe.secret_key);
    try {
      const payment = stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Spatula company",
        payment_method: id,
        confirm: true,
      });
      console.log("Payment", payment);
      res.json({
        message: "Payment successful",
        success: true,
      });
    } catch (error) {
      console.log("Error", error),
      res.json({
        message: "Payment failed",
        success: false,
      });
    }
    res.send("hello i am here");
  });
  res.send("hello i am here");
});
