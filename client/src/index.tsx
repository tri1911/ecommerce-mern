import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "App";
import "index.css";
import { store } from "app/store";

import HomePage from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import MyAccountPage from "pages/MyAccountPage";
import ProfileSummary from "pages/MyAccountPage/ManageAccount/ProfileSummary";
import ProfileEditForm from "pages/MyAccountPage/ManageAccount/ManageProfile/ProfileEditForm";
import AddressesList from "pages/MyAccountPage/ManageAccount/ManageAddress/AddressesList";
import AddressEditForm from "pages/MyAccountPage/ManageAccount/ManageAddress/AddressEditForm";
import AddressAddForm from "pages/MyAccountPage/ManageAccount/ManageAddress/AddressAddForm";
import UpdatePasswordForm from "pages/MyAccountPage/ManageAccount/ManagePassword/UpdatePasswordForm";
import MyOrders from "pages/MyAccountPage/ManageOrders/OrdersList/MyOrders";
import OrderDetails from "pages/MyAccountPage/ManageOrders/OrdersList/OrderDetails";
import OrderReturns from "pages/MyAccountPage/ManageOrders/OrderReturns/OrderReturns";
import OrderReturnDetails from "pages/MyAccountPage/ManageOrders/OrderReturns/OrderReturnDetails";
import OrderCancellations from "pages/MyAccountPage/ManageOrders/OrderCancellations";
import MyReviews from "pages/MyAccountPage/ManageOrders/OrderReviews/MyReviews";
import ReviewDetails from "pages/MyAccountPage/ManageOrders/OrderReviews/ReviewDetails";
import PaymentMethods from "pages/MyAccountPage/ManagePayment/PaymentMethods";
import PaymentDetails from "pages/MyAccountPage/ManagePayment/PaymentDetails";
import Voucher from "pages/MyAccountPage/Voucher";
import Wishlist from "pages/MyAccountPage/Wishlist";

import ShopPage from "pages/ShopPage";
import ShopByCategoryPage from "pages/ShopByCategoryPage";
import SingleProductPage from "pages/SingleProductPage";
import CartPage from "pages/CartPage";
import ForgotPasswordPage from "pages/ForgotPasswordPage";
import NotFoundPage from "pages/NotFoundPage";
import CheckoutPage from "pages/CheckoutPage";
import OrderCompletePage from "pages/OrderCompletePage";
import TrackOrderPage from "pages/TrackOrderPage";
import FAQPage from "pages/FAQPage";
import PaymentPage from "pages/PaymentPage";
import ContactPage from "pages/ContactPage";
import AboutUsPage from "pages/AboutUsPage";

import ExperimentPage from "components/experiment";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="account" element={<MyAccountPage />}>
            <Route path="summary" element={<ProfileSummary />} />
            <Route path="profile" element={<ProfileEditForm />} />
            <Route path="address">
              <Route index element={<AddressesList />} />
              <Route path="edit" element={<AddressEditForm />} />
              <Route path="add" element={<AddressAddForm />} />
            </Route>
            <Route path="password" element={<UpdatePasswordForm />} />
            <Route path="order">
              <Route index element={<MyOrders />} />
              <Route path="details" element={<OrderDetails />} />
            </Route>
            <Route path="order-return">
              <Route index element={<OrderReturns />} />
              <Route path="details" element={<OrderReturnDetails />} />
            </Route>
            <Route path="order-cancel" element={<OrderCancellations />} />
            <Route path="reviews">
              <Route index element={<MyReviews />} />
              <Route path="details" element={<ReviewDetails />} />
            </Route>
            <Route path="payment-method">
              <Route index element={<PaymentMethods />} />
              <Route path="details" element={<PaymentDetails />} />
            </Route>
            <Route path="voucher" element={<Voucher />} />
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path="shop" element={<ShopPage />} />
          <Route
            path="categories/:categoryId"
            element={<ShopByCategoryPage />}
          />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="order-complete" element={<OrderCompletePage />} />
          <Route path="track-order" element={<TrackOrderPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/experiment" element={<ExperimentPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
