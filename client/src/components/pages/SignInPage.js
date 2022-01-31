import { useState } from "react";
import { useSelector } from "react-redux";

import { Box, Container } from "@mui/material";

import { Navigate } from "react-router-dom";
import AlertDialogSlide from "./LearnMoreDialog";
import SignIn from "../form/signin";
export default function SignInPage() {
	const selector = useSelector((state) => state.userReducers);
	const [isModalShown, setIsModalShown] = useState(false);

	return (
		<>
			{selector.data && selector.success && <Navigate to="/" />}

			<AlertDialogSlide
				props={{ setIsModalShown, isModalShown }}
			></AlertDialogSlide>
			<Container maxWidth="lg">
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<SignIn props={{ setIsModalShown }} />
				</Box>
			</Container>
		</>
	);
}
