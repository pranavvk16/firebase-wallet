import React from "react";
import '../App.css';

function Popup(props) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        Your Spendings
        <br />
        fake data
      </div>
    </div>
  );
};

export default Popup;