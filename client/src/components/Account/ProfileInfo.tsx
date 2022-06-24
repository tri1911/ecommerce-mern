import React from "react";
import FormSubmitButton from "../Shared/FormSubmitButton";
import InputField from "../Shared/InputField";

// TODO: abstract the `select` control
export default function ProfileInfo() {
  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <form>
        <h3 className="text-lg font-medium capitalize mb-4">
          Profile Information
        </h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              value="Elliot"
              placeholder="Enter your first name"
            />
            <InputField
              label="Last Name"
              value="Ho"
              placeholder="Enter your last name"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              type="date"
              label="Birthday"
              value="2000-11-19"
              placeholder="Enter your birthday"
            />
            <div>
              <label className="text-gray-600 mb-2 block">Gender</label>
              <select
                name="gender"
                className="w-full block border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                value="male"
              >
                <option value="none">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Email"
              value="example@email.com"
              placeholder="Enter your email address"
            />
            <InputField
              label="Phone Number"
              value="+123 456 789"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mt-6">
            <FormSubmitButton label="Save Change" />
          </div>
        </div>
      </form>
    </div>
  );
}
