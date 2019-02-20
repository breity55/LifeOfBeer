import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

class AddBeer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beerName: '', beerStyle: '', beerBrewery: null, beerNotes: ''
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
                <h4>Add Beer</h4>
                <Form.Group as={Col} controlId="add-beer-brewery">
                    <Form.Label>Brewery</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="add-beer-name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="beerName"
                        value={this.state.beerName}
                        onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="add-beer-style">
                    <Form.Label>Style</Form.Label>
                    <Form.Control
                        type="text"
                        name="beerStyle"
                        value={this.state.beerStyle}
                        onChange={this.handleChange} />
                </Form.Group>

                <Form.Group controlId="add-brewery-notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows="3"
                        name="beerNotes"
                        value={this.state.beerNotes}
                        onChange={this.handleChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add
                </Button>
            </Form >
        );
    }
}

export default AddBeer;