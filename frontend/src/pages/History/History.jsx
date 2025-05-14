"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Download, Filter } from "lucide-react"

function History() {
  const [view, setView] = useState("daily")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [filteredData, setFilteredData] = useState([])

  // Enhanced mock data with more entries
  const attendanceData = [
    {
      date: "2024-02-26",
      checkIn: "09:00 AM",
      checkOut: "05:30 PM",
      status: "Present",
      hours: "8.5",
      location: "Office HQ",
    },
    // ... (previous mock data)
  ]

  // Filter data based on selected status
  useEffect(() => {
    const filtered = selectedStatus === "all"
      ? attendanceData
      : attendanceData.filter(record => record.status.toLowerCase() === selectedStatus)
    setFilteredData(filtered)
  }, [selectedStatus])

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case "Present":
        return <div className={`${baseClasses} bg-green-100 text-green-800`}>Present</div>
      case "Late":
        return <div className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Late</div>
      case "Absent":
        return <div className={`${baseClasses} bg-red-100 text-red-800`}>Absent</div>
      default:
        return <div className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</div>
    }
  }

  const handleMonthChange = (increment) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + increment)
      return newDate
    })
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Check-in,Check-out,Status,Hours,Location\n"
      + filteredData.map(row => Object.values(row).join(",")).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "attendance_history.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Attendance History</h1>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button 
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button 
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="flex border-b bg-white rounded-t-lg">
        {["daily", "monthly"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 font-medium transition-colors ${
              view === tab 
                ? "border-b-2 border-primary text-primary" 
                : "text-gray-600 hover:text-gray-900"
            }`}
            onClick={() => setView(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} View
          </button>
        ))}
      </div>

      {/* Rest of your component remains similar but with enhanced styling */}
      {/* Add similar styling improvements to your table and monthly view */}
    </div>
  )
}

export default History
