import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

// CSS Styling
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

class Searchform extends Component {
    constructor(props) {
        super(props);
        this.state = {search_value: ''};
        this.handleSearchSubmit = props.handleSearchSubmit;
        this.onResetTable = props.onResetTable;
    }

    // Handle change listener for search input.
    handleChange = (event) => {
        this.setState({...this.state, search_value: event.target.value});
    }

    // Event listener for "Reset" button.
    resetSearch = () => {
        // Update search_value to an empty string and reset the table with existing data.
        this.setState({...this.state, search_value: ""});
        this.onResetTable(this);
    }

    render() {
        return (
            <div style={searchContainerStyle}>
                <Form onSubmit={(event) => {
                    this.handleSearchSubmit(event, this.state.search_value)
                }}>
                    <Form.Group controlId="Searchform" style={searchBoxStyle}>
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

export default Searchform;