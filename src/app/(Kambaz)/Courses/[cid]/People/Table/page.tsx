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
import * as coursesClient from "../../../client";
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
  
  const { users } = useSelector((state: RootState) => state.usersReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<EditingUser | null>(null);
  const [formData, setFormData] = useState<EditingUser | null>(null);
  
  const [addUsername, setAddUsername] = useState("");
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [addUserError, setAddUserError] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseUsers = await coursesClient.findUsersForCourse(cid as string);
        dispatch(setUsers(courseUsers));
      } catch (error) {
        console.error("Failed to fetch course users:", error);
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
      const enrollment = enrollments.find(
        (e: any) => e.user === userId && e.course === cid
      );
      
      if (enrollment) {
        await coursesClient.unenrollFromCourse(userId, cid as string);
        dispatch(deleteUser(userId));
        const courseUsers = await coursesClient.findUsersForCourse(cid as string);
        dispatch(setUsers(courseUsers));
      }
    }
  };

  const handleAddUser = async () => {
    if (!addUsername.trim()) {
      setAddUserError("Please enter a username or name");
      return;
    }

    setAddUserLoading(true);
    setAddUserError("");

    const searchResults = await usersClient.findUsersByPartialName(addUsername);
    const foundUser = searchResults.length > 0 ? searchResults[0] : null;

    if (!foundUser) {
      setAddUserError("User not found");
      setAddUserLoading(false);
      return;
    }

    const alreadyEnrolled = enrollments.some(
      (e: any) => e.user === foundUser._id && e.course === cid
    );

    if (alreadyEnrolled) {
      setAddUserError("User is already enrolled in this course");
      setAddUserLoading(false);
      return;
    }

    await coursesClient.enrollIntoCourse(foundUser._id, cid as string);
    dispatch(addUser(foundUser));

    const courseUsers = await coursesClient.findUsersForCourse(cid as string);
    dispatch(setUsers(courseUsers));

    setAddUsername("");
    setAddUserError("");
    setShowSearchResults(false);
    setAddUserLoading(false);
  };

  const handleSearchUsers = async (query: string) => {
    setAddUsername(query);
    if (query.trim().length === 0) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    const results = await usersClient.findUsersByPartialName(query);
    const notEnrolled = results.filter((user: any) =>
      !enrollments.some((e: any) => e.user === user._id && e.course === cid)
    );
    setSearchResults(notEnrolled);
    setShowSearchResults(true);
  };

  const handleSelectUser = async (user: any) => {
    setAddUsername("");
    setShowSearchResults(false);
    setAddUserLoading(true);
    setAddUserError("");

    await coursesClient.enrollIntoCourse(user._id, cid as string);
    dispatch(addUser(user));

    const courseUsers = await coursesClient.findUsersForCourse(cid as string);
    dispatch(setUsers(courseUsers));

    setAddUserLoading(false);
  };

  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";
  
 return (
  <>
    <div id="wd-people-table">
      {/* Add User Section (Faculty Only) */}
      {isFaculty && (
        <div className="mb-4 p-3 border rounded bg-light">
          <h5>Add User to Course</h5>
          <div className="d-flex gap-2 position-relative">
            <div className="flex-grow-1 position-relative">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or username"
                value={addUsername}
                onChange={(e) => handleSearchUsers(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddUser()}
                disabled={addUserLoading}
                autoComplete="off"
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className="position-absolute top-100 start-0 end-0 bg-white border border-gray rounded mt-1" style={{ zIndex: 1000, maxHeight: "300px", overflowY: "auto" }}>
                  {searchResults.map((user: any) => (
                    <div
                      key={user._id}
                      className="p-2 border-bottom cursor-pointer"
                      onClick={() => handleSelectUser(user)}
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                    >
                      <div className="fw-bold">{user.firstName} {user.lastName}</div>
                      <div className="small text-muted">{user.username}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="success"
              onClick={handleAddUser}
              disabled={addUserLoading || !addUsername.trim()}
            >
              {addUserLoading ? "Adding..." : "Add"}
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
            user && (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user?.firstName || ""}</span>
                <span className="wd-last-name">{user?.lastName || ""}</span>
              </td>
              <td className="wd-login-id">{user?.loginId || ""}</td>
              <td className="wd-section">{user?.section || ""}</td>
              <td className="wd-role">{user?.role || ""}</td>
              <td className="wd-last-activity">{user?.lastActivity || ""}</td>
              <td className="wd-total-activity">{user?.totalActivity || ""}</td>
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
            )
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
