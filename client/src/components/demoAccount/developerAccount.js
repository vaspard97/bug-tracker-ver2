import {
	Card,
	CardHeader,
	CardActions,
	CardContent,
	Typography,
	Button,
	Box,
} from "@mui/material";
export default function DeveloperAccount() {
	return (
		<Card sx={{ maxWidth: "360px" }}>
			<CardContent>
				<Typography textAlign={"center"} variant="h5" gutterBottom>
					Hom Tolland
				</Typography>
				<Typography textAlign={"center"} variant="subtitle2" gutterBottom>
					DEVELOPER
				</Typography>
				<Box display="flex" justifyContent={"center"}>
					<Button>Login As A Developer</Button>
				</Box>
			</CardContent>
		</Card>
	);
}
