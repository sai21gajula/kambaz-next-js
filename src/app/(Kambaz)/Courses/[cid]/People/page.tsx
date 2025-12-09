"use client"
import { useParams, redirect } from "next/navigation";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function People() {
    const cid = useParams().cid;
  return redirect(`/Courses/${cid}/People/Table`);
  
}