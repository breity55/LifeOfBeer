import React, { Component } from 'react';
import { Form, Col } from 'react-bootstrap';
import LoaderButton from '../loader-button';
import { API } from "aws-amplify";

class AddBeer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breweryName: '', breweryLocation: '', beerName: '', beerStyle: '', beerNotes: '',
            approvedIndicator: "false", favoriteIndicator: "false", isLoading: false
        };
    }

    handleChange = (event, fieldName = null) => {
        let name = (fieldName) ? fieldName : event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        if (this.isFieldNull(this.state.breweryName)) {
            alert("Please enter a Brewery!");
            return;
        }
        else if (this.isFieldNull(this.state.breweryLocation)) {
            alert("Please enter a Brewery Location!");
            return;
        }
        else if (this.isFieldNull(this.state.beerName)) {
            alert("Please enter a Name!");
            return;
        }
        else if (this.isFieldNull(this.state.beerStyle)) {
            alert("Please enter a Style!");
            return;
        }

        this.setState({ isLoading: true });

        try {
            await this.addBeer({
                breweryName: this.state.breweryName,
                breweryLocation: this.state.breweryLocation,
                beerName: this.state.beerName,
                beerStyle: this.state.beerStyle,
                beerNotes: this.state.beerNotes,
                approvedIndicator: (this.state.approvedIndicator === "true"),
                favoriteIndicator: (this.state.favoriteIndicator === "true")
            });
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    isFieldNull = value => (value === null || value.trim() === '');

    addBeer(beer) {
        return API.post("Beer", "", {
            body: beer
        });
    }

    render() {
        return (
            <Form className="add-brewery" onSubmit={this.handleSubmit}>
                <h4>Add Beer</h4>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="add-beer-brewery">
                        <Form.Label>Brewery</Form.Label>
                        <Form.Control
                            type="text"
                            name="breweryName"
                            value={this.state.breweryName}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="add-beer-brewery-location">
                        <Form.Label>Brewery Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="breweryLocation"
                            value={this.state.breweryLocation}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="add-beer-name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="beerName"
                            value={this.state.beerName}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="add-beer-style">
                        <Form.Label>Style</Form.Label>
                        <Form.Control
                            type="text"
                            name="beerStyle"
                            value={this.state.beerStyle}
                            onChange={this.handleChange} />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="add-brewery-notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows="3"
                        name="beerNotes"
                        value={this.state.beerNotes}
                        onChange={this.handleChange} />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} md="3" controlId="add-brewery-approved-indicator">
                        <Form.Label>Approved?</Form.Label>
                        <div>
                            <Form.Check type="radio" inline label="True" checked={this.state.approvedIndicator === "true"} value={"true"} onChange={(e) => this.handleChange(e, "approvedIndicator")} />
                            <Form.Check type="radio" inline label="False" checked={this.state.approvedIndicator === "false"} value={"false"} onChange={(e) => this.handleChange(e, "approvedIndicator")} />
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId="add-brewery-favorite-indicator">
                        <Form.Label>Favorite?</Form.Label>
                        <div>
                            <Form.Check type="radio" inline label="True" checked={this.state.favoriteIndicator === "true"} value={"true"} onChange={(e) => this.handleChange(e, "favoriteIndicator")} />
                            <Form.Check type="radio" inline label="False" checked={this.state.favoriteIndicator === "false"} value={"false"} onChange={(e) => this.handleChange(e, "favoriteIndicator")} />
                        </div>
                    </Form.Group>
                </Form.Row>
                <LoaderButton
                    block
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Add"
                    loadingText="Adding…"
                />
            </Form >
        );
    }
}

export default AddBeer;