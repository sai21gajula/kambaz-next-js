import React from 'react'
import { IoEllipsisVertical } from 'react-icons/io5';
import { FaTrash, FaPencil } from 'react-icons/fa6';
import Link from 'next/link';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AssignmentControlButtons({ 
  assignment, 
  isInstructor, 
  onDeleteClick, 
  cid 
}: { 
  assignment: any; 
  isInstructor: boolean; 
  onDeleteClick: (assignment: any) => void;
  cid: any;
}) {
  return (
    <div className="d-flex align-items-center gap-2">
      {isInstructor && (
        <>
          <Link href={`/Courses/${cid}/Assignments/${assignment._id}`}>
            <FaPencil 
              className="text-primary fs-5"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <FaTrash 
            className="text-danger fs-5"
            onClick={() => onDeleteClick(assignment)}
            style={{ cursor: "pointer" }}
          />
        </>
      )}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}