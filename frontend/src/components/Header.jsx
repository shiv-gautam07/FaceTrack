"use client"

import { Menu, Bell } from "lucide-react"

function Header({ onMenuClick, title, isAdmin = false }) {
  return (
    <header className="flex h-14 items-center gap-4  px-4 lg:h-[60px] lg:px-6">
      <button className="lg:hidden h-10 w-10 rounded-md flex items-center justify-center" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </button>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="relative h-10 w-10 rounded-md flex items-center justify-center">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs">
              3
            </span>
          </button>
        </div>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm font-medium">{isAdmin ? "AD" : "JD"}</span>
        </div>
      </div>
    </header>
  )
}

export default Header
