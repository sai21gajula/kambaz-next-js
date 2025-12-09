import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

// Get all assignments for a specific course
export const getAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

// Get a specific assignment by ID
export const getAssignmentById = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

// Create a new assignment for a course
export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return data;
};

// Update an existing assignment
export const updateAssignment = async (assignmentId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignmentId}`,
    updates
  );
  return data;
};

// Delete an assignment
export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return data;
};

export const fetchAssignmentsForCourse = getAssignmentsForCourse;
export const createAssignmentForCourse = createAssignment;

export default {
  getAssignmentsForCourse,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  fetchAssignmentsForCourse,
  createAssignmentForCourse,
};
