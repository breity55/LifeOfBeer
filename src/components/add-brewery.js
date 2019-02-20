import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class AddBrewery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', city: '', state: 'Wisconsin', country: 'United States'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render() {
        return (
            <Form className="add-brewery">
                <h4>Add Brewery</h4>
                <Form.Group controlId="add-brewery-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="6" controlId="add-brewery-city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="add-brewery-state">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={this.state.state}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="add-brewery-country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form >
        );
    }
}

export default AddBrewery;