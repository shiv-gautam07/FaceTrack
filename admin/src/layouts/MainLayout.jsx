import { Outlet } from 'react-router';
import { useAuth } from '@/auth/AuthContext';
import Sidebar from '@/components/Sidebar';
import { Bell, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/Header';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div
        className={`fixed inset-y-0 z-50 md:relative md:flex ${isMenuOpen ? 'flex' : 'hidden'}`}
      >
        <Sidebar />
      </div>
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      <div className="flex flex-1 flex-col">
        <Header
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          title="Admin Dashboard"
          isAdmin
        />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default MainLayout;
