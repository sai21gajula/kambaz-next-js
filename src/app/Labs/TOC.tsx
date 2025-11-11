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
       <NavLink href="/" as={Link}> Kambaz </NavLink>
     </NavItem>
     <NavItem>
       <NavLink href="https://github.com/jannunzi">My GitHub</NavLink></NavItem>
   </Nav>
 );}

// import Link from "next/link";
// export default function TOC() {
//  return (
//    <ul>
//      <li>
//        <Link href="/Labs" id="wd-lab1-link">
//          Home </Link>
//      </li>
//      <li>
//        <Link href="/Labs/Lab1" id="wd-lab1-link">
//          Lab 1 </Link>
//      </li>
//      <li>
//        <Link href="/Labs/Lab2" id="wd-lab2-link">
//          Lab 2 </Link>
//      </li>
//      <li>
//        <Link href="/Labs/Lab3" id="wd-lab3-link">
//          Lab 3 </Link>
//      </li>
//       <li>
//        <Link href="/" id="wd-kambaz-link">
//          Kambaz </Link> </li>
//    </ul>
// );}
