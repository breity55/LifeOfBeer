import React from "react";
import { Switch } from "react-router-dom";
import Home from "./components/home";
import Login from './components/login';
import NotFound from './components/not-found';
import AppliedRoute from './components/applied-route';
import AuthenticatedRoute from "./components/authenticated-route";
import UnauthenticatedRoute from "./components/unauthenticated-route";

import AddBeer from './components/beer/add-beer';
import Beer from './components/beer/beer';
import AllBeers from './components/beer/all-beers';
import ApprovedBeers from './components/beer/approved-beers';
import FavoriteBeers from './components/beer/favorite-beers';
import SearchBeers from './components/beer/search-beers';
// import ResetPassword from './components/reset-password';

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <UnauthenticatedRoute path='/login' exact component={Login} props={childProps} />
        {/* <UnauthenticatedRoute path='/login/reset' exact component={ResetPassword} props={childProps} /> */}
        <AuthenticatedRoute path='/beer/add' exact component={AddBeer} props={childProps} />
        <AuthenticatedRoute path='/beer/approved' exact component={ApprovedBeers} props={childProps} />
        <AuthenticatedRoute path='/beer/favorite' exact component={FavoriteBeers} props={childProps} />
        <AuthenticatedRoute path='/beer/search/:searchQuery' exact component={SearchBeers} props={childProps} />
        <AuthenticatedRoute path='/beer/:id' exact component={Beer} props={childProps} />
        <AuthenticatedRoute path='/beer/' exact component={AllBeers} props={childProps} />

        { /* Finally, catch all unmatched routes */}
        <AppliedRoute component={NotFound} />
    </Switch>;
