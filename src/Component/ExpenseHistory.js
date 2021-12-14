import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./ExpenseHistory.css";

function ExpenseHistory() {
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const [data, setData] = useState([]);
	const [date, setDate] = useState([]);
	const colRef = collection(db, localStorage.getItem("useId"));
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
	// useEffect
	useEffect(() => {
		let arrayData = [];
		Promise.all([
			...date.map((ele) =>
				getDocs(collection(colRef, `${year}/${month + 1}/${ele}`, "TODO"))
			),
		]).then((result) => {
			for (let i = 0; i < result.length; i++) {
				if (!result[i].empty) {
					let dbData = {
						date: `${date}-${month + 1}-${year}`,
						totalExp: 0,
						todo: [],
					};
					result[i].forEach(
						(docu) => {
							const { task, expense } = docu.data();
							dbData.todo.push({ task: task, expense: expense, id: docu.id });
							dbData.totalExp += Number(expense);
						},
						arrayData.push(dbData),
						setData(arrayData)
					);
				}
			}
		});

		// date.forEach((date) => {
		// 	getDocs(collection(colRef, `${year}/${month + 1}/${date}`, "TODO")).then(
		// 		(snapshot) => {
		// if (!snapshot.empty) {
		// 	let dbData = {
		// 		date: `${date}-${month + 1}-${year}`,
		// 		totalExp: 0,
		// 		todo: [],
		// 	};
		// 	snapshot.forEach((docu) => {
		// 		const { task, expense } = docu.data();
		// 		dbData.todo.push({ task: task, expense: expense, id: docu.id });
		// 		dbData.totalExp += Number(expense);
		// 	}, arrayData.push(dbData));
		// }
		// 	}
		// );
		// 	setData(arrayData, console.log(date, data, "------"));
		// });
	}, [date]);

	//onClick handel
	const filterHandel = () => {
		setData([]);
		getDocs(collection(colRef, `${year}/${month + 1}`)).then((snapshot) => {
			// console.log(snapshot);
			if (!snapshot.empty) {
				const dbDate = snapshot.docs.map((doc) => doc.id).sort((a, b) => a - b);
				setDate(dbDate);
			} else {
				setDate([]);
			}
		});
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
			<div>
				{data.map((doc) => {
					// console.log(doc);
					return <div key={doc.date}>{doc.date + "  " + doc.totalExp}</div>;
				})}
			</div>
		</div>
	);
}

export default ExpenseHistory;
// date.length > 0 ?  : (
// 	<h1>Loading</h1>
// )
