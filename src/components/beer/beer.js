import React, { Component } from "react";
import { Form, Col } from 'react-bootstrap';
import LoaderButton from '../loader-button';
import { API } from "aws-amplify";

export default class Beer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false, isDeleting: false,
            beer: null,
            breweryName: '', breweryLocation: '', beerName: '', beerStyle: '', beerNotes: '',
            approvedIndicator: "false", favoriteIndicator: "false"
        };
    }

    handleChange = (event, fieldName = null) => {
        let name = (fieldName) ? fieldName : event.target.name;
        this.setState({
            [name]: event.target.value
        });
    }

    saveBeer(beer) {
        return API.put("Beer", `/${this.props.match.params.id}`, {
            body: beer
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
            await this.saveBeer({
                breweryName: this.state.breweryName,
                breweryLocation: this.state.breweryLocation,
                beerName: this.state.beerName,
                beerStyle: this.state.beerStyle,
                beerNotes: this.state.beerNotes,
                approvedIndicator: (this.state.approvedIndicator === "true"),
                favoriteIndicator: (this.state.favoriteIndicator === "true")
            });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false })
    }

    isFieldNull = value => (value === null || value.trim() === '');

    handleDelete = async event => {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this beer?"
        );

        if (!confirmed) {
            return;
        }

        this.setState({ isDeleting: true });

        try {
            await this.deleteBeer();
            this.props.history.push("/");
        } catch (e) {
            alert(e);
            this.setState({ isDeleting: false });
        }
    }

    deleteBeer() {
        return API.del("Beer", `/${this.props.match.params.id}`);
    }

    async componentDidMount() {
        try {
            const beer = await this.getBeer();

            const { breweryName, breweryLocation, beerName, beerStyle, beerNotes, approvedIndicator, favoriteIndicator } = beer;
            this.setState({
                beer,
                breweryName, breweryLocation, beerName, beerStyle, beerNotes, approvedIndicator, favoriteIndicator
            });
        } catch (e) {
            alert(e);
        }
    }

    getBeer() {
        return API.get("Beer", `/${this.props.match.params.id}`);
    }

    render() {
        return (<div className="beer">
            {
                this.state.beer && <Form className="update-beer" onSubmit={this.handleSubmit}>
                    <h4>{this.state.beerName}</h4>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="add-beer-brewery">
                            <Form.Label>Brewery</Form.Label>
                            <Form.Control
                                type="text"
                                name="breweryName"
                                value={this.state.breweryName}
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="add-beer-brewery-location">
                            <Form.Label>Brewery Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="breweryLocation"
                                value={this.state.breweryLocation}
                                onChange={this.handleChange} />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="add-beer-name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="beerName"
                                value={this.state.beerName}
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="add-beer-style">
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
                        <Form.Group as={Col} md="6" controlId="add-brewery-approved-indicator">
                            <Form.Label>Approved?</Form.Label>
                            <div>
                                <Form.Check type="radio" inline label="True" checked={this.state.approvedIndicator.toString() === "true"} value={"true"} onChange={(e) => this.handleChange(e, "approvedIndicator")} />
                                <Form.Check type="radio" inline label="False" checked={this.state.approvedIndicator.toString() === "false"} value={"false"} onChange={(e) => this.handleChange(e, "approvedIndicator")} />
                            </div>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="add-brewery-favorite-indicator">
                            <Form.Label>Favorite?</Form.Label>
                            <div>
                                <Form.Check type="radio" inline label="True" checked={this.state.favoriteIndicator.toString() === "true"} value={"true"} onChange={(e) => this.handleChange(e, "favoriteIndicator")} />
                                <Form.Check type="radio" inline label="False" checked={this.state.favoriteIndicator.toString() === "false"} value={"false"} onChange={(e) => this.handleChange(e, "favoriteIndicator")} />
                            </div>
                        </Form.Group>
                    </Form.Row>
                    <LoaderButton block type="submit" isLoading={this.state.isLoading} text="Save" loadingText="Saving…" />
                    <LoaderButton block variant="danger" isLoading={this.state.isDeleting} onClick={this.handleDelete} text="Delete" loadingText="Deleting…" />
                </Form >
            }

        </div>);
    }
}
