"use client";
import React, { useState } from "react";
import { FormControl, Row, Col } from "react-bootstrap";
/* eslint-disable @typescript-eslint/no-explicit-any */

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const API = `${HTTP_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({ id: "1", title: "New Task", description: "New Description", completed: false });
  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      

      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        value={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />


      <h3>Filtering Array Items</h3>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <hr />

      <h3>Creating new Items in an Array</h3>
      <a
        id="wd-create-todo"
        className="btn btn-primary"
        href={`${API}/create`}>
        Create Todo
      </a>
      <hr />
    
    <h3>Removing from an Array</h3>
      <a
        id="wd-remove-todo"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/delete`}>
        Remove Todo with ID = {todo.id}
      </a>
      <FormControl
        id="wd-remove-todo-id"
        value={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Updating an Item in an Array</h3>
      <a
        id="wd-update-todo-title"
        className="btn btn-primary float-end"
        href={`${API}/${todo.id}/title/${encodeURIComponent(todo.title)}`}>
        Update Todo
      </a>
      <FormControl
        id="wd-update-todo-id"
        value={todo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <FormControl
        id="wd-update-todo-title-input"
        value={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />

      <h3>Edit Description and Completed Property</h3>
      <div className="d-flex align-items-center mb-3">
        <FormControl
          id="wd-update-todo-description-input"
          value={todo.description}
          className="me-3 flex-grow-1"
          onChange={(e) => setTodo({ ...todo, description: e.target.value })}
        />
        <a
          id="wd-update-todo-description"
          className="btn btn-primary"
          href={`${API}/${todo.id}/description/${encodeURIComponent(todo.description)}`}>
          Describe Todo ID = {todo.id}
        </a>
      </div>

      <div className="d-flex align-items-center mb-3">
        <div className="d-flex align-items-center">
          <input
            id="wd-update-todo-completed-input"
            type="checkbox"
            className="form-check-input me-2"
            checked={!!todo.completed}
            onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
          />
          <label className="form-check-label me-3" htmlFor="wd-update-todo-completed-input">
            Completed
          </label>
        </div>
        <a
          id="wd-update-todo-completed"
          className="btn btn-primary"
          href={`${API}/${todo.id}/completed/${todo.completed}`}>
          Complete Todo ID = {todo.id}
        </a>
      </div>
      <hr />

    </div>
  );
}