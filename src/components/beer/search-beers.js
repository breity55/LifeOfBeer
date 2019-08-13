import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';
import { API } from "aws-amplify";
import BeerTable from './beer-table';

export default class SearchBeers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            beers: []
        };
    }

    async componentDidMount() {
        try {
            const beers = await this.getSearchBeers();
            this.setState({ beers });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    getSearchBeers = () => {
        return API.get("Beer", `/Search/${this.props.match.params.searchQuery}`);
    }

    render() {
        return (
            <div className="favorite-beers" >
                <h2>Search: {this.props.match.params.searchQuery}</h2>
                <ListGroup>
                    {!this.state.isLoading && <BeerTable beers={this.state.beers} />}
                </ListGroup>
            </div>
        );
    }

}