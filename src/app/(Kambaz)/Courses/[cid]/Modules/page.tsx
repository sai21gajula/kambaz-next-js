/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-assign-module-variable */
"use client"
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/esm/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setModules, addModule, deleteModule, updateModule, editModule } from "./reducer";
import * as client from "../../client";
import { RootState } from "../../../store";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const dispatch = useDispatch();
  
  const onRemoveModule = async (moduleId: string) => {
      await client.deleteModule(moduleId);
      const filtered = modules.filter((m: any) => m._id !== moduleId);
      dispatch(setModules(filtered));
  };

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    // eslint-disable-next-line @next/next/no-assign-module-variable
    const module = await client.createModuleForCourse(cid as string, newModule);
    dispatch(setModules([...modules, module ]));
    setModuleName("");
   
  };

  const onUpdateModule = async (module: any) => {
      const updated = await client.updateModule(module);
      /* eslint-disable-next-line @next/next/no-assign-module-variable */
      const newModules = modules.map((m: any) => (m._id === updated._id ? updated : m));
      dispatch(setModules(newModules));
 
  };

  const fetchModules = async () => {
      const mods = await client.findModulesForCourse(cid as string);
      dispatch(setModules(mods));
  };

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wd-modules">
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={onCreateModuleForCourse}
      />
      <br /><br /><br /><br />
  <ListGroup id="wd-modules" className="rounded-0">
        {
        modules.map((module: any) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
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
                          onUpdateModule({ ...module, editing: false });
                        }
                      }}
                      defaultValue={module.name}
                    />
                  )}
                </div>
                <ModuleControlButtons 
                  moduleId={module._id}
                    deleteModule={onRemoveModule}
                  editModule={(moduleId) => {
                    dispatch(editModule(moduleId));
                  }}
                />
              </div>
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
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
