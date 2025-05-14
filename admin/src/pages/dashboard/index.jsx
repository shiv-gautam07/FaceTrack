const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white p-5 shadow rounded-lg">
          <p className="text-gray-500">Total Employees</p>
          <p className="text-lg font-semibold ">1,234</p>
          <p className="text-sm text-gray-500">+20 this month</p>
        </div>
        <div className="bg-white p-5 shadow rounded-lg">
          <p className="text-gray-500">Today's Attendance</p>
          <p className="text-lg font-semibold">1,180</p>
          <p className="text-sm text-gray-500">95% of total employees</p>
        </div>
        <div className="bg-white p-5 shadow rounded-lg">
          <p className="text-gray-500">Active Locations</p>
          <p className="text-lg font-semibold">5</p>
          <p className="text-sm text-gray-500">Across 3 cities</p>
        </div>
        <div className="bg-white p-5 shadow rounded-lg">
          <p className="text-gray-500">Pending Requests</p>
          <p className="text-lg font-semibold">23</p>
          <p className="text-sm text-gray-500">5 high priority</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
