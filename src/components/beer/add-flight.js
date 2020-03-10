import React, { Component } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import LoaderButton from '../loader-button';
import { API } from "aws-amplify";
export default class AddFlight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flightBrewery: '', flightBreweryLocation: '', isLoading: false, hideFlightBeerSection: true, hideFlightBrewerySection: false, hideFlightButtonPane: true,
            beers: []
        };
    }

    handleBreweryChange = (event, fieldName = null) => {
        let name = (fieldName) ? fieldName : event.target.name;
        this.setState({
            [name]: event.target.value
        });
    };

    isFieldNull = value => (value === null || value.trim() === '');

    handleOnBreweryNext = () => {
        if (this.isFieldNull(this.state.flightBrewery)) {
            alert("A brewery name is required.");
            return;
        }
        else if (this.isFieldNull(this.state.flightBreweryLocation)) {
            alert("A brewery location is required.");
            return;
        }

        this.setState({ hideFlightBeerSection: false, hideFlightBrewerySection: true, hideFlightButtonPane: false });
        this.handleAddBeer();
    };

    handleBeerChange = (index, event, fieldName = null) => {
        const newBeers = this.state.beers.map((beer, stateIndex) => {
            if (index !== stateIndex) return beer;
            let name = (fieldName) ? fieldName : event.target.name;
            return { ...beer, [name]: event.target.value };
        });

        this.setState({ beers: newBeers });
    };

    handleSubmit = async evt => {
        evt.preventDefault();

        this.state.beers.forEach((beer, index) => {
            if (this.isFieldNull(beer.breweryName)) {
                this.handleRemoveBeer(index);
            }
            else if (this.isFieldNull(beer.breweryLocation)) {
                this.handleRemoveBeer(index);
            }
            else if (this.isFieldNull(beer.beerName)) {
                this.handleRemoveBeer(index);
            }
            else if (this.isFieldNull(beer.beerStyle)) {
                this.handleRemoveBeer(index);
            }
        });

        this.setState({ isLoading: true });

        try {
            await API.post("Beer", "/Flight", {
                body: this.state.beers
            });
            this.props.history.push(`/Beer/Search/${this.state.flightBrewery}`);
        } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    };

    handleAddBeer = () => {
        this.setState({
            beers: this.state.beers.concat([
                {
                    breweryName: this.state.flightBrewery, breweryLocation: this.state.flightBreweryLocation,
                    beerName: '', beerStyle: '', beerNotes: '  ', approvedIndicator: "false", favoriteIndicator: "false"
                }])
        });
    };

    handleRemoveBeer = index => () => {
        this.setState({
            beers: this.state.beers.filter((s, stateIndex) => index !== stateIndex)
        });
    };

    render() {
        return (
            <Form className="add-flight" onSubmit={this.handleSubmit}>
                <h4>Add {this.state.flightBrewery} Flight</h4>
                <div className="flight-brewery-section" hidden={this.state.hideFlightBrewerySection}>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="add-flight-brewery">
                            <Form.Label>Brewery</Form.Label>
                            <Form.Control type="text" name="flightBrewery" value={this.state.flightBrewery} onChange={(e) => this.handleBreweryChange(e)} />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="add-flight-brewery-location">
                            <Form.Label>Brewery Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="flightBreweryLocation"
                                value={this.state.flightBreweryLocation}
                                onChange={(e) => this.handleBreweryChange(e)} />
                        </Form.Group>
                        <Button variant="info" size="md" block onClick={this.handleOnBreweryNext}>Next</Button>
                    </Form.Row>
                </div>
                {(this.state.beers.length === 0)
                    ?
                    <div className="flight-beer-section" hidden={this.state.hideFlightBeerSection}>
                        <Button variant="info" size="md" block onClick={this.handleAddBeer} hidden={this.state.hideFlightBeerSection}>
                            Add Another
                        </Button>
                    </div>
                    : this.state.beers.map((beer, index) => {
                        return (
                            <div className="flight-beer-section" hidden={this.state.hideFlightBeerSection}>
                                <Form.Row>
                                    <Form.Group as={Col} md="3" controlId="add-beer-name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="beerName" value={beer.beerName} onChange={(e) => this.handleBeerChange(index, e)} />
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="add-beer-style">
                                        <Form.Label>Style</Form.Label>
                                        <Form.Control type="text" name="beerStyle" value={beer.beerStyle} onChange={(e) => this.handleBeerChange(index, e)} />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="add-brewery-notes">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control as="textarea" rows="3" name="beerNotes" value={beer.beerNotes} onChange={(e) => this.handleBeerChange(index, e)} />
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} md="3" controlId="add-brewery-approved-indicator">
                                        <Form.Label>Approved?</Form.Label>
                                        <div>
                                            <Form.Check type="radio" inline label="True" checked={beer.approvedIndicator === "true"} value={"true"} onChange={(e) => this.handleBeerChange(index, e, "approvedIndicator")} />
                                            <Form.Check type="radio" inline label="False" checked={beer.approvedIndicator === "false"} value={"false"} onChange={(e) => this.handleBeerChange(index, e, "approvedIndicator")} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="add-brewery-favorite-indicator">
                                        <Form.Label>Favorite?</Form.Label>
                                        <div>
                                            <Form.Check type="radio" inline label="True" checked={beer.favoriteIndicator === "true"} value={"true"} onChange={(e) => this.handleBeerChange(index, e, "favoriteIndicator")} />
                                            <Form.Check type="radio" inline label="False" checked={beer.favoriteIndicator === "false"} value={"false"} onChange={(e) => this.handleBeerChange(index, e, "favoriteIndicator")} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} md="3" controlId="remove-beer">
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="danger" size="md" block onClick={this.handleRemoveBeer(index)}>Remove</Button>
                                {
                                    (index === (this.state.beers.length - 1))
                                        ? <Button variant="info" size="md" block onClick={this.handleAddBeer}>Add Another</Button>
                                        : ""
                                }
                            </div>)
                    })
                }
                <div className="flight-button-pane" hidden={this.state.hideFlightButtonPane}>
                    <LoaderButton block type="submit" size="lg" isLoading={this.state.isLoading} text="Save Flight" loadingText="Saving…" variant="info" />
                </div>
            </Form >
        );
    }
}