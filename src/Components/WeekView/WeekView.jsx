import moment, { weekdays } from "moment";
import React, { useState } from "react";
import { actionTypes } from "../../StateProvider/reducer";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./WeekView.css";
import ModalBox from "../ModalBox/ModalBox";

function WeekView() {
  const [{ currentWeek, currentTasks, currentTeacherId }, dispatch] =
    useStateValue();
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

  const handelEmptyCell = (day, time) => {
    let weekDays = getWeekDays();
    setNewTask({
      task_id: 0,
      task_name: "",
      teacher_id: currentTeacherId,
      task_date: moment().format(
        `YYYY-MM-${weekDays[day] < 10 ? 0 : ""}${weekDays[day]}`
      ),
      start_time: moment(`${time}:00:00`, "HH:mm:ss").format("HH:mm:ss"),
      end_time: moment(`${time + 1}:00:00`, "HH:mm:ss").format("HH:mm:ss"),
    });
    setShowModal(true);
  };

  const handleNextWeek = () => {
    if (currentWeek <= 4)
      dispatch({
        type: actionTypes.SET_CURRENT_WEEK,
        currentWeek: currentWeek + 1,
      });
  };

  const handlePreviousWeek = () => {
    if (currentWeek >= 2)
      dispatch({
        type: actionTypes.SET_CURRENT_WEEK,
        currentWeek: currentWeek - 1,
      });
  };

  const getWeekDays = () => {
    let weekDays = [];
    let a = currentWeek * 7;
    for (
      let i = a - 7;
      i < (a < moment().daysInMonth() ? a : moment().daysInMonth());
      ++i
    )
      weekDays.push(i + 1);
    return weekDays;
  };

  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
  };

  const getEvents = () => {
    let events = [];
    for (let i = 0; i < 7; ++i) {
      for (let j = 0; j <= 23; ++j) {
        let weekDays = getWeekDays();
        if (currentTasks.length != 0) {
          currentTasks.forEach((task, index) => {
            let tdate = moment(task.task_date).format("D");
            let stime = moment(task.start_time, "HH:mm:yy").format("HH");
            let etime = moment(task.end_time, "HH:mm:yy").format("HH");
            if (tdate == weekDays[i] && j >= stime && j <= etime) {
              events.push(
                <div
                  key={`${i}${index}${j}`}
                  onClick={() => handleAddTask(task)}
                  style={{ gridColumn: 3 + i, gridRow: `${j + 1} / span 1` }}
                  className="event calendar2"
                >
                  {task.task_name}
                </div>
              );
            } else {
              events.push(
                <div
                  key={`${i}${generateKey(index)}${j}`}
                  onClick={() => handelEmptyCell(i, j)}
                  style={{ gridColumn: 3 + i, gridRow: `${j + 1} / span 1` }}
                  className="event calendar1"
                ></div>
              );
            }
          });
        } else {
          events.push(
            <div
              key={`${i}${generateKey(i)}${j}`}
              onClick={() => handelEmptyCell(i, j)}
              style={{ gridColumn: 3 + i, gridRow: `${j + 1} / span 1` }}
              className="event calendar1"
            ></div>
          );
        }
      }
    }
    return events;
  };

  return (
    <div className="weekView_main">
      <div className="weekView_container">
        <div className="title">
          <i onClick={handlePreviousWeek} className="fas fa-arrow-left"></i>
          <p>
            {moment().format("MMMM YYYY")} Week {currentWeek}
          </p>{" "}
          <i onClick={handleNextWeek} className="fas fa-arrow-right"></i>
        </div>
        <div className="days">
          <div className="filler"></div>
          <div className="filler"></div>

          {getWeekDays(currentWeek).map((day, index) => (
            <div key={index} className="day current">
              {day} {moment(day, "D").format("ddd")}
            </div>
          ))}
        </div>
        <div className="content">
          {Array.apply(null, { length: 23 }).map((e, i) => (
            <div key={i} className="time" style={{ gridRow: i + 1 }}>{`${
              i + 1
            }:00`}</div>
          ))}

          <div className="filler-col"></div>
          {Array.apply(null, { length: 6 }).map((e, i) => (
            <div key={i} className="col" style={{ gridColumn: 3 + i }}></div>
          ))}
          <div className="col" style={{ gridColumn: "9" }}></div>

          {Array.apply(null, { length: 23 }).map((e, i) => (
            <div key={i} className="row" style={{ gridRow: i + 1 }}></div>
          ))}

          {Array.apply(null, { length: 23 }).map((e, i) => (
            <div key={i} className="row" style={{ gridRow: i + 1 }}></div>
          ))}

          {getEvents()}

          <ModalBox
            task={newTask}
            showModal={showModal}
            setShowModal={setShowModal}
            newTask={newTask}
            setNewTask={setNewTask}
          />
        </div>
      </div>
    </div>
  );
}

export default WeekView;
