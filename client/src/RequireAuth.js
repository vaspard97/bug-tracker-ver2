import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingPage from "./components/pages/LoadingPage";
export default function RequireAuth({ children }) {
	let authentication = useSelector((state) => state.userReducers);
	return authentication.loading ? (
		<LoadingPage />
	) : authentication.success === false && authentication.loading === false ? (
		<Navigate to={"/signin"} />
	) : (
		children
	);
}
