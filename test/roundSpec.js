import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);


import {List, Map} from "immutable";
import * as Round from "../src/js/core/round";


describe("Round", () => {
    describe("start", () => {
        it("increases the round number", () => {
            const round = Map({ number: 0, items: List.of("Item 1", "Item 2", "Item 3") });
            const state = Map({ round });
            const nextState = Round.start(state);

            nextState.get("round").should.equal(Map({
                number: 1,
                item: "Item 1",
                items: List.of("Item 2", "Item 3")
            }));
        });

        it("gets the next item to guess", () => {
            const round = Map({ number: 0, items: List.of("Item 1", "Item 2", "Item 3") });
            const state = Map({ round });
            const nextState = Round.start(state);

            nextState.get("round").should.equal(Map({
                number: 1,
                item: "Item 1",
                items: List.of("Item 2", "Item 3")
            }));
        });

        it("replaces the last item to guess", () => {
            const round = Map({ number: 1, item: "Item 1", items: List.of("Item 2", "Item 3", "Item 4") });
            const state = Map({ round });
            const nextState = Round.start(state);

            nextState.get("round").should.equal(Map({
                number: 2,
                item: "Item 2",
                items: List.of("Item 3", "Item 4")
            }));
        });
    });
});
