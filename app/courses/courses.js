// pages/api/courses.js

import supabase from '../../supabase.js';  // Ensure you have your Supabase client setup correctly

export async function createCourse(req) {
    console.log(req);
    const { CoursePrefix, CourseNumber, Credits, DepartmentID } = req;

    // Check if the course already exists by CoursePrefix and CourseNumber
    const { data: existingCourse, error: courseError } = await supabase
        .from('Courses')  // Correct table name with uppercase 'C'
        .select()
        .eq('CoursePrefix', CoursePrefix) // Correct column name
        .eq('CourseNumber', CourseNumber)  // Correct column name
        .single();

    if (existingCourse) {
        alert('Course already exists')
        return;
    }

    if (courseError) {
        alert(courseError['message'])
        return;
    }

    // Insert the new course into the 'Courses' table
    const { data, error } = await supabase
        .from('Courses')  // Correct table name with uppercase 'C'
        .insert([{ 
          // Ensure column name matches Supabase schema
            CoursePrefix: CoursePrefix, 
            CourseNumber: CourseNumber, 
            Credits: Credits,
            DepartmentID: DepartmentID
        }]);
}