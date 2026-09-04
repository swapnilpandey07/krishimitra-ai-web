// Reusable Badge Component
export function Badge({ variant = 'agriGreen', children, icon: Icon, className = '' }) {
  const styles = {
    agriGreen: 'bg-agriGreen-bg text-agriGreen-dark border-agriGreen/20',
    harvestGold: 'bg-harvestGold-light text-harvestGold-dark border-harvestGold/30',
    weatherBlue: 'bg-weatherBlue-light text-weatherBlue-dark border-weatherBlue/30',
    alertRed: 'bg-alertRed-light text-alertRed-dark border-alertRed/30',
    neutral: 'bg-earth text-wood border-borderEarth'
  };

  const activeStyle = styles[variant] || styles.neutral;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${activeStyle} ${className}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
    </span>
  );
}
