import _ from "lodash";
import React from "react";

import Item from "../Item";
import Score from "../Score";


class ItemList extends React.Component {
    render() {
        let extraItems = 0;

        if (this.props.minItems) {
            extraItems = this.props.minItems - this.props.items.size;
        }

        return (
            <ul className="ItemList">
                {this.props.items.map((item, index) =>
                    <li key={index}>
                        <Item selectable={this.props.selectable} {...item.toObject()} onClick={this.props.onClick.bind(this, index)}/>
                    </li>
                )}

                {_.times(extraItems, (index) =>
                    <li key={index}>
                        <Item />
                    </li>
                )}
            </ul>
        )
    }
}

export default ItemList;
