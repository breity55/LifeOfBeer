import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }
    }

    renderUnauthorizedLander() {
        return (
            <div><Link to="/login">Login</Link></div>
        );
    }

    renderAuthorizedLander() {
        return (
            <div>
                <p><Link to="/beer/add">Add A Beer</Link></p>
                <p><Link to="/beer/add/flight">Add A Flight</Link></p>
                <p><Link to="/beer/approved">My Approved Beers</Link></p>
                <p><Link to="/beer/favorite">My Favorite Beers</Link></p>
                <p><Link to="/beer">My Beers</Link></p>
            </div>
        );
    }

    render() {
        return (
            <div className="home">
                <div className="lander">
                    <h1>Life of Beer</h1>
                    <p>A simple way to record your life of beer.</p>
                    {this.props.isAuthenticated ? this.renderAuthorizedLander() : this.renderUnauthorizedLander()}
                </div>
            </div>
        );
    }
}
