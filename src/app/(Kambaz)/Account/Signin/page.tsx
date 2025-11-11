/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import * as db from "../../Database";
import { FormControl, Button, Container } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = db.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/Dashboard");
  };

  return (
    <Container 
      id="wd-signin-screen" 
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      
      <div style={{ width: "350px" }}>
        <h3 className="mb-4">Sign in</h3>
        
        <FormControl 
          id="wd-username"
          className="wd-username mb-2"
          placeholder="e.g., iron_man"
          size="lg"
          value={credentials.username || ""}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
        
        <FormControl 
          id="wd-password"
          className="wd-password mb-2 mt-1"
          placeholder="e.g., stark123" 
          type="password"
          size="lg"
          value={credentials.password || ""}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        
        <Button 
          id="wd-signin-btn"
          onClick={signin}
          className="w-100 mb-2 mt-2">
          Sign in
        </Button>

        <Link 
          id="wd-signup-link" 
          href="Signup"
          className="text-decoration-underline text-primary">
          Sign up
        </Link>
      </div>
    </Container>
  );
}