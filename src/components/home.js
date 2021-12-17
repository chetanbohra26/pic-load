import axios from "axios";
import React from "react";
import { toast } from "react-toastify";

import Post from "./post";
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
		};
	}
	componentDidMount() {
		toast.success(this.getUserGreeting());
		axios({
			url: "http://localhost:7500/api/post/fetchPost",
			method: "GET",
		})
			.then(({ data }) => {
				console.log(data);
				const posts = data.posts.map((post) => ({
					...post,
					postImage: `http://localhost:7500/uploads/${post.postImage}`,
				}));
				this.setState({ posts });
			})
			.catch((err) => {
				console.error(err);
			});
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
			<div className="d-flex flex-column flex-grow-1 flex-shrink-1">
				<div className="d-flex flex-column mt-4">
					{this.state.posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
				{this.props.user && this.props.user?.id && (
					<button
						className="btn btn-dark rounded-pill btn-lg position-fixed bottom-0 end-0 m-4 fw-bolder border border-2 border-dark"
						onClick={() => this.handleAddPost()}
						title="Add a new post"
					>
						+ Add Post
					</button>
				)}
			</div>
		);
	}
}

export default Home;
