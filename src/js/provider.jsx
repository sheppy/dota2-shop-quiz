import { Provider } from "react-redux";

import store from "./core/store";
import {AppContainer} from "./components/App.jsx";

export default (
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);
