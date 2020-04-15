import React from 'react';
import NewsfeedPostFormContainer from '../posts/newsfeed_post_form_container';
import NewsfeedPostIndexContainer from '../posts/newsfeed_post_index_container';


const Newsfeed = () => (
    <section className="newsfeed">
        <section className="newsfeed-container">
            <nav className="newsfeed-nav">
                Hello from the newsfeed nav menu!
            </nav>
            <section className="newsfeed-content">
                <NewsfeedPostFormContainer />
                <NewsfeedPostIndexContainer />
            </section>
            <section className="newsfeed-side">
                Hello from the newsfeed side panel :D
            </section>
        </section>
    </section>
);

export default Newsfeed;