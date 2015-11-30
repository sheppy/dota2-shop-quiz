import React from "react";
import { connect } from "react-redux";
import Quiz from "./Quiz.jsx";
import { fetchItems } from "../actions";


function mapStateToProps(state) {
    return {
        loading: state.quiz.get("loading"),
        loaded: state.quiz.get("loaded"),
        round: state.quiz.get("round")
    };
}

class App extends React.Component {
    // Load initial items
    componentDidMount() {
        fetchItems();
    }

    render() {
        //<h1>The Shopkeeper's Quiz</h1>
        return (
            <main>

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
