import React from "react";
import ReactOtpInput from "react-otp-input";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import otpConfig from "../config/otpConfig.json";
import ROUTES from "../config/routeConfig.json";
import { sendOTPRequest, verifyOTPRequest } from "../util/apiHelper";
import { fetchTokenAndData, saveToken } from "../util/token";

class VerifyUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			otp: "",
			statusCheck: false,
			verify: false,
			disableSendOTP: false,
			disableSubmitOTP: false,
		};
	}
	componentDidUpdate() {
		if (!this.props.user?.id) this.redirectToLogin();
	}

	redirectToLogin = () => {
		this.props.history?.replace(ROUTES.LOGIN);
	};

	redirectToHome = () => {
		this.props.history?.replace(ROUTES.HOME);
	};

	componentDidMount() {
		const isVerified = this.props?.user?.isVerified;
		if (isVerified) {
			this.redirectToHome();
		} else {
			this.setState({ statusCheck: true });
		}
	}

	initUserAndRedirect = () => {
		const data = fetchTokenAndData();
		this.props.onSetUser({
			id: data.id,
			name: data.name,
			email: data.email,
			isVerified: data.isVerified,
			token: data.token,
		});

		this.props?.history?.push(ROUTES.HOME);
	};

	sendOTP = async () => {
		this.setState({ disableSendOTPL: true });
		const data = await sendOTPRequest(this.props.user?.token);
		if (data.success) {
			toast.success(data.message);
			this.setState({ verify: true });
			return;
		} else if (data.message) {
			toast.error(data.message);
		}
		this.setState({ disableSendOTP: false });
	};

	handleOtpChange = (otp) => {
		this.setState({ otp });
	};
	handleOtpSubmit = async (e) => {
		e.preventDefault();
		const { otp } = this.state;
		if (otp.length !== otpConfig.length) return toast.error("Invalid OTP");
		this.setState({ disableSubmitOTP: true });
		const data = await verifyOTPRequest(this.props?.user.token, otp);
		if (data.success) {
			toast.success(data.message);
			if (data.token) saveToken(data.token);
			this.initUserAndRedirect();
		} else if (data.message) {
			toast.error(data.message);
			this.setState({ disableSubmitOTP: false });
		}
	};

	getVerifyLayout = () => {
		return (
			<div className="row m-0 p-4 justify-content-center">
				<div className="card col col-sm-12 col-md-9 col-lg-6 mx-auto p-0 shadow">
					<h5 className="card-header text-center fw-bolder">
						Verify User Email
					</h5>
					<div className="card-body d-flex flex-column p-3">
						<div className="mb-3">
							<label>User Email</label>
							<label
								className="form-control text-secondary"
								title={this.props.user?.email}
							>
								{this.props.user?.email}
							</label>
						</div>
						{this.state.verify ? (
							<form onSubmit={this.handleOtpSubmit}>
								<div className="d-flex flex-column align-items-center">
									<h5>
										Enter the otp sent to the given email
									</h5>
									<ReactOtpInput
										numInputs={otpConfig.length}
										value={this.state.otp}
										onChange={this.handleOtpChange}
										inputStyle="w-75 mx-auto border border-2 border-dark"
										placeholder={otpConfig.placeholderChar.repeat(
											otpConfig.length
										)}
										containerStyle="p-2 mb-3"
										isInputNum={otpConfig.onlyNumeric}
										shouldAutoFocus
									/>
									<button className="btn btn-success">
										Submit
									</button>
								</div>
							</form>
						) : (
							<>
								<button
									className="btn btn-primary align-self-center"
									onClick={this.sendOTP}
									disabled={this.state.disableSendOTP}
									title="Send OTP to mail"
								>
									Send OTP
								</button>
								<Link
									className="align-self-center mt-1"
									to={ROUTES.HOME}
									title="Continue using with guest access"
								>
									Skip verification
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		);
	};

	render() {
		return (
			<>
				{this.state.statusCheck ? (
					this.getVerifyLayout()
				) : (
					<div className="d-flex flex-column flex-fill mx-auto justify-content-center">
						<span className="fs-4 text-secondary">Loading</span>
					</div>
				)}
			</>
		);
	}
}

export default VerifyUser;
