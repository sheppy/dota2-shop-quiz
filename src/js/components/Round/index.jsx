import React from "react";

import { selectItem, unselectItem } from "../../actions";
import Item from "../Item";
import ItemList from "../ItemList";


class Quiz extends React.Component {

    selectItem(item) {
        console.log("Select item", item.toJS());
        selectItem(item);
    }

    unselectItem(item) {
        console.log("Un-select item", item.toJS());
        unselectItem(item);
    }

    render() {
        return (
            <div>
                <h2>Round {this.props.number}</h2>

                <div>
                    <h3>Item</h3>
                    <Item {...this.props.item.toObject()}/>
                </div>

                <ItemList items={this.props.guesses} onClick={this.unselectItem.bind(this)} minItems={this.props.item.get("components").size} />
                <ItemList items={this.props.choices} onClick={this.selectItem.bind(this)} />

                <div>
                    <h3>Stats</h3>
                    <p>Remaining Items: {this.props.items.size}</p>
                </div>
            </div>
        )
    }
}

export default Quiz;
