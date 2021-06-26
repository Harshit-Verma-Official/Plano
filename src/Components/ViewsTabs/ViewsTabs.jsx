import React, { useState } from "react";
import "./ViewsTabs.css";

function ViewsTabs({ currentViewMode, setCurrentViewMode }) {
  const handleSelect = (viewType) => {
    let res = { month: false, week: false, day: false };
    setCurrentViewMode({ ...res, [viewType]: true });
  };

  return (
    <div className="viewsTabs_main">
      <div className="tab">
        <button
          value="month"
          className={`tablinks ${currentViewMode.month ? "active" : ""}`}
          onClick={(e) => handleSelect(e.target.value)}
        >
          Month
        </button>
        <button
          value="week"
          className={`tablinks ${currentViewMode.week ? "active" : ""}`}
          onClick={(e) => handleSelect(e.target.value)}
        >
          Week
        </button>
        <button
          value="day"
          className={`tablinks ${currentViewMode.day ? "active" : ""}`}
          onClick={(e) => handleSelect(e.target.value)}
        >
          Day
        </button>
      </div>
    </div>
  );
}

export default ViewsTabs;
