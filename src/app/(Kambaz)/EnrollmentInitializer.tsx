"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEnrollments } from "./Enrollments/reducer";
import * as enrollmentClient from "./Enrollments/client";
import * as db from "./Database";
import { RootState } from "./store";

export default function EnrollmentInitializer() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        if (currentUser) {
          // Fetch enrollments from API for logged-in user
          const enrollments = await enrollmentClient.findEnrollmentsForUser(
            (currentUser as any)._id
          );
          dispatch(setEnrollments(enrollments));
        } else {
          // Fallback to local data if no user or API fails
          dispatch(setEnrollments(db.enrollments));
        }
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
        // Fallback to local data on error
        dispatch(setEnrollments(db.enrollments));
      }
    };

    fetchEnrollments();
  }, [dispatch, currentUser]);

  return null;
}