import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { getDashboardStats, getRecentOrders, getAllRiders } from '../service/dispatcherService';

const getUserInfo = () => {
  try { return JSON.parse(localStorage.getItem('user_info') || 'null'); } catch { return null; }
};

const getInitials = (name = '') =>
  name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

const shortAddr = (addr = '') => addr.split(',')[0];

const avatarBg = (name = '') => {
  const palette = ['#4a7c59', '#b85c3a', '#5a7a9c', '#7a5c9c', '#9c7a5c', '#6b8c7a'];
  let h = 0;
  for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
};

const STATUS_MAP = {
  pending:    { bg: 'rgba(184,92,58,0.12)',  color: '#b85c3a' },
  assigned:   { bg: 'rgba(74,124,89,0.14)',  color: '#3d7a54' },
  in_transit: { bg: 'rgba(196,122,69,0.14)', color: '#c47a45' },
  completed:  { bg: 'rgba(74,124,89,0.14)',  color: '#3d7a54' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: '0.7rem', fontWeight: 700,
      padding: '3px 10px', borderRadius: 980,
      textTransform: 'capitalize', letterSpacing: '0.04em',
      whiteSpace: 'nowrap',
    }}>
      · {status.replace('_', ' ')}
    </span>
  );
};

const BoxIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0L4 6.27A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v3h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);

const OrderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0L4 6.27A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
  </svg>
);

const StatCard = ({ label, value, Icon, iconBg, iconColor, valueColor }) => (
  <div className="disp-stat-card">
    <div>
      <p className="disp-stat-label">{label}</p>
      <p className="disp-stat-value" style={{ color: valueColor }}>{value ?? '—'}</p>
    </div>
    <div className="disp-stat-icon" style={{ background: iconBg, color: iconColor }}>
      <Icon />
    </div>
  </div>
);

const DispatcherDashboard = () => {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const user = getUserInfo();
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  useEffect(() => {
    Promise.all([getDashboardStats(), getRecentOrders(), getAllRiders()])
      .then(([s, o, r]) => { setStats(s); setOrders(o); setRiders(r); })
      .catch(console.error);
  }, []);

  return (
    <div className="disp-layout">
      <Sidebar user={user} />
      <main className="disp-main">
        <div className="disp-content">

          {/* Header */}
          <div className="disp-header">
            <div>
              <h1 className="disp-page-title">Dashboard</h1>
              <p className="disp-page-date">{today}</p>
            </div>
            <div className="disp-header-actions">
              <button className="disp-bell-btn" aria-label="Notifications">
                <BellIcon />
              </button>
              {/* <button className="disp-new-order-btn">
                <PlusIcon /> New Order
              </button> */}
            </div>
          </div>

          {/* Stat Cards */}
          <div className="disp-stats-grid">
            <StatCard
              label="TOTAL ORDERS"
              value={stats?.total_orders}
              Icon={BoxIcon}
              iconBg="rgba(184,92,58,0.10)"
              iconColor="var(--champagne)"
              valueColor="var(--ink)"
            />
            <StatCard
              label="IN TRANSIT"
              value={stats?.in_transit_orders}
              Icon={TruckIcon}
              iconBg="rgba(184,92,58,0.10)"
              iconColor="var(--champagne)"
              valueColor="var(--champagne)"
            />
            <StatCard
              label="DELIVERED"
              value={stats?.completed_orders}
              Icon={CheckIcon}
              iconBg="rgba(74,124,89,0.12)"
              iconColor="#3d7a54"
              valueColor="#3d7a54"
            />
          </div>

          {/* Middle Row */}
          <div className="disp-mid-grid">

            {/* Quick Actions */}
            <div className="disp-card">
              <h2 className="disp-card-title">Quick Actions</h2>
              <div className="disp-quick-actions">
                <button className="disp-qa-primary">
                  <PlusIcon /> Create Order
                </button>
                <button className="disp-qa-outline" onClick={() => navigate('/dispatcher/orders')}>
                  <PersonIcon /> Assign Driver
                </button>
              </div>
            </div>

            {/* Driver Status */}
            <div className="disp-card">
              <h2 className="disp-card-title">Driver Status</h2>
              <div className="disp-driver-list">
                {riders.length === 0 && <p className="disp-empty">No drivers found.</p>}
                {riders.map((r) => (
                  <div key={r.driver_id} className="disp-driver-row">
                    <div className="disp-driver-avatar" style={{ background: avatarBg(r.name) }}>
                      {getInitials(r.name)}
                    </div>
                    <div className="disp-driver-info">
                      <span className="disp-driver-name">{r.name}</span>
                      <span className="disp-driver-jobs">
                        {r.capacity_current} active job{r.capacity_current !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className={`disp-online-badge ${r.is_online ? 'online' : 'offline'}`}>
                      {r.is_online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="disp-card">
            <div className="disp-card-header">
              <h2 className="disp-card-title" style={{ marginBottom: 0 }}>Recent Orders</h2>
              <button className="disp-view-all" onClick={() => navigate('/dispatcher/orders')}>View All →</button>
            </div>
            <div className="disp-order-list">
              {orders.length === 0 && <p className="disp-empty">No recent orders.</p>}
              {orders.map((o) => (
                <div key={o.id} className="disp-order-row">
                  <div className="disp-order-icon">
                    <OrderIcon />
                  </div>
                  <div className="disp-order-info">
                    <span className="disp-order-id">#ORD-{o.id}</span>
                    <span className="disp-order-route">
                      {shortAddr(o.pickup_address)} → {shortAddr(o.dropoff_address)}
                    </span>
                  </div>
                  <span className="disp-order-driver">
                    {o.driver_name || 'Unassigned'}
                  </span>
                  <StatusBadge status={o.status} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default DispatcherDashboard;
