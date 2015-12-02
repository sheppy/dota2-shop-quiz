import { fromJS, Map } from "immutable";

import * as Quiz from "../core/quiz";
import * as Round from "../core/round";


import { REQUEST_ITEMS, RECEIVE_ITEMS, SELECT_ITEM, UNSELECT_ITEM } from "../actions";

// Quiz
const INITIAL_QUIZ_STATE = Map({
    loading: false,
    loaded: false
});

export function quiz(state = INITIAL_QUIZ_STATE, action = {}) {
    switch (action.type) {
        case REQUEST_ITEMS:
            return state.set("loading", true);

        case RECEIVE_ITEMS:
            return Round.start(Quiz.initialise(state, fromJS(action.data)));

        case SELECT_ITEM:
            return Round.addItem(state, action.item);

        case UNSELECT_ITEM:
            return Round.removeItem(state, action.item);

        default:
            return state;
    }
}
