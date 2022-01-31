import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
	signIn,
	signInDemoAccount,
	signInDemoAccountDev,
} from "../../redux/actions/user";
import { CircularProgress } from "@mui/material";
import {
	Button,
	TextField,
	Box,
	Typography,
	Container,
	Snackbar,
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import FormAlert from "./formAlert";

let initialState = { email: "", password: "" };
function SignIn({ props }) {
	const { setIsModalShown } = props;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const selector = useSelector((state) => state.userReducers);
	const [formData, setFormData] = useState(initialState);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signIn(formData, navigate));
	};
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const handleDemoAccount = () => {
		dispatch(signInDemoAccount(navigate));
	};

	const handleDemoAccountDev = () => {
		dispatch(signInDemoAccountDev(navigate));
	};
	const cleanUpSelector = () => {
		selector.data = null;
		selector.success = false;
		selector.loading = false;
	};

	return (
		<Container component="main" maxWidth={"xs"}>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography variant="h4">Sign In</Typography>

				<Box component="form" onSubmit={handleSubmit} marginTop={1}>
					<TextField
						fullWidth
						required
						label="Email"
						name="email"
						margin="normal"
						type="email"
						autoComplete="current-email"
						onChange={handleChange}
					/>
					<TextField
						fullWidth
						required
						label="Password"
						name="password"
						margin="normal"
						type="password"
						autoComplete="new-password"
						onChange={handleChange}
					/>
					<Button
						startIcon={<HelpIcon></HelpIcon>}
						size="large"
						onClick={() => {
							setIsModalShown(true);
						}}
					>
						Learn More About The Project
					</Button>
					<Button
						disabled={selector.loading}
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 1, mb: 1 }}
					>
						{selector.loading ? <CircularProgress /> : <> Sign In</>}
					</Button>
					<Button
						disabled={selector.loading}
						fullWidth
						variant="contained"
						color="success"
						sx={{ mb: 1 }}
						onClick={handleDemoAccount}
					>
						{selector.loading ? (
							<CircularProgress />
						) : (
							<> Sign In As Team Lead Demo</>
						)}
					</Button>
					<Button
						disabled={selector.loading}
						fullWidth
						variant="contained"
						color="warning"
						sx={{ mb: 2 }}
						onClick={handleDemoAccountDev}
					>
						{selector.loading ? (
							<CircularProgress />
						) : (
							<> Sign In As Developer Demo</>
						)}
					</Button>
				</Box>
			</Box>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
				marginTop={2}
			>
				<Typography
					variant="body2"
					component={Link}
					to="/signup"
					onClick={cleanUpSelector}
				>
					Don't have an account? Sign Up
				</Typography>
			</Box>
			<Snackbar open={!!selector.data && !selector.success}>
				<FormAlert props={{ message: selector.data }} />
			</Snackbar>
		</Container>
	);
}

export default SignIn;
