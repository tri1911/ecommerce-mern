import { useState } from "react";
import classNames from "classnames";

// NOTE: pass the array of product images
export default function ProductImage() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      {/* main image */}
      <div>
        <img
          className="w-full"
          src={`/images/products/product${selected + 1}.jpg`}
          alt="main"
        />
      </div>
      {/* additional images */}
      <div className="grid grid-cols-5 gap-4 mt-4">
        {[...Array(5).keys()].map((key) => (
          <div key={key}>
            <img
              className={classNames("w-full cursor-pointer border", {
                "border-primary": key === selected,
              })}
              src={`/images/products/product${key + 1}.jpg`}
              alt="additional"
              onClick={() => setSelected(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
