import React from 'react'
import Link from "next/link";
import { Button, Form } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa6'
import { FaSearch } from 'react-icons/fa'
import { useParams } from 'next/navigation';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function AssignmentControls({ cid, isInstructor }: { cid: any; isInstructor: boolean }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div className="me-2" style={{ maxWidth: 300, position: 'relative' }}>
        <FaSearch
          className="position-absolute"
          style={{ left: 10, top: '50%', transform: 'translateY(-50%)', color: '#6c757d', zIndex: 5, pointerEvents: 'none', fontSize: '1rem' }}
          aria-hidden
        />
        <Form.Control
          type="text"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          className="me-2"
          style={{ paddingLeft: 44, maxWidth: '100%' }}
        />
      </div>
      <div>
        {isInstructor && (
          <>
            <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
              <FaPlus className="me-2" />
              Group
            </Button>
            <Link href={`/Courses/${cid}/Assignments/new`}>
              <Button variant="danger" size="lg" id="wd-add-assignment">
                <FaPlus className="me-2" />
                Assignment
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}