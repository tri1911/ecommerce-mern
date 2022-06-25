import React from "react";
import InputField from "../Shared/InputField";

export default function CheckoutForm() {
  return (
    <form>
      <h3 className="text-lg font-medium capitalize mb-4">Billing Details</h3>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <InputField
            label="First Name"
            placeholder="Enter your first name"
            required
          />
          <InputField
            label="Last Name"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div>
          <InputField
            label="Company Name"
            placeholder="Enter your company name"
          />
        </div>
        <div>
          <InputField
            label="County / Region"
            placeholder="Enter region"
            required
          />
        </div>
        <div>
          <InputField
            label="Street Address"
            placeholder="Enter your street address"
            required
          />
        </div>
        <div>
          <InputField label="Town / City" placeholder="Enter City" required />
        </div>
        <div>
          <InputField label="Zip Code" placeholder="Enter zip code" required />
        </div>
        <div>
          <InputField
            label="Phone Number"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div>
          <InputField
            type="email"
            label="Email Address"
            placeholder="Enter your email address"
            required
          />
        </div>
      </div>
    </form>
  );
}
