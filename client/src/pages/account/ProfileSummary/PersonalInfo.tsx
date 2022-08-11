import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { fetchUserProfile } from "slices/profile.slice";
import NotificationMessage from "components/Shared/NotificationMessage";
import { Address, User } from "services/user.service";

export function InfoCard({
  title,
  href,
  children,
}: {
  title?: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <div className="flex justify-between items-center mb-4">
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

function DraftPlaceholderCard() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-400 rounded w-1/4" />
      <div className="h-4 bg-gray-400 rounded w-3/4" />
      <div className="h-4 bg-gray-400 rounded w-1/2" />
    </div>
  );
}

function PersonalInfo({ profile }: { profile?: User }) {
  return (
    <InfoCard title="Personal Profile" href="/account/profile">
      {!profile ? (
        <DraftPlaceholderCard />
      ) : (
        <>
          <h4 className="text-gray-700 font-medium">
            {profile.firstName} {profile.lastName}
          </h4>
          <p className="text-gray-800">{profile.email}</p>
          <p className="text-gray-800">{profile.phone}</p>
        </>
      )}
    </InfoCard>
  );
}

function AddressCard({ address }: { address?: Address }) {
  return (
    <InfoCard title="Shipping Address" href="/account/address">
      {!address ? (
        <DraftPlaceholderCard />
      ) : (
        <>
          <h4 className="text-gray-700 font-medium">{address.fullName}</h4>
          <p className="text-gray-800">{address.address}</p>
          <p className="text-gray-800">
            {address.city}, {address.province}, {address.country}
          </p>
          <p className="text-gray-800">{address.phone}</p>
        </>
      )}
    </InfoCard>
  );
}

export default function AccountInfo() {
  const [errorMessage, setErrorMessage] = useState("");
  const profile = useAppSelector((state) => state.profile.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfile())
        .unwrap()
        .catch((error) => {
          setErrorMessage(error.errorMessage || error.message);
        });
    }
  }, [dispatch, profile]);

  let shippingAddress, billingAddress;

  if (profile) {
    shippingAddress = profile.addresses.find(
      (address) => address._id === profile.shippingAddress
    );
    billingAddress = profile.billingAddress
      ? profile.addresses.find(
          (address) => address._id === profile.billingAddress
        )
      : shippingAddress;
  }

  return errorMessage ? (
    <NotificationMessage variant="error" text={errorMessage} />
  ) : (
    <div className="grid md:grid-cols-3 gap-4">
      <PersonalInfo profile={profile} />
      <AddressCard address={shippingAddress} />
      <AddressCard address={billingAddress} />
    </div>
  );
}
