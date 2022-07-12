import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProfileInfo } from "../../../slices/profile.slice";

export function InfoCard({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex justify-between items center mb-4">
        <h3 className="font-medium capitalize text-gray-800 text-lg">
          {title}
        </h3>
        {href && (
          <Link to={href} className="text-primary">
            Edit
          </Link>
        )}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export default function PersonalInfo() {
  const profileInfo = useAppSelector((state) => state.profile.data);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profileInfo) {
      dispatch(fetchProfileInfo());
    }
  }, [profileInfo, dispatch]);

  if (!profileInfo) {
    return null;
  }

  const { firstName, lastName, email, phone } = profileInfo;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <InfoCard title="Personal Profile" href="/account/profile">
        <h4 className="text-gray-700 font-medium">
          {firstName} {lastName}
        </h4>
        <p className="text-gray-800">{email}</p>
        <p className="text-gray-800">{phone}</p>
      </InfoCard>
      <InfoCard title="Shipping Address" href="/account/address">
        <h4 className="text-gray-700 font-medium">Elliot Ho</h4>
        <p className="text-gray-800">5572 Wales Street</p>
        <p className="text-gray-800">Vancouver, BC, Canada</p>
        <p className="text-gray-800">(123) 456-789</p>
      </InfoCard>
      <InfoCard title="Billing Address" href="/account/address">
        <h4 className="text-gray-700 font-medium">Elliot Ho</h4>
        <p className="text-gray-800">5572 Wales Street</p>
        <p className="text-gray-800">Vancouver, BC, Canada</p>
        <p className="text-gray-800">(123) 456-789</p>
      </InfoCard>
    </div>
  );
}
