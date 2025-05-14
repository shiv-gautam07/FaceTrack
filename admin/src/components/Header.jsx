import { useState } from 'react';
import { Bell, LogOut, Menu } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useAuth } from '@/auth/AuthContext';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';

export function Header({ onMenuClick, title }) {
  const { user, logout } = useAuth();
  const [notifications] = useState(3);

  return (
    <header className="flex h-14 items-center gap-4 bg-sidebar px-4 lg:h-[60px] lg:px-6 shadow">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {/* {notifications > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
              >
                {notifications}
              </Badge>
            )} */}
          </Button>
        </div>
        {user ? (
          <>
            <div>
              <div>Welcome, {user.fullName}</div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Log out</span>
            </Button>
          </>
        ) : null}
        {/* <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" alt="User" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar> */}
      </div>
    </header>
  );
}
