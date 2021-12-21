import React from "react";
import "../App.css";

function Popup(props) {
	return (
		<div className="popup-box">
			<div className="box">
				<span className="close-icon" onClick={props.handleClose}>
					x
				</span>
				Your Spendings
				<br />
				{props.data.map((x, index) => {
					return (
						<div key={index}>
							<span style={{ color: "black", paddingInline: "10px" }}>
								{x.task}
							</span>-
							<span style={{ color: "green", paddingInline: "10px" }}>
								₹	{x.expense}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Popup;
