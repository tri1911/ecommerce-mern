import { Link } from "react-router-dom";
import FormSubmitButton from "../Shared/FormSubmitButton";
import InputField from "../Shared/InputField";

export default function LoginForm() {
  return (
    <form>
      <div className="space-y-4">
        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter your Email Address (e.g. example@email.com)"
          required
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter your Password"
          required
        />
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="text-gray-600 ml-3 cursor-pointer"
            >
              Remember Me
            </label>
          </div>
          <Link to="/forgot-password" className="text-primary">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          <FormSubmitButton label="Login" fluid />
        </div>
      </div>
    </form>
  );
}
