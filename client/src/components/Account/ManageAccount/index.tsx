import AccountInfo from "./AccountInfo";
import RecentOrders from "./RecentOrders";

export default function ManageAccount() {
  return (
    <div className="space-y-10">
      <AccountInfo />
      <RecentOrders />
    </div>
  );
}
