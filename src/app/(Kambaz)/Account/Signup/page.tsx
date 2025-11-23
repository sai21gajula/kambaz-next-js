"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import * as client from "../client";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      if (!currentUser) return;
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (error: any) {
      console.error("Signup failed:", error?.response?.data || error);
    }
  };

  return (
    <Container 
      id="wd-signup-screen" 
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      
      <div style={{ width: "350px" }}>
        <h3 className="mb-4">Sign up</h3>
        
        <Form.Control 
          id="wd-username"
          className="wd-username mb-2"
          placeholder="e.g., iron_man"
          size="lg"
          value={user.username || ""}
          onChange={(e: any) => setUser({ ...user, username: e.target.value })}
        />
        
        <Form.Control 
          id="wd-password"
          className="wd-password mb-2"
          placeholder="e.g., stark123" 
          type="password"
          size="lg"
          value={user.password || ""}
          onChange={(e: any) => setUser({ ...user, password: e.target.value })}
        />
        
        <Button 
          id="wd-signup-btn"
          onClick={signup}
          className="btn btn-primary w-100 mb-2">
          Sign up
        </Button>
        
        <Link 
          href="/Account/Signin"
          id="wd-signin-link"
          className="text-decoration-underline text-primary">
          Sign in
        </Link>
      </div>
    </Container>
  );
}