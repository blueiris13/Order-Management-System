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

class SearchForm extends Component {

    constructor(props) {
        super(props);
        this.state = {search_value: ''};
        this.handleSearchSubmit = props.handleSearchSubmit;
        this.onResetTable = props.onResetTable;
    }


    handleChange = (event) => {
        this.setState({...this.state, search_value: event.target.value});
    }

    resetSearch = () => {
        this.setState({...this.state, search_value: ""});
        this.onResetTable(this);
    }

    render() {
        return (
            <div style={searchContainerStyle}>
                <Form onSubmit={(event) => {this.handleSearchSubmit(event, this.state.search_value)}}>
                    <Form.Group controlId="SearchForm" style={searchBoxStyle}>
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

export default SearchForm;