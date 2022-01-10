import React from "react";
import { toast } from "react-toastify";
import ReactOtpInput from "react-otp-input";

import ROUTES from "../config/routeConfig.json";
import otpConfig from "../config/otpConfig.json";
import { createPassOTPRequest, submitPassOTPRequest } from "../util/apiHelper";

class ForgotPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			isLoggedIn: false,
			otpSent: false,
			otp: "",
			newPass: "",
			newPass2: "",
		};
	}

	redirectBack = () => {
		this.props.history?.replace(ROUTES.LOGIN);
	};

	componentDidMount() {
		const email = this.props.user?.email;
		if (email) this.setState({ email, isLoggedIn: true });
	}
	handleEmailInput = ({ target }) => {
		this.setState({ email: target.value });
	};
	handleEmailSubmit = async (e) => {
		e.preventDefault();
		const email = this.state.email;
		const data = await createPassOTPRequest(email);
		if (data.success) {
			toast.success(data.message);
			this.setState({ otpSent: true });
		} else {
			toast.error(data.message);
		}
	};

	handleOtpInput = (otp) => {
		this.setState({ otp });
	};
	handlePassInput = ({ currentTarget: input }) => {
		const passInput = {};
		passInput[input.name] = input.value;
		this.setState(passInput);
	};

	handleOtpSubmit = async (e) => {
		e.preventDefault();
		const { otp, email, newPass, newPass2 } = this.state;
		if (otp.length !== otpConfig.length) return toast.error("Invalid OTP");

		const data = await submitPassOTPRequest(email, otp, newPass, newPass2);
		if (data.success) {
			toast.success(data.message);
			this.redirectBack();
		} else {
			toast.error(data.message);
		}
	};

	render() {
		return (
			<div className="row m-0 p-4 justify-content-center">
				<div className="card col col-sm-12 col-md-9 col-lg-6 mx-auto p-0 shadow">
					<h5 className="card-header text-center fw-bolder">
						Forgot Password
					</h5>
					<div className="card-body d-flex flex-column p-3">
						<div className="mb-3">
							<label htmlFor="user-email">User Email</label>
							<input
								id="user-email"
								type="email"
								placeholder="Enter email address"
								className={`form-control ${
									this.state.isLoggedIn
										? "text-secondary"
										: ""
								}`}
								title={this.props.user?.email}
								required
								disabled={
									this.state.isLoggedIn || this.state.otpSent
								}
								value={this.state.email}
								onChange={this.handleEmailInput}
							/>
						</div>
						{this.state.otpSent ? (
							<form onSubmit={this.handleOtpSubmit}>
								<div className="d-flex flex-column">
									<div className="d-flex flex-column align-items-center">
										<h5>
											Enter the otp sent to the given
											email
										</h5>
										<ReactOtpInput
											numInputs={otpConfig.length}
											value={this.state.otp}
											onChange={this.handleOtpInput}
											inputStyle="w-75 mx-auto border border-2 border-dark"
											placeholder={otpConfig.placeholderChar.repeat(
												otpConfig.length
											)}
											containerStyle="p-2 mb-3"
											isInputNum={otpConfig.onlyNumeric}
											shouldAutoFocus
										/>
									</div>
									<div className="d-flex flex-column">
										<div className="mb-3">
											<label
												htmlFor="user-pass"
												className="form-label"
											>
												Enter password
											</label>
											<input
												id="user-pass"
												name="newPass"
												type="password"
												className="form-control"
												placeholder="(min 6 characters)"
												value={this.state.newPass}
												onChange={this.handlePassInput}
												required
											/>
										</div>
										<div className="mb-3">
											<label
												htmlFor="user-pass2"
												className="form-label"
											>
												Confirm password
											</label>
											<input
												id="user-pass2"
												name="newPass2"
												type="password"
												className="form-control"
												placeholder="(same as password)"
												value={this.state.newPass2}
												onChange={this.handlePassInput}
												required
											/>
										</div>
										<button
											className="btn btn-success mb-3 align-self-center"
											style={{ minWidth: "6rem" }}
										>
											Submit
										</button>
									</div>
								</div>
							</form>
						) : (
							<form onSubmit={this.handleEmailSubmit}>
								<div className="d-flex mb-3 flex-column">
									<button
										className="btn btn-primary align-self-center"
										style={{ minWidth: "6rem" }}
									>
										Send OTP
									</button>
								</div>
							</form>
						)}
						{this.state.passToken !== "" && (
							<form onSubmit={this.handlePassSubmit}></form>
						)}
						<button
							className="btn btn-danger align-self-center"
							style={{ minWidth: "6rem" }}
							onClick={this.redirectBack}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
