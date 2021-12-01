import React from "react";
import axios from "axios";
import ROUTES from "../config/routeConfig.json";

class AddPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {
				title: "",
				postImage: "",
			},
		};
	}

	componentDidMount() {
		if (!this.props.user?.id) {
			this.redirectToLogin(true);
		}
	}

	redirectToLogin = (toReturn = false) => {
		const redirectString = toReturn
			? `${ROUTES.LOGIN}?redirect=${ROUTES.ADDPOST}`
			: ROUTES.LOGIN;
		this.props.history?.replace(redirectString);
	};

	redirectToHome = () => {
		console.log(this.props.history?.push(ROUTES.HOME));
	};

	componentDidUpdate() {
		if (!this.props.user?.id) this.redirectToLogin();
	}

	handleTitleChange = ({ target }) => {
		const post = { ...this.state.post, title: target.value };
		this.setState({ post });
	};

	handleImageChange = ({ target }) => {
		const post = { ...this.state.post, postImage: target.files[0] };
		console.log(target.files[0]);
		this.setState({ post });
	};

	createPost = (e) => {
		e.preventDefault();
		const { title, postImage } = this.state.post;
		const data = new FormData();
		data.append("title", title);
		data.append("postImage", postImage);

		axios
			.post("http://localhost:7500/api/post/createPost", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then(() => console.log("done"))
			.catch((err) => console.log(err));
	};

	render() {
		const post = this.state.post;
		return (
			<div className="row m-0 p-4 justify-content-center">
				<div className="card col col-sm-12 col-md-9 col-lg-6 p-0">
					<h5 className="card-header text-center fw-bolder">
						Add a new Post
					</h5>
					<div className="card-body d-flex flex-grow-1 flex-shrink-1 flex-column p-3">
						<form onSubmit={this.createPost}>
							<div className="mb-3">
								<label
									htmlFor="post-title"
									className="form-label"
								>
									Post title
								</label>
								<textarea
									type="text"
									id="post-title"
									name="title"
									className="form-control"
									placeholder="Enter title for the post"
									value={post.title}
									onChange={this.handleTitleChange}
									required
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="post-image"
									className="form-label"
								>
									Post image
								</label>
								<input
									type="file"
									id="post-image"
									name="postImage"
									className="form-control"
									placeholder="Select an image for post"
									onChange={this.handleImageChange}
									accept="image/*"
									required
								/>
							</div>
							<div className="d-flex justify-content-center mb-3">
								<button
									className="btn btn-primary fw-bolder"
									style={{ minWidth: "6rem" }}
									title="Create post"
								>
									Post
								</button>
							</div>
						</form>
						<div className="d-flex justify-content-center">
							<button
								className="btn btn-danger fw-bolder"
								style={{ minWidth: "6rem" }}
								onClick={this.redirectToHome}
								title="Return to home"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddPost;
