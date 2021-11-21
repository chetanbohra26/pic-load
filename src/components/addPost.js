import React from "react";

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            <div className="d-flex flex-grow-1 flex-shrink-1 flex-column justify-content-start align-items-center">
                <h4>Add a new Post</h4>
                <hr className="w-75" />
            </div>
        );
    }
}

export default AddPost;
