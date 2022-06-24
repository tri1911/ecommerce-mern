import FormSubmitButton from "../Shared/FormSubmitButton";
import InputField from "../Shared/InputField";

export default function ResetPasswordForm() {
  return (
    <form>
      <InputField
        label="Email Address"
        type="email"
        placeholder="Enter your Email Address"
        required
      />
      <div className="mt-4">
        <FormSubmitButton label="Reset Password" />
      </div>
    </form>
  );
}
