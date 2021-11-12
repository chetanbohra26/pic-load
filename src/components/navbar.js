//import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";

function Navbar(props) {
    function handleLoginClick() {
        props.history.push("/login");
    }

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Pic Load</span>
                <button
                    className="btn btn-outline-light"
                    onClick={handleLoginClick}
                >
                    Login
                </button>
            </div>
        </nav>
    );
}

export default withRouter(Navbar);
