import moment from "moment";
import React, { useState } from "react";
import "./SingleTask.css";
import axios from "../../../axios/axios";
import { actionTypes } from "../../../StateProvider/reducer";
import { useStateValue } from "../../../StateProvider/StateProvider";
import ModalBox from "../../ModalBox/ModalBox";

function SingleTask({ task }) {
  const [{ currentTeacherName }, dispatch] = useStateValue();
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    task_name: "",
    task_date: "2021-01-01",
    start_time: "00:00:00",
    end_time: "00:00:00",
  });

  const setCurrentTasks = (tasks) => {
    dispatch({
      type: actionTypes.SET_CURRENT_TASKS,
      currentTasks: tasks,
    });
  };

  const updateTasks = async (teacher_id) => {
    const request = await axios.get(`/api/tasks?teacher_id=${teacher_id}`);
    setCurrentTasks(request.data);
  };

  const handleDelete = (task) => {
    if (
      window.confirm(
        "Are you sure you want to delete event : " + task.task_name
      )
    ) {
      axios
        .delete("/api/tasks/" + task.task_id)
        .then((res) => {
          updateTasks(task.teacher_id);
        })
        .catch((error) => console.log(error.message));
    }
  };

  const handleUpdate = (task) => {
    setNewTask({
      task_name: task.task_name,
      task_date: moment(task.task_date).format("YYYY-MM-DD"),
      start_time: task.start_time,
      end_time: task.end_time,
    });
    setShowModal(true);
  };

  return (
    <div className="singleTask_main">
      <div className="singleTaskContent">
        <h3>{task.task_name}</h3>
        <div className="taskTime">
          <h5>
            {moment(task.start_time, "hh:mm:ss").format("hh:mm A")} -{" "}
            {moment(task.end_time, "hh:mm:ss").format("hh:mm A")}
          </h5>
        </div>
      </div>
      <div className="taskActions">
        <i onClick={() => handleUpdate(task)} className="far fa-edit"></i>
        <i onClick={() => handleDelete(task)} className="far fa-trash-alt"></i>
      </div>

      <ModalBox
        task={task}
        showModal={showModal}
        setShowModal={setShowModal}
        newTask={newTask}
        setNewTask={setNewTask}
      />
    </div>
  );
}

export default SingleTask;
