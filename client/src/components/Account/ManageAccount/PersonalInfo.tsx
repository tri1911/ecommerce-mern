import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchProfileInfo } from "../../../slices/profile.slice";
import NotificationMessage from "../../Shared/NotificationMessage";

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
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!profileInfo) {
      dispatch(fetchProfileInfo())
        .unwrap()
        .catch((error) => {
          setErrorMessage(error.errorMessage || error.message);
        });
    }
  }, [profileInfo, dispatch]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <InfoCard title="Personal Profile" href="/account/profile">
        {!profileInfo ? (
          errorMessage ? (
            <NotificationMessage variant="error" text={errorMessage} />
          ) : (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-400 rounded w-1/4" />
              <div className="h-4 bg-gray-400 rounded w-3/4" />
              <div className="h-4 bg-gray-400 rounded w-1/2" />
            </div>
          )
        ) : (
          <>
            <h4 className="text-gray-700 font-medium">
              {profileInfo.firstName} {profileInfo.lastName}
            </h4>
            <p className="text-gray-800">{profileInfo.email}</p>
            <p className="text-gray-800">{profileInfo.phone}</p>
          </>
        )}
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
