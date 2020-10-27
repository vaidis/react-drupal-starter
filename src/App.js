import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './header/Header'
import UserLogin from './user/UserLogin'
import UserProfile from './user/UserProfile'
import Articles from './articles/Articles'
import Article from './article/Article'
import ArticlePost from './article/ArticlePost'


function App() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route path="/user/login" component={UserLogin} />
                <Route path="/user/profile" component={UserProfile} />
                <Route path="/article/create" component={ArticlePost} />
                <Route path="/article/:path" component={Article} />
                <Route exact path="/:path?" component={Articles} />
            </Switch>
        </div>
    );
}

export default App;
