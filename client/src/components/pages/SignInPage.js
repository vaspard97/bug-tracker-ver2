import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import { Navigate } from "react-router-dom";

import SignIn from "../form/signin";
export default function SignInPage() {
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
				<SignIn />
			</Box>
		</>
	);
}
