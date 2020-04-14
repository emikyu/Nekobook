import React from 'react';

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.startState = {
            wall_id: this.props.showNeko.id,
            author_id: this.props.currentUser.id,
            body: ""
        };
        this.state = Object.assign({}, this.startState);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.showNeko.id !== prevProps.showNeko.id) {
            // debugger
            this.setState({wall_id: this.props.showNeko.id});
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        // debugger
        this.props.createPost(this.state);
        this.props.requestNeko(this.props.showNeko.id);
        this.setState({
            wall_id: this.props.showNeko.id,
            author_id: this.props.currentUser.id,
            body: ""
        });
    }

    handleChange(field) {
        return e => this.setState({[field]: e.target.value});
    }

    render() {
        if (!this.props.canPost) return null;
        const {showNeko, currentUser} = this.props;
        return (
            <div className="post-form">
                <div className="post-form-header">Create Post</div>
                <div className="post-form-body">
                    <form onSubmit={this.handleSubmit}>
                        <textarea onChange={this.handleChange("body")} placeholder={showNeko.id !== currentUser.id ? `Nyon, write something to ${showNeko.fname}...` : "What's on your mind, nyon?"} value={this.state.body}></textarea>
                        <br/>
                        <button>Post</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default PostForm;