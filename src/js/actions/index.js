import axios from "axios";

import store from "../core/store.js";

export const REQUEST_ITEMS = 'REQUEST_ITEMS';
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS';

export function requestItems() {
    return {
        type: REQUEST_ITEMS
    };
}

export function receiveItems(data) {
    return {
        type: RECEIVE_ITEMS,
        data: data
    };
}

export function fetchItems() {
    store.dispatch(requestItems());
    axios.get("/items.json")
        .then(function (response) {
            store.dispatch(receiveItems(response.data));
        });
}
