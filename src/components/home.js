import React, { Component } from "react";
import { ListGroup, Table } from "react-bootstrap";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            beers: []
        };
    }

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const beers = await this.beers();
            this.setState({ beers });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    beers() {
        return API.get("Beer", "");
    }


    renderBeersTable(beers) {
        return (
            <Table responsive>
                <thead><tr>
                    <th>Name</th>
                    <th>Style</th>
                    <th>Brewery</th>
                    <th>Notes</th>
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
                                            <td>{beer.beerNotes}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                        : "No beers found."
                }

            </Table>);
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>Life of Beer</h1>
                <p>A simple app to record beers.</p>
            </div>
        );
    }

    renderBeers() {
        return (
            <div className="beers">
                <h2>My Beers</h2>
                <ListGroup>
                    {!this.state.isLoading && this.renderBeersTable(this.state.beers)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="home">
                {this.props.isAuthenticated ? this.renderBeers() : this.renderLander()}
            </div>
        );
    }
}
