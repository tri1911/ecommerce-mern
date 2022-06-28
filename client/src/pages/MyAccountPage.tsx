import { Outlet } from "react-router-dom";
import AccountSideBar from "../components/Account/AccountSideBar";
import Breadcrumbs from "../components/Shared/Breadcrumbs";

// TODO: Dropdown menu in mobile screen & hide the sidebar
export default function MyAccountPage() {
  return (
    <div>
      <Breadcrumbs paths={["My Account"]} />
      <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        <section className="col-span-3">
          <AccountSideBar />
        </section>
        <section className="col-span-9 mt-6 lg:mt-0">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
