import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Dashboard from './component/Dashboard';
import TrackOrder from './component/TrackOrder';
import DispatcherDashboard from './component/DispatcherDashboard';
import DispatcherOrders from './component/DispatcherOrders';
import AllDrivers from './component/AllDrivers';
import Settings from './component/Settings';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/track-order" element={<TrackOrder />} />
      </Route>
      <Route path="/dispatcher/dashboard" element={<DispatcherDashboard />} />
      <Route path="/dispatcher/orders" element={<DispatcherOrders />} />
      <Route path="/dispatcher/drivers" element={<AllDrivers />} />
      <Route path="/dispatcher/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
