import React from 'react';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import { Link } from 'react-router-dom';

const Splash = () => (
    <div>
        <header className="splash-header">
            <div className="splash-header-content">
                <div className="splash-logo">
                    <Link to='/'>nekobook</Link>
                </div>
                <div className="splash-login-form">
                    <LoginFormContainer />
                </div>
            </div>
        </header>
        <section className="splash-body">
            <section className="splash-body-content">
                <section className="splash-body-description">
                    <h2>Connect with neko friends and the world around you on Nekobook.</h2>
                    <ul>
                        <li>
                            <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                            <p><b>See photos and updates</b> from neko friends in News Feed.</p>
                        </li>
                        <li>
                            <i className="fa fa-share-square-o" aria-hidden="true"></i>
                            <p><b>Share what's new</b> in your neko life on your Timeline.</p>
                        </li>
                        <li>
                            <i className="fa fa-search" aria-hidden="true"></i>
                            <p><b>Find more</b> of what you're looking for with Nekobook Search.</p>
                        </li>
                    </ul>
                </section>
                <section className="splash-body-signup-form">
                    <SignupFormContainer />
                </section>
            </section>
        </section>
    </div>
);

export default Splash;