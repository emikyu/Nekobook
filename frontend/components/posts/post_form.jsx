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

        this.model = React.createRef();
        this.editText = React.createRef();
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

    // handleSave() {
    //     // e.preventDefault();
    //     this.props.updatePost(this.state);
    //     this.closeModal();
    // }

    closeModal() {
        this.modal.current.classList.remove("show-modal");
        document.body.classList.remove("modal-open");
    }

    render() {
        if (!this.props.canPost) return null;
        const {showNeko, currentUser} = this.props;
        return (

            <div ref={this.modal} className="create-form">
                <div className="modal-content">
                    <div className="edit-post-header">
                        <div>Create Post</div>
                        <div onClick={this.closeModal.bind(this)} className="close-button">&times;</div>
                    </div>
                    <div className="edit-post-input">
                        <div className="edit-post-profile-picture">
                            <Link to={`/nekos/${currentUser.id}`}>
                                {<img src={currentUser.profile_picture ? currentUser.profile_picture : window.nocatpicURL} alt={`${currentUser.fname} ${currentUser.lname}`} />}
                            </Link>
                        </div>
                        <div>
                            <textarea onChange={this.handleChange("body")} ref={this.editText} value={this.state.body} onFocus={e => e.target.value = this.state.body}>{this.state.body}</textarea>
                        </div>
                    </div>
                    <div className="create-post-save">
                        <button className="create-post-save" onClick={this.handleSubmit.bind(this)}>Post</button>
                    </div>
                </div>
            </div>

            // <div ref={this.modal} className="modal modal-trigger">
            //     <div className="modal-content modal-trigger">
            //         <div className="edit-post-header">
            //             <div>Create Post</div>
            //             <div onClick={this.closeModal.bind(this)} className="close-button">&times;</div>
            //         </div>
            //         <div className="edit-post-input">
            //             <div className="edit-post-profile-picture">
            //                 <Link to={`/nekos/${currentUser.id}`}>
            //                     {<img src={currentUser.profile_picture ? currentUser.profile_picture : window.nocatpicURL} alt={`${currentUser.fname} ${currentUser.lname}`} />}
            //                 </Link>
            //             </div>
            //             <div>
            //                 <textarea onChange={this.handleChange("body")} ref={this.editText} defaultValue={this.state.body} onFocus={e => e.target.value = this.state.body}></textarea>
            //             </div>
            //         </div>
            //         <div className="edit-post-save">
            //             <button className="edit-post-save" onClick={this.handleSave.bind(this)}>Post</button>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

export default PostForm;