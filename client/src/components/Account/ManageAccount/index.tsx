import PersonalInfo from "./PersonalInfo";
import RecentOrders from "./RecentOrders";

export default function ManageAccount() {
  return (
    <div className="space-y-10">
      <PersonalInfo />
      <RecentOrders />
    </div>
  );
}
