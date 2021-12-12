import axios from "axios";

const API_URL = process.env.REACT_APP_URL || "";

const errorHandler = ({ response }) => {
	if (response && response.data) {
		return response.data;
	} else {
		return {
			success: false,
			message: "Unable to get response",
		};
	}
};

export const requestHandler = async (req) => {
	const url = `${API_URL}/api${req.url}`;
	try {
		const res = await axios({
			url,
			method: req.method,
			headers: req.headers,
			data: req.data,
		});

		return res.data;
	} catch (err) {
		return errorHandler(err);
	}
};

export const loginRequest = async (email, pass) => {
	const res = await requestHandler({
		method: "POST",
		url: "/auth/login",
		data: {
			email,
			pass,
		},
	});

	//console.log(res);
	return res;
};

export const registerRequest = async (name, email, pass, pass2) => {
	const res = await requestHandler({
		method: "POST",
		url: "/auth/register",
		data: {
			name,
			email,
			pass,
			pass2,
		},
	});

	//console.log(res);
	return res;
};

export const addPostRequest = async (data, token) => {
	const res = await requestHandler({
		method: "POST",
		url: "/post/createPost",
		headers: {
			"Content-Type": "multipart/form-data",
			token,
		},
		data,
	});

	console.log(res);
	return res;
};
