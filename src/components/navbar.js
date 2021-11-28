//import { toast } from "react-toastify";
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
		<nav className="navbar navbar-dark bg-dark">
			<div className="container-fluid">
				<span className="navbar-brand mb-0 h1">
					<Link
						to={ROUTES.HOME}
						style={{ textDecoration: "none", color: "white" }}
					>
						Pic Load
					</Link>
				</span>

				{props.user && props.user.id ? (
					<button
						className="btn btn-outline-danger"
						onClick={handleLogoutClick}
					>
						Logout
					</button>
				) : (
					<button
						className="btn btn-outline-light"
						onClick={handleLoginClick}
					>
						Login
					</button>
				)}
			</div>
		</nav>
	);
}

export default withRouter(Navbar);
