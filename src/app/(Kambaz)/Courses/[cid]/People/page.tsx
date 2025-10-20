"use client"
import { useParams, redirect } from "next/navigation";

export default function People() {
    const cid = useParams().cid;
  return redirect(`/Courses/${cid}/People/Table`);
  
}