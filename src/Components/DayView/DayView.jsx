import moment from "moment";
import React, { useState } from "react";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./DayView.css";
import ModalBox from "../ModalBox/ModalBox";

function DayView() {
  const [{ currentTasks, currentTeacherId }, dispatch] = useStateValue();
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    task_id: 0,
    task_name: "",
    task_date: "2021-01-01",
    start_time: "00:00:00",
    end_time: "00:00:00",
  });

  const handleAddTask = (task) => {
    setNewTask({
      ...task,
      task_date: moment(task.task_date).format("YYYY-MM-DD"),
    });
    setShowModal(true);
  };

  const handelEmptyCell = (time) => {
    setNewTask({
      task_id: 0,
      task_name: "",
      teacher_id: currentTeacherId,
      task_date: moment().format("YYYY-MM-DD"),
      start_time: moment(`${time}:00:00`, "HH:mm:ss").format("HH:mm:ss"),
      end_time: moment(`${time + 1}:00:00`, "HH:mm:ss").format("HH:mm:ss"),
    });
    setShowModal(true);
  };

  return (
    <div className="dayView_main">
      <div className="dayView_title">{moment().format("DD MMMM YYYY")}</div>
      <div className="dayView_content">
        {Array.apply(null, { length: 23 }).map((e, i) => (
          <div key={i} className="time" style={{ gridRow: i + 1 }}>{`${
            i + 1
          }:00`}</div>
        ))}

        <div className="filler-col"></div>

        {Array.apply(null, { length: 23 }).map((e, i) => (
          <div key={i} className="row" style={{ gridRow: i + 1 }}></div>
        ))}

        {Array.apply(null, { length: 24 }).map((e, i) => {
          let res = "";
          let found = false;
          currentTasks.forEach((task, index) => {
            if (
              moment(task.task_date).format("YYYY-MM-DD") ==
                moment().format("YYYY-MM-DD") &&
              moment(task.start_time, "hh:mm:ss").format("hh") < i + 1 &&
              moment(task.end_time, "hh:mm:ss").format("hh") >= i + 1
            ) {
              res = (
                <div
                  onClick={() => handleAddTask(task)}
                  key={i}
                  style={{ gridColumn: "3 / span 9", gridRow: i + 1 }}
                  className="event calendar2"
                >
                  {task.task_name}
                </div>
              );
              found = true;
            }
          });
          if (!found)
            res = (
              <div
                onClick={() => handelEmptyCell(i)}
                key={i}
                style={{ gridColumn: "3 / span 9", gridRow: i + 1 }}
                className="event calendar1"
              ></div>
            );

          return res;
        })}

        <ModalBox
          task={newTask}
          showModal={showModal}
          setShowModal={setShowModal}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      </div>
    </div>
  );
}

export default DayView;
