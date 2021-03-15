import React, {Component} from "react";
import GameTable from "../gametable"
import GameForm from "../forms/gameform";
import Searchform from "../search/searchform";
import {SERVER_URL} from "../../constants/serverconstants";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    // Get all existing Games data when the page is loaded.
    componentDidMount() {
        this.fetchAllGame()
    }

    // Function to get all existing Games data from the database.
    fetchAllGame = () => {
        const that = this
        fetch(`${SERVER_URL}/games`, {
            method: 'GET',
        }).then(res => res.json())
            .then(function (response) {
                that.setState({...that.state, games: response.games})
            });
    }

    // Function to set the Games to the state.
    onGameAdded = (games) => {
        this.setState({...this.state, games: games})
    }

    onSearchFind = (games) => {
        this.setState({...this.state, games: games})
    }

    // Event listener for "Search" button.
    handleSearchSubmit = (event, query) => {
        const that = this
        fetch(`${SERVER_URL}/games_search?query=${query}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(function (response) {
                that.onSearchFind(response.games);
                return response.games;
            });

        event.preventDefault();
    }

    render() {
        return (
            <div className='hello-world'>
                <br>
                </br>
                <h1>Games</h1>
                <br>
                </br>
                <GameForm onGameAdded={this.onGameAdded.bind(this)}/>
                <br>
                </br>
                <Searchform handleSearchSubmit={this.handleSearchSubmit.bind(this)}
                            onResetTable={this.fetchAllGame.bind(this)}/>
                <GameTable games={this.state.games}/>
            </div>
        )
    }
}

export default Game;