"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setEnrollments } from "./Enrollments/reducer";
import * as db from "./Database";

export default function EnrollmentInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setEnrollments(db.enrollments));
  }, [dispatch]);

  return null;
}