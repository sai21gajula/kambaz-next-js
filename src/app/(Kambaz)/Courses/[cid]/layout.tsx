"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode, useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import Breadcrumb from "./Breadcrumb";

export default function CoursesLayout(
  { children }: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const course = courses.find((course: any) => course._id === cid);
  const [showNavigation, setShowNavigation] = useState(true);

  // Route protection: check if user is enrolled
  useEffect(() => {
    if (!currentUser) {
      router.push('/Account/Signin');
      return;
    }

    const isEnrolled = enrollments.some(
      (enrollment: any) => 
        enrollment.user === (currentUser as any)._id && 
        enrollment.course === cid
    );

    if (!isEnrolled) {
      router.push('/Dashboard');
    }
  }, [currentUser, enrollments, cid, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify 
          className="me-4 fs-4 mb-1" 
          onClick={() => setShowNavigation(!showNavigation)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div className={showNavigation ? "d-block" : "d-none"}>
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          {children}
        </div>
      </div>
    </div>
  );
}