const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "<your stripe secret key>"
);
const app = express();
const port = 3000;
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, currency, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description: "Test development",

      shipping: {
        name: "<customer-anem>",
        address: {
          line1: "Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      amount: amount,
      currency: "USD",
      payment_method_types: ["card"],
    });
    console.log(paymentIntent);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: "Error creating payment intent" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
