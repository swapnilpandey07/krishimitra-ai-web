// System Feedback Toast Component
export function Toast({ toast }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className={`px-4 py-3 rounded-xl border shadow-xl flex items-center gap-3 text-sm font-semibold ${
        isSuccess ? 'bg-agriGreen text-white border-agriGreen-dark' :
        isInfo ? 'bg-weatherBlue text-white border-weatherBlue-dark' :
        'bg-harvestGold text-white border-harvestGold-dark'
      }`}>
        <span className="text-lg">
          {isSuccess ? '✅' : isInfo ? 'ℹ️' : '⚠️'}
        </span>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
