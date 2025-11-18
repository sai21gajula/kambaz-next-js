"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
 const pathname = usePathname();
 return (
   <Nav variant="pills" id="wd-toc">
     <NavItem>
       <NavLink  id="wd-a1" href="/Labs" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>
         Labs </NavLink> 
     </NavItem>
     <NavItem>
       <NavLink id="wd-a1" href="/Labs/Lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>
         Lab 1 </NavLink> 
     </NavItem>
     <NavItem>
       <NavLink id="wd-a2" href="/Labs/Lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>
         Lab 2 </NavLink> 
     </NavItem>
     <NavItem>
       <NavLink  id="wd-a3" href="/Labs/Lab3" as={Link} className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>
         Lab 3 </NavLink> 
    </NavItem>
     <NavItem>
       <NavLink  id="wd-a4" href="/Labs/Lab4" as={Link} className={`nav-link ${pathname.endsWith("Lab4") ? "active" : ""}`}>
         Lab 4 </NavLink> 
    </NavItem>
    <NavItem>
      <NavLink id="wd-a5" href="/Labs/Lab5" as={Link} className={`nav-link ${pathname.endsWith("Lab5") ? "active" : ""}`}>
        Lab 5 </NavLink>
    </NavItem>
     <NavItem>
       <NavLink href="/" as={Link}> Kambaz </NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/sai21gajula/kambaz-next-js">My  Kanbaz GitHub</NavLink></NavItem>
    <NavItem>
      <NavLink href="https://github.com/sai21gajula/-kambaz-node-server-app" target="_blank" rel="noopener noreferrer">Node Server Backend (GitHub)</NavLink>
    </NavItem>
   </Nav>
 );}
