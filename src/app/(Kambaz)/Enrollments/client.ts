import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const findAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/user/${userId}`);
  return data;
};

export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}/course/${courseId}`);
  return data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(ENROLLMENTS_API, { userId, courseId });
  return data;
};

export const unenrollUserFromCourse = async (enrollmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
  return data;
};

export default {
  findAllEnrollments,
  findEnrollmentsForUser,
  findEnrollmentsForCourse,
  enrollUserInCourse,
  unenrollUserFromCourse,
};
