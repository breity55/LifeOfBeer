import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';
import { API } from "aws-amplify";
import BeerTable from './beer-table';

export default class FavoriteBeers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            beers: []
        };
    }

    async componentDidMount() {
        try {
            const beers = await this.getFavoriteBeers();
            this.setState({ beers });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    getFavoriteBeers() {
        return API.get("Beer", "/Favorite");
    }

    render() {
        return (
            <div className="favorite-beers" >
                <h2>My Favorite Beers</h2>
                <ListGroup>
                    {!this.state.isLoading && <BeerTable beers={this.state.beers} />}
                </ListGroup>
            </div>
        );
    }

}