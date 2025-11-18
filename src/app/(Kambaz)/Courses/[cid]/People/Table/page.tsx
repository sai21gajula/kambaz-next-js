/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { setUsers, updateUser, deleteUser, addUser } from "../reducer";
import * as usersClient from "../client";
import * as enrollmentClient from "../../../../Enrollments/client";
import * as db from "../../../../Database";
import { setCurrentUser } from "../../../../Account/reducer";

interface EditingUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  loginId: string;
  section: string;
  role: string;
}

export default function PeopleTable() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  
  // Get users from Redux (loaded from backend)
  const { users } = useSelector((state: RootState) => state.usersReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  
  // Modal and edit state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [formData, setFormData] = useState<EditingUser | null>(null);
  
  // Add user state
  const [addUsername, setAddUsername] = useState("");
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState("");
  
  // Fetch users enrolled in this course when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch only users in this specific course
        const courseUsers = await usersClient.findUsersInCourse(cid as string);
        dispatch(setUsers(courseUsers));
      } catch (error) {
        console.error("Failed to fetch course users:", error);
        // Fallback to local data filtered by course enrollment
        const courseEnrollments = db.enrollments.filter((e: any) => e.course === cid);
        const enrolledUserIds = courseEnrollments.map((e: any) => e.user);
        const filteredUsers = db.users.filter((u: any) => enrolledUserIds.includes(u._id));
        dispatch(setUsers(filteredUsers));
      }
    };

    fetchData();
  }, [dispatch, cid]);

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setFormData({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      loginId: user.loginId,
      section: user.section,
      role: user.role,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!formData) return;
    try {
      const updatedUser = await usersClient.updateUser(formData);
      dispatch(updateUser(updatedUser));
      
      // If editing current user's own profile, update the session
      if (currentUser && updatedUser._id === (currentUser as any)._id) {
        dispatch(setCurrentUser(updatedUser));
      }
      
      setShowEditModal(false);
      setEditingUser(null);
      setFormData(null);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteClick = async (userId: string) => {
    if (window.confirm("Are you sure you want to unenroll this user from the course?")) {
      try {
        // Find the enrollment for this user in this course
        const enrollment = enrollments.find(
          (e: any) => e.user === userId && e.course === cid
        );
        
        if (enrollment) {
          // Unenroll the user from the course (remove enrollment, not the user)
          await enrollmentClient.unenrollUserFromCourse((enrollment as any)._id);
          // Remove from the people table display
          dispatch(deleteUser(userId));
        }
      } catch (error) {
        console.error("Failed to unenroll user:", error);
      }
    }
  };

  const handleAddUser = async () => {
    if (!addUsername.trim()) {
      setAddUserError("Please enter a username");
      return;
    }

    setAddUserLoading(true);
    setAddUserError("");

    try {
      let foundUser = null;

      // Try to find user by username from API
      try {
        foundUser = await usersClient.findUserByUsername(addUsername);
      } catch (apiError) {
        console.error("API search failed, trying local database:", apiError);
        // Fallback: Search in local database
        foundUser = db.users.find((u: any) => u.username === addUsername);
      }

      if (!foundUser) {
        setAddUserError("User not found");
        setAddUserLoading(false);
        return;
      }

      // Check if user is already enrolled
      const alreadyEnrolled = enrollments.some(
        (e: any) => e.user === foundUser._id && e.course === cid
      );

      if (alreadyEnrolled) {
        setAddUserError("User is already enrolled in this course");
        setAddUserLoading(false);
        return;
      }

      // Enroll the user in the course
      const newEnrollment = await enrollmentClient.enrollUserInCourse(
        foundUser._id,
        cid as string
      );

      // Add user to the people table
      dispatch(addUser(foundUser));

      // Clear the input
      setAddUsername("");
      setAddUserError("");
    } catch (error) {
      console.error("Failed to add user:", error);
      setAddUserError("Failed to add user to course");
    } finally {
      setAddUserLoading(false);
    }
  };

  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  
 return (
  <>
    <div id="wd-people-table">
      {/* Add User Section (Faculty Only) */}
      {isFaculty && (
        <div className="mb-4 p-3 border rounded bg-light">
          <h5>Add User to Course</h5>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={addUsername}
              onChange={(e) => setAddUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
              disabled={addUserLoading}
            />
            <Button
              variant="success"
              onClick={handleAddUser}
              disabled={addUserLoading}
            >
              {addUserLoading ? "Adding..." : "Add User"}
            </Button>
          </div>
          {addUserError && <div className="alert alert-danger mt-2 mb-0">{addUserError}</div>}
        </div>
      )}

      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
              {isFaculty && (
                <td className="wd-actions text-center">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditClick(user)}
                  >
                    <FaPencil />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(user._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

    {/* Edit User Modal */}
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User: {editingUser?.firstName} {editingUser?.lastName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formData && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Login ID</Form.Label>
              <Form.Control
                type="text"
                value={formData.loginId}
                onChange={(e) => setFormData({ ...formData, loginId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="STUDENT">Student</option>
                <option value="TA">TA</option>
                <option value="FACULTY">Faculty</option>
                <option value="ADMIN">Admin</option>
              </Form.Select>
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
}
