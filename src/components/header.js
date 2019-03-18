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
                    <Nav className="nav">
                        {
                            isAuthenticated
                                ? <Nav.Link href="/beer/add">Add Beer</Nav.Link>
                                : <Nav.Link href="/login">Login</Nav.Link>
                        }

                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form> */}
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="/">Life of Beer</Navbar.Brand>
            </Navbar>
        );
    }
}