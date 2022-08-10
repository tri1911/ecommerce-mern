import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "hooks";
import { Address } from "services/user.service";
import { CITIES, COUNTRIES, PROVINCES } from "utils/constants";
import { addNewAddress } from "slices/profile.slice";
import CheckBox from "components/Form/CheckBox";
import Select from "components/Form/Select";
import TextInput from "components/Form/TextInput";
import NotificationMessage from "components/Shared/NotificationMessage";

type Message = { type: "success" | "error"; text: string };
type AddressAddFormValues = Omit<Address, "_id"> & { isDefault: boolean };

export default function AddressAddForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<Message | undefined>(undefined);

  const dispatch = useAppDispatch();

  const initialValues = {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
    isDefault: false,
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Please enter your full name"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    address: Yup.string().required("Address is required"),
    city: Yup.mixed().oneOf(CITIES).required("City is required"),
    province: Yup.mixed().oneOf(PROVINCES).required("Province is required"),
    country: Yup.mixed().oneOf(COUNTRIES).required("Country is required"),
    postalCode: Yup.string().required("Postal Code is required"),
    isDefault: Yup.boolean(),
  });

  const showMessage = (message: Message) => {
    setMessage(message);
    setTimeout(() => setMessage(undefined), 2000);
  };

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <Formik<AddressAddFormValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ isDefault, ...newAddress }, { resetForm }) => {
          setIsSaving(true);
          dispatch(addNewAddress({ newAddress, isDefault }))
            .unwrap()
            .then((created) => {
              showMessage({
                type: "success",
                text: `Successfully create ${created.firstName}'s address`,
              });
              resetForm();
            })
            .catch((error) => {
              console.error(error);
              showMessage({
                type: "error",
                text: error.message,
              });
            })
            .finally(() => {
              setIsSaving(false);
            });
        }}
      >
        {({ dirty }) => (
          <Form>
            <h3 className="text-lg font-medium capitalize mb-4">Add Address</h3>
            {message && (
              <div className="mb-4">
                <NotificationMessage
                  variant={message.type}
                  text={message.text}
                />
              </div>
            )}
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <TextInput
                  label="Full Name"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                />
                <TextInput
                  label="Phone Number"
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div>
                <TextInput
                  label="Address"
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="City" name="city">
                  <option>Select your city</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
                <Select label="Province" name="province">
                  <option>Select your province</option>
                  {PROVINCES.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="Country" name="country">
                  <option>Select your country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </Select>
                <TextInput
                  label="Postal Code"
                  type="text"
                  name="postalCode"
                  placeholder="Enter your Postal Code"
                />
              </div>
              <CheckBox name="isDefault">Make this my default address</CheckBox>
              <div>
                <button
                  type="submit"
                  className="default-btn py-2 flex justify-center disabled:cursor-not-allowed disabled:bg-primary/80 disabled:text-white"
                  disabled={!dirty || isSaving}
                >
                  {isSaving ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  ) : (
                    "Create Address"
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
