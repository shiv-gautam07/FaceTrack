// import { Route, Routes } from 'react-router';
// import './App.css';
// import Dashboard from './pages/dashboard/dashboard';
// import Attendance from './pages/Attendance/Attendance';

// function App() {


//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/Attendance" element={<Attendance/>}/>
//     </Routes>
//   );
// }

// export default App;
import {  BrowserRouter as Router,Route, Routes } from 'react-router';
import './App.css';
import Login from './pages/Login/Login';
import EmployeeLayout from './layouts/EmployeeLayout';
import Dashboard from './pages/dashboard/dashboard';
import Attendance from './pages/Attendance/Attendance';
import History from './pages/History/History';
import Location from './pages/Location/Location';
import Notifications from './pages/Notification/Notification';
import Leave from './pages/Leaves/leaves';
import Profile from './pages/Profile/Profile';

function App() {


  return (
    <Router>
    <Routes>
    <Route path="/login" element={<Login />} />

{/* Employee Routes */}
<Route path="/" element={<EmployeeLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="attendance" element={<Attendance />} />
  <Route path="history" element={<History />} />
  <Route path="location" element={<Location />} />
  <Route path="notifications" element={<Notifications />} />
  <Route path="leave" element={<Leave />} />
  <Route path="profile" element={<Profile />} />
  {/* <Route path="settings" element={<Settings />} /> */}
</Route>
    </Routes>
    </Router>
  );
}

export default App;
