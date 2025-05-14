"use client"

import { useState } from "react"
import { Calendar, Plus } from "lucide-react"

function Leave() {
  const [activeTab, setActiveTab] = useState("requests")

  const leaveRequests = [
    {
      id: 1,
      type: "Sick Leave",
      startDate: "2024-03-15",
      endDate: "2024-03-16",
      days: 2,
      status: "Approved",
      reason: "Medical appointment",
    },
    {
      id: 2,
      type: "Casual Leave",
      startDate: "2024-04-10",
      endDate: "2024-04-10",
      days: 1,
      status: "Pending",
      reason: "Personal work",
    },
    {
      id: 3,
      type: "Paid Leave",
      startDate: "2024-05-20",
      endDate: "2024-05-25",
      days: 6,
      status: "Rejected",
      reason: "Family vacation",
    },
  ]

  const leaveBalance = [
    { type: "Sick Leave", total: 10, used: 2, remaining: 8 },
    { type: "Casual Leave", total: 12, used: 5, remaining: 7 },
    { type: "Paid Leave", total: 15, used: 6, remaining: 9 },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <div className="badge badge-success">Approved</div>
      case "Pending":
        return <div className="badge badge-warning">Pending</div>
      case "Rejected":
        return <div className="badge badge-danger">Rejected</div>
      default:
        return <div className="badge">{status}</div>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Leave Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">
          <Plus className="h-4 w-4" />
          New Leave Request
        </button>
      </div>

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${activeTab === "requests" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("requests")}
        >
          My Requests
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "balance" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("balance")}
        >
          Leave Balance
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === "calendar" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar View
        </button>
      </div>

      {activeTab === "requests" && (
        <div className="card">
          <div className="p-6 pb-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Leave Requests</h2>
              <div className="flex items-center gap-2">
                <select className="p-1 border rounded-md text-sm">
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">From</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">To</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Days</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Reason</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="border-b">
                      <td className="p-3">{request.type}</td>
                      <td className="p-3">{request.startDate}</td>
                      <td className="p-3">{request.endDate}</td>
                      <td className="p-3">{request.days}</td>
                      <td className="p-3">{request.reason}</td>
                      <td className="p-3">{getStatusBadge(request.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "balance" && (
        <div className="card">
          <div className="p-6 pb-3">
            <h2 className="text-lg font-semibold">Leave Balance</h2>
          </div>
          <div className="p-6 pt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Leave Type</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Total</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Used</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Remaining</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveBalance.map((balance, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{balance.type}</td>
                      <td className="p-3">{balance.total}</td>
                      <td className="p-3">{balance.used}</td>
                      <td className="p-3">{balance.remaining}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "calendar" && (
        <div className="card">
          <div className="p-6 pb-3">
            <h2 className="text-lg font-semibold">Leave Calendar</h2>
          </div>
          <div className="p-6 pt-0">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-2">Calendar view will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leave
