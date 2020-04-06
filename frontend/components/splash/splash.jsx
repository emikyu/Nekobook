import React from 'react';
import LoginFormContainer from './login_form_container';

const Splash = () => (
    <div>
        <h2>Nekobook Splash Component Nyon~~</h2>
        <header className="splash-header">
            <div className="splash-logo">
                Nekobook
            </div>
            <div className="splash-login-form">
                <LoginFormContainer />
            </div>
        </header>
    </div>
);

export default Splash;