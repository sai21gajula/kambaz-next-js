'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import Link from "next/link";
import { Card,CardImg,CardBody, CardTitle, Row,CardText, Col, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { RootState } from "../store";
import * as db from "../Database";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = db;
  const dispatch = useDispatch();
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const enrolledCourses = currentUser ? courses.filter((course) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === (currentUser as any)._id &&
        enrollment.course === course._id
    )
  ) : [];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>New Course
        <button className="btn btn-warning float-end me-2"
                id="wd-update-course-click"
                onClick={() => dispatch(updateCourse(course))}> Update </button>
        <button className="btn btn-primary float-end me-2"
                id="wd-add-new-course-click"
                onClick={() => dispatch(addNewCourse(course))}> Add </button>
      </h5>
      <div className="mb-3">
        <FormControl 
          value={course.name} 
          className="mb-2"
          placeholder="Course Name"
          onChange={(e) => setCourse({ ...course, name: e.target.value })} />
        <FormControl 
          value={course.description} 
          rows={3}
          placeholder="Course Description"
          as="textarea"
          onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      </div>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({enrolledCourses.length})</h2> <hr />
      <div id="wd-dashboard-courses">

        <Row xs={1} sm={2} md={5} lg={6} className="g-4">
        {enrolledCourses.map((course) => (
          <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link href={`/Courses/${course._id}/Home`}       
                               className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <CardImg src={course.image} variant="top" width="100%" height={160} />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name} </CardTitle>
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description} </CardText>
                <Button variant="primary"> Go </Button>
                <Button 
                  variant="warning" 
                  className="me-2 float-end"
                  id="wd-edit-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    setCourse(course);
                  }}>
                  Edit
                </Button>
                <Button 
                  variant="danger" 
                  className="me-2 float-end"
                  id="wd-delete-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(deleteCourse(course._id));
                  }}>
                  Delete
                </Button>
              </CardBody>
            </Link>
          </Card>
      </Col> ))}
    </Row>
  </div>
</div>);
}
















//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/1234/Home" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/reactjs.png" width="100%" height={150} alt="React JS" />
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     Full Stack software developer
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>

//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/5610" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/webdev.jpeg"  width="100%" height={150}  alt="Web Development" />
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS5610 Web Development</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     SEC 04 Fall 2025 [BOS-1-TR]
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>

//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/51000" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/algo.jpeg" alt="Algorithms"  width="0%" height={150} />
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS51000 Algorithms</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     SEC 02 Spring 2024 [VTL-2-OL]
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>

//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/6954" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/coop.png" alt="Co-op Work Experience"  width="100%" height={150}/>
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">CS6954 Co-op Work Experience</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     SEC 05 Fall 2024 [XCR-2-CO]
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>

//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/5110" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/datamang.jpeg" alt="Data Management"  width="100%" height={150}/>
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">DS5110 Intro to Data Management</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     SEC 04 Fall 2023 [BOS-2-TR]
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>

//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/5220" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/supermach.jpeg" alt="Machine Learning" width="100%" height={150}  />
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">DS5220 Supervised Machine Learning</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     SEC 01 Fall 2023 [BOS-2-TR]
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>

//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/5230" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/unsupermach.png" alt="Machine Learning"  width="100%" height={150} />
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">DS5230 Unsupervised Machine Learning</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     SEC 06 Spring 2024 [BOS-2-TR]
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>

//           <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//             <Card>
//               <Link href="/Courses/5500" className="wd-dashboard-course-link text-decoration-none text-dark">
//                 <Card.Img variant="top" src="/images/datasci.png" alt="Data Science Capstone"  width="100%" height={150} />
//                 <Card.Body>
//                   <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">DS5500 Data Science Capstone</Card.Title>
//                   <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                     SEC 03 Fall 2025 [BOS-1-TR]
//                   </Card.Text>
//                   <Button variant="primary">Go</Button>
//                 </Card.Body>
//               </Link>
//             </Card>
//           </Col>
//         </Row>

//   </div>
//     </div>
//   );
// }