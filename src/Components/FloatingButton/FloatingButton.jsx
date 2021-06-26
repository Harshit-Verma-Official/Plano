import React from "react";
import "./FloatingButton.css";

function FloatingButton({ setShowModal }) {
  return (
    <div className="floatingButton_main" onClick={() => setShowModal(true)}>
      <div className="float">
        <i className="fa fa-plus my-float"></i>
      </div>
    </div>
  );
}

export default FloatingButton;
