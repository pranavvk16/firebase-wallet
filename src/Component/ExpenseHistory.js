import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import React, { useState } from "react";
import "./ExpenseHistory.css";

function ExpenseHistory() {
	const [isData, setIsData] = useState(false);
	const [months, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const month = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	const currYear = new Date().getFullYear();
	let yearArr = new Array(10).fill(0).map((ele, index) => {
		return currYear - 5 + index;
	});
	return (
		<div className="history">
			<div className="filterbar">
				<FormControl sx={{ m: 1, minWidth: 220, pt: 0.5 }}>
					<InputLabel id="months">Month</InputLabel>
					<Select
						size="small"
						labelId="months"
						id="month"
						value={months}
						label="Month"
						onChange={(e) => setMonth(e.target.value)}>
						{month.map((ele, index) => (
							<MenuItem key={index} value={index}>
								{`${ele} (${index + 1})`}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl sx={{ m: 1, minWidth: 220, pt: 0.5 }}>
					<InputLabel id="Year" className="inputField">
						Year
					</InputLabel>
					<Select
						size="small"
						labelId="Year"
						id="Year"
						value={year}
						label="Year"
						onChange={(e) => setYear(e.target.value)}>
						{yearArr.map((ele, index) => (
							<MenuItem key={index} value={ele}>
								{`${ele}`}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					sx={{ m: 1, minWidth: 120 }}
					variant="contained"
					size="medium"
					// onClick={}
				>
					Filter
				</Button>
			</div>
			<div className="underline"></div>
		</div>
	);
}

export default ExpenseHistory;
