import React from 'react';
import { Link } from 'react-router-dom';

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

        this.modal = React.createRef();
        this.createPost = React.createRef();
        this.editText = React.createRef();
        this.modalContent = React.createRef();
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
        this.closeModal();
    }

    handleChange(field) {
        return e => this.setState({[field]: e.target.value});
    }


    showModal() {
        this.modal.current.classList.add("show-modal");
        this.createPost.current.classList.add("show-modal");
        this.modalContent.current.classList.add("show-modal");
        // this.editText.current.focus();
        // document.body.classList.add("modal-open");
    }

    closeModal() {
        this.modal.current.classList.remove("show-modal");
        this.createPost.current.classList.remove("show-modal");
        this.modalContent.current.classList.remove("show-modal");
        // document.body.classList.remove("modal-open");
    }



    render() {
        if (!this.props.canPost) return null;
        const {showNeko, currentUser} = this.props;

        return (

            <div className="create-form">
                <div ref={this.modalContent} className="modal-content">
                    <div className="edit-post-header">
                        <div><i className="fas fa-pen"></i>Create Post</div>
                        <div onClick={this.closeModal.bind(this)} className="close-button">&times;</div>
                    </div>
                    <div className="edit-post-input">
                        <div className="edit-post-profile-picture">
                            <Link to={`/nekos/${currentUser.id}`}>
                                {<img src={currentUser.profile_picture ? currentUser.profile_picture : window.nocatpicURL} alt={`${currentUser.fname} ${currentUser.lname}`} />}
                            </Link>
                        </div>
                        <div>
                            <textarea className={`${this.state.body.length > 85 ? "small-post" : ""}`} onChange={this.handleChange("body")} ref={this.editText} onClick={this.showModal.bind(this)} placeholder={showNeko.id !== currentUser.id ? `Nyon, write something to ${showNeko.fname}...` : "What's on your mind, nyon?"} value={this.state.body} onFocus={e => e.target.value = this.state.body}></textarea>
                        </div>
                    </div>
                    <div ref={this.createPost} className="create-post-save">
                        <button className="create-post-save" onClick={this.handleSubmit.bind(this)} disabled={this.state.body.length === 0}>Post</button>
                    </div>
                </div>
                <div ref={this.modal} className="modal"></div>
            </div>


        )
    }
}

export default PostForm;