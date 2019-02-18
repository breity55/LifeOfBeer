import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class AddBrewery extends Component {
    render() {
        return (
            <Form className="add-brewery">
                <h4>Add A Brewery</h4>
                <Form.Group controlId="add-brewery-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Brewery Name" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="add-brewery-city">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="add-brewery-state">
                        <Form.Label>State/Country</Form.Label>
                        <Form.Control as="select">
                            <option>Wisconsin</option>
                            <option>Ireland</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default AddBrewery;