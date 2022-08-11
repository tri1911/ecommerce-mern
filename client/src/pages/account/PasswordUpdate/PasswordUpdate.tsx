import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "hooks";
import { updatePassword } from "slices/profile.slice";
import Password from "components/Form/Password";
import NotificationMessage from "components/Shared/NotificationMessage";

interface PasswordUpdateValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function PasswordUpdate() {
  const dispatch = useAppDispatch();

  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<
    { variant: "success" | "error"; text: string } | undefined
  >(undefined);

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
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

  const showNotification = (variant: "success" | "error", text: string) => {
    setMessage({ variant, text });
    setTimeout(() => setMessage(undefined), 2000);
  };

  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <Formik<PasswordUpdateValues>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({ currentPassword, newPassword }, { resetForm }) => {
          try {
            setIsUpdating(true);
            const result = await dispatch(
              updatePassword({ currentPassword, newPassword })
            ).unwrap();
            showNotification(
              "success",
              `Updated ${result.firstName}'s profile successfully`
            );
            resetForm();
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
            Change Password
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
            <Password
              label="Current Password"
              name="currentPassword"
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
                  "Update"
                )}
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
