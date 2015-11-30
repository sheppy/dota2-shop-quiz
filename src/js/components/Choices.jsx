import React from "react";

import Item from "./Item.jsx";


class Choices extends React.Component {
    render() {
        return (
            <div>
                <h3>Choices ({this.props.items.size})</h3>

                <ul className="ItemList">
                    {this.props.items.map((choice, index) =>
                        <li key={index}>
                            <Item {...choice.toObject()}/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default Choices;
