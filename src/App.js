import React from "react";

import Navbar from "./components/navbar";
import "react-toastify/dist/ReactToastify.min.css";

import { connect } from "react-redux";
import { setUser, removeUser } from "./actions/userActions";

import ROUTES from "./config/routeConfig.json";

import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router";
import Login from "./components/login/login";
import Home from "./components/home";
import AddPost from "./components/addPost";

class App extends React.Component {
    componentDidMount() {
        console.log("App:componentDidMount", this.props.user);
    }

    render() {
        return (
            <div
                className="d-flex bg-gradient flex-column"
                style={{ height: "100vh" }}
            >
                <ToastContainer />
                <Navbar
                    user={this.props.user}
                    onRemoveUser={this.props.removeUser}
                />
                <Switch>
                    <Route
                        path={ROUTES.LOGIN}
                        render={(props) => (
                            <Login
                                {...props}
                                user={this.props.user}
                                onSetUser={this.props.setUser}
                            />
                        )}
                    />
                    <Route
                        path={ROUTES.ADDPOST}
                        render={(props) => (
                            <AddPost {...props} user={this.props.user} />
                        )}
                    />
                    <Route
                        exact
                        path={ROUTES.HOME}
                        render={(props) => (
                            <Home
                                {...props}
                                user={this.props.user}
                                onSetUser={this.props.setUser}
                            />
                        )}
                    />
                    <Redirect path="*" to={ROUTES.HOME} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch(setUser(user));
        },
        removeUser: () => {
            dispatch(removeUser());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
