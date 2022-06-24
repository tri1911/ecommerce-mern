import { Link } from "react-router-dom";

export default function FormFooter({
  text,
  action,
}: {
  text: string;
  action: string;
}) {
  return (
    <p className="mt-4 text-gray-600 text-center">
      {text}{" "}
      <Link to="/register" className="text-primary">
        {action}
      </Link>
    </p>
  );
}
