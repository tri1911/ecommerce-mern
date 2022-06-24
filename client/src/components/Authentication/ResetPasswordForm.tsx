import FormSubmitButton from "./FormSubmitButton";
import InputField from "./InputField";

export default function ResetPasswordForm() {
  return (
    <form>
      <InputField
        label="Email Address"
        type="email"
        placeholder="Enter your Email Address"
        required
      />
      <div className="w-2/5">
        <FormSubmitButton label="Reset Password" />
      </div>
    </form>
  );
}
