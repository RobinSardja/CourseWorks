export default function InstructorDashboard() {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Current Courses</h2>
              <div className="space-y-2">
                <div className="bg-gray-100 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">CS 101</span>
                    <span className="text-sm text-gray-500">Introduction to Programming</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>Students: 25</span>
                    <span className="ml-4">Credits: 3</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">CS 250</span>
                    <span className="text-sm text-gray-500">Data Structures</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span>Students: 20</span>
                    <span className="ml-4">Credits: 4</span>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Grade Management</h2>
              <div className="space-y-4">
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                  Enter Grades
                </button>
                <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
                  View Student List
                </button>
                <button className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition">
                  Generate Course Report
                </button>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Department Information</h2>
              <div className="space-y-2">
                <p><strong>Department:</strong> Computer Science</p>
                <p><strong>Total Courses:</strong> 5</p>
                <p><strong>Current Semester:</strong> Fall 2024</p>
              </div>
            </div>
  
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Average Course Grade:</span>
                  <span className="font-medium">B+</span>
                </div>
                <div className="flex justify-between">
                  <span>Student Satisfaction:</span>
                  <span className="font-medium">4.5/5</span>
                </div>
                <div className="flex justify-between">
                  <span>Class Attendance:</span>
                  <span className="font-medium">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }