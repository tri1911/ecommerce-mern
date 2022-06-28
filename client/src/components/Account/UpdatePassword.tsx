import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import FormSubmitButton from "../Shared/FormSubmitButton";
import Password from "../Form/Password";

interface UpdatePasswordFormValue {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function UpdatePassword() {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const handleSubmit: (
    values: UpdatePasswordFormValue,
    formikHelpers: FormikHelpers<UpdatePasswordFormValue>
  ) => void | Promise<any> = (values, actions) => {
    // do something with form values here
    console.log(values);
    actions.setSubmitting(false);
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Password must match"
    ),
  });

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <Formik<UpdatePasswordFormValue>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h3 className="text-lg font-medium capitalize mb-4">
            Change Password
          </h3>
          <div className="space-y-4">
            <Password
              label="Current Password"
              name="oldPassword"
              placeholder="Enter current password"
            />
            <Password
              label="New Password"
              name="newPassword"
              placeholder="Enter new password"
            />
            <Password
              label="Confirm Password"
              name="confirmNewPassword"
              placeholder="Enter confirm password"
            />
            <div className="mt-6">
              <FormSubmitButton label="Save Change" />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
