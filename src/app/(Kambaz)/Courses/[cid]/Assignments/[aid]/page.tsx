"use client"

import { Form, Button, Row, Col, Card, FormGroup } from "react-bootstrap";
import assignments from "../../../../Database/assignments.json";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function AssignmentEditor() {
  const cid = useParams().cid;
  const aid = useParams().aid;
  const assignment = assignments.find((a) => a._id === aid);
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <Row className="mb-3">
        <Col>
          <FormGroup>
            <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
            <Form.Control
              type="text"
              id="wd-name"
              defaultValue={assignment ? assignment.title : "Assignment Name"}
              size="lg"
            />
          </FormGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Control
              as="textarea"
              id="wd-description"
              rows={8}
              defaultValue={`The assignment is available online.

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambaz application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-points">Points</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Control
            type="number"
            id="wd-points"
            defaultValue={assignment ? assignment.points : 120}
          />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Select id="wd-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="REFLECTIONS">REFLECTIONS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
        </Col>
        <Col md={9}>
          <Form.Select id="wd-display-grade-as" defaultValue="Percentage">
            <option value="Percentage">Percentage</option>
            <option value="Complete/Incomplete">Complete/Incomplete</option>
            <option value="Points">Points</option>
            <option value="Letter Grade">Letter Grade</option>
            <option value="GPA Scale">GPA Scale</option>
            <option value="Not Graded">Not Graded</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
        </Col>
        <Col md={9}>
          <Card className="p-3">
            <Form.Select id="wd-submission-type" className="mb-3" defaultValue="Online">
              <option value="Online">Online</option>
              <option value="No Submission">No Submission</option>
              <option value="On Paper">On Paper</option>
              <option value="External Tool">External Tool</option>
            </Form.Select>

            <div>
              <Form.Label className="fw-bold">Online Entry Options</Form.Label>
              <Form.Check
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                className="mb-2"
                defaultChecked
              />
              <Form.Check
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"  
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
                className="mb-2"
              />
              <Form.Check
                type="checkbox"
                id="wd-file-upload"
                label="File Uploads"
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={3} className="text-md-end">
          <Form.Label>Assign</Form.Label>
        </Col>
        <Col md={9}>
          <Card className="p-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-assign-to">Assign to</Form.Label>
              <div className="wd-assign-to-container">
                <span className="wd-assign-tag">Everyone <button className="wd-remove-tag">×</button></span>
              </div>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label htmlFor="wd-due-date">Due</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-due-date"
                    defaultValue={assignment ? assignment.due : "2025-05-13T23:59"}

                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-from"
                    defaultValue={assignment ? assignment.from : "2025-05-06T00:00"}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="wd-available-until">Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    id="wd-available-until"
                    defaultValue={assignment ? assignment.until : "2025-05-20T23:59"}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end gap-2 mb-4">
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary">Cancel </Button>
        </Link>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="danger">Save</Button>
        </Link>
      </div>
    </div>    
  );
}