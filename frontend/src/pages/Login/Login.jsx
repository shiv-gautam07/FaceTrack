"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Video, Eye, EyeOff } from "lucide-react"
import * as Yup from "yup"

function Login() {
  const [activeTab, setActiveTab] = useState("employee")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await schema.validate(formData, { abortEarly: false })
      setErrors({})

      // Navigate to the appropriate dashboard
      if (activeTab === "employee") {
        navigate("/")
      } else {
        navigate("/admin")
      }
    } catch (err) {
      const validationErrors = {}
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message
      })
      setErrors(validationErrors)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Video className="h-12 w-12 text-primary" />
          <h1 className="mt-4 text-3xl font-bold">Face & GPS Attendance</h1>
          <p className="mt-2 text-muted-foreground">Choose your login type to continue</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm overflow-hidden">
          <div className="flex border-b">
            <button
              className={`flex-1 px-4 py-3 font-medium ${
                activeTab === "employee" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}
              onClick={() => setActiveTab("employee")}
            >
              Employee
            </button>
            <button
              className={`flex-1 px-4 py-3 font-medium ${
                activeTab === "admin" ? "bg-[#003366] text-white" : "bg-muted"
              }`}
              onClick={() => setActiveTab("admin")}
            >
              Admin
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              {activeTab === "employee" ? "Employee Login" : "Admin Login"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium">
                  {activeTab === "employee" ? "Employee ID" : "Username"}
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={activeTab === "employee" ? "EMP001" : "admin"}
                  className="w-full p-2 border rounded-md"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <p className="text-destructive text-xs mt-1">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full p-2 border rounded-md"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </button>
                </div>
                {errors.password && <p className="text-destructive text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md text-white ${
                  activeTab === "employee" ? "bg-primary" : "bg-[#003366]"
                }`}
              >
                Sign In
              </button>

              <div className="text-sm text-center">
                <a href="#" className="text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
