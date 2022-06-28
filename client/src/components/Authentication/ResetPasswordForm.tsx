import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import FormSubmitButton from "../Shared/FormSubmitButton";
import TextInput from "../Form/TextInput";

interface ResetPasswordFormProps {
  email: string;
}

export default function ResetPasswordForm() {
  const handleSubmit: (
    values: ResetPasswordFormProps,
    formikHelpers: FormikHelpers<ResetPasswordFormProps>
  ) => void | Promise<any> = (values, helpers) => {
    // do something with form values here
    console.log(values);
    helpers.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  return (
    <Formik<ResetPasswordFormProps>
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <TextInput
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your Email Address"
          required
        />
        <div className="mt-4">
          <FormSubmitButton label="Reset Password" />
        </div>
      </Form>
    </Formik>
  );
}
