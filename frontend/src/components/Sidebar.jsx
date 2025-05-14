import { NavLink } from "react-router-dom"
import { Home, Video, Clock, MapPin, Bell, Calendar, User, Settings, LogOut } from "lucide-react"

function Sidebar() {
  const navItems = [
    { title: "Dashboard", href: "/dashboard", icon: Home },
    { title: "Attendance", href: "/attendance", icon: Video },
    { title: "History", href: "/history", icon: Clock },
    { title: "Location", href: "/location", icon: MapPin },
    { title: "Notifications", href: "/notifications", icon: Bell },
    { title: "Leave Management", href: "/leave", icon: Calendar },
    { title: "Profile", href: "/profile", icon: User },
    // { title: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Video className="text-blue-600 h-6 w-6 text-primary" />
          <span>Face & GPS</span>
        </NavLink>
      </div>
      <div className="flex-1 overflow-auto py-2 border-r border-gray-200">
        <nav className="grid items-start px-2 text-sm font-medium">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-black hover:bg-slate-900/10 hover:text-sidebar-foreground"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-sidebar-foreground/10">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <span className="text-sm font-medium">JD</span>
          </div>
          <div className="grid gap-0.5 text-sm">
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-sidebar-foreground/70">Employee ID: EMP001</div>
          </div>
          <NavLink
            to="/login"
            className="ml-auto rounded-full p-1 text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Log out</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
