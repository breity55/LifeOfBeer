import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class BeerTable extends Component {
    render() {
        const {
            beers
        } = this.props;
        console.log(beers);
        return (
            <Table responsive>
                <thead><tr>
                    <th>Name</th>
                    <th>Style</th>
                    <th>Brewery</th>
                    {/* <th>Notes</th> */}
                </tr></thead>
                {
                    beers && beers.length > 0
                        ?
                        <tbody>
                            {
                                beers.map((beer, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><Link to={`/beer/${beer.beerId}`}>{beer.beerName}</Link></td>
                                            <td>{beer.beerStyle}</td>
                                            <td>{beer.breweryName + ' (' + beer.breweryLocation + ')'}</td>
                                            {/* <td>{beer.beerNotes}</td> */}
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