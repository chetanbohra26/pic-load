import React from "react";
import moment from "moment";
function Post({ post }) {
	console.log(post);
	const ago = moment(post.createdAt).fromNow();

	return (
		<div className="card mb-4 border d-flex flex-column shadow">
			<div className="card-header p-2">
				<div className="d-flex flex-row align-items-center">
					<div className="p-4 me-2 rounded-circle bg-dark" />
					<h3 className="p-0 m-0">{post.author}</h3>
				</div>

				<p className="p-0 m-0 fs-5 lh-1">{post.title}</p>
				<span className="fs-6 text-secondary">{ago}</span>
			</div>
			<div className="d-flex justify-content-center bg-dark">
				<img src={post.postImage} alt="" className="mw-100" />
			</div>
		</div>
	);
}

export default Post;
