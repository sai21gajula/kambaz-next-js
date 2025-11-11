"use client"
import { useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, ListGroupItem } from "react-bootstrap";
 
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const { todos } = useSelector((state: any) => state.todosReducer || { todos: [] });
  
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  
  return (
    <div id="wd-array-state-variables" className="p-2" style={{ border: "1px solid #e0e0e0" }}>
      <h2>Array State Variable</h2>
      <button onClick={addElement} className="btn btn-success mb-2">Add Element</button>
      <ul  style={{ listStyleType: "none", paddingLeft: 0 }}>
        {array.map((item, index) => (
          <li className="d-flex p-2 justify-content-between align-items-center rounded" style={{ border: "1px solid #e0e0e0" }} key={index}>
            <strong>{item}</strong>
            <button className="btn btn-danger mb-2" onClick={() => deleteElement(index)}>
              Delete</button>
          </li>
        ))}
      </ul>
  
      <hr/>
    </div>
  );
}
 