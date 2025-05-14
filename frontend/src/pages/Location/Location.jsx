import { MapPin, Navigation, Target, AlertCircle } from "lucide-react"

function Location() {
  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          GPS Location
        </h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/20 hover:scale-105">
            <Navigation className="h-4 w-4 animate-pulse" />
            Update Location
          </button>
        </div>
      </div>

      <div className="card backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:shadow-2xl transition-all duration-300 rounded-xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Current Location</h2>
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 hover:from-primary/30 hover:to-primary/10 transition-all duration-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
              <MapPin className="h-20 w-20 text-primary animate-bounce drop-shadow-lg" />
              <p className="mt-4 text-sm font-medium bg-white/80 px-4 py-2 rounded-full shadow-lg">Map View</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <h3 className="text-lg font-medium text-primary">Office Headquarters</h3>
              <p className="text-sm text-muted-foreground">123 Business Ave, Suite 100</p>
            </div>
            <div className="badge badge-success shadow-lg px-4 py-2 rounded-full animate-pulse">Inside Geofence</div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="card backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:shadow-2xl transition-all duration-300 rounded-xl">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Allowed Locations</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 hover:bg-primary/5 p-4 rounded-xl transition-all duration-200 cursor-pointer transform hover:scale-102">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Target className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">Office Headquarters</p>
                    <p className="text-sm text-muted-foreground">500m radius</p>
                  </div>
                </div>
                <div className="badge badge-success shadow-lg px-4 py-2 rounded-full">Active</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 hover:shadow-2xl transition-all duration-300 rounded-xl">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Location History</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4 hover:bg-primary/5 p-4 rounded-xl transition-all duration-200 cursor-pointer transform hover:scale-102">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Office Headquarters</p>
                    <p className="text-sm text-muted-foreground">Today, 09:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location
