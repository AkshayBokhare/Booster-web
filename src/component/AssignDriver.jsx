import { useState } from 'react';
import { assignDriverToOrder } from '../service/dispatcherService';

const getInitials = (name = '') =>
  name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

const avatarBg = (name = '') => {
  const palette = ['#4a7c59', '#b85c3a', '#5a7a9c', '#7a5c9c', '#9c7a5c', '#6b8c7a'];
  let h = 0;
  for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
  return palette[Math.abs(h) % palette.length];
};

const formatDate = (iso) => {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return isToday ? `Today, ${time}` : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const formatVehicle = (v = '') => v.replace(/_/g, ' ');

const STATUS_MAP = {
  pending:    { bg: 'rgba(184,92,58,0.12)', color: '#b85c3a', label: 'Pending' },
  assigned:   { bg: 'rgba(196,140,69,0.13)', color: '#c47a45', label: 'Assigned' },
  in_transit: { bg: 'rgba(90,122,156,0.13)', color: '#5a7a9c', label: 'In Transit' },
  completed:  { bg: 'rgba(74,124,89,0.13)',  color: '#3d7a54', label: 'Delivered' },
};

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const AssignDriver = ({ order, riders, onClose, onAssigned }) => {
  const [onlineOnly, setOnlineOnly] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const status = STATUS_MAP[order.status] || STATUS_MAP.pending;
  const displayRiders = onlineOnly ? riders.filter((r) => r.is_online) : riders;

  const handleAssign = async () => {
    if (!selectedId) return;
    setLoading(true);
    setError('');
    try {
      await assignDriverToOrder(order.id, selectedId);
      onAssigned();
    } catch (e) {
      setError(e.message || 'Failed to assign driver.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="assign-overlay" onClick={onClose}>
      <div className="assign-card" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="assign-modal-header">
          <h2 className="assign-modal-title">Assign Driver</h2>
          <button className="assign-close-btn" onClick={onClose}><CloseIcon /></button>
        </div>

        {/* Order Info */}
        <div className="assign-order-box">
          <div className="assign-order-top-row">
            <div>
              <p className="assign-order-meta-label">ORDER ID</p>
              <p className="assign-order-id">#ORD-{order.id}</p>
            </div>
            <span style={{
              background: status.bg, color: status.color,
              fontSize: '0.7rem', fontWeight: 700, padding: '4px 11px',
              borderRadius: 980, whiteSpace: 'nowrap',
            }}>
              · {status.label}
            </span>
          </div>

          <div className="assign-route">
            <div className="assign-route-row">
              <div className="assign-route-dot pickup" />
              <div>
                <p className="assign-route-label">Pickup</p>
                <p className="assign-route-addr">{order.pickup_address}</p>
              </div>
            </div>
            <div className="assign-route-connector" />
            <div className="assign-route-row">
              <div className="assign-route-dot dropoff" />
              <div>
                <p className="assign-route-label">Dropoff</p>
                <p className="assign-route-addr">{order.dropoff_address}</p>
              </div>
            </div>
          </div>

          <div className="assign-order-footer">
            <span className="assign-order-time">🕐 {formatDate(order.created_at)}</span>
          </div>
        </div>

        {/* Driver Filter */}
        <div className="assign-section-row">
          <p className="assign-section-title">Available Drivers</p>
          <div className="assign-filter-tabs">
            <button
              className={`assign-filter-tab${!onlineOnly ? ' active' : ''}`}
              onClick={() => setOnlineOnly(false)}
            >
              All Drivers
            </button>
            <button
              className={`assign-filter-tab${onlineOnly ? ' active' : ''}`}
              onClick={() => setOnlineOnly(true)}
            >
              Online Only
            </button>
          </div>
        </div>

        {/* Driver Cards */}
        <div className="assign-driver-list">
          {displayRiders.length === 0 && (
            <p className="assign-empty">No drivers available.</p>
          )}
          {displayRiders.map((r) => (
            <div
              key={r.driver_id}
              className={`assign-driver-card${selectedId === r.driver_id ? ' selected' : ''}`}
              onClick={() => setSelectedId(r.driver_id)}
            >
              <div className="assign-driver-top">
                <div className="assign-driver-info">
                  <div className="assign-driver-avatar" style={{ background: avatarBg(r.name) }}>
                    {getInitials(r.name)}
                  </div>
                  <div>
                    <p className="assign-driver-name">{r.name}</p>
                    <p className="assign-driver-sub">
                      ⚡ {formatVehicle(r.vehicle_type)}
                    </p>
                  </div>
                </div>
                <span className={`assign-check-icon${selectedId === r.driver_id ? ' checked' : ''}`}>
                  {selectedId === r.driver_id && <CheckIcon />}
                </span>
              </div>
              <div className="assign-driver-stats">
                <div>
                  <p className="assign-stat-label">CAPACITY</p>
                  <p className="assign-stat-value">{r.capacity_current} out of {r.capacity_max}</p>
                </div>
                <div>
                  <p className="assign-stat-label">ACTIVE JOBS</p>
                  <p className="assign-stat-value">{r.capacity_current} Deliveries</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && <p className="assign-error">{error}</p>}

        <button
          className="assign-submit-btn"
          disabled={!selectedId || loading}
          onClick={handleAssign}
        >
          {loading ? 'Assigning...' : 'Assign Driver →'}
        </button>

      </div>
    </div>
  );
};

export default AssignDriver;
