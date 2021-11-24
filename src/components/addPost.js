import axios from "axios";
import React from "react";

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
            <div className="d-flex flex-grow-1 flex-shrink-1 flex-column justify-content-start align-items-center">
                <h4>Add a new Post</h4>
                <hr className="w-75" />
                <form onSubmit={this.createPost}>
                    <div className="mb-3">
                        <label htmlFor="post-title" className="form-label">
                            Post title
                        </label>
                        <input
                            type="text"
                            id="post-title"
                            name="title"
                            className="form-control"
                            placeholder="Enter title for the post"
                            required
                            value={post.title}
                            onChange={this.handleTitleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="file"
                            name="postImage"
                            className="form-control"
                            placeholder="Select an image for post"
                            onChange={this.handleImageChange}
                            accept="image/*"
                            required
                        />
                    </div>
                    <img src={post.postImage} alt="" />
                    <button>Post</button>
                </form>
            </div>
        );
    }
}

export default AddPost;
