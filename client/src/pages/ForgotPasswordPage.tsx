import FormHeader from "../components/Authentication/FormHeader";
import FormWrapper from "../components/Authentication/FormWrapper";
import ResetPasswordForm from "../components/Authentication/ResetPasswordForm";
import Breadcrumbs from "../components/Shared/Breadcrumbs";

export default function ForgotPasswordPage() {
  return (
    <div>
      <Breadcrumbs paths={["Forgot Password"]} />
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
