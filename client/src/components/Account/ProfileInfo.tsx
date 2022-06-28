import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormSubmitButton from "../Shared/FormSubmitButton";
import TextInput from "../Form/TextInput";
import Select from "../Form/Select";
import { Gender } from "../../types";

interface ProfileFormValue {
  firstName: string;
  lastName: string;
  birthday: string;
  gender?: Gender;
  email: string;
  phone: string;
}

export default function ProfileInfo() {
  const initialValues = {
    firstName: "Elliot",
    lastName: "Ho",
    birthday: "1999-11-19",
    gender: undefined,
    email: "sample@email.com",
    phone: "123-456-7891",
  };

  const handleSubmit: (
    values: ProfileFormValue,
    formikHelpers: FormikHelpers<ProfileFormValue>
  ) => void | Promise<any> = (values, actions) => {
    // do something with form values here
    console.log(values);
    actions.setSubmitting(false);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    birthday: Yup.date().default(() => new Date()),
    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Please choose your gender"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <Formik<ProfileFormValue>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
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
