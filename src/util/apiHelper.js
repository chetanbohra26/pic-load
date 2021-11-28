import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "/api";

const errorHandler = ({ response }) => {
	if (response && response.data) {
		if (response.status === 400) {
			console.log(response.data.message);
			return {
				success: false,
				message: "Invalid form data",
			};
		}
		return response.data;
	} else {
		return {
			success: false,
			message: "Unable to get response",
		};
	}
};

export const loginRequest = async (email, pass) => {
	const loginUrl = `${API_URL}/auth/login`;
	try {
		const res = await axios({
			method: "POST",
			url: loginUrl,
			data: {
				email,
				pass,
			},
		});

		if (!res.data.token && !res.data.success) {
			return errorHandler();
		}

		return res.data;
	} catch (err) {
		return errorHandler(err);
	}
};

export const registerRequest = async (name, email, pass, pass2) => {
	const registerUrl = `${API_URL}/auth/register`;
	try {
		const res = await axios({
			method: "POST",
			url: registerUrl,
			data: {
				name,
				email,
				pass,
				pass2,
			},
		});
		if (!res.data.token && !res.data.success) {
			return errorHandler();
		}
		return res.data;
	} catch (err) {
		return errorHandler(err);
	}
};
