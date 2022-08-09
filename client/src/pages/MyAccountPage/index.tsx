import { Outlet } from "react-router-dom";
import Breadcrumbs from "components/Shared/Breadcrumbs";
import AccountSideBar from "pages/MyAccountPage/AccountSideBar";

// TODO: Dropdown menu in mobile screen & hide the sidebar
export default function MyAccountPage() {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "My Account" }]} />
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
