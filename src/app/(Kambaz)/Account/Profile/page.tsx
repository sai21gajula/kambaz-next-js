/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };

  const signout = async () => {
    try {
      await client.signout();
    } catch (error: any) {
      console.error("Signout failed:", error?.response?.data || error);
    }
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
    } catch (error: any) {
      console.error("Update failed:", error?.response?.data || error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            placeholder="Enter username"
            defaultValue={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            type="password"
            placeholder="Enter password"
            defaultValue={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            placeholder="Enter first name"
            defaultValue={profile.firstName}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            placeholder="Enter last name"
            defaultValue={profile.lastName}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            placeholder="Select date of birth"
            defaultValue={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            placeholder="Enter email address"
            defaultValue={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="form-control mb-2"
            id="wd-role"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <Button onClick={updateProfile} className="w-100 mb-2" id="wd-update-profile-btn">
            Update
          </Button>
          <Button onClick={signout} className="wd-signout-btn btn btn-danger w-100">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}