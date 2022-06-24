export default function Rating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-sm text-yellow-400">
      {[...Array(5).keys()].map((key) => (
        <span key={key}>
          <i
            className={
              rating >= key + 1
                ? "fas fa-star"
                : rating >= key + 0.5
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          />
        </span>
      ))}
    </div>
  );
}
