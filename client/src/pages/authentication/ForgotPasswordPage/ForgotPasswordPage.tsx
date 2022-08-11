import Breadcrumbs from "components/Shared/Breadcrumbs";
import FormWrapper from "components/Authentication/FormWrapper";
import FormHeader from "components/Authentication/FormHeader";
import ResetPasswordForm from "pages/authentication/ForgotPasswordPage/ResetPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Forgot Password" }]} />
      <FormWrapper>
        <FormHeader
          title="Reset Password"
          text="Please enter your email address below to receive a link."
        />
        <ResetPasswordForm />
      </FormWrapper>
    </div>
  );
}
