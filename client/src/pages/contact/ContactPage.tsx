import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { noop } from "types";
import {
  ChevronRightIcon,
  HomeIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
} from "@heroicons/react/outline";
import TextInput from "components/Form/TextInput";

function StoreInfo() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg text-gray-900 font-semibold uppercase">
        Our store
      </h3>
      <div className="flex space-x-3">
        <span>
          <LocationMarkerIcon className="w-5 h-5" />
        </span>
        <p className="text-sm text-gray-800">
          7895 Dr New Albuquerue, NM 19800, nited States Of America
        </p>
      </div>
      <div className="flex space-x-3">
        <span>
          <PhoneIcon className="w-5 h-5" />
        </span>
        <p className="text-sm text-gray-800">+566 477 256, +566 254 575</p>
      </div>
      <div className="flex space-x-3">
        <span>
          <MailIcon className="w-5 h-5" />
        </span>
        <p className="text-sm text-gray-800">info@domain.com</p>
      </div>
    </div>
  );
}

function OperationHours() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg text-gray-900 font-semibold uppercase">
        Hours of Operation
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p>Monday</p>
          <p>12:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Tuesday</p>
          <p>12:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Wednesday</p>
          <p>12:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Thursday</p>
          <p>12:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Friday</p>
          <p>12:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Saturday</p>
          <p>12:00 PM</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Sunday</p>
          <p>12:00 PM</p>
        </div>
      </div>
    </div>
  );
}

function Careers() {
  return (
    <div className="space-y-2">
      <h3 className="text-lg text-gray-900 font-semibold uppercase">Careers</h3>
      <div>
        <p className="text-gray-800">
          If you are interesting in emplyment opportunities at RAFCARTs. Please
          email us: <span className="text-primary">contact@email.com</span>
        </p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div>
      <div
        className="__contact-banner bg-cover bg-no-repeat bg-center h-72 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/contact-banner.jpeg')" }}
      >
        <div>
          <h1 className="mb-4 text-2xl text-white font-medium uppercase">
            Contact Us
          </h1>
          <div className="__breadcrumbs flex items-center space-x-1">
            <Link to="/">
              <HomeIcon className="w-4 h-4 text-primary" />
            </Link>
            <span>
              <ChevronRightIcon className="w-4 h-4 text-white" />
            </span>
            <Link to="#" className="font-roboto text-white text-base">
              Contact us
            </Link>
          </div>
        </div>
      </div>
      <div className="container py-14 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="bg-white px-6 pt-6 pb-8 rounded-sm shadow lg:col-span-8">
          <div className="w-full">
            <header className="mb-5">
              <h2 className="mb-1 text-2xl font-semibold text-gray-900 uppercase">
                Leave us a message
              </h2>
              <p className="text-gray-800 text-sm">
                Use the form below to get in touch with the sales team
              </p>
            </header>
            <Formik initialValues={{}} onSubmit={noop}>
              <Form>
                <div className="space-y-4">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-4">
                    <TextInput name="firstName" label="First Name" required />
                    <TextInput name="lastName" label="Last Name" required />
                  </div>
                  <TextInput name="email" label="Email Address" required />
                  <TextInput name="subject" label="Subject" />
                  <TextInput name="message" label="Your message" required />
                </div>
                <div className="mt-7">
                  <button
                    type="button"
                    className="default-btn font-roboto w-fit px-6 py-2"
                  >
                    Send message
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="mt-5 bg-white px-6 pt-6 pb-8 rounded-sm shadow space-y-8 lg:col-span-4 lg:mt-0">
          <StoreInfo />
          <OperationHours />
          <Careers />
        </div>
      </div>
    </div>
  );
}
