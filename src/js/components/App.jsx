import React from "react";
import { connect } from "react-redux";
import Quiz from "./Quiz.jsx";
import { fetchItems } from "../actions";


function mapStateToProps(state) {
    return {
        loading: state.quiz.get("loading"),
        loaded: state.quiz.get("loaded"),
        round: state.quiz.get("round"),
    };

    return {
        ready: state.quiz.get("loaded"),
        items: state.items,

        buildable: state.buildable,
        components: state.components
    };
}

class App extends React.Component {
    // Load initial items
    componentDidMount() {
        fetchItems();
    }

    render() {
        return (
            <main>
                <h1>The Shopkeeper's Quiz</h1>

                {this.props.loading &&
                    <p>Loading...</p>
                }

                {this.props.loaded &&
                    <Quiz {...this.props}/>
                }
            </main>
        )
    }
}

export default App;
export const AppContainer = connect(mapStateToProps)(App);
