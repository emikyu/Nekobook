import React from 'react';
import { Link } from 'react-router-dom';
import WallCommentIndexContainer from '../comments/wall_comment_index_container';

// const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class PostIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.startState = Object.assign({}, this.props.post);
        this.state = Object.assign({}, this.startState);

        this.ellipseIcon = React.createRef();
        this.ellipseDrop = React.createRef();

        this.modal = React.createRef();
        this.editText = React.createRef();

        this.unhideDropdown = this.unhideDropdown.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost() {
        this.props.deletePost(this.props.post.id);
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
        let month = parseInt(date[1])-1;
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
        if (hours === 0) hours = 12;
        if (hours < 10) hours = `0${hours}`;
        
        const minutes = militaryTime[1];
        const regularTime = `${hours}:${minutes} ${amPM}`;

        if (monthNow === month && dayNow === day) return `Today at ${regularTime}`;
        if (monthNow === month && dayNow === day + 1) return `Yesterday at ${regularTime}`;
        return `${month} ${day} at ${regularTime}`;
    }

    unhideDropdown(ref, icon) {
        return () => {
            // window.alert("clicked!");
            ref.current.classList.toggle("show-dropdown");
            icon.current.classList.toggle("selected");
        };
    }


    showModal() {
        this.modal.current.classList.add("show-modal");
        this.editText.current.focus();
        document.body.classList.add("modal-open");
    }

    closeModal() {
        this.modal.current.classList.remove("show-modal");
        document.body.classList.remove("modal-open");
    }

    handleChange(field) {
        return e => this.setState({[field]: e.target.value});
    }

    handleSave() {
        // e.preventDefault();
        this.props.updatePost(this.state);
        this.closeModal();
    }

    render() {
        const {post, poster, showNeko, currentUser, canEdit, updatePost, deletePost} = this.props;
        if (!this.props.post) return null;

        return (
            <div className="post-index-item">
                <div className="post-item-header">
                    <div className = "poster-profile-picture">
                        <Link to={`/nekos/${poster.id}`}>
                            {<img src={poster.profile_picture ? poster.profile_picture : window.nocatpicURL} alt={`${poster.fname} ${poster.lname}`} />}
                        </Link>
                    </div>
                    <div className = "post-item-information">
                        <div className = "poster-info">
                            <div className="poster-name">
                                <Link to={`/nekos/${poster.id}`}>{poster.fname} {poster.lname}</Link>
                                {  
                                    poster.id !== showNeko.id ? (
                                        <>
                                            <i className="fas fa-caret-right"></i>
                                            <Link to={`/nekos/${showNeko.id}`}>{showNeko.fname} {showNeko.lname}</Link>
                                        </>
                                    ) : ("")
                                }
                            </div>
                            {
                                canEdit ? (
                                    <>
                                    <div ref={this.ellipseIcon} className="poster-actions trigger trigger-icon" onClick={this.unhideDropdown(this.ellipseDrop, this.ellipseIcon)}>
                                        <i className="fas fa-ellipsis-h trigger trigger-icon"></i>
                                        <ul ref={this.ellipseDrop} className="ellipse-dropdown triggered-content">
                                            <li onClick={this.showModal.bind(this)} className="modal-trigger">
                                                Edit Post
                                            </li>
                                            <li onClick={this.deletePost}>
                                                Delete Post
                                            </li>
                                        </ul>
                                    </div>
                                    <div ref={this.modal} className="modal modal-trigger">
                                        <div className="modal-content modal-trigger">
                                            <div className="edit-post-header">
                                                <div>Edit Post</div>
                                                <div onClick={this.closeModal.bind(this)} className="close-button">&times;</div>
                                            </div>
                                            <div className="edit-post-input">
                                                <div className="edit-post-profile-picture">
                                                    <Link to={`/nekos/${poster.id}`}>
                                                        {<img src={poster.profile_picture ? poster.profile_picture : window.nocatpicURL} alt={`${poster.fname} ${poster.lname}`} />}
                                                    </Link>
                                                </div>
                                                <div>
                                                        <textarea className={`${this.state.body.length > 85 ? "small-post" : ""}`} onChange={this.handleChange("body")} ref={this.editText} defaultValue={this.state.body} onFocus={e => e.target.value = this.state.body}></textarea>
                                                </div>
                                            </div>
                                            <div className="edit-post-save">
                                                <button className="edit-post-save" onClick={this.handleSave.bind(this)}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                ) : currentUser.id === showNeko.id ? (
                                    <div ref={this.ellipseIcon} className="poster-actions trigger trigger-icon" onClick={this.unhideDropdown(this.ellipseDrop, this.ellipseIcon)}>
                                        <i className="fas fa-ellipsis-h trigger trigger-icon"></i>
                                        <ul ref={this.ellipseDrop} className="ellipse-dropdown triggered-content">
                                            <li onClick={this.deletePost}>
                                                Delete Post
                                            </li>
                                        </ul>
                                    </div>
                                ) :(<div></div>)
                            }
                        </div>
                        <div className = "post-item-timestamp">
                            {this.formatTime(post.created_at)}
                        </div>
                    </div>
                </div>
                <div className={`post-item-body ${post.body.length > 85 ? " small-post" : ""}`}>
                    {post.body}
                </div>
                <div className="comment-index-content">
                    <WallCommentIndexContainer postId={post.id}/>
                </div>
            </div>
        )
    }
}

export default PostIndexItem;