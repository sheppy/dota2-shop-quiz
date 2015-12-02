import React from "react";

import { selectItem, unselectItem } from "../../actions";
import Item from "../Item";
import ItemList from "../ItemList";


class Quiz extends React.Component {

    selectItem(index) {
        selectItem(index);
    }

    unselectItem(index) {
        unselectItem(index);
    }

    render() {
        return (
            <div>
                <h2>Round {this.props.number}</h2>

                <div>
                    <h3>Item</h3>
                    <Item {...this.props.item.toObject()}/>
                </div>

                <ItemList selectable={false} items={this.props.guesses} onClick={this.unselectItem.bind(this)} minItems={this.props.item.get("components").size} />
                <ItemList items={this.props.choices} onClick={this.selectItem.bind(this)} />
            </div>
        )
    }
}

export default Quiz;
