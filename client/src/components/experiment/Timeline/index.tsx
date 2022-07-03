import { CheckIcon, ExclamationCircleIcon } from "@heroicons/react/outline";
import classNames from "classnames";

const milestones = [
  {
    title: "01. Order Placement",
    datetime: "Jan 01, 2022 at 8:34 AM",
    status: "delivered",
  },
  {
    title: "02. Processing",
    datetime: "Jan 02, 2022 at 8:34 AM",
    status: "delivered",
  },
  {
    title: "03. Shipping",
    datetime: "Jan 03, 2022 at 8:34 AM",
    status: "delivered",
  },
  {
    title: "04. Delivery",
    datetime: "Jan 04, 2022 at 8:34 AM",
    status: "pending",
  },
];

function TimelineItem({
  title,
  datetime,
  isEvenChild,
  pending,
}: {
  title: string;
  datetime: string;
  isEvenChild?: boolean;
  pending?: boolean;
}) {
  return (
    <div className="__single-timeline-wrp w-full p-4 relative bg-white border border-gray-200 mb-8 md:max-w-[290px] md:odd:self-end">
      <div
        className={classNames(
          "absolute z-10 -left-12 top-1/2 -translate-y-1/2 text-white rounded-full",
          { "md:left-auto md:-right-12": isEvenChild },
          pending ? "bg-yellow-400" : "bg-green-500"
        )}
      >
        {pending ? (
          <ExclamationCircleIcon className="w-6 h-6 p-1" />
        ) : (
          <CheckIcon className="w-6 h-6 p-1" />
        )}
      </div>
      <h5 className="mb-1 text-base leading-5 font-medium">{title}</h5>
      <p className="text-sm leading-6">{datetime}</p>
      <div
        className={classNames(
          "absolute -left-3 top-1/2 w-6 h-6 border-b border-l border-gray-200 -translate-y-1/2 rotate-45 bg-inherit",
          {
            "md:left-auto md:-right-3 md:border-0 md:border-t md:border-r":
              isEvenChild,
          }
        )}
      />
    </div>
  );
}

export default function Timeline() {
  return (
    <div className="__timeline-wrp relative w-full mx-auto mt-8 pl-12 flex flex-col md:w-[650px] md:pl-0">
      {milestones.map(({ title, datetime }, idx) => (
        <TimelineItem
          key={idx}
          title={title}
          datetime={datetime}
          isEvenChild={(idx + 1) % 2 === 0}
          pending={idx === 3}
        />
      ))}
      <div className="absolute left-[13px] h-full border-r border-dashed border-gray-200 md:left-1/2" />
    </div>
  );
}
