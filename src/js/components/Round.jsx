import React from "react";

import Item from "./Item.jsx";
import Guesses from "./Guesses.jsx";
import Choices from "./Choices.jsx";


class Quiz extends React.Component {
    render() {
        return (
            <div>
                <h2>Round {this.props.number}</h2>

                <div>
                    <h3>Item</h3>
                    <Item {...this.props.item.toObject()}/>
                </div>

                <Guesses items={this.props.guesses} />
                <Choices items={this.props.choices} />

                <div>
                    <h3>Stats</h3>
                    <p>Remaining Items: {this.props.items.size}</p>
                </div>
            </div>
        )
    }
}

export default Quiz;
