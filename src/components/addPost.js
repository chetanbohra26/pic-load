import React from "react";

import ROUTES from "../config/routeConfig.json";
import { toast } from "react-toastify";
import { addPostRequest, getPostCategoriesRequest } from "../util/apiHelper";

class AddPost extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			postBtnDisabled: false,
			post: {
				title: "",
				postImage: "",
				category: "",
			},
			categories: [],
		};
	}

	componentDidMount() {
		if (!this.props.user?.id) this.redirectToLogin(true);

		if (!this.props.user?.isVerified) {
			toast.error("Need to verify email first");
			this.props.history?.replace(ROUTES.VERIFYUSER);
		}
		this.loadCategories();
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

	loadCategories = async () => {
		const data = await getPostCategoriesRequest();
		const categories = data?.categories || [];
		const category = data?.defaultCategory || "";
		const post = { ...this.state.post, category };
		this.setState({ categories, post });
	};

	handleTitleChange = ({ target }) => {
		const post = { ...this.state.post, title: target.value };
		this.setState({ post });
	};

	handleCategoryChange = ({ target }) => {
		const post = { ...this.state.post, category: target.value };
		this.setState({ post });
	};

	handleImageChange = ({ target }) => {
		const post = { ...this.state.post, postImage: target.files[0] };
		this.setState({ post });
	};

	createPost = async (e) => {
		e.preventDefault();
		this.setState({ postBtnDisabled: true });
		const { title, category, postImage } = this.state.post;
		const formData = new FormData();
		formData.append("title", title);
		formData.append("category", category);
		formData.append("postImage", postImage);

		const data = await addPostRequest(formData, this.props.user?.token);
		if (data.success) {
			toast.success(data.message);
			this.redirectToHome();
		} else if (data.message) {
			this.setState({ postBtnDisabled: false });
			toast.error(data.message);
		}
	};

	render() {
		const post = this.state.post;
		return (
			<div className="row m-0 p-4 justify-content-center">
				<div className="card col col-sm-12 col-md-9 col-lg-6 p-0 shadow">
					<h5 className="card-header text-center fw-bolder">
						Add a new Post
					</h5>
					<div className="card-body d-flex flex-column p-3">
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
									htmlFor="post-category"
									className="form-label"
								>
									Post Category
								</label>
								<select
									id="post-category"
									name="category"
									className="form-select"
									value={this.state.category}
									onChange={this.handleCategoryChange}
								>
									{this.state.categories.map((cat) => (
										<option value={cat.id} key={cat.id}>
											{cat.name}
										</option>
									))}
								</select>
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
									disabled={this.state.postBtnDisabled}
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
