import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home/Home';
import Signup from './containers/Users/Signup/Signup';
import Login from './containers/Users/Login/Login';
import JobDetail from './containers/Job/JobDetail/JobDetail';
import AddJob from './containers/Job/AddJob/AddJob';
import EditJob from './containers/Job/EditJob/EditJob';
import AddQuotation from './containers/Job/AddQuotation/AddQuotation';
import NavigationBar from './containers/NavigationBar/NavigationBar';
import FullArticle from './containers/Articles/FullArticle/FullArticle'

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <NavigationBar />
                <Switch>
                    <Route exact path="/job/add" component={AddJob} />
                    <Route path="/job/edit/:id" component={EditJob} />
                    <Route path="/quote/add/:id" component={AddQuotation} />
                    <Route path="/job/:id" component={JobDetail} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}

export default App;
