import React from "react";
import ReactOtpInput from "react-otp-input";
import { toast } from "react-toastify";

class VerifyUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			otp: "",
		};
	}
	componentDidMount() {
		toast.info("Check mail for OTP");
	}

	handleOtpChange = (otp) => {
		this.setState({ otp });
	};
	handleOtpSubmit = async (e) => {
		e.preventDefault();
	};
	render() {
		return (
			<div className="row m-0 p-4 justify-content-center">
				<div className="card col col-sm-12 col-md-9 col-lg-6 mx-auto p-0 shadow">
					<h5 className="card-header text-center fw-bolder">
						Verify User Email
					</h5>
					<div className="card-body d-flex flex-column p-3">
						<div className="mb-3">
							<label htmlFor="post-title" className="form-label">
								User Email
							</label>
							<input
								type="text"
								id="post-title"
								name="title"
								className="form-control"
								placeholder="Email"
								value={this.props.user?.email}
								disabled
							/>
						</div>
						<form onSubmit={this.handleOtpSubmit}>
							<div className="d-flex flex-column align-items-center">
								<h5>Enter the otp sent to the given email</h5>
								<ReactOtpInput
									numInputs={6}
									value={this.state.otp}
									onChange={this.handleOtpChange}
									inputStyle="w-50 mx-auto border border-2 border-dark"
									placeholder="xxxxxx"
									containerStyle="p-2 mb-3"
									isInputNum
									shouldAutoFocus
								/>
								<button className="btn btn-success">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default VerifyUser;
