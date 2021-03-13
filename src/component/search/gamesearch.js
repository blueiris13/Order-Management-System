import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {SERVER_URL} from "../../constants/serverconstants";

const searchContainerStyle = {
    width: "100%",
    height: "45px",
    marginBottom: "10px",
    marginTop: "40px",
    padding: "3px",
    display: "flex",
    justifyContent: "flex-end"

};

const searchBoxStyle = {
    marginRight: "8px",
    marginBottom: "6px",
    display: "inline-block"
}

class GameSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {search_value: ''};
        this.onSearchFind = props.onSearchFind;
        this.onResetGamesTable = props.onResetGamesTable;
    }


    handleChange = (event) => {
        this.setState({...this.state, search_value: event.target.value});
    }

    handleSearchSubmit = (event) => {
        const that = this
        fetch(`${SERVER_URL}/games_search?query=${this.state.search_value}`, {
            method: 'GET',
            // convert the React state to JSON and send it as the POST body
        }).then(res => res.json())
            .then(function (response) {
                that.onSearchFind(response.games);
                return response.games;
            });

        event.preventDefault();
    }

    resetSearch = () => {
        this.setState({...this.state, search_value: ""});
        this.onResetGamesTable(this);
    }

    render() {
        return (
            <div style={searchContainerStyle}>
                <Form onSubmit={this.handleSearchSubmit}>
                    <Form.Group controlId="gameSearchForm" style={searchBoxStyle}>
                        <Form.Control type="search" placeholder="Search" value={this.state.search_value}
                                      onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" style={searchBoxStyle}>
                        Search
                    </Button>
                </Form>
                <Button variant="success" onClick={this.resetSearch}>
                    Reset
                </Button>
            </div>

        )
    }
}

export default GameSearch;