import React from 'react';
import { Link } from 'react-router-dom';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        // debugger
        this.startState = {
            post_id: this.props.postId,
            author_id: this.props.currentUser.id,
            parent_id: this.props.parentId,
            body: ""
        };
        this.state = Object.assign({}, this.startState);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.showNeko.id !== prevProps.showNeko.id) {
    //         // debugger
    //         this.setState({ wall_id: this.props.showNeko.id });
    //     }
    // }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createComment(this.state);
        this.setState({
            post_id: this.props.postId,
            author_id: this.props.currentUser.id,
            body: ""
        });
    }

    handleChange(field) {
        return e => this.setState({ [field]: e.target.value });
    }


    render() {
        if (!this.props.canComment) return null;
        const { post, currentUser } = this.props;
        return (
            <>
                {currentUser.fname} {currentUser.lname}
                <input type="text" value={this.state.body} onChange={this.handleChange("body")} placeholder={this.props.placeholder}/>
                <button onClick={this.handleSubmit}>Post!</button>
            </>
        )
    }
}

export default CommentForm;