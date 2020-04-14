import React from 'react';
// import { Link } from 'react-router-dom';
import PostIndexItem from './post_index_item';

class PostIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // debugger
        this.props.requestPosts(this.props.nekoId);
    }

    componentDidUpdate(prevProps) {
        if (this.props.nekoId !== prevProps.nekoId) {
            this.props.requestPosts(this.props.nekoId);
        }
        // if (this.props.posts.length !== prevProps.posts.length) {
        //     this.props.requestPosts(this.props.nekoId);
        // }
    }

    render() {
        // debugger
        if (!this.props.neko || !this.props.posts || this.props.posts.some(post => !post) 
        || !this.props.posters || this.props.posters.some(poster => !poster)) return null;

        const { posts, posters } = this.props;

        return (
            <div className="post-index">
                <div className="post-index-header">
                    Posts
                </div>
                <div className="post-index-content">
                    <ul>
                        {
                            posts.map((post, idx) => (
                                <li key={post.id}>
                                    {/* * <Link to={`/nekos/${posters[idx].id}`}>{posters[idx].fname}</Link>: "{post.body}" */}
                                    <PostIndexItem 
                                        post={post}
                                        poster={posters[idx]}
                                        showNeko={this.props.neko} 
                                        currentUser={this.props.currentUser} 
                                        canEdit={this.props.currentUser.id === posters[idx].id}
                                        updatePost={this.props.updatePost}
                                        deletePost={this.props.deletePost}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )

    }
}

export default PostIndex;