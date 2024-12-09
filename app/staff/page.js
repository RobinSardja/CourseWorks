"use client";

import { useState, useEffect } from "react";
import staff from "../data/Staffs.json";
import instructors from "../data/InstructorJson.json";
import students from "../data/Students.json";
import courses from "../data/Courses.json";
import departments from "../data/departmentscsv.json";

export default function StaffDashboard() {
  const [actionType, setActionType] = useState("add"); // "add", "remove", or "modify"
  const [entityType, setEntityType] = useState("courses"); // "courses", "instructors", "students", "departments"
  const [staffInfo, setStaffInfo] = useState({});
  const [feedback, setFeedback] = useState("");
  const [formData, setFormData] = useState({});
  const [auditLog, setAuditLog] = useState([]); // Stores all actions performed

  useEffect(() => {
    // Set default staff (F5)
    const defaultStaff = staff.find((s) => s.StaffID === "F5");
    if (defaultStaff) {
      setStaffInfo(defaultStaff);
    } else {
      setFeedback("Default staff (F5) not found.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAction = () => {
    let feedbackMessage = "";
    switch (entityType) {
      case "courses":
        feedbackMessage = handleCourseActions();
        break;
      case "instructors":
        feedbackMessage = handleInstructorActions();
        break;
      case "students":
        feedbackMessage = handleStudentActions();
        break;
      case "departments":
        feedbackMessage = handleDepartmentActions();
        break;
      default:
        feedbackMessage = "Invalid entity type selected.";
    }

    // Update feedback and log the action
    setFeedback(feedbackMessage);
    logAudit({
      timestamp: new Date().toLocaleString(),
      staffId: staffInfo.StaffID,
      departmentId: staffInfo.DepartmentID,
      entityType,
      actionType,
      details: formData,
      result: feedbackMessage,
    });
  };

  const logAudit = (entry) => {
    setAuditLog((prevLog) => [entry, ...prevLog]);
  };

  const handleCourseActions = () => {
    const { CoursePrefix, CourseNumber, Credits } = formData;
    if (!CoursePrefix || !CourseNumber) return "CoursePrefix and CourseNumber are required.";

    if (actionType === "add") {
      if (courses.some((course) => course.CoursePrefix === CoursePrefix && course.CourseNumber === parseInt(CourseNumber))) {
        return "Course already exists.";
      }
      courses.push({
        CoursePrefix,
        CourseNumber: parseInt(CourseNumber),
        Credits: parseInt(Credits) || 3,
        DepartmentID: staffInfo.DepartmentID,
      });
      return "Course added successfully.";
    }

    if (actionType === "remove") {
      const initialLength = courses.length;
      courses = courses.filter(
        (course) =>
          course.CoursePrefix !== CoursePrefix || course.CourseNumber !== parseInt(CourseNumber)
      );
      return initialLength > courses.length ? "Course removed successfully." : "Course not found.";
    }

    if (actionType === "modify") {
      const course = courses.find(
        (course) =>
          course.CoursePrefix === CoursePrefix && course.CourseNumber === parseInt(CourseNumber)
      );
      if (!course) return "Course not found.";
      course.Credits = parseInt(Credits) || course.Credits;
      return "Course modified successfully.";
    }

    return "Invalid action type.";
  };

  const handleInstructorActions = () => {
    const { InstructorID } = formData;
    if (!InstructorID) return "InstructorID is required.";

    if (actionType === "add") {
      if (instructors.some((inst) => inst.InstructorID === InstructorID)) {
        return "Instructor already exists.";
      }
      instructors.push({
        InstructorID,
        DepartmentID: staffInfo.DepartmentID,
      });
      return "Instructor added successfully.";
    }

    if (actionType === "remove") {
      const initialLength = instructors.length;
      instructors = instructors.filter((inst) => inst.InstructorID !== InstructorID);
      return initialLength > instructors.length ? "Instructor removed successfully." : "Instructor not found.";
    }

    if (actionType === "modify") {
      const instructor = instructors.find((inst) => inst.InstructorID === InstructorID);
      if (!instructor) return "Instructor not found.";
      return "No modifiable attributes for instructors in the current setup.";
    }

    return "Invalid action type.";
  };

  const handleStudentActions = () => {
    const { StudentID, Major } = formData;
    if (!StudentID) return "StudentID is required.";

    if (actionType === "add") {
      if (students.some((stu) => stu.StudentID === StudentID)) {
        return "Student already exists.";
      }
      students.push({
        StudentID,
        Major,
      });
      return "Student added successfully.";
    }

    if (actionType === "remove") {
      const initialLength = students.length;
      students = students.filter((stu) => stu.StudentID !== StudentID);
      return initialLength > students.length ? "Student removed successfully." : "Student not found.";
    }

    if (actionType === "modify") {
      const student = students.find((stu) => stu.StudentID === StudentID);
      if (!student) return "Student not found.";
      student.Major = Major || student.Major;
      return "Student modified successfully.";
    }

    return "Invalid action type.";
  };

  const handleDepartmentActions = () => {
    const { DepartmentID, MajorOffered } = formData;
    if (!DepartmentID) return "DepartmentID is required.";

    if (actionType === "add") {
      if (departments.some((dept) => dept.DepartmentID === DepartmentID)) {
        return "Department already exists.";
      }
      departments.push({
        DepartmentID,
        MajorOffered,
      });
      return "Department added successfully.";
    }

    if (actionType === "remove") {
      const initialLength = departments.length;
      departments = departments.filter((dept) => dept.DepartmentID !== DepartmentID);
      return initialLength > departments.length ? "Department removed successfully." : "Department not found.";
    }

    if (actionType === "modify") {
      const department = departments.find((dept) => dept.DepartmentID === DepartmentID);
      if (!department) return "Department not found.";
      department.MajorOffered = MajorOffered || department.MajorOffered;
      return "Department modified successfully.";
    }

    return "Invalid action type.";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Staff Dashboard</h1>

        {/* Staff Information Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Staff Information</h2>
          <div className="space-y-2">
            <p>
              <strong>Staff ID:</strong> {staffInfo.StaffID || "N/A"}
            </p>
            <p>
              <strong>Department ID:</strong> {staffInfo.DepartmentID || "N/A"}
            </p>
          </div>
        </div>

        {/* Manage Data Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-semibold mb-4">Manage Data</h2>
          <div className="space-y-4">
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="courses">Courses</option>
              <option value="instructors">Instructors</option>
              <option value="students">Students</option>
              <option value="departments">Departments</option>
            </select>

            <select
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="add">Add</option>
              <option value="remove">Remove</option>
              <option value="modify">Modify</option>
            </select>

            {/* Input fields */}
            <input
              type="text"
              name="CoursePrefix"
              placeholder="Course Prefix / InstructorID / StudentID / DepartmentID"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="CourseNumber"
              placeholder="Course Number / Major Offered"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="Credits"
              placeholder="Credits (for courses only)"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <button
              onClick={handleAction}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              Perform Action
            </button>
          </div>

          {/* Feedback */}
          <div className="mt-4 text-sm text-gray-600">{feedback}</div>
        </div>

        {/* Audit Log Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Audit Log</h2>
          <div className="max-h-64 overflow-y-auto space-y-2">
            {auditLog.map((log, index) => (
              <div key={index} className="border-b pb-2 mb-2">
                <p className="text-sm">
                  <strong>Time:</strong> {log.timestamp}
                </p>
                <p className="text-sm">
                  <strong>Staff ID:</strong> {log.staffId} |{" "}
                  <strong>Action:</strong> {log.actionType} |{" "}
                  <strong>Entity:</strong> {log.entityType}
                </p>
                <p className="text-sm">
                  <strong>Details:</strong> {JSON.stringify(log.details)}
                </p>
                <p className="text-sm">
                  <strong>Result:</strong> {log.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
