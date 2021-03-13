import React, {Component} from "react";
import GameTable from "../gametable"
import GameForm from "../forms/gameform";
import GameSearch from "../search/gamesearch";
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

    fetchAllGame = () => {
        console.log("fetchAllGame!!")
        const that = this
        fetch(`${SERVER_URL}/games`, {
            method: 'GET',
            // We convert the React state to JSON and send it as the POST body
        }).then(res => res.json())
            .then(function (response) {
                that.setState({...that.state, games: response.games})
            });
    }

    // Get new game data from the Game form page.
    onGameAdded = (games) => {
        this.setState({...this.state, games: games})
    }

    onSearchFind = (games) => {
        this.setState({...this.state, games: games})
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
                <GameSearch onSearchFind={this.onSearchFind.bind(this)} onResetGamesTable={this.fetchAllGame.bind(this)}/>
                <GameTable games={this.state.games}/>
            </div>
        )
    }
}

export default Game;