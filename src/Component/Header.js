import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import ExpenseHistory from "./ExpenseHistory";

function Header({ data, colRef }) {
	return (
		<div className="header">
			<div className="username">{localStorage.getItem("name")}</div>
			<Link to="/" style={{ textDecoration: "none" }}>
				<div
					onClick={() => {
						signOut(auth);
						localStorage.removeItem("name");
						localStorage.removeItem("profile");
						localStorage.removeItem("useId");
					}}>
					Logout
				</div>
			</Link>
			<Link to={`/history`} style={{ textDecoration: "none" }}>
				Expense History
			</Link>
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
		</div>
	);
}

export default Header;
