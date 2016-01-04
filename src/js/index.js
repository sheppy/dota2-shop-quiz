import ReactDOM from "react-dom";
import * as track from "./core/tracking";

import Provider from "./core/provider.jsx";

track.init();

ReactDOM.render(Provider, document.getElementById("app"));
