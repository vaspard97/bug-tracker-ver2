import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SignUp from "../form/signup";
import { Box } from "@mui/material";

export default function SignUpPage() {
	const selector = useSelector((state) => state.userReducers);
	return (
		<>
			{selector.data && selector.success && <Navigate to="/" />}
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<SignUp />
			</Box>
		</>
	);
}
