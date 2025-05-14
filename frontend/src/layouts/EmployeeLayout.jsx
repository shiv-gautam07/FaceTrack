"use client"

import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

function EmployeeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 md:flex-row">
      <div className={`fixed inset-y-0 z-50 md:relative md:flex ${sidebarOpen ? "flex" : "hidden"}`}>
        <Sidebar />
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-300 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex flex-1 flex-col">
        <Header 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
          onBellClick={() => setShowNotifications(!showNotifications)}
          notificationCount={notifications.length}
          showNotifications={showNotifications}
          notifications={notifications}
          title="Employee Dashboard"
          className="shadow-lg bg-white/90 backdrop-blur-sm"
        />
        <main className="flex-1 p-4 md:p-6 bg-white/40 backdrop-blur-sm shadow-inner">
          <div className="rounded-lg bg-white/80 p-4 shadow-xl transition-all duration-300 hover:shadow-2xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default EmployeeLayout
