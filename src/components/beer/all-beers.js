import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';
import { API } from "aws-amplify";
import BeerTable from './beer-table';

export default class AllBeers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            beers: []
        };
    }

    async componentDidMount() {
        try {
            const beers = await this.getAllBeers();
            this.setState({ beers });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    getAllBeers() {
        return API.get("Beer", "");
    }

    render() {
        return (
            <div className="beers" >
                <h2>My Beers</h2>
                <ListGroup>
                    {!this.state.isLoading &&
                        <BeerTable beers={this.state.beers} />}
                </ListGroup>
            </div>
        );
    }

}