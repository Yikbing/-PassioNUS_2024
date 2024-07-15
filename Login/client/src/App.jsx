import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import CreateProfile from "./components/CreateProfile";
import InterestsForm from "./components/interests";	
import ChatPage from "./components/Chat/pages/home";
//import Navbar from "./components/Main/index.jsx";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/home" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/students/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/create_profile" exact element={<CreateProfile />} />
			<Route path="/interests" exact element={<InterestsForm />} />
			<Route path="/chat" exact element={<ChatPage />} />
			
		</Routes>
	);
}

export default App;