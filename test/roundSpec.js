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
        const components = List.of("comp1", "comp2", "comp3", "comp4", "comp5", "comp6", "comp7", "comp8", "comp9");
        it("increases the round number", () => {
            const round = Map({ number: 0, items: List.of("Item 1", "Item 2", "Item 3") });
            const state = Map({ round });
            const nextState = Round.start(state);
            const nextRound = nextState.get("round");

            nextRound.get("number").should.be.truthy;
            nextRound.get("number").should.equal(1);
        });

        it("gets the next item to guess", () => {
            const round = Map({ number: 0, items: List.of("Item 1", "Item 2", "Item 3") });
            const state = Map({ round });
            const nextState = Round.start(state);
            const nextRound = nextState.get("round");

            nextRound.get("item").should.be.truthy;
            nextRound.get("item").should.equal("Item 1");
        });

        it("replaces the last item to guess", () => {
            const round = Map({ number: 1, item: "Item 1", items: List.of("Item 2", "Item 3", "Item 4") });
            const state = Map({ round });
            const nextState = Round.start(state);
            const nextRound = nextState.get("round");

            nextRound.get("item").should.equal("Item 2");
        });

        it("generates some item choices", () => {
            const round = Map({
                number: 0,
                items: List.of("Item 1", "Item 2", "Item 3")
            });
            const state = Map({ components: components, round });
            const nextState = Round.start(state);
            const choices = nextState.get("round").get("choices");

            choices.should.be.truthy;
            choices.should.have.size(8);

            choices.should.contain("recipe");
        });
    });

    describe.skip("addItem", () => {

        it("adds an item to the guesses", () => {
            const state = Map({
                round: Map({ guesses: List() })
            });

            Round.addItem(state);
        });
    });

    describe.skip("removeItem", () => {

    });
});
