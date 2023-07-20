import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51N8eOaSBMLlszcWaZ3hbLqSCSuj0bccPBzWaJicaRhrEbUhUdHLmsFAmgCCgLwgMwfj4jQ6CKY5RKBUFCHRB8Ww800MMrJiICE"
);

const App = () => {
  return (
    <div className="App">
      <h1>My Stripe App</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default App;
