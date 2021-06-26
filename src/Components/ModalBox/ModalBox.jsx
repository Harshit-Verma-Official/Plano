import React from "react";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./ModalBox.css";
import axios from "../../axios/axios";
import { actionTypes } from "../../StateProvider/reducer";
import moment from "moment";

function ModalBox({ task, showModal, setShowModal, newTask, setNewTask }) {
  const [{ currentTasks }, dispatch] = useStateValue();

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

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setNewTask({
      task_name: "",
      date: "2021-01-01",
      start_time: "00:00:00",
      end_time: "00:00:00",
    });
    setShowModal(false);
  };

  const handleInsertTask = async () => {
    let body = {
      task_id: task.task_id,
      teacher_id: task.teacher_id,
      task_name: newTask.task_name,
      task_date: newTask.task_date,
      start_time: newTask.start_time,
      end_time: newTask.end_time,
    };

    if (body.teacher_id == null) {
      window.alert("No teacher selected!");
      return;
    }

    if (body.task_name === "") {
      window.alert("Enter task name.");
      return;
    }

    if (
      moment(body.start_time, "hh:mm:ss").isSameOrAfter(
        moment(body.end_time, "hh:mm:ss")
      )
    ) {
      window.alert("Invalid Time Interval");
      return;
    }

    await axios
      .post("/api/tasks", body)
      .then((res) => {
        if (res.data.task_id == -1)
          window.alert("Overlapping Intevals Detected!");
        else {
          console.log(res);
          updateTasks(body.teacher_id);
          setShowModal(false);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="modalBox_main">
      <div
        id="myModal"
        className="modal"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-content">
          <div className="modalContainer">
            <form id="contact">
              <h3>Add Task</h3>
              <fieldset>
                <input
                  name="task_name"
                  placeholder="Task"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  value={newTask.task_name}
                  tabIndex="1"
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  name="task_date"
                  placeholder="Date"
                  type="date"
                  onChange={(e) => handleChange(e)}
                  value={newTask.task_date}
                  tabIndex="2"
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  name="start_time"
                  placeholder="Time"
                  type="time"
                  onChange={(e) => handleChange(e)}
                  value={newTask.start_time}
                  tabIndex="3"
                  required
                />
              </fieldset>
              <fieldset>
                <input
                  name="end_time"
                  placeholder="Time"
                  type="time"
                  onChange={(e) => handleChange(e)}
                  value={newTask.end_time}
                  tabIndex="4"
                  required
                />
              </fieldset>
              <fieldset>
                <button
                  onClick={handleInsertTask}
                  className="save_btn"
                  type="button"
                >
                  Save
                </button>
              </fieldset>
              <button onClick={handleCancel} type="cancel">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalBox;
