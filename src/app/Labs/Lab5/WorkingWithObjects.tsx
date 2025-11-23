"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const [module, setModule] = useState({
    id: "m1",
    name: "Introduction to Node",
    description: "Basics of Node.js and Express",
    course: "Kambaz 101",
  });
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div>
     <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      
      <h4>Module Object</h4>
      <div className="mb-2">
        <a id="wd-get-module" className="btn btn-primary me-2" href={`${MODULE_API_URL}`}>
          Get Module
        </a>
        <a id="wd-get-module-name" className="btn btn-primary" href={`${MODULE_API_URL}/name`}>
          Get Module Name
        </a>
      </div>
      <div className="mb-2">
        <label htmlFor="wd-module-name" className="form-label">Module Name</label>
        <FormControl
          id="wd-module-name"
          className="w-75 mb-2"
          value={module.name}
          onChange={(e) => setModule({ ...module, name: e.target.value })}
        />
        <a
          id="wd-update-module-name"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name/${encodeURIComponent(module.name)}`}
        >
          Update Module Name
        </a>
      </div>
      <div className="mb-2">
        <label htmlFor="wd-module-description" className="form-label">Module Description</label>
        <FormControl
          id="wd-module-description"
          className="w-75 mb-2"
          value={module.description}
          onChange={(e) => setModule({ ...module, description: e.target.value })}
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/description/${encodeURIComponent(module.description)}`}
        >
          Update Module Description
        </a>
      </div>
      <div className="mb-2">
        <h4>Modify Assignment Fields</h4>
        <label htmlFor="wd-assignment-score" className="form-label">Score</label>
        <FormControl
          id="wd-assignment-score"
          type="number"
          className="w-25 mb-2"
          value={assignment.score}
          onChange={(e) => setAssignment({ ...assignment, score: Number(e.target.value) })}
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary me-2"
          href={`${ASSIGNMENT_API_URL}/score/${encodeURIComponent(String(assignment.score))}`}
        >
          Update Score
        </a>

        <div className="mt-3">
          <label htmlFor="wd-assignment-completed" className="form-check-label me-2">Completed</label>
          <input
            id="wd-assignment-completed"
            type="checkbox"
            checked={assignment.completed}
            onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
            className="form-check-input me-2"
          />
          <a
            id="wd-update-assignment-completed"
            className="btn btn-primary"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed ? "true" : "false"}`}
          >
            Update Completed
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
}
