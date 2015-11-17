import React from "react";
import { connect } from "react-redux";
import Quiz from "./Quiz.jsx";
import { fetchItems } from "../actions";


function mapStateToProps(state) {
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
        // <h1>The Shopkeeper's Quiz</h1>
        return (
            <main>
                {this.props.ready &&
                    <Quiz items={this.props.items} buildable={this.props.buildable} components={this.props.components}/>
                }
            </main>
        )
    }
}

export default App;
export const AppContainer = connect(mapStateToProps)(App);
