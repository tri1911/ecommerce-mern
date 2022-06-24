import { Link } from "react-router-dom";

export default function SocialLinkButtons({ text }: { text: string }) {
  return (
    <>
      <div className="mt-6 flex justify-center relative">
        <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
        <div className="text-gray-600 uppercase px-3 bg-white relative z-10">
          {text}
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <Link
          to="#"
          className="block w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm"
        >
          Facebook
        </Link>
        <Link
          to="#"
          className="block w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm"
        >
          Google
        </Link>
      </div>
    </>
  );
}
