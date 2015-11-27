import React from "react";

import Item from "./Item.jsx";


class Quiz extends React.Component {
    render() {
        return (
            <div>
                <h2>Round {this.props.number}</h2>
                <p>Remaining Items: {this.props.items.size}</p>

                <div>
                    <h3>Item</h3>
                    <Item {...this.props.item}/>
                </div>

                <div>
                    <h3>Guesses ({this.props.guesses.size})</h3>

                    <ul>
                        {this.props.guesses.map((guess, index) =>
                            <li key={index}>
                                <Item {...guess}/>
                            </li>
                        )}
                    </ul>
                </div>

                <div>
                    <h3>Choices ({this.props.choices.size})</h3>
                    <ul>
                        {this.props.choices.map((choice, index) =>
                            <li key={index}>
                                <Item {...choice}/>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Quiz;
