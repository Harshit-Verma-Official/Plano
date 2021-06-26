import React, { useState } from "react";
import axios from "../../axios/axios";
import { actionTypes } from "../../StateProvider/reducer";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./Dropdown.css";

function Dropdown({ facultyList }) {
  const [{ currentTeacherName }, dispatch] = useStateValue();
  const [toggle, setToggle] = useState(false);

  const toggleHandler = (checked) => {
    setToggle(checked);
  };

  const setCurrentTeacher = (faculty) => {
    dispatch({
      type: actionTypes.SET_CURRENT_TEACHER,
      currentTeacherId: faculty.teacher_id,
      currentTeacherName: faculty.teacher_name,
    });
  };

  const setCurrentTasks = (tasks) => {
    dispatch({
      type: actionTypes.SET_CURRENT_TASKS,
      currentTasks: tasks,
    });
  };

  const handleSelect = async (faculty) => {
    setCurrentTeacher(faculty);

    const request = await axios.get(
      `/api/tasks?teacher_id=${faculty.teacher_id}`
    );
    setCurrentTasks(request.data);

    setToggle(false);
  };

  return (
    <div className="dropdown_main">
      <div className="dropdown toggle">
        <input
          id="t1"
          type="checkbox"
          onChange={(e) => toggleHandler(e.target.checked)}
          checked={toggle}
        />
        <label htmlFor="t1">
          {currentTeacherName ? currentTeacherName : "Select Teacher"}
        </label>
        <ul>
          <li
            key="Select Teacher"
            onClick={() =>
              handleSelect({ teacher_name: null, teacher_id: null })
            }
          >
            <a>Select Teacher</a>
          </li>
          {facultyList.map((faculty, index) => (
            <li key={index} onClick={() => handleSelect(faculty)}>
              <a>{faculty.teacher_name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
