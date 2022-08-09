import PersonalInfo from "./PersonalInfo";
import RecentOrders from "./RecentOrders";

export default function ProfileSummary() {
  return (
    <div className="space-y-10">
      <PersonalInfo />
      <RecentOrders />
    </div>
  );
}
