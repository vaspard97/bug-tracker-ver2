import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Slide from "@mui/material/Slide";
import { Divider, Typography, IconButton } from "@mui/material";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ props }) {
	const { isModalShown, setIsModalShown } = props;

	const handleClose = () => {
		setIsModalShown(false);
	};

	return (
		<div>
			<Dialog
				open={isModalShown}
				maxWidth={"lg"}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogContent>
					<IconButton
						onClick={() => {
							setIsModalShown(false);
						}}
					>
						<CancelRoundedIcon></CancelRoundedIcon>
					</IconButton>

					<Typography variant="h4" gutterBottom>
						INTRODUCTION
					</Typography>
					<Typography gutterBottom>
						Welcome to the Bug Tracker. Thank you for visiting my website. The
						purpose of this website is to serve as productivity tool for an
						organization/company to keep tracks of their projects and submit
						bugs or issues related to the aforemention project.
					</Typography>
					<Divider sx={{ mb: 1, mt: 1 }}></Divider>
					<Typography variant="h5">
						If You intend To Submit Bugs or Issues:
					</Typography>
					<Typography variant="subtitle1">
						<ol>
							<li>Sign Up New Account And Verify Your Account</li>
							<li>Login with Your Account</li>
							<li>
								Create A Project And Select Developers To Be Included In The
								Projects
								<Typography variant="subtitle2" gutterBottom color="red">
									NOTE:ONLY TEAM LEAD ARE AUTHORIZED TO CREATE PROJECT
								</Typography>
							</li>
							<li>
								Create A Ticket And Assign The Ticket To Any Project Members.
							</li>
						</ol>
					</Typography>
					<Typography variant="h5">
						Don't Want To Deal With Hassle Of Creating New A Account?
					</Typography>
					<Typography>
						Login With The Demo Account and Gain All the Access As Team Lead
					</Typography>
					<Divider sx={{ mb: 1, mt: 1 }}></Divider>
					<Typography variant="h4" gutterBottom>
						DEVS TO DEVS
					</Typography>
					<Typography gutterBottom>
						This web application was develope to demonstrate my skill as a
						software developer. It is a single page application built using
						MongoDB, Express,React and Node.js (MERN Stack). I have also
						implemeted authentication and authorization using JWT to control
						access of each user.This web application was also developed with
						responsive design in mind. Hence Material UI is used to built the
						application UI. Feel free to Explore the web application using the
						demo account.
					</Typography>
					<Typography variant="h5">
						Here are additional some information:
					</Typography>
					<Typography variant="subtitle1">
						<ul>
							<li>
								There Are Only Two Roles In This Project, Developer and Team
								Lead
							</li>
							<li>
								The Access To Create, Update And Delete Project Are Exclusively
								Granted Only To Team Lead.
							</li>
							<li>
								The Access To Create and Update Project Are Given To All User.
							</li>
							<li>
								However A User Can Only Create A Ticket For A Project They Had
								Been Assigned To.
							</li>
							<li>
								User May Only Update Ticket That They Have Created Or Assigned
								To.
							</li>
						</ul>
					</Typography>
				</DialogContent>
				<DialogActions></DialogActions>
			</Dialog>
		</div>
	);
}
