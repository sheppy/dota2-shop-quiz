import React from "react";

import { selectItem, unselectItem } from "../../actions";
import Item from "../Item";
import ItemList from "../ItemList";


class Quiz extends React.Component {
    render() {
        return (
            <div>
                <h2>Round {this.props.number}</h2>

                <div>
                    <h3>Item</h3>
                    <Item {...this.props.item.toObject()}/>
                </div>

                <ItemList items={this.props.guesses} onClick={unselectItem.bind(this)} minItems={this.props.item.get("components").size} />
                <ItemList selectable={true} items={this.props.choices} onClick={selectItem.bind(this)} />
            </div>
        )
    }
}

export default Quiz;
