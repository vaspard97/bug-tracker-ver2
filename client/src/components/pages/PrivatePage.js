import { useState } from "react";
import Sidebar from "../navbar/sidebar";
import {
	Box,
	Container,
	Snackbar,
	Modal,
	Typography,
	Card,
	CardActions,
	CardContent,
	Button,
} from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearAuth, signOut } from "../../redux/actions/user";

import TopNavBar from "../navbar/topNavBar";
import FormAlert from "../form/formAlert";
export default function PrivatePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [isSidebaropen, setIsSidebarOpen] = useState(false);
	const myTicketsSelector = useSelector(
		(state) => state.updatableTicketReducers
	);
	const ticketSelector = useSelector((state) => state.ticketReducers);
	const projectSelector = useSelector((state) => state.projectReducers);
	const authenticationSelector = useSelector(
		(state) => state.authenticationReducer
	);
	const handleSidebar = () => {
		setIsSidebarOpen(!isSidebaropen);
	};
	const returnToLogin = () => {
		dispatch(clearAuth(navigate));
		dispatch(signOut(navigate));
	};
	return (
		<>
			{/* {!userSelector.data && !userSelector.success && <Navigate to="/signin" />} */}

			<>
				<Modal open={authenticationSelector.success === false}>
					<Box
						height={"100%"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
					>
						<Card>
							<CardContent>
								<Typography variant="h6">
									Your Session Have Ended Please Re-login
								</Typography>
							</CardContent>
							<CardActions
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<Button variant="contained" onClick={returnToLogin}>
									Return To Sign In Page
								</Button>
							</CardActions>
						</Card>
					</Box>
				</Modal>
				<TopNavBar props={{ handleSidebar }} />
				<Box marginTop={12}>
					<Container maxWidth="lg">
						<Outlet />
					</Container>
				</Box>
				<Sidebar props={{ isSidebaropen, handleSidebar }} />

				<Snackbar
					open={projectSelector.success === true}
					autoHideDuration={3000}
				>
					<FormAlert props={{ severity: "success", message: "Success" }} />
				</Snackbar>
				<Snackbar open={projectSelector.success === false}>
					<FormAlert
						props={{
							severity: "error",
							message: "Oppss! Something Went Wrong",
						}}
					/>
				</Snackbar>
				<Snackbar
					open={ticketSelector.success === true}
					autoHideDuration={3000}
				>
					<FormAlert
						props={{ severity: "success", message: "Ticket Created!" }}
					/>
				</Snackbar>
				<Snackbar
					open={ticketSelector.success === false}
					autoHideDuration={3000}
				>
					<FormAlert
						props={{
							severity: "error",
							message: "Oppss! Something Went Wrong",
						}}
					/>
				</Snackbar>
				<Snackbar
					open={myTicketsSelector.success === true}
					autoHideDuration={3000}
				>
					<FormAlert
						props={{
							severity: "success",
							message: "Ticket Form Submitted Successfully",
						}}
					/>
				</Snackbar>
				<Snackbar open={myTicketsSelector.success === false}>
					<FormAlert
						props={{
							severity: "error",
							message: "Oppss! Something Went Wrong",
						}}
					/>
				</Snackbar>
			</>
		</>
	);
}
