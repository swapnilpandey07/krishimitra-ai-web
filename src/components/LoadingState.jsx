// Skeleton Loader Component
export function LoadingState({ count = 3, message = "Loading agricultural insights..." }) {
  return (
    <div className="w-full py-8 text-center space-y-4">
      <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-earth rounded-full border border-borderEarth text-sm text-wood font-medium animate-pulse">
        <span className="w-2.5 h-2.5 rounded-full bg-agriGreen animate-ping"></span>
        <span>{message}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="krishi-card p-6 space-y-3 animate-pulse">
            <div className="h-4 bg-borderEarth/60 rounded w-1/2"></div>
            <div className="h-8 bg-borderEarth/40 rounded w-3/4"></div>
            <div className="h-3 bg-borderEarth/40 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
