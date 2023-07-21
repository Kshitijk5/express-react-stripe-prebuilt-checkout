import React, { useState } from "react";
import "./card.css";
export const Home = () => {
  const [amount, setAmount] = useState(0);

  const handleAmount = () => {
    if (amount < 5 || isNaN(amount)) {
      alert("Amount should be greater than 5 rupees!/should be a valid number");
      return;
    }

    createOrder();
  };

  const createOrder = async () => {
    const response = await fetch(
      `http://localhost:3000/create-session/${amount}`,
      { method: "POST" }
    );
    if (!response.ok) {
      return;
    }
    const responseJson = await response.json();
    window.location.href = responseJson.url;
  };

  return (
    <div
      className="d-flex vh-100 justify-content-center align-items-center flex-column gap-3"
      style={{ backgroundColor: " #7257fa" }}
    >
      <div className="card">
        <h3 className="card__title">Payment Modal</h3>
        <input
          className="card__content rounded-2 px-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min={5}
          placeholder="₹"
        />
        <div className="card__date">April 7, 2023</div>
        <div className="card__arrow">
          <i className="text-white" onClick={handleAmount}>
            Pay
          </i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="15"
            width="15"
          >
            <path
              fill="#fff"
              d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
