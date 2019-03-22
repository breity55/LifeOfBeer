import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap'

export default class Header extends Component {
    render() {
        const {
            isAuthenticated,
        } = this.props;

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    {
                        isAuthenticated ?
                            <Nav className="nav">
                                <Nav.Link href="/beer/add">Add Beer</Nav.Link>
                                <Nav.Link href="/beer/approved">My Approved Beers</Nav.Link>
                                <Nav.Link href="/beer/favorite">My Favorite Beers</Nav.Link>
                                <Nav.Link href="/beer">My Beers</Nav.Link>
                            </Nav>
                            :
                            <Nav className="nav">
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav>
                    }
                </Navbar.Collapse>
                <Navbar.Brand href="/">Life of Beer</Navbar.Brand>
            </Navbar>
        );
    }
}