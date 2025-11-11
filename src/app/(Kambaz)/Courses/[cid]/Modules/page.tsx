/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addModule, deleteModule, updateModule, editModule } from "./reducer";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br /><br /><br /><br />
  <ListGroup id="wd-modules" className="rounded-0">
        {
        modules.filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && <span>{module.name}</span>}
                  {module.editing && (
                    <FormControl 
                      className="w-50 d-inline-block"
                      onChange={(e) => {
                        dispatch(updateModule({ ...module, name: e.target.value }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>
                <ModuleControlButtons 
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    dispatch(deleteModule(moduleId));
                  }}
                  editModule={(moduleId) => {
                    dispatch(editModule(moduleId));
                  }}
                />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}{" "}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
      <br />
      <br />
    </div>
  );
}


//   <ListGroup className="rounded-0" id="wd-modules">
//     <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
//       <div className="wd-title p-3 ps-2 bg-secondary"> 
        
//       <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />

//       </div>
//       <ListGroup className="wd-lessons rounded-0">
//         <ListGroupItem className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
//         </ListGroupItem>
//         <ListGroupItem className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
//         </ListGroupItem>
//         <ListGroupItem className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" />Learn what is Web Development <LessonControlButtons /></ListGroupItem>
//       </ListGroup>

//     </ListGroupItem>
//     <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
//       <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" /> Week 2 <ModuleControlButtons /> </div>
//       <ListGroup className="wd-lessons rounded-0">
//         <ListGroupItem className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" />  LESSON 1 <LessonControlButtons /></ListGroupItem>
//         <ListGroupItem className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" /> LESSON 2 <LessonControlButtons /></ListGroupItem>
//       </ListGroup>
//     </ListGroupItem>
//   </ListGroup>
//   </div>
//   )
// };
