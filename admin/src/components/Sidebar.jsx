import { Link, useLocation } from 'react-router';
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  Home,
  LogOut,
  MapPin,
  Settings,
  User,
  Video,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';

export default function Sidebar({}) {
  const location = useLocation();

  const navItems = [
    { title: 'Dashboard', href: '/', icon: Home },
    { title: 'User Management', href: '/users', icon: Users },
    { title: 'Attendance Logs', href: '/attendance', icon: Clock },
    { title: 'Face Recognition', href: '/face-recognition', icon: Video },
    { title: 'Location Management', href: '/location', icon: MapPin },
    { title: 'Notifications', href: '/notifications', icon: Bell },
    { title: 'Leave Management', href: '/leave', icon: Calendar },
    { title: 'Reports', href: '/reports', icon: FileText },
    { title: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
        <Link to={'/'} className="flex items-center gap-2 font-semibold">
          <Video className="h-6 w-6 text-primary" />
          <span>Face & GPS Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2 border-r border-gray-200">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-sidebar-foreground/80 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
