import React, { Component } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchQuery: ''
        };
    }

    handleSearchChange = (event) => {
        this.setState({
            searchQuery: event.target.value
        });
    }

    onSearchSubmit = () => {
        this.props.history.push(`/beer/search/${this.state.searchQuery}`)
    }

    render() {
        const {
            isAuthenticated,
        } = this.props;

        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                {
                    isAuthenticated ?
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Form inline onSubmit={this.onSearchSubmit}>
                                <Form.Control type="text" placeholder="Search" className="mr-sm-2" value={this.state.searchQuery} onChange={this.handleSearchChange} />
                                <Button variant="outline-info" type="submit">Search</Button>
                            </Form>
                            <Nav className="nav">
                                <Nav.Link href="/beer/add">Add A Beer</Nav.Link>
                                <Nav.Link href="/beer/add/flight">Add A Flight</Nav.Link>
                                <Nav.Link href="/beer/approved">My Approved Beers</Nav.Link>
                                <Nav.Link href="/beer/favorite">My Favorite Beers</Nav.Link>
                                <Nav.Link href="/beer">My Beers</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        :
                        <Nav className="nav">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav>
                }

                <Navbar.Brand href="/">Life of Beer</Navbar.Brand>
            </Navbar>
        );
    }
}

export default withRouter(Header)
