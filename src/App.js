import Navbar from "./components/navbar";
import "react-toastify/dist/ReactToastify.min.css";

import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router";
import Login from "./components/login/login";
import Home from "./components/home/home";

function App() {
    return (
        <div
            className="d-flex bg-gradient flex-column"
            style={{ height: "100vh" }}
        >
            <ToastContainer />
            <Navbar />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
}

export default App;
