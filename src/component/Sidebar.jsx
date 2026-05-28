import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../service/loginService';

const DashboardIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.2" />
        <rect x="14" y="3" width="7" height="7" rx="1.2" />
        <rect x="3" y="14" width="7" height="7" rx="1.2" />
        <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
);

const OrdersIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
);

// const LiveMapIcon = () => (
//   <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M22 2L11 13"/>
//     <path d="M22 2L15 22 11 13 2 9l20-7z"/>
//   </svg>
// );

const DriversIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

// const AnalyticsIcon = () => (
//     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
//         <line x1="18" y1="20" x2="18" y2="10" />
//         <line x1="12" y1="20" x2="12" y2="4" />
//         <line x1="6" y1="20" x2="6" y2="14" />
//     </svg>
// );

const SettingsIcon = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
);

const NAV_ITEMS = [
    { label: 'Dashboard', path: '/dispatcher/dashboard', Icon: DashboardIcon },
    { label: 'Orders',    path: '/dispatcher/orders',    Icon: OrdersIcon },
    // { label: 'Live Map',  path: '/dispatcher/live-map',  Icon: LiveMapIcon },
    { label: 'Drivers',   path: '/dispatcher/drivers',   Icon: DriversIcon },
    // { label: 'Analytics', path: '/dispatcher/analytics', Icon: AnalyticsIcon },
    { label: 'Settings', path: '/dispatcher/settings', Icon: SettingsIcon },
];

const Sidebar = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const name = user?.name || 'Akshay Bokhare';
    const role = user?.role || 'Dispatcher';
    const initials = name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <aside className="disp-sidebar">
            <div className="disp-sidebar-logo">
                <span className="disp-sidebar-brand">
                    Booster<span className="disp-sidebar-brand-dot">·</span>
                </span>
                <span className="disp-sidebar-role-label">DISPATCHER</span>
            </div>

            <div className="disp-sidebar-nav">
                {NAV_ITEMS.map(({ label, path, Icon }) => {
                    const active = location.pathname === path;
                    return (
                        <button
                            key={path}
                            className={`disp-sidebar-item${active ? ' active' : ''}`}
                            onClick={() => navigate(path)}
                        >
                            <Icon />
                            <span>{label}</span>
                        </button>
                    );
                })}
            </div>

            <div className="disp-sidebar-user">
                <div className="disp-sidebar-avatar">{initials}</div>
                <div className="disp-sidebar-user-info">
                    <span className="disp-sidebar-user-name">{name}</span>
                    <span className="disp-sidebar-user-role">{role}</span>
                </div>
                <button
                    className="disp-sidebar-logout"
                    title="Logout"
                    onClick={() => logoutUser().then(() => navigate('/'))}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
