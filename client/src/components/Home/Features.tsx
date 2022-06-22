function SingleFeature({
  image,
  title,
  desc,
}: {
  image: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-primary rounded-sm px-8 lg:px-3 lg:py-6 py-4 flex justify-center items-center gap-5">
      <img src={image} alt="" className="lg:w-12 w-10 h-12 object-contain" />
      <div>
        <h4 className="font-medium capitalize text-lg">{title}</h4>
        <p className="text-gray-500 text-xs lg:text-sm">{desc}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <div className="container py-16">
      <div className="lg:w-10/12 grid md:grid-cols-3 gap-3 lg:gap-6 mx-auto justify-center">
        <SingleFeature
          image="images/icons/delivery-van.svg"
          title="shipping"
          desc="Order over $200"
        />
        <SingleFeature
          image="images/icons/money-back.svg"
          title="Money returns"
          desc="30 Days money return"
        />
        <SingleFeature
          image="images/icons/service-hours.svg"
          title="24/7 Support"
          desc="Customer support"
        />
      </div>
    </div>
  );
}
