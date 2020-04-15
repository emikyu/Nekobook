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
        if (e.key === 'Enter') {
            e.preventDefault();
            this.props.createComment(this.state);
            this.setState({
                post_id: this.props.postId,
                author_id: this.props.currentUser.id,
                parent_id: this.props.parentId,
                body: ""
            });
        }
    }

    handleChange(field) {
        return e => this.setState({ [field]: e.target.value });
    }


    render() {
        if (!this.props.canComment) return null;
        const { post, currentUser } = this.props;
        return (
            <>
                <div className="cr-form-profile-picture">
                    {<img src={currentUser.profile_picture ? currentUser.profile_picture : window.nocatpicURL} alt={`${currentUser.fname} ${currentUser.lname}`} />}
                </div>
                <div className="cr-form-input">
                    <textarea onKeyDown={this.handleSubmit} value={this.state.body} onChange={this.handleChange("body")} placeholder={this.props.placeholder}></textarea>
                </div>
                {/* <button onClick={this.handleSubmit}>Post!</button> */}
            </>
        )
    }
}

export default CommentForm;