import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useAppDispatch, useAppSelector } from "hooks";
import { Address } from "services/user.service";
import { removeAddress, updateProfile } from "slices/profile.slice";

function AddressCard({
  address: {
    _id,
    fullName,
    phone,
    country,
    province,
    city,
    address,
    postalCode,
  },
  onRemoveAddress,
  onSetAsDefault,
}: {
  address: Address;
  onRemoveAddress?: React.MouseEventHandler<HTMLButtonElement>;
  onSetAsDefault?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const userShippingAddress = useAppSelector(
    (state) => state.profile.data?.shippingAddress
  );
  const isDefault = userShippingAddress && _id === userShippingAddress;

  return (
    <div className="flex flex-col justify-between rounded bg-white shadow border">
      <div className="divide-y">
        {isDefault && (
          <div className="px-3 py-2 flex items-center space-x-2">
            <h4 className="text-base font-medium capitalize text-gray-800">
              Default
            </h4>
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
          </div>
        )}
        <div className="p-3 space-y-1 text-sm text-gray-800">
          <h4 className="font-medium uppercase">{fullName}</h4>
          <p>{address}</p>
          <p>
            {city}, {province} {postalCode}
          </p>
          <p>{country}</p>
          <p>Phone number: {phone}</p>
        </div>
      </div>

      <div className="px-3 pb-2 pt-10 text-xs space-x-2 divide-x text-blue-500">
        <Link
          to={`/account/address/edit?id=${_id}`}
          className="hover:text-orange-400 hover:underline"
        >
          Edit
        </Link>
        <button
          className="pl-2 hover:text-orange-400 hover:underline"
          onClick={onRemoveAddress}
        >
          Remove
        </button>
        {!isDefault && (
          <button
            className="pl-2 hover:text-orange-400 hover:underline"
            onClick={onSetAsDefault}
          >
            Set as default
          </button>
        )}
      </div>
    </div>
  );
}

function AddItem() {
  return (
    <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded bg-white shadow divide-y">
      <Link to="/account/address/add" className="p-14">
        <PlusIcon className="w-10 h-10 mx-auto mb-3" />
        <span className="font-roboto text-base font-medium text-gray-600">
          Add Address
        </span>
      </Link>
    </div>
  );
}

export default function AddressesList() {
  // const addresses = useAppSelector(selectAllAddresses);
  // const addressesRequestStatus = useAppSelector(selectAddressesRequestStatus);
  // const addressesError = useAppSelector(selectAddressesRequestError);

  // useEffect(() => {
  //   if (addressesRequestStatus === "idle") {
  //     dispatch(getAllAddresses());
  //   }
  // }, [addressesRequestStatus, dispatch]);

  const addresses = useAppSelector((state) => state.profile.data?.addresses);

  const dispatch = useAppDispatch();

  const handleRemoveAddress = (id: string) => () => {
    dispatch(removeAddress(id));
  };

  const handleSetDefault = (id: string) => () => {
    dispatch(updateProfile({ shippingAddress: id }));
  };

  // if (addressesRequestStatus === "loading") {
  //   return <Spinner />;
  // } else if (addressesError) {
  //   return <NotificationMessage variant="error" text={addressesError} />;
  // } else {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <AddItem />
      {addresses?.map((address) => (
        <AddressCard
          key={address._id}
          address={address}
          onRemoveAddress={handleRemoveAddress(address._id)}
          onSetAsDefault={handleSetDefault(address._id)}
        />
      ))}
    </div>
  );
  // }
}
