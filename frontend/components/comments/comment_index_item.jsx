import React from 'react';
import { Link } from 'react-router-dom';
import CommentForm from './comment_form';

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            showEditForm: false,
            id: this.props.commentGroup.parent_comment.id,
            body: this.props.commentGroup.parent_comment.body
        };

        this.ellipseIcon = React.createRef();
        this.ellipseDrop = React.createRef();
    }

    formatTime(createdAt) {
        // Mon Apr 13 2020 19:20:19 GMT-0400 (Eastern Daylight Time)
        const timeNow = new Date().toString().split(" ");
        const yearNow = parseInt(timeNow[3]);
        const monthNow = timeNow[1];
        const dayNow = parseInt(timeNow[2]);

        // 2020-04-13T22:12:55.687Z
        const dateString = `${createdAt}`;
        const dateTime = dateString.toString().split("T");
        let date = dateTime[0].split("-");
        let month = parseInt(date[1]) - 1;
        let day = parseInt(date[2]);
        let year = parseInt(date[0]);
        let militaryTime = dateTime[1].split(":");

        let timeThen = new Date(Date.UTC(year, month, day, militaryTime[0], militaryTime[1]));
        timeThen = timeThen.toString().split(" ");
        year = parseInt(timeThen[3]);
        month = timeThen[1];
        day = parseInt(timeThen[2]);

        if (year < yearNow) return `${month} ${day}, ${year}`;

        militaryTime = timeThen[4].split(":");
        let hours = parseInt(militaryTime[0]);

        let amPM = "AM";
        if (hours > 12) {
            hours = hours - 12;
            amPM = "PM";
        }
        if (hours === 12) amPM = "PM";
        if (hours === 0) hours = 12;
        if (hours < 10) hours = `0${hours}`;

        const minutes = militaryTime[1];
        const regularTime = `${hours}:${minutes} ${amPM}`;

        if (monthNow === month && dayNow === day) return `Today at ${regularTime}`;
        if (monthNow === month && dayNow === day + 1) return `Yesterday at ${regularTime}`;
        return `${month} ${day} at ${regularTime}`;
    }


    showReplyForm() {
        // debugger
        this.setState({showForm: true});
        // debugger
    }

    toggleEditForm() {
        this.state.showEditForm ? this.setState({ showEditForm: false }) : this.setState({showEditForm: true});
        this.setState({ body: this.props.commentGroup.parent_comment.body });
        // debugger
    }


    deleteComment(commentId) {
        return e => this.props.deleteComment(commentId);
    }

    handleSubmit(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.props.updateComment(this.state);
            this.toggleEditForm()
        } else if (e.key === 'Escape') {
            e.preventDefault();
            this.toggleEditForm();
            this.setState({body: this.props.commentGroup.parent_comment.body});
        }
    }


    handleChange(field) {
        return e => this.setState({ [field]: e.target.value });
    }


    unhideDropdown(ref, icon) {
        return () => {
            // window.alert("clicked!");
            ref.current.classList.toggle("show-dropdown");
            icon.current.classList.toggle("selected");
        };
    }

    render() {
        const {canDelete, commentGroup, currentUser, updateComment, deleteComment, createComment, postId, canComment, isChild} = this.props;
        // debugger
        const {parent_comment, parent_commenter, child_comments, child_commenters} = commentGroup;

        return(
            <div className={`comment-index-item ${isChild ? "is-child" : "is-parent"} ${this.state.showForm ? "show-reply-form" : ""} ${this.state.showEditForm ? "show-edit-form" : ""}`}>
                <div className="comment-container">
                    <div className={`comment-body ${this.state.showEditForm ? "hide-comment" : ""}`}>
                        <div className="comment-profile-picture">
                            <Link to={`/nekos/${parent_commenter.id}`}>
                                {<img src={parent_commenter.profile_picture ? parent_commenter.profile_picture : window.nocatpicURL} alt={`${parent_commenter.fname} ${parent_commenter.lname}`} />}
                            </Link>
                        </div>
                        <div className="comment-text">
                            <Link to={`/nekos/${parent_commenter.id}`}>
                                {parent_commenter.fname} {parent_commenter.lname}
                            </Link>    
                            {parent_comment.body}
                            { currentUser.id === parent_commenter.id ? (
                            <div ref={this.ellipseIcon} className="poster-actions trigger trigger-icon" onClick={this.unhideDropdown(this.ellipseDrop, this.ellipseIcon)}>
                                <i className="fas fa-ellipsis-h trigger trigger-icon"></i>
                                <ul ref={this.ellipseDrop} className="ellipse-dropdown triggered-content">
                                    <li onClick={this.toggleEditForm.bind(this)}>
                                        Edit
                                    </li>
                                    <li onClick={this.deleteComment(parent_comment.id)}>
                                        Delete
                                    </li>
                                </ul>
                            </div>
                            ) : ( canDelete ? (
                                <div ref={this.ellipseIcon} className="poster-actions trigger trigger-icon" onClick={this.unhideDropdown(this.ellipseDrop, this.ellipseIcon)}>
                                    <i className="fas fa-ellipsis-h trigger trigger-icon"></i>
                                    <ul ref={this.ellipseDrop} className="ellipse-dropdown triggered-content">
                                        <li onClick={this.deleteComment(parent_comment.id)}>
                                            Delete
                                        </li>
                                    </ul>
                                </div>
                            ) : (""))
                            }
                        </div>
                    </div>
                    <div className={`comment-actions ${this.state.showEditForm ? "hide-comment" : ""}`}>
                        {
                            canComment? (
                                isChild ? (<a onClick={this.props.showReplyForm}>Reply</a>) : (<a onClick={this.showReplyForm.bind(this)}>Reply</a>)
                            ) : ("")
                        
                        }
                        { canComment? (<span className="comment-dot"> - </span>) : ("")}
                        {this.formatTime(parent_comment.created_at)}
                    </div>
                    <div className={`edit-form ${this.state.showEditForm ? "show-edit-form" : ""}`}>
                            <div className="edit-form-profile-picture">
                                {<img src={currentUser.profile_picture ? currentUser.profile_picture : window.nocatpicURL} alt={`${currentUser.fname} ${currentUser.lname}`} />}
                            </div>
                            <div className="edit-form-input">
                                <div>
                                    <textarea onKeyDown={this.handleSubmit.bind(this)} value={this.state.body} onChange={this.handleChange("body")}></textarea>
                                </div>
                                <div className="escape-cancel">Press escape to <a onClick={this.toggleEditForm.bind(this)}>cancel</a>
                                </div>
                            </div>
                    </div>
                </div>
                {
                    child_comments.length > 0 ? (
                        <div className="comment-subindex">
                            <div className="comment-subitems">
                                <ul>
                                    {
                                        child_comments.map((comment, idx) => (

                                            <li key={comment.id}>
                                                <CommentIndexItem
                                                    commentGroup={{parent_comment: comment, parent_commenter: child_commenters[idx], child_comments: [], child_commenters: []}}
                                                    currentUser={currentUser}
                                                    postId={postId}
                                                    isChild={true}
                                                    canComment={canComment}
                                                    updateComment={updateComment}
                                                    deleteComment={deleteComment}
                                                    createComment={createComment}
                                                    showReplyForm={this.showReplyForm.bind(this)}
                                                    canDelete={canDelete}
                                                    // comment={comment}
                                                />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className={`reply-form ${this.state.showForm ? "show-reply-form" : ""}`}>
                                <CommentForm
                                    currentUser={currentUser}
                                    canComment={canComment}
                                    postId={postId}
                                    parentId={parent_comment.id}
                                    updateComment={updateComment}
                                    deleteComment={deleteComment}
                                    createComment={createComment}
                                    placeholder="Write a reply... (press enter to post)"/>
                            </div>
                        </div>
                    ) : (
                        isChild ? ("") : (
                            <div className={`reply-form ${this.state.showForm ? "show-reply-form" : ""}`}>
                                <CommentForm
                                    currentUser={currentUser}
                                    canComment={canComment}
                                    postId={postId}
                                    parentId={parent_comment.id}
                                    updateComment={updateComment}
                                    deleteComment={deleteComment}
                                    createComment={createComment}
                                    placeholder="Write a reply... (press enter to post)" />
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}

export default CommentIndexItem;