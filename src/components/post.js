import React from "react";

class Post extends React.Component {
	render() {
		return (
			<div className="m-4 mb-0 border border-dark rounded d-flex flex-column w-50 align-self-center">
				<h4 className="p-2">{this.props.post.title}</h4>
				<div className="d-flex justify-content-center bg-dark">
					<img
						src={this.props.post.postImage}
						alt=""
						className="mw-100"
					/>
				</div>
			</div>
		);
	}
}

export default Post;
