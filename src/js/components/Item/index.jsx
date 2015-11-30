import React from "react";
import classNames from "classnames";

class Item extends React.Component {
    render() {
        let itemClass = classNames({
            Item: true,
            selected: this.props.isSelected
        });

        return (
            <figure className={itemClass} onClick={this.props.onClick}>

                {this.props.img &&
                    <img className="Item-Image" src={"img/" + this.props.img} alt={this.props.localized_name}/>
                }

                <figcaption className="Item-Tooltip">
                    <h2 className="Item-Title">{this.props.localized_name}</h2>

                    {this.props.lore &&
                        <p className="Item-Lore">{this.props.lore}</p>
                    }

                    {this.props.desc &&
                        <p className="Item-Description" dangerouslySetInnerHTML={{__html: this.props.desc}} />
                    }

                    {this.props.attrib &&
                        <div className="Item-Attributes" dangerouslySetInnerHTML={{__html: this.props.attrib}} />
                    }
                </figcaption>
            </figure>
        )
    }
}

export default Item;
