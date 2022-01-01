import { Github } from "react-bootstrap-icons";
import { withRouter, Link } from "react-router-dom";
import ROUTES from "../config/routeConfig.json";
import { removeToken } from "../util/token";

function Navbar(props) {
	function handleLoginClick() {
		props.history.push(ROUTES.LOGIN);
	}

	function handleVerifyClick() {
		props.history.push(ROUTES.VERIFYUSER);
	}

	function handleLogoutClick() {
		removeToken();
		props.onRemoveUser();
	}

	return (
		<nav className="navbar navbar-dark bg-dark fixed-top">
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">
					<Link
						to={ROUTES.HOME}
						className="text-decoration-none text-white"
						title="Home"
					>
						Pic Load
					</Link>
				</span>

				<div className="d-flex flex-row align-items-center">
					{props.user && props.user.id ? (
						<li className="nav-item dropdown">
							<span
								className="btn p-0 me-2 text-white dropdown-toggle d-inline-flex align-items-center"
								id="navbarDropdown"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<span
									className="d-inline-block text-white text-truncate"
									style={{ maxWidth: "40vw" }}
									title={props?.user?.name}
								>
									{props?.user?.name}
								</span>
							</span>
							<ul
								className="dropdown-menu end-0"
								aria-labelledby="navbarDropdown"
								style={{ left: "auto" }}
							>
								{!props.user?.isVerified && (
									<>
										<li>
											<button
												className="dropdown-item"
												onClick={handleVerifyClick}
											>
												Verify User
											</button>
										</li>
										<li>
											<hr className="dropdown-divider" />
										</li>
									</>
								)}
								<li>
									<button
										className="btn btn-link dropdown-item text-danger"
										onClick={handleLogoutClick}
									>
										Logout
									</button>
								</li>
							</ul>
						</li>
					) : (
						<li className="nav-item">
							<button
								className="btn btn-outline-light me-2"
								onClick={handleLoginClick}
								title="Login"
							>
								Login
							</button>
						</li>
					)}
					<a
						href="https://github.com/chetanbohra26"
						title="Chetan Bohra"
						target="_blank"
						rel="noreferrer"
						className="d-none d-sm-inline"
					>
						<Github size={32} color="white" />
					</a>
				</div>
			</div>
		</nav>
	);
}

export default withRouter(Navbar);
