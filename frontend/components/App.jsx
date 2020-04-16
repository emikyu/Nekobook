import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from './splash/splash';
import Navbar from './navbar/navbar';
import NewsfeedContainer from './newsfeed/newsfeed_container';
// import Newsfeed from './newsfeed/newsfeed'
import ProfileContainer from './profile/profile_container';

const App = () => (
    <div>
        <AuthRoute exact path='/' component={Splash} />
        <ProtectedRoute path='/' component={Navbar} />
        <ProtectedRoute exact path='/newsfeed' component={NewsfeedContainer} />
        <ProtectedRoute path='/nekos/:nekoId' component={ProfileContainer} />
    </div>
);

export default App;