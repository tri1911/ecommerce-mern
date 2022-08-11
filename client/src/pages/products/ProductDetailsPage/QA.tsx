function SingleQuestion() {
  return (
    <li className="pt-4 space-y-3">
      <div className="flex items-center space-x-5">
        <span className="text-xl">
          <i className="far fa-user" />
        </span>
        <div className="space-y-1">
          <h4 className="text-base font-medium text-gray-800">Any discount?</h4>
          <p className="text-xs font-normal text-gray-500">
            Dr.SaifuzZ. - 27 Oct 2021
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-xl">
          <i className="fas fa-headset" />
        </span>
        <div className="">
          <h4 className="text-base font-medium text-gray-800">
            There is no discount sir
          </h4>
          <p className="text-xs font-normal text-gray-500">
            Store Admin - 27 Oct 2021
          </p>
        </div>
      </div>
    </li>
  );
}

export default function QA() {
  return (
    <div>
      <header>
        <h3 className="text-lg font-medium text-gray-800">
          Question about this product (3)
        </h3>
      </header>
      <main>
        <ul className="space-y-4 divide-y divide-gray-200">
          <SingleQuestion />
          <SingleQuestion />
        </ul>
      </main>
      <footer className="space-y-3 pt-10">
        <textarea
          rows={5}
          placeholder="Type your question"
          className="w-full rounded-md border-gray-200 focus:outline-none focus:ring-primary"
        />
        <button type="button" className="default-btn max-w-sm px-4 py-2">
          Ask Question
        </button>
      </footer>
    </div>
  );
}
