import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class BeerTable extends Component {
    render() {
        const {
            beers
        } = this.props;

        const sortedBeers = beers.slice().sort((a, b) => b.createdDate - a.createdDate)

        return (
            <Table responsive>
                <thead><tr>
                    <th>Name</th>
                    <th>Style</th>
                    <th>Brewery</th>
                </tr></thead>
                {
                    sortedBeers && sortedBeers.length > 0
                        ?
                        <tbody>
                            {
                                sortedBeers.map((beer, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Link to={`/beer/${beer.beerId}`}>{beer.beerName}</Link>
                                                {beer.approvedIndicator ? <img src="/images/check-icon.png" alt="approved" hspace="2.5" /> : null}
                                                {beer.favoriteIndicator ? <img src="/images/star-icon.png" alt="favorite" hspace="2.5" /> : null}
                                            </td>
                                            <td>{beer.beerStyle}</td>
                                            <td>{beer.breweryName + ' (' + beer.breweryLocation + ')'}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                        : null
                }

            </Table>);
    }
}