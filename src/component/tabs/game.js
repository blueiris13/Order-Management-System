import React from "react";
import GameTable from "../gametable"
import GameForm from "../forms/gameform";

const Game = () => {
    return (
        <div className='hello-world'>
            <br>
            </br>
            <h1>Game!</h1>
            <br>
            </br>
            <GameForm />
            <br>
            </br>
            <GameTable />
        </div>
    )
}

export default Game;