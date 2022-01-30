import * as api from "../../API";

export const fetchUser = () => async (dispatch) => {
	dispatch({ type: "FETCH_USER" });
	try {
		const { data } = await api.getCurrentUser();
		dispatch({ type: "FETCH_USER_SUCCESS", payload: data });
	} catch (error) {
		dispatch({ type: "FETCH_USER_ERROR" });
		console.log(error.message);
	}
};

export const signIn = (formData, navigate) => async (dispatch) => {
	dispatch({ type: "SIGNIN" });
	try {
		const { data } = await api.signInUser(formData);
		dispatch({ type: "SIGNIN_SUCCESS", payload: data });
		navigate("/");
	} catch (error) {
		console.log(error);
	}
};

export const signUp = (formData, navigate) => async (dispatch) => {
	dispatch({ type: "SIGNUP" });
	try {
		const { data } = await api.createUser(formData);
		dispatch({ type: "SIGNUP_SUCCESS", payload: data });
		navigate("/signup/success");
	} catch (error) {
		console.log(error);
		dispatch({ type: "SIGNUP_ERROR", payload: error.response.data.message });
		setTimeout(() => {
			dispatch({
				type: "CLEAR_SIGNUP_ERROR",
				payload: { data: null, success: false },
			});
		}, 3000);
	}
};

export const signOut = (navigate) => async (dispatch) => {
	dispatch({ type: "SIGNOUT" });
	try {
		dispatch({ type: "SIGNOUT_SUCCESS" });
		navigate("/signin");
	} catch (error) {
		console.log(error);
	}
};

export const clearAuth = (navigate) => async (dispatch) => {
	dispatch({ type: "AUTHENTICATION_RESET" });
	navigate("/signin");
};
