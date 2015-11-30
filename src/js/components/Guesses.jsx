import React from "react";

import Item from "./Item.jsx";


class Guesses extends React.Component {
    render() {
        return (
            <div>
                <h3>Guesses ({this.props.items.size})</h3>

                <ul className="ItemList">
                    {this.props.items.map((guess, index) =>
                        <li key={index}>
                            <Item {...guess.toObject()}/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Guesses;
