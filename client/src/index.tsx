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
            <Route path="wishlist" element={<Wishlist />} />
          </Route>
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-complete" element={<OrderCompletePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
