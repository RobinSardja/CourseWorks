export default function AdvisorDashboard() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Advisor Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Advisees</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>John Doe</span>
                  <span className="text-sm text-gray-500">Computer Science</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Jane Smith</span>
                  <span className="text-sm text-gray-500">Mathematics</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Alex Johnson</span>
                  <span className="text-sm text-gray-500">Physics</span>
                </div>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Course Management</h2>
              <div className="space-y-4">
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                  Add/Drop Students from Courses
                </button>
                <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
                  View Course Enrollments
                </button>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Department Information</h2>
              <div className="space-y-2">
                <p><strong>Department:</strong> Computer Science</p>
                <p><strong>Total Advisees:</strong> 15</p>
                <p><strong>Average Student GPA:</strong> 3.42</p>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-4">
                <button className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition">
                  Generate Advisement Report
                </button>
                <button className="w-full bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition">
                  Schedule Advisement Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }