import React from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { CaretRightFill } from "react-bootstrap-icons";

import Post from "./post";
import {
	fetchPostRequest,
	getPostCategoriesRequest,
	getUploadUrl,
} from "../util/apiHelper";
import SideNav from "./sideNav";
class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			initialFetch: false,
			categories: [],
			activeCat: "",
			isNavOpen: false,
		};
	}
	componentDidMount() {
		this.fetchCategories();
	}

	fetchCategories = async () => {
		const data = await getPostCategoriesRequest();
		const categories = data?.categories;
		if (categories) {
			this.setState({ categories, activeCat: categories[0]?.id });
			this.fetchPosts(categories[0]?.id);
		}
	};

	openNav = () => {
		this.setState({ isNavOpen: true });
	};

	closeNav = () => {
		console.log("closing nav");
		this.setState({ isNavOpen: false });
	};

	loadCat = (category) => {
		if (category === this.state.activeCat) return;
		this.setState({ activeCat: category, isNavOpen: false });
		this.fetchPosts(category);
	};

	setCategory = (category) => {
		this.setState({ activeCat: category });
		this.fetchPosts(category);
	};

	fetchPosts = async (category) => {
		const data = await fetchPostRequest(category);
		const posts = data?.posts?.map((post) => ({
			...post,
			postImage: getUploadUrl(post.postImage),
		}));
		if (posts) {
			this.setState({ posts });
			if (posts.length === 0) return toast.info("No posts found");
		} else {
			toast.error("Could not fetch posts.");
		}
		this.setState({ initialFetch: true });
	};

	handleAddPost() {
		if (this.props?.user && this.props?.user?.id) {
			if (!this.props?.user?.isVerified)
				return toast.error("Need to verify email first");

			this.props.history.replace("/addPost");
		} else {
			toast.error("User must be logged in to post");
		}
	}
	render() {
		return (
			<>
				{this.state.isNavOpen ? (
					createPortal(
						<SideNav onClose={this.closeNav}>
							<div className="d-flex flex-column p-2 overflow-auto">
								{this.state.categories.map((cat) => (
									<button
										className={`p-2 btn btn-dark w-100 mb-1 text-start ${
											this.state.activeCat === cat.id &&
											"fw-bolder bg-light text-dark"
										}`}
										key={cat.id}
										onClick={() => this.loadCat(cat.id)}
									>
										{cat.name}
									</button>
								))}
							</div>
						</SideNav>,
						document.getElementById("sidenav-backdrop")
					)
				) : (
					<div
						className="position-fixed top-50 d-xs-inline d-lg-none bg-black py-4 rounded-end rounded-lg"
						style={{ zIndex: 2000 }}
						role="button"
						onClick={this.openNav}
					>
						<CaretRightFill fill="white" fontSize={24} />
					</div>
				)}
				<div
					className="d-flex flex-row flex-fill container-xl justify-content-center overflow-hidden"
					style={{ height: "0vh" }}
				>
					{this.state.categories.length > 0 && (
						<div className="d-none d-lg-flex flex-column mt-2 me-2 ms-lg-2 col-2 absolute-top">
							<ul className="list-group">
								<li className="list-group-item p-3 mb-2 fw-bold fs-5 bg-dark text-light">
									Categories
								</li>
								{this.state.categories.map((cat) => (
									<button
										className={`btn btn-light p-3 list-group-item mb-1 text-start ${
											this.state.activeCat === cat.id &&
											"fw-bold"
										}`}
										key={cat.id}
										onClick={() => this.loadCat(cat.id)}
									>
										{cat.name}
									</button>
								))}
							</ul>
						</div>
					)}
					{this.state.posts.length > 0 ? (
						<div className="d-flex flex-column mt-2 col-sm-12 col-lg-10 overflow-auto">
							{this.state.posts.map((post) => (
								<Post key={post._id} post={post} />
							))}
						</div>
					) : (
						<div className="d-flex flex-column mx-auto align-self-center">
							{this.state.initialFetch ? (
								<>
									<span className="fs-4 text-secondary">
										No posts found.
									</span>
									<button
										className="btn btn-dark d-inline-block"
										onClick={() => {
											this.fetchPosts(
												this.state.activeCat
											);
										}}
									>
										Retry
									</button>
								</>
							) : (
								<span className="fs-4 text-secondary">
									Loading
								</span>
							)}
						</div>
					)}
					{this.props.user && this.props.user?.id && (
						<button
							className="btn btn-dark rounded-pill btn-lg position-fixed bottom-0 end-0 m-4 fw-bolder border border-dark"
							onClick={() => this.handleAddPost()}
							title="Add a new post"
						>
							{"+ "}
							<span className="d-none d-md-inline">Add Post</span>
						</button>
					)}
				</div>
			</>
		);
	}
}

export default Home;
