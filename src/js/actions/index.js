import axios from "axios";

import store from "../core/store.js";

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';
export const SELECT_ITEM = 'SELECT_ITEM';
export const UNSELECT_ITEM = 'UNSELECT_ITEM';

export function requestItems() {
    return {
        type: REQUEST_ITEMS
    };
}

export function receiveItems(data) {
    return {
        type: RECEIVE_ITEMS,
        data
    };
}

export function fetchItems() {
    store.dispatch(requestItems());
    axios.get("/items.json")
        .then(function (response) {
            store.dispatch(receiveItems(response.data));
        });
}

export function selectItem(item) {
    store.dispatch({
        type: SELECT_ITEM,
        item
    });
}

export function unselectItem(item) {
    store.dispatch({
        type: UNSELECT_ITEM,
        item
    });
}
