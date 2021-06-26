import React from "react";
import "./Calender.css";
import MonthView from "./MonthView/MonthView";
import WeekView from "./WeekView/WeekView";
import DayView from "./DayView/DayView";

function Calender({ currentViewMode }) {
  return (
    <div className="calender_main">
      {currentViewMode.month ? (
        <MonthView />
      ) : currentViewMode.week ? (
        <WeekView />
      ) : (
        <DayView />
      )}
    </div>
  );
}

export default Calender;
