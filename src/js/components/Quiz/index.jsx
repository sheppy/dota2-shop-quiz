import React from "react";

import Round from "../Round";
import Score from "../Score";


class Quiz extends React.Component {
    render() {
        return (
            <div>
                {this.props.loaded && this.props.round &&
                    <Round {...this.props.round.toObject()}/>
                }

                <Score {...this.props.score.toObject()}/>
            </div>
        )
    }
}

export default Quiz;
