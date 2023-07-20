import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
    } else {
      const response = await fetch(
        "http://localhost:3000/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 1000,
            currency: "usd",
            paymentMethodId: paymentMethod.id,
          }),
        }
      );

      const data = await response.json();

      stripe
        .confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        })
        .then(handlePaymentResult)
        .catch(handleError);
    }
  };

  const handlePaymentResult = (result) => {
    if (result.error) {
      console.error(result.error);
    } else {
      console.log(result.paymentIntent);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
