export const userReducers = (
	state = { data: null, success: null, loading: true },
	action
) => {
	switch (action.type) {
		case "FETCH_USER":
			return {
				...state,
				loading: true,
			};

		case "FETCH_USER_SUCCESS":
			return {
				...state,
				data: action.payload,
				success: true,
				loading: false,
			};
		case "FETCH_USER_ERROR":
			return {
				...state,
				success: false,
				loading: false,
			};
		case "SIGNIN":
			return {
				...state,
				data: null,
				success: false,
				loading: true,
			};

		case "SIGNIN_SUCCESS":
			localStorage.setItem(
				"profile",
				JSON.stringify(action.payload.accessToken)
			);
			return {
				...state,
				data: action.payload.tokenUser,
				success: true,
				loading: false,
			};

		case "SIGNIN_ERROR":
			return {
				...state,
				data: action.payload,
				success: false,
				loading: false,
			};

		case "CLEAR_SIGNIN_ERROR":
			return {
				...state,
				data: null,
				success: false,
				loading: false,
			};

		case "SIGNOUT":
			return {
				...state,
				success: null,
				loading: true,
			};

		case "SIGNOUT_SUCCESS":
			localStorage.removeItem("profile");
			return {
				...state,
				data: null,
				success: true,
				loading: false,
			};

		default:
			return state;
	}
};

export const authenticationReducer = (
	state = { success: null, loading: true },
	action
) => {
	switch (action.type) {
		case "AUTHENTICATION":
			return {
				...state,
				success: null,
				loading: true,
			};

		case "AUTHENTICATION_SUCCESS":
			return {
				...state,
				success: true,
				loading: false,
			};

		case "AUTHENTICATION_ERROR":
			localStorage.removeItem("profile");
			return {
				...state,
				success: false,
				loading: false,
			};

		case "AUTHENTICATION_RESET":
			return {
				...state,
				success: null,
				loading: false,
			};

		case "CLEAR_AUTHENTICATION_SUCCESS":
			return {
				...state,
				success: false,
				loading: false,
			};

		default:
			return state;
	}
};
