import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons(
  {moduleId, deleteModule, editModule, isInstructor}: { 
    moduleId: string; 
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
    isInstructor: boolean;
  }) {
  return (
    <div className="float-end d-flex align-items-center gap-1">
      {isInstructor && (
        <>
          <FaPencil 
            className="text-primary" 
            onClick={() => editModule(moduleId)}
            style={{ cursor: "pointer" }}
          />
          <FaTrash 
            className="text-danger" 
            onClick={() => deleteModule(moduleId)}
            style={{ cursor: "pointer" }}
          />
        </>
      )}
      <GreenCheckmark />
      <BsPlus className="fs-5" />
      <IoEllipsisVertical className="fs-5" />
    </div>
  );
}