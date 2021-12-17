import React from "react";
import { toast } from "react-toastify";
import queryString from "query-string";

import ROUTES from "../config/routeConfig.json";

import { loginRequest, registerRequest } from "../util/apiHelper";
import { fetchTokenAndData, saveToken } from "../util/token";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: true,
			login: { email: "", pass: "" },
			register: { name: "", email: "", pass: "", pass2: "" },
		};
	}

	handleLoginChange = ({ currentTarget: input }) => {
		const login = { ...this.state.login };
		login[input.name] = input.value;
		this.setState({ login });
	};
	handleRegisterChange = ({ currentTarget: input }) => {
		const register = { ...this.state.register };
		register[input.name] = input.value;
		this.setState({ register });
	};

	initUserAndRedirect = () => {
		const data = fetchTokenAndData();
		this.props.onSetUser({
			id: data.id,
			name: data.name,
			email: data.email,
			token: data.token,
		});

		const query = this.props.location?.search;
		const { redirect = ROUTES.HOME } = queryString.parse(query);
		this.props.history?.replace(redirect);
	};

	handleLogin = async (e) => {
		e.preventDefault();
		const { login } = this.state;

		const data = await loginRequest(login.email, login.pass);

		if (!data.success && data.message) {
			return toast.error(data.message);
		}

		const token = data.token;
		if (!token) {
			return toast.error("Unknown error when logging in");
		}
		saveToken(token);

		toast.success(data.message);
		this.initUserAndRedirect();
	};

	handleRegister = async (e) => {
		e.preventDefault();
		const { register } = this.state;

		const data = await registerRequest(
			register.name,
			register.email,
			register.pass,
			register.pass2
		);

		if (!data.success && data.message) {
			return toast.error(data.message);
		}

		const token = data.token;
		if (!token) {
			return toast.error("Unknown error when logging in");
		}
		saveToken(token);

		toast.success(data.message);
		this.initUserAndRedirect();
	};

	getLoginContent = () => {
		const login = this.state.login;
		return (
			<>
				<form onSubmit={this.handleLogin}>
					<div className="mb-3">
						<label htmlFor="login-email" className="form-label">
							Email address
						</label>
						<input
							type="email"
							id="login-email"
							name="email"
							className="form-control"
							placeholder="name@example.com"
							value={login.email}
							onChange={this.handleLoginChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="login-pass" className="form-label">
							Password
						</label>
						<input
							type="password"
							id="login-pass"
							name="pass"
							className="form-control"
							placeholder="(min 6 characters)"
							value={login.pass}
							onChange={this.handleLoginChange}
							required
						/>
					</div>
					<div className="d-flex justify-content-center">
						<button
							className="btn btn-primary align-center"
							title="Login User"
						>
							Submit
						</button>
					</div>
				</form>
			</>
		);
	};

	getRegisterContent = () => {
		const register = this.state.register;
		return (
			<>
				<form onSubmit={this.handleRegister}>
					<div className="mb-3">
						<label htmlFor="register-name" className="form-label">
							Full Name
						</label>
						<input
							type="text"
							id="register-name"
							name="name"
							className="form-control"
							placeholder="Enter your name"
							value={register.name}
							onChange={this.handleRegisterChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="register-email" className="form-label">
							Email address
						</label>
						<input
							type="email"
							id="register-email"
							name="email"
							className="form-control"
							placeholder="name@example.com"
							value={register.email}
							onChange={this.handleRegisterChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="register-password"
							className="form-label"
						>
							Password
						</label>
						<input
							type="password"
							id="register-password"
							name="pass"
							className="form-control"
							placeholder="(min 6 characters)"
							value={register.pass}
							onChange={this.handleRegisterChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label
							htmlFor="register-c-password"
							className="form-label"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="register-c-password"
							name="pass2"
							className="form-control"
							placeholder="(min 6 characters)"
							value={register.pass2}
							onChange={this.handleRegisterChange}
							required
						/>
					</div>
					<div className="d-flex justify-content-center">
						<button
							className="btn btn-primary align-center"
							title="Register User"
						>
							Register
						</button>
					</div>
				</form>
			</>
		);
	};

	render() {
		return (
			<div className="row m-0 p-4 justify-content-center">
				<div className="card col col-sm-12 col-md-9 col-lg-6 mx-auto p-0 shadow">
					<div className="card-header p-0 d-flex">
						<ul className="nav nav-fill w-100">
							<li className="nav-item flex-fill">
								<button
									className="nav-link p-3 border-0 bg-white text-black fw-bolder fs-5"
									onClick={() =>
										this.setState({ isLogin: true })
									}
									style={
										!this.state.isLogin
											? {
													backgroundColor: "gray",
													boxShadow:
														"0 0 1rem 0.02rem inset rgb(202, 202, 202)",
													color: "red",
											  }
											: {}
									}
								>
									Login
								</button>
							</li>
							<li className="nav-item">
								<button
									className="nav-link p-3 border-0 bg-white text-black fw-bolder fs-5"
									style={
										this.state.isLogin
											? {
													backgroundColor: "gray",
													boxShadow:
														"0 0 1rem 0.02rem inset rgb(202, 202, 202)",
											  }
											: {}
									}
									onClick={() =>
										this.setState({ isLogin: false })
									}
								>
									Register
								</button>
							</li>
						</ul>
					</div>
					<div className="card-body">
						{this.state.isLogin
							? this.getLoginContent()
							: this.getRegisterContent()}
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
