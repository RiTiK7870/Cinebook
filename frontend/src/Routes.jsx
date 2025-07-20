import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import AdminDashboard from "pages/admin-dashboard";
import PaymentConfirmation from "pages/payment-confirmation";
import UserDashboard from "pages/user-dashboard";
import SeatSelection from "pages/seat-selection";
import MovieDetail from "pages/movie-detail";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/movie-detail" element={<MovieDetail />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;