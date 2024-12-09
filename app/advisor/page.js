"use client";

import { useState, useEffect } from "react";
import students from "../data/Students.json";
import studentCourses from "../data/StudentCourse.json";
import courses from "../data/Courses.json";
import departments from "../data/departmentscsv.json"; // Fetching Advisor and Department information

export default function AdvisorDashboard() {
  const [studentID, setStudentID] = useState("");
  const [coursePrefix, setCoursePrefix] = useState("");
  const [courseNumber, setCourseNumber] = useState("");
  const [action, setAction] = useState("add"); // "add" or "drop"
  const [feedback, setFeedback] = useState("");
  const [advisorInfo, setAdvisorInfo] = useState({});
  const advisorId = "A7"; // Example Advisor ID, replace with actual logic

  useEffect(() => {
    // Fetch advisor information from departments
    const department = departments.find((dept) => dept.AdvisorID === advisorId);
    if (department) {
      setAdvisorInfo({
        advisorId: department.AdvisorID,
        departmentId: department.DepartmentID,
        majorOffered: department.MajorOffered,
      });
    }
  }, [advisorId]);

  const handleAddDropStudent = () => {
    if (!advisorInfo.advisorId) {
      setFeedback("Advisor not found in the department data.");
      return;
    }

    const student = students.find((stu) => stu.StudentID === studentID);
    if (!student) {
      setFeedback("Student not found.");
      return;
    }

    if (student.Major !== advisorInfo.majorOffered) {
      setFeedback(
        `Student's major (${student.Major}) does not match advisor's department (${advisorInfo.majorOffered}).`
      );
      return;
    }

    const course = courses.find(
      (course) =>
        course.CoursePrefix === coursePrefix &&
        course.CourseNumber === parseInt(courseNumber)
    );
    if (!course) {
      setFeedback("Course not found.");
      return;
    }

    const courseKey = {
      StudentID: studentID,
      CoursePrefix: coursePrefix,
      CourseNumber: parseInt(courseNumber),
    };

    if (action === "add") {
      // Check if the student is already enrolled in the course
      const alreadyEnrolled = studentCourses.some(
        (sc) =>
          sc.StudentID === studentID &&
          sc.CoursePrefix === coursePrefix &&
          sc.CourseNumber === parseInt(courseNumber)
      );

      if (alreadyEnrolled) {
        setFeedback("Student is already enrolled in this course.");
      } else {
        // Add student to the course
        studentCourses.push({
          ...courseKey,
          Semester: "Fall", // Example semester, replace with actual logic
          YearTaken: 2024, // Example year
          Grade: null, // Grade is null when first enrolled
        });
        setFeedback("Student successfully added to the course.");
      }
    } else if (action === "drop") {
      // Remove student from the course
      const initialLength = studentCourses.length;
      const updatedCourses = studentCourses.filter(
        (sc) =>
          !(
            sc.StudentID === studentID &&
            sc.CoursePrefix === coursePrefix &&
            sc.CourseNumber === parseInt(courseNumber)
          )
      );

      if (updatedCourses.length === initialLength) {
        setFeedback("Student is not enrolled in this course.");
      } else {
        setFeedback("Student successfully dropped from the course.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Advisor Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Advisor Information Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Advisor Information</h2>
            <div className="space-y-2">
              <p>
                <strong>Advisor ID:</strong> {advisorInfo.advisorId || "N/A"}
              </p>
              <p>
                <strong>Department ID:</strong> {advisorInfo.departmentId || "N/A"}
              </p>
              <p>
                <strong>Major Offered:</strong> {advisorInfo.majorOffered || "N/A"}
              </p>
            </div>
          </div>

          {/* Add/Drop Students Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Add/Drop Students</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={studentID}
                onChange={(e) => setStudentID(e.target.value)}
                placeholder="Student ID"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={coursePrefix}
                onChange={(e) => setCoursePrefix(e.target.value)}
                placeholder="Course Prefix (e.g., CS)"
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={courseNumber}
                onChange={(e) => setCourseNumber(e.target.value)}
                placeholder="Course Number (e.g., 101)"
                className="w-full p-2 border rounded"
              />
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="add">Add Student to Course</option>
                <option value="drop">Drop Student from Course</option>
              </select>
              <button
                onClick={handleAddDropStudent}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                {action === "add" ? "Add Student" : "Drop Student"}
              </button>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
            <div className="text-sm text-gray-600">{feedback || "No feedback yet."}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
