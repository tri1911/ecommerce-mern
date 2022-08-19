import { Product } from "services/product.service";

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <>
      <div className="space-y-3 text-gray-600">
        <p>
          Incredible graphics performanceMacBook Air can take on more
          graphics-intensive projects than ever. For the first time, content
          creators can edit and seamlessly play back multiple streams of
          full‑quality 4K video without dropping a frame.
        </p>
        <p>
          Incredible graphics performanceMacBook Air can take on more
          graphics-intensive projects than ever. For the first time, content
          creators can edit and seamlessly play back multiple streams of
          full‑quality 4K video without dropping a frame.
        </p>
        <p>
          Apps on MacBook Air can use machine learning (ML) to automatically
          retouch photos like a pro, make smart tools such as magic wands and
          audio filters more accurate at auto‑detection, and so much more.
          That’s not just brain power — that’s the power of a full stack of ML
          technologies.
        </p>
      </div>
      <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
        <tbody>
          <tr>
            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
              Color
            </th>
            <td className="py-2 px-4 border border-gray-300 capitalize">
              {/* e.g. Black, Brown, Red */}
              {product.colors.join(", ")}
            </td>
          </tr>
          <tr>
            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
              Material
            </th>
            <td className="py-2 px-4 border border-gray-300 capitalize">
              {product.material ? product.material : "Artificial Leather"}
            </td>
          </tr>
          <tr>
            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
              Weight
            </th>
            <td className="py-2 px-4 border border-gray-300 capitalize">
              {product.weight ? product.weight : "55 kg"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
