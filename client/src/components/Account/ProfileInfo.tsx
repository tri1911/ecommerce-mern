import React from "react";
import FormSubmitButton from "../Shared/FormSubmitButton";
import InputField from "../Shared/InputField";
import SelectField from "../Shared/SelectField";
import AccountFormWrapper from "./ManageAccountForm";

export default function ProfileInfo() {
  return (
    <AccountFormWrapper title="Profile Information">
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
        <SelectField title="Gender" name="gender" value="male">
          <option value="none">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </SelectField>
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
    </AccountFormWrapper>
  );
}
