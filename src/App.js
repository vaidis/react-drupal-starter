import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './header/Header'
import UserLogin from './user/UserLogin'
import UserRegister from './user/UserRegister'
import UserProfile from './user/UserProfile'
import Contact from './contact/Contact'
import Articles from './articles/Articles'
import Article from './article/Article'
// import Term from './term/Term'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/:path?"><Articles /></Route>
                <Route path="/article/:path "><Article /></Route>
                <Route path="/user/login"><UserLogin /></Route>
                <Route path="/user/register"><UserRegister /></Route>
                <Route path="/user/profile"><UserProfile /></Route>
                <Route path="/contact"><Contact /></Route>
            </Switch>
        </div>
    );
}

export default App;
