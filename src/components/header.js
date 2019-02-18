import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="nav">
                        <NavDropdown title="Beer" id="collasible-nav-dropdown">
                            <NavDropdown.Item><Link to="/Beer/Favorites">Favorites</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/Beer">Beers</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/Beer/Add">Add Beer</Link></NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Brewery" id="collasible-nav-dropdown">
                            <NavDropdown.Item><Link to="/Brewery">Breweries</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/Brewery/Add">Add Brewery</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><Link to="/Tour">Tours</Link></NavDropdown.Item>
                            <NavDropdown.Item><Link to="/Tour/Add">Add Tour</Link></NavDropdown.Item>
                        </NavDropdown>

                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="/">My Beer Life</Navbar.Brand>
            </Navbar>
        );
    }
}