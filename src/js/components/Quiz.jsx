import React from "react";

import Round from "./Round.jsx";


class Quiz extends React.Component {
    render() {
        return (
            <div>
                Round: {this.props.round.get("number")}

                {this.props.loaded && this.props.round &&
                    <Round {...this.props.round.toObject()}/>
                }

            </div>
        )
    }
}

export default Quiz;
