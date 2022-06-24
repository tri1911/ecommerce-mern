import React from "react";
import FormSubmitButton from "../Shared/FormSubmitButton";
import InputField from "../Shared/InputField";
import SelectField from "../Shared/SelectField";
import AccountFormWrapper from "./ManageAccountForm";

export default function AddressInfo() {
  return (
    <AccountFormWrapper title="Manage Address">
      <div className="grid sm:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value="Elliot Ho"
          placeholder="Enter your full name"
        />
        <InputField
          label="Phone Number"
          value="+123 456 789"
          placeholder="Enter your phone number"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField title="Country">
          <option>Select your country</option>
          <option>Canada</option>
          <option>Vietnam</option>
          <option>Thailand</option>
        </SelectField>
        <SelectField title="Region">
          <option>Select your region</option>
          <option>Canada</option>
          <option>Vietnam</option>
          <option>Thailand</option>
        </SelectField>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <SelectField title="City">
          <option>Select your city</option>
          <option>Canada</option>
          <option>Vietnam</option>
          <option>Thailand</option>
        </SelectField>
        <SelectField title="Area">
          <option>Select your area</option>
          <option>Canada</option>
          <option>Vietnam</option>
          <option>Thailand</option>
        </SelectField>
      </div>
      <div>
        <InputField
          label="Address"
          value="5572 Wales Street, BC, Vancouver"
          placeholder="Enter your address"
        />
      </div>
      <div className="mt-6">
        <FormSubmitButton label="Save Change" />
      </div>
    </AccountFormWrapper>
  );
}
