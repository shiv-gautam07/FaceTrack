import { Calendar, Clock, Settings } from "lucide-react"

function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Leave Approved",
      description: "Your leave request for May 15-16 has been approved by the manager.",
      time: "10 minutes ago",
      icon: Calendar,
      read: false,
    },
    {
      id: 2,
      title: "Check-in Reminder",
      description: "Don't forget to check-in when you arrive at the office today.",
      time: "1 hour ago",
      icon: Clock,
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      description:
        "The attendance system will be updated tonight at 2 AM. Please complete your check-out before that time.",
      time: "Yesterday",
      icon: Settings,
      read: true,
    },
    {
      id: 4,
      title: "Late Check-in",
      description: "You were marked late for your check-in on Monday, February 19.",
      time: "3 days ago",
      icon: Clock,
      read: true,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm">Mark All as Read</button>
        </div>
      </div>

      <div className="card">
        <div className="p-6 pb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Notifications</h2>
            <div className="flex items-center gap-2">
              <select className="p-1 border rounded-md text-sm">
                <option value="all">All Notifications</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 rounded-lg border p-4 ${!notification.read ? "bg-muted/50" : ""}`}
              >
                <div className="rounded-full bg-primary/10 p-2">
                  <notification.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {!notification.read && <div className="badge">New</div>}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 rounded-full peer bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 rounded-full peer bg-primary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 rounded-full peer bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
