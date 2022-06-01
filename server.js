const express = require("express");
const app = express();
const helmet = require("helmet");
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51KQuSuSBe5QxKGr0eXggWg7dAmoP06fB2ifebBEDRgQQrTTn00DN1C110S3y4RGJikwUoUzldJrFjhChc0mFSQ4T00PXtlJMrW');
app.use(express.static("public"));
app.use(helmet());
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "stripe.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);


const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));