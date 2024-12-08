import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Helper function to format GPA
const formatGPA = (gpa) => Number(gpa).toFixed(2);

const SummaryReports = () => {
  const [activeTab, setActiveTab] = useState('gpa-stats');
  const [data, setData] = useState({
    gpaStats: [],
    departmentRankings: [],
    courseStats: [],
    instructorStats: [],
    studentCredits: []
  });

  // Fetch data for GPA statistics
  const fetchGPAStats = async () => {
    try {
      const response = await fetch('/api/gpa-stats');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching GPA stats:', error);
      return [];
    }
  };

  // Fetch data for department rankings
  const fetchDepartmentRankings = async () => {
    try {
      const response = await fetch('/api/department-rankings');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching department rankings:', error);
      return [];
    }
  };

  // Fetch data for course statistics
  const fetchCourseStats = async () => {
    try {
      const response = await fetch('/api/course-stats');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching course stats:', error);
      return [];
    }
  };

  // Fetch data for instructor statistics
  const fetchInstructorStats = async () => {
    try {
      const response = await fetch('/api/instructor-stats');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching instructor stats:', error);
      return [];
    }
  };

  // Fetch data for student credits
  const fetchStudentCredits = async () => {
    try {
      const response = await fetch('/api/student-credits');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching student credits:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [gpaStats, departmentRankings, courseStats, instructorStats, studentCredits] = await Promise.all([
        fetchGPAStats(),
        fetchDepartmentRankings(),
        fetchCourseStats(),
        fetchInstructorStats(),
        fetchStudentCredits()
      ]);

      setData({
        gpaStats,
        departmentRankings,
        courseStats,
        instructorStats,
        studentCredits
      });
    };

    fetchData();
  }, []);

  const renderGPAStats = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Major</TableHead>
          <TableHead>Highest GPA</TableHead>
          <TableHead>Lowest GPA</TableHead>
          <TableHead>Average GPA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.gpaStats.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.major}</TableCell>
            <TableCell>{formatGPA(row.highestGPA)}</TableCell>
            <TableCell>{formatGPA(row.lowestGPA)}</TableCell>
            <TableCell>{formatGPA(row.averageGPA)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderDepartmentRankings = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Rank</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Average GPA</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.departmentRankings.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.department}</TableCell>
            <TableCell>{formatGPA(row.avgGPA)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderCourseStats = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Semester</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Total Enrollments</TableHead>
          <TableHead>Average Grade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.courseStats.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.semester}</TableCell>
            <TableCell>{row.courseId}</TableCell>
            <TableCell>{row.totalEnrollments}</TableCell>
            <TableCell>{formatGPA(row.averageGrade)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderInstructorStats = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Instructor</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Students by Major</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.instructorStats.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.instructorName}</TableCell>
            <TableCell>{row.courseId}</TableCell>
            <TableCell>
              {Object.entries(row.studentsByMajor)
                .map(([major, count]) => `${major}: ${count}`)
                .join(', ')}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const renderStudentCredits = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Major</TableHead>
          <TableHead>Student Name</TableHead>
          <TableHead>Total Credits</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.studentCredits.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.major}</TableCell>
            <TableCell>{row.studentName}</TableCell>
            <TableCell>{row.totalCredits}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>Academic Summary Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="gpa-stats">GPA Statistics</TabsTrigger>
            <TabsTrigger value="department-rankings">Department Rankings</TabsTrigger>
            <TabsTrigger value="course-stats">Course Statistics</TabsTrigger>
            <TabsTrigger value="instructor-stats">Instructor Reports</TabsTrigger>
            <TabsTrigger value="student-credits">Student Credits</TabsTrigger>
          </TabsList>

          <TabsContent value="gpa-stats">{renderGPAStats()}</TabsContent>
          <TabsContent value="department-rankings">{renderDepartmentRankings()}</TabsContent>
          <TabsContent value="course-stats">{renderCourseStats()}</TabsContent>
          <TabsContent value="instructor-stats">{renderInstructorStats()}</TabsContent>
          <TabsContent value="student-credits">{renderStudentCredits()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SummaryReports;