import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography } from "@mui/material";
import "../App.css";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

function LandingPage({ isLogin }) {
	var items = [
		{
			name: "Wallet",
			description: "A Digital Wallet for the Modern World",
		},
		{
			name: "Expense Tracker",
			description: "Track all your expenses at on place",
		},
	];

	function Item(props) {
		return (
			<Paper width={100}>
				<div className="paper">
					<div className="paperinndercontainer">
						<Typography variant="h1">{props.item.name}</Typography>
						<Typography variant="h2">{props.item.description}</Typography>
					</div>
				</div>
			</Paper>
		);
	}

	//google Auth functtion
	const signInWithGoogle = () => signInWithPopup(auth, provider);
	return (
		<div className="landingpage">
			<div className="carousel">
				<Carousel indicators={false}>
					{items.map((item, i) => (
						<Item key={i} item={item} />
					))}
				</Carousel>
			</div>
			<div className="google_auth">
				<div className="login-buttons">
					{isLogin ? (
						<>
							<h2>{`User ${localStorage.getItem("name")}`}</h2>
							<Button
								className="login-provider-button"
								onClick={() => {
									signOut(auth);
									localStorage.removeItem("name");
									localStorage.removeItem("profile");
									localStorage.removeItem("useId");
								}}>
								Sign Out
							</Button>
							<Link to="/main">Main Page</Link>
						</>
					) : (
						<Button
							className="login-provider-button"
							onClick={() =>
								signInWithGoogle()
									.then((result) => {
										localStorage.setItem("name", result.user.displayName);
										localStorage.setItem("profile", result.user.photoURL);
										localStorage.setItem("useId", result.user.uid);
									})
									.catch((err) => {
										console.log(err);
									})
							}
							startIcon={
								<img
									src="https://img.icons8.com/color/48/000000/google-logo.png"
									alt="google icon"
								/>
							}>
							Sign In
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default LandingPage;
