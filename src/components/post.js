import React from "react";
import moment from "moment";
function Post({ post }) {
	console.log(post);
	const ago = moment(post.createdAt).fromNow();

	return (
		<div className="card mb-4 border d-flex flex-column w-50 align-self-center">
			<div className="card-header">
				<div className="d-flex align-items-center flex-grow-1 flex-shrink-1 justify-content-between">
					<div className="d-flex flex-row align-items-center flex-grow-1 flex-shrink-1">
						<div className="p-4 me-2 rounded-circle bg-dark" />
						<h3 className="p-0 m-0">{post.author}</h3>
					</div>
					<span>{ago}</span>
				</div>
				<p className="p-0 m-0 fs-5">{post.title}</p>
			</div>
			<div className="d-flex justify-content-center bg-dark">
				<img src={post.postImage} alt="" className="mw-100" />
			</div>
		</div>
	);
}

export default Post;
