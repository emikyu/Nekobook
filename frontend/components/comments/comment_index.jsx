import React from 'react';
import CommentIndexItem from './comment_index_item';
import CommentForm from './comment_form';

class CommentIndex extends React.Component {
    componentDidMount() {
        this.props.requestComments(this.props.postId);
    }


    genTree(comments, commenters) {
        const nestedComments = {};

        comments.forEach((comment, idx) => {
            if (!comment.parent_id) {
                nestedComments[comment.id] = { parent_comment:comment, parent_commenter: commenters[idx], child_comments: [], child_commenters: [] };
            } else {
                const parent = nestedComments[comment.parent_id];
                parent.child_comments.push(comment);
                parent.child_commenters.push(commenters[idx]);
            }
        });

        return Object.values(nestedComments).sort((a, b) => {
            const dateA = new Date(a.parent_comment.created_at);
            const dateB = new Date(b.parent_comment.created_at);
            return dateA < dateB ? -1 : 1;
        });
    }

    render () {
        const { showNeko, currentUser, post, canComment, comments, commenters, nekos, updateComment, deleteComment, createComment} = this.props;
        if (!this.props.comments || this.props.comments.some(comment => !comment) || !this.props.commenters || this.props.commenters.some(commenter => !commenter) ) return null;

        // debugger

        const nestedComments = this.genTree(comments, commenters);

        // console.log(nestedComments);

        return (
            <>
                <div className="comment-items">
                    <ul>
                        {
                            nestedComments.map((commentGroup, idx) => (
                                <li key={commentGroup.parent_comment.id}>
                                    <CommentIndexItem
                                        commentGroup={commentGroup}
                                        currentUser={currentUser}
                                        // canEdit={this.props.currentUser.id === commenters[idx].id}
                                        postId={post.id}
                                        canComment={canComment}
                                        updateComment={updateComment}
                                        deleteComment={deleteComment}
                                        createComment={createComment}
                                        canDelete={currentUser.id === showNeko.id}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className="comment-form">
                    <CommentForm
                        currentUser={currentUser}
                        canComment={canComment}
                        postId={post.id}
                        updateComment={updateComment}
                        deleteComment={deleteComment}
                        createComment={createComment}
                        placeholder={"Write a comment... (press enter to post)"}
                    />
                </div>
            </>
        );
    }

}

export default CommentIndex;