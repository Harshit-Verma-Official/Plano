import moment from "moment";
import React from "react";
import { actionTypes } from "../../StateProvider/reducer";
import { useStateValue } from "../../StateProvider/StateProvider";
import "./MonthView.css";

function MonthView() {
  const [{ currentDate, currentTasks }, dispatch] = useStateValue();
  let inidicatorsSet = new Set();

  const setCurrentDate = (date) => {
    dispatch({
      type: actionTypes.SET_CURRENT_DATE,
      currentDate: date,
    });
  };

  const handleChange = (date) => {
    let rawDate = moment().format("YYYY-MM-" + date);
    let inputDate = moment(rawDate, "YYYY-MM-D").format("YYYY-MM-DD");
    setCurrentDate(inputDate);
  };

  const isEqualDates = (taskDate, rawDate) => {
    let a = moment(taskDate).format("YYYY-MM-D");
    let b = moment().format("YYYY-MM-" + rawDate);
    return a == b;
  };

  return (
    <div className="monthView_main">
      <ul>
        <li>SUN</li>
        <li>MON</li>
        <li>TUE</li>
        <li>WED</li>
        <li>THU</li>
        <li>FRI</li>
        <li>SAT</li>

        {Array.apply(null, {
          length: moment(moment().format("YYYY-MM-01")).day(),
        }).map((e, i) => (
          <li key={i + "a"} className="fillers"></li>
        ))}

        {Array.apply(null, { length: moment().daysInMonth() }).map((e, i) => (
          <li
            className={
              moment(currentDate).format("DD") == i + 1 ? "active_date" : ""
            }
            key={i}
            onClick={() => handleChange(i + 1)}
          >
            {i + 1}
            <div className="dots_panel">
              {currentTasks.map((task, index) => {
                if (
                  !inidicatorsSet.has(i + 1) &&
                  isEqualDates(task.task_date, i + 1)
                ) {
                  inidicatorsSet.add(i + 1);
                  return (
                    <div
                      key={index}
                      className={
                        moment(task.task_date).format("DD") == i + 1
                          ? "dot"
                          : ""
                      }
                    ></div>
                  );
                }
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MonthView;
