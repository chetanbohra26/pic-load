import { withRouter, Link } from "react-router-dom";
import ROUTES from "../config/routeConfig.json";
import { removeToken } from "../util/token";

function Navbar(props) {
	function handleLoginClick() {
		props.history.push("/login");
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

				<div className="d-flex flex-row">
					{props.user && props.user.id ? (
						<>
							<li className="nav-item dropdown">
								<span
									className="btn dropdown-toggle text-white"
									id="navbarDropdown"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{props?.user?.name}
								</span>
								<ul
									className="dropdown-menu"
									aria-labelledby="navbarDropdown"
								>
									{/*
									<li>
										<button className="dropdown-item">
											Profile
										</button>
									</li>
									<li>
										<hr className="dropdown-divider" />
									</li>
										*/}
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
						</>
					) : (
						<li className="nav-item">
							<button
								className="btn btn-outline-light"
								onClick={handleLoginClick}
								title="Login"
							>
								Login
							</button>
						</li>
					)}
				</div>
			</div>
		</nav>
	);
}

export default withRouter(Navbar);
