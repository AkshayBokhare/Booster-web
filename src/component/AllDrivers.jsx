import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { getAllRiders } from '../service/dispatcherService';

const getUserInfo = () => {
  try { return JSON.parse(localStorage.getItem('user_info') || 'null'); } catch { return null; }
};

const getInitials = (name = '') =>
  name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

const avatarBg = (name = '') => {
  const palette = ['#4a7c59', '#b85c3a', '#5a7a9c', '#7a5c9c', '#9c7a5c', '#6b8c7a'];
  let h = 0;
  for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
};

const formatVehicle = (v = '') => v.replace(/_/g, ' ');

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const DriverCard = ({ driver }) => {
  const online = driver.is_online;
  const statusColor = online ? '#3d7a54' : 'var(--sf-gray)';

  return (
    <div className="driver-card">
      <div className="driver-card-top">
        <div className="driver-card-avatar" style={{ background: avatarBg(driver.name) }}>
          {getInitials(driver.name)}
        </div>
        <div className="driver-card-meta">
          <p className="driver-card-name">{driver.name}</p>
          <p className="driver-card-vehicle">{formatVehicle(driver.vehicle_type)}</p>
        </div>
        <div className="driver-card-badge" style={{ color: statusColor }}>
          <span className="driver-status-dot" style={{ background: statusColor }} />
          {online ? 'Online' : 'Offline'}
        </div>
      </div>

      <div className="driver-card-stats">
        <div className="driver-stat">
          <span className="driver-stat-label">DISTANCE</span>
          <span className="driver-stat-value">
            {driver.location ? '— mi' : '—'}
          </span>
        </div>
        <div className="driver-stat-divider" />
        <div className="driver-stat">
          <span className="driver-stat-label">CAPACITY</span>
          <span className="driver-stat-value">
            {driver.capacity_current} out of {driver.capacity_max}
          </span>
        </div>
        <div className="driver-stat-divider" />
        <div className="driver-stat">
          <span className="driver-stat-label">JOBS</span>
          <span className="driver-stat-value">{driver.capacity_current} active</span>
        </div>
      </div>
    </div>
  );
};

const AllDrivers = () => {
  const [riders, setRiders] = useState([]);
  const user = getUserInfo();

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  useEffect(() => {
    getAllRiders().then(setRiders).catch(console.error);
  }, []);

  return (
    <div className="disp-layout">
      <Sidebar user={user} />
      <main className="disp-main">
        <div className="disp-content">

          <div className="disp-header">
            <div>
              <h1 className="disp-page-title">Drivers</h1>
              <p className="disp-page-date">{today}</p>
            </div>
            <div className="disp-header-actions">
              <button className="disp-bell-btn" aria-label="Notifications"><BellIcon /></button>
            </div>
          </div>

          {riders.length === 0 ? (
            <p className="disp-empty">No drivers found.</p>
          ) : (
            <div className="drivers-grid">
              {riders.map((r) => (
                <DriverCard key={r.driver_id} driver={r} />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default AllDrivers;
