import * as api from "../../API";

export const getAllUser = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_USER" });

	try {
		const { data } = await api.getAllUser();
		dispatch({ type: "GET_ALL_USER_SUCCESS", payload: data });
	} catch (error) {
		console.log(error);
		if (error.response.status === 401) {
			dispatch({ type: "AUTHENTICATION_ERROR" });
		}
		dispatch({ type: "GET_ALL_USER_ERROR", payload: error.data });
	}
};

export const resetGetAllUser = () => async (dispatch) => {
	dispatch({ type: "GET_ALL_USER" });
};
