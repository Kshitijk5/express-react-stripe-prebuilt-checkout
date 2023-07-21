const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")("secretkey");
const app = express();
const port = 3000;
app.use(cors({ origin: "http://localhost:5173" }));

//stripe webhook endpoint

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    let event = request.body;

    const endpointSecret = "<id>";

    if (endpointSecret) {
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    console.log("Event type--> : ", event.type);
    console.log("Status of payment", event.data.object.status);

    switch (event.type) {
      case "customer.subscription.created":
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);

        break;
      case "checkout.session.completed":
        stripe.customers
          .retrieve(event.data.object.customer)
          .then((customer) => {
            console.log("Customer retrieved:--->", customer);
          })
          .catch((error) => {
            console.error("Error retrieving customer:", error);
          });
        break;
      default:
        console.log(`Unhandled event type ${event.type}.`);
    }
    response.send();
  }
);

//middleware
app.use(express.json());

app.post("/create-session/:amount", async (req, res) => {
  const amount = req.params.amount * 100;

  const customer = await stripe.customers.create({
    metadata: {
      userId: "123kk",
      cart: JSON.stringify([
        {
          id: 1,
          name: "Product 1",
          price: 10.99,
          quantity: 2,
        },
        {
          id: 2,
          name: "Product 2",
          price: 15.49,
          quantity: 1,
        },
        {
          id: 3,
          name: "Product 3",
          price: 8.75,
          quantity: 3,
        },
      ]),
    },
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",

          product_data: {
            name: "Agario skin",
            images: ["https://i.imgur.com/ftV3f4b.png"],
            description: "product 2",
          },
          unit_amount: amount * 2,
        },
        quantity: 2,
      },
      {
        price_data: {
          currency: "inr",

          product_data: {
            name: "Agario skin",
            images: ["https://i.imgur.com/ftV3f4b.png"],
            description: "product 2",
          },
          unit_amount: amount * 2,
        },
        quantity: 2,
      },
    ],
    mode: "payment",
    customer: customer.id,
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/home",
  });

  res.json({ url: session.url });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
