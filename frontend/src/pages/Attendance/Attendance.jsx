import { Camera, MapPin } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function Attendance() {
  const [location, setLocation] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Get location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Stop camera when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleAttendanceClick = async () => {
    if (!isCameraActive) {
      alert("Please activate the camera first");
      return;
    }

    if (!location) {
      alert("Please enable location services");
      return;
    }

    setIsProcessing(true);
    try {
      // Capture image
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");

      // Get current location
      const currentLocation = await getCurrentLocation();
      
      // Send data to server
      const response = await fetch("http://localhost:5000/mark-attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
          location: currentLocation
        }),
      });

      const data = await response.json();
      alert("Attendance marked successfully!");

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to mark attendance. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Please enable location services to mark attendance");
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  };

  const toggleCamera = async () => {
    if (isCameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      } catch (error) {
        console.error("Error accessing camera:", error);
        alert("Failed to access camera. Please ensure camera permissions are granted.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Attendance Portal
        </h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col items-center gap-6">
            <div className="relative w-full">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className={`w-full rounded-lg border-4 border-blue-200 ${
                  isCameraActive ? 'block' : 'hidden'
                }`}
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {!isCameraActive && (
                <div className="bg-gray-100 rounded-lg p-12 text-center">
                  <Camera size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Camera is currently inactive</p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={toggleCamera}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  isCameraActive
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white shadow-lg`}
                disabled={isProcessing}
              >
                <Camera size={20} />
                {isCameraActive ? 'Stop Camera' : 'Start Camera'}
              </button>
              
              <button
                onClick={handleAttendanceClick}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  !isCameraActive || isProcessing
                    ? 'bg-gray-400'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white shadow-lg`}
                disabled={!isCameraActive || isProcessing}
              >
                <MapPin size={20} />
                {isProcessing ? 'Processing...' : 'Mark Attendance'}
              </button>
            </div>

            {location && (
              <div className="text-sm text-gray-600 text-center">
                <p>📍 Location detected: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
