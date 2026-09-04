// Reusable Accessible Modal Component
export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-xl" }) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
      {/* Backdrop Click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className={`relative w-full ${maxWidth} bg-white rounded-2xl border border-borderEarth shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderEarth bg-earth/50">
          <h3 className="text-lg font-bold font-heading text-wood">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-earth border border-borderEarth text-wood flex items-center justify-center text-lg font-bold transition-colors"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
