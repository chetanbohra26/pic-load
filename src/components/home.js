import React from "react";
import { toast } from "react-toastify";

import Post from "./post";
import { fetchPostRequest, getUploadUrl } from "../util/apiHelper";
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			initialFetch: false,
		};
	}
	componentDidMount() {
		this.fetchPosts();
	}

	async fetchPosts() {
		const data = await fetchPostRequest();
		const posts = data?.posts?.map((post) => ({
			...post,
			postImage: getUploadUrl(post.postImage),
		}));
		if (posts) this.setState({ posts });
		this.setState({ initialFetch: true });
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
			<div className="d-flex flex-column flex-fill container">
				{this.state.posts.length > 0 ? (
					<div className="d-flex flex-column mt-4 align-self-center col-sm-12 col-lg-9">
						{this.state.posts.map((post) => (
							<Post key={post._id} post={post} />
						))}
					</div>
				) : (
					<div className="d-flex flex-column flex-fill mx-auto justify-content-center">
						{this.state.initialFetch ? (
							<>
								<span className="fs-4 text-secondary">
									No posts found. Try refreshing the page.
								</span>
								<button
									className="btn btn-dark d-inline-block"
									onClick={() => this.fetchPosts()}
								>
									Retry
								</button>
							</>
						) : (
							<span className="fs-4 text-secondary">Loading</span>
						)}
					</div>
				)}
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
