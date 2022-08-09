import { Form, Formik } from "formik";
import { noop } from "types";
import CheckBox from "components/Form/CheckBox";
import TextInput from "components/Form/TextInput";

export default function PaymentDetails() {
  return (
    <div className="bg-white rounded-sm shadow px-6 pt-6 pb-8">
      <div className="w-full max-w-lg">
        <h4 className="mb-5 text-lg font-medium text-gray-900">
          Edit Payment Method
        </h4>
        <Formik initialValues={{}} onSubmit={noop}>
          <Form>
            <div className="space-y-4">
              <TextInput name="number" label="Card Number" required />
              <TextInput name="name" label="Name on Card" required />
              <div className="lg:w-full lg:grid lg:grid-cols-2 lg:gap-4">
                <TextInput name="expiration" label="Expiration Date" required />
                <TextInput name="cvv" label="CVV" required />
              </div>
              <CheckBox name="asDefault">Save as default</CheckBox>
            </div>
            <div className="mt-5 lg:mt-8">
              <button
                type="button"
                className="default-btn font-roboto w-fit px-6 py-2"
              >
                Save Changes
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
