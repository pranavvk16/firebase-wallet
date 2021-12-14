import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Button } from '@mui/material'

function Header({ data, colRef }) {
	return (
		<div className="header">
			<div className="username">{localStorage.getItem("name")}</div>
			<div className="balance">
				Total Expenses :{" "}
				<span>
					{data.length > 0
						? data.reduce((acc, curr) => {
							return (acc = acc + Number(curr.expense));
						}, 0)
						: 0}
				</span>
			</div>
			<Link to={`/history`} style={{ textDecoration: "none" }}>
				<Button  color="primary" variant="contained">Expense History</Button>
			</Link>
			<Link to="/" style={{ textDecoration: "none" }}>
				<Button color="secondary" onClick={() => {
					signOut(auth);
					localStorage.removeItem("name");
					localStorage.removeItem("profile");
					localStorage.removeItem("useId");
				}} href="#text-buttons" variant="contained" color="error">Logout</Button>
			</Link>


		</div>
	);
}

export default Header;
