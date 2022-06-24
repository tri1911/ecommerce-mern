import React from "react";
import FormSubmitButton from "../Shared/FormSubmitButton";
import InputField from "../Shared/InputField";
import AccountFormWrapper from "./ManageAccountForm";

export default function UpdatePassword() {
  return (
    <AccountFormWrapper title="Change Password">
      <InputField
        type="password"
        label="Current Password"
        placeholder="Enter current password"
      />
      <InputField
        type="password"
        label="New Password"
        placeholder="Enter new password"
      />
      <InputField
        type="password"
        label="Confirm Password"
        placeholder="Enter confirm password"
      />
      <div className="mt-6">
        <FormSubmitButton label="Save Change" />
      </div>
    </AccountFormWrapper>
  );
}
