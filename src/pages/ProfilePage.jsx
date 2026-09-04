// Farmer Profile View & Edit Form Page
import { useApp } from '../context/AppContext.jsx';

export function ProfilePage() {
  const { user, updateProfile, farms } = useApp();
  const [isEditing, setIsEditing] = React.useState(false);

  // Profile Form State
  const [formData, setFormData] = React.useState({
    name: user.name || '',
    phone: user.phone || '',
    email: user.email || '',
    state: user.state || 'Madhya Pradesh',
    district: user.district || 'Indore',
    village: user.village || 'Sanwer'
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
      state: user.state || 'Madhya Pradesh',
      district: user.district || 'Indore',
      village: user.village || 'Sanwer'
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-borderEarth">
        <div>
          <h1 className="text-2xl font-bold font-heading text-wood">
            👤 Farmer Account Profile
          </h1>
          <p className="text-xs text-mutedEarth mt-1">
            Personal details, contact info, and regional telemetry assignments.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-primary text-xs"
          >
            ✏️ Edit Profile Info
          </button>
        )}
      </div>

      {/* FARMER IDENTITY CARD HERO */}
      <div className="krishi-card p-6 bg-gradient-to-r from-agriGreen-bg/40 via-white to-earth/60 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-24 h-24 rounded-2xl object-cover border-4 border-agriGreen shadow-md shrink-0"
        />

        <div className="text-center sm:text-left space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-agriGreen-dark bg-agriGreen-bg px-2.5 py-0.5 rounded border border-agriGreen/30">
            Registered KrishiMitra Farmer
          </span>
          <h2 className="text-2xl font-extrabold font-heading text-wood">
            {user.name}
          </h2>
          <p className="text-xs text-mutedEarth">
            📍 {user.village}, {user.district}, {user.state}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-wood">
            <span>📞 {user.phone}</span>
            <span>✉️ {user.email}</span>
            <span>🌾 {farms.length} Registered Farms</span>
          </div>
        </div>
      </div>

      {/* FORM / READONLY VIEW */}
      <div className="krishi-card p-6">
        <h3 className="text-base font-bold font-heading text-wood mb-4 pb-2 border-b border-borderEarth">
          {isEditing ? 'Edit Profile Details' : 'Farmer Registration Particulars'}
        </h3>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-wood mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Mobile Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-wood mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-wood mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Village / Gram Panchayat</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3 border-t border-borderEarth">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary text-xs"
              >
                Cancel Changes
              </button>
              <button
                type="submit"
                className="btn-primary text-xs"
              >
                Save Updated Profile →
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-3">
              <div>
                <span className="text-mutedEarth font-medium block">Farmer Full Name</span>
                <strong className="text-wood text-sm font-bold">{user.name}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">Mobile Contact</span>
                <strong className="text-wood text-sm font-bold">{user.phone}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">Email Address</span>
                <strong className="text-wood text-sm font-bold">{user.email}</strong>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-mutedEarth font-medium block">State / Region</span>
                <strong className="text-wood text-sm font-bold">{user.state}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">District</span>
                <strong className="text-wood text-sm font-bold">{user.district}</strong>
              </div>
              <div>
                <span className="text-mutedEarth font-medium block">Village / Panchayat</span>
                <strong className="text-wood text-sm font-bold">{user.village}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
