import React, {Component} from "react";
import GameTable from "../gametable"
import GameForm from "../forms/gameform";
import GameSearch from "../search/gamesearch";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        }
    }

    // Get all existing Customers data when the page is loaded.
    componentDidMount(){
        this.fetchAllGame(this)
    }

    fetchAllGame = (context) => {
        fetch('http://flip1.engr.oregonstate.edu:7878/games', {
            method: 'GET',
            // We convert the React state to JSON and send it as the POST body
        }).then(res => res.json())
            .then(function(response) {
                console.log(response.games)
                context.setState({...context.state, games: response.games})
            });
    }

    // Get new customers data from the Customer form page.
    onGameAdded = (games) => {
        console.log("game on games page" + games)
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
                <GameSearch/>
                <GameTable games={this.state.games}/>
            </div>
        )
    }
}

export default Game;