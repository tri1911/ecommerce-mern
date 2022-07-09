export default function Notification({ message }: { message: string }) {
  return (
    <div
      className="px-4 py-3 rounded bg-red-100 border border-red-400 text-red-700"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
