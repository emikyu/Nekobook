import React from 'react';
import NewsfeedPostFormContainer from '../posts/newsfeed_post_form_container';
import NewsfeedPostIndexContainer from '../posts/newsfeed_post_index_container';
import { NavLink } from 'react-router-dom';


const Newsfeed = ({currentUser}) => {

    return (
        <section className="newsfeed">
            <section className="newsfeed-container">
                <section className="newsfeed-nav">
                    <NavLink to={`/nekos/${currentUser.id}`}>
                        <div className="newsfeed-to-navlink newsfeed-to-profile">
                            <div className="newsfeed-nav-picture nav-profile">
                                {<img src={currentUser.profile_picture ? currentUser.profile_picture : window.nocatpicURL} alt={`${currentUser.fname} ${currentUser.lname}`} />}
                            </div>
                            <div>
                                {currentUser.fname} {currentUser.lname}
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/newsfeed">
                        <div className="newsfeed-to-navlink newsfeed-to-newsfeed">
                            <div className="newsfeed-nav-picture">
                                {<img src={window.newsfeed} alt="News Feed" />}
                            </div>
                            <div>
                                News Feed
                            </div>
                        </div>
                    </NavLink>
                    <div className="newsfeed-nav-header">
                        Contact Me
                    </div>
                    <a href="https://github.com/emikyu">
                        <div className="newsfeed-to-navlink">
                            <div className="newsfeed-nav-picture">
                                {<img src={window.github} alt="Github" />}
                            </div>
                            <div>
                                Github
                            </div>
                        </div>
                    </a>
                    <a href="https://www.linkedin.com/in/huijiawu/">
                        <div className="newsfeed-to-navlink">
                            <div className="newsfeed-nav-picture">
                                {<img src={window.linkedin} alt="LinkedIn" />}
                            </div>
                            <div>
                                LinkedIn
                            </div>
                        </div>
                    </a>
                    <a href="https://angel.co/u/h-emily-wu">
                        <div className="newsfeed-to-navlink">
                            <div className="newsfeed-nav-picture">
                                {<img src={window.angellist} alt="AngelList" />}
                            </div>
                            <div>
                                AngelList
                            </div>
                        </div>
                    </a>

                </section> 
                <section className="newsfeed-content">
                    <NewsfeedPostFormContainer />
                    <NewsfeedPostIndexContainer />
                </section>
                <section className="newsfeed-side">
                    Nekobook © 2020
                </section>
            </section>
        </section>
    );
};

export default Newsfeed;