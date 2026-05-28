import Sidebar from './Sidebar';

const getUserInfo = () => {
  try { return JSON.parse(localStorage.getItem('user_info') || 'null'); } catch { return null; }
};

const Settings = () => {
  const user = getUserInfo();

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="disp-layout">
      <Sidebar user={user} />
      <main className="disp-main">
        <div className="disp-content">

          <div className="disp-header">
            <div>
              <h1 className="disp-page-title">Settings</h1>
              <p className="disp-page-date">{today}</p>
            </div>
          </div>

          <div className="disp-card" style={{ textAlign: 'center', padding: '60px 24px' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '8px' }}>
              Coming Soon
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--sf-gray)' }}>
              Settings will be available in a future update.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Settings;
