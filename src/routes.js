import React from "react";
import { Switch } from "react-router-dom";
import Home from "./components/home";
import AddBeer from './components/add-beer';
import Login from './components/login';
import NotFound from './components/not-found';
import AppliedRoute from './components/applied-route';
import Beer from './components/beer';
import AuthenticatedRoute from "./components/authenticated-route";
import UnauthenticatedRoute from "./components/unauthenticated-route";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <UnauthenticatedRoute path='/login' exact component={Login} props={childProps} />
        <AuthenticatedRoute path='/beer/add' exact component={AddBeer} props={childProps} />
        <AuthenticatedRoute path='/beer/:id' exact component={Beer} props={childProps} />

        { /* Finally, catch all unmatched routes */}
        <AppliedRoute component={NotFound} />
    </Switch>;
