import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase";
import "./ExpenseHistory.css";

function ExpenseHistory() {
	const [isData, setIsData] = useState(true);
	const [data, setData] = useState([]);
	const colRef = collection(db, localStorage.getItem("useId"));

	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const months = [
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

	//OnClick functions

	const filterHandel = async () => {
		setData([]);
		setIsData(true);
		let ArrayData = [];
		let dbDate;
		await getDocs(collection(colRef, `${year}/${month + 1}`)).then(
			(snapshot) => {
				if (snapshot.empty) {
					setIsData(false);
				} else {
					dbDate = snapshot.docs.map((doc) => doc.id).sort((a, b) => a - b);
				}
			}
		);
		await dbDate.forEach((date) => {
			getDocs(collection(colRef, `${year}/${month + 1}/${date}`, "TODO")).then(
				(snapshot) => {
					if (!snapshot.empty) {
						let dbData = {
							date: `${date}-${month + 1}-${year}`,
							totalExp: 0,
							todo: [],
						};
						snapshot.forEach((docu) => {
							const { task, expense } = docu.data();
							dbData.todo.push({ task: task, expense: expense, id: docu.id });
							dbData.totalExp += Number(expense);
						});
						ArrayData.push(dbData);
					}
				}
			);
		});
		setData(ArrayData, console.log(data));
	};

	return (
		<div className="history">
			<div className="filterbar">
				<FormControl sx={{ m: 1, minWidth: 220, pt: 0.5 }}>
					<InputLabel id="months">Month</InputLabel>
					<Select
						size="small"
						labelId="months"
						id="month"
						value={month}
						label="Month"
						onChange={(e) => setMonth(e.target.value)}>
						{months.map((ele, index) => (
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
					onClick={filterHandel}>
					Filter
				</Button>
			</div>
			<div className="underline"></div>
			<div className="his__container">
				{data.map(({ date, totalExp, todo }) => (
					<div>
						<h1>{date}</h1>
						<h1>{totalExp}</h1>
						<h1>{todo.length}</h1>
					</div>
				))}
			</div>
		</div>
	);
}

export default ExpenseHistory;
