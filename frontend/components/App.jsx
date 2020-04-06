import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from './splash/splash';
import Navbar from './navbar/navbar';
import Newsfeed from './newsfeed/newsfeed';

const App = () => (
    <div>
        <AuthRoute exact path='/' component={Splash} />
        <ProtectedRoute path='/' component={Navbar} />
        <ProtectedRoute exact path='/newsfeed' component={Newsfeed} />
    </div>
);

export default App;