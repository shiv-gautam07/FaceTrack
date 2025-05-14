"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Camera, Save } from "lucide-react"

function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, Anytown, USA",
    department: "Engineering",
    position: "Software Developer",
    joinDate: "January 15, 2022",
    employeeId: "EMP001",
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen animate-gradient-x">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-transparent bg-clip-text animate-pulse">
          My Profile
        </h1>
        <button
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            isEditing 
              ? 'bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700' 
              : 'bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-700'
          } text-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <Save className="h-5 w-5 animate-bounce" />
              Save Changes
            </>
          ) : (
            <>
              <User className="h-5 w-5" />
              Edit Profile
            </>
          )}
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="card md:col-span-1 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="p-8 flex flex-col items-center text-center">
            <div className="relative group">
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 via-purple-200 to-pink-100 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                <User className="h-20 w-20 text-primary group-hover:rotate-12 transition-transform duration-300" />
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
                  <Camera className="h-5 w-5" />
                </button>
              )}
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-800 hover:text-primary transition-colors">{profileData.name}</h2>
            <p className="text-primary font-medium">{profileData.position}</p>
            <p className="text-gray-500">{profileData.department}</p>
            <div className="mt-6 px-6 py-3 bg-gradient-to-r from-primary/10 to-purple-100 rounded-lg hover:shadow-md transition-all duration-300">
              <p className="text-sm font-medium text-primary">Employee ID: {profileData.employeeId}</p>
            </div>
          </div>
        </div>

        <div className="card md:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-2xl transition-all duration-300">
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-primary/20 pb-2">Personal Information</h2>
            <div className="space-y-6">
              <input 
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 hover:shadow-md"
                placeholder="Enter your details"
              />
            </div>
          </div>
        </div>

        <div className="card md:col-span-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-2xl transition-all duration-300">
          <div className="p-8">
            <h2 className="text-xl font-bold mb-6 text-gray-800 border-b-2 border-primary/20 pb-2">Employment Information</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Employment information content */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
