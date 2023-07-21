import React from "react";
import { Link } from "react-router-dom";
export const Success = () => {
  return (
    <div className="container d-flex justify-content-center vh-100 align-items-center">
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title">Successful transaction</h5>

          <Link to={"/"} className="btn btn-success">
            return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
