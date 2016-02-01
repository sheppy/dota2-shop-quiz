import React from "react";
import { Provider } from "react-redux";

import store from "./store";
import {AppContainer} from "../components/App.jsx";

export default (
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);
