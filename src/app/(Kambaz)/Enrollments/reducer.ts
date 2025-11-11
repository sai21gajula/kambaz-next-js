import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enrollUserInCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      const newEnrollment = {
        _id: uuidv4(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenrollUserFromCourse: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { setEnrollments, enrollUserInCourse, unenrollUserFromCourse } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
