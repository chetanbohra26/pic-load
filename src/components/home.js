import React from "react";
import { toast } from "react-toastify";

import Post from "./post";
import { fetchPostRequest, getUploadUrl } from "../util/apiHelper";
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		};
	}
	componentDidMount() {
		toast.success(this.getUserGreeting());
		this.fetchPosts();
	}

	async fetchPosts() {
		const data = await fetchPostRequest();
		const posts = data.posts.map((post) => ({
			...post,
			postImage: getUploadUrl(post.postImage),
		}));
		this.setState({ posts });
	}

	getUserGreeting() {
		const name = this.props.user?.name;
		return `Welcome ${name}`;
	}
	handleAddPost() {
		if (this.props.user && this.props.user?.id) {
			this.props.history.replace("/addPost");
		} else {
			toast.error("User must be logged in to post");
		}
	}
	render() {
		return (
			<div className="d-flex flex-column flex-grow-1 flex-shrink-1 container">
				<div className="d-flex flex-column mt-4 align-self-center col-sm-12 col-lg-9">
					{this.state.posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
				{this.props.user && this.props.user?.id && (
					<button
						className="btn btn-dark rounded-pill btn-lg position-fixed bottom-0 end-0 m-4 fw-bolder border border-dark"
						onClick={() => this.handleAddPost()}
						title="Add a new post"
					>
						+ <span className="d-none d-md-inline">Add Post</span>
					</button>
				)}
			</div>
		);
	}
}

export default Home;
