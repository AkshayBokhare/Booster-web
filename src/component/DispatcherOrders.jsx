import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import AssignDriver from './AssignDriver';
import { getRecentOrders, getAllRiders } from '../service/dispatcherService';

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

const shortAddr = (addr = '') => addr.split(',')[0];

const formatCreatedAt = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const yest = new Date(now);
  yest.setDate(now.getDate() - 1);
  const isYest = d.toDateString() === yest.toDateString();
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  if (isToday) return `Today, ${time}`;
  if (isYest) return 'Yesterday';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const STATUS_MAP = {
  pending:    { bg: 'rgba(184,92,58,0.12)',  color: '#b85c3a',  label: 'Pending' },
  assigned:   { bg: 'rgba(196,140,69,0.13)', color: '#c47a45',  label: 'Assigned' },
  in_transit: { bg: 'rgba(90,122,156,0.13)', color: '#5a7a9c',  label: 'In Transit' },
  completed:  { bg: 'rgba(74,124,89,0.13)',  color: '#3d7a54',  label: 'Delivered' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <span style={{
      background: s.bg, color: s.color,
      fontSize: '0.72rem', fontWeight: 700,
      padding: '4px 11px', borderRadius: 980,
      whiteSpace: 'nowrap', letterSpacing: '0.03em',
    }}>
      · {s.label}
    </span>
  );
};

const FILTERS = [
  { key: 'all',        label: 'All' },
  { key: 'pending',    label: 'Pending' },
  { key: 'assigned',   label: 'Assigned' },
  { key: 'in_transit', label: 'In Transit' },
  { key: 'completed',  label: 'Delivered' },
];

const SearchIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 01-3.46 0"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const DispatcherOrders = () => {
  const [orders, setOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [assigningOrder, setAssigningOrder] = useState(null);
  const user = getUserInfo();

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const loadOrders = () => getRecentOrders().then(setOrders).catch(console.error);

  useEffect(() => {
    loadOrders();
    getAllRiders().then(setRiders).catch(console.error);
  }, []);

  const filtered = orders.filter((o) => {
    const matchStatus = activeFilter === 'all' || o.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      `#ord-${o.id}`.includes(q) ||
      (o.pickup_address || '').toLowerCase().includes(q) ||
      (o.dropoff_address || '').toLowerCase().includes(q) ||
      (o.driver_name || '').toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <>
    <div className="disp-layout">
      <Sidebar user={user} />
      <main className="disp-main">
        <div className="disp-content">

          {/* Header */}
          <div className="disp-header">
            <div>
              <h1 className="disp-page-title">Orders</h1>
              <p className="disp-page-date">{today}</p>
            </div>
            <div className="disp-header-actions">
              <button className="disp-bell-btn" aria-label="Notifications"><BellIcon /></button>
              {/* <button className="disp-new-order-btn"><PlusIcon /> New Order</button> */}
            </div>
          </div>

          {/* Search + Create */}
          <div className="ord-search-row">
            <div className="ord-search-wrap">
              <span className="ord-search-icon"><SearchIcon /></span>
              <input
                className="ord-search-input"
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="ord-create-btn"><PlusIcon /> Create Order</button>
          </div>

          {/* Filter Tabs */}
          <div className="ord-filter-tabs">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                className={`ord-filter-tab${activeFilter === key ? ' active' : ''}`}
                onClick={() => setActiveFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Orders Table */}
          <div className="disp-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="ord-table-wrap">
              <table className="ord-table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>PICKUP</th>
                    <th>DROPOFF</th>
                    <th>DRIVER</th>
                    <th>CREATED</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="ord-empty">No orders found.</td>
                    </tr>
                  )}
                  {filtered.map((o) => (
                    <tr key={o.id} className="ord-row">
                      <td className="ord-id">#ORD-{o.id}</td>
                      <td className="ord-addr" title={o.pickup_address}>
                        {shortAddr(o.pickup_address)}
                      </td>
                      <td className="ord-addr" title={o.dropoff_address}>
                        {shortAddr(o.dropoff_address)}
                      </td>
                      <td>
                        {o.driver_name ? (
                          <div className="ord-driver-cell">
                            <div
                              className="ord-driver-avatar"
                              style={{ background: avatarBg(o.driver_name) }}
                            >
                              {getInitials(o.driver_name)}
                            </div>
                            <span className="ord-driver-name">{o.driver_name}</span>
                          </div>
                        ) : (
                          <span className="ord-unassigned">Unassigned</span>
                        )}
                      </td>
                      <td className="ord-date">{formatCreatedAt(o.created_at)}</td>
                      <td><StatusBadge status={o.status} /></td>
                      <td>
                        <div className="ord-actions">
                          {o.status === 'pending' && (
                            <button
                              className="ord-btn-assign"
                              onClick={() => setAssigningOrder(o)}
                            >Assign</button>
                          )}
                          <button className="ord-btn-view">View</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>

    {assigningOrder && (
      <AssignDriver
        order={assigningOrder}
        riders={riders}
        onClose={() => setAssigningOrder(null)}
        onAssigned={() => {
          setAssigningOrder(null);
          loadOrders();
        }}
      />
    )}
    </>
  );
};

export default DispatcherOrders;
