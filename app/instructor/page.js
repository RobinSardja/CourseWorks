"use client";

import { useState, useEffect } from "react";
import studentCourses from "../data/StudentCourse.json";
import instructors from "../data/InstructorJson.json";
import instructorCourses from "../data/InstructorCourse.json";

export default function InstructorDashboard() {
  const [currentCourses, setCurrentCourses] = useState([]); // State for current courses
  const [performanceMetrics, setPerformanceMetrics] = useState({}); // State for performance metrics
  const [instructorInfo, setInstructorInfo] = useState({}); // State for instructor information
  const [report, setReport] = useState(""); // State for the generated report

  useEffect(() => {
    const instructorId = "T5"; // Instructor of interest

    // Fetch instructor information
    const instructor = instructors.find((inst) => inst.InstructorID === instructorId);
    setInstructorInfo(instructor || {});

    // Fetch courses taught by T5
    const coursesTaught = instructorCourses.filter(
      (course) => course.InstructorID === instructorId
    );

    // Ensure no repeated courses
    const uniqueCourses = Array.from(
      new Map(
        coursesTaught.map((course) => [
          `${course.CoursePrefix}-${course.CourseNumber}`,
          course,
        ])
      ).values()
    );

    // Prepare data for current courses
    const currentCoursesData = uniqueCourses.map((course) => {
      const enrolledStudents = studentCourses.filter(
        (sc) =>
          sc.CoursePrefix === course.CoursePrefix &&
          sc.CourseNumber === course.CourseNumber
      );

      return {
        courseCode: `${course.CoursePrefix} ${course.CourseNumber}`,
        courseName: `Course ${course.CoursePrefix} ${course.CourseNumber}`, // Adjust with real course names if available
        students: enrolledStudents.length,
        credits: course.Credits,
      };
    });

    setCurrentCourses(currentCoursesData);

    // Calculate performance metrics
    const totalStudents = currentCoursesData.reduce(
      (sum, course) => sum + course.students,
      0
    );

    const gradePoints = studentCourses
      .filter((sc) =>
        coursesTaught.some(
          (course) =>
            course.CoursePrefix === sc.CoursePrefix &&
            course.CourseNumber === sc.CourseNumber
        )
      )
      .map((sc) => {
        switch (sc.Grade) {
          case "A":
          case "S":
            return 4;
          case "B":
            return 3;
          case "C":
            return 2;
          case "D":
            return 1;
          case "F":
          case "U":
          case "I":
            return 0;
          default:
            return 0;
        }
      });

    const averageGrade =
      gradePoints.length > 0
        ? (
            gradePoints.reduce((sum, gp) => sum + gp, 0) / gradePoints.length
          ).toFixed(2)
        : "N/A";

    const classAttendance = "92%"; // Example static value, adjust if dynamic data is available

    setPerformanceMetrics({
      averageGrade,
      studentSatisfaction: "4.5/5", // Example static value
      classAttendance,
      totalStudents,
    });
  }, []);

  const generateCourseReport = () => {
    const instructorId = "T5";

    const coursesTaught = instructorCourses.filter(
      (course) => course.InstructorID === instructorId
    );

    const reportSections = coursesTaught.map((course) => {
      const enrolledStudents = studentCourses.filter(
        (sc) =>
          sc.CoursePrefix === course.CoursePrefix &&
          sc.CourseNumber === course.CourseNumber
      );

      const gradePoints = enrolledStudents.map((sc) => {
        switch (sc.Grade) {
          case "A":
          case "S":
            return 4;
          case "B":
            return 3;
          case "C":
            return 2;
          case "D":
            return 1;
          case "F":
          case "U":
          case "I":
            return 0;
          default:
            return 0;
        }
      });

      const avgGrade =
        gradePoints.length > 0
          ? (gradePoints.reduce((sum, gp) => sum + gp, 0) / gradePoints.length).toFixed(2)
          : "N/A";

      const studentDetails = enrolledStudents
        .map(
          (student) =>
            `  Student ID: ${student.StudentID}, Grade: ${student.Grade}`
        )
        .join("\n");

      return `Course: ${course.CoursePrefix} ${course.CourseNumber} (${course.Semester} ${course.YearTaught})
  Credits: ${course.Credits}
  Average Grade: ${avgGrade}
  Enrolled Students:
${studentDetails || "  None"}\n`;
    });

    const fullReport = reportSections.join("\n");

    setReport(fullReport || "No courses found for the instructor.");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Instructor Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Courses Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Current Courses</h2>
            <div className="space-y-2">
              {currentCourses.length > 0 ? (
                currentCourses.map((course, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-3 rounded flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{course.courseCode}</span>
                      <span className="text-sm text-gray-500 ml-4">
                        {course.courseName}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Students: {course.students}</span>
                      <span className="ml-4">Credits: {course.credits}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No current courses found.</p>
              )}
            </div>
          </div>

          {/* Grade Management Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Grade Management</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                Enter Grades
              </button>
              <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
                View Student List
              </button>
              <button
                onClick={generateCourseReport}
                className="w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition"
              >
                Generate Course Report
              </button>
            </div>
          </div>

          {/* Instructor Information Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Instructor Information</h2>
            <div className="space-y-2">
              <p>
                <strong>Department:</strong> {instructorInfo.DepartmentID || "N/A"}
              </p>
              <p>
                <strong>Instructor ID:</strong> {instructorInfo.InstructorID || "N/A"}
              </p>
              <p>
                <strong>Current Semester:</strong> Fall 2024
              </p>
            </div>
          </div>

          {/* Performance Metrics Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Average Course Grade:</span>
                <span className="font-medium">
                  {performanceMetrics.averageGrade || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Student Satisfaction:</span>
                <span className="font-medium">
                  {performanceMetrics.studentSatisfaction || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Class Attendance:</span>
                <span className="font-medium">
                  {performanceMetrics.classAttendance || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Students:</span>
                <span className="font-medium">
                  {performanceMetrics.totalStudents || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Course Report Section */}
          {report && (
            <div className="bg-white p-6 rounded-lg shadow col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Generated Report</h2>
              <pre className="whitespace-pre-wrap text-sm">{report}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
