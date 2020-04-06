import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Splash from './splash/splash';
import Newsfeed from './newsfeed/newsfeed';

const App = () => (
    <div>
        <h1>Nekobook App Component Nyaa~</h1>
        <AuthRoute exact path='/' component={Splash} />
        <ProtectedRoute exact path='/newsfeed' component={Newsfeed} />
    </div>
);

export default App;