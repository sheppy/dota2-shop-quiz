import React from "react";

class Quiz extends React.Component {
    render() {
        return (
            <div>
                item
                {this.props.items.count()}
                <hr/>
                choices
                <hr/>
                guesses
            </div>
        )
    }
}

export default Quiz;
