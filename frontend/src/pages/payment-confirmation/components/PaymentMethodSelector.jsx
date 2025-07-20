import React from "react";
import Button from "../../../components/ui/Button";
import api from "../../../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentMethodSelector = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handlePhonePePayment = async () => {
    const res = await api.post("/bookings", {
      movieId: state.movieId,
      showtime: state.showtime,
      seats: state.seats,
      amount: state.amount,
    });
    window.location.href = res.data.payUrl;
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      <Button
        className="bg-purple-600 text-white"
        onClick={handlePhonePePayment}
      >
        Pay with PhonePe
      </Button>
    </div>
  );
};

export default PaymentMethodSelector;
