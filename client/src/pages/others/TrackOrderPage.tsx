import Timeline from "components/experiment/Timeline";
import Breadcrumbs from "components/Shared/Breadcrumbs";

// TODO: use Formik for the form
export default function TrackOrderPage() {
  return (
    <div>
      <Breadcrumbs crumbs={[{ label: "Tracking Order" }]} />
      <section className="container py-8 px-6 shadow">
        <h2 className="text-2xl font-medium uppercase mb-5">Order Tracking</h2>
        <form>
          <div className="mb-4 max-w-lg">
            <label
              htmlFor="order-id"
              className="block text-base leading-6 mb-2"
            >
              Order Id <span className="text-base text-primary">*</span>
            </label>
            <input
              type="text"
              id="order-id"
              className="block text-sm w-full py-4 px-2 border border-gray-200 rounded mb-2 focus:outline-none focus:ring-primary/75"
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="default-btn w-fit py-2 px-4 text-sm"
            >
              Track Order
            </button>
          </div>
        </form>
        <div className="mt-5 pt-2">
          <h4 className="__order-status py-2 uppercase text-xl text-white font-medium bg-green-600 text-center">
            Delivered
          </h4>
          <Timeline />
        </div>
      </section>
    </div>
  );
}
