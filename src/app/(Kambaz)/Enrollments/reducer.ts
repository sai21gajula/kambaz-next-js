import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action: PayloadAction<Enrollment[]>) => {
      state.enrollments = action.payload;
    },
    enrollUserInCourse: (
      state,
      action: PayloadAction<Enrollment>
    ) => {
      // Accept full enrollment object from API (includes _id)
      state.enrollments = [...state.enrollments, action.payload];
    },
    unenrollUserFromCourse: (
      state,
      action: PayloadAction<string>
    ) => {
      // Accept enrollment ID to remove
      const enrollmentId = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment._id !== enrollmentId
      );
    },
  },
});

export const { setEnrollments, enrollUserInCourse, unenrollUserFromCourse } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
