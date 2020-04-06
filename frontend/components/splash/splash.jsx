import React from 'react';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';

const Splash = () => (
    <div>
        <header className="splash-header">
            <div className="splash-header-content">
                <div className="splash-logo">
                    nekobook
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
                        <li><b>See photos and updates</b> from neko friends in News Feed.</li>
                        <li><b>Share what's new</b> in your neko life on your Timeline.</li>
                        <li><b>Find more</b> of what you're looking for with Nekobook Search.</li>
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