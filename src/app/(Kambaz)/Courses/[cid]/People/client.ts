import axios from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any */

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const USERS_API = `${HTTP_SERVER}/api/users`;

export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(USERS_API);
  return data;
};

export const findUserById = async (id: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${id}`);
  return data;
};

export const findUserByUsername = async (username: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${username}`);
  return data;
};

export const findUsersInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/courses/${courseId}/users`);
  return data;
};

export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(USERS_API, user);
  return data;
};

export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return data;
};

export const deleteUser = async (userId: string) => {
  await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};

export default {
  findAllUsers,
  findUserById,
  findUserByUsername,
  findUsersInCourse,
  createUser,
  updateUser,
  deleteUser,
};
