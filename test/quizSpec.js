import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);


import {List, Map} from "immutable";


function setItems(state, items) {
    return state.set("items", List(items));
}

function getNextItem(state) {
    let items = state.get("items");
    let item = state.get("items").first();
    return state.set("item", item).set("items", items.shift());
}

describe("setItems", () => {
    it("adds the items to the state", () => {
        const state = Map();
        const items = List.of("Item 1", "Item 2");
        const nextState = setItems(state, items);

        nextState.should.equal(Map({
            items: List.of("Item 1", "Item 2")
        }));
    });
});

describe("getNextItem", () => {
    it("gets the next item to guess", () => {
        const items = List.of("Item 1", "Item 2", "Item 3");
        const state = setItems(Map(), items);
        const nextState = getNextItem(state);

        nextState.should.equal(Map({
            item: "Item 1",
            items: List.of("Item 2", "Item 3")
        }));
    });
});
