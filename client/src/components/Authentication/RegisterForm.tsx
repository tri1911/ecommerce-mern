import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import FormSubmitButton from "../Shared/FormSubmitButton";
import TextInput from "../Form/TextInput";
import CheckBox from "../Form/CheckBox";

interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export default function RegisterForm() {
  const handleSubmit: (
    values: RegisterFormValues,
    formikHelpers: FormikHelpers<RegisterFormValues>
  ) => void | Promise<any> = (values, actions) => {
    // do something with form values here
    console.log(values);
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Please enter your full name"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and conditions."),
  });

  return (
    <Formik<RegisterFormValues>
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="space-y-4">
          <TextInput
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="John Doe"
            required
          />
          <TextInput
            type="email"
            label="Email Address"
            name="email"
            placeholder="Enter your email"
            required
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <TextInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your Password"
            required
          />
        </div>
        <div className="mt-6">
          <CheckBox name="acceptedTerms">
            I have read and agree to the &nbsp;
            <Link to="#" className="text-primary">
              terms &amp; conditions
            </Link>
          </CheckBox>
        </div>
        <div className="mt-4">
          <FormSubmitButton label="Create Account" fluid />
        </div>
      </Form>
    </Formik>
  );
}
