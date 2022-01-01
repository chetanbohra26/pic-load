import jwt from "jsonwebtoken";

const TOKEN_KEY = "user-token";

export const saveToken = (token) => {
	if (!token) return;
	localStorage.setItem(TOKEN_KEY, token);
	return true;
};

export const fetchToken = () => {
	const token = localStorage.getItem(TOKEN_KEY);
	return token;
};

export const removeToken = () => {
	localStorage.removeItem(TOKEN_KEY);
	return true;
};

export const fetchTokenAndData = () => {
	try {
		const token = fetchToken();
		if (!token) return;

		const payload = jwt.decode(token);
		payload["token"] = token;
		return payload;
	} catch (err) {
		console.error("Error while initializing token.");
		if (err.name === "TypeError") {
			console.log("Error when verifying token");
			removeToken();
		}
	}
};
