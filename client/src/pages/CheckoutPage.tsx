import * as Yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import TextInput from "../components/Form/TextInput";
import { Link, useNavigate } from "react-router-dom";
import CheckBox from "../components/Form/CheckBox";
import { CartItem } from "../types";
import { useAppSelector } from "../app/hooks";
import { selectAllCartItems } from "../slices/cartSlice";
import { useMemo } from "react";

function OrderItem({
  item: { name, size, quantity, price },
}: {
  item: CartItem;
}) {
  return (
    <div className="flex justify-between">
      <div>
        <h5 className="text-gray-800 font-medium">{name}</h5>
        <p className="text-sm text-gray-600">Size: {size.toUpperCase()}</p>
      </div>
      <p className="text-gray-600">x{quantity}</p>
      <p className="text-gray-800 font-medium">
        ${(price * quantity).toFixed(2)}
      </p>
    </div>
  );
}

interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  company: string;
  country: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  acceptedTerms: boolean;
}

export default function CheckoutPage() {
  const initialValues: CheckoutFormValues = {
    firstName: "",
    lastName: "",
    company: "",
    country: "",
    street: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    acceptedTerms: false,
  };

  const navigate = useNavigate();

  const handleSubmit: (
    values: CheckoutFormValues,
    formikHelpers: FormikHelpers<CheckoutFormValues>
  ) => void | Promise<any> = (values, actions) => {
    // do something with form values here
    console.log(values);
    actions.setSubmitting(false);
    navigate("/payment");
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Please enter your full name"),
    lastName: Yup.string().required("Please enter your last name"),
    company: Yup.string().required("Please enter your company"),
    country: Yup.string().required("Please enter your country"),
    street: Yup.string().required("Please enter your street"),
    city: Yup.string().required("Please enter your city"),
    postalCode: Yup.string().required("Please enter your postalCode"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and conditions."),
  });

  const cartItems = useAppSelector(selectAllCartItems);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2),
    [cartItems]
  );

  return (
    <div>
      <Breadcrumbs paths={["Check Out"]} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="container lg:grid lg:grid-cols-12 gap-6 items-start pb-16 pt-4">
            <section className="lg:col-span-8 border border-gray-200 shadow p-4 rounded">
              <h3 className="text-lg font-medium capitalize mb-4">
                Billing Details
              </h3>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <TextInput
                    type="text"
                    label="First Name"
                    name="firstName"
                    placeholder="Enter your first name"
                    required
                  />
                  <TextInput
                    type="text"
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    label="Company Name"
                    name="company"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    label="County / Region"
                    name="country"
                    placeholder="Enter region"
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    label="Street Address"
                    name="street"
                    placeholder="Enter your street address"
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    label="Town / City"
                    name="city"
                    placeholder="Enter City"
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    label="Zip Code"
                    name="postalCode"
                    placeholder="Enter zip code"
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="text"
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div>
                  <TextInput
                    type="email"
                    label="Email Address"
                    name="email"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
            </section>
            <section className="lg:col-span-4 border border-gray-200 shadow p-4 rounded mt-6 lg:mt-0">
              <h4 className="text-gray-800 text-lg mb-4 pb-2 font-medium uppercase border-b border-gray-200">
                Order Summary
              </h4>
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <OrderItem key={item.productId} item={item} />
                ))}
              </div>
              <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium uppercase">
                <h4 className="my-3">Subtotal</h4>
                <h4 className="my-3">${subtotal}</h4>
              </div>
              <div className="flex justify-between border-b border-gray-200 text-gray-800 font-medium uppercase">
                <h4 className="my-3">Shipping</h4>
                <h4 className="my-3">Free</h4>
              </div>
              <div className="flex justify-between text-gray-800 font-semibold uppercase">
                <h4 className="my-3">Total</h4>
                <h4 className="my-3">${subtotal}</h4>
              </div>
              <div className="mb-4 mt-2">
                <CheckBox shrink name="acceptedTerms">
                  Agree to our &nbsp;
                  <Link to="#" className="text-primary">
                    terms &amp; conditions
                  </Link>
                </CheckBox>
              </div>
              <button type="submit" className="block default-btn">
                Make a Payment
              </button>
            </section>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
