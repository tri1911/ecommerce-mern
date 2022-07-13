import { PlusIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteAddress,
  getAllAddresses,
  selectAddressesRequestStatus,
  selectAllAddresses,
} from "../../../slices/address.slice";
import { Address } from "../../../types";

function AddressItem({
  address: {
    id,
    phone,
    fullName,
    country,
    province,
    city,
    address,
    postalCode,
    isDefault,
  },
  onRemoveAddress,
}: {
  address: Address;
  onRemoveAddress: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <div className="flex flex-col justify-between rounded bg-white shadow border">
      <div className="divide-y">
        {isDefault && (
          <div className="px-3 py-2">
            <h4 className="text-base font-medium capitalize text-gray-800">
              Default
            </h4>
          </div>
        )}
        <div className="p-3 space-y-1 text-sm text-gray-800">
          <h4 className="font-medium uppercase">{fullName}</h4>
          <p>{address}</p>
          <p>
            {city}, {province} {postalCode} {country}
          </p>
          <p>Phone number: {phone}</p>
        </div>
      </div>

      <div className="px-3 pb-2 pt-10 text-xs space-x-2 divide-x text-blue-500">
        <Link
          to={`/account/address/edit?id=${id}`}
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
        <button className="pl-2 hover:text-orange-400 hover:underline">
          Set as default
        </button>
      </div>
    </div>
  );
}

function AddAddressItem() {
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
  const dispatch = useAppDispatch();
  const addresses = useAppSelector(selectAllAddresses);
  const addressesRequestStatus = useAppSelector(selectAddressesRequestStatus);

  const handleRemoveAddress = (id: string) => () => {
    dispatch(deleteAddress(id));
  };

  useEffect(() => {
    if (addressesRequestStatus === "idle") {
      dispatch(getAllAddresses());
    }
  }, [addressesRequestStatus, dispatch]);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <AddAddressItem />
      {addresses.map((address) => (
        <AddressItem
          key={address.id}
          address={address}
          onRemoveAddress={handleRemoveAddress(address.id)}
        />
      ))}
    </div>
  );
}
