import React from "react";

class Score extends React.Component {
    render() {
        return (
            <div>
                <h3>Stats</h3>

                <p>Guesses Left: {this.props.guessesLeft}</p>
                <p>Streak: {this.props.streak}</p>
                <p>Score: {this.props.points}</p>
            </div>
        )
    }
}

export default Score;
