import _ from "lodash";
import React from "react";

import Item from "../Item";


class ItemList extends React.Component {
    constructor(props) {
        super(props);

        //console.log('props', props, this.props);
    }

    render() {
        let extraItems = 0;

        if (this.props.minItems) {
            extraItems = this.props.minItems - this.props.items.size;
        }

        return (
            <ul className="ItemList">
                {this.props.items.map((item, index) =>
                    <li key={index}>
                        <Item {...item.toObject()} onClick={this.props.onClick.bind(this, item)}/>
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
