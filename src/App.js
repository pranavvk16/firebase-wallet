import React, { useEffect } from "react";
import MainPage from "./Component/MainPage";
import LandingPage from "./Component/LandingPage";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import ExpenseHistory from "./Component/ExpenseHistory";

function App() {
	const [isLogin, setIsLogin] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user !== null) {
				localStorage.setItem("name", user.displayName);
				localStorage.setItem("profile", user.photoURL);
				localStorage.setItem("useId", user.uid);
				setIsLogin(true);
				navigate("/main");
			} else {
				setIsLogin(false);
				navigate("/");
			}
		});
	}, []);
	return (
		<Routes>
			<Route path="/" element={<LandingPage isLogin={isLogin} />} />
			<Route path="/main" element={<MainPage />} />
			<Route path="/history" element={<ExpenseHistory />} />
		</Routes>
	);
}

export default App;
