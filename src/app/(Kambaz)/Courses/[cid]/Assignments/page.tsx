"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { ListGroup, ListGroupItem, Button, Form, Modal } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaTrash, FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical, IoChevronDown } from "react-icons/io5";
import { FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);

  const handleDeleteClick = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAssignment) {
      dispatch(deleteAssignment(selectedAssignment._id));
      setShowDeleteModal(false);
      setSelectedAssignment(null);
    }
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Form.Control
          type="text"
          placeholder="Search for Assignments"
          id="wd-search-assignment"
          className="me-2"
          style={{ maxWidth: "300px" }}
        />
        <div>
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
        </div>
      </div>
      
      <ListGroup className="rounded-0">
        <ListGroupItem className="wd-assignment-group p-0 mb-0 fs-5 border-gray">
          <div className="wd-assignment-header p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <IoChevronDown className="me-2" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="wd-assignment-percentage me-3">40% of Total</span>
              <FaPlus className="fs-4 me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          
          <ListGroup className="rounded-0">
            {assignments
            .filter((assignment: any) => assignment.course === cid)
            .map((assignment: any) => (
              <ListGroupItem key={assignment._id} className="wd-assignment-item p-3 ps-1 d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 mt-1" />
                <FaFileAlt className="me-2 mt-1 text-success" />
                <div className="flex-grow-1"> 
                  <Link href={`/Courses/${cid}/Assignments/${assignment._id}`} className="text-decoration-none">
                    <strong className="text-dark">{assignment.title}</strong>
                  </Link>
                  <div className="text-muted small mt-1">
                    <span className="text-danger">Multiple Modules</span>
                    <span className="mx-1">|</span>
                    <span><strong>Not available until</strong> {new Date(assignment.until).toLocaleString()}</span>
                    <span className="mx-1">|</span>
                    <span><strong>Due</strong> {new Date(assignment.due).toLocaleString()}</span>
                    <span className="mx-1">|</span>
                    <span>{assignment.points} pts</span>
                  </div>
                </div>
                 <div className="d-flex align-items-center gap-2">
                  <FaCheckCircle className="text-success me-2" />
                  <Link href={`/Courses/${cid}/Assignments/${assignment._id}`}>
                    <FaPencil 
                      className="text-primary fs-5"
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                  <FaTrash 
                    className="text-danger fs-5"
                    onClick={() => handleDeleteClick(assignment)}
                    style={{ cursor: "pointer" }}
                  />
                  <IoEllipsisVertical className="fs-4" />
              </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete "{selectedAssignment?.title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}