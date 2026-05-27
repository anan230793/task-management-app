import { Outlet } from 'react-router-dom';

import { Navbar } from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-surface-page text-ink-primary">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
