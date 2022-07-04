import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import SingleProductPage from "./pages/SingleProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MyAccountPage from "./pages/MyAccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import ManageAccount from "./components/Account/ManageAccount";
import ProfileInfo from "./components/Account/ProfileInfo";
import AddressInfo from "./components/Account/AddressInfo";
import UpdatePassword from "./components/Account/UpdatePassword";
import Wishlist from "./components/Account/Wishlist";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import ExperimentPage from "./components/experiment";
import MyOrders from "./components/Account/MyOrders";
import OrderCancellations from "./components/Account/OrderCancellations";
import MyReviews from "./components/Account/MyReviews";
import ReviewDetails from "./components/Account/ReviewDetails";
import TrackOrderPage from "./pages/TrackOrderPage";
import OrderDetails from "./components/Account/OrderDetails";
import MyReturns from "./components/Account/MyReturns";
import OrderReturnDetails from "./components/Account/OrderReturnDetails";
import FAQPage from "./pages/FAQPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentMethods from "./components/Account/PaymentMethods";
import PaymentDetails from "./components/Account/PaymentDetails";
import Voucher from "./components/Account/Voucher";
import ContactPage from "./pages/ContactPage";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="account" element={<MyAccountPage />}>
            {/* <Route index element={<ManageAccount />} /> */}
            <Route path="manage" element={<ManageAccount />} />
            <Route path="profile" element={<ProfileInfo />} />
            <Route path="address" element={<AddressInfo />} />
            <Route path="password" element={<UpdatePassword />} />
            <Route path="order">
              <Route index element={<MyOrders />} />
              <Route path="details" element={<OrderDetails />} />
            </Route>
            <Route path="order-return">
              <Route index element={<MyReturns />} />
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
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="order-complete" element={<OrderCompletePage />} />
          <Route path="track-order" element={<TrackOrderPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/experiment" element={<ExperimentPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
