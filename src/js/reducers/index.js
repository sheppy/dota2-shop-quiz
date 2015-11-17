import { List, Map } from "immutable";


import { REQUEST_ITEMS, RECEIVE_ITEMS } from "../actions";

// The item to guess
export function item(state = Map(), action = {}) {
    switch (action.type) {
        default:
            return state;
    }
}

// Quiz
const INITIAL_QUIZ_STATE = Map({
    loading: false,
    loaded: false
});
export function quiz(state = INITIAL_QUIZ_STATE, action = {}) {
    switch (action.type) {
        case REQUEST_ITEMS:
            return Map({
                loading: true,
                loaded: false
            });

        case RECEIVE_ITEMS:
            return Map({
                loading: false,
                loaded: true
            });

        default:
            return state;
    }
}

// All available items
export function items(state = List(), action = {}) {
    switch (action.type) {
        case REQUEST_ITEMS:
            return List();

        case RECEIVE_ITEMS:
            return List(action.data);

        default:
            return state;
    }
}

// Possible items to build
export function buildable(state = List(), action = {}) {
    switch (action.type) {
        case REQUEST_ITEMS:
            return List();

        case RECEIVE_ITEMS:
            return List(action.data);

        default:
            return state;
    }
}

// Possible components used to build items
export function components(state = List(), action = {}) {
    switch (action.type) {
        case REQUEST_ITEMS:
            return List();

        case RECEIVE_ITEMS:
            return List(action.data);

        default:
            return state;
    }
}
