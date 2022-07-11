import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormSubmitButton from "../Shared/FormSubmitButton";
import TextInput from "../Form/TextInput";
import Select from "../Form/Select";
import { Gender, UserProfile } from "../../types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { updateProfile } from "../../slices/profile.slice";

export default function ProfileInfo() {
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

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <Formik<UserProfile>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            await dispatch(updateProfile(values)).unwrap();
          } catch (error: any) {
            if (error.errorMessage) {
              console.error(error.errorMessage);
            } else {
              console.error("there is something wrong");
            }
          }
        }}
      >
        <Form>
          <h3 className="text-lg font-medium capitalize mb-4">
            Profile Information
          </h3>
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
            <div className="mt-6">
              <FormSubmitButton label="Save Change" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
