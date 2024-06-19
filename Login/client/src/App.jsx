import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import CreateProfile from "./components/CreateProfile";
import InterestsForm from "./components/Interests";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/students/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/create_profile" exact element={<CreateProfile />} />
			<Route path="/interests" exact element={<InterestsForm />} />
		</Routes>
	);
}

export default App;