import { Link } from "react-router-dom";

export default function FormFooter({
  text,
  action,
  href,
}: {
  text: string;
  action: string;
  href: string;
}) {
  return (
    <p className="mt-4 text-gray-600 text-center">
      {text}{" "}
      <Link to={href} className="text-primary">
        {action}
      </Link>
    </p>
  );
}
