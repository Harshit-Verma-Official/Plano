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

  const handleChange = (e) => {
    let rawDate = `${moment().format("YYYY")}-${moment().format("MM")}-${
      e.target.value
    }`;
    let inputDate = moment(rawDate, "YYYY-MM-D").format("YYYY-MM-DD");
    setCurrentDate(inputDate);
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
          <li className="fillers"></li>
        ))}

        {Array.apply(null, { length: moment().daysInMonth() }).map((e, i) => (
          <li
            className={
              moment(currentDate).format("DD") == i + 1 ? "active_date" : ""
            }
            key={i}
            value={i + 1}
            onClick={(e) => handleChange(e)}
          >
            {i + 1}
            <div className="dots_panel">
              {currentTasks.map((task, index) => {
                if (
                  !inidicatorsSet.has(i + 1) &&
                  moment(task.task_date).format("DD") == i + 1
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
