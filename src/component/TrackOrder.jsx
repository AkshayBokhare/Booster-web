import { useState } from 'react';
import { trackOrder } from '../service/trackingService';

const STATUS_COLORS = {
  pending:   '#9a7a6b',
  assigned:  '#b85c3a',
  delivered: '#c47a45',
};

const fmt = (iso) =>
  new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState('');
  const [result, setResult]         = useState(null);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const data = await trackOrder(trackingId.trim());
      setResult(data);
    } catch {
      setError('No order found for this tracking ID. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="track-order-wrapper">
      <div className={`track-order-card${result ? ' has-result' : ''}`}>

        {/* ── Left panel: form ── */}
        <div className="track-order-left">
          <div className="track-order-header">
            <h2 className="track-order-title">Track Order</h2>
            <p className="track-order-sub">Enter your tracking ID to get real-time updates</p>
          </div>

          <form onSubmit={handleTrack} className="track-order-form">
            <div className="form-group full">
              <label htmlFor="trackingId">Tracking ID</label>
              <input
                id="trackingId"
                type="text"
                placeholder="e.g. ddd61d66-967c-489f-9acc-546ff9f5"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>
            <button type="submit" className="track-order-btn" disabled={loading}>
              {loading ? 'Tracking…' : 'Track Order'}
            </button>
          </form>

          {error && <p className="track-error">{error}</p>}
        </div>

        {/* ── Right panel: only shown when result is available ── */}
        {result && (
          <div className="track-order-right">
            <div className="track-result">
              <div className="track-result-row">
                <span className="track-result-label">Tracking ID</span>
                <span className="track-result-value track-id-chip">{result.tracking_id}</span>
              </div>
              <div className="track-result-row">
                <span className="track-result-label">Status</span>
                <span
                  className="track-status-badge"
                  style={{ background: STATUS_COLORS[result.status] ?? '#9a7a6b' }}
                >
                  {result.status}
                </span>
              </div>
              <div className="track-result-row">
                <span className="track-result-label">Estimated Delivery</span>
                <span className="track-result-value">{fmt(result.estimated_delivery)}</span>
              </div>
              <div className="track-result-row">
                <span className="track-result-label">Drop-off Address</span>
                <span className="track-result-value">{result.dropoff_address?.street}</span>
              </div>

              {result.rider && (
                <div className="track-result-row">
                  <span className="track-result-label">Rider</span>
                  <span className="track-result-value">
                    {result.rider.name} · {result.rider.vehicle_type.replace('_', ' ')}
                  </span>
                </div>
              )}

              <div className="track-timeline">
                <p className="track-timeline-title">Timeline</p>
                {result.timeline.map((t, i) => (
                  <div key={i} className="track-timeline-item">
                    <span
                      className="track-timeline-dot"
                      style={{ background: STATUS_COLORS[t.status] ?? '#9a7a6b' }}
                    />
                    <div>
                      <p className="track-timeline-status">{t.status}</p>
                      <p className="track-timeline-ts">{fmt(t.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackOrder;
