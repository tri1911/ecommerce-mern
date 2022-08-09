import { Outlet } from "react-router-dom";
import Layout from "components/Layout";
import CartDrawer from "components/Cart/CartDrawer";

export default function App() {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <CartDrawer />
    </>
  );
}
