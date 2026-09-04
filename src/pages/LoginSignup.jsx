// Login / Signup Farmer-Friendly Authentication Page
import { useApp } from '../context/AppContext.jsx';

export function LoginSignup() {
  const { loginUser, signupUser } = useApp();
  const [activeTab, setActiveTab] = React.useState('login'); // 'login' or 'signup'

  // Login Form State
  const [loginEmail, setLoginEmail] = React.useState('ramesh.patel@krishimitra.in');
  const [loginPassword, setLoginPassword] = React.useState('farmer123');

  // Signup Form State
  const [signupData, setSignupData] = React.useState({
    name: '',
    phone: '',
    email: '',
    state: 'Madhya Pradesh',
    district: 'Indore',
    village: ''
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser(loginEmail, loginPassword);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupData.name || !signupData.phone) {
      alert('Please enter your full name and phone number.');
      return;
    }
    signupUser(signupData);
  };

  return (
    <div className="min-h-screen bg-earth flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl border border-borderEarth shadow-xl overflow-hidden">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-agriGreen to-agriGreen-dark p-6 text-white text-center">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white text-agriGreen font-bold flex items-center justify-center text-3xl shadow-md">
            🚜
          </div>
          <h1 className="text-2xl font-extrabold font-heading tracking-wide">
            KrishiMitra<span className="text-harvestGold">-AI</span>
          </h1>
          <p className="text-xs text-agriGreen-bg/90 mt-1 max-w-xs mx-auto">
            Smart India Hackathon Agriculture Portal for AI-Powered Farming Decisions
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-borderEarth bg-earth/40">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-xs font-bold transition-all ${
              activeTab === 'login'
                ? 'bg-white text-agriGreen-dark border-b-2 border-agriGreen font-heading text-sm'
                : 'text-mutedEarth hover:text-wood'
            }`}
          >
            Farmer Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-3 text-xs font-bold transition-all ${
              activeTab === 'signup'
                ? 'bg-white text-agriGreen-dark border-b-2 border-agriGreen font-heading text-sm'
                : 'text-mutedEarth hover:text-wood'
            }`}
          >
            New Farmer Registration
          </button>
        </div>

        <div className="p-6">
          {/* LOGIN FORM */}
          {activeTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mutedEarth mb-1">
                  Email Address or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ramesh.patel@krishimitra.in"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-mutedEarth mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full"
                />
              </div>

              <div className="p-3 bg-earth rounded-lg border border-borderEarth text-xs text-mutedEarth">
                <span className="font-bold text-wood block mb-0.5">💡 Demo Login Credentials:</span>
                Email: <code className="text-agriGreen font-bold">ramesh.patel@krishimitra.in</code><br />
                Password: Any password works
              </div>

              <button type="submit" className="w-full btn-primary py-3 text-sm mt-2">
                Log In to KrishiMitra Portal →
              </button>
            </form>
          ) : (
            /* SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-wood mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={signupData.name}
                  onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Phone Number (+91) *</label>
                <input
                  type="tel"
                  required
                  value={signupData.phone}
                  onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Email Address</label>
                <input
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  placeholder="farmer@example.com"
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-wood mb-1">State</label>
                  <select
                    value={signupData.state}
                    onChange={(e) => setSignupData({ ...signupData, state: e.target.value })}
                    className="w-full"
                  >
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-wood mb-1">District</label>
                  <input
                    type="text"
                    value={signupData.district}
                    onChange={(e) => setSignupData({ ...signupData, district: e.target.value })}
                    placeholder="Indore"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-wood mb-1">Village / Gram Panchayat</label>
                <input
                  type="text"
                  value={signupData.village}
                  onChange={(e) => setSignupData({ ...signupData, village: e.target.value })}
                  placeholder="Sanwer"
                  className="w-full"
                />
              </div>

              <button type="submit" className="w-full btn-gold py-3 text-sm mt-3">
                Complete Registration →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
