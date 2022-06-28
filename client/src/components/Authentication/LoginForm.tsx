import { Link } from "react-router-dom";
import TextInput from "../Form/TextInput";
import FormSubmitButton from "../Shared/FormSubmitButton";

import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import CheckBox from "../Form/CheckBox";

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const handleSubmit: (
    values: LoginFormValues,
    formikHelpers: FormikHelpers<LoginFormValues>
  ) => void | Promise<any> = (values, actions) => {
    // do something with form values
    console.log(values);
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Must be at least 6 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean().required("Required"),
  });

  return (
    <Formik<LoginFormValues>
      initialValues={{ email: "", password: "", rememberMe: false }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="space-y-4">
          <TextInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your Email Address"
            required
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your Password"
            required
          />
          <div className="flex items-center justify-between mt-6">
            <CheckBox name="rememberMe">Remember Me</CheckBox>
            <Link to="/forgot-password" className="text-primary">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-4">
            <FormSubmitButton label="Login" fluid />
          </div>
        </div>
      </Form>
    </Formik>
  );
}
