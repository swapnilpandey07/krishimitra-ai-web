// Chart Container Card Component
export function ChartCard({ title, subtitle, action, children }) {
  return (
    <div className="krishi-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-borderEarth">
        <div>
          <h3 className="text-base font-bold font-heading text-wood">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-mutedEarth mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="w-full min-h-[260px]">
        {children}
      </div>
    </div>
  );
}
