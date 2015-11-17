import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./core/store";
import {AppContainer} from "./components/App.jsx";

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>
    , document.getElementById("app"));

