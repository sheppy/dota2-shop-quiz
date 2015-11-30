import React from "react";

import Round from "../Round";


class Quiz extends React.Component {
    render() {
        return (
            <div>
                {this.props.loaded && this.props.round &&
                    <Round {...this.props.round.toObject()}/>
                }
            </div>
        )
    }
}

export default Quiz;
