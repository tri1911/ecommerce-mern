import { PlusIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import { addresses } from "../../../data/addresses";
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
}: {
  address: Address;
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
        <Link
          to="/manage/address/edit"
          className="pl-2 hover:text-orange-400 hover:underline"
        >
          Remove
        </Link>
        <Link
          to="/manage/address/edit"
          className="pl-2 hover:text-orange-400 hover:underline"
        >
          Set as default
        </Link>
      </div>
    </div>
  );
}

function AddAddressItem() {
  return (
    <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded bg-white shadow divide-y">
      <div className="p-14">
        <PlusIcon className="w-10 h-10 mx-auto mb-3" />
        <span className="font-roboto text-base font-medium text-gray-600">
          Add Address
        </span>
      </div>
    </div>
  );
}

export default function AddressesList() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <AddAddressItem />
      {addresses.map((address) => (
        <AddressItem key={address.id} address={address} />
      ))}
    </div>
  );
}
