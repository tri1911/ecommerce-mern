import { Link } from "react-router-dom";
import InputField from "./InputField";

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
          <Link to="#" className="text-primary">
            Forgot Password?
          </Link>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-medium"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}
