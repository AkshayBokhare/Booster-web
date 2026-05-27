import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Dashboard from './component/Dashboard';
import TrackOrder from './component/TrackOrder';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/track-order" element={<TrackOrder />} />
      </Route>
    </Routes>
  );
}

export default App;
