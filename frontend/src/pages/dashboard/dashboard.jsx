"use client"
import { useState, useEffect } from "react"
import { Clock, Calendar, Timer, MapPin, Bell } from "lucide-react"
import { useNavigate } from 'react-router-dom'
function SummaryCard({ title, value, description, icon: Icon, trend }) {
  return (
    <div className="">
    <div className="card bg-white rounded-lg shadow h-40 ">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className="flex items-center pt-1">
            <span className={`text-xs ${trend.positive ? "text-green-500" : "text-red-500"}`}>
              {trend.positive ? "+" : "-"}
              {trend.value}
            </span>
            <span className="text-xs text-muted-foreground ml-1">from last month</span>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}

function TimerWidget() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isActive, setIsActive] = useState(true)
  const [checkInTime] = useState("09:00 AM")

  useEffect(() => {
    let interval = null

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newSeconds = prevTime.seconds + 1
          const newMinutes = prevTime.minutes + Math.floor(newSeconds / 60)
          const newHours = prevTime.hours + Math.floor(newMinutes / 60)

          return {
            hours: newHours,
            minutes: newMinutes % 60,
            seconds: newSeconds % 60,
          }
        })
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive])

  const formatTime = (value) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <div className="bg-white rounded-lg shadow h-40 card">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium">Work Timer</h3>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="flex flex-col space-y-2">
          <div className="text-3xl font-bold">
            {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Check-in: {checkInTime}</div>
            <div className="badge badge-success">Active</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GPSWidget() {
  const [location, setLocation] = useState(null);
  const [isInsideZone, setIsInsideZone] = useState(false);
  const officeLocation = {
    latitude: 28.6139, // Delhi coordinates
    longitude: 77.2090,
    // address: "Netaji Subhas University of Technology, Dwarka Sector-3, Delhi",
    // name: "NSUT Campus"
  };

  useEffect(() => {
    // Get current location
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });

          // Calculate distance from office
          const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            officeLocation.latitude,
            officeLocation.longitude
          );

          // Check if within 1 kilometer radius
          setIsInsideZone(distance <= 1.0);
          
          // Store location in localStorage
          localStorage.setItem('currentLocation', JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString(),
            isInsideZone: distance <= 1.0
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { 
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000
        }
      );

      // Cleanup
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <div className="bg-white rounded-lg h-40 shadow card">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium">Current Location</h3>
        <MapPin className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="flex flex-col space-y-3">
          <div className="text-center">
            <div className="font-medium">
              {location ? (
                <p className="text-xs">
                  Lat: {location.latitude.toFixed(4)}, Long: {location.longitude.toFixed(4)}
                </p>
              ) : (
                <p className="text-xs">Fetching location...</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p className="font-medium">{officeLocation.name}</p>
              <p className="text-xs text-muted-foreground">{officeLocation.address}</p>
            </div>
            <div className={`badge ${isInsideZone ? 'badge-success' : 'badge-error'}`}>
              {isInsideZone ? 'Inside Campus' : 'Outside Campus'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate distance between two coordinates in kilometers
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function NotificationPanel() {
  const notifications = [
    {
      id: 1,
      title: "Leave Approved",
      description: "Your leave request for May 15-16 has been approved",
      time: "10 minutes ago",
      icon: Calendar,
      read: false,
    },
    {
      id: 2,
      title: "Check-in Reminder",
      description: "Don't forget to check-in when you arrive at the office",
      time: "1 hour ago",
      icon: Clock,
      read: false,
    },
    {
      id: 3,
      title: "System Update",
      description: "The attendance system will be updated tonight at 2 AM",
      time: "Yesterday",
      icon: Bell,
      read: true,
    },
  ]

  return (
    <div className="card col-span-full">
      <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
        <h3 className="text-sm font-medium">Recent Notifications</h3>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-4 rounded-lg border p-3 ${!notification.read ? "bg-muted/50" : ""}`}
            >
              <div className="rounded-full bg-primary/10 p-2">
                <notification.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{notification.title}</p>
                  {!notification.read && <div className="badge">New</div>}
                </div>
                <p className="text-xs text-muted-foreground">{notification.description}</p>
                <p className="text-xs text-muted-foreground">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuickActions() {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRequestLeaveModalOpen, setIsRequestLeaveModalOpen] = useState(false);

    // Function to handle opening the modal
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    // Function to handle closing the modal
    const closeModal = () => {
      setIsModalOpen(false);
    };
  const openRequestLeaveModal = () => {
    setIsRequestLeaveModalOpen(true);
  };

  // Function to handle closing the "Request Leave" modal
  const closeRequestLeaveModal = () => {
    setIsRequestLeaveModalOpen(false);
  };
    // Function for marking attendance (button click handler)
    const handleMarkAttendance = () => {
      console.log("Mark Attendance clicked");
      openModal();  // Example: Open the modal when the button is clicked
    };
  
    // Function for leave request (button click handler)
    const handleRequestLeave = () => {
      console.log("Request Leave clicked");
      openRequestLeaveModal();
      // You can add logic here to open a leave request form or navigate to another page
    };
  
    // Function for viewing reports (button click handler)
    const handleViewReports = () => {
      console.log("View Reports clicked");
      // You can add logic here to open reports or navigate to another page
    };
  
    return (
      <div className="bg-white rounded-lg shadow card">
      <div className="p-6 pb-2">
        <h3 className="text-sm font-medium">Quick Actions</h3>
      </div>
      <div className="p-6 pt-0">
        <div className="grid grid-cols-1 gap-2">
        <button
          className="flex justify-start items-center w-full px-4 py-2 bg-primary text-primary-foreground rounded-md"
          onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Define office coordinates (replace with actual office coordinates)
              const officeLocation = {
                latitude: 12.9716, // Example coordinates
                longitude: 77.5946, // Example coordinates
                radius: 0.5 // 500 meters radius
              };
              
              // Calculate distance between current location and office
              const distance = calculateDistance(
                position.coords.latitude,
                position.coords.longitude,
                officeLocation.latitude,
                officeLocation.longitude
              );
              
              if (distance <= officeLocation.radius) {
                localStorage.setItem('lastAttendanceLocation', JSON.stringify({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  timestamp: new Date().toISOString()
                }));
                handleMarkAttendance();
              } else {
                alert("You must be within office premises to mark attendance");
              }
            },
            (error) => {
              console.error("Error getting location:", error);
              alert("Please enable location services to mark attendance");
            }
          );
            }}
          >
            <Clock className="mr-2 h-4 w-4" />
            <span className="font-semibold">Mark Attendance</span>
          </button>

          <button
          className="flex justify-start items-center w-full px-4 py-2 border bg-background rounded-md hover:bg-gray-100"
          onClick={() => {
          const currentDate = new Date().toISOString().split('T')[0];
          localStorage.setItem('leaveRequestDate', currentDate);
          handleRequestLeave();
          }}
        >
          <Calendar className="mr-2 h-4 w-4" />
          Request Leave
        </button>

        <button
          className="flex justify-start items-center w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
          onClick={() => {
          const attendanceData = localStorage.getItem('lastAttendanceLocation');
          if (attendanceData) {
            console.log('Attendance Data:', JSON.parse(attendanceData));
          }
          handleViewReports();
          }}
        >
          <Bell className="mr-2 h-4 w-4" />
          View Reports
        </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Attendance Marked!</h2>
          <p>Your attendance has been recorded successfully.</p>
          <button 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          onClick={closeModal}
          >
          Close
          </button>
        </div>
        </div>
      )}

      {isRequestLeaveModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Request Leave</h2>
          <p>Your leave request has been submitted.</p>
          <button 
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          onClick={closeRequestLeaveModal}
          >
          Close
          </button>
        </div>
        </div>
      )}
      </div>
    );
  }
  
function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Check-in Status"
          value="On Time"
          description="Today at 09:00 AM"
          icon={Clock}
          trend={{ value: "5%", positive: true }}
        />
        <SummaryCard title="Check-out" value="Pending" description="Expected at 05:00 PM" icon={Clock} />
        <SummaryCard
          title="Late Days"
          value="2"
          description="This month"
          icon={Calendar}
          trend={{ value: "1", positive: false }}
        />
        <SummaryCard
          title="Total Hours"
          value="156h"
          description="This month"
          icon={Timer}
          trend={{ value: "12h", positive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <TimerWidget />
        <GPSWidget />
        <QuickActions />
      </div>

      {/* <NotificationPanel /> */}
    </div>
  )
}

export default Dashboard
