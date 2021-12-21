import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./ExpenseHistory.css";
import Popup from "./Popup";

function ExpenseHistory() {
	const togglePopup = () => {
		setIsOpen(!isOpen);
	};
	const [isOpen, setIsOpen] = useState(false);
	const [index, getIndex] = useState(false);
	const [flag, setFlag] = useState(false);
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const [data, setData] = useState([]);
	const [date, setDate] = useState([]);
	const colRef = collection(db, localStorage.getItem("useId"));
	let arrayData = [];
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
		arrayData = [];
		Promise.all([
			...date.map((ele) =>
				getDocs(collection(colRef, `${year}/${month + 1}/${ele}`, "TODO")).then(
					(snapshot) => {
						if (!snapshot.empty) {
							console.log();
							let dbData = {
								date: `${ele}-${month + 1}-${year}`,
								totalExp: 0,
								todo: [],
							};
							snapshot.forEach((docu) => {
								const { task, expense } = docu.data();
								dbData.todo.push({
									task: task,
									expense: expense,
									id: docu.id,
								});
								dbData.totalExp += Number(expense);
							});
							return dbData;
						} else {
							return;
						}
					}
				)
			),
		]).then((result) => {
			setData([...result.filter((ele) => ele !== undefined)], setFlag(true));
		});
	}, [date]);
	//onClick handel
	const filterHandel = () => {
		setFlag(false);
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
	const StyledTableCell = styled(TableCell)(({ theme }) => ({
		[`&.${tableCellClasses.head}`]: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		[`&.${tableCellClasses.body}`]: {
			fontSize: 14,
		},
	}));

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
		// hide last border
		'&:last-child td, &:last-child th': {
			border: 0,
		},
	}));
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
								{`${ele}`}
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
				<TableContainer component={Paper}>
					<Table
						sx={{ minWidth: 650 }}
						aria-label="simple table">
						<TableHead>
							<TableRow >
								<StyledTableCell sx={{ fontSize: 25 }} align="center">Date</StyledTableCell>
								<StyledTableCell sx={{ fontSize: 25 }} align="center">Tasks</StyledTableCell>
								<StyledTableCell sx={{ fontSize: 25 }} align="center">Total Expense</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{flag &&
								data.map(({ date, totalExp, todo }, i) => {
									return (
										<StyledTableRow
											style={{ cursor: "pointer", fontSize: "29px" }}
											onClick={() => {
												togglePopup();
												getIndex(i);
											}}
											key={i} >
											<StyledTableCell align="center">{date}</StyledTableCell>
											<StyledTableCell align="center">{todo.length}</StyledTableCell>
											<StyledTableCell align="center">{totalExp}</StyledTableCell>
										</StyledTableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				;
			</div>{isOpen && <Popup data={data[index].todo} index={index} handleClose={togglePopup} />}
		</div >
	);
}
export default ExpenseHistory;
