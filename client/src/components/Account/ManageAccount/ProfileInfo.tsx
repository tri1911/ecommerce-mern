import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../Form/TextInput";
import Select from "../../Form/Select";
import { Gender, UserProfile } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateProfile } from "../../../slices/profile.slice";
import { useState } from "react";
import NotificationMessage from "../../Shared/NotificationMessage";

export default function ProfileInfo() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<
    { variant: "success" | "error"; text: string } | undefined
  >(undefined);

  const dispatch = useAppDispatch();
  const profileInfo = useAppSelector((state) => state.profile.data);

  const initialValues = {
    firstName: profileInfo?.firstName ?? "",
    lastName: profileInfo?.lastName ?? "",
    birthday: profileInfo?.birthday?.split("T")[0],
    gender: profileInfo?.gender,
    email: profileInfo?.email ?? "",
    phone: profileInfo?.phone ?? "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    birthday: Yup.date(),
    gender: Yup.string().oneOf(Object.values(Gender), "Invalid gender"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email address is required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

  const showNotification = (variant: "success" | "error", text: string) => {
    setMessage({ variant, text });
    setTimeout(() => setMessage(undefined), 2000);
  };

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <Formik<UserProfile>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            setIsUpdating(true);
            const updatedProfile = await dispatch(
              updateProfile(values)
            ).unwrap();
            showNotification(
              "success",
              `Successfully update ${updatedProfile.firstName}'s profile`
            );
          } catch (error: any) {
            if (error.errorMessage) {
              showNotification("error", error.errorMessage);
            } else if (error.message) {
              showNotification("error", error.message);
            }
          } finally {
            setIsUpdating(false);
          }
        }}
      >
        <Form>
          <h3 className="text-lg font-medium capitalize mb-4">
            Profile Information
          </h3>
          <div className="mb-5">
            {message && (
              <NotificationMessage
                variant={message.variant}
                text={message.text}
              />
            )}
          </div>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="First Name"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
              />
              <TextInput
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="Birthday"
                type="date"
                name="birthday"
                placeholder="Enter your birthday"
              />
              <Select label="Gender" name="gender">
                <option>Select your gender</option>
                {Object.values(Gender).map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                type="email"
                label="Email"
                name="email"
                placeholder="Enter your email address"
              />
              <TextInput
                type="text"
                label="Phone Number"
                name="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <button
                type="submit"
                className="default-btn py-2 flex justify-center disabled:cursor-not-allowed disabled:bg-primary/80 disabled:text-white"
                disabled={isUpdating}
              >
                {isUpdating ? (
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
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
