import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select from "../Form/Select";
import TextInput from "../Form/TextInput";
import FormSubmitButton from "../Shared/FormSubmitButton";

interface AddressFormValue {
  fullName: string;
  phone: string;
  country: string;
  region: string;
  city: string;
  area: string;
  address: string;
}

export default function AddressInfo() {
  const initialValues = {
    fullName: "Elliot Ho",
    phone: "123-456-7891",
    country: "Vietnam",
    region: "Asia",
    city: "Da Nang",
    area: "Hai Chau",
    address: "14 Nguyen Truong To",
  };

  const handleSubmit: (
    values: AddressFormValue,
    formikHelpers: FormikHelpers<AddressFormValue>
  ) => void | Promise<any> = (values, actions) => {
    // do something with form values here
    console.log(values);
    actions.setSubmitting(false);
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Please enter your full name"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    country: Yup.string(),
    region: Yup.string(),
    city: Yup.string(),
    area: Yup.string(),
    address: Yup.string(),
  });

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <Formik<AddressFormValue>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h3 className="text-lg font-medium capitalize mb-4">
            Manage Address
          </h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <TextInput
                label="Full Name"
                name="fullName"
                placeholder="Enter your full name"
              />
              <TextInput
                label="Phone Number"
                name="phone"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="Country" name="country">
                <option>Select your country</option>
                <option>Canada</option>
                <option>Vietnam</option>
                <option>Thailand</option>
              </Select>
              <Select label="Region" name="region">
                <option>Select your region</option>
                <option>Canada</option>
                <option>Vietnam</option>
                <option>Thailand</option>
              </Select>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Select label="City" name="city">
                <option>Select your city</option>
                <option>Canada</option>
                <option>Vietnam</option>
                <option>Thailand</option>
              </Select>
              <Select label="Area" name="area">
                <option>Select your area</option>
                <option>Canada</option>
                <option>Vietnam</option>
                <option>Thailand</option>
              </Select>
            </div>
            <div>
              <TextInput
                label="Address"
                name="address"
                placeholder="Enter your address"
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
