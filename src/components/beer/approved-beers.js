import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';
import { API } from "aws-amplify";
import BeerTable from './beer-table';

export default class ApprovedBeers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            beers: []
        };
    }

    async componentDidMount() {
        try {
            const beers = await this.getApprovedBeers();
            this.setState({ beers });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    getApprovedBeers() {
        return API.get("Beer", "/Approved");
    }

    render() {
        return (
            <div className="approved-beers" >
                <h2>My Approved Beers</h2>
                <ListGroup>
                    {!this.state.isLoading && <BeerTable beers={this.state.beers} />}
                </ListGroup>
            </div>
        );
    }

}