import React from "react";
import "./TaskPanel.css";
import SingleTask from "./SingleTask/SingleTask";
import moment from "moment";
import { useStateValue } from "../../StateProvider/StateProvider";

function TaskPanel({ setShowModal }) {
  const [{ currentDate, currentTasks }, dispatch] = useStateValue();

  const isEqualDates = (date1, date2) => {
    return (
      moment(date1).format("YYYY-MM-D") == moment(date2).format("YYYY-MM-D")
    );
  };

  return (
    <div className="taskPanel_main">
      <a
        onClick={() => setShowModal(true)}
        className="c-add o-btn js-event__add"
      >
        Add Event<span className="fa fa-plus"></span>
      </a>

      <div className="c-aside__day">
        <span className="c-aside__num">{moment(currentDate).format("D")}</span>{" "}
        <span className="c-aside__month">
          {moment(currentDate).format("MMMM")}
        </span>
      </div>

      <div className="taskPanelContent">
        {currentTasks.map((task, index) => {
          if (isEqualDates(currentDate, task.task_date))
            return <SingleTask key={index} task={task} />;
        })}
      </div>
    </div>
  );
}

export default TaskPanel;
