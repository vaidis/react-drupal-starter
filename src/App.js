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
            {/* <Header /> */}
            {/* <Switch>
                <Route exact path="/:path?" component={Articles} />
                <Route exact path="/articles:query?" component={Articles} />
                <Route path="/article/:path" component={Article} />
                <Route path="/user/login" component={UserLogin} />
                <Route path="/user/register" component={UserRegister} />
                <Route path="/user/profile" component={UserProfile} />
                <Route path="/contact" component={Contact} />
            </Switch> */}
        </div>
    );
}

export default App;
