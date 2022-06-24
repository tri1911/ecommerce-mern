export default function FormHeader({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <>
      <h2 className="text-2xl uppercase font-medium mb-1">{title}</h2>
      <p className="text-gray-600 mb-6 text-sm">{text}</p>
    </>
  );
}
