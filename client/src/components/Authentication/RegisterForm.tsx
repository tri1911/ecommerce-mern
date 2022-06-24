import React from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";

export default function RegisterForm() {
  return (
    <form>
      <div className="space-y-4">
        <InputField
          type="text"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        <InputField
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          required
        />
        <InputField
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
        />
        <InputField
          type="password"
          label="Confirm Password"
          placeholder="Confirm your Password"
          required
        />
      </div>
      <div className="flex items-center mt-6">
        <input
          type="checkbox"
          id="agreement"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer"
        />
        <label
          htmlFor="agreement"
          className="text-gray-600 ml-3 cursor-pointer"
        >
          I have read and agree to the &nbsp;
          <Link to="#" className="text-primary">
            terms &amp; conditions
          </Link>
        </label>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-medium"
        >
          Create Account
        </button>
      </div>
    </form>
  );
}
