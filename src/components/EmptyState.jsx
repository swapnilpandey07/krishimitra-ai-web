// Empty Search / Data Placeholder State Component
export function EmptyState({ title = "No Results Found", message = "Try adjusting your search query or filters.", icon = "🌾", actionLabel, onAction }) {
  return (
    <div className="krishi-card p-10 text-center flex flex-col items-center justify-center my-6">
      <div className="text-4xl mb-3 p-4 rounded-full bg-earth border border-borderEarth">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-heading text-wood mb-1">
        {title}
      </h3>
      <p className="text-xs text-mutedEarth max-w-sm mb-4">
        {message}
      </p>

      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-secondary text-xs">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
