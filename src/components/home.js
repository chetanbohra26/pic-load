import React from "react";
import { toast } from "react-toastify";

import Post from "./post";
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [
				{
					_id: 1,
					title: "Post 1",
					postImage: "https://picsum.photos/1000/800",
				},
				{
					_id: 2,
					title: "Post 2",
					postImage: "https://picsum.photos/1000/800",
				},
				{
					_id: 3,
					title: "Post 3",
					postImage: "https://picsum.photos/1000/800",
				},
			],
		};
	}
	componentDidMount() {
		toast.success(this.getUserGreeting());
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
				{this.state.posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
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
