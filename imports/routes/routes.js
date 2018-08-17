import { Meteor } from 'meteor/meteor';
import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import createBrowserHistory from 'history/createBrowserHistory';
import createHistory from "history/createBrowserHistory";
import { Tracker } from 'meteor/tracker';
import { Redirect } from 'react-router'

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import { Links } from '../api/links';

window.createBrowserHistory = createBrowserHistory;

const history = createHistory(); 
const location = history.location;

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = (component) => {
  if(Meteor.userId()) {
    history.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    history.replace('/');
  }
};
export const onAuthChange = (isAuthenticated) => {
    const pathName = location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);

    if(isUnauthenticatedPage && isAuthenticated){
        history.replace('/links');
    }else if(!isAuthenticated && isAuthenticatedPage){
        history.replace('/');
    }
};

export const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} onEnter={onEnterPublicPage}/>
      <Route exact path="/signup" component={Signup}/>
      <Route exact path="/links" component={Link} onEnter={onEnterPrivatePage}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);